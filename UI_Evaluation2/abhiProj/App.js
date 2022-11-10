import * as React from 'react';
import StackNavigation from './src/utils/StackNavigation';
import store from './src/redux/Store';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
import {Provider} from 'react-redux';

let persistor = persistStore(store);


export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
     <StackNavigation />
      </PersistGate>
    </Provider>
  )
}
