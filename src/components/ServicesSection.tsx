'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import ShinyText from './ShinyText';
import { useContactForm } from '@/context/ContactFormContext';
import AnimatedArrow from './AnimatedArrow';
import './testimonials.css';

interface ResultCardProps {
  title: string;
  value: string;
  description: string | string[];
  isExclusive?: boolean;
  isRecommended?: boolean;
  onContact?: () => void;
}

const HighlightedDescription: React.FC<{ text: string[] }> = ({ text }) => {
  return (
    <div className="flex flex-col gap-2 text-left w-full">
      {text.map((line, i) => {
        const match = line.match(/^(\d+%?)/);
        const number = match ? match[1] : '';
        const rest = match ? line.substring(match[0].length).trim() : line;

        return (
          <div key={i} className="flex items-center">
            <span className="font-bold text-purple-400 text-xl w-16 text-right pr-2 flex-shrink-0">{number}</span>
            <span className="text-sm text-gray-300">{rest}</span>
          </div>
        );
      })}
    </div>
  );
};

const ResultCard: React.FC<ResultCardProps> = ({ title, value, description, isExclusive, isRecommended, onContact }) => {
  const wrapperClasses = `
    relative rounded-2xl p-[1.5px]
    bg-gradient-to-br from-purple-500/80 via-pink-500/80 to-indigo-500/80
    transition-all duration-500 h-full
    hover:scale-105 ${isRecommended ? 'gradient-shadow' : ''}
  `;

  const cardClasses = `
    w-full h-full rounded-[14.5px] p-4 sm:p-6 text-center 
    flex flex-col items-center justify-start gap-1
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
        <p className={`text-lg sm:text-xl font-bold pt-2 ${isExclusive ? 'text-purple-400' : 'text-white'}`}>{title}</p>
        
        <div className="h-16 flex items-center justify-center">
          <div className="flex items-center gap-2">
            <AnimatedArrow />
            {isExclusive ? (
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white blur-[10.1px]">{value}</h3>
            ) : (
              <ShinyText text={value} className="text-2xl sm:text-3xl md:text-4xl font-bold" />
            )}
          </div>
        </div>
        <p className="text-xs text-gray-400 -mt-4 mb-2">Potential Increase in Annual Revenue</p>
        
        <div className="text-gray-300 leading-tight flex-grow w-full flex items-center justify-center">
          {isExclusive ? (
            <p className="text-sm sm:text-base">{Array.isArray(description) ? description.join(' ') : description}</p>
          ) : (
            <HighlightedDescription text={Array.isArray(description) ? description : [String(description)]} />
          )}
        </div>
        
        {isExclusive && (
          <button 
            onClick={onContact} 
            className="mt-auto px-5 py-1.5 text-sm font-semibold bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full transition-transform duration-300 hover:scale-105"
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
  isCustomer?: boolean;
}

const Slider: React.FC<SliderProps> = ({ label, value, min, max, onChange, prefix, isCustomer }) => {
  const [inputValue, setInputValue] = React.useState<string>(String(value));

  React.useEffect(() => {
    // Sync input value when slider is dragged
    setInputValue(String(value));
  }, [value]);

  const percentage = ((value - min) / (max - min)) * 100;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentVal = e.target.value;
    setInputValue(currentVal);

    const numValue = Number(currentVal);
    if (currentVal === '' || isNaN(numValue)) {
      return; // Allow empty input temporarily, do nothing
    }

    let clampedValue = numValue;
    if (numValue > max) clampedValue = max;
    if (numValue < min) clampedValue = min;

    if (clampedValue !== value) {
      onChange(clampedValue);
    }
  };

  const handleInputBlur = () => {
    const numValue = Number(inputValue);
    if (isNaN(numValue) || numValue < min) {
      setInputValue(String(min));
      if (value !== min) onChange(min);
    } else if (numValue > max) {
      setInputValue(String(max));
      if (value !== max) onChange(max);
    } else {
      // For valid numbers within range, ensure state is synced
      if (numValue !== value) {
        onChange(numValue);
      }
    }
  };

  return (
    <div className="w-full flex flex-col sm:flex-row items-start sm:items-center gap-4">
      <div className="w-full sm:w-1/3">
        <label className="text-left text-base sm:text-lg">{label}</label>
      </div>
      <div className="w-full sm:w-2/3 flex flex-col sm:flex-row items-center gap-1">
        <div className="w-full sm:w-4/5 relative">
          <div 
            className="absolute bg-purple-600 text-white text-xs rounded-md px-3 py-1.5 -translate-x-1/2 -top-8 pointer-events-none flex items-center gap-1 min-w-[60px] justify-center"
            style={{ left: `${percentage}%` }}
          >
            {isCustomer && <img src="/customer.png" alt="customer icon" className="h-3 w-3" />}
            {prefix}
            {value.toLocaleString()}
          </div>
          <div className="flex items-center">
            <input
              type="range"
              min={min}
              max={max}
              value={value}
              step="1"
              onChange={(e) => onChange(Number(e.target.value))}
              className="w-full h-6 rounded-lg outline-none slider-thumb slider-track cursor-pointer"
              style={{ '--slider-bg': `linear-gradient(to right, #8716EE, #FF0033 ${percentage}%, #333 ${percentage}%)` } as React.CSSProperties}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span className="flex items-center gap-1">
              {isCustomer && <img src="/customer.png" alt="customer icon" className="h-3 w-3" />}
              {prefix}{min.toLocaleString()}
            </span>
            <span className="flex items-center gap-1">
              {isCustomer && <img src="/customer.png" alt="customer icon" className="h-3 w-3" />}
              {prefix}{max.toLocaleString()}
            </span>
          </div>
        </div>
        <div className="w-full sm:w-1/5 relative flex sm:items-center mt-4 sm:mt-0">
          <div className="relative lg:ml-2 lg:mb-6 w-full">
            {isCustomer ? 
              <img src="/customer.png" alt="icon" className="absolute left-3 top-1/2 -translate-y-1/2 h-3 w-3" /> :
              (prefix && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{prefix}</span>)
            }
            <input 
              type="number"
              min={min}
              max={max}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              value={inputValue}
              className="w-full bg-purple-800/10 border border-gray-700 rounded-lg py-1 pl-7 pr-2 text-white text-sm focus:ring-purple-500 focus:border-purple-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />

          </div>
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
    const proRetailMultiplier = 0.02235; // 2.235%
    const proProfessionalMultiplier = 0.02446; // 2.446%
    
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
      <div className="w-full max-w-7xl flex flex-col items-center gap-6 text-center">
        
        <div className="mb-10 z-10000 sm:mb-4 px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium mb-4">We don&apos;t just deliver technology.</h2>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-center pb-5 mb-1 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500">We deliver tangible business outcomes.</h2>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-5 mb-5 px-4 relative z-100000 !important">
          <button
            onClick={() => setActiveTab('retail')}
            className={`w-auto sm:w-auto flex items-center justify-center gap-2 px-4 sm:px-6 py-3 rounded-full transition-all duration-300 font-medium whitespace-nowrap ${
              activeTab === 'retail' 
                ? 'bg-purple-600 text-white border-2 border-purple-600 shadow-lg shadow-purple-500/20'
                : 'bg-transparent text-gray-400 border-2 border-gray-800 hover:bg-gray-800/50'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span className="text-[10px] sm:text-xs lg:text-lg">Retail or E-commerce</span>
          </button>
          <button
            onClick={() => setActiveTab('professional')}
            className={`w-auto sm:w-auto flex items-center justify-center gap-2 px-4 sm:px-6 py-3 rounded-full transition-all duration-300 font-medium whitespace-nowrap ${
              activeTab === 'professional' 
                ? 'bg-purple-600 text-white border-2 border-purple-600 shadow-lg shadow-purple-500/20'
                : 'bg-transparent text-gray-400 border-2 border-gray-800 hover:bg-gray-800/50'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="text-[10px] sm:text-xs lg:text-lg">Professional Services and Specialized Products</span>
          </button>
        </div>

        <div className="w-full max-w-6xl mx-auto ">
          <div className="bg-[#02010C] rounded-2xl p-6 sm:p-8 flex flex-col gap-6">
            <Slider 
              label={
                <div className="flex flex-col items-start">
                  <div className="flex items-center gap-2">
                    <Image src="/customer.png" alt="customer icon" width={16} height={16} className="h-4 w-4" />
                    <span>Customer Interactions per month</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1 pl-7">
                    Monthly leads/interactions your business gets on all<br /> digital platforms(your website, insta, etc.)
                  </p>
                </div>
              } 
              value={customers} 
              min={1000} 
              max={100000} 
              onChange={setCustomers} 
              isCustomer
            />
            <Slider 
              label={
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
      </div>

      <div ref={resultsRef} className="w-full max-w-6xl mx-auto mt-6 sm:mt-10">
        <div className="text-center -mt-5 mb-10">
          <h3 className="text-lg sm:text-medium md:text-xl font-medium text-white">
            Calculate Your Increase in Annual Revenue
          </h3>
        </div>
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
                    "25% Improvement in Lead Capture",
                    "0% Leads Lost",
                    "15% Higher Conversation Rate",
                    "5% Increase in Repurchase Rate",
                    "",
                    "",
                    "",
                    ""
                  ]}
                />
              </motion.div>
              <motion.div variants={itemVariants} style={{ willChange: 'transform, opacity' }}>
                <ResultCard
                  title="Pro Package"
                  value={results.pro}
                  description={[
                    "45% Improvement in Lead Capture",
                    "0% Leads Lost",
                    "30% Higher Conversation Rate",
                    "10% Increase in Repurchase Rate",
                    "5% Higher Average Order Value"
                  ]}
                  isRecommended
                />
              </motion.div>
              <motion.div variants={itemVariants} style={{ willChange: 'transform, opacity' }}>
                <ResultCard
                  title="Exclusive"
                  value={results.exclusive}
                  description="For custom requirements and a personalized plan, feel free to get in touch. We'll tailor a solution that fits your exact needs."
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
