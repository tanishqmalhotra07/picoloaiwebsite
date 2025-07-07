'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, useScroll } from 'framer-motion';
import Image from 'next/image';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.5, delayChildren: 0.5 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: 'easeInOut' } },
};

const getStartedButtonVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.05, transition: { duration: 0.2, ease: 'easeOut' } },
};

const arrowVariants = {
  rest: { x: 0 },
  hover: { x: 5, transition: { duration: 0.2, ease: 'easeOut' } },
};

const Hero = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const sentenceLine1Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.08,
      },
    },
  };

  const letterLine1Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

    const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);
  
  // Typewriter effect
  useEffect(() => {
    const words = ['Development', 'Consulting', 'Education'];
    
    const handleTyping = () => {
      // Current word being typed/deleted
      const currentWord = words[wordIndex];
      
      // If deleting, remove a character, otherwise add a character
      if (isDeleting) {
        setText(currentWord.substring(0, text.length - 1));
      } else {
        setText(currentWord.substring(0, text.length + 1));
      }
      
      // Slower, smoother typing speeds
      let newTypingSpeed = isDeleting ? 80 : 150;
      
      // If completed typing the word
      if (!isDeleting && text === currentWord) {
        // Longer pause at end of word
        newTypingSpeed = 2000;
        setIsDeleting(true);
      } else if (isDeleting && text === '') {
        // Pause before starting next word
        newTypingSpeed = 800;
        setIsDeleting(false);
        setWordIndex((prevIndex) => (prevIndex + 1) % words.length);
      }
      
      setTypingSpeed(newTypingSpeed);
    };
    
    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex, typingSpeed]);

  // No need for this effect anymore as we're using the typewriter effect

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);

  React.useEffect(() => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }, []);

  const transformX = useTransform(x, [-width / 2, width / 2], [35, -35]);
  const transformY = useTransform(y, [-height / 2, height / 2], [35, -35]);

  const handleMouseMove = (event: React.MouseEvent) => {
    const { clientX, clientY } = event;
    x.set(clientX - width / 2);
    y.set(clientY - height / 2);
  };

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <div 
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden bg-black"
      onMouseMove={handleMouseMove}
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-cyan-400/80 shadow-[0_0_15px_rgba(0,255,255,0.6)]"></div>
      {/* Background Image Animation */}
      <motion.div
        className="absolute inset-0 w-full h-full z-0"
        style={{ y: backgroundY }}
      >
        <motion.div
          className="w-full h-full"
          style={{
            translateX: transformX,
            translateY: transformY,
            scale: 1.1,
          }}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
        >
          <Image
            src="/bacpico.jpg"
            alt="Wavy background"
            fill
            style={{ objectFit: 'cover' }}
            quality={100}
            className="opacity-70"
          />
          <div className="absolute inset-0 w-full h-full" style={{ background: 'radial-gradient(circle, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.9) 100%)' }} />
        </motion.div>
      </motion.div>

      {/* Staggered Content Animation */}
      <motion.div
        className="relative z-10 h-full flex flex-col justify-between p-4 md:p-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div /> {/* Placeholder for top content */}

        {/* Main Content */}
        <motion.div style={{ y: textY }} className="text-center text-white px-4" variants={itemVariants}>
                    <h1 className="text-6xl sm:text-7xl md:text-8xl font-normal tracking-tighter ">
            <motion.span
              className="font-semibold inline-block"
              variants={sentenceLine1Variants}
            >
              {"We are an AI".split("").map((char, index) => (
                <motion.span key={index} variants={letterLine1Variants} className="inline-block">
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.span>
            <br />
            <span className="h-[1em] inline-block w-full md:w-[10em] text-center px-2 min-h-[1em]">
                            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500">
                {text || '\u00A0'}
              </span>
            </span>
            <br />
            <motion.span
              className="font-semibold inline-block"
              variants={sentenceLine1Variants}
            >
              {"Company".split("").map((char, index) => (
                <motion.span key={index} variants={letterLine1Variants} className="inline-block">
                  {char}
                </motion.span>
              ))}
            </motion.span>
          </h1>
                    <p className="mt-4 text-xl md:text-2xl font-light">
          Simplifying AI so you can scale, save, and succeed
          </p>
        </motion.div>

        {/* Bottom Buttons */}
        <motion.div className="flex justify-start items-center" variants={itemVariants}>
          <motion.button
            className="p-0.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
            variants={getStartedButtonVariants}
            initial="rest"
            whileHover="hover"
            onClick={() => handleScrollTo('about')}
          >
            <div className="px-5 py-2.5 md:px-6 md:py-3 rounded-full bg-violet-100 text-black font-semibold flex items-center space-x-2 text-base md:text-base">
              <span>Get Started</span>
              <motion.span className="inline-block" variants={arrowVariants}>
                &rarr;
              </motion.span>
            </div>
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;

