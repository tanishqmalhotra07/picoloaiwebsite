'use client';

import { ReactNode, useEffect, useState } from 'react';
import Lenis from 'lenis';
import { LenisContext } from '@/context/LenisContext';

const SmoothScrolling = ({ children }: { children: ReactNode }) => {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    // Create Lenis instance with optimized settings for smoother scrolling
    const lenisInstance = new Lenis({
      duration: 1.3, // Slightly longer duration for smoother feel
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential ease-out
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1, // Reduced multiplier for smoother scrolling
      infinite: false,
  
    });

    // Optimize requestAnimationFrame with throttling
    let lastFrameTime = 0;
    const frameInterval = 1000 / 60; // Target 60fps
    
    function raf(time: number) {
      const deltaTime = time - lastFrameTime;
      
      if (deltaTime > frameInterval) {
        lastFrameTime = time - (deltaTime % frameInterval);
        lenisInstance.raf(time);
      }
      
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    setLenis(lenisInstance);

    // Cleanup
    return () => {
      lenisInstance.destroy();
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  );
};

export default SmoothScrolling;
