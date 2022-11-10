import axios from 'axios';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?';

export const getWeather = async place => {
  const response = await axios.get(
    BASE_URL + `q=${place}&appid=1b6d2dc0351ac4cb2fffd1dc5844dc32`,
  );
  return response.data;
};

export const getCity =  async query => {
  const options = {
      method: 'GET',
      url: 'https://weatherapi-com.p.rapidapi.com/search.json',
      params: {q: query},
      headers: {
        'X-RapidAPI-Key': '2d3339b4f6mshc20e4574706e997p1df6a0jsn3ab12e4c8716',
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
      }
    };
    const response= await axios.request(options)
    return response.data
  }
