import {Text} from 'native-base';
import React from 'react';
import LoadingSkeleton from './LoadingSkeleton';

const Letter = ({isTop3, text}) => {
  return (
    <>
      {isTop3 ? (
        <LoadingSkeleton height="2" width="5%">
          <Text
            allowFontScaling={false}
            color="brand.red"
            fontFamily="Roboto-Regular"
            fontSize={isTop3 ? '2xs' : '3xs'}
            fontWeight={isTop3 ? 'medium' : 'bold'}
            position="absolute"
            left={0.5}
            top={0}
            textTransform="uppercase">
            {text}
          </Text>
        </LoadingSkeleton>
      ) : (
        <Text
          allowFontScaling={false}
          color="brand.red"
          fontFamily="Roboto-Regular"
          fontSize={isTop3 ? '2xs' : '3xs'}
          fontWeight={isTop3 ? 'medium' : 'bold'}
          position="absolute"
          left={0.5}
          top={0}
          textTransform="uppercase">
          {text}
        </Text>
      )}
    </>
  );
};

export default Letter;
