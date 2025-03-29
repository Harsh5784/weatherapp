import React from 'react';
import { motion } from "framer-motion";

const ErrorMessage = ({ error }) => {
  return (
    <motion.div 
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0, scale: 0.9 }}
  className="error-container bg-red-500/70 backdrop-blur-sm rounded-lg p-6 text-white text-center"
  >
  <p className="text-lg font-bold mb-2">Error</p>
  <p>{error}</p>
  </motion.div>
  );
};

export default ErrorMessage;