import React from 'react';
import {Pressable, Text} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';

const SettingItem = ({isLast = false, isSelected = false, onPress, text}) => {
  return (
    <Pressable
      backgroundColor={isSelected ? 'gray.100' : 'white'}
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
      {isSelected ? <Icon name="checkmark" size={20} /> : null}
    </Pressable>
  );
};

export default SettingItem;
