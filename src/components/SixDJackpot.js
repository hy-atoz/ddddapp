import React from 'react';
import {Box, Text} from 'native-base';

const SixDJackpot = ({amount, backgroundColor, hasPrefix}) => {
  return (
    <Box backgroundColor={backgroundColor} marginY={2} paddingY={2}>
      <Text color="white" fontSize="lg" fontWeight="bold" textAlign="center">
        Jackpot Pool
      </Text>
      <Text color="white" fontSize="xl" fontWeight="bold" textAlign="center">
        {hasPrefix ? `USD${amount}` : `${amount}`}
      </Text>
    </Box>
  );
};

export default SixDJackpot;
