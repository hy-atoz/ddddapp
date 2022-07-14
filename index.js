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
import {name as appName} from './app.json';
import BottomTabs from './src/containers/BottomTabs';
import companyReducer from './src/features/company';
import internetReducer from './src/features/internet';
import resultReducer from './src/features/result';
import settingReducer from './src/features/setting';
import './src/i18n';
import theme from './src/utils/theme';

const store = configureStore({
  reducer: {
    company: companyReducer,
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
