import {HStack, Text} from 'native-base';
import React from 'react';
import Icon from 'react-native-vector-icons/Entypo';

const New = () => {
  return (
    <HStack
      alignItems="center"
      backgroundColor="darkBlue.600"
      borderColor="white"
      borderWidth="1"
      borderRadius="sm"
      paddingX={0.5}>
      <Icon name="new" color="white" size={10} />
      <Text
        color="white"
        fontSize="2xs"
        fontWeight="bold"
        paddingLeft={0.5}
        textTransform="uppercase">
        NEW
      </Text>
    </HStack>
  );
};

export default New;
