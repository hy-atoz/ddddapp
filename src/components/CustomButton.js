import React from 'react';
import {Dimensions, Pressable, StyleSheet, Text} from 'react-native';

const DEVICE_WIDTH = Dimensions.get('window').width;
const color = 'black';
const fontSize = DEVICE_WIDTH <= 320 ? 12 : 14;
const paddingRight = 10;

const CustomButton = ({onPress, title}) => {
  return (
    <Pressable onPress={onPress}>
      {({pressed}) => (
        <Text style={pressed ? styles.pressed : styles.text}>{title}</Text>
      )}
    </Pressable>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  text: {
    color,
    fontSize,
    paddingRight,
  },
  pressed: {
    color,
    fontSize,
    paddingRight,
    opacity: 0.5,
  },
});
