import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Lock, AlertCircle, ArrowRight } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useData();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      setError('');
    } else {
      setError('Password salah. Coba "112233"');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-200">
        <div className="flex justify-center mb-6">
          <div className="bg-blue-100 p-4 rounded-full">
            <Lock className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-center text-[#0a1e3f] mb-2">Admin Access</h2>
        <p className="text-slate-500 text-center mb-8">Masukkan password untuk mengelola konten.</p>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="••••••••"
            />
          </div>
          
          {error && (
            <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg">
              <AlertCircle size={16} />
              {error}
            </div>
          )}
          
          <button
            type="submit"
            className="w-full bg-[#0a1e3f] hover:bg-blue-900 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 group"
          >
            Masuk Dashboard
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <button 
            onClick={() => window.location.hash = 'dashboard'}
            className="text-slate-400 text-sm hover:text-slate-600"
          >
            Kembali ke Aplikasi
          </button>
        </div>
      </div>
    </div>
  );
};