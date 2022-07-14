import {Box, Text} from 'native-base';
import React from 'react';
import {Dimensions} from 'react-native';
import {APP} from '../constants';

const DEVICE_WIDTH = Dimensions.get('window').width;

const SectionTitle = ({
  backgroundColor = APP.TITLE_BG,
  color = 'white',
  forVideo,
  isSettingPage = false,
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
        color={color}
        fontFamily="Roboto-Bold"
        fontSize={DEVICE_WIDTH <= 320 ? 'xs' : 'sm'}
        fontWeight="bold"
        paddingX={isSettingPage ? 3 : 0}
        textAlign={isSettingPage ? 'left' : 'center'}>
        {title}
      </Text>
    </Box>
  );
};

export default SectionTitle;