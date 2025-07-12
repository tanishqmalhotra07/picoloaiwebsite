'use client';

import React, { useState, useEffect } from 'react';

interface TypingEffectProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
}

const TypingEffect: React.FC<TypingEffectProps> = ({ 
  text, 
  speed = 15, // Moderate typing speed (15ms delay)
  onComplete
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [lastChar, setLastChar] = useState('');
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    // Process multiple characters at once for faster typing
    if (currentIndex < text.length) {
      // Process a moderate number of characters at once for better readability
      const charsToProcess = Math.min(20, text.length - currentIndex);
      const nextChars = text.substring(currentIndex, currentIndex + charsToProcess);
      
      // Start fade-in animation for the last character
      setFadeIn(true);
      setLastChar(nextChars[nextChars.length - 1]);
      
      const fadeTimeout = setTimeout(() => {
        // Add characters to displayed text and reset fade
        setDisplayedText(prev => prev + nextChars);
        setFadeIn(false);
        setCurrentIndex(prev => prev + charsToProcess);
      }, speed);
      
      return () => clearTimeout(fadeTimeout);
    } else if (!isComplete) {
      setIsComplete(true);
      if (onComplete) onComplete();
    }
  }, [currentIndex, text, speed, isComplete, onComplete]);

  // For faster rendering, use dangerouslySetInnerHTML instead of React elements
  const formattedText = displayedText.replace(/\n/g, '<br>');

  return (
    <>
      <span dangerouslySetInnerHTML={{ __html: formattedText }} />
      <span className={`typing-fade ${fadeIn ? 'fade-in' : ''}`}>{lastChar}</span>
    </>
  );
};

export default TypingEffect;