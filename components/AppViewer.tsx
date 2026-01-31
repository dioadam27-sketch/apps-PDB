import React from 'react';
import { AppModule } from '../types';
import { ArrowLeft, ExternalLink, RefreshCw } from 'lucide-react';

interface AppViewerProps {
  app: AppModule;
  onBack: () => void;
}

export const AppViewer: React.FC<AppViewerProps> = ({ app, onBack }) => {
  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden animate-fade-in">
      {/* App Header Bar - Simulating a browser or internal frame header */}
      <div className="bg-slate-50 border-b border-slate-200 p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-slate-200 rounded-full text-slate-500 transition-colors"
            title="Back to Dashboard"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex flex-col">
            <h2 className="text-lg font-bold text-slate-800">{app.name}</h2>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Secure Connection • SSO Authenticated
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 text-slate-400 hover:text-slate-600">
            <RefreshCw size={18} />
          </button>
          <button className="p-2 text-slate-400 hover:text-slate-600">
            <ExternalLink size={18} />
          </button>
        </div>
      </div>

      {/* Iframe Placeholder */}
      <div className="flex-1 bg-slate-100 relative flex flex-col items-center justify-center p-8 text-center">
        <div className="bg-white p-8 rounded-2xl shadow-sm max-w-lg w-full border border-slate-200">
            <div className={`w-16 h-16 rounded-2xl ${app.color} flex items-center justify-center mx-auto mb-6 shadow-lg`}>
              {/* Dynamic Icon would go here, simplified for this view */}
              <span className="text-white font-bold text-2xl">{app.name.charAt(0)}</span>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Application Loaded</h3>
            <p className="text-slate-500 mb-6">
              This is a placeholder for the <strong>{app.name}</strong> module. 
              In a production environment, this area would render the actual application via Micro-frontend federation or an iframe with SSO token exchange.
            </p>
            
            <div className="bg-slate-50 rounded-lg p-4 text-left border border-slate-200 font-mono text-xs text-slate-600 mb-6">
              <div className="flex justify-between mb-2">
                <span>SESSION_ID:</span>
                <span className="text-blue-600">sess_89237489234</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>USER:</span>
                <span className="text-emerald-600">dr.budi@unair.ac.id</span>
              </div>
              <div className="flex justify-between">
                <span>SCOPE:</span>
                <span className="text-purple-600">{app.id}:read {app.id}:write</span>
              </div>
            </div>

            <button className="w-full bg-slate-900 text-white py-3 rounded-xl hover:bg-slate-800 transition-colors font-medium">
               Launch Full Screen
            </button>
        </div>
        
        <p className="mt-8 text-slate-400 text-sm">
          Unair Integrated Workspace Prototype v1.0
        </p>
      </div>
    </div>
  );
};
