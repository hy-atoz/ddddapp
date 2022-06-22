import {HStack, VStack} from 'native-base';
import React from 'react';
import {APP, TITLES} from '../constants';
import WinnerTop3Number from './WinnerTop3Number';
import WinnerTop3Title from './WinnerTop3Title';

const {BORDER_WIDTH, EMPTY, GRAY_BORDER, TITLE_BG} = APP;

const WinnerTop3 = ({
  letter1,
  letter2,
  letter3,
  prize1 = EMPTY,
  prize2 = EMPTY,
  prize3 = EMPTY,
}) => {
  return (
    <HStack marginBottom={1}>
      <VStack
        backgroundColor={TITLE_BG}
        borderColor={TITLE_BG}
        borderWidth="0"
        borderBottomWidth={BORDER_WIDTH}
        borderTopWidth={BORDER_WIDTH}
        width="45%">
        <WinnerTop3Title title={TITLES.FIRST} />
        <WinnerTop3Title title={TITLES.SECOND} />
        <WinnerTop3Title title={TITLES.THIRD} />
      </VStack>
      <VStack
        backgroundColor="white"
        borderColor={GRAY_BORDER}
        borderWidth="0"
        borderBottomWidth={BORDER_WIDTH}
        borderTopWidth={BORDER_WIDTH}
        borderRightWidth={BORDER_WIDTH}
        width="55%">
        <WinnerTop3Number letter={letter1} result={prize1} />
        <WinnerTop3Number letter={letter2} result={prize2} />
        <WinnerTop3Number isLast letter={letter3} result={prize3} />
      </VStack>
    </HStack>
  );
};

export default WinnerTop3;
