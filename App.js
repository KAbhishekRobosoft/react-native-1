import React, {useEffect, useReducer} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {View, ActivityIndicator} from 'react-native';
import {AuthContext} from './src/context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StackNavigation from './src/utils/StackNavigation'
import TabNavigation from './src/utils/TabNavigation';
import {loginReducer,initialLoginState} from './src/utils/Reducer'

function App() {
  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

  const authContext = {
    signIn: async token => {
      try {
        await AsyncStorage.setItem('token', JSON.stringify(token));
      } catch (e) {
        alert("User doesn't Exist");
        console.log(e);
      }
      alert("Logged In Successfully")
      dispatch({type: 'LOGIN', token: token});
    },

    signOut: async () => {
      try {
        await AsyncStorage.removeItem('token');
      } catch (e) {
        console.log(e);
      }
      dispatch({type: 'LOGOUT'});
    },

    signUp: async token => {
      try {
        await AsyncStorage.setItem('token', JSON.stringify(token));
      } catch (e) {
        console.log(e);
      }
      dispatch({type: 'REGISTER', token: token});
    },
  };

  useEffect(() => {
    setTimeout(async () => {
      let userToken;
      userToken = null;
      try {
         userToken = await AsyncStorage.getItem('token');
         userToken= JSON .parse(userToken)
      } catch (e) {
        console.log(e);
      }
      dispatch({type: 'RETRIEVE_TOKEN', token: userToken});
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator color="green" size="large" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {loginState.userToken !== null ? (
          <TabNavigation />
        ) : (
          <StackNavigation />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

export default App;
