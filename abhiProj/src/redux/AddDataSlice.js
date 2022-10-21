import {createSlice} from '@reduxjs/toolkit';

const addSiteReducer = createSlice({
  name: 'site',
  initialState:{
    userData:[],
    userTemp:[]
  },

  reducers: {
    addData:(state, action) => {
      state.userData.push(action.payload)
      state.userTemp.push(action.payload)
    },

    updateData:(state,action)=>{
      
      state.userData= state.userData.map(ele=>{
          if(ele.id === action.payload.id){
              return{
                  ...ele,
                  dropdown:action.payload.dropdown,
                  notes:action.payload.notes,
                  password:action.payload.password,
                  siteName:action.payload.siteName,
                  url:action.payload.url,
                  userName:action.payload.userName 
              }    
          }
          return ele
      })
      state.userTemp= state.userData
  },

    deleteData:(state,action)=>{
      state.userData= state.userData.filter(item => item.id !== action.payload)
      state.userTemp= state.userData
    },

    filterData:(state,action)=>{
       state.userData= state.userTemp.filter(ele => ele.siteName.toLowerCase().includes(action.payload.toLowerCase()))
    },

    filterCategory:(state,action)=>{
      if(action.payload === 'All')
        state.userData= state.userTemp
        
      else  
        state.userData= state.userTemp.filter(ele => ele.dropdown === action.payload)
    }

  }})

export const {addData,updateData,deleteData,filterData,filterCategory} = addSiteReducer.actions;
export const reducer= addSiteReducer.reducer;