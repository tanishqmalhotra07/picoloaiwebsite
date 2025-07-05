'use client';

import React from 'react';
import Orb from './Orb';

interface ShapeOrbProps {
  shape: 'circle' | 'square' | 'octagon';
  interactive?: boolean;
}

const ShapeOrb: React.FC<ShapeOrbProps> = ({ shape = 'circle', interactive = true }) => {
  // Define colors for each shape
  const hues = {
    circle: 0, // Purple (default)
    square: 120, // Green
    octagon: 30 // Orange
  };

  // Define shape styles
  const shapeStyles = {
    circle: {},
    square: {
      borderRadius: '15%',
      overflow: 'hidden'
    },
    octagon: {
      clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
      WebkitClipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)'
    }
  };

  return (
    <div className="w-full h-full transition-all duration-1000" style={shapeStyles[shape]}>
      <Orb interactive={interactive} hue={hues[shape]} />
    </div>
  );
};

export default ShapeOrb;