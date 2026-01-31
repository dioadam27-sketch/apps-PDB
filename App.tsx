
import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { AppViewer } from './components/AppViewer';
import { APP_MODULES, MOCK_USER } from './constants';
import { Search } from 'lucide-react';

const App: React.FC = () => {
  // Navigation State
  // null = Dashboard, 'simpdb'/'helpdesk'/etc = specific apps
  const [activeModule, setActiveModule] = useState<string | null>(null);

  // Effect to handle URL Hash changes (Support for "Open in New Tab")
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (!hash) {
        setActiveModule(null);
        return;
      }
      
      const moduleExists = APP_MODULES.find(m => m.id === hash);
      if (moduleExists && !moduleExists.externalUrl) {
        setActiveModule(hash);
      }
    };

    // Check on initial load
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (module: string | null) => {
    // Check if the selected module has an external URL
    if (module) {
      const selectedApp = APP_MODULES.find(m => m.id === module);
      if (selectedApp?.externalUrl) {
        window.open(selectedApp.externalUrl, '_blank');
        return;
      }
      // Update Hash for internal navigation (makes browser back button work naturally)
      window.location.hash = module;
    } else {
      // Clear hash for dashboard
      history.pushState("", document.title, window.location.pathname + window.location.search);
      setActiveModule(null);
    }
  };

  const currentApp = APP_MODULES.find(m => m.id === activeModule);

  return (
    <div className="flex h-screen bg-slate-100 font-sans text-slate-900">
      {/* Sidebar */}
      <Sidebar 
        activeModule={activeModule} 
        onNavigate={handleNavigate} 
        modules={APP_MODULES} 
      />

      {/* Main Content Area */}
      <div className="flex-1 ml-64 flex flex-col h-screen overflow-hidden">
        
        {/* Top Header - Simplified (No User Profile) */}
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

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            {activeModule === null && (
              <Dashboard modules={APP_MODULES} onNavigate={handleNavigate} />
            )}

            {currentApp && (
              <AppViewer app={currentApp} onBack={() => handleNavigate(null)} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
