import {Box, Flex, Text} from 'native-base';
import React from 'react';
import {APP} from '../constants';
import WinnerSectionTitle from './WinnerSectionTitle';

const {BORDER_WIDTH, GRAY_BORDER} = APP;

const Jackpot = ({isLast, prize, title}) => {
  return (
    <Flex flexGrow={1}>
      <WinnerSectionTitle title={title} />
      <Box
        backgroundColor="brand.gray"
        borderColor={GRAY_BORDER}
        borderWidth={BORDER_WIDTH}
        borderLeftWidth={isLast ? 0 : BORDER_WIDTH}
        borderTopWidth="0"
        height={10}
        padding={2}>
        <Text
          allowFontScaling={false}
          fontFamily="Roboto-Regular"
          fontSize="sm"
          fontWeight="bold"
          textAlign="center">
          {prize}
        </Text>
      </Box>
    </Flex>
  );
};

export default Jackpot;
