'use client';

import React, { useLayoutEffect, useRef } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(TextPlugin);

const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  z-index: 9999;
  transition: background-color 0.5s ease;
`;

const LogoWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  will-change: transform;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (min-width: 768px) {
    width: 500px;
    height: 500px;
  }
`;

const WhiteLine = styled.div`
  position: absolute;
  left: -100%;
  top: 65%;
  width: 100%;
  height: 2px;
  background-color: white;
  transform: translateY(-50%);
  box-shadow: 0 0 10px 2px rgba(255, 255, 255, 0.7);
`;

const DotImageContainer = styled.div`
  opacity: 0;
  position: relative;
  z-index: 3;
  width: 35px;
  height: 35px;
  top: 6rem;

  @media (min-width: 768px) {
    width: 50px;
    height: 50px;
    top: 6.5rem;
  }
`;

const PImageContainer = styled.div`
  opacity: 0;
  position: absolute;
  z-index: 2;
  width: 135px;
  height: 135px;
  top: 2rem;
  right: 2.9rem;

  @media (min-width: 768px) {
    width: 230px;
    height: 230px;
    top: 2rem;
    right: 4.6rem;
  }
`;

const PatternImageContainer = styled.div`
  opacity: 0;
  position: absolute;
  z-index: 1;
  width: 15rem;
  height: 15rem;
  top: 2.5rem;
  right: -0.4rem;

  @media (min-width: 768px) {
    width: 25rem;
    height: 25rem;
    top: 0.3rem;
    right: -0.8rem;
  }
`;

const Text = styled.span`
  opacity: 0;
  position:absolute;
  color: white;
  font-size: 1.4rem;
  white-space: nowrap;
  top: 14.5rem;
  right: 2.3rem;

  @media (min-width: 768px) {
    font-size: 3rem;
    top: 19.8rem;
    right: 1.3rem;
  }
`;

const LoadingAnimation = ({ onAnimationComplete }: { onAnimationComplete: () => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const pRef = useRef<HTMLDivElement>(null);
  const patternRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const logoWrapperRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
    if (!containerRef.current || !lineRef.current || !dotRef.current || !pRef.current || !patternRef.current || !textRef.current || !logoWrapperRef.current) return;

    if (!logoWrapperRef.current) return;

    const { innerWidth, innerHeight } = window;
    gsap.set(logoWrapperRef.current, { x: innerWidth / 2, y: innerHeight / 2, xPercent: -50, yPercent: -50 });

    const isMobile = innerWidth < 768;
    const finalScale = isMobile ? 0.25 : 0.20;
    const finalX = isMobile ? 0 : 10;
    const finalY = isMobile ? 0 : 10;

    const tl = gsap.timeline({
      onComplete: () => {
        if (onAnimationComplete) {
          onAnimationComplete();
        }
        if (containerRef.current) {
          // Only make the background transparent but keep the logo visible
          gsap.to(containerRef.current, {
            backgroundColor: 'transparent',
            duration: 0.5,
            onComplete: () => {
              if (containerRef.current) {
                containerRef.current.style.pointerEvents = 'none';
              }
            },
          });
        }
      },
    });

    gsap.set([dotRef.current, pRef.current], { rotationX: -90, transformOrigin: 'center' });
    gsap.set(pRef.current, { y: 75 });
    gsap.set(patternRef.current, { scale: 0 });
    gsap.set(textRef.current, { y: 10, opacity: 0 });

    tl.to(lineRef.current, { x: '100%', duration: 1, ease: 'power2.inOut' })
      .to(dotRef.current, { opacity: 1, rotationX: 0, duration: 0.6, ease: 'power2.out' }, '-=0.5')
      .to(lineRef.current, { x: '200%', duration: 1, ease: 'power2.inOut' })
      .to(pRef.current, { opacity: 1, rotationX: 0, duration: 0.6, ease: 'power2.out' }, '<')
      .to(patternRef.current, { opacity: 1, scale: 1, rotation: 360, duration: 1, ease: 'elastic.out(1, 0.75)' }, '-=0.5')
      .to(textRef.current, { opacity: 1, duration: 0.1 })
            .to(textRef.current.children, {
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: 'power1.inOut',
      })
      .to(logoWrapperRef.current, {
        scale: finalScale,
        x: finalX,
        y: finalY,
        xPercent: 0,
        yPercent: 0,
        transformOrigin: '0 0',
        duration: 2,
        ease: 'power3.inOut',
        force3D: true,
      }, '+=0.5')
      .set(logoWrapperRef.current, { 
        flexDirection: 'row',
        gap: '1rem',
      })
      .to(textRef.current, { y: 0 }, '<');

  }, []);

  return (
    <LoadingContainer ref={containerRef}>
      <WhiteLine ref={lineRef} />
      <LogoWrapper ref={logoWrapperRef}>
        <ImageContainer ref={imageContainerRef}>
          <DotImageContainer ref={dotRef}>
            <Image src="/dot.png" alt="dot" fill style={{ objectFit: 'contain' }} />
          </DotImageContainer>
          <PImageContainer ref={pRef}>
            <Image src="/p.png" alt="p" fill style={{ objectFit: 'contain' }} />
          </PImageContainer>
          <PatternImageContainer ref={patternRef}>
            <Image src="/pattern.png" alt="pattern" fill style={{ objectFit: 'contain' }} />
          </PatternImageContainer>
        </ImageContainer>
        <Text ref={textRef}>
          {'Picolo AI'.split('').map((char, index) => (
            <span key={index} style={{ opacity: 0, display: 'inline-block' }}>
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </Text>
      </LogoWrapper>
    </LoadingContainer>
  );
};

export default LoadingAnimation;