import React from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { WeatherProvider, useWeather } from './contexts/WeatherContext';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import ControlButtons from './components/ControlButtons';
import LoadingState from './components/LoadingState';
import ErrorMessage from './components/ErrorMessage';
import WeatherDisplay from './components/WeatherDisplay';
import ForecastDisplay from './components/ForecastDisplay';


const WeatherContainer = () => {
  const { themeStyles } = useTheme();
  const { loading, error, data } = useWeather();

  return (
    <AnimatePresence>
  {loading ? (
        <LoadingState />
      ) :   error ?
     (
        <ErrorMessage error={error} />) :
         (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className={`weather-container ${themeStyles.cardBackground} backdrop-blur-lg w-full rounded-lg p-6 ${themeStyles.textColor}`}
        >
        <WeatherDisplay />
        <ForecastDisplay />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Main App component
function App() {
  return (
    <ThemeProvider>
    <WeatherProvider>
    <AppContent />
    </WeatherProvider>
    </ThemeProvider>
  );
}

// App content with theme context
const AppContent = () => {
  const { themeStyles } = useTheme();

  return (
    <div 
      className={`app min-h-screen flex flex-col items-center justify-center relative transition-colors duration-300 ${themeStyles.mainBackground} ${themeStyles.textColor}`}
>
<Header />
      
      <div className="container max-w-md w-full px-4">
     <SearchBar />
   <ControlButtons />
   <WeatherContainer />
   </div>
   </div>
);
};

export default App;