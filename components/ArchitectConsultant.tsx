
import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Cpu, Sparkles } from 'lucide-react';
import { generateArchitectAdvice } from '../services/geminiService';
import { ChatMessage } from '../types';

export const ArchitectConsultant: React.FC = () => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initial prompt based on user's original request
  useEffect(() => {
    const initialQuery = "Bisa tidak aplikasi yang sudah saya buat dijadikan satu atau single sign on, copy of SIMPDB Admin, Helpdesk PDB, PHL PDB, Unair Digital Repository?";
    
    // Check if we already have messages to prevent double fetch on strict mode
    if (messages.length === 0) {
       handleInitialConsultation(initialQuery);
    }
  }, []);

  const handleInitialConsultation = async (text: string) => {
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: text,
      timestamp: new Date()
    };
    setMessages([userMsg]);
    setIsTyping(true);

    const response = await generateArchitectAdvice(text);
    
    const aiMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: response,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, aiMsg]);
    setIsTyping(false);
  };

  const handleSend = async () => {
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: query,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setQuery('');
    setIsTyping(true);

    const response = await generateArchitectAdvice(query);

    const aiMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: response,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, aiMsg]);
    setIsTyping(false);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="bg-gradient-to-r from-[#0a1e3f] to-[#1e3a8a] p-6 flex items-center justify-between text-white border-b-4 border-amber-400">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            System Architect Consultant
          </h2>
          <p className="text-blue-100 text-sm mt-1">
            Powered by Gemini 3.0 • Ask about integration & architecture
          </p>
        </div>
        <Cpu className="w-8 h-8 opacity-20" />
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-4 max-w-3xl ${
              msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''
            }`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                msg.role === 'user' ? 'bg-slate-200' : 'bg-blue-100'
              }`}
            >
              {msg.role === 'user' ? (
                <User size={20} className="text-slate-600" />
              ) : (
                <Bot size={20} className="text-[#0a1e3f]" />
              )}
            </div>
            <div
              className={`p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap shadow-sm ${
                msg.role === 'user'
                  ? 'bg-[#0a1e3f] text-white rounded-tr-none'
                  : 'bg-white text-slate-700 border border-slate-200 rounded-tl-none'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex items-start gap-4">
             <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
               <Bot size={20} className="text-[#0a1e3f]" />
             </div>
             <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-200 shadow-sm flex items-center gap-2">
               <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
               <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
               <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
             </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-white border-t border-slate-200">
        <div className="flex items-center gap-3 max-w-4xl mx-auto">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask a question about system integration..."
            className="flex-1 px-4 py-3 bg-slate-100 border-0 rounded-xl focus:ring-2 focus:ring-[#0a1e3f] focus:bg-white transition-all outline-none text-slate-700"
          />
          <button
            onClick={handleSend}
            disabled={!query.trim() || isTyping}
            className="p-3 bg-[#0a1e3f] text-white rounded-xl hover:bg-blue-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
