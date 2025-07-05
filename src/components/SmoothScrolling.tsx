'use client';

import { ReactNode, useEffect, useState } from 'react';
import Lenis from 'lenis';
import { LenisContext } from '@/context/LenisContext';

const SmoothScrolling = ({ children }: { children: ReactNode }) => {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    // Create Lenis instance with optimized settings
    const lenisInstance = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Improved easing function
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8,
      infinite: false,
    });

    // Use requestAnimationFrame for smoother animation
    function raf(time: number) {
      lenisInstance.raf(time);
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
