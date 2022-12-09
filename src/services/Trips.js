import axios from 'axios';
import Toast from 'react-native-simple-toast';
const BASE_URL = 'https://ride-app-node.vercel.app/api/v1';

export const allTripDetails = async token => {
  try {
    const response = await axios.get(`${BASE_URL}/trip/getTrip`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (err) {
    console.log(err);
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
    Toast.show('Network Error');
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
