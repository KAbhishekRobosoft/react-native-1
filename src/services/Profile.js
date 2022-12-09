import axios from 'axios';
import Toast from 'react-native-simple-toast'
const BASE_URL = 'https://ride-app-node.vercel.app/api/v1';

export const followRider = async (token, mobile) => {
  try {
    const response = await axios.post(
      BASE_URL + '/follow',

      {
        wantToFollow: mobile,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const profileData = async (token, mobile) => {
  try {
    const response = await axios.post(
      BASE_URL + '/getProfile',
      {
        mobile: mobile,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (err) {
    console.log('Book Service error occurred');
  }
};

export const editProfile = async (token, obj) => {
  try {
    const response = await axios.post(
      BASE_URL + '/editProfile',
      {
        userName: obj.userName,
        aboutUser: obj.aboutUser,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const uploadProfileImage = async (payload, token) => {
  let res = await fetch(BASE_URL + '/editProfileImage', {
    method: 'post',
    body: payload,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  let data = await res.json();
  return data;
};
