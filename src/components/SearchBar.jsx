import React from 'react';
import { FaSearch, FaHistory } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from '../contexts/ThemeContext';
import { useWeather } from '../contexts/WeatherContext';

const SearchBar = () => {
  const { themeStyles, darkMode } = useTheme();
  const {
  location,
  setLocation,
  searchLocation,
  searchHistory,
  showHistory,
  setShowHistory,
selectHistoryItem
  } = useWeather();
  
  return (
    <div className="search p-4 flex justify-center w-full relative">
    <div className={`w-full p-2 rounded-full shadow-xl ${themeStyles.searchBarBackground} backdrop-blur-lg flex items-center gap-2 border ${themeStyles.borderColor}`}>
    <FaSearch className={`${darkMode ? "text-white" : "text-gray-600"} text-3xl ml-2`} />
    <input
     value={location}
     onChange={(event) => setLocation(event.target.value)}
     onKeyDown={searchLocation}
    placeholder="Enter Location"
    type="text"
    className={`bg-transparent outline-none p-2 w-full text-lg placeholder-gray-400 ${themeStyles.textColor}`}
    />
    <button
    onClick={() => setShowHistory(!showHistory)}
    className={`${themeStyles.buttonBackground} transition-colors py-2 px-3 rounded-full mr-1 ${themeStyles.textColor}`}
    >
    <FaHistory />
    </button>
    <button
    onClick={searchLocation}
    className={`${themeStyles.buttonBackground} transition-colors py-2 px-4 rounded-full ${themeStyles.textColor}`}
     >
     Search
     </button>
      </div>
      
      {/* History Dropdown Menu */}
      <AnimatePresence>
        {showHistory && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`absolute top-20 left-0 right-0 z-10 rounded-lg shadow-lg ${themeStyles.historyDropdown} backdrop-blur-sm p-2`}
          >
       <h3 className="text-center p-2 font-bold">Recent Searches</h3>
       {searchHistory.length > 0 ? (
        <ul>
                {searchHistory.map((city, index) => (
                  <li key={index}>
                <button
            onClick={() => selectHistoryItem(city)}
            className={`w-full text-left p-3 rounded hover:${themeStyles.historyHover} transition-colors`}
             >
           {city}
                    </button>
              </li>
            ))}
        </ul>
            ) : (          <div className="text-center p-4 text-gray-500">
          No recent searches found
          </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;