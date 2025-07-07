'use client';

import { useState, useEffect } from 'react';
import LoadingAnimation from '@/components/LoadingAnimation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import OrbSection from '@/components/OrbSection';
import ServicesSection from '@/components/ServicesSection';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import CtaSection from '@/components/CtaSection';
import EndSection from '@/components/EndSection';
import SmoothScrolling from '@/components/SmoothScrolling';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [imagePreloaded, setImagePreloaded] = useState(false);
  const [animationFinished, setAnimationFinished] = useState(false);

  // Preload the hero background image
  useEffect(() => {
    const img = new Image();
    img.src = '/bacpico.jpg';
    img.onload = () => setImagePreloaded(true);
  }, []);

  useEffect(() => {
    if (imagePreloaded && animationFinished) {
      // Immediately show the hero section when animation is finished
      // No delay to ensure the hero appears immediately
      setIsLoading(false);
    }
  }, [imagePreloaded, animationFinished]);

  return (
    <SmoothScrolling>
      <main className="relative no-scrollbar w-full bg-black" style={{ backgroundColor: '#000' }}>
      <LoadingAnimation onAnimationComplete={() => setAnimationFinished(true)} />
      {!isLoading && (
        <>
          <Hero />
          <About />
          <OrbSection />
      <ServicesSection />
          <Testimonials />
          <Contact />
          <div className="bg-[#02010C] py-4">
            <CtaSection />
          </div>
          <EndSection />
        </>
      )}
      </main>
    </SmoothScrolling>
  );
}

