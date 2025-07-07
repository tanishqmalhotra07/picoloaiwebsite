'use client';

import React, { useState, useEffect, useRef,useCallback } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  MotionValue
} from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import Orb from './Orb';
import CircularText from './CircularText';


import ProfileCard from './ProfileCard';
import './ProfileCard.css';
import './embla.css';

const solutionsData = [
  {
    "name": "AI Sales Experience Advisor",
    "industry": "D2C & Ecommerce",
    "description": "Handles customer queries, assists in product discovery, and reinforces your brand experience — 24/7",
    "image": "AI Sales Experience Advisor"
  },
  {
    "name": "AI Showroom Specialist",
    "industry": "Car & Bike Dealerships",
    "description": "Your digital showroom rep — sharing model details, answering queries, scheduling test drives, and capturing leads",
    "image": "AI Showroom Specialist"
  },
  {
    "name": "AI Frontdesk Facilitator",
    "industry": "Clinics and Spas",
    "description": "Manages bookings, follow-ups, and inquiries across WhatsApp, website, and Instagram — 24/7.",
    "image": "AI Frontdesk Facilitator"
  },
  {
    "name": "Booking Boost Agent",
    "industry": "Interior Design Studios",
    "description": "Qualifies prospects, gathers requirements, and handles back-and-forth — so you close faster",
    "image": "Booking Boost Agent"
  },
  {
    "name": "Guest Guidance Agent",
    "industry": "Hotels, Restaurants & Cafes (HoReCa)",
    "description": "Books tables, rooms, or experiences via WhatsApp — while capturing leads and syncing calendars.",
    "image": "Guest Guidance Agent"
  },
  {
    "name": "Inquiry Intelligence Agent",
    "industry": "Wholesalers & Distributors",
    "description": "Sends pricing, GST, and delivery info instantly — and keeps leads warm with proactive follow-ups.",
    "image": "Inquiry Intelligence Agent"
  },
  {
    "name": "Glamour Growth Partner",
    "industry": "Clinics and Spas",
    "description": "Nurtures leads, shares portfolios, retargets missed clients, and fills your calendar 24/7.",
    "image": "Glamour Growth Partner"
  }
]

const content = [
  {
    title: 'Identify',
    description:
      'We help you to identify high impact AI opportunities and build a step by step AI transformation strategy to bring them to life.',
  },
  {
    title: 'Educate',
    description:
      'We train and support your team with the right tools and know-how to embed AI across your entire organization.',
  },
  {
    title: 'Develop',
    description:
      'We design, build, and scale custom AI solutions that solve your most pressing business needs and create a lasting competitive advantage.',
  },
];



interface NavItemProps {
  scrollYProgress: MotionValue<number>;
  index: number;
  title: string;
}

const NavItem: React.FC<NavItemProps> = ({ scrollYProgress, index, title }) => {
  const sectionDuration = 0.20;
  const sectionOverlap = 0;
  const startTime = 0.2 + index * (sectionDuration - sectionOverlap);
  const endTime = startTime + sectionDuration;
  const midpoint = startTime + sectionDuration / 2;

  const opacity = useTransform(
    scrollYProgress,
    [startTime, midpoint, endTime],
    [0.5, 1, 0.5]
  );

  return (
    <motion.span style={{ opacity }}>
      {title.toUpperCase()}
    </motion.span>
  );
};

interface ContentItem {
  title: string;
  description: string;
}

interface ContentAnimationProps {
  scrollYProgress: MotionValue<number>;
  index: number;
  item: ContentItem;
}

