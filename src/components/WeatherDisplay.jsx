import React from 'react';
import { motion } from "framer-motion";
import { FaThermometerHalf, FaTint, FaWind } from "react-icons/fa";
import { useTheme } from '../contexts/ThemeContext';
import { useWeather } from '../contexts/WeatherContext';

const WeatherDisplay = () => {
  const { themeStyles } = useTheme();
  const { data, units } = useWeather();

  if (!data.name) {
    return (
  <div className="no-data text-center p-6">
  <p>Enter a location and press Enter to get weather details.</p>
  </div>
  );
  }

  return (
    <>
   <motion.div
   initial={{ y: -10, opacity: 0 }}
   animate={{ y: 0, opacity: 1 }}
   className="top text-center"
   >
  <div className="location text-3xl font-bold mb-2">{data.name}, {data.sys?.country}</div>

    <div className="temp text-7xl font-extrabold">
    {data.main ? `${data.main.temp.toFixed()}°${units === 'metric' ? 'F' : 'C'}` : null}
     </div>
     <div className="description text-xl font-medium capitalize">
      {data.weather ? data.weather[0].description : null}
      </div>
    </motion.div>

      <motion.div
    initial={{ y: 10, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay: 0.1 }}
    className="details mt-6 grid grid-cols-3 gap-4 text-center"
      >
    <div className={`feels p-3 ${themeStyles.detailsBackground} rounded-lg`}>
    <FaThermometerHalf className="mx-auto text-2xl mb-2" />
    {data.main ? <p className="text-2xl font-bold">{data.main.feels_like.toFixed()}°</p> : null}
    <p className="text-sm">Feels Like</p>
    </div>

    <div className={`humidity p-3 ${themeStyles.detailsBackground} rounded-lg`}>
    <FaTint className="mx-auto text-2xl mb-2" />
    {data.main ? <p className="text-2xl font-bold">{data.main.humidity}%</p> : null}
    <p className="text-sm">Humidity</p>
    </div>

    <div className={`wind p-3 ${themeStyles.detailsBackground} rounded-lg`}>
    <FaWind className="mx-auto text-2xl mb-2" />
    {data.wind ? (
    <p className="text-2xl font-bold">
    {data.wind.speed.toFixed()} {units === 'metric' ? 'mph' : 'km/h'}
     </p>
     ) : null}
    <p className="text-sm">Wind</p>
     </div>
    </motion.div>
    </>
  );
};

export default WeatherDisplay;