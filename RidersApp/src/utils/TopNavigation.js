import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {BikeDetails} from '../components/BikeDetailsComponent';
import {PersonalDetails} from '../components/PersonalDetailsComponent';
import { useSelector } from 'react-redux';



const Tab = createMaterialTopTabNavigator();

const TopNavigation = ({editable,defaultValue}) => {


 // console.log('top',defaultValue);
  return (
    <Tab.Navigator
      initialRouteName="PersonalDetails"
      screenOptions={{
        tabBarLabelStyle: {
          fontSize: 16,
          fontFamily: 'Roboto-Regular',
          lineHeight: 21,
          marginTop: 10,
          textAlign: 'left',
         // width: '130%',
          textTransform: 'none',
          top:6
          //borderWidth:1
        },
        tabBarStyle: {
          width: '100%',
          paddingHorizontal: '5%',
          
         // borderWidth:1

        },
        tabBarItemStyle: {
          alignSelf: 'flex-start',
         // borderWidth:1

        },
        tabBarIndicatorStyle: {
          backgroundColor: '#ED7F2C',
          marginLeft: '8%',
          width: 12,
          height: 2,
          alignSelf: 'flex-start',
        },
        tabBarActiveTintColor:'#ED7F2C',
        tabBarInactiveTintColor:'#868584',
        tabBarPressOpacity:0.1
      }}>
      <Tab.Screen
        name="Home"
        component={PersonalDetails}
        options={{title: 'Personal Details', upperCaseLabel: false}}
      />
      <Tab.Screen
        name="Settings"
        component={BikeDetails}
        options={{title: 'Bike Details'}}
        editable={editable}
      />
    </Tab.Navigator>
  );
};

export default TopNavigation;
