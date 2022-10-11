import React from 'react';
import Todos from './src/components/Todos';
import { Provider } from 'react-redux';
import store from './src/redux/Store';
import DisplayTodos from './src/components/DisplayTodos';

 
const App = () => {
  return (
      <Provider store= {store}>
        <Todos />
        <DisplayTodos />
      </Provider>
  );
};
 
export default App;