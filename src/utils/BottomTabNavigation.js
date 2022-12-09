import {Image} from 'react-native';
import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import WelcomeAboardScreen from '../screens/WelcomeAboardScreen';
import AllTrips from '../screens/IndividualTripScreen';
import Profile from '../screens/Profile'
import LogoutStack from './LogoutStack';
import {MyGarage} from '../screens/MyGarageScreen'

const Tab = createMaterialBottomTabNavigator();

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator
      shifting={true}
      initialRouteName="WelcomeAboardScreen"

      activeColor="#ffffff"
      barStyle={{backgroundColor: '#ED7E2B', height: 65}}>
      <Tab.Screen
        name="Trips"
        component={WelcomeAboardScreen}
        options={{
          tabBarLabel: 'Trips',
          tabBarIcon: ({focused}) => {
            return (
              <Image
                source={require('../assets/images/Bike.png')}
                style={{
                  tintColor: '#ffffff',
                  width: 35,
                  height: 22,
                  resizeMode: 'contain',

                }}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Garage"
        component={MyGarage}
        // listeners={{
        //   tabPress: e => {
        //     e.preventDefault();
        //   },
        // }}
        
        options={{title:"My Garage",
          tabBarIcon: ({focused}) => {
            return (
              <Image
                source={require('../assets/images/wrench.png')}
                style={{
                  tintColor: 'white',
                  width: 35,
                  height: 22,
                  resizeMode: 'contain',
                }}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="All Trips"
        component={AllTrips}
        // listeners={{
        //   tabPress: e => {
        //     e.preventDefault();
        //   },
        // }}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Image
                source={require('../assets/images/list.png')}
                style={{
                  tintColor: 'white',
                  width: 35,
                  height: 22,
                  resizeMode: 'contain',
                }}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        // listeners={{
        //   tabPress: e => {
        //     e.preventDefault();
        //   },
        // }}
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Image
                source={require('../assets/images/user.png')}
                style={{
                  tintColor: 'white',
                  width: 35,
                  height: 22,
                  resizeMode: 'contain',
                }}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Logout"
        
        // listeners={{
        //   tabPress: e => {
        //     e.preventDefault();
        //   },
        // }}
        
        component={LogoutStack}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Image
                source={require('../assets/images/more.png')}
                style={{
                  tintColor: 'white',
                  width: 22,
                  height: 22,
                  resizeMode: 'contain',
                }}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;