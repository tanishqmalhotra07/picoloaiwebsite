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
          
          await fetch(CHATBOT_BASE_URL, {
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
        <title>Picolo AI | The AI Transfornmation Parntner for Your Business</title>
        <meta name="description" content="We help simplify the power of AI for your business and build a team of customized AI Agents that help you - Scale, Save & Succeed!" />
        <meta name="keywords" content="AI agents, WhatsApp automation, business AI, lead generation, customer service AI, sales automation, AI chatbot, AI assistant, business growth, revenue increase" />
        <meta httpEquiv="Content-Language" content="en" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="Picolo AI | The AI Transfornmation Partner for Your Business" />
        <meta property="og:description" content="We help simplify the power of AI for your business and build a team of customized AI Agents that help you - Scale, Save & Succeed!" />
        <meta property="og:image" content="https://www.picoloai.com/og-image.png" />
        <meta property="og:url" content="https://www.picoloai.com" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Picolo AI" />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Picolo AI | The AI Transfornmation Partner for Your Business" />
        <meta name="twitter:description" content="We help simplify the power of AI for your business and build a team of customized AI Agents that help you - Scale, Save & Succeed!" />
        <meta name="twitter:image" content="https://www.picoloai.com/og-image.png" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <link rel="canonical" href="https://www.picoloai.com" />
        <link rel="icon" href="/ChatbotLogo.png" type="image/png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#8B5CF6" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
           // Organization Schema
		{
		  "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Picolo AI",
          "url": "https://www.picoloai.com",
          "logo": "https://www.picoloai.com/ChatbotLogo.png",
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
		}
// WebSite Schema		
		  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Picolo AI", // <-- This is the explicit site name for Google
    "alternateName": ["PicoloAI", "Picolo"], // Optional: alternative names Google might use
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
          </ContactFormProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}