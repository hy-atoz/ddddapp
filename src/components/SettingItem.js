import React from 'react';
import {Pressable, Text} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import Octicons from 'react-native-vector-icons/Octicons';
import {APP} from '../constants';

const SettingItem = ({isLast = false, isSelected = false, onPress, text}) => {
  return (
    <Pressable
      // backgroundColor={isSelected ? 'gray.100' : 'white'}
      borderBottomColor="gray.200"
      borderBottomWidth={isLast ? 0 : 1}
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      onPress={onPress}
      paddingX={4}
      paddingY={3}>
      <Text color="black" fontSize="sm">
        {text}
      </Text>
      {isSelected ? (
        <Octicons color="#22c55e" name="check-circle-fill" size={20} />
      ) : (
        <Feather color="#cccccc" name="circle" size={20} />
      )}
    </Pressable>
  );
};

export default SettingItem;