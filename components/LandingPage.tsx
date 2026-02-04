import React, { useEffect, useState } from 'react';
import { ArrowRight, ShieldCheck, Flag, HeartHandshake, Users, Star, ExternalLink, Lock, CheckCircle, Image as ImageIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { useData } from '../context/DataContext';
import { LandingSection } from '../types';

interface LandingPageProps {
  onEnter: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnter }) => {
  const { landingContent } = useData();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto Slider Logic
  useEffect(() => {
    if (!landingContent.slides || landingContent.slides.length === 0) return;
    
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % landingContent.slides.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(timer);
  }, [landingContent.slides]);

  const nextSlide = () => {
     if (!landingContent.slides) return;
     setCurrentSlide(prev => (prev + 1) % landingContent.slides.length);
  };

  const prevSlide = () => {
     if (!landingContent.slides) return;
     setCurrentSlide(prev => (prev === 0 ? landingContent.slides.length - 1 : prev - 1));
  };
  
  // Logic to handle Scroll Animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { 
        threshold: 0.1, 
        rootMargin: "0px 0px -50px 0px"
      } 
    );

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [landingContent]);

  const handleAdminClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.hash = 'admin';
  };

  // --- RENDER HELPERS FOR DIFFERENT VARIANTS ---

  const renderVideo = (url: string) => (
    <div className="w-full max-w-4xl mx-auto mt-8 md:mt-12 relative group reveal-on-scroll delay-300">
      <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-amber-400 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
      <div className="relative overflow-hidden rounded-2xl shadow-2xl border-2 md:border-4 border-white bg-black">
        <div className="relative pb-[56.25%] h-0">
          <iframe 
            className="absolute top-0 left-0 w-full h-full border-0"
            src={url}
            title="Video Content" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerPolicy="strict-origin-when-cross-origin" 
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );

  const renderSection = (section: LandingSection, index: number) => {
    if (!section.isVisible) return null;

    // VARIANT 1: DEFAULT (White Background, Centered, Good for Text + Video)
    if (section.variant === 'default') {
      return (
        <div key={section.id} className={`relative z-20 ${index === 0 ? '-mt-20 md:-mt-32 rounded-t-[2.5rem] md:rounded-t-[4rem] shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.3)] pt-12 md:pt-20 pb-12 md:pb-24 border-t-0' : 'py-16 md:py-24 border-t border-slate-100'} bg-white`}>
           <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8 md:mb-16 reveal-on-scroll">
                 {section.subtitle && (
                   <span className="text-amber-500 font-bold tracking-widest text-xs md:text-sm uppercase bg-amber-50 px-3 py-1 rounded-full mb-4 inline-block">{section.subtitle}</span>
                 )}
                 <h2 className="text-2xl md:text-3xl lg:text-5xl font-extrabold text-[#0a1e3f]">{section.title}</h2>
                 <div className="w-16 md:w-24 h-2 bg-gradient-to-r from-amber-400 to-yellow-500 mx-auto mt-4 md:mt-6 rounded-full"></div>
              </div>

              <div className="text-slate-600 text-base md:text-lg leading-loose space-y-6 md:space-y-8">
                 <p className="text-justify whitespace-pre-line reveal-on-scroll delay-100">
                   {section.content}
                 </p>
                 
                 {/* Optional Features Card specific to PDB-style content, we render it if it's the first section or keyword match */}
                 {section.content.includes("karakter") && (
                   <div className="reveal-on-scroll delay-200 bg-gradient-to-br from-slate-50 to-slate-100 p-6 md:p-12 rounded-2xl md:rounded-[2rem] border border-slate-200 shadow-xl relative overflow-hidden group hover:border-amber-200 transition-all duration-500">
                     <p className="text-[#0a1e3f] text-lg md:text-xl font-medium mb-6 text-center">
                       Menanamkan karakter unggul kepada mahasiswa:
                     </p>
                     <div className="flex flex-wrap gap-2 md:gap-4 justify-center">
                        {['Humble', 'Excellence', 'Brave', 'Agile', 'Transcendental'].map((val, idx) => (
                          <div key={val} className="flex items-center gap-1 md:gap-2 bg-white px-3 py-2 md:px-6 md:py-3 rounded-xl md:rounded-2xl shadow-sm border border-slate-100 text-[#0a1e3f] text-sm md:text-base font-bold">
                            <Star size={14} className="text-amber-400 fill-amber-400" /> {val}
                          </div>
                        ))}
                     </div>
                   </div>
                 )}

                 {section.videoUrl && renderVideo(section.videoUrl)}
                 {section.videoUrl2 && renderVideo(section.videoUrl2)}

                 {section.linkUrl && (
                   <div className="text-center mt-8">
                      <a href={section.linkUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-[#0a1e3f] text-white px-6 py-3 rounded-full font-bold hover:bg-blue-900 transition-colors">
                        {section.linkText || "Selengkapnya"} <ExternalLink size={16} />
                      </a>
                   </div>
                 )}
              </div>
           </div>
        </div>
      );
    }

    // VARIANT 2: ACCENT (Colored/Gradient Background, Good for National)
    if (section.variant === 'accent') {
      return (
        <div key={section.id} className="py-16 md:py-24 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
             <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-red-100 bg-gradient-to-br from-red-50 via-white to-white p-8 md:p-16 reveal-on-scroll group text-center">
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-red-600 via-red-500 to-red-600 shadow-md"></div>
                <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-red-500 rounded-full blur-[100px] opacity-10 pointer-events-none"></div>

                <div className="relative z-10 max-w-4xl mx-auto">
                    <h3 className="text-2xl md:text-4xl font-extrabold text-[#0a1e3f] mb-8 leading-tight">
                      {section.title}
                    </h3>
                    <div className="space-y-6 md:space-y-8 text-slate-700 text-base md:text-xl leading-relaxed whitespace-pre-line">
                       {section.content}
                    </div>
                    {section.videoUrl && renderVideo(section.videoUrl)}
                    {section.linkUrl && (
                       <div className="mt-8">
                          <a href={section.linkUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-6 py-3 border-2 border-red-600 text-red-600 rounded-full font-bold hover:bg-red-600 hover:text-white transition-all">
                            {section.linkText || "Pelajari Lebih Lanjut"} <ArrowRight size={18} />
                          </a>
                       </div>
                    )}
                </div>
             </div>
          </div>
        </div>
      );
    }

    // VARIANT 3: SPLIT (Two Column, Good for AIL)
    if (section.variant === 'split') {
      return (
        <div key={section.id} className="bg-slate-50 py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')]"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="order-2 lg:order-1 space-y-6 md:space-y-8 reveal-on-scroll">
                 <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs uppercase tracking-wider">
                    <HeartHandshake size={16} />
                    <span>Informasi</span>
                 </div>
                 <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#0a1e3f] leading-tight">
                    {section.title}
                 </h2>
                 <div className="prose prose-lg text-slate-600 text-justify whitespace-pre-line">
                    {section.content}
                 </div>
                 {section.linkUrl && (
                    <div className="pt-2">
                       <a 
                         href={section.linkUrl}
                         target="_blank"
                         rel="noopener noreferrer"
                         className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold text-sm md:text-base hover:bg-emerald-700 transition-all shadow-lg hover:shadow-emerald-600/30 hover:-translate-y-1 group"
                       >
                         {section.linkText || "Selengkapnya"} <ExternalLink size={18} className="group-hover:translate-x-1 transition-transform" />
                       </a>
                    </div>
                 )}
              </div>
              
              {/* Feature Card/Info Card */}
              <div className="order-1 lg:order-2 reveal-on-scroll delay-200">
                 <div className="relative">
                    <div className="absolute inset-0 bg-emerald-400/20 rounded-3xl transform rotate-6 scale-95 blur-sm"></div>
                    <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-emerald-100 relative overflow-hidden">
                       <h3 className="text-xl font-bold text-[#0a1e3f] mb-6 flex items-center gap-3">
                         <ShieldCheck className="text-emerald-500" size={28} />
                         Poin Penting
                       </h3>
                       <ul className="space-y-4">
                          {[
                            "Inklusivitas Akademik",
                            "Aksesibilitas Lingkungan",
                            "Dukungan Teknologi & Fasilitas",
                            "Kesetaraan Hak Pendidikan"
                          ].map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-slate-700 text-sm md:text-base">
                               <div className="min-w-1.5 mt-2 h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                               <span>{item}</span>
                            </li>
                          ))}
                       </ul>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 flex flex-col overflow-x-hidden">
      {/* Top Bar Decoration */}
      <div className="h-2 w-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 animate-gradient-text"></div>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-slate-100/50 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo Section */}
            <div className="flex items-center gap-2 md:gap-4 group cursor-pointer flex-1 min-w-0">
              <img 
                src="https://ppk2ipe.unair.ac.id/gambar/UNAIR_BRANDMARK_2025-02.png" 
                alt="UNAIR Logo" 
                className="h-10 w-auto md:h-14 object-contain transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110 flex-shrink-0"
              />
              <div className="border-l-2 border-slate-200 pl-2 md:pl-4 flex flex-col justify-center min-w-0">
                <h1 className="text-[10px] md:text-sm font-bold text-[#0a1e3f] leading-tight uppercase tracking-wide truncate">
                  Direktorat Pendidikan
                </h1>
                <p className="text-[8px] md:text-[10px] font-bold text-amber-500 tracking-wider group-hover:text-amber-600 transition-colors mt-0.5 leading-tight md:leading-snug line-clamp-2 md:max-w-[280px]">
                  SUB DIREKTORAT PENDIDIKAN KARAKTER, KEBANGSAAN, INKLUSI DAN INTERPROFESIONAL
                </p>
              </div>
            </div>

            {/* Login & Admin */}
            <div className="pl-2 flex-shrink-0 flex items-center gap-3">
              <button 
                onClick={handleAdminClick}
                className="p-2 text-slate-400 hover:text-[#0a1e3f] hover:bg-slate-100 rounded-full transition-all duration-300" 
                title="Admin Access"
              >
                 <Lock size={20} />
              </button>
              <a 
                href="https://unairsatu.unair.ac.id/site/login"
                className="relative overflow-hidden bg-[#0a1e3f] hover:bg-blue-900 text-white px-4 py-2 md:px-7 md:py-2.5 rounded-full font-bold text-xs md:text-sm transition-all shadow-lg hover:shadow-blue-900/40 flex items-center gap-2 transform hover:-translate-y-1 group"
              >
                <span className="relative z-10 flex items-center gap-1 md:gap-2">
                  <span>Login SSO</span> <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform md:w-4 md:h-4" />
                </span>
                <div className="absolute inset-0 h-full w-full scale-0 rounded-full transition-all duration-300 group-hover:scale-100 group-hover:bg-blue-800/50"></div>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Slider */}
      <div className="relative overflow-hidden flex flex-col justify-center min-h-[90vh] lg:min-h-[85vh] pt-12 pb-32 lg:pt-20 lg:pb-48">
        <div className="absolute inset-0 z-0">
          {/* Slider Images */}
          {landingContent.slides && landingContent.slides.length > 0 ? (
             landingContent.slides.map((slide, index) => (
                <div 
                  key={slide.id}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                >
                  <img src={slide.imageUrl} alt={slide.title} className="w-full h-full object-cover object-center" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0a1e3f]/95 via-[#0a1e3f]/80 to-blue-900/40"></div>
                </div>
             ))
          ) : (
             <>
              <img src="https://upkk.unair.ac.id/gambar/VB-6.jpg" alt="Background Gedung" className="w-full h-full object-cover object-center" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a1e3f]/95 via-[#0a1e3f]/90 to-blue-900/70"></div>
             </>
          )}
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        </div>
        
        {/* Navigation Arrows for Slider (Only if multiple slides) */}
        {landingContent.slides && landingContent.slides.length > 1 && (
           <>
              <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 p-2 rounded-full text-white backdrop-blur-sm transition-all">
                <ChevronLeft size={32} />
              </button>
              <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 p-2 rounded-full text-white backdrop-blur-sm transition-all">
                <ChevronRight size={32} />
              </button>
              {/* Dots */}
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                 {landingContent.slides.map((_, idx) => (
                    <button 
                      key={idx} 
                      onClick={() => setCurrentSlide(idx)}
                      className={`w-2 h-2 rounded-full transition-all ${idx === currentSlide ? 'w-8 bg-amber-400' : 'bg-white/50 hover:bg-white'}`}
                    />
                 ))}
              </div>
           </>
        )}
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full h-full flex flex-col justify-center">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="space-y-6 md:space-y-8 animate-fade-in-up text-center lg:text-left">
              <div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold text-white leading-tight mb-2 md:mb-4 tracking-tight drop-shadow-lg">
                  {landingContent.heroTitle} <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 animate-gradient-text">PKKII</span>
                </h2>
                <div className="inline-block text-left">
                    <p className="text-base sm:text-lg md:text-2xl text-blue-100 font-light border-l-4 border-amber-400 pl-4 md:pl-6 py-2 bg-white/5 rounded-r-xl backdrop-blur-sm">
                    {landingContent.heroSubtitle}
                    </p>
                </div>
              </div>

              <p className="text-blue-50 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 text-justify md:text-left font-light opacity-90">
                {landingContent.heroDescription}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2 md:pt-4 justify-center lg:justify-start">
                <button 
                  onClick={onEnter}
                  className="group relative px-6 py-3 md:px-8 md:py-4 bg-amber-400 text-[#0a1e3f] rounded-xl font-bold text-sm md:text-lg overflow-hidden transition-all shadow-[0_0_20px_rgba(251,191,36,0.4)] hover:shadow-[0_0_30px_rgba(251,191,36,0.6)] hover:-translate-y-1 w-full sm:w-auto"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    Masuk ke Apps PDB <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform md:w-5 md:h-5" />
                  </span>
                  <div className="absolute inset-0 bg-white/40 transform -skew-x-12 -translate-x-full group-hover:animate-shimmer-slide transition-transform"></div>
                </button>
              </div>
            </div>

            {/* Hero Grid - Static decorative element */}
            <div className="grid grid-cols-2 gap-3 md:gap-4 lg:gap-6 relative perspective-1000 mt-8 lg:mt-0">
               {/* Fixed decorative icons cards (Shield, Flag, Handshake, Users) - Keep as visual anchor */}
               <div className="space-y-3 md:space-y-4 lg:space-y-6 mt-6 md:mt-12">
                  <div className="reveal-on-scroll delay-100 bg-white/95 backdrop-blur-md p-4 md:p-6 rounded-2xl shadow-2xl border border-white/50 transform hover:scale-105 hover:-rotate-1 transition-all duration-300 group cursor-default">
                    <div className="bg-emerald-100 w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center mb-3 md:mb-4">
                       <ShieldCheck className="w-5 h-5 md:w-8 md:h-8 text-emerald-600" />
                    </div>
                    <h3 className="font-bold text-base md:text-xl text-[#0a1e3f]">Karakter</h3>
                  </div>
                  <div className="reveal-on-scroll delay-300 bg-white/95 backdrop-blur-md p-4 md:p-6 rounded-2xl shadow-2xl border border-white/50 transform hover:scale-105 hover:rotate-1 transition-all duration-300 group cursor-default">
                    <div className="bg-red-100 w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center mb-3 md:mb-4">
                       <Flag className="w-5 h-5 md:w-8 md:h-8 text-red-600" />
                    </div>
                    <h3 className="font-bold text-base md:text-xl text-[#0a1e3f]">Kebangsaan</h3>
                  </div>
               </div>
               <div className="space-y-3 md:space-y-4 lg:space-y-6">
                  <div className="reveal-on-scroll delay-200 bg-white/95 backdrop-blur-md p-4 md:p-6 rounded-2xl shadow-2xl border border-white/50 transform hover:scale-105 hover:-rotate-1 transition-all duration-300 group cursor-default">
                    <div className="bg-amber-100 w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center mb-3 md:mb-4">
                      <HeartHandshake className="w-5 h-5 md:w-8 md:h-8 text-amber-600" />
                    </div>
                    <h3 className="font-bold text-base md:text-xl text-[#0a1e3f]">Inklusi</h3>
                  </div>
                  <div className="reveal-on-scroll delay-400 bg-white/95 backdrop-blur-md p-4 md:p-6 rounded-2xl shadow-2xl border border-white/50 transform hover:scale-105 hover:rotate-1 transition-all duration-300 group cursor-default">
                    <div className="bg-blue-100 w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center mb-3 md:mb-4">
                       <Users className="w-5 h-5 md:w-8 md:h-8 text-blue-600" />
                    </div>
                    <h3 className="font-bold text-base md:text-xl text-[#0a1e3f]">Interprofesional</h3>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* DYNAMIC SECTIONS */}
      {landingContent.sections.map((section, index) => renderSection(section, index))}

      {/* GALLERY SECTION (NEW) */}
      {landingContent.gallery && landingContent.gallery.length > 0 && (
        <div className="py-16 md:py-24 bg-slate-900 text-white relative">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12 reveal-on-scroll">
                  <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Galeri Kegiatan</h2>
                  <div className="w-20 h-1.5 bg-amber-400 mx-auto rounded-full"></div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                 {landingContent.gallery.map((item, index) => (
                    <div 
                      key={item.id} 
                      className="group relative aspect-square overflow-hidden rounded-xl bg-slate-800 reveal-on-scroll"
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                       <img 
                         src={item.imageUrl} 
                         alt={item.caption} 
                         className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                       />
                       <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                          <p className="text-white text-center font-bold text-sm md:text-base translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                             {item.caption}
                          </p>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      )}

      {/* Footer Info (Static) */}
      <div id="about" className="bg-[#0a1e3f] text-white py-12 md:py-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600"></div>
        <div className="absolute -left-20 top-20 w-64 h-64 bg-blue-500 rounded-full blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute -right-20 bottom-20 w-64 h-64 bg-amber-500 rounded-full blur-3xl opacity-10 animate-pulse"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-8 reveal-on-scroll">
              Direktorat Pendidikan
            </h3>
            
            <div className="flex flex-col md:flex-row justify-center items-start md:items-center gap-8 md:gap-16 text-slate-300 text-sm md:text-base leading-relaxed reveal-on-scroll delay-100 mt-8 mb-8 max-w-5xl mx-auto">
               <div className="text-center md:text-right flex-1 w-full">
                  <strong className="text-amber-400 block mb-1 text-lg">Kantor Manajemen</strong>
                  <p>{landingContent.contactAddress1}</p>
               </div>
               
               <div className="hidden md:block w-px h-16 bg-white/20"></div>
               
               <div className="text-center md:text-left flex-1 w-full">
                  <strong className="text-amber-400 block mb-1 text-lg">PDB Pembelajaran Dasar Bersama</strong>
                  <p>{landingContent.contactAddress2}</p>
               </div>
            </div>

            <p className="text-slate-300 reveal-on-scroll delay-200">
                 <span className="font-semibold text-white">Email :</span>{' '}
                 <a href={`mailto:${landingContent.contactEmail}`} className="hover:text-amber-400 transition-colors underline decoration-slate-500 hover:decoration-amber-400">
                   {landingContent.contactEmail}
                 </a>
            </p>

            <div className="mt-8 md:mt-12 text-slate-500 text-xs border-t border-white/10 pt-6 reveal-on-scroll delay-300">
                &copy; {new Date().getFullYear()} SubDit PKKII. Excellence with Morality.
            </div>
        </div>
      </div>
    </div>
  );
};