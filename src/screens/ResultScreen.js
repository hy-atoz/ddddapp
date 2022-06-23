import React, {useState, useEffect} from 'react';
import moment from 'moment';
import momentTz from 'moment-timezone';
import {HStack} from 'native-base';
import * as RNLocalize from 'react-native-localize';
import {useDispatch, useSelector} from 'react-redux';
import AppHeader from '../components/AppHeader';
import AppRow from '../components/AppRow';
import CompanyHeader from '../components/CompanyHeader';
import DateAndDraw from '../components/DateAndDraw';
import Jackpot from '../components/Jackpot';
import WinnerSection from '../components/WinnerSection';
import WinnerTop3 from '../components/WinnerTop3';
import {ALPHABET, API_BASE_URL, EMPTY_ARR, TITLES} from '../constants';
import ResultScreenContainer from '../containers/ResultScreenContainer';
import createNumberRow, {createEmptyNumberRow} from '../utils/createRow';
import formatPrize from '../utils/formatPrize';
import getItem from '../utils/getItem';
import YouTubePlayer from '../components/YouTubePlayer';
import SixDJackpot from '../components/SixDJackpot';
import axios from 'axios';
import {addResult, setIsLoading, setSelectedDate} from '../features/result';

const drawTime = {start: 190000, end: 204500};
const MALAYSIA_TIME_ZONE = 'Asia/Kuala_Lumpur';
const today = moment().format('YYYY-MM-DD HH:mm');
const deviceTimeZone = RNLocalize.getTimeZone();
const deviceTime = momentTz.tz(today, deviceTimeZone);
const targetTime = deviceTime.clone().tz(MALAYSIA_TIME_ZONE).format('HHmmss');
const targetDate = deviceTime
  .clone()
  .tz(MALAYSIA_TIME_ZONE)
  .format('YYYY-MM-DD');

