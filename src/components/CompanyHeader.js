import {Flex, Heading, HStack, Image} from 'native-base';
import React from 'react';
// import Blink from '.re';
import Live from './Live';
import New from './New';

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
      <Image key={source} alt={name} height={8} width={8} source={source} />
      <Heading
        alignSelf="center"
        color={color}
        fontFamily="Roboto-Bold"
        fontSize="md"
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
