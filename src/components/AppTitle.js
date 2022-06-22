import React from 'react';
import {HStack, Text} from 'native-base';
import {TITLES} from '../constants';

const AppTitle = ({isLive}) => {
  // const pressHandler = () => {
  //   console.log('hello');
  // };

  return (
    <HStack
      alignItems="center"
      backgroundColor="gray.200"
      justifyContent="center"
      paddingY={2}>
      <Text fontWeight="bold">{TITLES.APP}</Text>
      {/* <Flex position="absolute" right="4" bottom="1">
        {isLive === 1 ? <Refresh isSpinning /> : <Refresh />}
      </Flex> */}
    </HStack>
  );
};

export default AppTitle;
