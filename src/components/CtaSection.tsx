'use client';

import React, { useRef } from 'react';
import { useContactForm } from '@/context/ContactFormContext';
import { motion, useInView } from 'framer-motion';

const CtaSection = () => {
  const { openForm } = useContactForm();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <motion.div
      ref={ref}
      className="container mx-auto py-0 px-4 sm:px-6"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <div className="relative rounded-lg p-0.5 bg-gradient-to-r from-purple-500 to-pink-500">
        <div className="bg-[#02010C] rounded-md p-3 sm:p-4 px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
          <div className="text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-bold text-white">Accelerate your AI Adoption journey.</h3>
            <p className="text-gray-400 text-xs sm:text-sm">Get in touch with our team to discuss upon the further plans.</p>
          </div>
          <button onClick={openForm} className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold px-4 sm:px-5 py-1.5 sm:py-2 rounded-lg transition-transform duration-300 hover:scale-105 text-xs sm:text-sm w-full sm:w-auto">
            Talk to Us
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CtaSection;
