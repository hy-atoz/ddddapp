import React from 'react';
import {HStack} from 'native-base';
import AppHeader from '../components/AppHeader';
import AppRow from '../components/AppRow';
import CompanyHeader from '../components/CompanyHeader';
import DateAndDraw from '../components/DateAndDraw';
import Jackpot from '../components/Jackpot';
import WinnerSection from '../components/WinnerSection';
import WinnerTop3 from '../components/WinnerTop3';
import {EMPTY_ARR, TITLES} from '../constants';
import ResultScreenContainer from '../containers/ResultScreenContainer';
import {createEmptyNumberRow} from '../utils/createRow';

const BlankResultScreen = ({
  bgColor,
  hasLetter,
  index,
  isBlackText,
  isGreenText,
  source,
  name,
}) => {
  return (
    <ResultScreenContainer index={index}>
      <AppHeader disableButton={true} />
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
        <AppRow>
          {createEmptyNumberRow(EMPTY_ARR.slice(0, 5), hasLetter)}
        </AppRow>
        <AppRow>
          {createEmptyNumberRow(EMPTY_ARR.slice(5, 10), hasLetter)}
        </AppRow>
        <AppRow>
          {createEmptyNumberRow(
            [
              {key: 'empty1', id: '', name: ''},
              ...EMPTY_ARR.slice(10, 13),
              {key: 'empty2', id: '', name: ''},
            ],
            hasLetter,
          )}
        </AppRow>
      </WinnerSection>
      <WinnerSection title={TITLES.CONSOLATION}>
        <AppRow>
          {createEmptyNumberRow(EMPTY_ARR.slice(13, 18), hasLetter)}
        </AppRow>
        <AppRow>
          {createEmptyNumberRow(EMPTY_ARR.slice(18, 23), hasLetter)}
        </AppRow>
      </WinnerSection>
      <HStack marginBottom={2}>
        <Jackpot title={TITLES.FD_JACKPOT_ONE} />
        <Jackpot isLast title={TITLES.FD_JACKPOT_TWO} />
      </HStack>
    </ResultScreenContainer>
  );
};

export default BlankResultScreen;
