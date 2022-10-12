import React from 'react';
import {View} from 'react-native'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ActiveTodo from '../components/ActiveTodo';
import FinishedTodo from '../components/FinishedTodo';
import AllTodo from '../components/AllTodo';
const Tab = createMaterialTopTabNavigator();

function TodoTrend() {
  return (
    <View style={{flex: 1,marginTop:Platform.OS === "ios" ? 35 : 0,padding:10}}>
    <Tab.Navigator>
      <Tab.Screen name="Active" component={ActiveTodo} />
      <Tab.Screen name="Completed" component={FinishedTodo} />
      <Tab.Screen name="All" component={AllTodo} />
    </Tab.Navigator>
    </View>
  );
}

export default TodoTrend;

