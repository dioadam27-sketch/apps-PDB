
import React from 'react';
import { Home, ChevronRight, CalendarDays, LifeBuoy, Building2, Archive, Grid, LogOut } from 'lucide-react';
import { AppModule } from '../types';

interface SidebarProps {
  activeModule: string | null;
  onNavigate: (module: string | null) => void;
  modules: AppModule[];
}

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'CalendarDays': return CalendarDays;
    case 'LifeBuoy': return LifeBuoy;
    case 'Building2': return Building2;
    case 'Archive': return Archive;
    default: return Grid;
  }
};

export const Sidebar: React.FC<SidebarProps> = ({ activeModule, onNavigate, modules }) => {
  
  const handleLinkClick = (e: React.MouseEvent, moduleId: string | null) => {
    const app = moduleId ? modules.find(m => m.id === moduleId) : null;
    
    // If it's an internal link (dashboard or internal app), use onNavigate
    if (!app?.externalUrl) {
      e.preventDefault();
      onNavigate(moduleId);
    }
  };

  const handleBackToHome = () => {
    window.location.hash = '';
  };

  return (
    <div className="w-64 bg-[#0a1e3f] text-slate-300 flex flex-col h-screen fixed left-0 top-0 border-r border-blue-900 z-20 transition-all duration-300 shadow-2xl">
      <div className="p-6 flex items-center gap-3 border-b border-blue-900/50 bg-[#06142e]">
        <img 
          src="https://ppk2ipe.unair.ac.id/gambar/UNAIR_BRANDMARK_2025-02.png" 
          alt="UNAIR Logo" 
          className="h-12 w-auto object-contain bg-white rounded-lg p-1"
        />
        <div>
          <h1 className="text-white font-bold text-lg leading-tight">Apps PDB</h1>
          <p className="text-xs text-amber-400 font-medium">Excellence with Morality</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-6 space-y-1">
        <div className="px-4 mb-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
          Main
        </div>
        
        {/* Dashboard Link */}
        <a
          href="#dashboard"
          onClick={(e) => handleLinkClick(e, null)}
          className={`w-full flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors ${
            activeModule === null 
              ? 'bg-blue-900/50 text-amber-400 border-r-4 border-amber-400' 
              : 'hover:bg-blue-900/30 text-slate-300 hover:text-white'
          }`}
        >
          <Home size={18} />
          Dashboard Overview
        </a>
        
        <div className="mt-8 px-4 mb-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
          Applications
        </div>
        
        {/* App Links */}
        {modules.map((app) => {
          const Icon = getIcon(app.icon);
          const isActive = activeModule === app.id;
          return (
            <a
              key={app.id}
              href={app.externalUrl || `#${app.id}`}
              target={app.externalUrl ? "_blank" : "_self"}
              rel={app.externalUrl ? "noopener noreferrer" : undefined}
              onClick={(e) => !app.externalUrl && handleLinkClick(e, app.id)}
              className={`w-full flex items-center justify-between px-6 py-3 text-sm font-medium transition-colors group ${
                isActive
                  ? 'bg-blue-900/50 text-white'
                  : 'hover:bg-blue-900/30 text-slate-300 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-3">
                <Icon size={18} className={isActive ? 'text-amber-400' : 'text-slate-400 group-hover:text-amber-200'} />
                {app.name}
              </span>
              {isActive && <ChevronRight size={14} className="text-amber-400" />}
            </a>
          );
        })}
      </nav>

      <div className="p-4 border-t border-blue-900/50 bg-[#06142e]">
        <button
          onClick={handleBackToHome}
          className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-400 hover:text-white hover:bg-blue-900/50 rounded-xl transition-all mb-2 group"
        >
          <LogOut size={18} className="group-hover:text-amber-400 transition-colors" />
          Kembali ke Beranda
        </button>
        <div className="text-center text-xs text-slate-500 mt-2">
          &copy; 2024 Apps PDB Unair
        </div>
      </div>
    </div>
  );
};
