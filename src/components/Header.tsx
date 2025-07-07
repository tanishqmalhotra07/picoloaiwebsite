'use client';

import React, { useState, useEffect } from 'react';
import { useContactForm } from '@/context/ContactFormContext';
import { motion } from 'framer-motion';

const itemVariants = {
  hidden: { y: -20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.3, ease: 'easeInOut' } },
};

const Header = () => {
  const { openForm } = useContactForm();
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Handle scroll event to hide navigation links when scrolling
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    // Special case for solutions section which is inside the orb section
    if (id === 'solutions') {
      const orbSection = document.getElementById('about');
      if (orbSection) {
        // Scroll to about 80% of the orb section height to reach the solutions part
        const orbSectionRect = orbSection.getBoundingClientRect();
        const scrollPosition = window.scrollY + orbSectionRect.top + (orbSectionRect.height * 0.8);
        window.scrollTo({
          top: scrollPosition,
          behavior: 'smooth'
        });
      }
    } else {
      // Normal scrolling for other sections
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-5 md:p-8"
      variants={itemVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex items-center space-x-2">
        <h1 className="text-xl hidden lg:block lg:ml-22 lg:text-3xl font-semibold text-white">Picolo AI</h1>
      </div>
      
      {/* Navigation Links - Middle */}
      <motion.nav 
        className="absolute left-1/2 transform -translate-x-1/2 hidden md:block"
        animate={{ opacity: isScrolled ? 0 : 1, y: isScrolled ? -20 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <ul className="flex space-x-8">
          <li>
            <button 
              onClick={() => scrollToSection('about')} 
              className="text-white/80 hover:text-white text-md font-light transition-colors"
            >
              AI Transformation Services
            </button>
          </li>
          <li>
            <button 
              onClick={() => scrollToSection('solutions')} 
              className="text-white/80 hover:text-white text-md font-light transition-colors"
            >
              AI Agents
            </button>
          </li>
          <li>
            <button 
              onClick={() => scrollToSection('services')} 
              className="text-white/80 hover:text-white text-md font-light transition-colors"
            >
              ROI Estimator
            </button>
          </li>
        </ul>
      </motion.nav>
      
      <div className="flex items-center space-x-4">
        <button 
          onClick={openForm}
          className="px-4 py-2 rounded-full text-white bg-black/50 border border-purple-500 shadow-lg shadow-purple-500/50 hover:shadow-xl hover:shadow-purple-500/80 transition-all duration-300 md:px-6 text-sm sm:text-base font-medium"
        >
          Let&apos;s Talk
        </button>
      </div>
    </motion.header>
  );
};

export default Header;
