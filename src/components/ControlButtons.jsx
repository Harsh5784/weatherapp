import React from 'react';
import { FaRedoAlt } from "react-icons/fa";
import { useTheme } from '../contexts/ThemeContext';
import { useWeather } from '../contexts/WeatherContext';

const ControlButtons = () => {
const { themeStyles } = useTheme();
const { data, units, toggleUnits, refreshWeather, loading } = useWeather();

return (
<div className="flex justify-center gap-3 mb-4">
<button 
onClick={toggleUnits}
className={`${themeStyles.buttonBackground} transition-colors py-1 px-4 rounded-full backdrop-blur-sm ${themeStyles.textColor}`}
>
Switch to {units === 'imperial' ? '°C' : '°F'}  {/* Done Fixing C and F */}
  </button>
      
  {data.name && (
        <button 
          onClick={refreshWeather}
          className={`${themeStyles.buttonBackground} transition-colors py-1 px-4 rounded-full backdrop-blur-sm flex items-center gap-2 ${themeStyles.textColor}`}
        >
    <FaRedoAlt className={loading ? "animate-spin" : ""} /> Refresh
        </button>
      )}
    </div>
  );
};

export default ControlButtons;