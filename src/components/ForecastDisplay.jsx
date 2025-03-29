import React from 'react';
import { motion } from "framer-motion";
import { useTheme } from '../contexts/ThemeContext';
import { useWeather } from '../contexts/WeatherContext';

const ForecastDisplay = () => {
const { themeStyles } = useTheme();
const { forecastData } = useWeather();

if (!forecastData || forecastData.length === 0) {
return null;
  }

  return (
    <motion.div 
  initial={{ y: 20, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ delay: 0.2 }}
  className="forecast mt-8"
    >
    <h3 className="text-xl font-bold mb-4">5-Day Forecast</h3>
    <div className="grid grid-cols-5 gap-2">
    {forecastData.map((forecast, index) => (
    <motion.div 
    key={index}
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 0.1 * index }}
    className={`text-center p-2 rounded-lg ${themeStyles.detailsBackground}`}
    >
    <p className="text-sm font-bold e">
    {new Date(forecast.dt * 1000).toLocaleDateString(undefined, { weekday: 'short' })}
    </p>
    <img 
    src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`} 
    alt={forecast.weather[0].description}
    className="mx-auto w-8 h-8"
    />
    <p className="text-lg font-bold text-whit">{forecast.main.temp.toFixed()}°</p>
    <p className="text-xs text-whit">{forecast.weather[0].main}</p>
    </motion.div>
    ))}
    </div>
    </motion.div>
  );
};

export default ForecastDisplay;