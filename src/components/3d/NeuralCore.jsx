import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Points, PointMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

export default function NeuralCore() {
  const pointsRef = useRef();

  // Create a particle cloud
  const particlesCount = 2000;
  const positions = new Float32Array(particlesCount * 3);
  for (let i = 0; i < particlesCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 10;
  }

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = t * 0.05;
    pointsRef.current.rotation.x = t * 0.03;
  });

  return (
    <group>
      {/* The Core: Distorted Liquid Mesh */}
      <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
        <mesh scale={1.8}>
          <sphereGeometry args={[1, 64, 64]} />
          <MeshDistortMaterial
            color="#1e40af"
            speed={3}
            distort={0.4}
            radius={1}
            metalness={0.8}
            roughness={0.2}
            emissive="#1e3a8a"
            emissiveIntensity={0.5}
          />
        </mesh>
        
        {/* The Outer Shell: Wireframe */}
        <mesh scale={2.1}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial 
            color="#3b82f6" 
            wireframe 
            transparent 
            opacity={0.1} 
          />
        </mesh>
      </Float>

      {/* The Particle Field */}
      <Points ref={pointsRef} positions={positions} stride={3}>
        <PointMaterial
          transparent
          color="#60a5fa"
          size={0.02}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}