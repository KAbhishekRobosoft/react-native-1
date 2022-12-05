import React from 'react';
import store from './src/redux/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
import {NavigationContainer} from '@react-navigation/native';
import NavigationFunctionality from './src/utils/NavigationFunctionality';
import RNBootSplash from "react-native-bootsplash";
let persistor = persistStore(store);

const App = () => {
  return (

    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer onReady={() => RNBootSplash.hide()}>
          <NavigationFunctionality />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;