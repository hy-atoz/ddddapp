import React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';

const FullScreenLoading = () => {
  return (
    <ActivityIndicator
      color="#000000"
      size="large"
      style={[StyleSheet.absoluteFillObject, styles.loader]}
    />
  );
};

const styles = StyleSheet.create({
  loader: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    flex: 1,
    justifyContent: 'center',
    zIndex: 1,
  },
});

export default FullScreenLoading;
