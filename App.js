import React, {useEffect, useReducer} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {View, ActivityIndicator} from 'react-native';
import {AuthContext} from './src/context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TabNavigation from './src/component/TabNavigation';
import StackNavigation from './src/component/StackNavigation';
import {initialLoginState, loginReducer} from './src/component/Reducer';

function App() {

  const [loginState,dispatch] = useReducer(loginReducer, initialLoginState);

  const authContext = {

    signIn: async res => {
      let userToken;
      let userName = res.user.email;
      userToken = null;

      try {
        userToken = res.token;
        await AsyncStorage.setItem('data', JSON.stringify(res));
      } catch (e) {
        alert("User doesn't Exist");
        console.log(e);
      }

      dispatch({type: 'LOGIN', id: userName, token: userToken});
    },

    signOut: async () => {
      try {
        await AsyncStorage.removeItem('data');
      } catch (e) {
        console.log(e);
      }
      dispatch({type: 'LOGOUT'});
    },

    signUp: async res => {
      let userToken;
      let userName = res.user.email;
      userToken = null;

      try {
        userToken = res.token;
        await AsyncStorage.setItem('data', JSON.stringify(res));
      } catch (e) {
        console.log(e);
      }
      dispatch({type: 'REGISTER', id: userName, token: userToken});
    }
  }
  
  useEffect(() => {
    setTimeout(async () => {
      let userToken;
      userToken = null;
      try {
        let userData = await AsyncStorage.getItem('data');
        userData = JSON.parse(userData);
        userToken = userData.token;
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
