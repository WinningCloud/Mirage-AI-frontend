import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Bloom, EffectComposer, Noise, Vignette, Scanline } from '@react-three/postprocessing';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Fingerprint, Shield, Cpu } from 'lucide-react';
import SpaceField from '../components/3d/SpaceField';

export default function Splash() {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen w-screen bg-black overflow-hidden font-sans">
      
      {/* 1. 3D SPACE LAYER */}
      <div className="absolute inset-0 z-0">
       <Canvas camera={{ position: [0, 0, 5], fov: 90 }}>
  <color attach="background" args={['#000000']} />
  <SpaceField />
  <EffectComposer>
    <Bloom intensity={2.5} luminanceThreshold={0.1} radius={0.8} />
    <Vignette darkness={0.95} offset={0.05} />
  </EffectComposer>
</Canvas>
      </div>

      {/* 2. UI LAYER */}
      <div className="relative z-10 flex flex-col items-center justify-between h-full py-16 px-6">
        
        {/* Top Header - Ultra Minimal */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          className="flex items-center gap-6"
        >
          <div className="h-[1px] w-8 bg-white/20" />
          <span className="text-[10px] font-black uppercase tracking-[0.8em] text-white/40">Mirage Forensic Protocol</span>
          <div className="h-[1px] w-8 bg-white/20" />
        </motion.div>

        {/* Branding - Bold & Stark */}
        <div className="text-center">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "circOut" }}
            className="text-7xl md:text-[10rem] font-black tracking-tighter text-white leading-none"
          >
            MIRAGE AI
          </motion.h1>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.5, duration: 1 }}
            className="h-[2px] bg-white mt-4 mx-auto"
          />
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-white/30 text-xs md:text-sm uppercase tracking-[1em] mt-6 font-light"
          >
            See beyond the illusion
          </motion.p>
        </div>

        {/* Actions & Forensic HUD */}
        <div className="w-full max-w-5xl">
          <div className="flex flex-col items-center gap-10">
            <motion.button
              whileHover={{ scale: 1.02, letterSpacing: "0.5em" }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/login')}
              className="px-16 py-5 bg-white text-black text-xs font-black tracking-[0.3em] rounded-none hover:bg-white/90 transition-all duration-500"
            >
              INITIALIZE SESSION
            </motion.button>

            {/* Bottom HUD Stats */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 1.5 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full border-t border-white/10 pt-10"
            >
              <HUDItem label="Core" value="NEURAL-X" />
              <HUDItem label="Security" value="MIL-SPEC" />
              <HUDItem label="Accuracy" value="99.98%" />
              <HUDItem label="Status" value="ENCRYPTED" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Cinematic Border Overlay */}
      <div className="absolute inset-0 pointer-events-none border-[1px] border-white/5 m-8" />
    </div>
  );
}

function HUDItem({ label, value }) {
  return (
    <div className="space-y-1">
      <p className="text-[8px] uppercase tracking-widest text-white/30 font-bold">{label}</p>
      <p className="text-xs font-mono font-medium text-white">{value}</p>
    </div>
  );
}