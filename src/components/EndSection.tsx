'use client';

import React from 'react';
import Image from 'next/image';
import Aurora from './Aurora';

const EndSection = () => {
  return (
    <footer style={{ contentVisibility: 'auto', containIntrinsicSize: '50vh', willChange: 'transform, opacity' }} className="relative bg-[#02010C] text-white pt-16 pb-10 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Aurora colorStops={["#8716EE", "#FF0033", "#F633EF"]} blend={0.3} amplitude={1.0} speed={0.5} />
      </div>
      <div className="relative z-10 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">

          {/* Left Column */}
          <div className="flex flex-col space-y-4 sm:space-y-6 md:space-y-8">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <Image src="/logo.png" alt="Picolo AI Logo" width={80} height={80} className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20" />
              <span className="text-2xl sm:text-3xl md:text-4xl font-bold">Picolo AI</span>
            </div>
            <hr className="border-gray-700 -mt-5" />
            <div>
              <div className="flex justify-between items-center text-base sm:text-lg">
                <a href="#contact" className="hover:text-purple-400 transition-colors">Let&apos;s talk &rarr;</a>
                <a href="#about" className="hover:text-purple-400 transition-colors">Know More &rarr;</a>
              </div>
              <div className="flex w-full justify-center space-x-6 sm:space-x-8 md:space-x-10 mt-5">
                <a href="#"><Image src="/Instagram.png" alt="Instagram" width={40} height={40} className="w-8 h-8 sm:w-10 sm:h-10 md:w-10 md:h-10" /></a>
                <a href="#"><Image src="/WhatsApp.png" alt="WhatsApp" width={40} height={40} className="w-8 h-8 sm:w-10 sm:h-10 md:w-10 md:h-10" /></a>
                <a href="#"><Image src="/LinkedIn.png" alt="LinkedIn" width={40} height={40} className="w-8 h-8 sm:w-10 sm:h-10 md:w-10 md:h-10" /></a>
                <a href="#"><Image src="/Facebook.png" alt="Facebook" width={40} height={40} className="w-8 h-8 sm:w-10 sm:h-10 md:w-10 md:h-10" /></a>
                <a href="#"><Image src="/X.png" alt="X" width={40} height={40} className="w-8 h-8 sm:w-10 sm:h-10 md:w-10 md:h-10" /></a>
              </div>
            </div>
            <hr className="border-gray-700 -mt-3" />
            <p className="text-sm text-gray-400">&copy; Copyright 2025. All Rights Reserved</p>
          </div>

          {/* Right Column */}
          <div className="flex flex-col space-y-4 sm:space-y-6 md:space-y-8">
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold">Quick Links</h3>
              <div className="flex flex-wrap justify-around text-base sm:text-lg mt-4 sm:mt-6">
                <a href="#" className="hover:text-purple-400 transition-colors">Home</a>
                <a href="#about" className="hover:text-purple-400 transition-colors">About</a>
                <a href="#services" className="hover:text-purple-400 transition-colors">Services</a>
                <a href="#contact" className="hover:text-purple-400 transition-colors">Contact</a>
              </div>
            </div>
            <hr className="border-gray-700 -mt-4.5" />
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold">Contact Us</h3>
              <div className="flex flex-col sm:flex-row flex-wrap justify-around text-sm sm:text-base md:text-lg mt-4 sm:mt-6 gap-4 sm:gap-0">
                <div className="flex items-center space-x-2">
                  <Image src="/Circled Envelope.png" alt="Email" width={40} height={40} className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
                  <a href="mailto:picolo.ai.team@gmail.com" className="hover:text-purple-400 transition-colors text-xs sm:text-sm md:text-base">picolo.ai.team@gmail.com</a>
                </div>
                <div className="flex items-center space-x-2">
                  <Image src="/Add Phone.png" alt="Phone" width={30} height={30} className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8" />
                  <span className="text-xs sm:text-sm md:text-base">+91-9999999999</span>
                </div>
              </div>
            </div>
            <hr className="border-gray-700" />
            <div className="flex flex-col sm:flex-row flex-wrap justify-around text-xs sm:text-sm text-gray-400 gap-2 sm:gap-0">
              <a href="#" className="hover:text-white transition-colors">Powered By Picolo AI</a>
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms & Services</a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default EndSection;

