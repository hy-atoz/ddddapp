import {HStack, Text} from 'native-base';
import React from 'react';
import {Dimensions} from 'react-native';
import LoadingSkeleton from './LoadingSkeleton';

const DEVICE_WIDTH = Dimensions.get('window').width;

const DateAndDraw = ({date = '----/--/--', day = '---', draw = '---/---'}) => {
  return (
    <HStack
      backgroundColor="white"
      justifyContent="space-between"
      paddingY={DEVICE_WIDTH <= 320 ? '1' : '2'}>
      {/* <LoadingSkeleton width="30%"> */}
      <Text
        allowFontScaling={false}
        fontFamily="Roboto-Bold"
        fontSize={DEVICE_WIDTH <= 320 ? 'xs' : 'sm'}
        fontWeight="bold">{`${date} (${day})`}</Text>
      {/* </LoadingSkeleton> */}
      {/* <LoadingSkeleton width="15%"> */}
      <Text
        allowFontScaling={false}
        fontFamily="Roboto-Bold"
        fontSize={DEVICE_WIDTH <= 320 ? 'xs' : 'sm'}
        fontWeight="bold">{`${draw}`}</Text>
      {/* </LoadingSkeleton> */}
    </HStack>
  );
};
export default DateAndDraw;
