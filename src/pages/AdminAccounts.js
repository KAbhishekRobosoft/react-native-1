import React, { useEffect, useReducer } from 'react'
import { FlatList, View,ActivityIndicator,Text } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { adminReducer,initialState } from '../component/Reducer';

function AdminAccounts() {

  const [adminState, dispatch] = useReducer(adminReducer, initialState);

  useEffect(()=>{
    setTimeout(async ()=>{
       let name
       let email
       let age
       let token 

        try{
          let userData= await AsyncStorage.getItem('data')
          userData= JSON.parse(userData)
          name= userData.user.name
          email= userData.user.email
          age= userData.user.age
          token= userData.token
        }

        catch(err){
          console.log(err)
        }
        dispatch({type: 'DATA', data: {name:name,email:email,age:age,id:token}});

    },1000)
  },[])

  if(adminState.isLoading){
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View>
      {console.log(adminState.accData)}
        <FlatList data= {adminState.accData} renderItem= {(itemData) => {
              return(
                  <View>
                      <Text>{itemData.item.name}</Text> 
                      <Text>{itemData.item.email}</Text> 
                      <Text>{itemData.item.age}</Text> 
                  </View>
              )
        }}
        keyExtractor={item => {
          return item.id;
        }}
          />
    </View>
  )
}

export default AdminAccounts