import React from 'react';
import {Dimensions} from 'react-native';
import {Box, HStack} from 'native-base';
import {APP} from '../constants';

const DEVICE_WIDTH = Dimensions.get('window').width;
const {BORDER_WIDTH, GRAY_BORDER} = APP;
const height = DEVICE_WIDTH <= 320 ? 8 : 10;

const AppRow = ({children, isEmpty = false}) => {
  return (
    <>
      {isEmpty ? (
        <Box
          borderColor={GRAY_BORDER}
          borderWidth={BORDER_WIDTH}
          borderTopWidth="0"
          height={height}
          width="100%"
        />
      ) : (
        <HStack
          borderColor={GRAY_BORDER}
          borderBottomWidth={BORDER_WIDTH}
          borderLeftWidth={BORDER_WIDTH}
          borderRightWidth={BORDER_WIDTH}
          height={height}
          width="100%">
          {children}
        </HStack>
      )}
    </>
  );
};

export default AppRow;
