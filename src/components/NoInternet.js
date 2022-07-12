import {Box, Flex, Text} from 'native-base';
import React from 'react';

const NoInternet = () => {
  return (
    <Box
      backgroundColor="brand.red"
      height="10"
      position="absolute"
      shadow="5"
      width="100%"
      zIndex="999">
      <Flex
        alignItems="center"
        flexDirection="row"
        justifyContent="center"
        height="100%">
        <Text
          allowFontScaling={false}
          color="white"
          fontSize="sm"
          fontWeight="bold"
          textAlign="center"
          textTransform="capitalize">
          No internet connection 无网络连接
        </Text>
      </Flex>
    </Box>
  );
};

export default NoInternet;
