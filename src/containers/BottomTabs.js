import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import App from '../../App';
import TestingScreen from '../screens/TestingScreen';

const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Result"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          size = 20;

          if (route.name === 'Result') {
            iconName = focused ? 'ios-calculator' : 'ios-calculator-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'ios-settings-sharp' : 'ios-settings-outline';
          } else if (route.name === 'Dashboard') {
            iconName = focused ? 'ios-menu' : 'ios-menu';
            size = 24;
          } else if (route.name === 'Toolbox') {
            iconName = focused ? 'ios-cube' : 'ios-cube-outline';
          } else if (route.name === 'Notification') {
            iconName = focused
              ? 'ios-chatbubbles-sharp'
              : 'ios-chatbubbles-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="Dashboard" component={TestingScreen} />
      <Tab.Screen name="Toolbox" component={TestingScreen} />
      <Tab.Screen name="Result" component={App} />
      <Tab.Screen name="Notification" component={TestingScreen} />
      <Tab.Screen name="Settings" component={TestingScreen} />
    </Tab.Navigator>
  );
}

export default BottomTabs;
