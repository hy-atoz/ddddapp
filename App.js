import React, {useEffect, useRef, useState} from 'react';
import NetInfo from '@react-native-community/netinfo';
import {NavigationContainer} from '@react-navigation/native';
import moment from 'moment';
import momentTz from 'moment-timezone';
import {
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import codePush from 'react-native-code-push';
import * as RNLocalize from 'react-native-localize';
import Carousel from 'react-native-reanimated-carousel';
import SplashScreen from 'react-native-splash-screen';
import {useDispatch, useSelector} from 'react-redux';
import AppTitle from './src/components/AppTitle';
import {API_BASE_URL} from './src/constants';
import c from './src/constants/companies';
import {setInternetConnection} from './src/features/internet';
import {addResult, setIsLoading, setSelectedDate} from './src/features/result';
import ResultScreen from './src/screens/ResultScreen';
import getItem from './src/utils/getItem';
import BlankResultScreen from './src/screens/BlankResultScreen';
import Swiper from 'react-native-swiper';

const codePushOptions = {
  checkFrequency: __DEV__
    ? codePush.CheckFrequency.MANUAL
    : codePush.CheckFrequency.ON_APP_RESUME,
};
const {height: PAGE_HEIGHT, width: PAGE_WIDTH} = Dimensions.get('window');
const MALAYSIA_TIME_ZONE = 'Asia/Kuala_Lumpur';
const todayGlobal = moment().format('YYYY-MM-DD HH:mm');
const deviceTimeZone = RNLocalize.getTimeZone();
const deviceTimeGlobal = momentTz.tz(todayGlobal, deviceTimeZone);
const targetTimeGlobal = deviceTimeGlobal
  .clone()
  .tz(MALAYSIA_TIME_ZONE)
  .format('YYYY-MM-DD');

const App = () => {
  const ref = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVertical] = useState(false);
  const [currentSide, setCurrentSide] = useState('M');

  const dispatch = useDispatch();
  const hasInternet = useSelector(state => state.internet.value);
  const {formattedDate, selectedDate} = useSelector(
    state => state.result.dates,
  );
  const isLoading = useSelector(state => state.result.isLoading);
  const prevOrNext = useSelector(state => state.result.prevOrNext);
  const result = useSelector(state => state.result.value);

  // base options for <Carousel />
  const baseOptions = isVertical
    ? {
        vertical: true,
        width: PAGE_WIDTH,
        height: PAGE_HEIGHT,
      }
    : {
        vertical: false,
        width: PAGE_WIDTH,
        height: PAGE_HEIGHT,
      };

  // Fetching data from API and save to result state
  const fetchFdData = async (date = '', state = '') => {
    dispatch(setIsLoading(true));
    const response = await fetch(`${API_BASE_URL}/${date}/${state}`);
    const json = await response.json();
    dispatch(addResult(json));
    dispatch(setIsLoading(false));
  };

  const updateDate = date => {
    dispatch(
      setSelectedDate({
        selectedDate: moment(date).toDate(),
        formattedDate: moment(date).format('YYYY-MM-DD'),
      }),
    );
  };

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
    // console.log('⏳ Fetching data...');
    // console.log('🦊 ', prevOrNext);
    // if (formattedDate !== '' && prevOrNext !== '') {
    //   fetchFdData(formattedDate, prevOrNext);
    // } else {
    //   fetchFdData();
    // }
    SplashScreen.hide();
  }, [formattedDate]);

  // CodePush: https://github.com/gulsher7/CodePushApp
  useEffect(() => {
    codePush.sync({
      updateDialog: true,
      installMode: codePush.InstallMode.IMMEDIATE,
    });
  }, []);

  // useEffect(() => {
  //   console.log('🕰 selectedDate', selectedDate);
  //   console.log('⚽️ currentSide', currentSide);

  //   if (result.length !== 0) {
  //     const fdData = getItem(result, currentSide).fdData;
  //     console.log('👑 fdData.dd', fdData.dd);
  //     updateDate(fdData.dd);
  //   }
  // }, [currentSide, result]);

  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        {isLoading ? (
          <ActivityIndicator
            color="#000000"
            size="large"
            style={[StyleSheet.absoluteFillObject, styles.loader]}
          />
        ) : null}
        <AppTitle />
        {result.length === 0 ? (
          <Carousel
            {...baseOptions}
            data={c}
            defaultIndex={0}
            loop
            panGestureHandlerProps={{activeOffsetX: [-10, 10]}}
            ref={ref}
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
            defaultIndex={activeIndex}
            snapEnabled
            loop
            onSnapToItem={index => {
              setActiveIndex(index);
              setCurrentSide(c[index].code);
            }}
            pagingEnabled={false}
            panGestureHandlerProps={{
              activeOffsetX: [-10, 10],
            }}
            ref={ref}
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
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loader: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});

export default codePush(codePushOptions)(App);
