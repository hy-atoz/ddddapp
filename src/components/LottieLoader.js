import LottieView from 'lottie-react-native';
import React from 'react';
import {View, StyleSheet} from 'react-native';

const LottieLoader = () => {
  return (
    <View style={[StyleSheet.absoluteFillObject, styles.container]}>
      <LottieView source={require('../../assets/loader.json')} autoPlay loop />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});

export default LottieLoader;
