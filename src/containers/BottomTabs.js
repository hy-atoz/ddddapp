import React from 'react';
import {Dimensions, Platform, StatusBar} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import App from '../../App';
import TestingScreen from '../screens/TestingScreen';
import SettingScreen from '../screens/SettingScreen';
import {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import DashboardScreen from '../screens/DashboardScreen';
import {hasNotch} from 'react-native-device-info';
import {useSelector} from 'react-redux';
import {
  activateKeepAwake,
  deactivateKeepAwake,
} from '@sayem314/react-native-keep-awake';
import {useTranslation} from 'react-i18next';

const DEVICE_WIDTH = Dimensions.get('window').width;
const Tab = createBottomTabNavigator();

function BottomTabs() {
  const screenOn = useSelector(state => state.setting.screenOn);
  const {t} = useTranslation();

  const ROUTES = {
    // dashboard: t('bottomTab:dashboard'),
    // toolbox: t('bottomTab:toolbox'),
    // result: t('bottomTab:results'),
    // notification: t('bottomTab:notification'),
    // settings: t('bottomTab:settings'),
    dashboard: 'Dashboard',
    toolbox: 'Toolbox',
    result: 'Results',
    notification: 'Notification',
    settings: 'Settings',
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

  useEffect(() => {
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
            ...headerOptions,
          })}
        />
        <Tab.Screen
          name={ROUTES.notification}
          component={TestingScreen}
          options={{headerTitle: t('header:notification'), ...headerOptions}}
        />
        <Tab.Screen
          name={ROUTES.result}
          component={App}
          options={{headerTitle: t('header:results'), ...headerOptions}}
        />
        <Tab.Screen
          name={ROUTES.toolbox}
          component={TestingScreen}
          options={{headerTitle: t('header:toolbox'), ...headerOptions}}
        />
        <Tab.Screen
          name={ROUTES.settings}
          component={SettingScreen}
          options={{headerTitle: t('header:settings'), ...headerOptions}}
        />
      </Tab.Navigator>
    </>
  );
}

export default BottomTabs;
