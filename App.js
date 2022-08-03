import NetInfo from '@react-native-community/netinfo';
import moment from 'moment';
import React, {useEffect, useRef, useState} from 'react';
import {Dimensions, SafeAreaView} from 'react-native';
import codePush from 'react-native-code-push';
import Carousel from 'react-native-reanimated-carousel';
import SplashScreen from 'react-native-splash-screen';
import {useDispatch, useSelector} from 'react-redux';
import AppTitle from './src/components/AppTitle';
import FullScreenLoading from './src/components/FullScreenLoading';
import {
  API,
  DRAW_TIME,
  REFRESH_RATE_MILLISECOND,
  REFRESH_RATE_SECOND,
  TARGET_TIME,
  TIME_FORMAT_LONG,
} from './src/constants';
import {setInternetConnection} from './src/features/internet';
import {
  saveResult,
  setCurrentSide,
  setIsLiveStarted,
  setIsLoading,
} from './src/features/result';
import BlankResultScreen from './src/screens/BlankResultScreen';
import ResultScreen from './src/screens/ResultScreen';

const codePushOptions = {
  checkFrequency: __DEV__
    ? codePush.CheckFrequency.MANUAL
    : codePush.CheckFrequency.ON_APP_RESUME,
};
const {height: PAGE_HEIGHT, width: PAGE_WIDTH} = Dimensions.get('window');
const activeOffsetX = {activeOffsetX: [-10, 10]};

const App = ({navigation, route}) => {
  const blankResultRef = useRef(null);
  const resultRef = useRef(null);
  const [isVertical] = useState(false);
  const [currentTime, setCurrentTime] = useState(TARGET_TIME);

  const dispatch = useDispatch();
  const c = useSelector(state => state.company.value);
  const isPrevDraw = useSelector(state => state.result.isPrevDraw);
  const isNextDraw = useSelector(state => state.result.isNextDraw);
  const isNormalDraw = useSelector(state => state.result.isNormalDraw);
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

  const updateCurrentSide = index => {
    dispatch(setCurrentSide(c[index].code));
  };

  const fetchResult = async () => {
    console.log(
      '🌺 Fetching data from',
      `${API}/api/v1/result/${formattedDate}`,
    );
    try {
      // dispatch(setIsLoading(true));
      const response = await fetch(`${API}/api/v1/result/${formattedDate}`);
      const json = await response.json();
      dispatch(saveResult(json));
      dispatch(setIsLoading(false));
    } catch (err) {
      console.error(err);
      return err;
    }
  };

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
    // if (route.params === undefined) {
    //   formattedDate ? fetchFdData(formattedDate) : fetchFdData();
    // } else {
    //   dispatch(setIsLoading(true));
    //   fetchFdData(route.params['date'].slice(0, 10));
    // }
    if (isNormalDraw && !isPrevDraw && !isNextDraw) {
      fetchResult();
    }
    SplashScreen.hide();
  }, [formattedDate, hasInternet, route]);

  // Decide whether to go live or not
  useEffect(() => {
    let timer;
    if (
      Number(currentTime) >= DRAW_TIME.start &&
      Number(currentTime) <= DRAW_TIME.end
    ) {
      console.log('🔴 live:', currentTime);
      dispatch(setIsLiveStarted(1));

      timer = setInterval(() => {
        setCurrentTime(prevTime =>
          moment(prevTime, TIME_FORMAT_LONG)
            .add(REFRESH_RATE_SECOND, 'seconds')
            .format(TIME_FORMAT_LONG),
        );
        if (
          Number(currentTime) >= DRAW_TIME.start &&
          Number(currentTime) <= DRAW_TIME.end
        ) {
          console.log('🔴 nestedIf live:', currentTime);
          dispatch(setIsLiveStarted(1));
          fetchFdData();
        } else {
          console.log('❌ nestedIf offline:', currentTime);
          dispatch(setIsLiveStarted(0));
          clearInterval(timer);
        }
      }, REFRESH_RATE_MILLISECOND);
      return () => {
        clearInterval(timer);
      };
    } else {
      console.log('❌ else offline:', currentTime);
      dispatch(setIsLiveStarted(0));
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [currentTime, isLiveStarted, formattedDate]);

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
          onSnapToItem={index => updateCurrentSide(index)}
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
          onSnapToItem={index => updateCurrentSide(index)}
          pagingEnabled={true}
          panGestureHandlerProps={activeOffsetX}
          ref={resultRef}
          snapEnabled={false}
          renderItem={({index}) => {
            return (
              <ResultScreen
                navigation={navigation}
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
