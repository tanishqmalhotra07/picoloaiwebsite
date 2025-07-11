'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

function Model({ url, containerRef, ...props }: { url: string; containerRef: React.RefObject<HTMLDivElement | null> }) {
  const { scene } = useGLTF(url);
  const modelRef = useRef<THREE.Group>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const [scale, setScale] = useState(1.0);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const mouseX = event.clientX - centerX;
      const mouseY = event.clientY - centerY;

      mousePos.current = {
        x: (mouseX / (rect.width / 2)) * 0.5,
        y: (mouseY / (rect.height / 2)) * 0.5, // Negated to correct inversion
      };
    };

    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) { // Mobile
        setScale(0.5);
      } else if (width < 1024) { // Tablet
        setScale(0.67);
      } else { // Desktop
        setScale(0.63);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    handleResize(); // Set initial scale

    if (modelRef.current) {
      modelRef.current.rotation.y = -Math.PI / 2;
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  useFrame(() => {
    if (!modelRef.current) return;
    
    const maxVerticalRotation = 15 * (Math.PI / 180);
    let targetRotationX = (mousePos.current.y * Math.PI) / 2;

    // Clamp the vertical rotation
    targetRotationX = THREE.MathUtils.clamp(
      targetRotationX,
      -maxVerticalRotation,
      maxVerticalRotation
    );
    const maxRotation = 25 * (Math.PI / 180); // 70 degrees in radians
    let targetRotationY = -Math.PI / 2 + (mousePos.current.x * Math.PI) / 2;

    // Clamp the rotation to the 70-degree limit
    targetRotationY = THREE.MathUtils.clamp(
      targetRotationY,
      -Math.PI / 2 - maxRotation,
      -Math.PI / 2 + maxRotation
    );
    
    modelRef.current.rotation.x = THREE.MathUtils.lerp(
      modelRef.current.rotation.x,
      targetRotationX,
      0.05
    );
    modelRef.current.rotation.y = THREE.MathUtils.lerp(
      modelRef.current.rotation.y,
      targetRotationY,
      0.05
    );
    
    modelRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.1;
  });

  const model = scene.clone();
  
  return (
    <group ref={modelRef} {...props} dispose={null}>
      <primitive object={model} scale={scale} />
    </group>
  );
}

const GreetingBubble = ({ isHovered }: { isHovered: boolean }) => (
  <motion.div
    className="absolute top-1/3 right-24 sm:right-28 md:right-32 lg:right-36 mr-2 w-max max-w-xs p-1.5 sm:p-2 bg-white rounded-lg shadow-lg"
    initial={{ opacity: 1, y: 0 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, type: 'spring' }}
  >
    <p className="text-[10px] sm:text-sm text-gray-800">{isHovered ? 'Hello!' : 'May I help you?'}</p>
    <div
      className="absolute right-0 top-1/2 w-0 h-0 border-t-4 border-t-transparent border-l-4 border-l-white border-b-4 border-b-transparent"
      style={{ transform: 'translate(100%, -50%)' }}
    ></div>
  </motion.div>
);

export default function RobotModel({ url, isHovered }: { url: string; isHovered: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={containerRef} className="relative w-full h-full">
      <GreetingBubble isHovered={isHovered} />
      <Canvas
                camera={{ position: [0, 0.5, 4.5], fov: 30 }}
        style={{ background: 'transparent' }}
      >
                <ambientLight intensity={1.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
                <Model url={url} containerRef={containerRef} />
      </Canvas>
    </div>
  );
}