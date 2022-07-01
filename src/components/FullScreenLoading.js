import {Box} from 'native-base';
import React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';

const FullScreenLoading = () => {
  return (
    <Box style={[StyleSheet.absoluteFillObject, styles.container]}>
      <ActivityIndicator
        color="#000000"
        size="large"
        style={[StyleSheet.absoluteFillObject, styles.loader]}
      />
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    flex: 1,
    zIndex: 1,
  },
  loader: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default FullScreenLoading;
