import {Box, Text} from 'native-base';
import React from 'react';
import {Dimensions} from 'react-native';
import {APP} from '../constants';

const DEVICE_WIDTH = Dimensions.get('window').width;

const WinnerTop3Title = ({title}) => {
  return (
    <Box backgroundColor={APP.TITLE_BG}>
      <Text
        color="white"
        fontFamily="Roboto-Bold"
        fontSize={DEVICE_WIDTH <= 320 ? 'xs' : 'sm'}
        fontWeight="bold"
        height={DEVICE_WIDTH <= 320 ? '8' : '10'}
        padding={2}
        textAlign="center">
        {title}
      </Text>
    </Box>
  );
};

export default WinnerTop3Title;
