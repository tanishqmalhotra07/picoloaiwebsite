'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ isOpen, onClose }) => {
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const formVariants = {
    hidden: { y: '100vh', opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100, damping: 20 } },
    exit: { y: '100vh', opacity: 0, transition: { duration: 0.3 } },
  };
  
  // Handle wheel events to prevent background scrolling
  const handleWheel = (e: React.WheelEvent) => {
    e.stopPropagation();
  };
  
  // Prevent body scrolling when modal is open while preserving scroll position
  React.useEffect(() => {
    const preventScroll = (e: Event) => {
      if (isOpen) e.preventDefault();
    };
    
    if (isOpen) {
      // Store current scroll position
      const scrollY = window.scrollY;
      
      // Apply styles that prevent scrolling but maintain position
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${scrollY}px`;
      
      window.addEventListener('wheel', preventScroll, { passive: false });
      window.addEventListener('touchmove', preventScroll, { passive: false });
    } else {
      // Get the body top position (without 'px')
      const scrollY = document.body.style.top;
      
      // Reset the body styles
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      
      // Restore scroll position if we have one
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
    
    return () => {
      // Get the body top position (without 'px')
      const scrollY = document.body.style.top;
      
      // Reset the body styles
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      
      // Restore scroll position if we have one
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
      
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 z-[9999] flex justify-center items-center"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={backdropVariants}
          onClick={onClose}
        >
          <motion.div
            className="bg-[#EBF9FF] text-black rounded-lg shadow-xl p-8 w-full max-w-2xl max-h-[80vh] overflow-y-auto relative scrollbar-hide"
            variants={formVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            onWheel={handleWheel}
            onTouchMove={(e) => e.stopPropagation()}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl">&times;</button>
            <h2 className="text-3xl font-bold mb-6">Tell us where you&apos;re at</h2>
            <form>
                            <div className="grid no-scrollbar grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">What is your name?</label>
                  <input type="text" placeholder="Name" className="w-full p-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">What is your email?</label>
                  <input type="email" placeholder="Email" className="w-full p-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-blue-500" />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">What is your role in the company?</label>
                <input type="text" placeholder="Enter role" className="w-full p-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-blue-500" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                  <input type="text" placeholder="Enter company name" className="w-full p-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company Website</label>
                  <input type="text" placeholder="Enter company website" className="w-full p-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-blue-500" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                 <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company Size</label>
                  <select className="w-full p-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-blue-500">
                    <option>Select company size</option>
                    <option>1-10</option>
                    <option>11-50</option>
                    <option>51-200</option>
                    <option>201-500</option>
                    <option>500+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company&apos;s Annual Revenue</label>
                  <select className="w-full p-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-blue-500">
                    <option>Select revenue range</option>
                    <option>Under $1M</option>
                    <option>$1M - $10M</option>
                    <option>$10M - $50M</option>
                    <option>$50M - $100M</option>
                    <option>$100M+</option>
                  </select>
                </div>
              </div>
               <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Project budget</label>
                  <select className="w-full p-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-blue-500">
                    <option>Select budget range</option>
                     <option>$5k - $10k</option>
                    <option>$10k - $25k</option>
                    <option>$25k - $50k</option>
                    <option>$50k+</option>
                  </select>
                </div>
                 <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">What services are you interested in?</label>
                  <select className="w-full p-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-blue-500">
                    <option>Select service</option>
                    <option>AI Development</option>
                    <option>Web Development</option>
                    <option>Mobile Development</option>
                    <option>UI/UX Design</option>
                  </select>
                </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea placeholder="Enter message" rows={4} className="w-full p-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-blue-500"></textarea>
              </div>
              <div className="text-center mt-6">
                 <button type="submit" className="bg-white text-black px-8 py-3 rounded-full font-semibold border border-gray-300 hover:bg-gray-100 transition">
                  Send inquiry
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactForm;
