
import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { AppViewer } from './components/AppViewer';
import { LandingPage } from './components/LandingPage';
import { APP_MODULES, MOCK_USER } from './constants';
import { Search } from 'lucide-react';

const App: React.FC = () => {
  // Determine initial state based on current URL hash
  const getInitialLandingState = () => {
    const hash = window.location.hash.replace('#', '');
    // If we have a hash like 'dashboard' or a module id, skip landing page
    return hash === '' || hash === '/'; 
  };

  const getInitialActiveModule = () => {
    const hash = window.location.hash.replace('#', '');
    const moduleExists = APP_MODULES.find(m => m.id === hash);
    return moduleExists ? hash : null;
  };

  // State for showing Landing Page vs Main App
  const [showLanding, setShowLanding] = useState(getInitialLandingState);

  // Navigation State
  // null = Dashboard, 'simpdb'/'helpdesk'/etc = specific apps
  const [activeModule, setActiveModule] = useState<string | null>(getInitialActiveModule);

  // Effect to handle URL Hash changes (Support for "Open in New Tab" & Back/Forward button)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      
      if (hash === '' || hash === '/') {
        // Root URL -> Show Landing Page
        setShowLanding(true);
        setActiveModule(null);
      } else if (hash === 'dashboard') {
        // #dashboard -> Show Main Dashboard, Hide Landing
        setShowLanding(false);
        setActiveModule(null);
      } else {
        // #moduleID -> Check if valid module
        const moduleExists = APP_MODULES.find(m => m.id === hash);
        
        if (moduleExists) {
          // Internal module
          if (!moduleExists.externalUrl) {
            setShowLanding(false);
            setActiveModule(hash);
          } 
          // Note: External URLs are usually handled by browser default behavior 
          // or opened in new tab, so they rarely hit this useEffect logic 
          // unless manually typed.
        } else {
          // Unknown hash -> default to dashboard or landing?
          // Let's default to dashboard if logged in (implied), or landing if not.
          // For this prototype, if unknown hash, go to dashboard if we were already inside, 
          // but to be safe, let's treat unknown hash as Landing Page to avoid errors.
           if (!showLanding) {
             // If already inside, stay inside (dashboard)
             setActiveModule(null);
           }
        }
      }
    };

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [showLanding]);

  const handleNavigate = (module: string | null) => {
    // Check if the selected module has an external URL
    if (module) {
      const selectedApp = APP_MODULES.find(m => m.id === module);
      if (selectedApp?.externalUrl) {
        window.open(selectedApp.externalUrl, '_blank');
        return;
      }
      // Update Hash for internal navigation
      window.location.hash = module;
    } else {
      // Navigate to Dashboard
      window.location.hash = 'dashboard';
    }
  };

  const handleEnterApp = () => {
    // When entering from Landing Page, set hash to dashboard
    // This triggers the hashchange event which updates the state
    window.location.hash = 'dashboard';
  };

  const currentApp = APP_MODULES.find(m => m.id === activeModule);

  // If showLanding is true, render the Landing Page
  if (showLanding) {
    return <LandingPage onEnter={handleEnterApp} />;
  }

  // Otherwise, render the Main App Layout
  return (
    <div className="flex h-screen bg-slate-100 font-sans text-slate-900 animate-fade-in">
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
