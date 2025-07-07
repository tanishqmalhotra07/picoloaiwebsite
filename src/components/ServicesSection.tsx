'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ShinyText from './ShinyText';
import { useContactForm } from '@/context/ContactFormContext';

interface ResultCardProps {
  title: string;
  value: string;
  description: string | string[];
  isExclusive?: boolean;
  isRecommended?: boolean;
  onContact?: () => void;
}

const ResultCard: React.FC<ResultCardProps> = ({ title, value, description, isExclusive, isRecommended, onContact }) => {
  const wrapperClasses = `
    relative rounded-2xl p-[1.5px]
    bg-gradient-to-br from-purple-500/80 via-pink-500/80 to-indigo-500/80
    transition-all duration-500 h-full
    ${isExclusive ? 'scale-105' : 'hover:scale-105'}
  `;

  const cardClasses = `
    w-full h-full rounded-[14.5px] p-6 sm:p-8 text-center 
    flex flex-col items-center justify-start gap-2
    bg-[#02010C]/90 backdrop-blur-xl
  `;

  return (
    <div className={wrapperClasses} style={{ willChange: 'transform' }}>
      {(isRecommended || isExclusive) && (
        <div className="absolute top-0 -translate-y-1/2 w-full flex justify-center z-10">
          <div className={`text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider ${isRecommended ? 'bg-purple-600' : 'bg-pink-600'}`}>
            {isRecommended ? 'Recommended' : 'Exclusive'}
          </div>
        </div>
      )}
      <div className={cardClasses}>
        <p className={`text-xl sm:text-2xl font-bold pt-4 ${isExclusive ? 'text-purple-400' : 'text-white'}`}>{title}</p>
        
        <div className="h-20 flex items-center justify-center">
          {isExclusive ? (
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white blur-[10.1px]">{value}</h3>
          ) : (
            <ShinyText text={value} className="text-3xl sm:text-4xl md:text-5xl font-bold" />
          )}
        </div>
        <p className="text-sm text-gray-400 -mt-6 mb-3">Potential Increase in Annual Revenue</p>
        
        <div className="text-gray-300 leading-relaxed flex-grow w-full">
          {Array.isArray(description) ? (
            <ul className="text-left list-disc list-inside space-y-1 text-base sm:text-lg">
              {description.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          ) : (
            <p className="text-base sm:text-lg">{description}</p>
          )}
        </div>
        
        {isExclusive && (
          <button 
            onClick={onContact} 
            className="mt-auto px-6 py-2 text-base font-semibold bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full transition-transform duration-300 hover:scale-105"
          >
            Request a Call Back
          </button>
        )}
      </div>
    </div>
  );
};

interface SliderProps {
  label: React.ReactNode;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  prefix?: string;
}

const Slider: React.FC<SliderProps> = ({ label, value, min, max, onChange, prefix = '' }) => {
  const percentage = ((value - min) / (max - min)) * 100;
  return (
    <div className="w-full flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
      <label className="w-full sm:w-1/3 text-left text-base sm:text-lg">{label}</label>
      <div className="w-full sm:w-2/3 relative mt-6 sm:mt-0">
        <div 
          className="absolute -top-10 transform -translate-x-1/2 bg-purple-600 text-white px-3 py-1 rounded text-sm"
          style={{ left: `${percentage}%` }}
        >
          {prefix}{value.toLocaleString()}
        </div>
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          step="1"
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-1.5 rounded-lg outline-none slider-thumb slider-track cursor-pointer"
          style={{ '--slider-bg': `linear-gradient(to right, #8716EE, #FF0033 ${percentage}%, #333 ${percentage}%)` } as React.CSSProperties}
        />
        <div className="flex justify-between text-sm text-gray-400 mt-2">
          <span>{min}</span>
          <span>{max}</span>
        </div>
      </div>
    </div>
  );
};


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3, // Cinematic delay between cards
    },
  },
};

const itemVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: 'easeOut' }, // Slower, gentle animation
  },
};



