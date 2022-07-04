import React from 'react';
import {Dimensions} from 'react-native';
import {Box, Text} from 'native-base';

const DEVICE_WIDTH = Dimensions.get('window').width;

const SixDJackpot = ({amount, backgroundColor, hasPrefix}) => {
  return (
    <Box backgroundColor={backgroundColor} marginY={2} paddingY={2}>
      <Text
        color="white"
        fontSize={DEVICE_WIDTH <= 320 ? 'md' : 'lg'}
        fontWeight="bold"
        textAlign="center">
        Jackpot Pool
      </Text>
      <Text
        color="white"
        fontSize={DEVICE_WIDTH <= 320 ? 'lg' : 'xl'}
        fontWeight="bold"
        textAlign="center">
        {hasPrefix ? `USD${amount}` : `${amount}`}
      </Text>
    </Box>
  );
};

export default SixDJackpot;
