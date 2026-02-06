import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

export default function SpaceField() {
  const points = useRef();
  const { viewport } = useThree();

  // 1. Higher Particle Density (10,000 stars for a richer look)
  const count = 10000;
  
  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      // Create a wider and deeper tunnel
      // Using a larger spread for "Larger" look
      pos[i * 3] = (Math.random() - 0.5) * 25;     // Width
      pos[i * 3 + 1] = (Math.random() - 0.5) * 25; // Height
      pos[i * 3 + 2] = (Math.random() - 0.5) * 100; // Deep Depth
      
      // Randomize sizes for a natural "twinkle" and depth
      sz[i] = Math.random();
    }
    return [pos, sz];
  }, []);

  useFrame((state) => {
    const { mouse } = state;
    
    // 2. Continuous Forward Motion
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 2] += 0.35; // Warp Speed
      
      // Reset stars once they pass the camera (Z = 10)
      if (positions[i * 3 + 2] > 10) {
        positions[i * 3 + 2] = -90;
      }
    }
    points.current.geometry.attributes.position.needsUpdate = true;

    // 3. MOUSE INTERACTION (Smooth Parallax)
    // We target the rotation of the entire group based on mouse position
    // Lerping (Linear Interpolation) makes the movement smooth and professional
    const targetX = mouse.y * 0.15;
    const targetY = mouse.x * 0.15;
    
    points.current.rotation.x = THREE.MathUtils.lerp(
      points.current.rotation.x, 
      targetX, 
      0.05
    );
    points.current.rotation.y = THREE.MathUtils.lerp(
      points.current.rotation.y, 
      targetY, 
      0.05
    );

    // Subtle constant rotation for extra "space" feel
    points.current.rotation.z += 0.0005;
  });

  return (
    <group>
      <Points ref={points} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.04}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0.8}
        />
      </Points>
    </group>
  );
}