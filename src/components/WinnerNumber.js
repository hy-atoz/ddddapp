import {Flex, Text} from 'native-base';
import React from 'react';
import {Dimensions} from 'react-native';
import {APP} from '../constants';
import Letter from './Letter';
import LoadingSkeleton from './LoadingSkeleton';

const DEVICE_WIDTH = Dimensions.get('window').width;

const WinnerNumber = ({color = 'black', hasLetter, isLast, letter, number}) => {
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
      justifyContent="center"
      paddingX={0}>
      {hasLetter ? <Letter text={letter} /> : null}
      <LoadingSkeleton isCenter height="50%" width="80%">
        <Text
          allowFontScaling={false}
          color={color}
          fontFamily="Roboto-Medium"
          fontSize={DEVICE_WIDTH <= 320 ? 'xl' : '2xl'}
          fontWeight="medium"
          textAlign="center">
          {number}
        </Text>
      </LoadingSkeleton>
    </Flex>
  );
};

export default WinnerNumber;
