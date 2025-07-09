'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['10%', '-10%']);
  return (
    <div

      ref={containerRef}
      className="relative h-screen w-full overflow-hidden"
      style={{ backgroundColor: '#02010C' }}
    >
      <motion.div
        className="absolute top-0 left-0 h-full w-full bg-cover bg-center"
        style={{
          backgroundImage: "url('/about.png')",
          y: backgroundY,
        }}
      />
      <motion.div
        className="relative z-10 flex h-full w-full flex-col items-center justify-center text-center py-8"
        style={{ y: textY }}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl md:text-7xl font-semibold text-white px-4">
        We build a team of <span className="text-purple-400">AI Agents</span><br /> for your business
          <br />
        </motion.h1>
        <motion.p variants={itemVariants} className="mt-4 text-xl sm:text-2xl md:text-3xl font-semibold text-white px-6">
        Think of Agents as your <span className="text-pink-400">all-star team, working 24/7</span>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default About;
