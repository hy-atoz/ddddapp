import React from 'react';
import {Box} from 'native-base';
import YoutubePlayer from 'react-native-youtube-iframe';
import SectionTitle from './SectionTitle';

const YouTubePlayer = ({videoId}) => {
  return (
    <Box marginTop={1}>
      <SectionTitle
        backgroundColor="brand.black"
        forVideo
        title="View Draw Video 观看视频"
      />
      <YoutubePlayer
        height={300}
        initialPlayerParams={{preventFullScreen: true}}
        play={false}
        videoId={videoId}
        webViewProps={{
          allowsFullscreenVideo: false,
          allowsInlineMediaPlayback: true,
          mediaPlaybackRequiresUserAction: false,
          onShouldStartLoadWithRequest: false,
          originWhitelist: ['*'],
          startInLoadingState: true,
        }}
      />
    </Box>
  );
};

export default YouTubePlayer;