const ServicesSection = () => {
  const { openForm } = useContactForm();
  const [activeTab, setActiveTab] = useState('retail');
  const [customers, setCustomers] = useState(40000);
  const [orderValue, setOrderValue] = useState(50);
  // Calculate dynamic results based on sliders and active tab
  const calculateResults = () => {
    // Standard Package multipliers
    const standardRetailMultiplier = 0.0126; // 1.26%
    const standardProfessionalMultiplier = 0.01327; // 1.327%
    
    // Pro Package multipliers
    const proRetailMultiplier = 0.25; // 25%
    const proProfessionalMultiplier = 0.25; // 25%
    
    // Calculate Standard Package revenue
    const standardMultiplier = activeTab === 'retail' ? standardRetailMultiplier : standardProfessionalMultiplier;
    const standardRevenue = standardMultiplier * customers * orderValue;
    
    // Calculate Pro Package revenue
    const proMultiplier = activeTab === 'retail' ? proRetailMultiplier : proProfessionalMultiplier;
    const proRevenue = proMultiplier * customers * orderValue;
    
    return {
      standard: `$${(standardRevenue).toLocaleString(undefined, {maximumFractionDigits: 0})}`,
      pro: `$${(proRevenue).toLocaleString(undefined, {maximumFractionDigits: 0})}`,
      exclusive: '$10M+'
    };
  };
  
  // Recalculate on every render based on current slider values
  const results = calculateResults();
  const [currency, setCurrency] = useState('$');
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const locale = navigator.language;
      const formatter = new Intl.NumberFormat(locale, { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 });
      const parts = formatter.formatToParts(0);
      const symbol = parts.find(part => part.type === 'currency')?.value || '$';
      setCurrency(symbol);
    } catch (e) {
      console.error("Could not determine currency, defaulting to $", e);
      setCurrency('$');
    }
  }, []);
  
  // Recalculate results when sliders or tab changes
  useEffect(() => {
    // Results are calculated directly in the render
  }, [customers, orderValue, activeTab]);



  // Results are now shown by default

  return (
    <section id="services" style={{ contentVisibility: 'auto', containIntrinsicSize: '100vh', willChange: 'transform, opacity' }} className="w-full min-h-screen flex flex-col justify-center items-center text-white p-4 sm:p-8 pt-20 sm:pt-32 bg-[#02010C]">
      <div className="w-full max-w-8xl flex flex-col items-center gap-6 text-center">
        
        <div className="mb-3 sm:mb-4 px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">We don&apos;t just deliver technology.</h2>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500">We deliver tangible business outcomes.</h2>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-5 mb-5 px-4 relative z-100000 !important">
          <button
            className={`px-4 sm:px-6 py-2 text-sm sm:text-base rounded-full border transition-all duration-300 flex items-center gap-2 ${activeTab === 'retail' ? 'bg-purple-600 border-purple-600 shadow-lg shadow-purple-600/30' : 'border-gray-600'}`}
            onClick={() => setActiveTab('retail')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Retail or E-commerce
          </button>
          <button
            className={`px-4 sm:px-6 py-2 text-sm sm:text-base rounded-full border transition-all duration-300 flex items-center gap-2 ${activeTab === 'professional' ? 'bg-purple-600 border-purple-600 shadow-lg shadow-purple-600/30' : 'border-gray-600'}`}
            onClick={() => setActiveTab('professional')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Professional Services and Specialized Products
          </button>
        </div>

        <div className="w-full max-w-6xl mx-auto -mb- p-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl">
          <div className="bg-[#02010C] rounded-2xl p-6 sm:p-8 flex flex-col gap-6">
            <div>
              <Slider 
                label={
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Customer Interactions per month
                  </div>
                } 
                value={customers} 
                min={1000} 
                max={100000} 
                onChange={setCustomers} 
              />
              <p className="text-sm text-gray-500 mt-2 text-left w-full sm:w-2/3 sm:ml-auto px-1 sm:px-0">
                  Monthly leads/interactions your business gets on all digital platforms (your website, insta, etc.)
              </p>
            </div>
            <Slider 
              label={
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Average Order Value Per Customer
                </div>
              } 
              value={orderValue} 
              min={10} 
              max={2000} 
              onChange={setOrderValue} 
              prefix={currency} 
            />
          </div>
        </div>

        {/* Calculate button removed */}
      </div>

      <div ref={resultsRef} className="w-full max-w-5xl mx-auto mt-10 sm:mt-16">
        <AnimatePresence>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mt-0"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
            >
              <motion.div variants={itemVariants} style={{ willChange: 'transform, opacity' }}>
                <ResultCard
                  title="Standard"
                  value={results.standard}
                  description={[
                    "Up to 25% improvement in lead capture.",
                    "Significant reduction in missed customer queries.",
                    "15% higher conversation quality.",
                    "5% increase in customer repurchase rate."
                  ]}
                />
              </motion.div>
              <motion.div variants={itemVariants} style={{ willChange: 'transform, opacity' }}>
                <ResultCard
                  title="Pro Package"
                  value={results.pro}
                  description={[
                    "Up to 45% boost in lead capture efficiency.",
                    "Near-zero lead loss with 24/7 availability.",
                    "30% increase in successful sales conversations.",
                    "10% higher customer recapture rate.",
                    "5% uplift in average order value."
                  ]}
                  isRecommended
                />
              </motion.div>
              <motion.div variants={itemVariants} style={{ willChange: 'transform, opacity' }}>
                <ResultCard
                  title="Exclusive"
                  value={results.exclusive}
                  description={[
                    "Fully customized lead funnels for maximum capture.",
                    "Bespoke conversational flows to match your brand voice.",
                    "Advanced analytics and reporting suite.",
                    "Dedicated support and model fine-tuning."
                  ]}
                  isExclusive
                  onContact={openForm}
                />
              </motion.div>
            </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ServicesSection;
