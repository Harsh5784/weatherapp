import React, { useState, useEffect } from 'react';
import { FaMoon, FaSun, FaRedoAlt } from "react-icons/fa";
import { useTheme } from '../contexts/ThemeContext';

const Header = () => {
  const [time, setTime] = useState(new Date());
  const { darkMode, autoTheme, toggleTheme, toggleAutoTheme, themeStyles } = useTheme();

  // Set up time
  useEffect(() => {
  const interval = setInterval(() => {
  setTime(new Date());
  }, 1000);
    
  return () => clearInterval(interval);
  }, []);

  return (
    <>
   <div className={`absolute top-4 left-4 p-2 rounded text-4xl ${themeStyles.textColor}`}>
   {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
   </div>

   <div className="absolute top-4 right-4 flex gap-3">
   <button 
   onClick={toggleTheme}
   className={`${themeStyles.themeToggleButton} rounded-full p-3 transition-colors backdrop-blur-sm`}
   title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
   >
  {darkMode ? <FaSun className="text-white" /> : <FaMoon className="text-white" />}
  </button>
  </div>

  </>
);
};

export default Header;