import {Box, Text} from 'native-base';
import React from 'react';
import {APP} from '../constants';

const WinnerSectionTitle = ({
  backgroundColor = APP.TITLE_BG,
  forVideo,
  title,
}) => {
  return (
    <Box
      backgroundColor={backgroundColor}
      borderColor={backgroundColor}
      borderLeftWidth={APP.BORDER_WIDTH}
      borderRightWidth={APP.BORDER_WIDTH}
      marginBottom={forVideo ? 0 : 0}
      padding={1}
      width="100%">
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

export default WinnerSectionTitle;
