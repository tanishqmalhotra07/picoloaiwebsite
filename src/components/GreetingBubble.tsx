'use client';

import React from 'react';
import { motion } from 'framer-motion';

const GreetingBubble = () => {
  return (
    <motion.div
      className="absolute bottom-40 mb-2 w-max max-w-xs p-3 bg-white rounded-lg shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 3, duration: 0.5, type: 'spring' }}
      style={{
        right: '78%',
                marginRight: '0.5rem',
        transform: 'translateX(0%)',
      }}
    >
      <p className="text-sm text-gray-800">May I help you?</p>
      <div
        className="absolute right-0 top-1/2 w-0 h-0 border-t-8 border-t-transparent border-l-8 border-l-white border-b-8 border-b-transparent"
        style={{ transform: 'translate(100%, -50%)' }}
      ></div>
    </motion.div>
  );
};

export default GreetingBubble;
