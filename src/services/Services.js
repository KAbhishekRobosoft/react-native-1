import axios from 'axios';
import Toast from 'react-native-simple-toast';
const BASE_URL = 'https://ride-app-node.vercel.app/api/v1';

export const searchServiceCenter = async (value, key) => {
  let res = await fetch(`${BASE_URL}/dealer/searchDealers`, {
    method: 'post',
    body: JSON.stringify({
      text: value,
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key}`,
    },
  });
  let data = await res.json();
  return data;
};

export const BookService = async (key, value) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/service/bookService`,
      {
        vehicleNumber: value.vehicleNumber,
        serviceType: value.serviceType,
        slotDate: value.slotDate,
        time: value.time,
        dealer: value.dealer,
        city: value.city,
        comments: value.comments,
        dealerPhoneNumber: value.dealerPhoneNumber,
      },
      {
        headers: {
          Authorization: `Bearer ${key}`,
        },
      },
    );
    return response.data;
  } catch (err) {
    console.log('error in book service');
  }
};

export const getAllService = async token => {
  try {
    const response = await axios.get(BASE_URL + '/service/getAllService', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.serviceDetails;
  } catch (err) {
    console.log('error occurred in get all service');
  }
};

export const getParticularService = async (key, id) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/service/getParticularService`,
      {
        _id: id,
      },
      {
        headers: {
          Authorization: `Bearer ${key}`,
        },
      },
    );
    return response.data;
  } catch (err) {
    console.log('error occured in get particular service');
  }
};

export const getRatings = async (key, id, rating, phone) => {
  try {
    const response = await axios.post(
      BASE_URL + '/service/reviewService',
      {
        _id: id,
        ratings: rating,
        dealerPhoneNumber: phone
      },
      {
        headers: {
          Authorization: `Bearer ${key}`,
        },
      },
    );
    return response.data;
  } catch (err) {
    console.log('error in getting ratings');
  }
};
