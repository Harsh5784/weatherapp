import React from 'react';
import { motion } from "framer-motion";
import { useTheme } from '../contexts/ThemeContext';

const LoadingState = () => {
  const { themeStyles, darkMode } = useTheme();

  return (
    <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className={`loading-container ${themeStyles.cardBackground} backdrop-blur-sm rounded-lg p-8 text-center ${themeStyles.textColor}`}
    >
     <div className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 ${darkMode ? "border-white" : "border-gray-700"} mx-auto mb-4`}></div>
  <p>Loading weather data...</p>
  </motion.div>
  );
};

export default LoadingState;