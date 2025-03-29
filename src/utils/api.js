import axios from 'axios';

const API_KEY = '895284fb2d2c50a520ea537456963d9c';

export const fetchWeatherData = async (city, units) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${API_KEY}`;
  const response = await axios.get(url);
  return response.data;
};

export const fetchForecastData = async (city, units) => {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${API_KEY}`;
  const response = await axios.get(url);
  return response.data;
};