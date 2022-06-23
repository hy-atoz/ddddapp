import React, {useEffect, useRef, useState} from 'react';
import NetInfo from '@react-native-community/netinfo';
import moment from 'moment';
import {Dimensions, SafeAreaView, StyleSheet} from 'react-native';
import codePush from 'react-native-code-push';
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
import getItem from './src/utils/getItem';

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
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentSide, setCurrentSide] = useState('M');
  const [isVertical] = useState(false);

  const dispatch = useDispatch();
  const hasInternet = useSelector(state => state.internet.value);
  const {formattedDate} = useSelector(state => state.result.dates);
  const isLoading = useSelector(state => state.result.isLoading);
  const prevOrNext = useSelector(state => state.result.prevOrNext);
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

  // Fetching data from API and save to result state
  const fetchFdData = async (date = '') => {
    console.log('🌺 Fetching data from', `${API_BASE_URL}/${date}`);
    dispatch(setIsLoading(true));
    const response = await fetch(`${API_BASE_URL}/${date}`);
    const json = await response.json();
    dispatch(setIsLoading(false));
    dispatch(saveResult(json));
  };

  const updateDate = date => {
    dispatch(
      setSelectedDate({
        selectedDate: moment(date).toDate(),
        formattedDate: moment(date).format(DATE_FORMAT),
      }),
    );
  };

  // CodePush: https://github.com/gulsher7/CodePushApp
  useEffect(() => {
    codePush.sync({
      updateDialog: true,
      installMode: codePush.InstallMode.IMMEDIATE,
    });
  }, []);

  // Check if there is an internet connection
  useEffect(() => {
    const data = NetInfo.addEventListener(state => {
      !state.isConnected && !state.isInternetReachable
        ? dispatch(setInternetConnection(false))
        : dispatch(setInternetConnection(true));
    });
    return () => {
      data();
    };
  }, [hasInternet]);

  // Fetching fdData every time the selected date is changing
  useEffect(() => {
    formattedDate ? fetchFdData(formattedDate) : fetchFdData();
    SplashScreen.hide();
  }, [formattedDate]);

  // Update the selectedDate based on the result
  useEffect(() => {
    console.log(
      `🕰 selectedDate ${formattedDate} | ⚽️ currentSide ${currentSide}`,
    );
    if (result.length !== 0) {
      console.log('🔥 Done fetching data...');
      const fdData = getItem(result, currentSide).fdData;
      updateDate(fdData.dd);
    }
  }, [result]);

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? <FullScreenLoading /> : null}
      <AppTitle />
      {result.length === 0 ? (
        <Carousel
          {...baseOptions}
          data={c}
          defaultIndex={0}
          loop
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
          loop
          onSnapToItem={index => {
            // setActiveIndex(index);
            setCurrentSide(c[index].code);
          }}
          panGestureHandlerProps={activeOffsetX}
          ref={resultRef}
          renderItem={({index}) => {
            return (
              <>
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
              </>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default codePush(codePushOptions)(App);
