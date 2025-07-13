'use client';

import React, { useState } from 'react';
import { useChatbot } from '@/context/ChatbotContext';
import RobotModel from './RobotModel';

const ChatbotButton: React.FC = () => {
  const { openChatbot, isChatbotOpen } = useChatbot();
  const [isHovered, setIsHovered] = useState(false);

  if (isChatbotOpen) return null;

  return (
    <div 
      className="fixed bottom-0 right-0 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 cursor-pointer z-50"
      onClick={openChatbot}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <RobotModel url="/ChatRobo.glb" isHovered={isHovered} />
    </div>
  );
};

export default ChatbotButton;