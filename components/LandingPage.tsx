import React, { useEffect } from 'react';
import { ArrowRight, ShieldCheck, Flag, HeartHandshake, Users, Star, PlayCircle, ExternalLink } from 'lucide-react';

interface LandingPageProps {
  onEnter: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnter }) => {
  
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
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: "0px 0px -50px 0px" // Trigger slightly before the bottom
      } 
    );

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 flex flex-col overflow-x-hidden">
      {/* Top Bar Decoration (Yellow/Blue Strip) with Gradient Animation */}
      <div className="h-2 w-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 animate-gradient-text"></div>

      {/* Navbar - Glassmorphism */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-slate-100/50 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo & Title Section */}
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

            {/* Login Button */}
            <div className="pl-2 flex-shrink-0">
              <a 
                href="https://unairsatu.unair.ac.id/site/login"
                className="relative overflow-hidden bg-[#0a1e3f] hover:bg-blue-900 text-white px-4 py-2 md:px-7 md:py-2.5 rounded-full font-bold text-xs md:text-sm transition-all shadow-lg hover:shadow-blue-900/40 flex items-center gap-2 transform hover:-translate-y-1 group"
              >
                <span className="relative z-10 flex items-center gap-1 md:gap-2">
                  <span>Login SSO</span> <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform md:w-4 md:h-4" />
                </span>
                {/* Shine Effect */}
                <div className="absolute inset-0 h-full w-full scale-0 rounded-full transition-all duration-300 group-hover:scale-100 group-hover:bg-blue-800/50"></div>
                <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shimmer-slide" />
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Background Image */}
      {/* Added extra padding bottom (pb-32 lg:pb-48) to allow the next section to overlap nicely */}
      <div className="relative overflow-hidden flex flex-col justify-center min-h-[90vh] lg:min-h-[85vh] pt-12 pb-32 lg:pt-20 lg:pb-48">
        
        {/* Background Image Layer */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://upkk.unair.ac.id/gambar/VB-6.jpg" 
            alt="Background Gedung" 
            className="w-full h-full object-cover object-center"
          />
          {/* Dark Blue Gradient Overlay for Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1e3f]/95 via-[#0a1e3f]/90 to-blue-900/70"></div>
          {/* Subtle Pattern Overlay */}
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        </div>

        {/* Animated Blobs (Modified to be subtle behind text) */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-blue-500 rounded-full blur-[100px] opacity-20 z-0 animate-pulse"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full h-full flex flex-col justify-center">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Content (Text) */}
            <div className="space-y-6 md:space-y-8 animate-fade-in-up text-center lg:text-left">
              
              <div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold text-white leading-tight mb-2 md:mb-4 tracking-tight drop-shadow-lg">
                  Sub Direktorat <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 animate-gradient-text">PKKII</span>
                </h2>
                <div className="inline-block text-left">
                    <p className="text-base sm:text-lg md:text-2xl text-blue-100 font-light border-l-4 border-amber-400 pl-4 md:pl-6 py-2 bg-white/5 rounded-r-xl backdrop-blur-sm">
                    Pendidikan Karakter, Kebangsaan, Inklusi, dan Interprofesional
                    </p>
                </div>
              </div>

              <p className="text-blue-50 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 text-justify md:text-left font-light opacity-90">
                <strong>PKKII</strong> merupakan Sub Direktorat di dalam Direktorat Pendidikan UNAIR yang bertugas menjalankan tiga kegiatan utama. 
                Kegiatan tersebut meliputi <strong>Pendidikan Dasar Bersama (PDB)</strong>, <strong>Pendidikan Inklusi</strong>, <strong>Kuliah Kebangsaan</strong>, 
                serta <strong>Interprofessional Education (IPE)</strong> di lingkungan UNAIR.
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

            {/* Hero Visual/Grid with Floating Cards */}
            <div className="grid grid-cols-2 gap-3 md:gap-4 lg:gap-6 relative perspective-1000 mt-8 lg:mt-0">
              <div className="space-y-3 md:space-y-4 lg:space-y-6 mt-6 md:mt-12">
                <div className="reveal-on-scroll delay-100 bg-white/95 backdrop-blur-md p-4 md:p-6 rounded-2xl shadow-2xl border border-white/50 transform hover:scale-105 hover:-rotate-1 transition-all duration-300 group cursor-default">
                  <div className="bg-emerald-100 w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center mb-3 md:mb-4 group-hover:rotate-12 transition-transform duration-300 shadow-inner">
                     <ShieldCheck className="w-5 h-5 md:w-8 md:h-8 text-emerald-600" />
                  </div>
                  <h3 className="font-bold text-base md:text-xl text-[#0a1e3f]">Karakter</h3>
                  <p className="text-xs md:text-sm text-slate-500 mt-1">Integritas & Moralitas</p>
                </div>
                <div className="reveal-on-scroll delay-300 bg-white/95 backdrop-blur-md p-4 md:p-6 rounded-2xl shadow-2xl border border-white/50 transform hover:scale-105 hover:rotate-1 transition-all duration-300 group cursor-default">
                  <div className="bg-red-100 w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center mb-3 md:mb-4 group-hover:rotate-12 transition-transform duration-300 shadow-inner">
                     <Flag className="w-5 h-5 md:w-8 md:h-8 text-red-600" />
                  </div>
                  <h3 className="font-bold text-base md:text-xl text-[#0a1e3f]">Kebangsaan</h3>
                  <p className="text-xs md:text-sm text-slate-500 mt-1">Cinta Tanah Air</p>
                </div>
              </div>
              <div className="space-y-3 md:space-y-4 lg:space-y-6">
                <div className="reveal-on-scroll delay-200 bg-white/95 backdrop-blur-md p-4 md:p-6 rounded-2xl shadow-2xl border border-white/50 transform hover:scale-105 hover:-rotate-1 transition-all duration-300 group cursor-default">
                  <div className="bg-amber-100 w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center mb-3 md:mb-4 group-hover:rotate-12 transition-transform duration-300 shadow-inner">
                    <HeartHandshake className="w-5 h-5 md:w-8 md:h-8 text-amber-600" />
                  </div>
                  <h3 className="font-bold text-base md:text-xl text-[#0a1e3f]">Inklusi</h3>
                  <p className="text-xs md:text-sm text-slate-500 mt-1">Menghargai Perbedaan</p>
                </div>
                <div className="reveal-on-scroll delay-400 bg-white/95 backdrop-blur-md p-4 md:p-6 rounded-2xl shadow-2xl border border-white/50 transform hover:scale-105 hover:rotate-1 transition-all duration-300 group cursor-default">
                  <div className="bg-blue-100 w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center mb-3 md:mb-4 group-hover:rotate-12 transition-transform duration-300 shadow-inner">
                     <Users className="w-5 h-5 md:w-8 md:h-8 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-base md:text-xl text-[#0a1e3f]">Interprofesional</h3>
                  <p className="text-xs md:text-sm text-slate-500 mt-1">Kolaborasi Tim</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gradient/Wave removed in favor of negative margin overlap below */}
      </div>

      {/* PDB Definition Section - Curved Card Effect */}
      {/* Added -mt-20, rounded-t, and shadow to create the floating card effect */}
      <div id="tentang-pdb" className="relative z-20 -mt-20 md:-mt-32 bg-white rounded-t-[2.5rem] md:rounded-t-[4rem] shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.3)] pt-12 md:pt-20 pb-12 md:pb-24 border-t-0">
         <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 md:mb-16 reveal-on-scroll">
               <span className="text-amber-500 font-bold tracking-widest text-xs md:text-sm uppercase bg-amber-50 px-3 py-1 rounded-full">Program Unggulan</span>
               <h2 className="text-2xl md:text-3xl lg:text-5xl font-extrabold text-[#0a1e3f] mt-4">Pembelajaran Dasar Bersama</h2>
               <div className="w-16 md:w-24 h-2 bg-gradient-to-r from-amber-400 to-yellow-500 mx-auto mt-4 md:mt-6 rounded-full"></div>
            </div>

            <div className="text-slate-600 text-base md:text-lg leading-loose space-y-6 md:space-y-8">
               <p className="text-justify first-letter:text-3xl md:first-letter:text-5xl first-letter:font-bold first-letter:text-amber-500 first-letter:float-left first-letter:mr-2 md:first-letter:mr-3 reveal-on-scroll delay-100">
                 SubDIt PKKII menjalankan <strong>PDB (Pembelajaran Dasar Bersama)</strong> sebagai langkah dalam memperkuat pendidikan kebangsaan dan karakter mahasiswa. Kegiatan ini terselenggara pada semester pertama terhitung mulai semester Gasal 2021/2022. PDB mengintegrasikan tiga pilar pendidikan, yaitu, <strong>pendidikan kewarganegaraan</strong>, <strong>pengenalan dasar-dasar keilmuan</strong>, serta <strong>pengembangan keahlian</strong> sesuai rumpun ilmu masing-masing.
               </p>
               
               <div className="reveal-on-scroll delay-200 bg-gradient-to-br from-slate-50 to-slate-100 p-6 md:p-12 rounded-2xl md:rounded-[2rem] border border-slate-200 shadow-xl md:shadow-2xl relative overflow-hidden group hover:border-amber-200 transition-all duration-500 hover:shadow-amber-100/50">
                 <div className="absolute top-0 right-0 bg-amber-400 w-20 h-20 md:w-32 md:h-32 rounded-bl-full opacity-20 -mr-6 -mt-6 md:-mr-10 md:-mt-10 group-hover:scale-125 transition-transform duration-500"></div>
                 
                 <p className="text-[#0a1e3f] text-lg md:text-xl font-medium mb-6 md:mb-8 leading-relaxed text-center">
                   PDB tak hanya memberikan pengalaman belajar yang bersifat akademik, namun juga memfasilitasi dan menanamkan karakter:
                 </p>
                 
                 <div className="flex flex-wrap gap-2 md:gap-4 justify-center mb-6 md:mb-8">
                    {['Humble', 'Excellence', 'Brave', 'Agile', 'Transcendental'].map((val, idx) => (
                      <div key={val} className={`reveal-on-scroll delay-${(idx+1)*100} group/item flex items-center gap-1 md:gap-2 bg-white px-3 py-2 md:px-6 md:py-3 rounded-xl md:rounded-2xl shadow-sm border border-slate-100 text-[#0a1e3f] text-sm md:text-base font-bold transform hover:-translate-y-1 md:hover:-translate-y-2 hover:shadow-lg transition-all duration-300 cursor-default`}>
                        <Star size={14} className="text-slate-300 fill-slate-100 group-hover/item:text-amber-400 group-hover/item:fill-amber-400 transition-colors duration-300 md:w-[18px] md:h-[18px]" />
                        {val}
                      </div>
                    ))}
                 </div>

                 <p className="text-[#0a1e3f] text-base md:text-lg text-center">
                   serta <strong className="text-amber-600">Excellence with Morality</strong> kepada mahasiswa. Sehingga mahasiswa siap terjun dan berinteraksi dengan masyarakat.
                 </p>
               </div>

               <p className="text-justify reveal-on-scroll delay-300">
                 Selain itu PDB menjadi ajang bagi mahasiswa dari berbagai rumpun ilmu untuk saling mengenal, berinteraksi, dan berkolaborasi. Interaksi ini memperkuat rasa kekeluargaan sekaligus menumbuhkan kebanggaan terhadap almamater. Sebagai puncak rangkaian pembelajaran, <span className="text-amber-600 font-bold bg-amber-100 px-1 rounded">PDB Expo</span> menjadi momentum untuk mengekspresikan hasil pembelajaran yang terintegrasi dari seluruh aspek pendidikan di PDB.
               </p>

               {/* Video Embed with Glow & Scroll Reveal */}
               <div className="w-full max-w-4xl mx-auto mt-10 md:mt-16 relative group reveal-on-scroll delay-300">
                 <div className="absolute -inset-2 bg-gradient-to-r from-amber-400 to-blue-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                 <div className="relative overflow-hidden rounded-2xl shadow-2xl border-2 md:border-4 border-white bg-black">
                   <div className="relative pb-[56.25%] h-0">
                      <iframe 
                        className="absolute top-0 left-0 w-full h-full border-0"
                        src="https://www.youtube-nocookie.com/embed/V2IfvmP-sJE?rel=0" 
                        title="YouTube video player" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        referrerPolicy="strict-origin-when-cross-origin" 
                        allowFullScreen
                      ></iframe>
                   </div>
                 </div>
               </div>

               {/* New Video Embed (Added Below the Previous One) */}
               <div className="w-full max-w-4xl mx-auto mt-8 md:mt-12 relative group reveal-on-scroll delay-300">
                 <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-amber-400 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                 <div className="relative overflow-hidden rounded-2xl shadow-2xl border-2 md:border-4 border-white bg-black">
                   <div className="relative pb-[56.25%] h-0">
                      <iframe 
                        className="absolute top-0 left-0 w-full h-full border-0"
                        src="https://www.youtube.com/embed/vuAtVd1W1XU?si=xWrw1I8n8Mia87f7" 
                        title="YouTube video player" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        referrerPolicy="strict-origin-when-cross-origin" 
                        allowFullScreen
                      ></iframe>
                   </div>
                 </div>
               </div>

               {/* New UPKK & IPE Content Section - National Theme (Gradient Red-White, No Image, Single Column) */}
               <div className="mt-12 md:mt-20 relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-red-100 bg-gradient-to-br from-red-50 via-white to-white p-8 md:p-16 reveal-on-scroll group text-center">
                  {/* Decorative Top Bar representing the Flag */}
                  <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-red-600 via-red-500 to-red-600 shadow-md"></div>
                  
                  {/* Background Watermark (Abstract Red/White Vibe) */}
                  <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-red-500 rounded-full blur-[100px] opacity-10 pointer-events-none"></div>

                  <div className="relative z-10 max-w-4xl mx-auto">
                      <h3 className="text-2xl md:text-4xl font-extrabold text-[#0a1e3f] mb-8 leading-tight">
                        Perkuat Kolaborasi dan <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-500">Pendidikan Kebangsaan</span>
                      </h3>

                      <div className="space-y-6 md:space-y-8 text-slate-700 text-base md:text-xl leading-relaxed">
                        <p>
                          <strong>PKKII</strong> turut menjalankan kegiatan <strong>kuliah kebangsaan</strong> yang terselenggara secara periodik dengan menghadirkan tokoh-tokoh nasional, praktisi, dan profesional Indonesia. Program ini semakin ditunjang dengan kegiatan-kegiatan yang meliputi pemilihan duta kebangsaan, parade kebangsaan, hingga proyek-proyek bertema kebangsaan.
                        </p>
                        <p>
                          Lebih lanjut, <strong>Interprofessional Education (IPE)</strong> juga menjadi mata kuliah dan kegiatan wajib bagi mahasiswa UNAIR guna meningkatkan kemampuan kolaborasi lintas disiplin mahasiswa. IPE menawarkan modul-modul menarik yang berbasis pada permasalahan nyata di masyarakat seperti <em>NAPZA, kebencanaan, kepemimpinan, urban digital, ekowisata</em>, dan lainnya.
                        </p>
                      </div>

                      <div className="mt-10 flex justify-center">
                        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-red-400 to-transparent rounded-full opacity-50"></div>
                      </div>
                  </div>
               </div>

               {/* Video: Perkuat Kolaborasi */}
               <div className="w-full max-w-4xl mx-auto mt-10 md:mt-16 relative group reveal-on-scroll delay-300">
                 <div className="absolute -inset-2 bg-gradient-to-r from-red-500 to-white rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                 <div className="relative overflow-hidden rounded-2xl shadow-2xl border-2 md:border-4 border-white bg-black">
                   <div className="relative pb-[56.25%] h-0">
                      <iframe 
                        className="absolute top-0 left-0 w-full h-full border-0"
                        src="https://www.youtube-nocookie.com/embed/TFf2g7BqMoY?si=YcAtP99oa0wJLFYk&rel=0" 
                        title="YouTube video player" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        referrerPolicy="strict-origin-when-cross-origin" 
                        allowFullScreen
                      ></iframe>
                   </div>
                 </div>
               </div>

            </div>
         </div>
      </div>

      {/* Airlangga Inklusive Learning (AIL) Section */}
      <div id="inklusi" className="bg-slate-50 py-16 md:py-24 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Text Content */}
            <div className="order-2 lg:order-1 space-y-6 md:space-y-8 reveal-on-scroll">
               <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs uppercase tracking-wider">
                  <HeartHandshake size={16} />
                  <span>Pendidikan Inklusif</span>
               </div>
               
               <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#0a1e3f] leading-tight">
                  Airlangga Inklusive Learning <span className="text-emerald-500">(AIL)</span>
               </h2>
               
               <div className="prose prose-lg text-slate-600 text-justify">
                 <p className="mb-4">
                   Unit Pelayanan Pendidikan Inklusif Universitas Airlangga, atau dikenal sebagai <strong>Airlangga Inklusive Learning (AIL)</strong>, adalah Unit Pelayanan Disabilitas (ULD) yang secara struktural berada di bawah Direktorat Pendidikan.
                 </p>
                 <p>
                   Sejak didirikan pada tahun 2016, AIL berkomitmen untuk mewujudkan pendidikan tinggi yang inklusif, adil, dan setara bagi seluruh komunitas akademik, khususnya bagi penyandang disabilitas atau mahasiswa berkebutuhan khusus (MBK).
                 </p>
               </div>

               {/* New Link Button */}
               <div className="pt-2">
                  <a 
                    href="https://ail.pendidikan.unair.ac.id/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold text-sm md:text-base hover:bg-emerald-700 transition-all shadow-lg hover:shadow-emerald-600/30 hover:-translate-y-1 group"
                  >
                    Selengkapnya <ExternalLink size={18} className="group-hover:translate-x-1 transition-transform" />
                  </a>
               </div>
            </div>

            {/* Legal Basis Card */}
            <div className="order-1 lg:order-2 reveal-on-scroll delay-200">
               <div className="relative">
                  <div className="absolute inset-0 bg-emerald-400/20 rounded-3xl transform rotate-6 scale-95 blur-sm"></div>
                  <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-emerald-100 relative overflow-hidden">
                     <h3 className="text-xl font-bold text-[#0a1e3f] mb-6 flex items-center gap-3">
                       <ShieldCheck className="text-emerald-500" size={28} />
                       Dasar Hukum
                     </h3>
                     
                     <ul className="space-y-4">
                        {[
                          "UUD 1945 Republik Indonesia",
                          "UU No. 39 Tahun 1999 tentang Hak Asasi Manusia",
                          "UU No. 8 Tahun 2016 tentang Penyandang Disabilitas",
                          "Permenristekdikti No. 46 Tahun 2017 tentang Pendidikan Khusus dan Layanan Khusus"
                        ].map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-slate-700 text-sm md:text-base">
                             <div className="min-w-1.5 mt-2 h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                             <span>{item}</span>
                          </li>
                        ))}
                     </ul>

                     <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                        <p className="text-xs text-slate-500 italic">
                          "Menjamin hak yang sama untuk memperoleh layanan pendidikan bermutu."
                        </p>
                     </div>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </div>

      {/* Quick Info / Footer Strip - Scroll Reveal Applied */}
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
                  <p>Kampus C UNAIR</p>
                  <p>Jl. Mulyorejo, Surabaya – 60115</p>
               </div>
               
               <div className="hidden md:block w-px h-16 bg-white/20"></div>
               
               <div className="text-center md:text-left flex-1 w-full">
                  <strong className="text-amber-400 block mb-1 text-lg">PDB Pembelajaran Dasar Bersama</strong>
                  <p>Gedung Nano Lt 8</p>
                  <p>Kampus C - JL. Mulyorejo, Surabaya-60115</p>
               </div>
            </div>

            <p className="text-slate-300 reveal-on-scroll delay-200">
                 <span className="font-semibold text-white">Email :</span>{' '}
                 <a href="mailto:direktorat@ditpend.unair.ac.id" className="hover:text-amber-400 transition-colors underline decoration-slate-500 hover:decoration-amber-400">
                   direktorat@ditpend.unair.ac.id
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