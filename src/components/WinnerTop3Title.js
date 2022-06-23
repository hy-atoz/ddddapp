import {Box, Text} from 'native-base';
import React from 'react';
import {APP} from '../constants';

const WinnerTop3Title = ({title}) => {
  return (
    <Box backgroundColor={APP.TITLE_BG} padding={2}>
      <Text
        color="white"
        fontFamily="Roboto-Bold"
        fontSize="sm"
        fontWeight="bold"
        textAlign="center">
        {title}
      </Text>
    </Box>
  );
};

export default WinnerTop3Title;
