import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { 
  LayoutDashboard, History, Settings, LogOut, 
  Upload, ShieldAlert, Zap, BarChart3, Binary, 
  Search, RefreshCcw, FileText
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid 
} from 'recharts';

//import backend url from .env
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export default function Dashboard() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setResult(null);
    }
  };

  const runAnalysis = async () => {
    if (!file) return;
    setIsAnalyzing(true);
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`${BACKEND_URL}/analyze`, formData);
      // Simulate a bit of "Processing" time for UI aesthetic
      setTimeout(() => {
        setResult(response.data);
        setIsAnalyzing(false);
      }, 2000);
    } catch (error) {
      console.error("Analysis failed", error);
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#050505] text-slate-200 font-sans overflow-hidden">
      
  

      {/* 2. MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto p-8 relative">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Neural Lab <span className="text-blue-500">v2.0</span></h1>
            <p className="text-slate-500 text-sm">DeepScan forensic engine initialized and ready.</p>
          </div>
          <div className="flex items-center space-x-4 bg-white/5 p-2 rounded-xl border border-white/10">
            <div className="text-right">
              <p className="text-xs font-bold text-white">Operative 01</p>
              <p className="text-[10px] text-green-500 uppercase tracking-widest">Active Session</p>
            </div>
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600" />
          </div>
        </header>

        <div className="grid grid-cols-12 gap-8">
          
          {/* LEFT: Upload & Input Area */}
          <div className="col-span-12 lg:col-span-5 space-y-6">
            <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-6 backdrop-blur-sm relative group">
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center">
                <Upload size={16} className="mr-2" /> Image Staging
              </h3>
              
              <div className="relative aspect-square rounded-2xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center overflow-hidden transition-all hover:border-blue-500/50">
                {preview ? (
                  <>
                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                    {isAnalyzing && (
                      <motion.div 
                        initial={{ top: 0 }}
                        animate={{ top: '100%' }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="absolute left-0 w-full h-1 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,1)] z-10"
                      />
                    )}
                  </>
                ) : (
                  <div className="text-center p-8">
                    <div className="h-16 w-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/10">
                      <Search size={32} className="text-slate-500" />
                    </div>
                    <p className="text-slate-400 font-medium">Drag Forensic Assets Here</p>
                    <p className="text-slate-600 text-xs mt-1">Supports JPG, PNG, WEBP</p>
                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileChange} />
                  </div>
                )}
              </div>

              <button 
                onClick={runAnalysis}
                disabled={!file || isAnalyzing}
                className={`w-full mt-6 py-4 rounded-xl font-bold flex items-center justify-center space-x-2 transition-all ${
                  !file || isAnalyzing 
                  ? 'bg-white/5 text-slate-600 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/40'
                }`}
              >
                {isAnalyzing ? (
                  <><RefreshCcw className="animate-spin" size={20} /> <span>ANALYZING NEURAL PATHS...</span></>
                ) : (
                  <><Zap size={20} fill="currentColor" /> <span>RUN DEEPSCAN ANALYSIS</span></>
                )}
              </button>
            </div>
          </div>

          {/* RIGHT: Results & Visuals */}
          <div className="col-span-12 lg:col-span-7 space-y-6">
            <AnimatePresence mode="wait">
              {result ? (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  {/* Verdict Card */}
                  <div className={`p-8 rounded-3xl border flex items-center justify-between ${
                    result.verdict === 'Real' 
                    ? 'bg-emerald-500/5 border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.05)]' 
                    : 'bg-red-500/5 border-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.05)]'
                  }`}>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-1">Final Forensic Verdict</p>
                      <h2 className={`text-5xl font-black ${result.verdict === 'Real' ? 'text-emerald-500' : 'text-red-500'}`}>
                        {result.verdict.toUpperCase()}
                      </h2>
                    </div>
                    <div className="text-right">
                      <p className="text-4xl font-mono font-bold text-white">{result.avg_confidence}%</p>
                      <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">Mean Confidence</p>
                    </div>
                  </div>

                  {/* Charts Card */}
                  <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-6 h-[400px]">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-8 flex items-center">
                      <BarChart3 size={16} className="mr-2" /> Neural Engine Comparison
                    </h3>
                    <ResponsiveContainer width="100%" height="80%">
                      <BarChart data={result.detailed_results}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                        <XAxis dataKey="model" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                        <YAxis stroke="#475569" fontSize={10} tickLine={false} axisLine={false} domain={[0, 100]} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px' }}
                          itemStyle={{ color: '#fff' }}
                        />
                        <Bar dataKey="confidence" radius={[4, 4, 0, 0]} barSize={40}>
                          {result.detailed_results.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.label === 'REAL' ? '#10b981' : '#ef4444'} fillOpacity={0.8} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>
              ) : (
                <div className="h-full min-h-[500px] border border-white/5 rounded-3xl border-dashed flex flex-col items-center justify-center text-slate-600 bg-white/[0.01]">
                   <ShieldAlert size={48} className="mb-4 opacity-20" />
                   <p className="text-lg font-medium">Awaiting Data Input</p>
                   <p className="text-sm">Initiate scan to see forensic details.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}

// Helper Sidebar Component
function SidebarItem({ icon, label, active = false }) {
  return (
    <div className={`flex items-center space-x-3 p-3 rounded-xl cursor-pointer transition-all ${
      active ? 'bg-blue-600/10 text-blue-500 border border-blue-500/20' : 'text-slate-500 hover:bg-white/5 hover:text-slate-300'
    }`}>
      {icon}
      <span className="text-sm font-semibold">{label}</span>
    </div>
  );
}