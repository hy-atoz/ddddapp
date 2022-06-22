import {Text} from 'native-base';
import React from 'react';

const Letter = ({isTop3, text}) => {
  return (
    <Text
      color="brand.red"
      fontSize={isTop3 ? '2xs' : '3xs'}
      fontWeight={isTop3 ? 'medium' : 'bold'}
      position="absolute"
      left={0.5}
      textTransform="uppercase">
      {text}
    </Text>
  );
};

export default Letter;
