import {createSlice} from '@reduxjs/toolkit';

const initialState = []

const addSiteReducer = createSlice({
  name: 'site',
  initialState,
  reducers: {
    addData: (state, action) => {
        state.push(action.payload)
    },

    filterData:(state,action)=>{
      if(action.payload === "All"){
        console.log(state)
        return state
      }
      return state.filter(item => item.dropdown === action.payload)
    },

    // updateTodos:(state,action)=>{
    //     return state.map(todo=>{
    //         if(todo.id === action.payload.id){
    //             return{
    //                 ...todo,
    //                 item: action.payload.item,    
    //             }    
    //         }
    //         return todo
    //     })
    // },

    // completeTodos:(state,action)=>{
    //   return state.map(todo=>{
    //     if(todo.id === action.payload){
    //         return{
    //             ...todo,
    //             completed:true    
    //         }    
    //     }
    //     return todo
    // })
    // }
  },
});

export const {addData,filterData} = addSiteReducer.actions;
export const reducer = addSiteReducer.reducer;