const ResultScreen = ({
  bgColor,
  companyCode,
  hasLastRow,
  hasLetter,
  hasLiveVideo,
  isBlackText,
  isGreenText,
  source,
  name,
}) => {
  const dispatch = useDispatch();
  const [currentTime, setCurrentTime] = useState(targetTime);
  const [liveee, setLiveee] = useState(0);
  const result = useSelector(state => state.result.value);
  const isLoading = useSelector(state => state.result.isLoading);

  // Decide whether to go live or not
  useEffect(() => {
    let timer;
    if (
      Number(currentTime) >= drawTime.start &&
      Number(currentTime) <= drawTime.end
    ) {
      setIsLoading(false);
      setLiveee(1);

      timer = setInterval(() => {
        setCurrentTime(prevTime =>
          moment(prevTime, 'HHmmss').add(30, 'seconds').format('HHmmss'),
        );
        if (
          Number(currentTime) >= drawTime.start &&
          Number(currentTime) <= drawTime.end
        ) {
          console.log('🔴 live:', currentTime);
          setIsLoading(false);
          setLiveee(1);
          fetchFdData();
        } else {
          setLiveee(0);
          // console.log('❌ nestedIf offline:', currentTime);
          clearInterval(timer);
        }
      }, 30000);
      return () => {
        clearInterval(timer);
      };
    } else {
      setLiveee(0);
      // console.log('❌ else offline:', currentTime);
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [currentTime, liveee]);

  const fetchFdData = async () => {
    const response = await fetch(`${API_BASE_URL}`);
    const json = await response.json();
    dispatch(addResult(json));
  };

  if (result.length === 0) {
    return (
      <ResultScreenContainer>
        <AppHeader />
        <CompanyHeader
          bgColor={bgColor}
          isBlackText={isBlackText}
          isGreenText={isGreenText}
          name={name}
          source={source}
        />
        <DateAndDraw />
        <WinnerTop3 />
        <WinnerSection title={TITLES.SPECIAL}>
          <AppRow>{createEmptyNumberRow(EMPTY_ARR.slice(0, 5))}</AppRow>
          <AppRow>{createEmptyNumberRow(EMPTY_ARR.slice(5, 10))}</AppRow>
          <AppRow>
            {createEmptyNumberRow([
              {id: 'empty1', name: ''},
              ...EMPTY_ARR.slice(10, 13),
              {id: 'empty2', name: ''},
            ])}
          </AppRow>
        </WinnerSection>
        <WinnerSection title={TITLES.CONSOLATION}>
          <AppRow>{createEmptyNumberRow(EMPTY_ARR.slice(13, 18))}</AppRow>
          <AppRow>{createEmptyNumberRow(EMPTY_ARR.slice(18, 23))}</AppRow>
        </WinnerSection>
        <HStack marginBottom={2}>
          <Jackpot title={TITLES.FD_JACKPOT_ONE} />
          <Jackpot isLast title={TITLES.FD_JACKPOT_TWO} />
        </HStack>
      </ResultScreenContainer>
    );
  } else {
    const fdData = getItem(result, companyCode).fdData;
    const {
      day,
      dd,
      dn,
      isLive,
      isToday,
      jp1,
      jp2,
      n1,
      n2,
      n3,
      n1_pos,
      n2_pos,
      n3_pos,
    } = fdData;
    const AtoE = ALPHABET.slice(0, 5);
    const FtoJ = ALPHABET.slice(5, 10);
    const KtoM = [
      {id: 'empty1', name: ''},
      ...ALPHABET.slice(10, 13),
      {id: 'empty2', name: ''},
    ];
    const NtoR = ALPHABET.slice(13, 18);
    const StoW = ALPHABET.slice(18, 23);

    const hasJackpotAmount = fdData?.jackpotAmount;
    const hasJackpotGD = fdData?.JackpotPrize;
    const urlId = fdData?.videoUrl;
    var videoId = '';
    if (urlId !== undefined) {
      videoId = urlId.slice(30, 41);
    }

    return (
      <ResultScreenContainer>
        <AppHeader />
        <CompanyHeader
          bgColor={bgColor}
          isBlackText={isBlackText}
          isGreenText={isGreenText}
          // isLive={Number(isLive) && liveee}
          isLive={1}
          isToday={Number(isLive) === 0 && isToday}
          // isToday={1}
          name={name}
          source={source}
        />
        <DateAndDraw date={dd} day={day} draw={dn} />
        <WinnerTop3
          prize1={n1}
          prize2={n2}
          prize3={n3}
          letter1={n1_pos}
          letter2={n2_pos}
          letter3={n3_pos}
        />
        <WinnerSection title={TITLES.SPECIAL}>
          <AppRow>{createNumberRow(AtoE, fdData, hasLetter)}</AppRow>
          <AppRow>{createNumberRow(FtoJ, fdData, hasLetter)}</AppRow>
          {hasLastRow ? (
            <AppRow>{createNumberRow(KtoM, fdData, hasLetter)}</AppRow>
          ) : (
            <AppRow isEmpty />
          )}
        </WinnerSection>
        <WinnerSection title={TITLES.CONSOLATION}>
          <AppRow>{createNumberRow(NtoR, fdData, hasLetter)}</AppRow>
          <AppRow>{createNumberRow(StoW, fdData, hasLetter)}</AppRow>
        </WinnerSection>
        {!jp1 || !jp2 ? null : (
          <HStack>
            <Jackpot
              prize={formatPrize('en-MY', 'RM', jp1)}
              title={TITLES.FD_JACKPOT_ONE}
            />
            <Jackpot
              isLast
              prize={formatPrize('en-MY', 'RM', jp2)}
              title={TITLES.FD_JACKPOT_TWO}
            />
          </HStack>
        )}
        {hasJackpotAmount !== undefined ? (
          <SixDJackpot
            backgroundColor="brand.hari"
            amount={hasJackpotAmount}
            hasPrefix={true}
          />
        ) : null}
        {/* {hasJackpotGD !== undefined ? (
          <SixDJackpot
            backgroundColor="brand.gd"
            amount={hasJackpotGD}
            hasPrefix={false}
          />
        ) : null} */}
        {hasLiveVideo ? <YouTubePlayer videoId={videoId} /> : null}
      </ResultScreenContainer>
    );
  }
};

export default ResultScreen;
