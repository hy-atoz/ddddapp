if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
}
import {NavigationContainer} from '@react-navigation/native';
import {configureStore} from '@reduxjs/toolkit';
import {NativeBaseProvider} from 'native-base';
import React from 'react';
import {AppRegistry} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider as ReduxProvider} from 'react-redux';
import App from './App';
import {name as appName} from './app.json';
import internetReducer from './src/features/internet';
import resultReducer from './src/features/result';
import theme from './src/utils/theme';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SelectDrawDateScreen from './src/screens/SelectDrawDateScreen';

const store = configureStore({
  reducer: {
    internet: internetReducer,
    result: resultReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const Stack = createNativeStackNavigator();

const RNRedux = () => (
  <NavigationContainer>
    <ReduxProvider store={store}>
      <NativeBaseProvider theme={theme}>
        <GestureHandlerRootView style={{flex: 1}}>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={App}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Testing"
              component={SelectDrawDateScreen}
              options={{title: 'Select Draw'}}
            />
          </Stack.Navigator>
        </GestureHandlerRootView>
      </NativeBaseProvider>
    </ReduxProvider>
  </NavigationContainer>
);

AppRegistry.registerComponent(appName, () => RNRedux);
