import {Flex, Text} from 'native-base';
import React from 'react';
import {Dimensions} from 'react-native';
import {APP} from '../constants';
import Letter from './Letter';

const DEVICE_WIDTH = Dimensions.get('window').width;

const WinnerTop3Number = ({isLast, letter, result = APP.EMPTY}) => {
  return (
    <Flex
      backgroundColor="white"
      borderColor={APP.GRAY_BORDER}
      borderWidth="0"
      borderBottomWidth={isLast ? '0' : APP.BORDER_WIDTH}
      height={DEVICE_WIDTH <= 320 ? '8' : '10'}
      justifyContent="center"
      width="100%">
      <Letter isTop3 text={letter} />
      <Text
        fontFamily="Roboto-Bold"
        fontSize={DEVICE_WIDTH <= 320 ? 'xl' : '2xl'}
        fontWeight="bold"
        textAlign="center">
        {result}
      </Text>
    </Flex>
  );
};

export default WinnerTop3Number;
