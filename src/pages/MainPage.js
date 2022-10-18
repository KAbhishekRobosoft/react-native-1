import React,{useEffect} from 'react'
import { View,StyleSheet,ActivityIndicator} from 'react-native'
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { retrieveToken } from '../redux/AuthenticationSlice';
import { NavigationContainer } from '@react-navigation/native';
import TopNavigation from '../component/TopNavigation';
import StackNavigation from '../component/StackNavigation'

function MainPage() {
  const dispatch = useDispatch();
  const auth= useSelector((state)=>state.authSite)

  useEffect(() => {
    setTimeout(async () => {
      let mPin;
      try {
        mPin = await AsyncStorage.getItem('mPin');
      } catch (e) {
        console.log(e);
      }
      dispatch(retrieveToken(mPin));
    }, 1000);
  }, []);

  if(auth.isLoading){
    return(<View style={styles.main_con}>
      <ActivityIndicator size="large" />
    </View>
    )
  }

  return (
    <NavigationContainer>
      {auth.mPin !== null ? 
        <StackNavigation /> :
        <TopNavigation />
      }
    </NavigationContainer>
  )
}

const styles= StyleSheet.create({
  main_con:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  }
})
export default MainPage