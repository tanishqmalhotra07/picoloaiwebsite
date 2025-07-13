'use client';

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Chatbot from '@/components/Chatbot';
import ChatbotButton from '@/components/ChatbotButton';

interface ChatbotContextType {
  isChatbotOpen: boolean;
  openChatbot: () => void;
  closeChatbot: () => void;
}

const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined);

export const useChatbot = () => {
  const context = useContext(ChatbotContext);
  if (!context) {
    throw new Error('useChatbot must be used within a ChatbotProvider');
  }
  return context;
};

export const ChatbotProvider = ({ children }: { children: ReactNode }) => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const pathname = usePathname();

  // Close chatbot on route change
  useEffect(() => {
    closeChatbot();
  }, [pathname]);

  const openChatbot = () => setIsChatbotOpen(true);
  const closeChatbot = () => setIsChatbotOpen(false);

  return (
    <ChatbotContext.Provider value={{ isChatbotOpen, openChatbot, closeChatbot }}>
      {children}
      <Chatbot isOpen={isChatbotOpen} onClose={closeChatbot} />
      <ChatbotButton />
    </ChatbotContext.Provider>
  );
};