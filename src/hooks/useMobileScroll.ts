import { useEffect } from 'react';

/**
 * Hook to enhance scroll speed on mobile devices only
 * @param targetRef - Reference to the scrollable element
 * @param speedFactor - How much to multiply scroll speed (default: 2.5)
 */
const useMobileScroll = (
  targetRef: React.RefObject<HTMLElement | HTMLDivElement | null>,
  speedFactor: number = 2.5
): void => {
  useEffect(() => {
    // Only apply on mobile devices
    if (typeof window === 'undefined' || window.innerWidth >= 768) {
      return;
    }

    const target = targetRef.current;
    if (!target) return;
    
    // Function to handle touch events for smoother mobile scrolling
    let touchStartY = 0;
    let lastTouchY = 0;
    let touchScrolling = false;
    
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      lastTouchY = touchStartY;
      touchScrolling = true;
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      if (!touchScrolling) return;
      
      const currentY = e.touches[0].clientY;
      const deltaY = lastTouchY - currentY;
      lastTouchY = currentY;
      
      // Apply enhanced scroll
      window.scrollBy(0, deltaY * speedFactor);
      e.preventDefault();
    };
    
    const handleTouchEnd = () => {
      touchScrolling = false;
    };
    
    // Add event listeners
    document.addEventListener('touchstart', handleTouchStart, { passive: false });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);
    
    // Cleanup
    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [targetRef, speedFactor]);
};

export default useMobileScroll;