import {Box, Text} from 'native-base';
import React from 'react';
import {APP} from '../constants';
import Letter from './Letter';

const WinnerTop3Number = ({isLast, letter, result = APP.EMPTY}) => {
  return (
    <Box
      backgroundColor="white"
      borderColor={APP.GRAY_BORDER}
      borderWidth="0"
      borderBottomWidth={isLast ? '0' : APP.BORDER_WIDTH}
      width="100%">
      <Letter isTop3 text={letter} />
      <Text
        fontFamily="Roboto-Bold"
        fontSize="2xl"
        fontWeight="bold"
        textAlign="center">
        {result}
      </Text>
    </Box>
  );
};

export default WinnerTop3Number;
