import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
const BASE_URL = 'http://localhost:3000/users';
const BASE_URL1= 'http://localhost:3000/login'
import {useDispatch, useSelector} from 'react-redux';
import { login } from './AuthenticationSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
    userRes:null,
    isLoading:false,
    userId:null,
    error: '',
  };

export const addUser= createAsyncThunk('users/addUser',async (obj)=>{
    await axios.post(BASE_URL+"/register", {
        mobileNumber:obj.mobileNumber,
        password:obj.mPin
  })
  .then(function (response) {
    console.log(response.data.user)
  })
  .catch(function (error) {
    console.log(error);
  });
})

export const loginUser= createAsyncThunk('users/loginUser',async (obj)=>{
    const response= await axios.post(BASE_URL1, {
        mobileNumber:obj.phoneNumber,
        password:obj.password
  })
    if(response.data.hasOwnProperty('user')){
        try {
            await AsyncStorage.setItem('mPin', response.data.user.id);
          } catch (e) {
            console.log(e);
          }
          dispatch(login(mPin));
          return response.data
    }
        console.log("hurray"+response)
})

const userSlice= createSlice({
    name:"users",
    initialState,
    extraReducers:(builder)=>{
      builder.addCase(addUser.pending,(state)=>{
        state.isLogin= false
      })
      builder.addCase(addUser.fulfilled,(state,action)=>{
          state.isLogin= true
          state.userId= action.payload.id
      })
      builder.addCase(addUser.rejected,(state,action)=>{
        state.isLoading= false
        state.error= action.error.message
      })
      builder.addCase(loginUser.pending,(state)=>{
        state.isLoading= true
      })
      builder.addCase(loginUser.fulfilled,(state,action)=>{
          state.isLoading= false
          state.userId= action.payload.user.id
          state.userRes= action.payload
      })
      builder.addCase(loginUser.rejected,(state,action)=>{
        state.isLoading= false
        state.error= action.error.message
      })
    }
  })

export const reducer4=  userSlice.reducer