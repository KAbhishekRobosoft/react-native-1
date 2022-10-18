import {createSlice} from '@reduxjs/toolkit';

const initialState =[]

const addSiteReducer = createSlice({
  name: 'site',
  initialState,
  reducers: {
    addData: (state, action) => {
      state.push(action.payload);
    }
  }})

export const {addData, filterData} = addSiteReducer.actions;
export const reducer = addSiteReducer.reducer;
