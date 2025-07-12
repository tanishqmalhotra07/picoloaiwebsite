'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Chatbot from './Chatbot';
import RobotModel from './RobotModel';

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
  const [isHovered, setIsHovered] = useState(false);

  const toggleChatbot = () => {
    setChatbotOpen(!isChatbotOpen);
  };

  return (
    <>
      {!isChatbotOpen && (
        <motion.footer
          className="fixed bottom-[-0.4rem] right-[-0.5rem] sm:bottom-2 sm:right-2 z-50"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 cursor-pointer"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{
              duration: 2.5,
              ease: 'easeInOut',
              repeat: Infinity,
              repeatType: 'mirror',
            }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            onClick={toggleChatbot}
          >
            <RobotModel url="/ChatRobo.glb" isHovered={isHovered} />
          </motion.div>
        </motion.footer>
      )}
      <Chatbot isOpen={isChatbotOpen} onClose={() => setChatbotOpen(false)} />
    </>
  );
};

export default Footer;