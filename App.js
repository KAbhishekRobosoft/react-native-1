import React from 'react';
import StackNavigation from './src/component/StackNavigation';
import {Provider} from 'react-redux';
import store from './src/redux/store';


function App() {
  return (
    <Provider store={store}>
      <StackNavigation />
    </Provider>
  );
}

export default App;
