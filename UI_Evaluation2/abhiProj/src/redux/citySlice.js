import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    city:[],
    isLoading:false
};


export const getCity = createAsyncThunk('city/getCity', async query => {
    const options = {
        method: 'GET',
        url: 'https://weatherapi-com.p.rapidapi.com/search.json',
        params: {q: query},
        headers: {
          'X-RapidAPI-Key': '2d3339b4f6mshc20e4574706e997p1df6a0jsn3ab12e4c8716',
          'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
      };
      const response= await axios.request(options)
      return response.data
    })
       
const citySlice = createSlice({
  name: 'city',
  initialState,
  extraReducers: builder => {
    builder.addCase(getCity.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getCity.fulfilled, (state,action) => {
      state.isLoading = false;
      state.city= action.payload
    });
    builder.addCase(getCity.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const reducer3 = citySlice.reducer;