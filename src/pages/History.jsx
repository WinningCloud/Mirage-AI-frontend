import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Trash2, Eye, Download, 
  Filter, ShieldAlert, Calendar, Hash,
  FileText, ExternalLink
} from 'lucide-react';

export default function History() {
  const [history, setHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Load history from localStorage on mount
  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('mirage_history') || '[]');
    // Sort by timestamp newest first
    setHistory(savedHistory.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
  }, []);

  const deleteRecord = (id) => {
    const updated = history.filter(item => item.id !== id);
    setHistory(updated);
    localStorage.setItem('mirage_history', JSON.stringify(updated));
  };

  const clearVault = () => {
    if (window.confirm("ARE YOU SURE? THIS WILL PERMANENTLY WIPE ALL FORENSIC LOGS.")) {
      setHistory([]);
      localStorage.removeItem('mirage_history');
    }
  };

  const filteredHistory = history.filter(item => 
    item.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.verdict.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8 min-h-screen">
      {/* HEADER SECTION */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tighter italic">
            FORENSIC <span className="text-blue-600">VAULT</span>
          </h1>
          <p className="text-slate-500 text-[10px] uppercase tracking-[0.4em] mt-1">
            Encrypted Analysis Archives
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" size={14} />
            <input 
              type="text" 
              placeholder="SEARCH LOGS..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#050505] border border-white/5 rounded-lg py-2 pl-10 pr-4 text-[10px] text-white focus:outline-none focus:border-blue-500/50 transition-all uppercase tracking-widest"
            />
          </div>
          <button 
            onClick={clearVault}
            className="p-2 bg-red-500/10 text-red-500 border border-red-500/20 rounded-lg hover:bg-red-500 hover:text-white transition-all"
            title="Clear All Logs"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </header>

      {/* DATA TABLE */}
      <div className="bg-[#050505] border border-white/5 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.01]">
                <TableHead icon={<Hash size={12}/>} label="Session ID" />
                <TableHead icon={<FileText size={12}/>} label="Asset Name" />
                <TableHead icon={<Calendar size={12}/>} label="Timestamp" />
                <TableHead icon={<ShieldAlert size={12}/>} label="Verdict" />
                <TableHead icon={<ExternalLink size={12}/>} label="Action" />
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filteredHistory.length > 0 ? (
                  filteredHistory.map((item, index) => (
                    <motion.tr 
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group"
                    >
                      <td className="p-4 font-mono text-[10px] text-slate-500">#{item.id.slice(0, 8)}</td>
                      <td className="p-4">
                        <span className="text-xs font-bold text-slate-300 truncate max-w-[150px] block">
                          {item.filename}
                        </span>
                      </td>
                      <td className="p-4 text-[10px] text-slate-500 uppercase tracking-tighter">
                        {new Date(item.timestamp).toLocaleString()}
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded text-[9px] font-black tracking-widest uppercase border ${
                          item.verdict === 'Real' 
                          ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' 
                          : 'bg-red-500/10 text-red-500 border-red-500/20'
                        }`}>
                          {item.verdict}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <button className="p-1.5 text-slate-500 hover:text-blue-500 transition-colors">
                            <Eye size={16} />
                          </button>
                          <button 
                            onClick={() => deleteRecord(item.id)}
                            className="p-1.5 text-slate-500 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="p-20 text-center">
                      <div className="flex flex-col items-center opacity-20">
                        <ShieldAlert size={48} className="mb-4" />
                        <p className="text-xs font-bold uppercase tracking-[0.5em]">No Forensic Records Found</p>
                      </div>
                    </td>
                  </tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function TableHead({ icon, label }) {
  return (
    <th className="p-4">
      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">
        {icon} {label}
      </div>
    </th>
  );
}