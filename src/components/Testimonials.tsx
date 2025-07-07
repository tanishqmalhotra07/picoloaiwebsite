'use client';

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import BackgroundSquares from './BackgroundSquares';
import { Star } from 'lucide-react';
import './testimonials.css';

const testimonials = [
  {
    quote: "It's like hiring a 24/7 sales rep who never forgets to follow up — WhatsApp conversion is up by 60%.",
    name: "Co-founder",
    title: "D2C Beauty Brand",
    stars: 5,
  },
  {
    quote: "From missed leads to closed orders — the AI handles our online inquiries before my team even opens their laptops.",
    name: "CEO",
    title: "Industrial Equipment Distributor",
    stars: 5,
  },
  {
    quote: "Customers message at 11pm and get everything from pricing to appointment links. We've automated our entire client journey.",
    name: "Owner",
    title: "Luxury Salon Chain",
    stars: 5,
  },
  {
    quote: "This isn’t just automation — it’s business growth. We recovered 40+ lost leads in 2 weeks via retargeting.",
    name: "Growth Lead",
    title: "Online Furniture Store",
    stars: 5,
  },
  {
    quote: "Earlier we used to lose our WhatsApp leads after hours. Now the AI captures, qualifies, and syncs to our CRM on autopilot.",
    name: "Head of Sales",
    title: "Auto Dealership Group",
    stars: 5,
  },
  {
    quote: "The AI agent talks like a real team member — it’s booking trials, collecting payments, and even promoting our loyalty program.",
    name: "Founder",
    title: "Premium Makeup Studio",
    stars: 5,
  },
  {
    quote: "We now close leads directly from WhatsApp with instant product catalogs, auto-replies, and payment links — frictionless.",
    name: "Director",
    title: "B2B Fashion Wholesaler",
    stars: 5,
  },
  {
    quote: "Our AI agent responds faster than my entire front desk ever could — bookings doubled in just 3 weeks.",
    name: "Founder",
    title: "Interior Design Studio",
    stars: 5,
  },
  {
    quote: "Our AI assistant handles everything — from guest queries to table bookings to feedback collection. Hospitality just got an upgrade.",
    name: "Operations Head",
    title: "Multi-location Restaurant Group",
    stars: 5,
  }
];


const Testimonials = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ playOnInit: true, delay: 1800, stopOnInteraction: false, stopOnMouseEnter: true })
  ]);

  return (
    <section style={{ contentVisibility: 'auto', containIntrinsicSize: '100vh', willChange: 'transform, opacity' }} className="relative bg-[#02010C] text-white py-20 sm:py-32 overflow-hidden">
      <BackgroundSquares />
      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12">
          <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-semibold tracking-wider text-purple-300 bg-purple-900/30 border border-purple-700 rounded-full">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 sm:mt-4">What our clients say?</h2>
          <p className="text-base sm:text-lg text-gray-400 mt-3 sm:mt-4 max-w-2xl mx-auto px-4">
            Our clients have loved us for a long time. And we love them all!
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((testimonial, index) => (
                                <div className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 p-3 sm:p-6" key={index}>
                                    <div className="h-full bg-gradient-to-br from-[#5909A2] to-[#21033C] rounded-2xl p-5 sm:p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center mb-4">
                        {[...Array(testimonial.stars)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <p className="text-gray-200 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6">{testimonial.quote}</p>
                    </div>
                    <div className="flex items-center">
                      {/* Mock avatar */}
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-purple-900 flex items-center justify-center font-bold text-lg sm:text-xl mr-3 sm:mr-4">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-white text-sm sm:text-base">{testimonial.name}</p>
                        <p className="text-xs sm:text-sm text-purple-300">{testimonial.title}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Testimonials;
