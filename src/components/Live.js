import {HStack, Text} from 'native-base';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Live = () => {
  return (
    <HStack
      alignItems="center"
      backgroundColor="red.600"
      borderColor="white"
      borderWidth="1"
      borderRadius="sm"
      paddingX={0.5}>
      <Icon name="broadcast" color="white" size={10} />
      <Text
        allowFontScaling={false}
        color="white"
        fontSize="2xs"
        fontWeight="bold"
        paddingLeft={0.5}
        textTransform="uppercase">
        LIVE
      </Text>
    </HStack>
  );
};

export default Live;

// ●
