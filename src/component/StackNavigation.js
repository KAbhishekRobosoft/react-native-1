import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FlatList from '../pages/FlatList';
import AddSite from '../pages/AddSite';

const Stack = createNativeStackNavigator();

function StackNavigation() {
  return (
      <Stack.Navigator initialRouteName="FlatList">
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="List"
          component={FlatList}
        />
        <Stack.Screen
          options={{
            headerStyle: {
              backgroundColor: '#0e85ff',
            },
            headerTitleStyle: {
              color: 'white',
            },
            headerTintColor: '#ffffff',
          }}
          name="AddSite"
          component={AddSite}
        />
      </Stack.Navigator>
  );
}

export default StackNavigation;