import React from 'react';
import {configureStore} from '@reduxjs/toolkit';
import {NativeBaseProvider} from 'native-base';
import {AppRegistry} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import App from './App';
import {name as appName} from './app.json';
import internetReducer from './src/features/internet';
import resultReducer from './src/features/result';
import theme from './src/utils/theme';

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

const RNRedux = () => (
  <Provider store={store}>
    <NativeBaseProvider theme={theme}>
      <GestureHandlerRootView style={{flex: 1}}>
        <App />
      </GestureHandlerRootView>
    </NativeBaseProvider>
  </Provider>
);

AppRegistry.registerComponent(appName, () => RNRedux);
