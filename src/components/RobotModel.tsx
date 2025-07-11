'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

function Model({ url, ...props }: { url: string }) {
  const { scene } = useGLTF(url);
  const modelRef = useRef<THREE.Group>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const [scale, setScale] = useState(1.0);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mousePos.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      };
    };

    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) { // Mobile
        setScale(0.65);
      } else if (width < 1024) { // Tablet
        setScale(0.85);
      } else { // Desktop
        setScale(1.0);
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
    
    const targetRotationX = (mousePos.current.y * Math.PI) / 6;
    const targetRotationY = -Math.PI / 2 + (mousePos.current.x * Math.PI) / 4;
    
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

const GreetingBubble = () => (
  <motion.div
    className="absolute top-1/4 right-40 mr-2 w-max max-w-xs p-3 bg-white rounded-lg shadow-lg"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, type: 'spring' }}
  >
    <p className="text-sm text-gray-800">May I help you?</p>
    <div
      className="absolute right-0 top-1/2 w-0 h-0 border-t-8 border-t-transparent border-l-8 border-l-white border-b-8 border-b-transparent"
      style={{ transform: 'translate(100%, -50%)' }}
    ></div>
  </motion.div>
);

export default function RobotModel({ url, showGreeting }: { url: string; showGreeting: boolean }) {
  return (
    <div className="relative w-full h-full">
      {showGreeting && <GreetingBubble />}
      <Canvas
                camera={{ position: [0, 0.5, 4.5], fov: 30 }}
        style={{ background: 'transparent' }}
      >
                <ambientLight intensity={1.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <Model url={url} />
      </Canvas>
    </div>
  );
}