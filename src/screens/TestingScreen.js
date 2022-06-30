import {View, Text} from 'react-native';
import React from 'react';
import {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';

const TestingScreen = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <View>
      <Text>TestingScreen</Text>
    </View>
  );
};
export default TestingScreen;
