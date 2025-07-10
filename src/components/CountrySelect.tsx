'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface CountrySelectProps {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

interface Country {
  name: string;
  code: string;
  flag: string;
}

const countries: Country[] = [
  { name: 'Afghanistan', code: 'AF', flag: 'https://flagcdn.com/w20/af.png' },
  { name: 'Albania', code: 'AL', flag: 'https://flagcdn.com/w20/al.png' },
  { name: 'Algeria', code: 'DZ', flag: 'https://flagcdn.com/w20/dz.png' },
  { name: 'Andorra', code: 'AD', flag: 'https://flagcdn.com/w20/ad.png' },
  { name: 'Angola', code: 'AO', flag: 'https://flagcdn.com/w20/ao.png' },
  { name: 'Argentina', code: 'AR', flag: 'https://flagcdn.com/w20/ar.png' },
  { name: 'Armenia', code: 'AM', flag: 'https://flagcdn.com/w20/am.png' },
  { name: 'Australia', code: 'AU', flag: 'https://flagcdn.com/w20/au.png' },
  { name: 'Austria', code: 'AT', flag: 'https://flagcdn.com/w20/at.png' },
  { name: 'Azerbaijan', code: 'AZ', flag: 'https://flagcdn.com/w20/az.png' },
  { name: 'Bahamas', code: 'BS', flag: 'https://flagcdn.com/w20/bs.png' },
  { name: 'Bahrain', code: 'BH', flag: 'https://flagcdn.com/w20/bh.png' },
  { name: 'Bangladesh', code: 'BD', flag: 'https://flagcdn.com/w20/bd.png' },
  { name: 'Barbados', code: 'BB', flag: 'https://flagcdn.com/w20/bb.png' },
  { name: 'Belarus', code: 'BY', flag: 'https://flagcdn.com/w20/by.png' },
  { name: 'Belgium', code: 'BE', flag: 'https://flagcdn.com/w20/be.png' },
  { name: 'Belize', code: 'BZ', flag: 'https://flagcdn.com/w20/bz.png' },
  { name: 'Brazil', code: 'BR', flag: 'https://flagcdn.com/w20/br.png' },
  { name: 'Bulgaria', code: 'BG', flag: 'https://flagcdn.com/w20/bg.png' },
  { name: 'Canada', code: 'CA', flag: 'https://flagcdn.com/w20/ca.png' },
  { name: 'Chile', code: 'CL', flag: 'https://flagcdn.com/w20/cl.png' },
  { name: 'China', code: 'CN', flag: 'https://flagcdn.com/w20/cn.png' },
  { name: 'Colombia', code: 'CO', flag: 'https://flagcdn.com/w20/co.png' },
  { name: 'Costa Rica', code: 'CR', flag: 'https://flagcdn.com/w20/cr.png' },
  { name: 'Croatia', code: 'HR', flag: 'https://flagcdn.com/w20/hr.png' },
  { name: 'Cuba', code: 'CU', flag: 'https://flagcdn.com/w20/cu.png' },
  { name: 'Cyprus', code: 'CY', flag: 'https://flagcdn.com/w20/cy.png' },
  { name: 'Czech Republic', code: 'CZ', flag: 'https://flagcdn.com/w20/cz.png' },
  { name: 'Denmark', code: 'DK', flag: 'https://flagcdn.com/w20/dk.png' },
  { name: 'Egypt', code: 'EG', flag: 'https://flagcdn.com/w20/eg.png' },
  { name: 'Estonia', code: 'EE', flag: 'https://flagcdn.com/w20/ee.png' },
  { name: 'Finland', code: 'FI', flag: 'https://flagcdn.com/w20/fi.png' },
  { name: 'France', code: 'FR', flag: 'https://flagcdn.com/w20/fr.png' },
  { name: 'Germany', code: 'DE', flag: 'https://flagcdn.com/w20/de.png' },
  { name: 'Greece', code: 'GR', flag: 'https://flagcdn.com/w20/gr.png' },
  { name: 'Hungary', code: 'HU', flag: 'https://flagcdn.com/w20/hu.png' },
  { name: 'Iceland', code: 'IS', flag: 'https://flagcdn.com/w20/is.png' },
  { name: 'India', code: 'IN', flag: 'https://flagcdn.com/w20/in.png' },
  { name: 'Indonesia', code: 'ID', flag: 'https://flagcdn.com/w20/id.png' },
  { name: 'Iran', code: 'IR', flag: 'https://flagcdn.com/w20/ir.png' },
  { name: 'Iraq', code: 'IQ', flag: 'https://flagcdn.com/w20/iq.png' },
  { name: 'Ireland', code: 'IE', flag: 'https://flagcdn.com/w20/ie.png' },
  { name: 'Israel', code: 'IL', flag: 'https://flagcdn.com/w20/il.png' },
  { name: 'Italy', code: 'IT', flag: 'https://flagcdn.com/w20/it.png' },
  { name: 'Jamaica', code: 'JM', flag: 'https://flagcdn.com/w20/jm.png' },
  { name: 'Japan', code: 'JP', flag: 'https://flagcdn.com/w20/jp.png' },
  { name: 'Jordan', code: 'JO', flag: 'https://flagcdn.com/w20/jo.png' },
  { name: 'Kazakhstan', code: 'KZ', flag: 'https://flagcdn.com/w20/kz.png' },
  { name: 'Kenya', code: 'KE', flag: 'https://flagcdn.com/w20/ke.png' },
  { name: 'Kuwait', code: 'KW', flag: 'https://flagcdn.com/w20/kw.png' },
  { name: 'Latvia', code: 'LV', flag: 'https://flagcdn.com/w20/lv.png' },
  { name: 'Lebanon', code: 'LB', flag: 'https://flagcdn.com/w20/lb.png' },
  { name: 'Libya', code: 'LY', flag: 'https://flagcdn.com/w20/ly.png' },
  { name: 'Lithuania', code: 'LT', flag: 'https://flagcdn.com/w20/lt.png' },
  { name: 'Luxembourg', code: 'LU', flag: 'https://flagcdn.com/w20/lu.png' },
  { name: 'Malaysia', code: 'MY', flag: 'https://flagcdn.com/w20/my.png' },
  { name: 'Maldives', code: 'MV', flag: 'https://flagcdn.com/w20/mv.png' },
  { name: 'Malta', code: 'MT', flag: 'https://flagcdn.com/w20/mt.png' },
  { name: 'Mexico', code: 'MX', flag: 'https://flagcdn.com/w20/mx.png' },
  { name: 'Monaco', code: 'MC', flag: 'https://flagcdn.com/w20/mc.png' },
  { name: 'Mongolia', code: 'MN', flag: 'https://flagcdn.com/w20/mn.png' },
  { name: 'Morocco', code: 'MA', flag: 'https://flagcdn.com/w20/ma.png' },
  { name: 'Nepal', code: 'NP', flag: 'https://flagcdn.com/w20/np.png' },
  { name: 'Netherlands', code: 'NL', flag: 'https://flagcdn.com/w20/nl.png' },
  { name: 'New Zealand', code: 'NZ', flag: 'https://flagcdn.com/w20/nz.png' },
  { name: 'Nigeria', code: 'NG', flag: 'https://flagcdn.com/w20/ng.png' },
  { name: 'Norway', code: 'NO', flag: 'https://flagcdn.com/w20/no.png' },
  { name: 'Pakistan', code: 'PK', flag: 'https://flagcdn.com/w20/pk.png' },
  { name: 'Panama', code: 'PA', flag: 'https://flagcdn.com/w20/pa.png' },
  { name: 'Peru', code: 'PE', flag: 'https://flagcdn.com/w20/pe.png' },
  { name: 'Philippines', code: 'PH', flag: 'https://flagcdn.com/w20/ph.png' },
  { name: 'Poland', code: 'PL', flag: 'https://flagcdn.com/w20/pl.png' },
  { name: 'Portugal', code: 'PT', flag: 'https://flagcdn.com/w20/pt.png' },
  { name: 'Qatar', code: 'QA', flag: 'https://flagcdn.com/w20/qa.png' },
  { name: 'Romania', code: 'RO', flag: 'https://flagcdn.com/w20/ro.png' },
  { name: 'Russia', code: 'RU', flag: 'https://flagcdn.com/w20/ru.png' },
  { name: 'Saudi Arabia', code: 'SA', flag: 'https://flagcdn.com/w20/sa.png' },
  { name: 'Singapore', code: 'SG', flag: 'https://flagcdn.com/w20/sg.png' },
  { name: 'Slovakia', code: 'SK', flag: 'https://flagcdn.com/w20/sk.png' },
  { name: 'Slovenia', code: 'SI', flag: 'https://flagcdn.com/w20/si.png' },
  { name: 'South Africa', code: 'ZA', flag: 'https://flagcdn.com/w20/za.png' },
  { name: 'South Korea', code: 'KR', flag: 'https://flagcdn.com/w20/kr.png' },
  { name: 'Spain', code: 'ES', flag: 'https://flagcdn.com/w20/es.png' },
  { name: 'Sri Lanka', code: 'LK', flag: 'https://flagcdn.com/w20/lk.png' },
  { name: 'Sweden', code: 'SE', flag: 'https://flagcdn.com/w20/se.png' },
  { name: 'Switzerland', code: 'CH', flag: 'https://flagcdn.com/w20/ch.png' },
  { name: 'Taiwan', code: 'TW', flag: 'https://flagcdn.com/w20/tw.png' },
  { name: 'Thailand', code: 'TH', flag: 'https://flagcdn.com/w20/th.png' },
  { name: 'Turkey', code: 'TR', flag: 'https://flagcdn.com/w20/tr.png' },
  { name: 'Ukraine', code: 'UA', flag: 'https://flagcdn.com/w20/ua.png' },
  { name: 'United Arab Emirates', code: 'AE', flag: 'https://flagcdn.com/w20/ae.png' },
  { name: 'United Kingdom', code: 'GB', flag: 'https://flagcdn.com/w20/gb.png' },
  { name: 'United States', code: 'US', flag: 'https://flagcdn.com/w20/us.png' },
  { name: 'Uruguay', code: 'UY', flag: 'https://flagcdn.com/w20/uy.png' },
  { name: 'Venezuela', code: 'VE', flag: 'https://flagcdn.com/w20/ve.png' },
  { name: 'Vietnam', code: 'VN', flag: 'https://flagcdn.com/w20/vn.png' },
];

