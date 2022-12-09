import axios from 'axios';
import Toast from 'react-native-simple-toast';
const BASE_URL = 'https://ride-app-node.vercel.app/api/v1';

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

export const getCoordinates = async place => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=2dff1a0f7576b6388c89a15bc5a40171`,
  );
  return response.data.coord;
};

export const getLocationName = async (lat, lon) => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=2dff1a0f7576b6388c89a15bc5a40171`,
  );
  return response.data;
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
    console.log('calculate route error');
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
  
