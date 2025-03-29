import React, { createContext, useState, useEffect, useContext } from 'react';

// Create theme context
const ThemeContext = createContext();

// Custom hook to use the theme context
export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true);
  const [autoTheme, setAutoTheme] = useState(true);

  // Check if current time should use dark mode
  const shouldUseDarkMode = () => {
    const hour = new Date().getHours();
    // Dark mode between 7 PM (19) and 7 AM (7)
    return hour >= 19 || hour < 7;
  };

  useEffect(() => {
    // Load user's theme preferences
    const savedTheme = localStorage.getItem('weatherAppTheme');
    const savedAutoTheme = localStorage.getItem('weatherAppAutoTheme');
    
    if (savedAutoTheme !== null) {
      setAutoTheme(savedAutoTheme === 'true');
    }
    
    if (savedAutoTheme === 'true') {
      // If auto theme is enabled, set dark mode based on time
      setDarkMode(shouldUseDarkMode());
    } else if (savedTheme) {
      // Otherwise use saved preference
      setDarkMode(savedTheme === 'dark');
    }

    // Set up theme checker for auto mode
    const interval = setInterval(() => {
      // Check if we should change theme based on time
      if (autoTheme) {
        setDarkMode(shouldUseDarkMode());
      }
    }, 60000); // Check every minute
    
    return () => clearInterval(interval);
  }, [autoTheme]);

  // Save theme preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('weatherAppTheme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  // Save auto theme setting
  useEffect(() => {
    localStorage.setItem('weatherAppAutoTheme', autoTheme.toString());
  }, [autoTheme]);

  const toggleTheme = () => {
   
      // If auto theme is off, toggle dark mode
      setDarkMode(!darkMode);
    
  };

  const toggleAutoTheme = () => {
    const newAutoTheme = !autoTheme;
    setAutoTheme(newAutoTheme);
    
    // If turning auto theme on, immediately set dark mode based on time
    if (newAutoTheme) {
      setDarkMode(shouldUseDarkMode());
    }
  };

  // Theme-specific styles - centralized for consistency
  const themeStyles = {
    // Main background
    mainBackground: darkMode 
      ? "bg-gray-900 bg-[url('https://images.pexels.com/photos/2563386/pexels-photo-2563386.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center bg-no-repeat" 
      : "bg-blue-100 bg-[url('https://images.pexels.com/photos/912364/pexels-photo-912364.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center bg-no-repeat",
    
    // Text colors
    textColor: darkMode ? "text-white" : "text-gray-800",
    
    // UI Element backgrounds
    cardBackground: darkMode ? "bg-gray-800/80" : "bg-white/80",
    searchBarBackground: darkMode ? "bg-gray-800/70" : "bg-white/80",
    buttonBackground: darkMode ? "bg-gray-700/80 hover:bg-gray-600/90" : "bg-blue-100/80 hover:bg-blue-200/90",
    detailsBackground: darkMode ? "bg-gray-700/50" : "bg-white/50",
    
    // Borders
    borderColor: darkMode ? "border-gray-600" : "border-gray-300",
    
    // Special elements
    themeToggleButton: darkMode ? "bg-yellow-500/80 hover:bg-yellow-400" : "bg-gray-700/80 hover:bg-gray-600",
    autoThemeButton: autoTheme ? "bg-green-500/80 hover:bg-green-400" : "bg-gray-500/80 hover:bg-gray-400",
    historyDropdown: darkMode ? "bg-gray-800/95" : "bg-white/95",
    historyHover: darkMode ? "bg-gray-700/90" : "bg-gray-200/90",
  };

  return (
    <ThemeContext.Provider value={{ 
      darkMode, 
      autoTheme, 
      toggleTheme, 
      toggleAutoTheme, 
      themeStyles,
      shouldUseDarkMode 
    }}>
      {children}
    </ThemeContext.Provider>
  );
};