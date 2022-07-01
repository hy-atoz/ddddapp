import React from 'react';
import {Platform} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import App from '../../App';
import TestingScreen from '../screens/TestingScreen';
import SettingScreen from '../screens/SettingScreen';
import {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';

const Tab = createBottomTabNavigator();

function BottomTabs() {
  const ROUTES = {
    dashboard: 'Dashboard',
    toolbox: 'Toolbox',
    result: 'Result',
    notification: 'Notification',
    settings: 'Settings',
  };

  const headerOptions = {
    headerStyle: {height: Platform.OS === 'ios' ? 80 : 40},
    headerTitleAlign: 'center',
    headerTitleStyle: {
      fontSize: 16,
    },
  };

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Tab.Navigator
      initialRouteName="Settings"
      sceneContainerStyle={{backgroundColor: 'white'}}
      screenOptions={({route}) => ({
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          size = 20;
          switch (route.name) {
            case ROUTES.dashboard:
              iconName = focused ? 'ios-menu' : 'ios-menu';
              size = 22;
              break;
            case ROUTES.notification:
              iconName = focused
                ? 'ios-chatbubbles-sharp'
                : 'ios-chatbubbles-outline';
              break;
            case ROUTES.result:
              iconName = focused ? 'ios-calculator' : 'ios-calculator-outline';
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
        component={TestingScreen}
        options={{...headerOptions}}
      />
      <Tab.Screen
        name={ROUTES.notification}
        component={TestingScreen}
        options={{...headerOptions}}
      />
      <Tab.Screen
        name={ROUTES.result}
        component={App}
        options={{
          headerTitle: '4DNum Results',
          ...headerOptions,
        }}
      />
      <Tab.Screen
        name={ROUTES.toolbox}
        component={TestingScreen}
        options={{...headerOptions}}
      />
      <Tab.Screen
        name={ROUTES.settings}
        component={SettingScreen}
        options={{...headerOptions}}
      />
    </Tab.Navigator>
  );
}

export default BottomTabs;
