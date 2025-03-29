import React, { createContext, useState, useEffect, useContext } from 'react';
import { fetchWeatherData, fetchForecastData } from '../utils/api';


const WeatherContext = createContext();

// This lets me use the weather in other components
export function useWeather() {
  return useContext(WeatherContext);
}

export function WeatherProvider({ children }) {
  // All my state variables
  const [data, setData] = useState({});
  const [forecastData, setForecastData] = useState([]);
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [units, setUnits] = useState('metric'); // metric is celsius, imperial is fahrenheit
  const [searchHistory, setSearchHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  // Load search history when the page loads
  useEffect(() => {
    // Get history from localStorage
    const savedHistory = localStorage.getItem('weatherSearchHistory');
    
    // Check if there's anything in storage
    if (savedHistory) {
      // Turn the string back into an array
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []); // Empty array makes it run once when component mounts

  // Save search history whenever it changes
  useEffect(() => {
    // Turn array into string and save it
    localStorage.setItem('weatherSearchHistory', JSON.stringify(searchHistory));
  }, [searchHistory]); // Run whenever searchHistory changes

  // Function to get weather data
  const fetchWeather = async (city, withForecast = true) => {
    // Make sure city isn't empty
    if (!city.trim()) {
      setError("Please enter your city");
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // Try to get weather data
      const weatherResponse = await fetchWeatherData(city, units);
      setData(weatherResponse);
      console.log 
      
      if (!searchHistory.includes(city)) {
        setSearchHistory(prev => [city, ...prev.slice(0, 4)]); // Keep only 5 items
      } else if (searchHistory[0] !== city) {

        setSearchHistory(prev => [city, ...prev.filter(item => item !== city).slice(0, 4)]);
      }if (withForecast) {
        const forecastResponse = await fetchForecastData(city, units);
        // Get one forecast per day
        const dailyForecasts = processForecastData(forecastResponse.list);
        setForecastData(dailyForecasts);
      }
      setLoading(false);
    } catch (error) {
      console.error("Weather API Error:", error);
      if (error.response && error.response.status === 404) {
        setError("City not found. Please check the spelling and try again.");
      } else {
        setError("Failed to fetch weather data. Please try again later.");
      }
      
      setLoading(false);
    }
  };

  function processForecastData(forecastList) {
  const dailyData = {};    forecastList.forEach(forecast => {
const date = new Date(forecast.dt * 1000).toLocaleDateString();
      

  if (!dailyData[date] || new Date(forecast.dt * 1000).getHours() === 12) {
    dailyData[date] = forecast;
      }
    });  
    return Object.values(dailyData).slice(0, 5);
  };

  const searchLocation = (event) => {
    if (event.key === 'Enter' || event.type === 'click') {
      fetchWeather(location);
      setLocation(''); 
    }
  };

const toggleUnits = () => {
    const newUnits = units === 'imperial' ? 'metric' : 'imperial';
    setUnits(newUnits);
    
    if (data.name) {
      fetchWeather(data.name);
    }
  };
  const refreshWeather = () => {
  if (data.name) {
  fetchWeather(data.name);
  }
  };

  const selectHistoryItem = (city) => {
    fetchWeather(city);
    setShowHistory(false); 
  };


  const weatherStuff = {
    data,
    forecastData,
    location,
    setLocation,
    loading,
    error,
    units,
    searchHistory,
    showHistory,
    setShowHistory,
    fetchWeather,
    searchLocation,
    toggleUnits,
    refreshWeather,
    selectHistoryItem
  };

  return (
    <WeatherContext.Provider value={weatherStuff}>
      {children}
    </WeatherContext.Provider>
  );
};