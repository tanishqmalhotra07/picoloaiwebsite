'use client';

import React from 'react';
import Image from 'next/image';
import Aurora from './Aurora';

const EndSection = () => {
  return (
    <footer style={{ contentVisibility: 'auto', containIntrinsicSize: '50vh', willChange: 'transform, opacity' }} className="relative bg-[#02010C] text-white pt-16 pb-20 sm:pb-10 overflow-hidden">
      <div className="absolute inset-0 z-0 h-full w-full">
        <Aurora colorStops={["#8716EE", "#FF0033", "#F633EF"]} blend={0.3} amplitude={1.0} speed={0.5} />
      </div>
      <div className="relative z-10 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">

          {/* Left Column */}
          <div className="flex flex-col justify-between space-y-4 sm:space-y-6 md:space-y-8">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="flex">
                <img src="/footer.png" alt="Footer" className="h-90" />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col justify-between space-y-4 sm:space-y-6 md:space-y-8">
            <div>
              <h3 className="text-xl sm:text-2xl text-center font-semibold">Quick Links</h3>
              <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-around text-base sm:text-lg mt-4 sm:mt-6 gap-y-3">
                <a href="#" className="hover:text-purple-400 transition-colors">Home</a>
                <a href="#about" className="hover:text-purple-400 transition-colors">AI Transformation</a>
                <a href="#solutions" className="hover:text-purple-400 transition-colors">AI Agents</a>
                <a href="#services" className="hover:text-purple-400 transition-colors">ROI Estimator</a>
                <a href="#contact" className="hover:text-purple-400 transition-colors">Contact</a>
              </div>
            </div>
            <hr className="border-gray-700" />
            <div className="flex flex-col sm:flex-col justify-around items-center mt-2 space-y-4 sm:space-y-0">
              <h3 className="text-xl sm:text-2xl font-semibold">Contact Us</h3>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 sm:w-8 sm:h-8 relative">
                  <Image src="/Circled Envelope.png" alt="Email" fill sizes="(max-width: 640px) 24px, 32px" className="object-contain" />
                </div>
                <a href="mailto:picolo.ai.team@gmail.com" className="hover:text-purple-400 transition-colors text-xs sm:text-sm md:text-base">picolo.ai.team@gmail.com</a>
              </div>
            </div>
            <hr className="border-gray-700 " />
            <div className="flex flex-col sm:flex-row flex-wrap sm:text-center justify-around text-xs sm:text-sm text-gray-400 gap-2 sm:gap-0">
              <p className="text-sm text-center text-gray-400">&copy; Copyright 2025. All Rights Reserved</p>
              <a href="#" className="hover:text-white transition-colors">Powered By Picolo AI</a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default EndSection;

