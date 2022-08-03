import {Flex, Heading, HStack, Image} from 'native-base';
import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import Blink from './Blink';
import Live from './Live';
import New from './New';

const DEVICE_WIDTH = Dimensions.get('window').width;

const CompanyHeader = ({
  bgColor,
  isBlackText = false,
  isGreenText = false,
  isLive = 0,
  isToday = 0,
  name,
  source,
}) => {
  let color = '';
  if (isBlackText) {
    color = 'black';
  } else if (isGreenText) {
    color = 'brand.sandakanText';
  } else {
    color = 'white';
  }

  return (
    <HStack
      alignItems="center"
      backgroundColor={bgColor}
      justifyContent="center"
      paddingY={1}
      space={2}>
      <Image
        alt={name}
        height={DEVICE_WIDTH <= 320 ? 6 : 8}
        width={DEVICE_WIDTH <= 320 ? 6 : 8}
        source={source}
      />
      <Heading
        allowFontScaling={false}
        alignSelf="center"
        color={color}
        fontFamily="Roboto-Bold"
        fontSize={DEVICE_WIDTH <= 320 ? 'sm' : 'md'}
        textAlign="center">
        {name}
      </Heading>
      {isLive === 1 && (
        <Flex position="absolute" right="1">
          <Blink duration={2000}>
            <Live />
          </Blink>
        </Flex>
      )}
      {isToday === 1 && (
        <Flex position="absolute" right="1">
          <New />
        </Flex>
      )}
    </HStack>
  );
};

export default CompanyHeader;
