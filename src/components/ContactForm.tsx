'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CountrySelect from './CountrySelect';

interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: '',
    companyName: '',
    companyWebsite: '',
    businessNature: '',
    desiredOutcome: '',
    budgetRange: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Form submission handler - Google Sheets integration to be implemented later
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      // Google Sheets Web App URL - this is the URL of the deployed Google Apps Script
      const scriptURL = 'https://script.google.com/macros/s/AKfycbxnAQmD9Q9qaaM7GPgpGArkmp0euWLrU6opG2udms_EEhq-uPssB-dK0SLoHAgVROqX/exec';
      
      // Format data for Google Sheets
      const formDataForSheet = new FormData();
      formDataForSheet.append('timestamp', new Date().toISOString());
      Object.entries(formData).forEach(([key, value]) => {
        formDataForSheet.append(key, value);
      });
      
      // Create a URLSearchParams object for better compatibility with Google Apps Script
      const params = new URLSearchParams();
      
      // Add all form fields to the params
      params.append('name', formData.name);
      params.append('email', formData.email);
      params.append('country', formData.country);
      params.append('companyName', formData.companyName);
      params.append('companyWebsite', formData.companyWebsite);
      params.append('businessNature', formData.businessNature);
      params.append('desiredOutcome', formData.desiredOutcome);
      params.append('budgetRange', formData.budgetRange);
      
      // Send data to Google Sheets
      const response = await fetch(scriptURL, {
        method: 'POST',
        body: params,
        mode: 'no-cors' // This is important for CORS issues
      });
      
      // Process successful submission
      setSubmitStatus('success');
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        country: '',
        companyName: '',
        companyWebsite: '',
        businessNature: '',
        desiredOutcome: '',
        budgetRange: ''
      });
      
      // Close the form after a delay
      setTimeout(() => {
        onClose();
      }, 2000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };
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
            <h2 className="text-3xl font-bold mb-6">Please provide us with some details</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid no-scrollbar grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name*</label>
                  <input 
                    type="text" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    placeholder="Your name" 
                    className="w-full p-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-blue-500" 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
                  <input 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    placeholder="Your email" 
                    className="w-full p-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-blue-500" 
                    required 
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country*</label>
                  <CountrySelect
                    value={formData.country}
                    onChange={(value) => setFormData(prev => ({ ...prev, country: value }))}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company Name*</label>
                  <input 
                    type="text" 
                    name="companyName" 
                    value={formData.companyName} 
                    onChange={handleChange} 
                    placeholder="Your company name" 
                    className="w-full p-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-blue-500" 
                    required
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Company website or Google URL</label>
                <input 
                  type="text" 
                  name="companyWebsite" 
                  value={formData.companyWebsite} 
                  onChange={handleChange} 
                  placeholder="https://" 
                  className="w-full p-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-blue-500" 
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">What is the nature of your business?</label>
                <textarea 
                  name="businessNature" 
                  value={formData.businessNature} 
                  onChange={handleChange} 
                  placeholder="Please describe your business" 
                  rows={3} 
                  className="w-full p-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-blue-500"
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">What&apos;s the main outcome you&apos;re hoping to achieve by working with us or the AI solution you want us to develop?</label>
                <textarea 
                  name="desiredOutcome" 
                  value={formData.desiredOutcome} 
                  onChange={handleChange} 
                  placeholder="Please describe your goals" 
                  rows={4} 
                  className="w-full p-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-blue-500"
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Is there a budget range you&apos;re considering for this project?</label>
                <select 
                  name="budgetRange" 
                  value={formData.budgetRange} 
                  onChange={handleChange} 
                  className="w-full p-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select budget range</option>
                  <option value="Under $500">Under $500</option>
                  <option value="$500 - $1,000">$500 - $1,000</option>
                  <option value="$1,000 - $3,000">$1,000 - $3,000</option>
                  <option value="More than $3,000">More than $3,000</option>
                </select>
              </div>
              <div className="text-center mt-6">
                {submitStatus !== 'success' ? (
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="bg-white text-black px-8 py-3 rounded-full font-semibold border border-gray-300 hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending...' : 'Submit'}
                  </button>
                ) : (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, type: 'spring' }}
                    className="flex flex-col items-center justify-center"
                  >
                    <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-8 py-3 rounded-full font-semibold flex items-center space-x-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Message Sent!</span>
                    </div>
                    <p className="text-green-600 mt-2">Your inquiry has been sent successfully!</p>
                  </motion.div>
                )}
                
                {submitStatus === 'error' && (
                  <p className="text-red-600 mt-2">There was an error sending your inquiry. Please try again.</p>
                )}
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactForm;