// import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
// const BASE_URL = 'http://localhost:3000/users';
const BASE_URL= 'http://localhost:3000'


// const initialState = {
//     isLoading:false,
//     userId:null,
//     error: '',
//   };

// export const addUser= createAsyncThunk('users/addUser',async (obj)=>{
//     await axios.post(BASE_URL+"/register", {
//         mobileNumber:obj.mobileNumber,
//         password:obj.mPin
//   })
//   .then(function (response) {
//     console.log(response.data.user)
//   })
//   .catch(function (error) {
//     console.log(error);
//   });
// })

export const loginUser= async (obj)=>{
    const response= await axios.post(BASE_URL+'/login', {
        mobileNumber:obj.phoneNumber,
        password:obj.password
  })
    return response.data
}

export const registerUser= async (obj)=>{
  const response= await axios.post(BASE_URL+'/users/register', {
      mobileNumber:obj.phoneNumber,
      password:obj.password
})
  return response.data
}

// const userSlice= createSlice({
//     name:"users",
//     initialState,
//     extraReducers:(builder)=>{
//       builder.addCase(addUser.pending,(state)=>{
//         state.isLogin= false
//       })
//       builder.addCase(addUser.fulfilled,(state,action)=>{
//           state.isLogin= true
//           state.userId= action.payload.id
//       })
//       builder.addCase(addUser.rejected,(state,action)=>{
//         state.isLoading= false
//         state.error= action.error.message
//       })
//     }
//   })

// export const reducer4=  userSlice.reducer