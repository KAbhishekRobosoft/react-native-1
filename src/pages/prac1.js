const BASE_URL= 'https://api-nodejs-todolist.herokuapp.com/'
export let accountName= ''
export let accountEmail= ''
export let accountAge= ''

export const SignIn= (data)=>{
    const {email,password}= data
    return fetch(BASE_URL +'user/login',{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            'email':email.toLowerCase(),
            'password':password
        })
    })
    .then(data=>data.json())
    .then(res =>{
            const token= res.token.toString()
            const name= res.user.name.toString()
            accountName= name
            accountEmail= res.user.email.toString()
            accountAge= res.user.age.toString()
            return {'res':name,'token':token}
    } )
    .catch(er=>{console.log(er)
        alert('User Does\'t exist')
    })
}

export const Register= (name,email,password,age)=>{
    return fetch(BASE_URL +'user/register',{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            'name':name,
            'email':email,
            'password':password,
            'age':age
        })
    })
    .then(data=>data.json())
    .then(res =>{
            return res.token
    } )
    .catch(er=>console.log(er))
}




import React, {useEffect, useMemo, useReducer} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {View, ActivityIndicator} from 'react-native';
import {AuthContext} from './src/context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TabNavigation from './src/component/TabNavigation';
import StackNavigation from './src/component/StackNavigation';
import {initialLoginState, loginReducer} from './src/component/Reducer';


function App() {
  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

  const authContext = useMemo(
    () => ({
      signIn: async (userName, token) => {
        let userToken;
        userToken = null;

        try {
          userToken = token;
          await AsyncStorage.setItem('userToken', userToken);
        } catch (e) {
          alert("User doesn't Exist");
          console.log(e);
        }

        dispatch({type: 'LOGIN', id: userName, token: userToken});
      },

      signOut: async () => {
        try {
          await AsyncStorage.removeItem('userToken');
        } catch (e) {
          console.log(e);
        }
        dispatch({type: 'LOGOUT'});
      },

      signUp: async (userName, token) => {
        let userToken;
        userToken = null;

        try {
          userToken = token;
          await AsyncStorage.setItem('userToken', userToken);
        } catch (e) {
          console.log(e);
        }
        dispatch({type: 'REGISTER', id: userName, token: userToken});
      },
    }),
    [],
  );

  useEffect(() => {
    setTimeout(async () => {
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.log(e);
      }
      dispatch({type: 'RETRIEVE_TOKEN', token: userToken});
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
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