const CountrySelect: React.FC<CountrySelectProps> = ({ value, onChange, required }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  
  // Find the selected country
  const selectedCountry = countries.find(country => country.name === value);
  
  // Filter countries based on search term
  const filteredCountries = countries.filter(country => 
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [isOpen]);
  
  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div 
        className="w-full p-2 border-b-2 border-gray-300 bg-transparent flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedCountry ? (
          <div className="flex items-center">
            <img 
              src={selectedCountry.flag} 
              alt={`${selectedCountry.name} flag`} 
              className="w-5 h-auto mr-2"
            />
            <span>{selectedCountry.name}</span>
          </div>
        ) : (
          <span className="text-gray-500">Select your country</span>
        )}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className={`h-4 w-4 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      
      {isOpen && (
        <div className="absolute z-50 mt-1 w-full bg-white rounded-md shadow-lg max-h-60 overflow-auto">
          <div className="sticky top-0 bg-white p-2 border-b">
            <input
              ref={searchRef}
              type="text"
              placeholder="Search countries..."
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          
          {filteredCountries.length > 0 ? (
            filteredCountries.map((country) => (
              <div
                key={country.code}
                className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  onChange(country.name);
                  setIsOpen(false);
                  setSearchTerm('');
                }}
              >
                <img 
                  src={country.flag} 
                  alt={`${country.name} flag`} 
                  className="w-5 h-auto mr-2"
                />
                <span>{country.name}</span>
              </div>
            ))
          ) : (
            <div className="p-2 text-center text-gray-500">No countries found</div>
          )}
        </div>
      )}
      
      {/* Hidden select for form submission */}
      <select 
        name="country" 
        value={value} 
        onChange={(e) => onChange(e.target.value)} 
        required={required}
        className="sr-only"
      >
        <option value="">Select your country</option>
        {countries.map((country) => (
          <option key={country.code} value={country.name}>
            {country.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CountrySelect;