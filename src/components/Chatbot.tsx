import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import './Chatbot.css';

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

const Chatbot: React.FC<ChatbotProps> = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('no-scroll');
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 3000); // 3 second loading animation
      return () => clearTimeout(timer);
    } else {
      document.body.classList.remove('no-scroll');
    }

    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="chatbot-container"
          initial={{ opacity: 0, y: 50, scale: 0.5 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.5 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          {isLoading ? (
            <motion.div 
              className="loading-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Image src="/ChatbotLogo.png" alt="Picolo Logo" width={80} height={80} className="loading-logo" />
              </motion.div>
              <h1 className="loading-text">Picolo</h1>
            </motion.div>
          ) : (
            <>
              <div className="chatbot-header">
                <div className="header-title">
                  <Image src="/logo.png" alt="Picolo Logo" width={24} height={24} />
                  <span>PICOLO AI</span>
                </div>
                <div className="header-icons">
                  <button onClick={onClose}>&times;</button>
                </div>
              </div>
              <div className="chatbot-body">
                <div className="welcome-message">
                  <h3>Good Evening! 👋</h3>
                  <p>How can I help you today?</p>
                </div>
                <div className="suggestions">
                  <p>Here are a few things I can help you with...</p>
                  <button className="suggestion-btn">What is my KYC status?</button>
                  <button className="suggestion-btn">How much time does it take to complete KYC?</button>
                </div>
              </div>
              <div className="chatbot-input">
                <button>+</button>
                <input type="text" placeholder="Ask a question..." />
                <button className="send-btn">➤</button>
              </div>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Chatbot;
