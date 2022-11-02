import {createSlice} from '@reduxjs/toolkit';

const initialState ={
    isLoading:true,
    mPin:null,
    userId:null
}

const authenticateSite = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    retrieveToken: (state, action) => {
      return{
        ...state,
        mPin:action.payload,
        isLoading:false
      }
    },

    login:(state,action)=>{
        return{
            ...state,
            mPin:action.payload.mPin,
            userId:action.payload.userId,
            isLoading:false
        }
    },

    logout:(state)=>{
        return{
            ...state,
            mPin:null,
            userId:null,
            isLoading:false
        }
    },

  }})

export const {retrieveToken,login,logout} = authenticateSite.actions;
export const reducer1 = authenticateSite.reducer;
