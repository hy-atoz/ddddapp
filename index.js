if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
}
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {configureStore} from '@reduxjs/toolkit';
import {NativeBaseProvider} from 'native-base';
import {AppRegistry} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider as ReduxProvider} from 'react-redux';
import {name as appName} from './app.json';
import internetReducer from './src/features/internet';
import resultReducer from './src/features/result';
import settingReducer from './src/features/setting';
import theme from './src/utils/theme';
import BottomTabs from './src/containers/BottomTabs';
import './src/i18n';

const store = configureStore({
  reducer: {
    internet: internetReducer,
    result: resultReducer,
    setting: settingReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const RNRedux = () => (
  <ReduxProvider store={store}>
    <NativeBaseProvider theme={theme}>
      <GestureHandlerRootView style={{flex: 1}}>
        <NavigationContainer>
          <BottomTabs />
        </NavigationContainer>
      </GestureHandlerRootView>
    </NativeBaseProvider>
  </ReduxProvider>
);

AppRegistry.registerComponent(appName, () => RNRedux);
