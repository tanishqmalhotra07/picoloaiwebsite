import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useContactForm } from '@/context/ContactFormContext';
import './ProfileCard.css';


interface ProfileCardProps {
  name?: string;
  title?: string;
  industry?: string;
  description: string;
  image?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  title,
  industry,
  description,
  image,
}) => {
  const { openForm } = useContactForm();
  const cardRef = useRef<HTMLDivElement>(null);
  const [isPointerInside, setIsPointerInside] = useState(false);

  const updatePointerPosition = useCallback((e: PointerEvent) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      cardRef.current.style.setProperty('--pointer-x', `${x}px`);
      cardRef.current.style.setProperty('--pointer-y', `${y}px`);

      const fromLeft = x / rect.width;
      const fromTop = y / rect.height;
      const fromCenter = Math.sqrt((fromLeft - 0.5) ** 2 + (fromTop - 0.5) ** 2);
      cardRef.current.style.setProperty('--pointer-from-left', fromLeft.toString());
      cardRef.current.style.setProperty('--pointer-from-top', fromTop.toString());
      cardRef.current.style.setProperty('--pointer-from-center', fromCenter.toString());

      const rotateX = (fromTop - 0.5) * -20;
      const rotateY = (fromLeft - 0.5) * 20;
      cardRef.current.style.setProperty('--rotate-x', `${rotateY}deg`);
      cardRef.current.style.setProperty('--rotate-y', `${rotateX}deg`);

      const backgroundX = 40 + fromLeft * 20;
      const backgroundY = 40 + fromTop * 20;
      cardRef.current.style.setProperty('--background-x', `${backgroundX}%`);
      cardRef.current.style.setProperty('--background-y', `${backgroundY}%`);
    }
  }, []);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    
    // Check if device is mobile (screen width < 768px)
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    
    // Only add event listeners on desktop
    if (!isMobile) {
      const handlePointerEnter = () => setIsPointerInside(true);
      const handlePointerLeave = () => setIsPointerInside(false);
      const handlePointerMove = (e: PointerEvent) => {
        if (isPointerInside) {
          updatePointerPosition(e);
        }
      };

      card.addEventListener('pointerenter', handlePointerEnter);
      card.addEventListener('pointerleave', handlePointerLeave);
      card.addEventListener('pointermove', handlePointerMove);

      return () => {
        card.removeEventListener('pointerenter', handlePointerEnter);
        card.removeEventListener('pointerleave', handlePointerLeave);
        card.removeEventListener('pointermove', handlePointerMove);
      };
    }
  }, [isPointerInside, updatePointerPosition]);

  return (
    <div className="pc-card-wrapper">
      <div ref={cardRef} className={`pc-card ${isPointerInside ? 'active' : ''}`}>
        <div className="pc-inside">
          <div className="pc-shine"></div>
          <div className="pc-glare"></div>
          <div className="pc-content">
            <div className="pc-details">
              <h3 className="text-[10px] sm:text-xl md:text-3xl font-bold text-white text-center leading-tight h-[5rem] sm:h-[5rem] flex items-center justify-center line-clamp-3">{name || title}</h3>
              {image && (
                <div className="pc-image-container h-10 sm:h-20 flex items-center justify-center my-0 sm:my-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={`/${image}.png`} 
                    alt={name || title || ''} 
                    className="pc-image mx-auto h-full w-auto object-contain"
                  />
                </div>
              )}
              {industry && <p className="pc-industry text-purple-400 text-xs sm:text-sm font-medium mb-2 min-h-[1.5rem] flex items-center justify-center">{industry}</p>}
              <p className="pc-description text-[11px] sm:text-sm md:text-base h-[4.5rem] sm:h-[5rem] flex items-center justify-center line-clamp-3">{description}</p>
            </div>
            <div className="pc-footer">
                <button onClick={openForm} className="pc-learn-more-btn">Get Started</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
