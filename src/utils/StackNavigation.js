import React from 'react';
import Home from '../pages/Home';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigation from './TabNavigation';

const Stack = createNativeStackNavigator();

function StackNavigation() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        options={{headerShown: false}}
        name="Home"
        component={Home}
      />

      <Stack.Screen
        options={{headerShown: false}}
        name="Login"
        component={Login}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="SignUp"
        component={SignUp}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="tabs"
        component={TabNavigation}
      />
    </Stack.Navigator>
  );
}

export default StackNavigation;
