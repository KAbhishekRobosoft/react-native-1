import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomePage from '../screens/HomePage';
import FavouritePage from '../screens/FavouritePage';
import RecentSearch from '../screens/RecentSearch';

const Drawer = createDrawerNavigator();

function DrawerNavigation() {
  return (
      <Drawer.Navigator initialRouteName="HomePage">
        <Drawer.Screen options={{headerShown: false,}} name="Home" component={HomePage} />
        <Drawer.Screen options={{headerShown: false,}} name="Favourite" component={FavouritePage} />
        <Drawer.Screen options={{headerShown: false,}} name="RecentSearch" component={RecentSearch} />
      </Drawer.Navigator>
  );
}

export default DrawerNavigation;
