import React, {useEffect, useRef, useState} from 'react';
import NetInfo from '@react-native-community/netinfo';
import moment from 'moment';
import {Dimensions, SafeAreaView} from 'react-native';
import codePush from 'react-native-code-push';
// import InAppBrowser from 'react-native-inappbrowser-reborn';
import Carousel from 'react-native-reanimated-carousel';
import SplashScreen from 'react-native-splash-screen';
import {useDispatch, useSelector} from 'react-redux';
import AppTitle from './src/components/AppTitle';
import FullScreenLoading from './src/components/FullScreenLoading';
import {API_BASE_URL, DATE_FORMAT} from './src/constants';
import c from './src/constants/companies';
import {setInternetConnection} from './src/features/internet';
import {saveResult, setIsLoading, setSelectedDate} from './src/features/result';
import BlankResultScreen from './src/screens/BlankResultScreen';
import ResultScreen from './src/screens/ResultScreen';
// import getItem from './src/utils/getItem';

const codePushOptions = {
  checkFrequency: __DEV__
    ? codePush.CheckFrequency.MANUAL
    : codePush.CheckFrequency.ON_APP_RESUME,
};
const {height: PAGE_HEIGHT, width: PAGE_WIDTH} = Dimensions.get('window');
const activeOffsetX = {activeOffsetX: [-10, 10]};

const App = () => {
  const blankResultRef = useRef(null);
  const resultRef = useRef(null);
  // const [currentSide, setCurrentSide] = useState('M');
  const [isVertical] = useState(false);

  const dispatch = useDispatch();
  const hasInternet = useSelector(state => state.internet.value);
  const {formattedDate} = useSelector(state => state.result.dates);
  const isLiveStarted = useSelector(state => state.result.isLiveStarted);
  const isLoading = useSelector(state => state.result.isLoading);
  const result = useSelector(state => state.result.value);

  // Base options for <Carousel />
  const baseOptions = isVertical
    ? {
        vertical: true,
        height: PAGE_HEIGHT,
        width: PAGE_WIDTH,
      }
    : {
        vertical: false,
        height: PAGE_HEIGHT,
        width: PAGE_WIDTH,
      };

  // const linkOptions = {
  //   // iOS Properties
  //   dismissButtonStyle: 'close',
  //   preferredBarTintColor: 'white',
  //   preferredControlTintColor: 'black',
  //   readerMode: false,
  //   animated: true,
  //   modalPresentationStyle: 'popover',
  //   modalTransitionStyle: 'coverVertical',
  //   modalEnabled: true,
  //   enableBarCollapsing: false,
  //   // Android Properties
  //   showTitle: true,
  //   toolbarColor: 'white',
  //   secondaryToolbarColor: 'black',
  //   navigationBarColor: 'black',
  //   navigationBarDividerColor: 'white',
  //   enableUrlBarHiding: true,
  //   enableDefaultShare: true,
  //   forceCloseOnRedirection: false,
  //   animations: {
  //     startEnter: 'slide_in_right',
  //     startExit: 'slide_out_left',
  //     endEnter: 'slide_in_left',
  //     endExit: 'slide_out_right',
  //   },
  // };

  // Open external link in the in-app browser
  // Link: https://github.com/proyecto26/react-native-inappbrowser
  // const open4DNumWebsite = async () => {
  //   const url = 'http://dream.4dnum.com';
  //   InAppBrowser.open(url, linkOptions);
  // };

  // Fetching data from API and save to result state
  const fetchFdData = async (date = '') => {
    console.log('🌺 Fetching data from', `${API_BASE_URL}/${date}`);
    try {
      const response = await fetch(`${API_BASE_URL}/${date}`);
      const json = await response.json();
      dispatch(saveResult(json));
      dispatch(setIsLoading(false));
    } catch (err) {
      console.error(err);
      return err;
    }
  };

  // const updateDate = date => {
  //   dispatch(
  //     setSelectedDate({
  //       selectedDate: moment(date).toDate(),
  //       formattedDate: moment(date).format(DATE_FORMAT),
  //     }),
  //   );
  // };

  // Check if there is an internet connection
  useEffect(() => {
    dispatch(setIsLoading(true));
    const data = NetInfo.addEventListener(state => {
      if (!state.isConnected && !state.isInternetReachable) {
        dispatch(setInternetConnection(false));
        dispatch(setIsLoading(false));
      } else {
        dispatch(setInternetConnection(true));
      }
    });
    return () => {
      data();
    };
  }, [hasInternet]);

  // Fetching fdData every time the selected date is changing
  useEffect(() => {
    formattedDate ? fetchFdData(formattedDate) : fetchFdData();
    SplashScreen.hide();
  }, [formattedDate, hasInternet]);

  // Update the selectedDate based on the result
  // useEffect(() => {
  //   console.log(
  //     `🕰 selectedDate ${formattedDate} | ⚽️ currentSide ${currentSide}`,
  //   );
  //   if (result.length !== 0) {
  //     console.log('🔥 Done fetching data...');
  //     const fdData = getItem(result, currentSide).fdData;
  //     const currentSideDate = fdData.dd;
  //   }
  // }, [result]);

  // CodePush: https://github.com/gulsher7/CodePushApp
  useEffect(() => {
    codePush.sync({
      updateDialog: false,
      installMode: codePush.InstallMode.IMMEDIATE,
    });
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      {isLoading && !isLiveStarted ? <FullScreenLoading /> : null}
      <AppTitle />
      {result.length === 0 ? (
        <Carousel
          {...baseOptions}
          data={c}
          defaultIndex={0}
          panGestureHandlerProps={activeOffsetX}
          ref={blankResultRef}
          renderItem={({index}) => {
            return (
              <BlankResultScreen
                key={index}
                index={index}
                bgColor={c[index].color}
                hasLetter={c[index].hasLetter}
                isBlackText={c[index].isBlackText}
                isGreenText={c[index].isGreenText}
                name={c[index].name}
                source={c[index].image}
              />
            );
          }}
        />
      ) : (
        <Carousel
          {...baseOptions}
          data={c}
          defaultIndex={0}
          // onSnapToItem={index => setCurrentSide(c[index].code)}
          pagingEnabled={false}
          panGestureHandlerProps={activeOffsetX}
          ref={resultRef}
          snapEnabled={true}
          scrollAnimationDuration={800}
          renderItem={({index}) => {
            return (
              <ResultScreen
                key={index}
                index={index}
                bgColor={c[index].color}
                companyCode={c[index].code}
                hasLastRow={c[index].hasLastRow}
                hasLetter={c[index].hasLetter}
                hasLiveVideo={c[index].hasLiveVideo}
                isBlackText={c[index].isBlackText}
                isGreenText={c[index].isGreenText}
                name={c[index].name}
                source={c[index].image}
              />
            );
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default codePush(codePushOptions)(App);
