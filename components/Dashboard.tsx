import React from 'react';
import { AppModule } from '../types';
import { Users, LifeBuoy, BookOpen, Activity, ArrowRight, ExternalLink, CalendarDays, Building2, Archive, Grid } from 'lucide-react';

interface DashboardProps {
  modules: AppModule[];
  onNavigate: (moduleId: string) => void;
}

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'Users': return Users;
    case 'LifeBuoy': return LifeBuoy;
    case 'Activity': return Activity;
    case 'BookOpen': return BookOpen;
    case 'CalendarDays': return CalendarDays;
    case 'Building2': return Building2;
    case 'Archive': return Archive;
    default: return Grid;
  }
};

export const Dashboard: React.FC<DashboardProps> = ({ modules, onNavigate }) => {
  
  const handleCardClick = (e: React.MouseEvent, app: AppModule) => {
    if (!app.externalUrl) {
      e.preventDefault();
      onNavigate(app.id);
    }
  };

  // Filter visible modules
  const visibleModules = modules.filter(m => m.visible !== false);

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Welcome Banner with Glass Effect */}
      <div className="group bg-gradient-to-r from-[#0a1e3f] to-[#1e3a8a] rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl border-t-4 border-amber-400 transition-all hover:shadow-blue-900/30">
         <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl font-bold mb-4">Welcome to Apps PDB</h2>
            <p className="text-blue-100 mb-8 text-lg">
              Portal layanan terintegrasi untuk Pembelajaran Dasar Bersama (PDB) Universitas Airlangga.
            </p>
            <a 
              href="#simpdb"
              onClick={(e) => { e.preventDefault(); onNavigate('simpdb'); }}
              className="bg-amber-400 text-[#0a1e3f] px-6 py-3 rounded-xl font-bold hover:bg-amber-500 transition-all inline-flex items-center gap-2 cursor-pointer shadow-lg hover:shadow-amber-400/50 hover:-translate-y-1"
            >
              Go to SIMPDB Admin
              <ArrowRight size={18} />
            </a>
         </div>
         
         {/* Decorative animated circles */}
         <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-white opacity-5 rounded-full blur-3xl animate-pulse"></div>
         <div className="absolute bottom-0 right-20 -mb-20 w-60 h-60 bg-amber-400 opacity-20 rounded-full blur-3xl animate-float-delayed"></div>
      </div>

      <div>
        <h3 className="text-xl font-bold text-[#0a1e3f] mb-6 flex items-center gap-2">
          <span className="w-2 h-8 bg-amber-400 rounded-full"></span>
          Your Applications
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleModules.map((app) => {
            const Icon = getIcon(app.icon);
            return (
              <a 
                key={app.id}
                href={app.externalUrl || `#${app.id}`}
                target={app.externalUrl ? "_blank" : "_self"}
                rel={app.externalUrl ? "noopener noreferrer" : undefined}
                onClick={(e) => handleCardClick(e, app)}
                className="group bg-white rounded-2xl p-6 border border-slate-200 shadow-md hover:shadow-2xl hover:border-amber-200 transition-all duration-300 cursor-pointer relative overflow-hidden h-full flex flex-col block hover:-translate-y-2"
              >
                {/* Decorative Background Icon */}
                <div className={`absolute -right-4 -top-4 p-3 opacity-5 group-hover:opacity-10 transition-opacity duration-500 text-[#0a1e3f] rotate-12 group-hover:rotate-45 group-hover:scale-150`}>
                   <Icon size={140} />
                </div>
                
                <div className="relative z-10 flex-1">
                  <div className={`w-14 h-14 rounded-2xl ${app.color} text-white flex items-center justify-center mb-5 shadow-lg shadow-gray-200 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                    <Icon size={28} />
                  </div>
                  <h4 className="text-xl font-bold text-[#0a1e3f] group-hover:text-blue-700 transition-colors mb-2">
                    {app.name}
                  </h4>
                  <p className="text-slate-500 text-sm mb-6 line-clamp-2 leading-relaxed">
                    {app.description}
                  </p>
                </div>
                  
                <div className="relative z-10 flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide
                    ${app.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 
                      app.status === 'beta' ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'}
                  `}>
                    {app.status}
                  </span>
                  <span className="text-amber-500 font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                    Access <ArrowRight size={16} className="group-hover:translate-x-1" />
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};