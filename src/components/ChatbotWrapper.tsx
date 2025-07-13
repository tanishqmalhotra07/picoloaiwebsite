'use client';

import React, { useState } from 'react';
import Chatbot from './Chatbot';
import RobotModel from './RobotModel';

const ChatbotWrapper: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [hasMessages, setHasMessages] = useState(false);

  // Function to handle minimizing the chatbot
  const handleMinimize = () => {
    setIsMinimized(true);
    setIsChatOpen(false);
  };

  // Function to handle opening the chatbot
  const handleOpen = () => {
    setIsChatOpen(true);
    setIsMinimized(false);
  };

  // Function to handle closing the chatbot
  const handleClose = () => {
    setIsChatOpen(false);
    setIsMinimized(false);
    setHasMessages(false);
  };

  return (
    <>
      {/* Show the robot model when chat is not open */}
      {!isChatOpen && (
        <div 
          className="fixed bottom-0 right-0 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 cursor-pointer z-50"
          onClick={handleOpen}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <RobotModel url="/ChatRobo.glb" isHovered={isHovered} />
        </div>
      )}

      {/* The chatbot component */}
      <Chatbot 
        isOpen={isChatOpen} 
        onClose={isMinimized ? handleOpen : handleClose}
        onMinimize={handleMinimize}
        isMinimized={isMinimized}
        preserveMessages={isMinimized && hasMessages}
        onMessageSent={() => setHasMessages(true)}
      />
    </>
  );
};

export default ChatbotWrapper;