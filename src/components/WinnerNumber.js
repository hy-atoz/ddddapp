import {Flex, Text} from 'native-base';
import React from 'react';
import {APP} from '../constants';
import Letter from './Letter';

const WinnerNumber = ({hasLetter, isLast, letter, number}) => {
  return (
    <Flex
      alignItems="center"
      backgroundColor="white"
      borderRightColor={APP.GRAY_BORDER}
      borderWidth="0"
      borderRightWidth={isLast ? '0' : APP.BORDER_WIDTH}
      flex={1}
      flexGrow={1}
      flexShrink={0}
      paddingX={0}>
      {hasLetter ? <Letter text={letter} /> : null}
      <Text
        color="black"
        fontFamily="Roboto-Medium"
        fontSize="2xl"
        fontWeight="medium"
        textAlign="center">
        {number}
      </Text>
    </Flex>
  );
};

export default WinnerNumber;
