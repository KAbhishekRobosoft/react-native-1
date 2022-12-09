import axios from 'axios';
import Toast from 'react-native-simple-toast';
const BASE_URL = 'https://ride-app-node.vercel.app/api/v1';

export const register = async (values, haveBike) => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, {
      userName: values.userName,
      password: values.password,
      mobile: values.mobile,
      email: values.email,
      haveBike: haveBike,
    });
    return response.data;
  } catch (error) {
    console.log('An error has occurred');
  }
};

export const checkIn = async values => {
  try {
    const response = await axios.post(`${BASE_URL}/loginPhone`, {
      mobile: values.number,
      password: values.password,
    });
    return response.data;
  } catch (error) {
    console.log('An error has occurred');
  }
};

export const refreshToken = async token => {
  let res = await fetch(`${BASE_URL}/getAccessToken`, {
    method: 'post',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  let data = await res.json();
  return data;
};

export const uploadImage = async (payload, token) => {
  let res = await fetch(`${BASE_URL}/profileImageUpload`, {
    method: 'post',
    body: payload,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  let data = await res.json();
  return data;
};

export const sendOtp = async mobileNumber => {
  try {
    const response = await axios.post(`${BASE_URL}/sendOtp`, {
      destination: mobileNumber,
    });
    return response.data;
  } catch (error) {
    Toast.show('Error occurred');
  }
};

export const verifyOtp = async otp => {
  try {
    const response = await axios.post(`${BASE_URL}/verifyOtp`, {
      otp: otp,
    });
    return response.data.message;
  } catch (error) {
    Toast.show('Error Occurred');
  }
};

export const resetPassword = async userData => {
  try {
    const response = await axios.post(`${BASE_URL}/forgotPassword`, {
      mobile: userData.mobile,
      password: userData.password,
    });
    return response.data;
  } catch (error) {
    console.log('An error has occurred');
  }
};

export const updateMobileNumber = async (m, key) => {
  try {
    const response = await axios.post(
      BASE_URL + '/service/updateMobileNumber',
      {
        mobile: m,
      },
      {
        headers: {
          Authorization: `Bearer ${key}`,
        },
      },
    );
    return response.data;
  } catch (err) {
    console.log('error in update mobile number');
  }
};

export const attempts = async token => {
  try {
    const response = await axios.get(BASE_URL + '/service/prefilledService', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.log('error occurred in attempts api');
  }
};

