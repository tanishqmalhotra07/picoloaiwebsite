'use client';

import React, { useRef, useEffect, useState } from 'react';
import BackgroundSquares from './BackgroundSquares';
import { Star } from 'lucide-react';
import './testimonials.css';

const testimonials = [
  {
    quote: "It's like hiring a 24/7 sales rep who never forgets to follow up — WhatsApp conversion is up by 60%.",
    name: "Co-founder",
    title: "D2C Beauty Brand",
    stars: 5,
  },
  {
    quote: "From missed leads to closed orders — the AI handles our online inquiries before my team even opens their laptops.",
    name: "CEO",
    title: "Industrial Equipment Distributor",
    stars: 4,
  },
  {
    quote: "Customers message at 11pm and get everything from pricing to appointment links. We've automated our entire client journey.",
    name: "Owner",
    title: "Luxury Salon Chain",
    stars: 5,
  },
  {
    quote: "This isn't just automation — it's business growth. We recovered 40+ lost leads in 2 weeks via retargeting.",
    name: "Growth Lead",
    title: "Online Furniture Store",
    stars: 5,
  },
  {
    quote: "Earlier we used to lose our WhatsApp leads after hours. Now the AI captures, qualifies, and syncs to our CRM on autopilot.",
    name: "Head of Sales",
    title: "Auto Dealership Group",
    stars: 4,
  },
  {
    quote: "The AI agent talks like a real team member — it's booking trials, collecting payments, and even promoting our loyalty program.",
    name: "Founder",
    title: "Premium Makeup Studio",
    stars: 5,
  },
  {
    quote: "We now close leads directly from WhatsApp with instant product catalogs, auto-replies, and payment links — frictionless.",
    name: "Director",
    title: "B2B Fashion Wholesaler",
    stars: 4,
  },
  {
    quote: "Our AI agent responds faster than my entire front desk ever could — bookings doubled in just 3 weeks.",
    name: "Founder",
    title: "Interior Design Studio",
    stars: 5,
  },
  {
    quote: "Our AI assistant handles everything — from guest queries to table bookings to feedback collection. Hospitality just got an upgrade.",
    name: "Operations Head",
    title: "Multi-location Restaurant Group",
    stars: 4,
  }
];

const TestimonialCard = ({ testimonial }: { testimonial: typeof testimonials[0] }) => (
  <div className="testimonial-card">
    <div className="h-full bg-gradient-to-br from-[#5909A2] to-[#21033C] rounded-2xl p-5 sm:p-6 flex flex-col justify-between">
      <div>
        <div className="flex items-center mb-4">
          <Star className="w-5 h-5 text-yellow-400 fill-current" />
          <Star className="w-5 h-5 text-yellow-400 fill-current" />
          <Star className="w-5 h-5 text-yellow-400 fill-current" />
          <Star className="w-5 h-5 text-yellow-400 fill-current" />
          <Star className="w-5 h-5 text-yellow-400 fill-current" />
        </div>
        <p className="text-gray-200 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6">{testimonial.quote}</p>
      </div>
      <div className="flex items-center">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-purple-900 flex items-center justify-center font-bold text-lg sm:text-xl mr-3 sm:mr-4">
          {testimonial.name.charAt(0)}
        </div>
        <div>
          <p className="font-bold text-white text-sm sm:text-base">{testimonial.name}</p>
          <p className="text-xs sm:text-sm text-purple-300">{testimonial.title}</p>
        </div>
      </div>
    </div>
  </div>
);

const Testimonials = () => {
  const [isPaused, setIsPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const positionRef = useRef(0);
  const speedRef = useRef(0.8); // Adjust speed as needed
  
  // Drag interaction state
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);
  
  // Create two identical sets of testimonials for the infinite loop effect
  const allTestimonials = [...testimonials, ...testimonials, ...testimonials];
  
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    
    // GSAP-like smooth animation using transform instead of scrollLeft
    const animate = () => {
      if (!isPaused && !isDraggingRef.current) {
        positionRef.current += speedRef.current;
        
        // Reset when we've moved by half the width (first set of testimonials)
        const trackWidth = track.scrollWidth / 3;
        if (positionRef.current >= trackWidth) {
          positionRef.current = 0;
        }
        
        // Use transform for smoother animation (GPU accelerated)
        track.style.transform = `translateX(${-positionRef.current}px)`;
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPaused]);
  
  // Setup drag handlers
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    
    const handleDragStart = (e: MouseEvent | TouchEvent) => {
      isDraggingRef.current = true;
      setIsPaused(true);
      
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      startXRef.current = clientX;
      startScrollLeftRef.current = positionRef.current;
      
      document.body.style.cursor = 'grabbing';
    };
    
    const handleDragMove = (e: MouseEvent | TouchEvent) => {
      if (!isDraggingRef.current) return;
      
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const dx = clientX - startXRef.current;
      positionRef.current = startScrollLeftRef.current - dx;
      
      // Handle loop wraparound
      const trackWidth = track.scrollWidth / 3;
      if (positionRef.current < 0) {
        positionRef.current = trackWidth + positionRef.current;
      } else if (positionRef.current > trackWidth) {
        positionRef.current = positionRef.current % trackWidth;
      }
      
      track.style.transform = `translateX(${-positionRef.current}px)`;
    };
    
    const handleDragEnd = () => {
      isDraggingRef.current = false;
      setIsPaused(false);
      document.body.style.cursor = '';
    };
    
    // Mouse events
    track.addEventListener('mousedown', handleDragStart);
    window.addEventListener('mousemove', handleDragMove);
    window.addEventListener('mouseup', handleDragEnd);
    
    // Touch events
    track.addEventListener('touchstart', handleDragStart);
    window.addEventListener('touchmove', handleDragMove);
    window.addEventListener('touchend', handleDragEnd);
    
    return () => {
      // Cleanup
      track.removeEventListener('mousedown', handleDragStart);
      window.removeEventListener('mousemove', handleDragMove);
      window.removeEventListener('mouseup', handleDragEnd);
      
      track.removeEventListener('touchstart', handleDragStart);
      window.removeEventListener('touchmove', handleDragMove);
      window.removeEventListener('touchend', handleDragEnd);
    };
  }, []);
  
  return (
    <section className="relative bg-[#02010C] text-white py-20 sm:py-32 overflow-hidden">
      <BackgroundSquares />
      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12">
          <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-semibold tracking-wider text-purple-300 bg-purple-900/30 border border-purple-700 rounded-full">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium mt-3 sm:mt-4">What our clients say?</h2>
          <p className="text-base sm:text-lg text-gray-400 mt-3 sm:mt-4 max-w-2xl mx-auto px-4">
            Our clients have loved us for a long time. And we love them all!
          </p>
        </div>

        <div className="testimonial-container">
          <div 
            className="testimonial-track"
            ref={trackRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            style={{
              transform: 'translateX(0)',
              willChange: 'transform',
              backfaceVisibility: 'hidden',
              WebkitFontSmoothing: 'subpixel-antialiased',
              cursor: 'grab'
            }}
          >
            {allTestimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;