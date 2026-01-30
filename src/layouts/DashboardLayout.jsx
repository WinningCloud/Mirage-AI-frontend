import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  History, 
  Settings, 
  LogOut, 
  ChevronLeft, 
  ChevronRight,
  ShieldCheck,
  BarChart3,
  Search
} from 'lucide-react';

export default function DashboardLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Neural Lab' },
    { path: '/history', icon: History, label: 'Forensic Vault' },
    { path: '/analytics', icon: BarChart3, label: 'Analytics' },
    { path: '/settings', icon: Settings, label: 'Terminal Config' },
  ];

  return (
    <div className="flex h-screen w-screen bg-[#000000] text-slate-300 overflow-hidden font-sans">
      
      {/* SIDEBAR NAVIGATION */}
      <motion.aside
        initial={false}
        animate={{ width: isCollapsed ? 80 : 260 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        className="relative h-full bg-[#050505] border-r border-white/5 flex flex-col z-30"
      >
        {/* LOGO SECTION */}
        <div className="h-20 flex items-center px-6">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(37,99,235,0.3)]">
              <ShieldCheck size={20} className="text-white" />
            </div>
            {!isCollapsed && (
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-black tracking-tighter text-xl text-white italic"
              >
                MIRAGE <span className="text-blue-600">AI</span>
              </motion.span>
            )}
          </div>
        </div>

        {/* NAVIGATION LINKS */}
        <nav className="flex-1 px-3 space-y-1 mt-4">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path}>
                <div className={`
                  group flex items-center h-12 rounded-xl transition-all duration-300 relative
                  ${isActive ? 'bg-blue-600/10 text-blue-500' : 'hover:bg-white/[0.03] text-slate-500'}
                `}>
                  {/* Active Indicator Line */}
                  {isActive && (
                    <motion.div 
                      layoutId="activeNav"
                      className="absolute left-0 w-1 h-6 bg-blue-600 rounded-r-full"
                    />
                  )}

                  <div className={`flex items-center justify-center ${isCollapsed ? 'w-full' : 'w-14'}`}>
                    <item.icon size={20} className={isActive ? 'text-blue-500' : 'group-hover:text-slate-300'} />
                  </div>

                  {!isCollapsed && (
                    <motion.span 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs font-bold uppercase tracking-[0.2em]"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* BOTTOM ACTIONS */}
        <div className="p-3 border-t border-white/5 space-y-1">
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-full flex items-center h-12 rounded-xl text-slate-600 hover:bg-white/[0.03] hover:text-slate-300 transition-all"
          >
            <div className={`flex items-center justify-center ${isCollapsed ? 'w-full' : 'w-14'}`}>
              {isCollapsed ? <ChevronRight size={18}/> : <ChevronLeft size={18}/>}
            </div>
            {!isCollapsed && <span className="text-[10px] font-bold uppercase tracking-widest">Minimize System</span>}
          </button>

          <button className="w-full flex items-center h-12 rounded-xl text-red-900/50 hover:bg-red-500/10 hover:text-red-500 transition-all">
            <div className={`flex items-center justify-center ${isCollapsed ? 'w-full' : 'w-14'}`}>
              <LogOut size={18}/>
            </div>
            {!isCollapsed && <span className="text-[10px] font-bold uppercase tracking-widest">Terminate</span>}
          </button>
        </div>
      </motion.aside>

      {/* MAIN CONTENT AREA */}
      <motion.main 
        layout
        className="flex-1 h-full overflow-y-auto bg-[#000000] relative"
      >
        {/* Subtle Background Forensic Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none" />
        
        {/* The Page Content renders here */}
        <div className="relative z-10">
          <Outlet />
        </div>
      </motion.main>
    </div>
  );
}