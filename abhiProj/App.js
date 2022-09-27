
import React,{useContext} from 'react';
import {View,ActivityIndicator} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './src/pages/Home';
import Login from './src/pages/Login';
import Flex from './src/pages/Flex';
import SignUp from './src/pages/SignUp';
import FlatList from './src/pages/FlatList';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Prac from './src/pages/Prac';
import Prac1 from './src/pages/Prac1';
import { AuthContext, AuthProvider } from './src/context/AuthContext';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Root() {
  return (
    <Tab.Navigator initialRouteName="Flex">
      <Tab.Screen
        name="Flex"
        component={Flex}
        options={{
          headerShown: false,
          tabBarLabel: "Flex Box",
          tabBarIcon: () => (
            <Icon name="box" />
          ),
        }} />

      <Tab.Screen
         options={{
          headerShown: false,
          tabBarLabel: "FlatList",
          tabBarIcon: () => (
            <Icon name="list"  />
          ),
        }}
        name="FlatList"
        component={FlatList}
      />
    </Tab.Navigator>
  );
}

function App() {
  const {isLoading,userToken}= useContext(AuthContext)
  if(isLoading){
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <ActivityIndicator />
    </View>
  }

  return (
    <AuthProvider>
    <NavigationContainer>
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
    </NavigationContainer>
    </AuthProvider>
  );
}

export default App;