const ContentAnimation: React.FC<ContentAnimationProps> = ({ scrollYProgress, index, item }) => {
  const sectionDuration = 0.20;
  const sectionOverlap = 0;

  const startTime = 0.2 + index * (sectionDuration - sectionOverlap);
  const endTime = startTime + sectionDuration;
  
  // Add pin effect - stay visible for longer
  const pinDuration = 0.10;
  const animInStart = startTime;
  const animInEnd = startTime + sectionDuration * 0.1;
  const animStayStart = animInEnd;
  const animStayEnd = endTime - sectionDuration * 0.1 - pinDuration;
  const animOutStart = animStayEnd + pinDuration;
  const animOutEnd = endTime;

  const opacity = useTransform(
    scrollYProgress,
    [animInStart, animInEnd, animStayStart, animStayEnd, animOutStart, animOutEnd],
    [0, 1, 1, 1, 1, 0]
  );
  const scale = useTransform(
    scrollYProgress,
    [animInStart, animInEnd, animStayStart, animStayEnd, animOutStart, animOutEnd],
    [0.8, 1, 1, 1, 1, 0.8]
  );



  return (
    <motion.div
      style={{
        opacity,
        scale,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
      className="flex flex-col md:flex-row items-center justify-center"
    >


      {/* Desktop layout */}

      <h3 className="hidden md:block text-5xl md:text-6xl font-bold text-white pointer-events-none">{item.title}</h3>
      <p className="hidden md:block absolute top-1/2 -translate-y-1/2 right-16 w-64 text-right text-white text-base pointer-events-none">
        {item.description}
      </p>
      
      {/* Mobile layout */}
      <div className="flex flex-col items-center md:hidden w-full h-full">
        <h3 className="text-4xl sm:text-5xl font-bold text-white pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">{item.title}</h3>
        <p className="text-white text-sm sm:text-base text-center px-4 w-[85%] pointer-events-none absolute bottom-16 left-1/2 -translate-x-1/2">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
};





const OrbSection = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  });

  const [isOrbInteractive, setIsOrbInteractive] = useState(true);
  

  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: false,
    align: 'center',
    dragFree: true
  });
  
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

    useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      // Always keep the orb interactive regardless of scroll position
      setIsOrbInteractive(true);
    });
    return unsubscribe;
  }, [scrollYProgress]);

  // Orb scaling and positioning
  const y = useTransform(scrollYProgress, [0, 0.2], ['-50vh', '0vh']);
  
  // About section animation

  
  // Keep orb visible without expansion or disappearance
  const orbFinalScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 1]
  );
  
  const orbFinalOpacity = useTransform(
    scrollYProgress,
    [0, 0.35, 0.4, 0.6, 0.65, 0.8, 1],
    [1, 1, 0, 0, 0, 0, 0]
  );

  // Orb Squeeze and Stretch animation
  const transitionPoint1 = 0.4; // End of Identify
  const transitionPoint2 = 0.6;  // End of Educate
  const transitionPoint3 = 0.8; // End of Develop
  const pulseDuration = 0.05; // Duration for the portal effect

  const portalScale = useTransform(
    scrollYProgress,
    [
      0,
      0.2, // Start of Identify
      // First transition (out of Identify)
      transitionPoint1 - pulseDuration,
      transitionPoint1,
      transitionPoint1 + pulseDuration,
      // Second transition (out of Educate)
      transitionPoint2 - pulseDuration,
      transitionPoint2,
      transitionPoint2 + pulseDuration,
      // Third transition (out of Develop)
      transitionPoint3 - pulseDuration,
      transitionPoint3,
      transitionPoint3 + pulseDuration,
    ],
    [
      3,    // initial scale
      0.93, // scale at 0.2 (start of Identify)
      // First portal effect
      0.93, // normal during Identify
      0.5,  // close portal
      0.93, // open portal back to normal (start of Educate)
      // Second portal effect
      0.93, // normal during Educate
      0.5,  // close portal
      0.93, // open portal back to normal (start of Develop)
      // Third portal effect
      0.93, // normal during Develop
      0.5,  // close portal
      1,    // open portal back to final size
    ]
  );

  // Combine portal scale with final expansion
  const orbScaleX = useTransform(
    [portalScale, orbFinalScale],
    (latest: number[]) => latest[0] * latest[1]
  );
  const orbScaleY = useTransform(
    [portalScale, orbFinalScale],
    (latest: number[]) => latest[0] * latest[1]
  );

  // Initial text animation - fixed to ensure visibility
  const text1Opacity = useTransform(scrollYProgress, [0, 0.15, 0.2], [1, 1, 0]);
  const text1Y = useTransform(scrollYProgress, [0.1, 0.2], ['0%', '-100%']);
  
  // About section text animation

  // Final elements container opacity
  const navOpacity = useTransform(scrollYProgress, [0.15, 0.2, 0.8, 0.85], [0, 1, 1, 0]);

  const identifySectionOpacity = useTransform(
    scrollYProgress,
    [0.2, 0.25, 0.35, 0.4],
    [0, 1, 1, 0]
  );
  
  // Educate section opacity and animations
  const educateSectionOpacity = useTransform(
    scrollYProgress,
    [0.4, 0.45, 0.55, 0.6],
    [0, 1, 1, 0]
  );
  
  // Sideways animation for the two orbs in educate section
  const leftOrbX = useTransform(
    scrollYProgress,
    [0.4, 0.45],
    [-250, -60]
  );
  
  const rightOrbX = useTransform(
    scrollYProgress,
    [0.4, 0.45],
    [250, 60]
  );
  
  const orbsY = useTransform(
    scrollYProgress,
    [0.4, 0.45],
    [0, 0]
  );
  
  // Develop section opacity and animations
  const developSectionOpacity = useTransform(
    scrollYProgress,
    [0.6, 0.65, 0.75, 0.8],
    [0, 1, 1, 0]
  );
  
  // Animation for the three orbs in develop section - horizontal line with increased spacing
  const developLeftOrbX = useTransform(
    scrollYProgress,
    [0.6, 0.65],
    [-260, -175]
  );
  
  const developMiddleOrbX = useTransform(
    scrollYProgress,
    [0.6, 0.65],
    [0, 0]
  );
  
  const developRightOrbX = useTransform(
    scrollYProgress,
    [0.6, 0.65],
    [240, 200]
  );
  
  const developOrbsY = useTransform(
    scrollYProgress,
    [0.6, 0.65],
    [-30, -30]
  );

  const finalElementsOpacity = useTransform(
    scrollYProgress,
    [0.15, 0.2],
    [0, 1]
  );

  // Solutions animation
  const solutionsOpacity = useTransform(
    scrollYProgress,
    [0.8, 0.85],
    [0, 1]
  );
  const solutionsScale = useTransform(
    scrollYProgress,
    [0.8, 0.85],
    [0.8, 1]
  );

  const solutionsPointerEvents = useTransform(
    scrollYProgress,
    [0.8, 0.801],
    ['none', 'auto']
  );

    return (
    <section
      id="about"
      ref={targetRef}
      className="relative h-[700vh] w-full"
      style={{ background: '#02010C', contain: 'paint layout' }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden gpu-accelerated" style={{ willChange: 'transform', contain: 'paint layout' }}>


        {/* Initial Text */}
        <motion.div
          style={{ opacity: text1Opacity, y: text1Y }}
          className="absolute inset-0 z-50 flex flex-col items-center justify-center text-center text-white pointer-events-none"
        >
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-semibold text-center px-4">
            From idea to impact, Your <span className="text-purple-400 font-semibold">AI<br/>journey </span>
            starts here
          </h2>
        </motion.div>

        {/* Orb - optimized for hover */}
                <motion.div
          style={{
            scaleX: orbScaleX,
            scaleY: orbScaleY,
            y,
            opacity: orbFinalOpacity,
            willChange: 'transform, opacity',
            contain: 'layout paint size',
            zIndex: 10 // Ensure consistent z-index
          }}
          className="absolute inset-0 grid place-items-center scale-90 sm:scale-95 md:scale-100 bg-[#02010C] pointer-events-auto"
          initial={false}
        >
          <div className="w-full h-full pointer-events-auto">
            <Orb 
              interactive={true} 
              hoverIntensity={1.0} 
              rotateOnHover={true} 
              forceHoverState={false}
            />
          </div>
        </motion.div>

        {/* Identify Section Content */}
        <motion.div 
          style={{ 
            opacity: identifySectionOpacity,
            zIndex: 20 // Ensure consistent z-index
          }}
          className="absolute inset-0 flex items-center justify-center pointer-events-auto"
        >
          <div className="absolute left-15 top-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-auto" style={{ zIndex: 50 }}>
            <CircularText
              text="*EMPOWER*INTEGRATE*SCALE"
              imageUrl="/arrow.png"
              spinDuration={15}
              onHover="speedUp"
              className="transition-all duration-300"
            />
          </div>
        </motion.div>
        

        
        {/* Educate Section with two conjoined orbs - performance optimized */}
        <motion.div
          style={{ 
            opacity: educateSectionOpacity,
            pointerEvents: 'none' // Prevent this from blocking hover events when transparent
          }}
          className="absolute inset-0 z-25 flex flex-col items-center justify-center"
          initial={false}
          layoutId="educate-section"
        >
          <div className="relative w-full h-64 flex items-center justify-center">
            {/* Left Orb - simplified for performance */}
            <motion.div 
              className="absolute w-80 h-80"
              style={{ 
                x: leftOrbX,
                y: orbsY,
                scale: 1.8,
                willChange: 'transform',
                contain: 'strict',
                backfaceVisibility: 'hidden'
              }}
              initial={false}
              layoutId="left-orb"
            >
              <Orb 
                interactive={false} 
                hoverIntensity={0.5} 
                rotateOnHover={false}
                forceHoverState={false}
                hue={20} // Blue-purple hue
              />
            </motion.div>
            
            {/* Right Orb - simplified for performance */}
            <motion.div 
              className="absolute w-80 h-80"
              style={{ 
                x: rightOrbX,
                y: orbsY,
                scale: 1.8,
                willChange: 'transform',
                contain: 'strict',
                backfaceVisibility: 'hidden'
              }}
              initial={false}
              layoutId="right-orb"
            >
              <Orb 
                interactive={false} 
                hoverIntensity={0.5} 
                rotateOnHover={false}
                forceHoverState={false}
                hue={0} // Purple-pink hue
              />
            </motion.div>
            
            {/* Educate heading in the intersection of orbs */}
            <div className="absolute z-50">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center">
                EDUCATE
              </h2>
            </div>
            
            {/* Description on the left - styled like Identify section */}
            <div className="absolute left-16 top-1/2 -translate-y-1/2 w-64 text-left z-50">
              <p className="text-white text-base pointer-events-none">
                We train and support your team with the right tools and know-how to embed AI across your entire organization.
              </p>
            </div>
            
            {/* Circular text on the right - styled like Identify section */}
            <div className="absolute right-15 top-1/2 -translate-y-1/2 translate-x-1/2 pointer-events-auto" style={{ zIndex: 50 }}>
              <CircularText
                text="*TRAIN*SUPPORT*EMBED*"
                imageUrl="/arrow.png"
                spinDuration={15}
                onHover="speedUp"
                className="transition-all duration-300"
              />
            </div>
          </div>
        </motion.div>
        
        {/* Develop Section with three conjoined orbs in a horizontal line */}
        <motion.div
          style={{ 
            opacity: developSectionOpacity,
            pointerEvents: 'none' // Prevent this from blocking hover events when transparent
          }}
          className="absolute inset-0 z-25 flex flex-col items-center justify-center"
          initial={false}
          layoutId="develop-section"
        >
          <div className="relative w-full h-64 flex items-center justify-center">
            {/* Left Orb */}
            <motion.div 
              className="absolute w-80 h-80"
              style={{ 
                x: developLeftOrbX,
                y: developOrbsY,
                scale: 1.5,
                willChange: 'transform',
                contain: 'strict',
                backfaceVisibility: 'hidden'
              }}
              initial={false}
              layoutId="develop-left-orb"
            >
              <Orb 
                interactive={false} 
                hoverIntensity={0.5} 
                rotateOnHover={false}
                forceHoverState={false}
                hue={20} // Purple hue
              />
            </motion.div>
            
            {/* Middle Orb */}
            <motion.div 
              className="absolute w-80 h-80"
              style={{ 
                x: developMiddleOrbX,
                y: developOrbsY,
                scale: 1.5,
                willChange: 'transform',
                contain: 'strict',
                backfaceVisibility: 'hidden'
              }}
              initial={false}
              layoutId="develop-middle-orb"
            >
              <Orb 
                interactive={false} 
                hoverIntensity={0.5} 
                rotateOnHover={false}
                forceHoverState={false}
                hue={10} // Teal hue
              />
            </motion.div>
            
            {/* Right Orb */}
            <motion.div 
              className="absolute w-80 h-80"
              style={{ 
                x: developRightOrbX,
                y: developOrbsY,
                scale: 1.5,
                willChange: 'transform',
                contain: 'strict',
                backfaceVisibility: 'hidden'
              }}
              initial={false}
              layoutId="develop-right-orb"
            >
              <Orb 
                interactive={false} 
                hoverIntensity={0.5} 
                rotateOnHover={false}
                forceHoverState={false}
                hue={10} // Yellow hue
              />
            </motion.div>
            
            {/* Develop heading below the orbs */}
            <div className="absolute z-50 bottom-35">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center">
                DEVELOP
              </h2>
            </div>
            
            {/* Circular text on the left */}
            <div className="absolute left-15 top-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-auto" style={{ zIndex: 50 }}>
              <CircularText
                text="*DESIGN*BUILD*SCALE*"
                imageUrl="/arrow.png"
                spinDuration={15}
                onHover="speedUp"
                className="transition-all duration-300"
              />
            </div>
            
            {/* Description on the right */}
            <div className="absolute right-16 top-1/2 -translate-y-1/2 w-64 text-right z-50">
              <p className="text-white text-base pointer-events-none">
                We design, build, and scale custom AI solutions that solve your most pressing business needs and create a lasting competitive advantage.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Final Content */}
        {/* Only show the Identify section content, not Educate */}
        <motion.div
          style={{ 
            opacity: finalElementsOpacity,
            pointerEvents: 'none'
          }}
          className="absolute inset-0 z-30"
        >
          {/* Top navigation-like text */}
          <motion.div style={{ opacity: navOpacity }} className="absolute top-16 left-0 right-0 mx-auto flex w-fit space-x-4 md:space-x-8 text-sm md:text-base text-white">
            {content.map((item, index) => (
              <NavItem
                key={item.title}
                scrollYProgress={scrollYProgress}
                index={index}
                title={item.title}
              />
            ))}
          </motion.div>

          {/* Centered text and bottom-right text container - only for Identify */}
          <div className="absolute inset-0 pointer-events-none">
            {content.filter(item => item.title === 'Identify').map((item, index) => (
              <ContentAnimation
                key={item.title}
                scrollYProgress={scrollYProgress}
                index={0} // Force index to 0 for Identify
                item={item}
              />
            ))}
          </div>
        </motion.div>

        {/* Solutions Section */}
        <motion.div
          style={{
            opacity: solutionsOpacity,
            scale: solutionsScale,
            pointerEvents: solutionsPointerEvents
          }}
          className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-[#02010C]"
        >
          <div className="w-full flex flex-col items-center">
            <div className="text-center mb-12 mt-16 sm:mt-8 md:mt-0">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-regular text-white px-4">
              <span className="text-purple-400">AI Agents</span> that talk, type, and turn 
              </h2>
              <h3 className="text-3xl mt-3 sm:text-4xl md:text-5xl font-regular text-white px-4">
              conversations into conversions
              </h3>
            </div>
            <div className="embla w-full max-w-7xl px-20 sm:px-6 md:px-10 relative carousel-fader">
              <div className="embla__viewport solutions-carousel-viewport" ref={emblaRef}>
                <div className="embla__container">
                  {solutionsData.map((solution, i) => (
                    <div className="embla__slide " key={i}>
                      <ProfileCard
                        name={solution.name}
                        industry={solution.industry}
                        description={solution.description}
                        image={solution.image}
                      />
                    </div>
                  ))}
                </div>
              </div>
              {/* Navigation Buttons */}
              <button onClick={scrollPrev} className="hidden md:block absolute top-1/2 -translate-y-1/2 left-4 z-50 p-2 sm:p-3 bg-black/40 rounded-full hover:bg-black/70 transition-colors border border-white/20">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6">
                  <path d="m15 18-6-6 6-6"/>
                </svg>
              </button>
              <button onClick={scrollNext} className="hidden md:block absolute top-1/2 -translate-y-1/2 right-4 z-50 p-2 sm:p-3 bg-black/40 rounded-full hover:bg-black/70 transition-colors border border-white/20">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OrbSection;
