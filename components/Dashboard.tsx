
import React from 'react';
import { AppModule } from '../types';
import { Users, LifeBuoy, BookOpen, Activity, ArrowRight, ExternalLink, CalendarDays, Building2, Archive } from 'lucide-react';

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
    default: return ExternalLink;
  }
};

export const Dashboard: React.FC<DashboardProps> = ({ modules, onNavigate }) => {
  
  const handleCardClick = (e: React.MouseEvent, app: AppModule) => {
    if (!app.externalUrl) {
      e.preventDefault();
      onNavigate(app.id);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
         <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl font-bold mb-4">Welcome to Apps PDB</h2>
            <p className="text-blue-100 mb-8 text-lg">
              Portal layanan terintegrasi untuk Pembelajaran Dasar Bersama (PDB) Universitas Airlangga.
            </p>
            <a 
              href="#simpdb"
              onClick={(e) => { e.preventDefault(); onNavigate('simpdb'); }}
              className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors inline-flex items-center gap-2 cursor-pointer"
            >
              Go to SIMPDB Admin
              <ArrowRight size={18} />
            </a>
         </div>
         
         {/* Decorative circles */}
         <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl"></div>
         <div className="absolute bottom-0 right-20 -mb-20 w-60 h-60 bg-blue-400 opacity-20 rounded-full blur-2xl"></div>
      </div>

      <div>
        <h3 className="text-xl font-bold text-slate-800 mb-6">Your Applications</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((app) => {
            const Icon = getIcon(app.icon);
            return (
              <a 
                key={app.id}
                href={app.externalUrl || `#${app.id}`}
                target={app.externalUrl ? "_blank" : "_self"}
                rel={app.externalUrl ? "noopener noreferrer" : undefined}
                onClick={(e) => handleCardClick(e, app)}
                className="group bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all cursor-pointer relative overflow-hidden h-full flex flex-col block"
              >
                <div className={`absolute top-0 right-0 p-3 opacity-10 group-hover:scale-110 transition-transform duration-500`}>
                   <Icon size={120} />
                </div>
                
                <div className="relative z-10 flex-1">
                  <div className={`w-12 h-12 rounded-xl ${app.color} text-white flex items-center justify-center mb-4 shadow-md`}>
                    <Icon size={24} />
                  </div>
                  <h4 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors mb-2">
                    {app.name}
                  </h4>
                  <p className="text-slate-500 text-sm mb-6 line-clamp-2">
                    {app.description}
                  </p>
                </div>
                  
                <div className="relative z-10 flex items-center justify-between mt-auto">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide
                    ${app.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'}
                  `}>
                    {app.status}
                  </span>
                  <span className="text-blue-600 font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                    Access <ArrowRight size={16} />
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
