import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Bloom, EffectComposer, Noise, Vignette } from '@react-three/postprocessing';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Fingerprint, Shield } from 'lucide-react';
import NeuralCore from '../components/3d/NeuralCore';

export default function Splash() {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen w-screen bg-[#020617] overflow-hidden">
      {/* 1. 3D SCENE LAYER */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
          <color attach="background" args={['#020617']} />
          <ambientLight intensity={0.4} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
          
          <NeuralCore />

          {/* Post-Processing for High-End Glow */}
          <EffectComposer>
            <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} intensity={1.5} />
            <Noise opacity={0.05} />
            <Vignette eskil={false} offset={0.1} darkness={1.1} />
          </EffectComposer>
        </Canvas>
      </div>

      {/* 2. UI LAYER */}
      <div className="relative z-10 flex flex-col items-center justify-between h-full py-16 text-white px-6">
        
        {/* Top Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 group cursor-default"
        >
          <div className="h-[1px] w-12 bg-blue-500/50 group-hover:w-20 transition-all duration-500" />
          <span className="text-xs font-bold tracking-[0.5em] text-blue-400 uppercase">System Initialized</span>
          <div className="h-[1px] w-12 bg-blue-500/50 group-hover:w-20 transition-all duration-500" />
        </motion.div>

        {/* Center Branding */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <h1 className="text-8xl md:text-9xl font-black tracking-tighter mb-2 relative">
              MIRAGE <span className="text-blue-600">AI</span>
              {/* Subtle Glitch Shadow */}
              <span className="absolute top-0 left-0 -z-10 text-blue-900/30 blur-sm translate-x-1 translate-y-1">MIRAGE AI</span>
            </h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-blue-200/40 text-sm md:text-base uppercase tracking-[0.6em] font-light"
          >
            See beyond the illusion
          </motion.p>
        </div>

        {/* Action Button & Stats */}
        <div className="flex flex-col items-center gap-12 w-full max-w-4xl">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/login')}
            className="group relative px-12 py-5 bg-transparent border border-blue-500/30 rounded-full overflow-hidden transition-all hover:border-blue-400"
          >
            {/* Background Fill Animation */}
            <div className="absolute inset-0 bg-blue-600 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            
            <div className="relative z-10 flex items-center gap-3 text-lg font-bold tracking-widest">
              <span>INITIALIZE INTERFACE</span>
              <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </div>
          </motion.button>

          {/* Bottom Forensic Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-12 w-full border-t border-white/5 pt-12"
          >
            <ForensicStat icon={<Fingerprint className="text-blue-500" />} label="Accuracy" value="99.8%" />
            <ForensicStat icon={<Shield className="text-blue-500" />} label="Security" value="AES-256" />
            <div className="hidden md:block">
              <ForensicStat icon={<Shield className="text-blue-500" />} label="Latency" value="14ms" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Ambient Overlay: Scanning Grid */}
      <div className="absolute inset-0 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      <div className="absolute inset-0 pointer-events-none border-[40px] border-[#020617]" />
    </div>
  );
}

function ForensicStat({ icon, label, value }) {
  return (
    <div className="text-center space-y-1">
      <div className="flex justify-center mb-2 opacity-50">{icon}</div>
      <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">{label}</p>
      <p className="text-xl font-mono font-medium text-slate-200">{value}</p>
    </div>
  );
}