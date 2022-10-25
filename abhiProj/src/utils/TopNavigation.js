import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

function TopNavigation() {
  return (
 
      <Tab.Navigator
      screenOptions= {{
        tabBarStyle:{backgroundColor:'#1baaff'},
        tabBarIndicatorStyle:{backgroundColor:"orange",marginLeft:50,width:'25%',height:4.5},
        tabBarLabelStyle:{color:"white",fontSize:20,fontWeight:"bold"},
        
      }}
      >
        <Tab.Screen name="Sign In" component={SignIn} />
        <Tab.Screen name="Sign Up" component={SignUp} />
      </Tab.Navigator>
    
   
  )
}

export default TopNavigation