'use client';

import React from 'react';

const AnimatedArrow = () => {
  return (
    <div className="relative w-10 h-12">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        className="w-full h-full"
      >
        {/* Bottom arrow (largest) */}
        <path 
          d="M18 16l-6-6-6 6" 
          fill="none" 
          stroke="#4ade80" 
          strokeWidth="3" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="animate-arrow-1"
        />
        
        {/* Middle arrow */}
        <path 
          d="M18 10l-6-6-6 6" 
          fill="none" 
          stroke="#4ade80" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="animate-arrow-2"
        />
        
        {/* Top arrow (smallest) */}
        <path 
          d="M18 4l-6-6-6 6" 
          fill="none" 
          stroke="#4ade80" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="animate-arrow-3"
          transform="translate(0, 2)"
        />
      </svg>
    </div>
  );
};

export default AnimatedArrow;