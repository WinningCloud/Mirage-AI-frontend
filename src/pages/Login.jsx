import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { Lock, Mail, ShieldCheck, ChevronRight } from 'lucide-react';
import DarkGrid from '../components/3d/DarkGrid';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Auth logic here
    navigate('/dashboard');
  };

  return (
    <div className="relative min-h-screen w-full bg-[#000000] flex items-center justify-center overflow-hidden">
      
      {/* 3D Background Layer (Stealth Wireframe) */}
      <div className="absolute inset-0 z-0 opacity-40">
        <Canvas camera={{ position: [0, 5, 10], fov: 50 }}>
          <DarkGrid />
        </Canvas>
      </div>

      {/* Content Layer */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md px-6"
      >
        {/* Branding */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-blue-600/10 border border-blue-500/20 mb-4">
            <ShieldCheck size={24} className="text-blue-500" />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-widest uppercase italic">Mirage <span className="text-blue-600">Auth</span></h2>
          <p className="text-slate-500 text-[10px] uppercase tracking-[0.4em] mt-2">Secure Terminal Access</p>
        </div>

        {/* Login Form (Stealth Glass) */}
        <div className="bg-[#050505] border border-white/5 rounded-2xl p-8 shadow-2xl relative overflow-hidden group">
          {/* Subtle Glow Corner */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/5 blur-3xl pointer-events-none" />

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1">Identity</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                <input 
                  type="email" 
                  className="w-full bg-[#0a0a0a] border border-white/5 rounded-xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-blue-600/50 transition-all text-sm"
                  placeholder="agent@mirage.ai"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Encrypted Key</label>
                <span className="text-[10px] text-blue-600 cursor-pointer hover:underline uppercase tracking-tighter">Lost Access?</span>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                <input 
                  type="password" 
                  className="w-full bg-[#0a0a0a] border border-white/5 rounded-xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-blue-600/50 transition-all text-sm"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <motion.button 
              whileHover={{ gap: '12px' }}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-black tracking-[0.3em] py-4 rounded-xl flex items-center justify-center transition-all mt-4"
            >
              ESTABLISH CONNECTION <ChevronRight size={14} className="ml-2" />
            </motion.button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-slate-600 text-[10px] uppercase tracking-widest">
              New Operator? <span className="text-white hover:text-blue-500 cursor-pointer transition-colors ml-1">Request Credentials</span>
            </p>
          </div>
        </div>

        {/* Security Badges */}
        <div className="mt-8 flex justify-center gap-8 opacity-30">
            <div className="flex items-center gap-2">
                <div className="h-1 w-1 bg-blue-500 rounded-full" />
                <span className="text-[8px] uppercase tracking-[0.3em] text-white">Encrypted</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="h-1 w-1 bg-blue-500 rounded-full" />
                <span className="text-[8px] uppercase tracking-[0.3em] text-white">Mirage v2.0</span>
            </div>
        </div>
      </motion.div>

      {/* Corner Scanning Decals */}
      <div className="absolute top-10 left-10 border-l border-t border-white/10 w-20 h-20 pointer-events-none" />
      <div className="absolute bottom-10 right-10 border-r border-b border-white/10 w-20 h-20 pointer-events-none" />
    </div>
  );
}