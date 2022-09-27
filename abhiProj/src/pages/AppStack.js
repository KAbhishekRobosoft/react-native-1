import React from 'react'
import Flex from './Flex'
import FlatList from './FlatList'

function AppStack() {
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
  )
}

export default AppStack