import axios from 'axios';
const BASE_URL= 'http://localhost:3000'


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
