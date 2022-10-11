import React from 'react';
import TodoInput from '../pages/TodoInput';
import TodoTrend from '../pages/TodoTrend';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Tab = createBottomTabNavigator();

function TabNavigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarLabel: 'Todo Input',
          tabBarIcon: () => <Icon name="keyboard" />,
        }}
        name="TodoInput"
        component={TodoInput}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarLabel: 'Todo Display',
          tabBarIcon: () => <Icon name="tv" />,
        }}
        name="TodoDisplay"
        component={TodoTrend}
      />
    </Tab.Navigator>
  );
}

export default TabNavigation;
