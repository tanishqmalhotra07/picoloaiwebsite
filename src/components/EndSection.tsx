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
          <div className="flex flex-col justify-between space-y-4 sm:space-y-6 md:space-y-8">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="flex items-center">
                <Image src="/logo.png" alt="Picolo AI Logo" width={80} height={80} className="w-12 h-12 sm:w-16 sm:h-16" style={{ aspectRatio: '1/1', objectFit: 'contain' }} />
                <span className="text-2xl sm:text-3xl md:text-4xl font-bold ml-3">Picolo AI</span>
              </div>
            </div>
            <hr className="border-gray-700" />
            <div>
              <div className="flex w-full justify-around items-center text-base sm:text-lg">
                <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 hover:text-purple-400 transition-colors">
                  <span className="font-semibold">Instagram:</span>
                  <Image src="/Instagram.png" alt="Instagram" width={48} height={48} className="w-10 h-10 sm:w-12 sm:h-12" style={{ aspectRatio: '1/1', objectFit: 'contain' }} />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 hover:text-purple-400 transition-colors">
                  <span className="font-semibold">LinkedIn:</span>
                  <Image src="/LinkedIn.png" alt="LinkedIn" width={48} height={48} className="w-10 h-10 sm:w-12 sm:h-12" style={{ aspectRatio: '1/1', objectFit: 'contain' }} />
                </a>
              </div>
            </div>
            <hr className="border-gray-700" />
            <p className="text-sm text-center text-gray-400">&copy; Copyright 2025. All Rights Reserved</p>
          </div>

          {/* Right Column */}
          <div className="flex flex-col justify-between space-y-4 sm:space-y-6 md:space-y-8">
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold">Quick Links</h3>
              <div className="flex flex-wrap justify-around text-base sm:text-lg mt-4 sm:mt-6">
                <a href="#" className="hover:text-purple-400 transition-colors">Home</a>
                <a href="#about" className="hover:text-purple-400 transition-colors">AI Transformation</a>
                <a href="#solutions" className="hover:text-purple-400 transition-colors">AI Agents</a>
                <a href="#services" className="hover:text-purple-400 transition-colors">ROI Estimator</a>
                <a href="#contact" className="hover:text-purple-400 transition-colors">Contact</a>
              </div>
            </div>
            <hr className="border-gray-700 -mt-5" />
            <div className="flex justify-around mt-2">
              <h3 className="text-xl sm:text-2xl font-semibold">Contact Us</h3>
              <div className="flex items-center space-x-2">
                <Image src="/Circled Envelope.png" alt="Email" width={40} height={40} className="w-6 h-6 sm:w-8 sm:h-8" style={{ aspectRatio: '1/1', objectFit: 'contain' }} />
                <a href="mailto:picolo.ai.team@gmail.com" className="hover:text-purple-400 transition-colors text-xs sm:text-sm md:text-base">picolo.ai.team@gmail.com</a>
              </div>
            </div>
            <hr className="border-gray-700 " />
            <div className="flex flex-col sm:flex-row flex-wrap justify-around text-xs sm:text-sm text-gray-400 gap-2 sm:gap-0">
              <a href="#" className="hover:text-white transition-colors">Powered By Picolo AI</a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default EndSection;

