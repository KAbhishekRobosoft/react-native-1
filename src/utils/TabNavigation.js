import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Flex from '../pages/Flex';
import Icon from 'react-native-vector-icons/FontAwesome5';
import RandomGame from '../pages/RandomGame';
import Account from '../pages/Account';

const Tab = createBottomTabNavigator();

function TabNavigation() {
  return (
    <Tab.Navigator initialRouteName="Flex">
      <Tab.Screen
        name="Flex"
        component={Flex}
        options={{
          headerShown: false,
          tabBarLabel: 'Flex Box',
          tabBarIcon: () => <Icon name="box" />,
        }}
      />

      <Tab.Screen
        options={{
          headerShown: false,
          tabBarLabel: 'Game',
          tabBarIcon: () => <Icon name="gamepad" />,
        }}
        name="Game"
        component={RandomGame}
      />

      <Tab.Screen
        options={{
          headerShown: false,
          tabBarLabel: 'Account',
          tabBarIcon: () => <Icon name="user" />,
        }}
        name="Account"
        component={Account}
      />
    </Tab.Navigator>
  );
}

export default TabNavigation;
