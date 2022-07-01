import {Box, Text} from 'native-base';
import React from 'react';
import {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';

const TestingScreen = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Box>
      <Text textAlign="center">TestingScreen</Text>
    </Box>
  );
};
export default TestingScreen;
