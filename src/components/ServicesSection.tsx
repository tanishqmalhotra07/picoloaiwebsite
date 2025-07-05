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
  const cardClasses = `
    relative border rounded-2xl p-6 sm:p-8 text-center 
    flex flex-col items-center justify-start gap-3 sm:gap-4 transition-all duration-500 overflow-hidden h-full pt-10
    ${isExclusive 
      ? 'border-purple-500 shadow-2xl shadow-purple-500/40 transform scale-105'
      : isRecommended 
      ? 'border-purple-500 shadow-lg shadow-purple-500/20' 
      : 'border-gray-700 hover:scale-105 hover:shadow-lg hover:shadow-white/10'}
  `;

  const backgroundGradient = isExclusive
    ? 'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.15), transparent 70%)'
    : 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.05), transparent 70%)';

  const cardStyle: React.CSSProperties = {
    background: backgroundGradient,
    willChange: 'transform, opacity',
  };

  return (
    <div className={cardClasses} style={cardStyle}>
      {isRecommended && (
        <div className="absolute top-0 -translate-y-1/2 w-full flex justify-center">
          <div className="bg-purple-600 text-white text-xs font-bold px-4 py-2 mt-10 rounded-full uppercase tracking-wider">
            Recommended
          </div>
        </div>
      )}
      <div>
        <div className="h-24 flex items-center justify-center mb-2">
          {isExclusive ? (
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white blur-[10.1px]">{value}</h3>
          ) : (
            <ShinyText text={value} className="text-3xl sm:text-4xl md:text-5xl font-bold" />
          )}
        </div>
        <p className={`text-xl sm:text-2xl font-bold ${isExclusive ? 'text-purple-400' : 'text-white'}`}>{title}</p>
      </div>
      <div className="text-gray-400 leading-relaxed mt-4 flex-grow w-full">
        {Array.isArray(description) ? (
          <ul className="text-left list-disc list-inside space-y-1 text-sm sm:text-base">
            {description.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        ) : (
          <p className="text-sm sm:text-base">{description}</p>
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
  );
};

interface SliderProps {
  label: string;
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
          {prefix}{value}
        </div>
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="w-full h-1.5 rounded-lg outline-none slider-thumb slider-track"
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

interface ResultsState {
  standard: string;
  pro: string;
  exclusive: string;
}

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
    const proRetailMultiplier = 0.07365; // 7.365%
    const proProfessionalMultiplier = 0.07576; // 7.576%
    
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
    <section style={{ contentVisibility: 'auto', containIntrinsicSize: '100vh', willChange: 'transform, opacity' }} className="w-full min-h-screen flex flex-col justify-center items-center text-white p-4 sm:p-8 pt-20 sm:pt-32 bg-[#02010C]">
      <div className="w-full max-w-8xl flex flex-col items-center gap-6 text-center">
        
        <div className="mb-3 sm:mb-4 px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">We don&apos;t just deliver technology.</h2>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500">We deliver tangible business outcomes.</h2>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-5 mb-5 px-4 relative z-10">
          <button
            className={`px-4 sm:px-6 py-2 text-sm sm:text-base rounded-full border transition-all duration-300 ${activeTab === 'retail' ? 'bg-purple-600 border-purple-600 shadow-lg shadow-purple-600/30' : 'border-gray-600'}`}
            onClick={() => setActiveTab('retail')}
          >
            Retail or E-commerce
          </button>
          <button
            className={`px-4 sm:px-6 py-2 text-sm sm:text-base rounded-full border transition-all duration-300 ${activeTab === 'professional' ? 'bg-purple-600 border-purple-600 shadow-lg shadow-purple-600/30' : 'border-gray-600'}`}
            onClick={() => setActiveTab('professional')}
          >
            Professional Services and Specialized Products
          </button>
        </div>

        <div className="w-full max-w-6xl mx-auto -mb- p-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl">
          <div className="bg-[#02010C] rounded-2xl p-6 sm:p-8 flex flex-col gap-6">
            <div>
              <Slider label="Customer Interactions per month" value={customers} min={1000} max={100000} onChange={setCustomers} />
              <p className="text-sm text-gray-500 mt-2 text-left w-full sm:w-2/3 sm:ml-auto px-1 sm:px-0">
                  Monthly leads/interactions your business gets on all digital platforms (your website, insta, etc.)
              </p>
            </div>
            <Slider label="Average Order Value Per Customer" value={orderValue} min={10} max={2000} onChange={setOrderValue} prefix={currency} />
          </div>
        </div>

        {/* Calculate button removed */}
      </div>

      <div ref={resultsRef} className="w-full max-w-5xl mx-auto mt-10 sm:mt-16">
        <AnimatePresence>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-0"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
            >
              <motion.div variants={itemVariants} style={{ willChange: 'transform, opacity' }}>
                <ResultCard
                  title="Standard Package"
                  value={results.standard}
                  description={[
                    "20% Lead Capture",
                    "20% Conversion Rate",
                    "7% Repurchase Rate",
                    "5% Increase in AOV"
                  ]}
                />
              </motion.div>
              <motion.div variants={itemVariants} style={{ willChange: 'transform, opacity' }}>
                <ResultCard
                  title="Pro Package"
                  value={results.pro}
                  description={[
                    "45% Lead Capture",
                    "35% Conversion Rate",
                    "7% Repurchase Rate",
                    "10% Increase in AOV"
                  ]}
                  isRecommended
                />
              </motion.div>
              <motion.div variants={itemVariants} style={{ willChange: 'transform, opacity' }}>
                <ResultCard
                  title="Exclusive Package"
                  value={results.exclusive}
                  description="We provide customized and personalized AI solutions tailored for your unique business needs."
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
