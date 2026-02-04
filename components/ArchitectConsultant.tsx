import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { sendMessageToGemini, ChatMessage } from '../services/geminiService';
import { useData } from '../context/DataContext';

export const ArchitectConsultant: React.FC = () => {
  const { landingContent } = useData();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Halo! Saya asisten virtual PDB. Ada yang bisa saya bantu mengenai jadwal, aplikasi, atau informasi PDB lainnya?' }
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setIsLoading(true);

    // Add user message
    const newMessages = [...messages, { role: 'user', text: userMsg } as ChatMessage];
    setMessages(newMessages);

    // Call API with the key from Context (if configured by admin)
    try {
      const responseText = await sendMessageToGemini(
        userMsg, 
        newMessages, 
        landingContent.googleApiKey
      );
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Maaf, terjadi kesalahan koneksi." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl w-80 sm:w-96 flex flex-col mb-4 border border-slate-200 overflow-hidden animate-fade-in-up transition-all h-[500px]">
          {/* Header */}
          <div className="bg-[#0a1e3f] p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-3">
              <div className="bg-amber-400 p-1.5 rounded-lg text-[#0a1e3f]">
                <Bot size={20} />
              </div>
              <div>
                <h3 className="font-bold text-sm">PDB Assistant</h3>
                <p className="text-[10px] text-amber-200 flex items-center gap-1">
                  <Sparkles size={8} /> Powered by Gemini
                </p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-slate-300 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-blue-100 text-blue-600' : 'bg-amber-100 text-amber-600'}`}>
                  {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                </div>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none' 
                    : 'bg-white text-slate-700 border border-slate-200 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                  <Bot size={14} />
                </div>
                <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-slate-200 shadow-sm flex items-center gap-2 text-slate-500 text-xs">
                  <Loader2 size={12} className="animate-spin" /> Sedang berpikir...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-100 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tanya sesuatu..."
              className="flex-1 bg-slate-100 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <button 
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-[#0a1e3f] text-white p-2.5 rounded-xl hover:bg-blue-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`bg-[#0a1e3f] text-white p-4 rounded-full shadow-lg hover:bg-blue-900 transition-all duration-300 hover:scale-110 flex items-center justify-center group relative ${isOpen ? 'rotate-90 opacity-0 pointer-events-none absolute' : 'opacity-100'}`}
      >
        <MessageCircle size={28} />
        {/* Notification Dot */}
        <span className="absolute top-0 right-0 w-3 h-3 bg-amber-400 rounded-full border-2 border-[#0a1e3f]"></span>
      </button>

      {isOpen && (
         <button
          onClick={() => setIsOpen(false)}
          className="bg-amber-400 text-[#0a1e3f] p-4 rounded-full shadow-lg hover:bg-amber-500 transition-all duration-300 hover:rotate-90 flex items-center justify-center"
        >
          <X size={28} />
        </button>
      )}
    </div>
  );
};