import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
const BASE_URL = 'http://localhost:3000/posts';

const initialState = {
  isLoading: false,
  error: '',
};

export const getPost = async userId => {
  const response = await axios.get(BASE_URL + '/' + '?userId=' + `${userId}`);
  return response.data;
};

export const addPost = createAsyncThunk('posts/addPost', async obj => {
  await axios
    .post(BASE_URL, {
      id: obj.id,
      dropdown: obj.dropdown,
      notes: obj.notes,
      password: obj.password,
      siteName: obj.siteName,
      url: obj.url,
      userName: obj.userName,
      userId: obj.userId,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
});

export const editPost = createAsyncThunk('posts/editPost', async obj => {
  await axios
    .put(BASE_URL + '/' + obj.id, {
      id: obj.id,
      dropdown: obj.dropdown,
      notes: obj.notes,
      password: obj.password,
      siteName: obj.siteName,
      url: obj.url,
      userName: obj.userName,
      userId: obj.userId,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
});

export const deletePost = createAsyncThunk('posts/deletePost', async id => {
  await axios
    .delete(BASE_URL + '/' + id)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
});

const postSlice = createSlice({
  name: 'posts',
  initialState,
  extraReducers: builder => {
    builder.addCase(addPost.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(addPost.fulfilled, state => {
      state.isLoading = false;
    });
    builder.addCase(addPost.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(editPost.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(editPost.fulfilled, state => {
      state.isLoading = false;
    });
    builder.addCase(editPost.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(deletePost.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(deletePost.fulfilled, state => {
      state.isLoading = false;
    });
    builder.addCase(deletePost.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const reducer3 = postSlice.reducer;
