import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import StyledComponentsRegistry from '@/lib/registry';
import SmoothScrolling from '@/components/SmoothScrolling';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ContactFormProvider } from '@/context/ContactFormContext';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Picolo AI',
  description: 'Supercharge Your Workflow with AI Precision.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-black">
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
