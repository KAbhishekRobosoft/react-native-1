import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Home';
import Login from './Login';

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={Home}
        />
      
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={Login}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="SignUp"
          component={SignUp}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="tabs"
          component={Root}
        />
      </Stack.Navigator>
  )
}

export default AuthStack