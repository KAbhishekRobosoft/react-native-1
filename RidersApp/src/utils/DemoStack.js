import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ServiceCenterScreen from '../screens/ServiceCenterScreen';
import SearchServiceScreen from '../screens/SearchServiceScreen';
import {NavigationContainer} from '@react-navigation/native';
import SearchServiceComponent from '../components/SearchServiceComponent';
import OwnersManualScreen from '../screens/OwnersManualScreen';
import OwnersManualDetailScreen from '../screens/OwnersManualDetailScreen';
import { OwnerManualEdit } from '../screens/OwnerManualEditableScreen';
import AddBikeDetails from '../screens/AddBikeDetailsScreen';
import { AddPersonalDetails } from '../screens/AddPersonalDetailsScreen';
const Stack = createNativeStackNavigator();

function DemoStack() {
  return (
      <Stack.Navigator initialRouteName="AddPersonalDetails">
        <Stack.Screen
          options={{headerShown: false}}
          name="AddBikeDetails"
          component={AddBikeDetails}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="AddPersonalDetails"
          component={AddPersonalDetails}
        />
      
      </Stack.Navigator>
  );
}

export default DemoStack;

