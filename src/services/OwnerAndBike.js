import axios from 'axios';
import Toast from 'react-native-simple-toast'
const BASE_URL = 'https://ride-app-node.vercel.app/api/v1';


export const addOwnerDetails = async (values, token) => {
  try {
    const response = await axios.post(
      'https://ride-app-node.vercel.app/api/v1/owner/addOwnerDetails',
      {
        lisenceNumber: values.lisenceNumber,
        city: values.city,
        state: values.state,
        doorNumber: values.doorNumber,
        pincode: values.pincode,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  } catch (error) {
    console.log('Error Occured in adding owner Details');
    alert('Provide All Details');
  }
};

export const getOwnerDetails = async token => {
  try {
    const response = await axios.get(`${BASE_URL}/owner/getOwnerDetails`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log('Error Occured in getting owner details');
  }
};

export const updateOwnerDetails = async (values, token) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/owner/updateOwnerDetails`,
      {
        city: values.city,
        state: values.state,
        doorNumber: values.doorNumber,
        pincode: values.pincode,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  } catch (error) {
    console.log('Error Occured in updating owner Details');
  }
};

export const addBikeDetails = async (values, token) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/bike/addBike`,
      {
        vehicleType: values.vehicleType,
        vehicleNumber: values.vehicleNumber,
        engineNumber: values.engineNumber,
        frameNumber: values.frameNumber,
        batteryMake: values.batteryMake,
        registerNumber: values.registerNumber,
        model: values.model,
        color: values.color,
        dealerCode: values.dealerCode,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  } catch (error) {
    console.log('Error Occured in adding Bike Details');
  }
};

export const getBikeDetails = async token => {
  try {
    const response = await axios.get(`${BASE_URL}/bike/getBikeDetails`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log('Error Occured in get Bike details');
  }
};

export const searchProducts = async (value,token) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/product/searchProducts`,
      {
        text: value,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data.products;
  } catch (error) {
    console.log('Error Occured in searchProducts of accssories ');
  }
};

export const LikeProducts = async (value, token) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/product/addLike`,
      {
        _id: value,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.log('Error Occured in like products');
  }
};