import React from 'react';
import {Dimensions} from 'react-native';
import {Box, Text} from 'native-base';

const DEVICE_WIDTH = Dimensions.get('window').width;

const WinnerBadge = ({num}) => {
  return (
    <Box
      backgroundColor="amber.400"
      borderRadius="sm"
      marginRight={1}
      paddingX={1}>
      <Text
        color="white"
        fontFamily="Roboto-Bold"
        fontSize={DEVICE_WIDTH <= 320 ? '2xs' : 'xs'}
        fontWeight="bold">
        {num}
      </Text>
    </Box>
  );
};

export default WinnerBadge;
