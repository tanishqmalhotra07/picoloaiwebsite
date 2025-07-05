'use client';

import React, { useRef } from 'react';
import { useContactForm } from '@/context/ContactFormContext';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { openForm } = useContactForm();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <>
      <motion.section
        ref={ref}
        id="contact"
        className="bg-[#02010C] text-white py-10 lg:mb-10"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-4 sm:px-6">
          <motion.div className="text-left" variants={itemVariants}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">Ready to Power Up with AI?</h2>
            <p className="text-base sm:text-lg mb-6 sm:mb-8">We&apos;d love to talk about how we can work together.</p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-8 mb-6 space-y-4 sm:space-y-0">
              <a href="mailto:picolo.ai.team@gmail.com" className="flex items-center">
                <Image src="/Circled Envelope.png" alt="Email" width={40} height={32} className="mr-3" />
                <span className="text-sm sm:text-base">picolo.ai.team@gmail.com</span>
              </a>
              <div className="flex items-center">
                <Image src="/Add Phone.png" alt="Phone" width={32} height={20} className="mr-3" />
                <span className="text-sm sm:text-base">+91-9999999999</span>
              </div>
            </div>
            <hr className="border-gray-600 my-6" />
            <div className="flex justify-between items-center my-6 max-w-md">
              <a href="#"><Image src="/Instagram.png" alt="Instagram" width={36} height={42} className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" /></a>
              <a href="#"><Image src="/WhatsApp.png" alt="WhatsApp" width={36} height={42} className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" /></a>
              <a href="#"><Image src="/LinkedIn.png" alt="LinkedIn" width={36} height={42} className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" /></a>
              <a href="#"><Image src="/Facebook.png" alt="Facebook" width={36} height={42} className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" /></a>
              <a href="#"><Image src="/X.png" alt="X" width={36} height={42} className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" /></a>
            </div>
            <hr className="border-gray-600 my-6" />
            <p className="text-sm sm:text-base md:text-lg">Fill out the form to chat with a <a href="#" className="text-blue-400">Picolo team</a> member about business needs and get your questions answered.</p>
          </motion.div>
          <motion.div className="flex justify-center md:justify-end items-center md:pr-8 mt-8 md:mt-0" variants={itemVariants}>
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-br from-[#8716EE] to-[#FF0033] rounded-full blur-lg"></div>
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full p-0.5 bg-gradient-to-br from-[#8716EE] to-[#FF0033] transition-transform duration-300 ease-in-out group-hover:scale-95">
                <div className="w-full h-full bg-[#10001D] rounded-full flex flex-col justify-center items-center text-center p-4 sm:p-6 md:p-8">
                  <Image src="/Contact.png" alt="Contact Icon" width={60} height={60} className="mb-3 sm:mb-4 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20" />
                  <p className="text-sm sm:text-base md:text-lg mb-4 sm:mb-6">Got something to share? Hover here and let&apos;s chat</p>
                  <button 
                    onClick={openForm} 
                    className="bg-gray-300 text-black px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold text-sm sm:text-base"
                  >
                    Drop us a line!
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        <hr className="border-gray-700 mt-8" />
      </motion.section>

      
    </>
  );
};

export default Contact;
