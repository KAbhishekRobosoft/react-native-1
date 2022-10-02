import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Flex from '../pages/Flex';
import FlatList from '../pages/FlatList';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Account from '../pages/Account';
import AdminAccounts from '../pages/AdminAccounts';

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
          tabBarLabel: 'FlatList',
          tabBarIcon: () => <Icon name="list" />,
        }}
        name="FlatList"
        component={FlatList}
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

        <Tab.Screen
        options={{
          headerShown: false,
          tabBarLabel: 'Admin',
          tabBarIcon: () => <Icon name="user" />,
        }}
        name="Admin"
        component={AdminAccounts}
      />

    </Tab.Navigator>
  );
}

export default TabNavigation;
