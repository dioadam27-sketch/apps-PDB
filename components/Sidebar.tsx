
import React from 'react';
import { Home, ChevronRight, CalendarDays, LifeBuoy, Building2, Archive, Grid } from 'lucide-react';
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
    // If it's an internal link, prevent full reload and use React state
    // If it's external (handled by onNavigate logic in App.tsx), let it handle naturally or via override
    const app = moduleId ? modules.find(m => m.id === moduleId) : null;
    
    if (!app?.externalUrl) {
      e.preventDefault();
      onNavigate(moduleId);
    }
    // If it is externalUrl, we let the <a> tag handle opening in new tab naturally, 
    // or if clicked normally, onNavigate logic might trigger window.open
  };

  return (
    <div className="w-64 bg-slate-900 text-slate-300 flex flex-col h-screen fixed left-0 top-0 border-r border-slate-800 z-20 transition-all duration-300 shadow-2xl">
      <div className="p-6 flex items-center gap-3 border-b border-slate-800">
        <img 
          src="https://ppk2ipe.unair.ac.id/gambar/UNAIR_BRANDMARK_2025-02.png" 
          alt="UNAIR Logo" 
          className="h-12 w-auto object-contain bg-white/10 rounded-lg p-1"
        />
        <div>
          <h1 className="text-white font-bold text-lg leading-tight">Apps PDB</h1>
          <p className="text-xs text-slate-400">Pembelajaran Dasar Bersama</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-6 space-y-1">
        <div className="px-4 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Main
        </div>
        
        {/* Dashboard Link */}
        <a
          href="#"
          onClick={(e) => handleLinkClick(e, null)}
          className={`w-full flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors ${
            activeModule === null 
              ? 'bg-blue-600/10 text-blue-400 border-r-2 border-blue-500' 
              : 'hover:bg-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <Home size={18} />
          Dashboard Overview
        </a>
        
        <div className="mt-8 px-4 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Applications
        </div>
        
        {/* App Links */}
        {modules.map((app) => {
          const Icon = getIcon(app.icon);
          return (
            <a
              key={app.id}
              href={app.externalUrl || `#${app.id}`}
              target={app.externalUrl ? "_blank" : "_self"}
              rel={app.externalUrl ? "noopener noreferrer" : undefined}
              onClick={(e) => !app.externalUrl && handleLinkClick(e, app.id)}
              className={`w-full flex items-center justify-between px-6 py-3 text-sm font-medium transition-colors group ${
                activeModule === app.id
                  ? 'bg-slate-800 text-white'
                  : 'hover:bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-3">
                <Icon size={18} className={activeModule === app.id ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-300'} />
                {app.name}
              </span>
              {activeModule === app.id && <ChevronRight size={14} className="text-blue-400" />}
            </a>
          );
        })}
      </nav>

      {/* Footer removed as requested (Sign Out button gone) */}
      <div className="p-4 border-t border-slate-800 text-center text-xs text-slate-600">
        &copy; 2024 Apps PDB Unair
      </div>
    </div>
  );
};
