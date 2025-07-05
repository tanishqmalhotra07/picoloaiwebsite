'use client';

import React from 'react';
import Orb from './Orb';

type ShapeType = 'circle' | 'square' | 'octagon';

interface MorphingOrbProps {
  shape: ShapeType;
  interactive?: boolean;
}

const MorphingOrb: React.FC<MorphingOrbProps> = ({ 
  interactive = true
}) => {
  return (
    <div className="relative w-full h-full">
      {/* SVG mask for shape morphing */}
      <div className="w-full h-full">
        <Orb 
          interactive={interactive} 
          hoverIntensity={0.7}
        />
      </div>
    </div>
  );
};

export default MorphingOrb;