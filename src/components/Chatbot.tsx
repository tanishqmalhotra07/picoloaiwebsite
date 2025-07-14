'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import './Chatbot.css';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import TypingEffect from './TypingEffect';

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

// Create static variables to persist across renders
const staticMessages: Message[] = [];
let hasShownLoadingAnimation = false;

const Chatbot: React.FC<ChatbotProps> = ({ isOpen, onClose }) => {
  // State for the initial loading animation of the modal
  const [showInitialLoading, setShowInitialLoading] = useState(true);
  
  // States for the actual chat functionality
  const [messages, setMessages] = useState<Message[]>(staticMessages);
  const [input, setInput] = useState('');
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Store thread ID for conversation continuity
  const [threadId, setThreadId] = useState<string | null>(null);

  // Function to clear chat messages
  const handleRefresh = () => {
    setMessages([]);
    staticMessages.length = 0;
    setThreadId(null); // Clear thread ID to start a new conversation
  };

  // Ref for scrolling to the bottom of the chat window
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Environment variable for your backend API URL
  const CHATBOT_API_URL_FULL = process.env.NEXT_PUBLIC_CHATBOT_API_URL;
  const CHATBOT_BASE_URL = CHATBOT_API_URL_FULL
                            ? CHATBOT_API_URL_FULL.replace('/chat', '')
                            : undefined;

  // Effect for the initial loading animation of the modal
  useEffect(() => {
    if (isOpen) {
      if (hasShownLoadingAnimation) {
        // Skip loading animation if it has been shown before
        setShowInitialLoading(false);
      } else {
        setShowInitialLoading(true);
        const timer = setTimeout(() => {
          setShowInitialLoading(false);
          hasShownLoadingAnimation = true; // Mark loading as shown
        }, 3000);
        return () => clearTimeout(timer);
      }
    }
  }, [isOpen]);

  // Effect for scrolling to the bottom whenever messages update
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ block: 'end', inline: 'nearest' });
    }
  }, [messages]);

  // Effect to ping the backend on component mount
  useEffect(() => {
    if (CHATBOT_BASE_URL) {
      fetch(CHATBOT_BASE_URL).catch(() => {});
    }
  }, [CHATBOT_BASE_URL]);

  // Update static messages when local messages change
  useEffect(() => {
    // Copy messages to static array to persist across renders
    staticMessages.length = 0;
    staticMessages.push(...messages);
  }, [messages]);

  // Function to send a message to the AI backend
  const sendMessage = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput || isSendingMessage) return;

    setError(null);

    // Add user message to state
    const newUserMessage: Message = {
      id: Date.now(),
      text: trimmedInput,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setInput('');

    setIsSendingMessage(true);

    // Check if API URL is configured
    if (!CHATBOT_API_URL_FULL) {
      setError('Chatbot service is not configured. Please contact support.');
      setIsSendingMessage(false);
      return;
    }

    try {
      // Make API call to your backend with thread_id if available
      const response = await fetch(CHATBOT_API_URL_FULL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Origin': window.location.origin
        },
        body: JSON.stringify({ 
          message: trimmedInput,
          thread_id: threadId // Send thread_id if we have one
        }),
        credentials: 'omit'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Store the thread_id if provided by the backend
      if (data.thread_id) {
        setThreadId(data.thread_id);
      }
      
      // Add AI response to state with typing effect
      const newAiMessage: Message = {
        id: Date.now() + 1,
        text: data.response,
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString(),
        isTyping: true
      };
      setMessages((prevMessages) => [...prevMessages, newAiMessage]);

    } catch (err) {
      setError(`Failed to get response: ${err instanceof Error ? err.message : String(err)}. Please try again.`);
    } finally {
      setIsSendingMessage(false);
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

  // Handle wheel events to prevent background scrolling
  const handleWheel = (e: React.WheelEvent) => {
    e.stopPropagation();
  };

  // Prevent body scrolling when modal is open
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
        >
          <div className="chatbot-container-inner">
          {showInitialLoading ? (
            <motion.div
              className="loading-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div className="absolute inset-0 z-0" style={{
                backgroundImage: "url('/chatbotbg.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'bottom',
                opacity: 0.1,
                scale: 1.2,
                transform: 'rotate(30deg)'
              }}></div>
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="relative z-10"
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
                  <Image src="/ChatbotLogo.png" alt="Picolo Logo" width={28} height={28} />
                  <span>Picolo AI</span>
                </div>
                <div className="header-icons flex items-center">
                  <button 
                    onClick={handleRefresh} 
                    className="close-btn mr-2" 
                    title="Refresh"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21.5 2v6h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M21.5 12a9 9 0 1 1-2.5-6.3L21.5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <button onClick={onClose} className="close-btn" title="Close">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Chat Body - Message Display Area */}
              <div className="chatbot-body-content" onWheel={handleWheel} onTouchMove={(e) => e.stopPropagation()}>
                {messages.length === 0 && !isSendingMessage && (
                  <div className="welcome-container">
                    <div className="welcome-message">
                      <h3><span className="gradient-text">Good Evening!</span> 👋</h3>
                      <p>How can I help you today?</p>
                    </div>
                  </div>
                )}
                
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex mb-4 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.sender === 'ai' && (
                      <div className="flex-shrink-0 mr-2 mb-1">
                        <Image src="/ChatbotLogo.png" alt="Picolo AI" width={30} height={30} />
                      </div>
                    )}
                    <div
                      className={`max-w-[75%] p-3 rounded-lg shadow-md ${
                        msg.sender === 'user'
                          ? 'bg-gradient-to-r from-purple-700 to-purple-600 text-white rounded-br-none'
                          : 'bg-gradient-to-r from-purple-100 to-pink-100 text-gray-800 rounded-bl-none'
                      }`}
                    >
                      {msg.sender === 'ai' ? (
                        <div className="text-sm whitespace-pre-wrap markdown-content">
                          {msg.isTyping ? (
                            <TypingEffect 
                              text={msg.text} 
                              speed={10}
                              onComplete={() => {
                                // Mark typing as complete
                                setMessages(messages => 
                                  messages.map(m => 
                                    m.id === msg.id ? {...m, isTyping: false} : m
                                  )
                                );
                              }}
                            />
                          ) : (
                            <ReactMarkdown
                              remarkPlugins={[remarkGfm]}
                              components={{
                                table: ({ ...props }) => (
                                  <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                                    <table {...props} />
                                  </div>
                                )
                              }}
                            >
                              {msg.text}
                            </ReactMarkdown>
                          )}
                        </div>
                      ) : (
                        <p className="text-sm">{msg.text}</p>
                      )}
                    </div>
                    {msg.sender === 'user' && (
                      <div className="flex-shrink-0 ml-2 mb-1">
                        <div className="bg-purple-600 rounded-full p-1">
                          <Image src="/customer.png" alt="User" width={16} height={16} />
                        </div>
                      </div>
                    )}
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
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input Area */}
              <div className="chatbot-input">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask a question..."
                  disabled={isSendingMessage}
                />
                <button
                  className="send-btn"
                  onClick={sendMessage}
                  disabled={isSendingMessage || !input.trim()}
                >
                  {isSendingMessage ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M22 2L11 13"/><path d="M22 2L15 22L11 13L2 9L22 2Z"/></svg>
                  )}
                </button>
              </div>
            </>
          )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Chatbot;