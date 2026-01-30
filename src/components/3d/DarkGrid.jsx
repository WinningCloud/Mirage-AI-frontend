import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

export default function DarkGrid() {
  const meshRef = useRef();

  // Create a subtle waving terrain effect
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.z = t * 0.05;
    // Slow breathing animation
    meshRef.current.position.y = Math.sin(t * 0.5) * 0.2;
  });

  return (
    <group ref={meshRef} rotation={[-Math.PI / 3, 0, 0]}>
      <gridHelper 
        args={[40, 40, "#1e3a8a", "#0a0a0a"]} 
        position={[0, 0, 0]} 
        rotation={[Math.PI / 2, 0, 0]}
      />
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[40, 40]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.8} />
      </mesh>
    </group>
  );
}