import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AppModule, LandingContent } from '../types';
import { APP_MODULES as INITIAL_MODULES, DEFAULT_LANDING_CONTENT } from '../constants';

interface DataContextType {
  // --- PUBLIC DATA (LIVE) ---
  modules: AppModule[];
  landingContent: LandingContent;
  
  // --- ADMIN DATA (DRAFT) ---
  draftModules: AppModule[];
  draftContent: LandingContent;
  
  // --- ACTIONS ---
  updateDraftModule: (updatedModule: AppModule) => void;
  addDraftModule: (newModule: AppModule) => void;
  deleteDraftModule: (moduleId: string) => void;
  updateDraftContent: (content: LandingContent) => void;
  
  // --- PUBLISHING ---
  publishChanges: () => Promise<void>;
  discardChanges: () => void;
  hasUnsavedChanges: boolean;

  // --- CONFIG ---
  apiUrl: string;
  updateApiUrl: (url: string) => void;

  // --- AUTH ---
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  resetData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Default URL if not set in LocalStorage
const DEFAULT_API_URL = 'https://pkkii.pendidikan.unair.ac.id/website/webapi.php';

// Keys for Local Storage
const STORAGE_KEYS = {
  DRAFT_MODULES: 'pdb_draft_modules',
  DRAFT_CONTENT: 'pdb_draft_content',
  AUTH: 'pdb_admin_auth',
  API_URL: 'pdb_api_endpoint' // New key for dynamic API URL
};

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  
  const loadData = <T,>(key: string, fallback: T): T => {
    try {
      const saved = localStorage.getItem(key);
      if (saved) return JSON.parse(saved);
      return fallback;
    } catch (e) {
      console.error(`Error loading ${key}`, e);
      return fallback;
    }
  };

  // --- API CONFIG STATE ---
  const [apiUrl, setApiUrl] = useState<string>(() => {
      return localStorage.getItem(STORAGE_KEYS.API_URL) || DEFAULT_API_URL;
  });

  const updateApiUrl = (url: string) => {
      setApiUrl(url);
      localStorage.setItem(STORAGE_KEYS.API_URL, url);
      // We need to reload to ensure all components fetch from the new URL
      setTimeout(() => window.location.reload(), 500);
  };

  // Live State (Fetched from API, defaults to Constants)
  const [liveModules, setLiveModules] = useState<AppModule[]>(INITIAL_MODULES);
  const [liveContent, setLiveContent] = useState<LandingContent>(DEFAULT_LANDING_CONTENT);

  // Draft State (What admin edits, persists in LocalStorage)
  const [draftModules, setDraftModules] = useState<AppModule[]>(() => loadData(STORAGE_KEYS.DRAFT_MODULES, INITIAL_MODULES));
  const [draftContent, setDraftContent] = useState<LandingContent>(() => loadData(STORAGE_KEYS.DRAFT_CONTENT, DEFAULT_LANDING_CONTENT));

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem(STORAGE_KEYS.AUTH) === 'true';
  });

  // Fetch Live Data from Server on Mount
  useEffect(() => {
    const fetchLiveData = async () => {
        try {
            const response = await fetch(apiUrl + '?t=' + Date.now()); // use dynamic apiUrl
            if (response.ok) {
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.indexOf("application/json") !== -1) {
                    const data = await response.json();
                    
                    if (data.modules && Array.isArray(data.modules)) {
                        setLiveModules(data.modules);
                    }
                    if (data.landingContent) {
                        setLiveContent(data.landingContent);
                    }

                    // If drafts are empty (first run), sync with live
                    if (!localStorage.getItem(STORAGE_KEYS.DRAFT_MODULES)) {
                        setDraftModules(data.modules || INITIAL_MODULES);
                    }
                    if (!localStorage.getItem(STORAGE_KEYS.DRAFT_CONTENT)) {
                        setDraftContent(data.landingContent || DEFAULT_LANDING_CONTENT);
                    }
                }
            } else {
                console.warn("API unavailable, using default data.");
            }
        } catch (error) {
            console.warn("Offline mode or API error:", error);
        }
    };
    
    fetchLiveData();
  }, [apiUrl]); // Re-fetch if apiUrl changes

  // Change Detection
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    const modulesChanged = JSON.stringify(liveModules) !== JSON.stringify(draftModules);
    const contentChanged = JSON.stringify(liveContent) !== JSON.stringify(draftContent);
    setHasUnsavedChanges(modulesChanged || contentChanged);
  }, [liveModules, liveContent, draftModules, draftContent]);

  // Persist Drafts Automatically
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DRAFT_MODULES, JSON.stringify(draftModules));
    localStorage.setItem(STORAGE_KEYS.DRAFT_CONTENT, JSON.stringify(draftContent));
  }, [draftModules, draftContent]);

  // Admin Actions
  const updateDraftModule = (updatedModule: AppModule) => {
    setDraftModules(prev => prev.map(m => m.id === updatedModule.id ? updatedModule : m));
  };

  const addDraftModule = (newModule: AppModule) => {
    setDraftModules(prev => [...prev, newModule]);
  };

  const deleteDraftModule = (moduleId: string) => {
    setDraftModules(prev => prev.filter(m => m.id !== moduleId));
  };

  const updateDraftContent = (content: LandingContent) => {
    setDraftContent(content);
  };

  // Publishing Logic (Commit Draft to Live DB)
  const publishChanges = async () => {
    const payload = {
        modules: draftModules,
        landingContent: draftContent
    };

    try {
        const response = await fetch(apiUrl, { // use dynamic apiUrl
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        
        // Handle non-JSON responses (like HTML errors)
        const text = await response.text();
        let result;
        try {
            result = JSON.parse(text);
        } catch (e) {
            throw new Error(`Server returned invalid JSON: ${text.substring(0, 100)}...`);
        }

        if (result.success) {
            setLiveModules(draftModules);
            setLiveContent(draftContent);
        } else {
            alert("Gagal menyimpan ke database: " + (result.error || 'Unknown error'));
        }
    } catch (error) {
        console.error("Publish error:", error);
        alert(`Terjadi kesalahan koneksi ke ${apiUrl}. Pastikan file ada di server.`);
    }
  };

  const discardChanges = () => {
    setDraftModules(liveModules);
    setDraftContent(liveContent);
  };

  // Auth Logic
  const login = (password: string) => {
    if (password === '112233') {
      setIsAuthenticated(true);
      localStorage.setItem(STORAGE_KEYS.AUTH, 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.setItem(STORAGE_KEYS.AUTH, 'false');
    window.location.hash = 'dashboard';
  };

  const resetData = () => {
    setDraftModules(INITIAL_MODULES);
    setDraftContent(DEFAULT_LANDING_CONTENT);
    localStorage.setItem(STORAGE_KEYS.DRAFT_MODULES, JSON.stringify(INITIAL_MODULES));
    localStorage.setItem(STORAGE_KEYS.DRAFT_CONTENT, JSON.stringify(DEFAULT_LANDING_CONTENT));
    window.location.reload();
  };

  return (
    <DataContext.Provider value={{ 
      modules: liveModules, 
      landingContent: liveContent,
      draftModules,
      draftContent,
      updateDraftModule, 
      addDraftModule, 
      deleteDraftModule, 
      updateDraftContent, 
      publishChanges,
      discardChanges,
      hasUnsavedChanges,
      apiUrl,
      updateApiUrl,
      isAuthenticated, 
      login, 
      logout, 
      resetData 
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};