import React from 'react';
import {Provider} from 'react-redux';
import store from './src/redux/Store';
import {NavigationContainer} from '@react-navigation/native';
import TabNavigation from './src/components/TabNavigation';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
       <TabNavigation />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
