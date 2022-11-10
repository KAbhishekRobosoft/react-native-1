import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DrawerNavigation from './DrawerNavigation';
import AutoCompleteInput from '../components/AutoCompleteInput';


const Stack = createNativeStackNavigator();

function StackNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='DrawerNavigation'>
        <Stack.Screen options={{headerShown: false,}} name="HomePage" component={DrawerNavigation} />
        <Stack.Screen options={{headerShown: false,}} name="AutoInput" component={AutoCompleteInput} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackNavigation;
