'use client';

import React from 'react';
import { useContactForm } from '@/context/ContactFormContext';
import { motion } from 'framer-motion';

const itemVariants = {
  hidden: { y: -20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: 'easeInOut' } },
};

const Header = () => {
  const { openForm } = useContactForm();

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-5 md:p-8"
      variants={itemVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex items-center space-x-2">
        <h1 className="text-xl hidden lg:block lg:ml-22 lg:text-3xl font-semibold text-white">Picolo AI</h1>
      </div>
      <div className="flex items-center space-x-4">
        <button 
          onClick={openForm}
          className="px-4 py-2 rounded-full text-white bg-black/50 border border-purple-500 shadow-lg shadow-purple-500/50 hover:shadow-xl hover:shadow-purple-500/80 transition-all duration-300 md:px-6 text-sm sm:text-base font-medium"
        >
          Let&apos;s Talk
        </button>
      </div>
    </motion.header>
  );
};

export default Header;
