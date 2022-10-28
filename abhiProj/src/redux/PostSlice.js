import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
const BASE_URL = 'http://localhost:3000/posts';

const initialState = {
  user:[],
  isLoading: false,
  error: '',
};

export const getPost= createAsyncThunk('posts/getPost',async (userId)=>{
    const response = await axios.get(BASE_URL + '?userId=' + `${userId}`);
  return response.data;
})

export const addPost= createAsyncThunk('posts/addPost',async (obj)=>{
    await axios.post(BASE_URL, {
    id:obj.id,
    dropdown: obj.dropdown,
    notes:obj.notes,
    password:obj.password,
    siteName:obj.siteName,
    url:obj.url,
    userName:obj.userName,
    userId:obj.userId
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
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
    builder.addCase(addPost.pending,(state)=>{
      state.isLoading= true
    })
    builder.addCase(addPost.fulfilled,(state,action)=>{
        state.isLoading= false
    })
    builder.addCase(addPost.rejected,(state,action)=>{
      state.isLoading= false
      state.error= action.error.message
    })
  }
})

export const reducer3=  postSlice.reducer