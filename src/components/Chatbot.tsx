'use client'; // This directive is crucial for Next.js App Router components that use client-side features like useState, useEffect.

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import TypingEffect from './TypingEffect';
import './Chatbot.css'; // Your existing CSS for styling

// Define the shape of a message
interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: string;
  isTyping?: boolean;
}

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

const Chatbot: React.FC<ChatbotProps> = ({ isOpen, onClose }) => {
  // State for the initial loading animation of the modal
  const [showInitialLoading, setShowInitialLoading] = useState(true);

  // States for the actual chat functionality
  const [messages, setMessages] = useState<Message[]>([]); // Stores all chat messages
  const [input, setInput] = useState(''); // Current user input
  const [isSendingMessage, setIsSendingMessage] = useState(false); // Indicates if an AI response is being fetched
  const [error, setError] = useState<string | null>(null); // Stores any error messages

  // Ref for scrolling to the bottom of the chat window
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Environment variable for your backend API URL
  // NEXT_PUBLIC_ prefix makes it available in the browser.
  // This variable MUST be set in your Vercel project settings.
  // Example: NEXT_PUBLIC_CHATBOT_API_URL=https://your-chatbot-backend-ai.onrender.com/chat
  const CHATBOT_API_URL = process.env.NEXT_PUBLIC_CHATBOT_API_URL;

  // Effect for the initial loading animation of the modal
  useEffect(() => {
    if (isOpen) {
      setShowInitialLoading(true);
      const timer = setTimeout(() => {
        setShowInitialLoading(false);
      }, 3000); // 3 second loading animation
      return () => clearTimeout(timer);
    } else {
      // Reset chat states when modal closes
      setMessages([]);
      setInput('');
      setIsSendingMessage(false);
      setError(null);
    }
  }, [isOpen]);

  // Effect for scrolling to the bottom whenever messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Function to send a message to the AI backend
  const sendMessage = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput || isSendingMessage) return; // Don't send empty messages or if already sending

    setError(null); // Clear any previous errors

    // Add user message to state
    const newUserMessage: Message = {
      id: Date.now(),
      text: trimmedInput,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setInput(''); // Clear input field

    setIsSendingMessage(true); // Show loading indicator for AI response

    // Check if API URL is configured
    if (!CHATBOT_API_URL) {
      console.warn('Chatbot API URL is not configured. Using demo mode.');
      // Demo mode - simulate a response
      setTimeout(() => {
        const demoResponse: Message = {
          id: Date.now() + 1,
          text: "I'm sorry, I'm currently in demo mode. The chatbot backend is not connected. Please check the .env.local file to set up the NEXT_PUBLIC_CHATBOT_API_URL environment variable.",
          sender: 'ai',
          timestamp: new Date().toLocaleTimeString(),
        };
        setMessages((prevMessages) => [...prevMessages, demoResponse]);
        setIsSendingMessage(false);
      }, 1500);
      return;
    }

    try {
      // Add a timeout to the fetch to prevent long-hanging requests
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      // Make API call to your backend
      const response = await fetch(CHATBOT_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: trimmedInput }), // Send the user's message
        signal: controller.signal
        // Removed no-cors mode to get actual response
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Add AI response to state
      const newAiMessage: Message = {
        id: Date.now() + 1,
        text: data.response, // Use the actual API response
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages((prevMessages) => [...prevMessages, newAiMessage]);

    } catch (err) {
      console.warn('Failed to fetch AI response:', err);
      
      // Provide a fallback response even when there's an error
      const fallbackResponse: Message = {
        id: Date.now() + 1,
        text: "I'm sorry, I couldn't process your request at the moment. This is a development version without a connected backend.",
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prevMessages) => [...prevMessages, fallbackResponse]);
    } finally {
      setIsSendingMessage(false); // Hide loading indicator
    }
  };

  // Handle Enter key press in the input field
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isSendingMessage) {
      sendMessage();
    }
  };

  // Framer Motion variants for modal animation
  const chatbotVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.5 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: 'easeInOut' } },
    exit: { opacity: 0, y: 50, scale: 0.5, transition: { duration: 0.5, ease: 'easeInOut' } },
  };

  // Handle wheel events to prevent background scrolling (from ContactForm.tsx)
  const handleWheel = (e: React.WheelEvent) => {
    e.stopPropagation();
  };

  // Prevent body scrolling when modal is open while preserving scroll position (from ContactForm.tsx)
  useEffect(() => {
    const preventScroll = (e: Event) => {
      if (isOpen) e.preventDefault();
    };

    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${scrollY}px`;

      window.addEventListener('wheel', preventScroll, { passive: false });
      window.addEventListener('touchmove', preventScroll, { passive: false });
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';

      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }

    return () => {
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';

      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }

      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
    };
  }, [isOpen]);


  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="chatbot-container"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={chatbotVariants}
          // Prevent clicks on container from closing if you want to allow clicking outside to close
          // onClick={onClose} // Uncomment this if you want clicking outside the modal to close it
        >
          {showInitialLoading ? (
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
              {/* Chat Header */}
              <div className="chatbot-header">
                <div className="header-title">
                  <Image src="/logo.png" alt="Picolo Logo" width={24} height={24} />
                  <span>PICOLO AI</span>
                </div>
                <div className="header-icons">
                  <button onClick={onClose}>&times;</button>
                </div>
              </div>

              {/* Chat Body - Message Display Area */}
              <div className="chatbot-body-content" onWheel={handleWheel} onTouchMove={(e) => e.stopPropagation()}>
                {messages.length === 0 && !isSendingMessage && (
                  <div className="welcome-message">
                    <h3>Good Evening! 👋</h3>
                    <p>How can I help you today?</p>
                  </div>
                )}
                
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex mb-4 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[75%] p-3 rounded-lg shadow-md ${
                        msg.sender === 'user'
                          ? 'bg-purple-700 text-white rounded-br-none'
                          : 'bg-purple-100 text-gray-800 rounded-bl-none'
                      }`}
                    >
                      <div className="text-sm whitespace-pre-wrap markdown-content">
                        {msg.sender === 'ai' ? (
                          <TypingEffect text={msg.text} speed={15} />
                        ) : (
                          msg.text
                        )}
                      </div>
                      <span className="block text-xs mt-1 opacity-75">
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                ))}
                {isSendingMessage && (
                  <div className="flex justify-start mb-4">
                    <div className="max-w-[75%] p-3 rounded-lg shadow-md bg-white text-gray-800 rounded-bl-none">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                        <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                {error && (
                  <div className="text-red-500 text-center mt-4 p-2 bg-red-100 rounded-md">
                    {error}
                  </div>
                )}
                <div ref={messagesEndRef} /> {/* Scroll target */}
              </div>

              {/* Chat Input Area */}
              <div className="chatbot-input">
                <button>+</button> {/* This button is currently not functional */}
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask a question..."
                  disabled={isSendingMessage} // Disable input while sending
                />
                <button
                  className="send-btn"
                  onClick={sendMessage}
                  disabled={isSendingMessage || !input.trim()} // Disable send button while sending or if input is empty
                >
                  {isSendingMessage ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    '➤'
                  )}
                </button>
              </div>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Chatbot;