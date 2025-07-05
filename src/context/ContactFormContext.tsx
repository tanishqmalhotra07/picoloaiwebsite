'use client';

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import ContactForm from '@/components/ContactForm';
import { LenisContext } from '@/context/LenisContext';

interface ContactFormContextType {
  isFormOpen: boolean;
  openForm: () => void;
  closeForm: () => void;
}

const ContactFormContext = createContext<ContactFormContextType | undefined>(undefined);

export const useContactForm = () => {
  const context = useContext(ContactFormContext);
  if (!context) {
    throw new Error('useContactForm must be used within a ContactFormProvider');
  }
  return context;
};

export const ContactFormProvider = ({ children }: { children: ReactNode }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const lenis = useContext(LenisContext);
  const pathname = usePathname();

  useEffect(() => {
    if (isFormOpen) {
      lenis?.stop();
    } else {
      lenis?.start();
    }

    return () => {
      lenis?.start();
    };
  }, [isFormOpen, lenis]);

  // Close form on route change
  useEffect(() => {
    closeForm();
  }, [pathname]);

  const openForm = () => setIsFormOpen(true);
  const closeForm = () => setIsFormOpen(false);

  return (
    <ContactFormContext.Provider value={{ isFormOpen, openForm, closeForm }}>
      {children}
      <ContactForm isOpen={isFormOpen} onClose={closeForm} />
    </ContactFormContext.Provider>
  );
};
