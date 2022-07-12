import moment from 'moment';
import {HStack} from 'native-base';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import AppHeader from '../components/AppHeader';
import AppRow from '../components/AppRow';
import CompanyHeader from '../components/CompanyHeader';
import DateAndDraw from '../components/DateAndDraw';
import Jackpot from '../components/Jackpot';
import SixDJackpot from '../components/SixDJackpot';
import WinnerSection from '../components/WinnerSection';
import WinnerTop3 from '../components/WinnerTop3';
import YouTubePlayer from '../components/YouTubePlayer';
import {
  ALPHABET,
  API_BASE_URL,
  DRAW_TIME,
  REFRESH_RATE_MILLISECOND,
  REFRESH_RATE_SECOND,
  TARGET_TIME,
  TIME_FORMAT_LONG,
  TITLES,
} from '../constants';
import ResultScreenContainer from '../containers/ResultScreenContainer';
import {saveResult, setIsLiveStarted, setIsLoading} from '../features/result';
import {createNumberRow} from '../utils/createRow';
import formatPrize from '../utils/formatPrize';

const AtoE = ALPHABET.slice(0, 5);
const FtoJ = ALPHABET.slice(5, 10);
const KtoM = [
  {id: 'empty1', name: ''},
  ...ALPHABET.slice(10, 13),
  {id: 'empty2', name: ''},
];
const NtoR = ALPHABET.slice(13, 18);
const StoW = ALPHABET.slice(18, 23);

const ResultScreen = ({
  bgColor,
  companyCode,
  hasLastRow,
  hasLetter,
  hasLiveVideo,
  index,
  isBlackText,
  isGreenText,
  source,
  name,
}) => {
  const [currentTime, setCurrentTime] = useState(TARGET_TIME);

  const dispatch = useDispatch();
  const isLiveStarted = useSelector(state => state.result.isLiveStarted);
  const fdData = useSelector(
    state => state.result.value.find(f => f.type === companyCode).fdData,
  );

  // Fetch the latest data from the base api endpoint
  const fetchFdData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}`);
      const json = await response.json();
      dispatch(saveResult(json));
      dispatch(setIsLoading(false));
    } catch (err) {
      console.error(err);
    }
  };

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
  }, [currentTime, isLiveStarted]);

  const {
    day,
    dd,
    dn,
    isLive,
    isToday,
    jp1,
    jp2,
    n1,
    n1_pos,
    n2,
    n2_pos,
    n3,
    n3_pos,
  } = fdData;
  const hasJackpotAmount = fdData?.jackpotAmount;
  // const hasJackpotGD = fdData?.JackpotPrize;
  const urlId = fdData?.videoUrl;
  var videoId = '';
  if (urlId !== undefined) {
    videoId = urlId.slice(30, 41);
  }

  return (
    <ResultScreenContainer index={index}>
      <AppHeader disableButton={false} />
      <CompanyHeader
        bgColor={bgColor}
        isBlackText={isBlackText}
        isGreenText={isGreenText}
        isLive={Number(isLive) && isLiveStarted}
        isToday={Number(isLive) === 0 && isToday}
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
};

export default ResultScreen;
