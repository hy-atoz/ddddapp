import {Box, HStack, Text} from 'native-base';
import React from 'react';

const DateAndDraw = ({date = '----/--/--', day = '---', draw = '---/---'}) => {
  return (
    <HStack backgroundColor="white" justifyContent="space-between" paddingY={2}>
      <Box>
        <Text fontWeight="bold">{`${date} (${day})`}</Text>
      </Box>
      <Box>
        <Text fontWeight="bold">{`${draw}`}</Text>
      </Box>
    </HStack>
  );
};
export default DateAndDraw;
