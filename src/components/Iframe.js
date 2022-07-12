import React, {useRef} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import WebView from 'react-native-webview';

const {width} = Dimensions.get('window');

const Iframe = ({videoId = 'hQJeGBYI3C8'}) => {
  const webRef = useRef(null);

  return (
    <>
      <View style={styles.videoContainer}>
        <WebView
          ref={webRef}
          source={{html: buildHTML(videoId)}}
          allowsFullscreenVideo={false}
          allowsInlineMediaPlayback={true}
          scalesPageToFit={false}
          mediaPlaybackRequiresUserAction={false}
        />
      </View>
    </>
  );
};

export default Iframe;

const iFrameStyle = `
        <style>
          html {
            overflow-y: hidden;
            overflow-x: hidden;
            height: 100%;
          }
          body {
            background-color: black;
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
          }
        </style>
        `;

const buildIFrame = videoId => `
        <div id="player"></div>
          <script>
          var tag = document.createElement('script');
          tag.src = "https://www.youtube.com/iframe_api";
          var firstScriptTag = document.getElementsByTagName('script')[0];
          firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

          var player;
          function onYouTubeIframeAPIReady() {
            player = new YT.Player('player', {
              height: '100%',
              width: ${width},
              videoId: "${videoId}",
              playerVars: {
                'playsinline': 1,
                'modestbranding': 1,
                'controls': 0,
                'rel': 0,
                'loop': 1,
              },
            });

            setInterval(() => {
              const data = {
                currentDuration: getCurrentTime()
              }
              window.ReactNativeWebView.postMessage(JSON.stringify(data));
            }, 1000)
            
          }

          function pause() {
            player.pauseVideo();
          }

          function play() {
            player.playVideo();
          }

          function seekTo(time) {
            player.seekTo(time, true);
          }

          function getDuration() {
            return player.getDuration()
          }

          function getCurrentTime() {
            return player.getCurrentTime()
          }
        </script>
        `;

export const buildHTML = videoId => `
        <!DOCTYPE html>
        <html>
          <head>
            ${iFrameStyle}
            <meta name="viewport" content="initial-scale=1">
            <title>Navigation Delegate Example</title>
          </head>
          <body>${buildIFrame(videoId)}</body>
        </html>
        `;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  videoContainer: {
    height: 250,
    marginBottom: 80,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeLabel: {
    fontWeight: 'bold',
    fontSize: 30,
  },
});
