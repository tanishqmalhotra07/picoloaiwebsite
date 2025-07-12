'use client'; // <--- Keep this at the very top

import { Inter } from 'next/font/google';
import StyledComponentsRegistry from '@/lib/registry';
import SmoothScrolling from '@/components/SmoothScrolling';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ContactFormProvider } from '@/context/ContactFormContext';
import './globals.css';
import React, { useEffect } from 'react'; // Keep this import

const inter = Inter({ subsets: ['latin'] });

// --- REMOVE THE 'export const metadata' BLOCK FROM HERE ---
// export const metadata: Metadata = {
//   title: 'Picolo AI',
//   description: 'Supercharge Your Workflow with AI Precision.',
// };
// --- END REMOVAL ---


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Keep your ping logic here
  const CHATBOT_API_URL_FULL = process.env.NEXT_PUBLIC_CHATBOT_API_URL;
  const CHATBOT_BASE_URL = CHATBOT_API_URL_FULL
                            ? CHATBOT_API_URL_FULL.replace('/chat', '')
                            : undefined;

  useEffect(() => {
    const pingBackend = async () => {
      if (CHATBOT_BASE_URL) {
        try {
          console.log('Pinging chatbot backend to prevent cold start:', CHATBOT_BASE_URL);
          // Add a timeout to the fetch to prevent long-hanging requests
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 5000);
          
          const response = await fetch(CHATBOT_BASE_URL, {
            signal: controller.signal,
            // Add mode: 'no-cors' to prevent CORS issues during development
            mode: 'no-cors'
          });
          
          clearTimeout(timeoutId);
          console.log('Chatbot backend ping completed.');
        } catch (error) {
          // Ignore AbortError and other fetch errors
          console.warn('Chatbot backend ping failed, continuing anyway:', error);
        }
      } else {
        console.warn('NEXT_PUBLIC_CHATBOT_API_URL not set, skipping backend ping on page load.');
      }
    };
    
    // Execute ping but don't block rendering
    pingBackend();
  }, []);


  return (
    <html lang="en" className="bg-black">
      <head>
        <title>Picolo AI</title>
        <meta name="description" content="Supercharge Your Workflow with AI Precision." />
        <meta httpEquiv="Content-Language" content="en" />
      </head>
      <body className={`${inter.className} bg-black text-white antialiased`}>
        <StyledComponentsRegistry>
          <ContactFormProvider>
            <Header />
            <SmoothScrolling>{children}</SmoothScrolling>
            <Footer />
          </ContactFormProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}