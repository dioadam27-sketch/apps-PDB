import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { AppViewer } from './components/AppViewer';
import { LandingPage } from './components/LandingPage';
import { AdminLogin } from './components/AdminLogin';
import { AdminPanel } from './components/AdminPanel';
import { Search } from 'lucide-react';
import { DataProvider, useData } from './context/DataContext';
import { ArchitectConsultant } from './components/ArchitectConsultant';

const AppContent: React.FC = () => {
  const { modules, isAuthenticated } = useData();
  
  // Helper to parse hash
  const getHash = () => {
    const hash = window.location.hash.replace('#', '');
    return hash.split('?')[0]; // Remove query params for matching
  };

  const [currentHash, setCurrentHash] = useState(getHash());
  
  // Sync state with URL hash
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(getHash());
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // --- ROUTING LOGIC ---

  // 1. Landing Page (Root)
  if (currentHash === '' || currentHash === '/') {
    return (
      <>
        <LandingPage onEnter={() => window.location.hash = 'dashboard'} />
        <ArchitectConsultant />
      </>
    );
  }

  // 2. Admin Routes (Full Screen, High Z-Index)
  // Check for 'admin' or 'login' explicitly
  if (currentHash === 'admin' || currentHash === 'login') {
    if (!isAuthenticated) {
      return (
        <div className="fixed inset-0 z-50 bg-slate-100 flex items-center justify-center animate-fade-in">
           <AdminLogin />
        </div>
      );
    }
    return (
       <div className="fixed inset-0 z-50 bg-slate-50 overflow-auto animate-fade-in">
          <AdminPanel />
       </div>
    );
  }

  // 3. Main App Layout (Sidebar + Content)
  // Determine if we are viewing a specific app or the dashboard
  const activeModuleId = (currentHash !== 'dashboard') ? currentHash : null;
  const currentApp = modules.find(m => m.id === activeModuleId);

  const handleNavigate = (module: string | null) => {
    if (module) {
      const selectedApp = modules.find(m => m.id === module);
      if (selectedApp?.externalUrl) {
        window.open(selectedApp.externalUrl, '_blank');
        return;
      }
      window.location.hash = module;
    } else {
      window.location.hash = 'dashboard';
    }
  };

  return (
    <>
      <div className="flex h-screen bg-slate-100 font-sans text-slate-900 animate-fade-in">
        <Sidebar 
          activeModule={activeModuleId} 
          onNavigate={handleNavigate} 
          modules={modules} 
        />

        <div className="flex-1 ml-64 flex flex-col h-screen overflow-hidden">
          <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 z-10 flex-shrink-0">
            <div className="flex items-center gap-4 flex-1">
               <div className="relative w-96">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="Cari layanan (misal: 'Dosen Baru', 'Jurnal')" 
                    className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
                  />
               </div>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-8">
            <div className="max-w-7xl mx-auto">
              {!currentApp ? (
                <Dashboard modules={modules} onNavigate={handleNavigate} />
              ) : (
                <AppViewer app={currentApp} onBack={() => handleNavigate(null)} />
              )}
            </div>
          </main>
          
        </div>
      </div>
      <ArchitectConsultant />
    </>
  );
};

const App: React.FC = () => {
  return (
    <DataProvider>
      <AppContent />
    </DataProvider>
  );
};

export default App;