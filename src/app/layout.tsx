'use client'; // <--- Keep this at the very top

import { Inter } from 'next/font/google';
import StyledComponentsRegistry from '@/lib/registry';
import SmoothScrolling from '@/components/SmoothScrolling';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ContactFormProvider } from '@/context/ContactFormContext';
import './globals.css';
import React, { useEffect } from 'react'; // Keep this import
import Chatbot from "@/components/Chatbot"; // <--- ADDED THIS IMPORT
import PulsatingButton from "@/components/PulsatingButton"; // <--- ADDED THIS IMPORT

const inter = Inter({ subsets: ['latin'] });

// --- REMOVE THE 'export const metadata' BLOCK FROM HERE ---
// export const metadata: Metadata = {
//    title: 'Picolo AI',
//    description: 'Supercharge Your Workflow with AI Precision.',
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
          // Removed console.logs for API URL visibility
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 15000); // Increased timeout to 15 seconds
          
          await fetch(CHATBOT_BASE_URL, {
            signal: controller.signal,
            // Add mode: 'no-cors' to prevent CORS issues during development
            mode: 'no-cors'
          });
          
          clearTimeout(timeoutId);
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
  }, [CHATBOT_BASE_URL]); // Added CHATBOT_BASE_URL to dependency array


  return (
    <html lang="en" className="bg-black">
      <head>
        {/* Main Title Tag for Google Search Results */}
        <title>Picolo AI | The AI Transformation Partner for Your Business</title> {/* Corrected typo */}
        
        {/* Meta Description for Google Search Snippets */}
        <meta name="description" content="We help simplify the power of AI for your business and build a team of customized AI Agents that help you - Scale, Save & Succeed!" />
        
        {/* Keywords and other standard meta tags */}
        <meta name="keywords" content="AI agents, WhatsApp automation, business AI, lead generation, customer service AI, sales automation, AI chatbot, AI assistant, business growth, revenue increase" />
        <meta httpEquiv="Content-Language" content="en" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* Open Graph Tags for Social Media Sharing */}
        <meta property="og:title" content="Picolo AI | The AI Transformation Partner for Your Business" /> {/* Corrected typo */}
        <meta property="og:description" content="We help simplify the power of AI for your business and build a team of customized AI Agents that help you - Scale, Save & Succeed!" />
        <meta property="og:image" content="https://www.picoloai.com/og-image-large-square.png" /> {/* Updated image path */}
        <meta property="og:url" content="https://www.picoloai.com" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Picolo AI" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Picolo AI | The AI Transformation Partner for Your Business" /> {/* Corrected typo */}
        <meta name="twitter:description" content="We help simplify the power of AI for your business and build a team of customized AI Agents that help you - Scale, Save & Succeed!" />
        <meta name="twitter:image" content="https://www.picoloai.com/og-image-large-square.png" /> {/* Updated image path */}
        
        {/* Robots and Googlebot directives */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        
        {/* Canonical Link */}
        <link rel="canonical" href="https://www.picoloai.com" />
        
        {/* Favicon and Apple Touch Icon */}
        <link rel="icon" href="/ChatbotLogo.png" type="image/png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#8B5CF6" />

        {/* JSON-LD Structured Data for Organization and WebSite */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
          // Organization Schema
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Picolo AI",
            "url": "https://www.picoloai.com",
            "logo": "https://www.picoloai.com/og-image-large-square.png", // Updated image path
            "description": "Picolo AI creates custom AI agents that handle customer interactions 24/7, qualify leads, and boost sales across WhatsApp, website, and Instagram.",
            "sameAs": [
              "https://www.linkedin.com/company/picolo-ai",
              "https://www.instagram.com/picolo.ai"
            ],
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "customer service",
              "email": "picolo.ai.team@gmail.com"
            }
          }, // <--- THIS COMMA IS CRUCIAL FOR JSON SYNTAX
          // WebSite Schema
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Picolo AI",
            "alternateName": ["PicoloAI", "Picolo"],
            "url": "https://www.picoloai.com"
          }
        ]) }} />
      </head>
      <body className={`${inter.className} bg-black text-white antialiased`}>
        <StyledComponentsRegistry>
          <ContactFormProvider>
            <Header />
            <SmoothScrolling>{children}</SmoothScrolling>
            <Footer />
            {/* <--- ADDED THESE TWO LINES HERE FOR CHATBOT FUNCTIONALITY --- */}
            <Chatbot isOpen={false} onClose={() => {}} />
            <PulsatingButton />
            {/* <--- END ADDITION --- */}
          </ContactFormProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
