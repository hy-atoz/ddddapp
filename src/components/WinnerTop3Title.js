import {Flex, Text} from 'native-base';
import React from 'react';
import {Dimensions} from 'react-native';
import {APP} from '../constants';

const DEVICE_WIDTH = Dimensions.get('window').width;

const WinnerTop3Title = ({title}) => {
  return (
    <Flex
      backgroundColor={APP.TITLE_BG}
      height={DEVICE_WIDTH <= 320 ? '8' : '10'}
      justifyContent="center">
      <Text
        allowFontScaling={false}
        color="white"
        fontFamily="Roboto-Bold"
        fontSize={DEVICE_WIDTH <= 320 ? 'xs' : 'sm'}
        fontWeight="bold"
        textAlign="center">
        {title}
      </Text>
    </Flex>
  );
};

export default WinnerTop3Title;
