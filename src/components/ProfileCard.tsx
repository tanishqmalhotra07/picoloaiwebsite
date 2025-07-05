import React, { useRef, useEffect, useState, useCallback } from 'react';
import './ProfileCard.css';


interface ProfileCardProps {
  title: string;
  description: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  title,
  description,
}) => {
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
  }, [isPointerInside, updatePointerPosition]);

  return (
    <div className="pc-card-wrapper">
      <div ref={cardRef} className={`pc-card ${isPointerInside ? 'active' : ''}`}>
        <div className="pc-inside">
          <div className="pc-shine"></div>
          <div className="pc-glare"></div>
          <div className="pc-content">
            <div className="pc-details">
              <h3>{title}</h3>
              <p className="pc-description">{description}</p>

            </div>
            <div className="pc-footer">
                <button className="pc-learn-more-btn">Get Started</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
