import AsyncStorage from '@react-native-async-storage/async-storage';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  activateKeepAwake,
  deactivateKeepAwake,
} from '@sayem314/react-native-keep-awake';
import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {Dimensions, Platform, StatusBar} from 'react-native';
import {hasNotch} from 'react-native-device-info';
import SplashScreen from 'react-native-splash-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import App from '../../App';
import {updateOrder} from '../features/company';
import {setLanguage} from '../features/setting';
import {LANGUAGE_STOGRAGE_KEY, ORDER_STORAGE_KEY} from '../i18n';
import DashboardScreen from '../screens/DashboardScreen';
import SettingScreen from '../screens/SettingScreen';
import TestingScreen from '../screens/TestingScreen';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const DEVICE_WIDTH = Dimensions.get('window').width;
const Tab = createBottomTabNavigator();

function BottomTabs() {
  const insets = useSafeAreaInsets();
  const screenOn = useSelector(state => state.setting.screenOn);
  const {t, i18n} = useTranslation();
  const dispatch = useDispatch();

  const ROUTES = {
    dashboard: 'Dashboard',
    toolbox: 'Toolbox',
    result: 'Results',
    notification: 'Notification',
    settings: 'Settings',
  };

  const ROUTE_NAMES = {
    dashboard: t('bottomTab:dashboard'),
    toolbox: t('bottomTab:toolbox'),
    result: t('bottomTab:results'),
    notification: t('bottomTab:notification'),
    settings: t('bottomTab:settings'),
  };

  const headerOptions = {
    headerStyle: {
      backgroundColor: '#eeeeee',
      height: !hasNotch() || Platform.OS === 'android' ? 50 : 80,
    },
    headerTitleAlign: 'center',
    headerTitleStyle: {
      fontSize: DEVICE_WIDTH <= 320 ? 14 : 16,
    },
  };

  const getSavedLanguage = async () => {
    try {
      const lang = await AsyncStorage.getItem(LANGUAGE_STOGRAGE_KEY);
      if (lang) {
        dispatch(setLanguage(lang));
        i18n.changeLanguage(lang);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getSavedOrder = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(ORDER_STORAGE_KEY);
      return jsonValue != null
        ? dispatch(updateOrder(JSON.parse(jsonValue)))
        : null;
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getSavedLanguage();
    getSavedOrder();
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    console.log('👀', screenOn);
    if (screenOn) {
      activateKeepAwake();
    } else {
      deactivateKeepAwake();
    }
  }, [screenOn]);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Tab.Navigator
        initialRouteName={ROUTES.result}
        sceneContainerStyle={{backgroundColor: 'white'}}
        screenOptions={({route}) => ({
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'gray',
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            switch (route.name) {
              case ROUTES.dashboard:
                iconName = focused ? 'ios-menu' : 'ios-menu';
                break;
              case ROUTES.notification:
                iconName = focused
                  ? 'ios-chatbubbles-sharp'
                  : 'ios-chatbubbles-outline';
                break;
              case ROUTES.result:
                iconName = focused
                  ? 'ios-calculator'
                  : 'ios-calculator-outline';
                break;
              case ROUTES.toolbox:
                iconName = focused ? 'ios-cube' : 'ios-cube-outline';
                break;
              case ROUTES.settings:
                iconName = focused
                  ? 'ios-settings-sharp'
                  : 'ios-settings-outline';
                break;
              default:
                iconName = '';
            }
            return <Icon name={iconName} size={size} color={color} />;
          },
        })}>
        <Tab.Screen
          name={ROUTES.dashboard}
          component={DashboardScreen}
          options={({navigation, route}) => ({
            headerTitle: t('header:dashboard'),
            title: ROUTE_NAMES.dashboard,
            ...headerOptions,
          })}
        />
        <Tab.Screen
          name={ROUTES.notification}
          component={TestingScreen}
          options={{
            headerTitle: t('header:notification'),
            title: ROUTE_NAMES.notification,
            ...headerOptions,
          }}
        />
        <Tab.Screen
          name={ROUTES.result}
          component={App}
          options={{
            headerTitle: t('header:results'),
            title: ROUTE_NAMES.result,
            ...headerOptions,
          }}
        />
        <Tab.Screen
          name={ROUTES.toolbox}
          component={TestingScreen}
          options={{
            headerTitle: t('header:toolbox'),
            title: ROUTE_NAMES.toolbox,
            ...headerOptions,
          }}
        />
        <Tab.Screen
          name={ROUTES.settings}
          component={SettingScreen}
          options={{
            headerTitle: t('header:settings'),
            title: ROUTE_NAMES.settings,
            ...headerOptions,
          }}
        />
      </Tab.Navigator>
    </>
  );
}

export default BottomTabs;
