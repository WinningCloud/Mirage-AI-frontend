import { Canvas } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';

export default function Background() {
  return (
    <Canvas className="absolute inset-0 -z-10">
      <ambientLight intensity={1} />
      <Sphere args={[1, 100, 200]} scale={2}>
        <MeshDistortMaterial
          color="#1e3a8a"
          attach="material"
          distort={0.5}
          speed={2}
          roughness={0}
        />
      </Sphere>
    </Canvas>
  );
}