'use client';

import React, { useState, useEffect } from 'react';

interface TypingEffectProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
}

const TypingEffect: React.FC<TypingEffectProps> = ({ 
  text, 
  speed = 30,
  onComplete
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [lastChar, setLastChar] = useState('');
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    if (currentIndex < text.length) {
      // Start fade-in animation
      setFadeIn(true);
      setLastChar(text[currentIndex]);
      
      const fadeTimeout = setTimeout(() => {
        // Add character to displayed text and reset fade
        setDisplayedText(prev => prev + text[currentIndex]);
        setFadeIn(false);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      
      return () => clearTimeout(fadeTimeout);
    } else if (!isComplete) {
      setIsComplete(true);
      if (onComplete) onComplete();
    }
  }, [currentIndex, text, speed, isComplete, onComplete]);

  return (
    <>
      {displayedText}
      <span className={`typing-fade ${fadeIn ? 'fade-in' : ''}`}>{lastChar}</span>
    </>
  );
};

export default TypingEffect;