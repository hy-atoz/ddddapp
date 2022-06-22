import React from 'react';
import {Box, HStack} from 'native-base';
import {APP} from '../constants';

const {BORDER_WIDTH, GRAY_BORDER} = APP;

const AppRow = ({children, isEmpty = false}) => {
  return (
    <>
      {isEmpty ? (
        <Box
          borderColor={GRAY_BORDER}
          borderWidth={BORDER_WIDTH}
          borderTopWidth="0"
          height={10}
          width="100%"
        />
      ) : (
        <HStack
          borderColor={GRAY_BORDER}
          borderBottomWidth={BORDER_WIDTH}
          borderLeftWidth={BORDER_WIDTH}
          borderRightWidth={BORDER_WIDTH}
          height={10}
          width="100%">
          {children}
        </HStack>
      )}
    </>
  );
};

export default AppRow;
