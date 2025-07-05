'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Chatbot from './Chatbot';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      type: 'spring', 
      stiffness: 100, 
      damping: 10, 
      delay: 2.5 
    } 
  },
};

const Footer = () => {
  const [isChatbotOpen, setChatbotOpen] = useState(false);

  const toggleChatbot = () => {
    setChatbotOpen(!isChatbotOpen);
  };

  return (
    <>
      <motion.footer
        className="fixed bottom-3 sm:bottom-4 md:bottom-6 lg:bottom-8 right-3 sm:right-4 md:right-6 lg:right-8 z-50"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        onClick={toggleChatbot}
      >
        <motion.div
          className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full p-0.5 bg-gradient-to-br from-purple-600 to-red-500 cursor-pointer shadow-lg shadow-purple-500/30"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{
            duration: 2.5,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'mirror',
          }}
          whileHover={{ scale: 1.20 }}
        >
          <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
            <Image src="/p.png" alt="Chatbot Icon" width={22} height={36} className="ml-1 w-4 h-6 sm:w-5 sm:h-8 md:w-6 md:h-9" />
          </div>
        </motion.div>
      </motion.footer>
      <Chatbot isOpen={isChatbotOpen} onClose={() => setChatbotOpen(false)} />
    </>
  );
};

export default Footer;
