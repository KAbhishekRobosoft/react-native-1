import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
const BASE_URL = 'http://localhost:3000/posts';

const initialState = {
  user:[],
  isLoading: false,
  error: '',
};

export const getPost= createAsyncThunk('posts/getPost',(userId)=>{
    return axios.get(BASE_URL+'?userId='+`${userId}`)
    .then((response)=>response.data)
})


const postSlice= createSlice({
  name:"posts",
  initialState,
  extraReducers:(builder)=>{
    builder.addCase(getPost.pending,(state)=>{
      state.isLoading= true
    })
    builder.addCase(getPost.fulfilled,(state,action)=>{
        state.isLoading= false

        state.user= [...action.payload]
    })
    builder.addCase(getPost.rejected,(state,action)=>{
      state.isLoading= false
      state.error= action.error.message
    })
  }
})

export const reducer3=  postSlice.reducer