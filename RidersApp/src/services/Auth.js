import axios from 'axios';
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

export const searchCity = async string => {
  const options = {
    method: 'GET',
    url: 'https://api.foursquare.com/v3/autocomplete',
    params: {query: string, types: 'geo'},
    headers: {
      accept: 'application/json',
      Authorization: 'fsq3bs1KJk7+sul9f1yrbZnFuyGX1D8+TIWyM0HzJ+3ZbxU=',
    },
  };
  const response = await axios.request(options);
  return response.data.results;
};

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
    console.log(response.data);
  } catch (error) {
    console.log('Error Occured');
  }
};

export const verifyOtp = async otp => {
  try {
    const response = await axios.post(`${BASE_URL}/verifyOtp`, {
      otp: otp,
    });
    return response.data.message;
  } catch (error) {
    console.log('Error Occured');
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

export const allTripDetails = async token => {
  try {
    const response = await axios.get(`${BASE_URL}/trip/getTrip`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
  } catch (err) {
    console.log(err);
  }
};

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
    console.log(response.data);
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
    console.log('res', response.data);
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

    console.log(response.data);
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

export const createTrip = async (obj, token) => {
  try {
    const response = await axios.post(`${BASE_URL}/trip/createTrip`, obj, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log('Error Occured');
  }
};

export const getCoordinates = async place => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=2dff1a0f7576b6388c89a15bc5a40171`,
  );
  return response.data.coord;
};

export const getSortedTripDetails = async token => {
  try {
    const response = await axios.get(BASE_URL + '/trip/getTrip', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
export const searchProducts = async (value, token) => {
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

export const getLocationName = async (lat, lon) => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=2dff1a0f7576b6388c89a15bc5a40171`,
  );
  return response.data;
};

export const UserTrips = async key => {
  try {
    const response = await axios.post(
      `${BASE_URL}/trip/searchTrip`,
      {
        text: '',
      },
      {
        headers: {
          Authorization: `Bearer ${key}`,
        },
      },
    );
    return response.data;
  } catch (err) {
    console.log('error occurred');
  }
};

export const SearchUserTrips = async (key, value) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/trip/searchTrip`,
      {
        text: value,
      },
      {
        headers: {
          Authorization: `Bearer ${key}`,
        },
      },
    );
    return response.data;
  } catch (err) {
    console.log('error occurred');
  }
};

export const SearchAllUserTrips = async key => {
  try {
    const response = await axios.post(
      `${BASE_URL}/trip/searchAllTrips`,
      {
        text: '',
      },
      {
        headers: {
          Authorization: `Bearer ${key}`,
        },
      },
    );
    return response.data;
  } catch (err) {
    console.log('error occurred');
  }
};

export const SearchAllUserInputTrips = async (key, value) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/trip/searchAllTrips`,
      {
        text: value,
      },
      {
        headers: {
          Authorization: `Bearer ${key}`,
        },
      },
    );
    return response.data;
  } catch (err) {
    console.log('error occurred');
  }
};

export const deleteTrip = async (id, key) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/trip/deleteTrip`,
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
    console.log('delete trip error occurred');
  }
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
    console.log(err);
  }
};

export const editProfileuserName = async (token, userName) => {
  try {
    const response = await axios.post(
      BASE_URL + '/editProfile',
      {
        userName: userName,
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

export const editAboutUser = async (token, aboutUser) => {
  try {
    const response = await axios.post(
      BASE_URL + '/editProfile',
      {
        aboutUser: aboutUser,
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
    console.log('resd', response.data);
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

export const getRatings = async (key, id, rating) => {
  console.log(key);
  try {
    const response = await axios.post(
      BASE_URL + '/service/reviewservice',
      {
        _id: id,
        ratings: rating,
      },
      {
        headers: {
          Authorization: `Bearer ${key}`,
        },
      },
    );
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log('error in getting ratings');
  }
};

export const calculateRoute = async (
  latitude,
  longitude,
  latitude1,
  longitude1,
) => {
  try {
    const response = await axios.get(
      `https://api.tomtom.com/routing/1/calculateRoute/${latitude},${longitude}:${latitude1},${longitude1}/json?key=UReLAyYRKGeZ0t0ydFAT9cZxGvAYcfa1`,
    );
    return response.data.routes[0];
  } catch (err) {
    console.log(err);
  }
};

export const getNearbyPlaces = async (query, lat, lon) => {
  const options = {
    method: 'GET',
    url: 'https://api.foursquare.com/v3/places/nearby',
    params: {query: query, ll: `${lat},${lon}`},
    headers: {
      accept: 'application/json',
      Authorization: 'fsq3bs1KJk7+sul9f1yrbZnFuyGX1D8+TIWyM0HzJ+3ZbxU=',
    },
  };
  const response = await axios.request(options);
  return response.data;
};

export const shareLocation = async (tripId, arrayObj, token) => {
  try {
    const response = await axios.patch(
      BASE_URL + '/trip/currentLocation',
      {
        _id: tripId,
        currentLocation: arrayObj,
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

export const endTrip = async (tripId, token) => {
  try {
    const response = await axios.patch(
      BASE_URL + '/trip/updateTripStatus',
      {
        _id: tripId,
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

export const sendChat = async (token, groupId, chat) => {
  try {
    const response = await axios.post(
      BASE_URL + '/chat/createChat',
      {
        groupId: groupId,
        chat: chat,
        isImage: false,
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

export const getChat = async (token, groupId) => {
  try {
    const response = await axios.post(
      BASE_URL + '/chat/getChatDetails',
      {
        groupId: groupId,
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

export const uploadChatImage = async (payload, token) => {
  let res = await fetch(`${BASE_URL}/chat/uploadChatImage`, {
    method: 'post',
    body: payload,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  let data = await res.json();
  return data;
};

export const clearChat = async (groupId, token) => {
  try {
    const response = await axios.post(
      BASE_URL + '/chat/clearChat',
      {
        groupId: groupId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (err) {
    console.log('error in clear chat');
  }
};
export const getImagePreview = async (token, groupId) => {
  try {
    const response = await axios.post(
      BASE_URL + '/chat/getImagePreview',
      {
        groupId: groupId,
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
export const getParticularPhoto = async (token, id) => {
  try {
    const response = await axios.post(
      BASE_URL + '/chat/getParticularPhoto',

      {
        _id: id,
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

export const addLike = async (token, id) => {
  try {
    const response = await axios.post(
      BASE_URL + '/chat/addLikes',

      {
        id: id,
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

export const addComments = async (token, id, comment) => {
  try {
    const response = await axios.post(
      BASE_URL + '/chat/addComments',

      {
        id: id,
        comments: comment,
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

export const deleteComment = async (token, id, commentId) => {
  try {
    const response = await axios.post(
      BASE_URL + '/chat/deleteComment',

      {
        id: id,
        commentId: commentId,
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
    console.log(response.data)
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
