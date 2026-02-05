import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { AppModule, LandingContent, LandingSection, HeroSlide, GalleryItem } from '../types';
import { Save, X, Edit2, RotateCcw, LogOut, CheckCircle, AlertCircle, Eye, EyeOff, Settings, CalendarDays, LifeBuoy, Building2, Archive, BookOpen, Activity, Users, Grid, LayoutTemplate, Smartphone, Plus, Trash2, ArrowUp, ArrowDown, Image as ImageIcon, MonitorPlay, Rocket, RefreshCw, Key, Link, AlertTriangle } from 'lucide-react';

const ICON_OPTIONS = [
  { value: 'CalendarDays', label: 'Calendar' },
  { value: 'LifeBuoy', label: 'Help/Lifebuoy' },
  { value: 'Building2', label: 'Building' },
  { value: 'Archive', label: 'Archive/Box' },
  { value: 'BookOpen', label: 'Book' },
  { value: 'Activity', label: 'Activity/Pulse' },
  { value: 'Users', label: 'Users' },
  { value: 'Grid', label: 'Grid' },
];

const COLOR_OPTIONS = [
  { value: 'bg-blue-600', label: 'Royal Blue', class: 'bg-blue-600' },
  { value: 'bg-emerald-500', label: 'Emerald Green', class: 'bg-emerald-500' },
  { value: 'bg-orange-500', label: 'Bright Orange', class: 'bg-orange-500' },
  { value: 'bg-indigo-600', label: 'Indigo Purple', class: 'bg-indigo-600' },
  { value: 'bg-red-600', label: 'Danger Red', class: 'bg-red-600' },
  { value: 'bg-slate-700', label: 'Dark Slate', class: 'bg-slate-700' },
  { value: 'bg-amber-500', label: 'Amber Gold', class: 'bg-amber-500' },
];

export const AdminPanel: React.FC = () => {
  const { 
    draftModules, 
    draftContent, 
    updateDraftModule, 
    addDraftModule, 
    deleteDraftModule, 
    updateDraftContent, 
    publishChanges,
    discardChanges,
    hasUnsavedChanges,
    logout, 
    resetData,
    apiUrl,
    updateApiUrl
  } = useData();

  const [activeTab, setActiveTab] = useState<'apps' | 'content'>('apps');
  
  // App Editing State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<AppModule | null>(null);
  
  // Content Editing State
  const [contentForm, setContentForm] = useState<LandingContent>(draftContent);
  const [editingSectionId, setEditingSectionId] = useState<string | null>(null);
  const [sectionForm, setSectionForm] = useState<LandingSection | null>(null);
  
  // New State for Slide & Gallery Editing
  const [newSlideUrl, setNewSlideUrl] = useState('');
  const [newGalleryUrl, setNewGalleryUrl] = useState('');
  const [newGalleryCaption, setNewGalleryCaption] = useState('');

  // API Config State
  const [localApiUrl, setLocalApiUrl] = useState(apiUrl);

  const [showContentSuccess, setShowContentSuccess] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  
  // Publish Feedback States
  const [publishStatus, setPublishStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [publishMessage, setPublishMessage] = useState('');
  
  // NEW: Success Modal State
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Sync local form with draft content when it changes (or on init)
  useEffect(() => {
    setContentForm(draftContent);
  }, [draftContent]);

  // Sync API URL
  useEffect(() => {
    setLocalApiUrl(apiUrl);
  }, [apiUrl]);

  const handleSaveApiUrl = () => {
    if (window.confirm("Changing the API URL will reload the application. Continue?")) {
        updateApiUrl(localApiUrl);
    }
  };

  // --- APP EDITING HANDLERS ---
  const handleAddApp = () => {
    const newId = `app_${Date.now()}`;
    const newApp: AppModule = {
      id: newId,
      name: 'New Application',
      description: 'Deskripsi aplikasi...',
      icon: 'Grid',
      color: 'bg-slate-700',
      status: 'beta',
      urlHash: newId,
      externalUrl: '',
      visible: true
    };
    addDraftModule(newApp);
    setEditingId(newId);
    setEditForm(newApp);
  };

  const handleDeleteApp = (id: string) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus aplikasi ini?")) {
      deleteDraftModule(id);
      if (editingId === id) {
        setEditingId(null);
        setEditForm(null);
      }
    }
  };

  const handleEdit = (module: AppModule) => {
    setEditingId(module.id);
    setEditForm({ ...module, visible: module.visible !== false });
  };

  const handleSaveApp = () => {
    if (editForm) {
      updateDraftModule(editForm);
      setEditingId(null);
      setEditForm(null);
    }
  };

  const handleCancelApp = () => {
    setEditingId(null);
    setEditForm(null);
  };

  const handleChangeApp = (field: keyof AppModule, value: any) => {
    if (editForm) {
      setEditForm({ ...editForm, [field]: value });
    }
  };

  const toggleVisibility = (module: AppModule) => {
    updateDraftModule({ ...module, visible: !module.visible });
  };

  // --- CONTENT EDITING HANDLERS ---
  const handleContentChange = (field: keyof LandingContent, value: string) => {
    setContentForm(prev => ({ ...prev, [field]: value }));
  };

  // --- SLIDER HANDLERS ---
  const handleAddSlide = () => {
    if (!newSlideUrl) return;
    const newSlide: HeroSlide = {
        id: `slide_${Date.now()}`,
        imageUrl: newSlideUrl,
        title: 'New Slide',
        subtitle: 'Description'
    };
    setContentForm(prev => ({ ...prev, slides: [...(prev.slides || []), newSlide] }));
    setNewSlideUrl('');
  };

  const handleDeleteSlide = (id: string) => {
    setContentForm(prev => ({ ...prev, slides: prev.slides.filter(s => s.id !== id) }));
  };

  const handleUpdateSlide = (id: string, field: keyof HeroSlide, value: string) => {
      setContentForm(prev => ({
          ...prev,
          slides: prev.slides.map(s => s.id === id ? { ...s, [field]: value } : s)
      }));
  };

  // --- GALLERY HANDLERS ---
  const handleAddGallery = () => {
    if (!newGalleryUrl) return;
    const newItem: GalleryItem = {
        id: `gal_${Date.now()}`,
        imageUrl: newGalleryUrl,
        caption: newGalleryCaption || 'No Caption'
    };
    setContentForm(prev => ({ ...prev, gallery: [...(prev.gallery || []), newItem] }));
    setNewGalleryUrl('');
    setNewGalleryCaption('');
  };

  const handleDeleteGallery = (id: string) => {
    setContentForm(prev => ({ ...prev, gallery: prev.gallery.filter(g => g.id !== id) }));
  };

  // --- SECTION CRUD ---
  const handleAddSection = () => {
    const newSection: LandingSection = {
      id: `sec_${Date.now()}`,
      title: 'New Section',
      content: 'Write description here...',
      variant: 'default',
      isVisible: true
    };
    setContentForm(prev => ({
      ...prev,
      sections: [...prev.sections, newSection]
    }));
    setEditingSectionId(newSection.id);
    setSectionForm(newSection);
  };

  const handleEditSection = (section: LandingSection) => {
    setEditingSectionId(section.id);
    setSectionForm(section);
  };

  const handleSaveSection = () => {
    if (sectionForm && contentForm) {
      const updatedSections = contentForm.sections.map(s => 
        s.id === sectionForm.id ? sectionForm : s
      );
      setContentForm(prev => ({ ...prev, sections: updatedSections }));
      setEditingSectionId(null);
      setSectionForm(null);
    }
  };

  const handleDeleteSection = (id: string) => {
    if (window.confirm('Are you sure you want to delete this section?')) {
       setContentForm(prev => ({
         ...prev,
         sections: prev.sections.filter(s => s.id !== id)
       }));
    }
  };

  const moveSection = (index: number, direction: 'up' | 'down') => {
    if (!contentForm) return;
    const newSections = [...contentForm.sections];
    if (direction === 'up' && index > 0) {
      [newSections[index], newSections[index - 1]] = [newSections[index - 1], newSections[index]];
    } else if (direction === 'down' && index < newSections.length - 1) {
      [newSections[index], newSections[index + 1]] = [newSections[index + 1], newSections[index]];
    }
    setContentForm(prev => ({ ...prev, sections: newSections }));
  };

  // Updates the context draft state
  const handleSaveContent = () => {
    updateDraftContent(contentForm);
    setShowContentSuccess(true);
    setTimeout(() => setShowContentSuccess(false), 2000);
  };

  // --- PUBLISH HANDLER ---
  const handlePublish = async () => {
    // FIX: Removed window.confirm to make button immediately responsive
    setPublishStatus('loading');
    setPublishMessage('');
    
    const result = await publishChanges();
    
    if (result.success) {
        setPublishStatus('success');
        setShowSuccessModal(true); // SHOW LARGE MODAL
        
        // Auto hide modal after 2.5 seconds
        setTimeout(() => {
            setShowSuccessModal(false);
            setPublishStatus('idle'); // Re-enable button
        }, 2500);
    } else {
        setPublishStatus('error');
        setPublishMessage(result.message || 'Error occurred');
        setTimeout(() => setPublishStatus('idle'), 4000);
    }
  };

  const handleDiscard = () => {
    if (window.confirm("Discard all draft changes? This will revert your admin panel to match the live site.")) {
      discardChanges();
      // contentForm will auto-update via useEffect dependence on draftContent
    }
  };

  const getIconComponent = (iconName: string) => {
     switch (iconName) {
      case 'CalendarDays': return CalendarDays;
      case 'LifeBuoy': return LifeBuoy;
      case 'Building2': return Building2;
      case 'Archive': return Archive;
      case 'BookOpen': return BookOpen;
      case 'Activity': return Activity;
      case 'Users': return Users;
      default: return Grid;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 relative z-50 overflow-y-auto pb-20">
      
      {/* ----------------- SUCCESS POPUP MODAL (NEW) ----------------- */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
           <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl flex flex-col items-center text-center max-w-sm w-full transform scale-100 transition-all border-4 border-emerald-50">
              <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
                <CheckCircle size={48} className="text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold text-[#0a1e3f] mb-2">Publish Berhasil!</h2>
              <p className="text-slate-500 mb-6">
                Perubahan Anda telah disimpan dan kini aktif di halaman utama.
              </p>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                 <div className="h-full bg-emerald-500 animate-[shimmer_2s_infinite]"></div>
              </div>
           </div>
        </div>
      )}

      {/* ERROR TOAST */}
      {publishStatus === 'error' && (
        <div className="fixed top-24 right-8 z-[100] animate-fade-in-up pointer-events-none">
           <div className="bg-red-600 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-4 border border-red-400/30">
              <div className="bg-white/20 p-2 rounded-full">
                <AlertTriangle size={28} className="text-white" />
              </div>
              <div>
                <h4 className="font-bold text-lg">Gagal Menyimpan</h4>
                <p className="text-red-50 text-sm">{publishMessage}</p>
              </div>
           </div>
        </div>
      )}

      {/* Admin Navbar */}
      <div className="bg-[#0a1e3f] text-white px-8 py-4 shadow-md flex justify-between items-center sticky top-0 z-[60]">
         <div className="flex items-center gap-3">
            <Settings className="text-amber-400" />
            <div>
              <h1 className="text-xl font-bold leading-none">Admin Dashboard</h1>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                {hasUnsavedChanges ? (
                  <span className="text-amber-400 flex items-center gap-1"><Edit2 size={10}/> Draft Mode (Unsaved)</span>
                ) : (
                  <span className="text-emerald-400 flex items-center gap-1"><CheckCircle size={10}/> Live Synced</span>
                )}
              </span>
            </div>
         </div>

         {/* PUBLISH ACTIONS */}
         <div className="flex items-center gap-4">
             {hasUnsavedChanges && (
               <div className="flex items-center gap-2 mr-4 animate-fade-in">
                  <button 
                    onClick={handleDiscard}
                    disabled={publishStatus === 'loading'}
                    className="text-slate-300 hover:text-white text-xs font-bold px-3 py-2 rounded hover:bg-white/10"
                  >
                    Discard
                  </button>
                  <button 
                    onClick={handlePublish}
                    disabled={publishStatus === 'loading'} 
                    className={`flex items-center gap-2 px-4 py-2 text-white rounded-lg transition-all shadow-lg text-sm font-bold min-w-[160px] justify-center cursor-pointer active:scale-95
                      ${publishStatus === 'loading' ? 'bg-slate-500 cursor-not-allowed' : 
                        publishStatus === 'success' ? 'bg-emerald-600' :
                        'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/30'}
                    `}
                  >
                    {publishStatus === 'loading' && <><RefreshCw size={16} className="animate-spin"/> Publishing...</>}
                    {publishStatus === 'success' && <><CheckCircle size={16} /> Success!</>}
                    {publishStatus === 'idle' && <><Rocket size={16} /> Publish Changes</>}
                    {publishStatus === 'error' && <><Rocket size={16} /> Retry Publish</>}
                  </button>
               </div>
             )}

            <div className="h-6 w-px bg-slate-700"></div>

            <button
              onClick={() => setShowResetConfirm(true)}
              className="flex items-center gap-2 px-3 py-1.5 bg-slate-700 text-slate-200 rounded-lg hover:bg-slate-600 transition-colors text-sm"
            >
              <RotateCcw size={14} />
              Reset
            </button>
            
            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-lg shadow-red-900/20 text-sm font-bold"
            >
              <LogOut size={16} />
              Logout
            </button>
         </div>
      </div>

      <div className="max-w-6xl mx-auto p-8 relative z-10">
        
        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('apps')}
            className={`flex-1 py-4 rounded-xl flex items-center justify-center gap-2 font-bold transition-all ${activeTab === 'apps' ? 'bg-white shadow-md text-blue-700 border border-blue-100 ring-2 ring-blue-50' : 'bg-slate-200 text-slate-500 hover:bg-slate-300'}`}
          >
            <Smartphone size={20} /> Application Management
          </button>
          <button
            onClick={() => setActiveTab('content')}
            className={`flex-1 py-4 rounded-xl flex items-center justify-center gap-2 font-bold transition-all ${activeTab === 'content' ? 'bg-white shadow-md text-blue-700 border border-blue-100 ring-2 ring-blue-50' : 'bg-slate-200 text-slate-500 hover:bg-slate-300'}`}
          >
            <LayoutTemplate size={20} /> Landing Page Content
          </button>
        </div>
        
        {showResetConfirm && (
           <div className="mb-6 bg-amber-50 border border-amber-200 p-4 rounded-xl flex items-center justify-between animate-fade-in-up">
              <div className="flex items-center gap-3 text-amber-800">
                <AlertCircle size={24} />
                <span><strong>Warning:</strong> Ini akan mengembalikan semua nama, ikon, dan link ke pengaturan awal pabrik. Lanjutkan?</span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setShowResetConfirm(false)} className="px-4 py-2 text-slate-600 hover:bg-amber-100 rounded-lg font-medium">Batal</button>
                <button onClick={() => { resetData(); setShowResetConfirm(false); }} className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 font-bold shadow-md">Ya, Reset Default</button>
              </div>
           </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-6 flex items-start gap-3">
            <div className="p-2 bg-blue-100 rounded-full text-blue-600 mt-1">
                <Smartphone size={18} />
            </div>
            <div>
                <h3 className="font-bold text-[#0a1e3f] text-sm">Preview Device Sinkronisasi</h3>
                <p className="text-xs text-slate-500 mt-1">
                   Perubahan yang Anda simpan di sini hanya bersifat <strong>Draft (Lokal)</strong> di browser ini. 
                   Agar perubahan muncul di HP atau komputer lain, Anda wajib menekan tombol 
                   <span className="text-emerald-600 font-bold"> "Publish Changes"</span> di pojok kanan atas.
                </p>
            </div>
        </div>

        {activeTab === 'apps' ? (
          // ==================== APP MANAGEMENT TAB ====================
          <div className="space-y-6 animate-fade-in">
             <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                <div>
                  <h3 className="font-bold text-[#0a1e3f] text-lg">Installed Applications (Draft)</h3>
                  <p className="text-slate-500 text-sm">Changes here will be saved to draft. Click "Publish" to go live.</p>
                </div>
                <button 
                  onClick={handleAddApp}
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 shadow-md font-bold transition-transform hover:scale-105"
                >
                  <Plus size={18} /> Add New App
                </button>
             </div>

             {draftModules.map((module) => {
              const Icon = getIconComponent(module.icon);
              const isEditing = editingId === module.id;
              const isVisible = module.visible !== false;

              return (
                <div key={module.id} className={`bg-white rounded-xl shadow-sm border transition-all ${isEditing ? 'border-blue-500 ring-2 ring-blue-100' : 'border-slate-200 hover:border-slate-300'}`}>
                  {isEditing && editForm ? (
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-6 border-b border-slate-100 pb-4">
                         <div>
                            <h3 className="text-lg font-bold text-blue-700">Edit Module: {module.name}</h3>
                            <p className="text-xs text-slate-500">ID: {module.id}</p>
                         </div>
                         <button onClick={handleCancelApp} className="text-slate-400 hover:text-slate-600 p-1"><X size={20} /></button>
                      </div>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="space-y-4">
                           <div>
                              <label className="block text-sm font-medium text-slate-700 mb-1">Application Name</label>
                              <input 
                                type="text" 
                                value={editForm.name} 
                                onChange={(e) => handleChangeApp('name', e.target.value)}
                                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                              />
                           </div>
                           <div>
                              <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                              <textarea 
                                value={editForm.description} 
                                onChange={(e) => handleChangeApp('description', e.target.value)}
                                rows={2}
                                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                              />
                           </div>
                           <div>
                               <label className="block text-sm font-medium text-slate-700 mb-1">External Link (Optional)</label>
                               <input 
                                type="text" 
                                value={editForm.externalUrl || ''} 
                                onChange={(e) => handleChangeApp('externalUrl', e.target.value)}
                                placeholder="https://"
                                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                              />
                              <p className="text-xs text-slate-400 mt-1">If set, clicking the app will open this URL in a new tab.</p>
                           </div>
                           <div>
                              <label className="block text-sm font-medium text-slate-700 mb-1">Internal URL Hash (ID)</label>
                              <input 
                                type="text" 
                                value={editForm.id} 
                                disabled
                                className="w-full p-2.5 bg-slate-100 border border-slate-300 rounded-lg text-slate-500 cursor-not-allowed"
                              />
                           </div>
                        </div>

                        <div className="space-y-4">
                           <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Icon Style</label>
                                <div className="relative">
                                  <select 
                                    value={editForm.icon} 
                                    onChange={(e) => handleChangeApp('icon', e.target.value)}
                                    className="w-full p-2.5 pl-9 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none appearance-none"
                                  >
                                    {ICON_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                                  </select>
                                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
                                    {React.createElement(getIconComponent(editForm.icon), { size: 16 })}
                                  </div>
                                </div>
                              </div>
                              <div>
                                 <label className="block text-sm font-medium text-slate-700 mb-1">Status Badge</label>
                                 <select 
                                    value={editForm.status} 
                                    onChange={(e) => handleChangeApp('status', e.target.value)}
                                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                  >
                                    <option value="active">Active</option>
                                    <option value="maintenance">Maintenance</option>
                                    <option value="beta">Beta</option>
                                  </select>
                              </div>
                           </div>

                           <div>
                              <label className="block text-sm font-medium text-slate-700 mb-2">Card Color Theme</label>
                              <div className="grid grid-cols-4 gap-2">
                                 {COLOR_OPTIONS.map((opt) => (
                                   <button
                                    key={opt.value}
                                    onClick={() => handleChangeApp('color', opt.value)}
                                    className={`h-10 rounded-lg transition-all ${opt.class} ${editForm.color === opt.value ? 'ring-2 ring-offset-2 ring-slate-400 scale-105' : 'hover:opacity-80'}`}
                                   />
                                 ))}
                              </div>
                           </div>
                           <div className="flex items-center gap-2 pt-2">
                              <input 
                                type="checkbox"
                                checked={editForm.visible !== false}
                                onChange={(e) => handleChangeApp('visible', e.target.checked)}
                                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                              />
                              <label className="text-sm font-medium text-slate-700">Show on Dashboard</label>
                           </div>
                        </div>
                      </div>

                      <div className="flex justify-end pt-6 gap-3 mt-4 border-t border-slate-100">
                        <button onClick={handleCancelApp} className="px-5 py-2.5 text-slate-600 hover:bg-slate-100 rounded-lg font-medium">Cancel</button>
                        <button onClick={handleSaveApp} className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 font-bold shadow-md shadow-blue-200">
                          <Edit2 size={18} /> Update Draft
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className={`p-4 flex flex-col md:flex-row items-center justify-between gap-4 ${!isVisible ? 'opacity-60 bg-slate-50' : ''}`}>
                      <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className={`w-14 h-14 rounded-xl ${module.color} text-white flex items-center justify-center shrink-0 shadow-sm relative`}>
                           <Icon size={24} />
                        </div>
                        <div>
                           <h3 className="font-bold text-[#0a1e3f] text-lg">{module.name}</h3>
                           <p className="text-slate-500 text-sm line-clamp-1">{module.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                        <button onClick={() => toggleVisibility(module)} className="p-2 text-slate-400 hover:text-slate-600" title={isVisible ? "Hide from Dashboard" : "Show on Dashboard"}>
                          {isVisible ? <Eye size={18} /> : <EyeOff size={18} />}
                        </button>
                        <button onClick={() => handleEdit(module)} className="flex items-center gap-2 px-4 py-2 text-white bg-[#0a1e3f] hover:bg-blue-900 rounded-lg">
                          <Edit2 size={16} /> Edit
                        </button>
                        <button 
                          onClick={() => handleDeleteApp(module.id)} 
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg hover:text-red-700 transition-colors"
                          title="Delete Application"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          // ==================== CONTENT MANAGEMENT TAB ====================
          <div className="space-y-6 animate-fade-in">
             <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-[#0a1e3f] flex items-center gap-2">
                  <LayoutTemplate size={20}/> Landing Page Content (Draft)
                </h2>
                {showContentSuccess && (
                  <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg text-sm font-bold animate-fade-in">
                    <CheckCircle size={16} /> Draft Saved. Don't forget to Publish!
                  </div>
                )}
             </div>

             {/* API CONFIGURATION */}
             <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h3 className="font-bold text-slate-500 text-sm uppercase tracking-wide mb-4 border-b border-slate-200 pb-2 flex items-center gap-2">
                  <Key size={16} /> General Configuration
                </h3>
                
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-6">
                   {/* 1. BACKEND API URL */}
                   <div className="mb-2">
                      <label className="block text-sm font-bold text-[#0a1e3f] mb-1">Backend API Endpoint (PHP)</label>
                      <p className="text-xs text-slate-500 mb-2">URL to the `webapi.php` file on your server (Data Source).</p>
                      <div className="flex gap-2">
                          <input 
                            type="text" 
                            value={localApiUrl} 
                            onChange={(e) => setLocalApiUrl(e.target.value)} 
                            placeholder="https://yourdomain.com/webapi.php" 
                            className="flex-1 p-2 border border-slate-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-blue-500 outline-none"
                          />
                          <button 
                            onClick={handleSaveApiUrl}
                            className="bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-800 flex items-center gap-2"
                          >
                            <Link size={14} /> Update URL
                          </button>
                      </div>
                   </div>

                   {/* 2. GOOGLE GEMINI API KEY */}
                   <div className="mb-2 border-t border-slate-200 pt-4">
                      <label className="block text-sm font-bold text-[#0a1e3f] mb-1">Google Gemini API Key</label>
                      <p className="text-xs text-slate-500 mb-2">Required for the AI Assistant feature. Get a key from AI Studio.</p>
                      <div className="flex gap-2">
                          <input 
                            type="password" 
                            value={contentForm.googleApiKey || ''}
                            onChange={(e) => handleContentChange('googleApiKey', e.target.value)}
                            placeholder="AIzaSy..." 
                            className="flex-1 p-2 border border-slate-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-blue-500 outline-none"
                          />
                      </div>
                   </div>
                </div>
             </div>

             {/* HERO SETTINGS (TEXT & SLIDER) */}
             <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h3 className="font-bold text-slate-500 text-sm uppercase tracking-wide mb-4 border-b border-slate-200 pb-2">Hero Section Settings</h3>
                
                {/* Text Config */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                   <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Main Title</label>
                      <input type="text" value={contentForm.heroTitle} onChange={(e) => handleContentChange('heroTitle', e.target.value)} className="w-full p-2 border border-slate-300 rounded-lg"/>
                   </div>
                   <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Subtitle</label>
                      <input type="text" value={contentForm.heroSubtitle} onChange={(e) => handleContentChange('heroSubtitle', e.target.value)} className="w-full p-2 border border-slate-300 rounded-lg"/>
                   </div>
                   <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-1">Hero Description</label>
                      <textarea rows={3} value={contentForm.heroDescription} onChange={(e) => handleContentChange('heroDescription', e.target.value)} className="w-full p-2 border border-slate-300 rounded-lg"/>
                   </div>
                </div>

                {/* Slider Config */}
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <h4 className="font-bold text-[#0a1e3f] mb-3 flex items-center gap-2"><MonitorPlay size={16}/> Hero Slides</h4>
                    <div className="space-y-3 mb-3">
                        {contentForm.slides && contentForm.slides.map((slide, idx) => (
                            <div key={slide.id} className="flex items-center gap-3 bg-white p-2 rounded-lg border border-slate-200 shadow-sm">
                                <img src={slide.imageUrl} alt="mini" className="w-12 h-8 object-cover rounded" />
                                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2">
                                   <input type="text" value={slide.title} onChange={(e) => handleUpdateSlide(slide.id, 'title', e.target.value)} className="text-xs border p-1 rounded" placeholder="Slide Title"/>
                                   <input type="text" value={slide.subtitle} onChange={(e) => handleUpdateSlide(slide.id, 'subtitle', e.target.value)} className="text-xs border p-1 rounded" placeholder="Slide Subtitle"/>
                                </div>
                                <button onClick={() => handleDeleteSlide(slide.id)} className="text-red-500 hover:bg-red-50 p-1 rounded"><Trash2 size={16}/></button>
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <input type="text" value={newSlideUrl} onChange={(e) => setNewSlideUrl(e.target.value)} placeholder="https://example.com/image.jpg" className="flex-1 p-2 text-sm border border-slate-300 rounded-lg" />
                        <button onClick={handleAddSlide} className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-bold hover:bg-blue-700">Add Slide</button>
                    </div>
                </div>
             </div>

             {/* DYNAMIC SECTIONS MANAGEMENT */}
             <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="flex justify-between items-center mb-4 border-b border-slate-200 pb-2">
                   <h3 className="font-bold text-slate-500 text-sm uppercase tracking-wide">Dynamic Sections</h3>
                   <button onClick={handleAddSection} className="flex items-center gap-1 text-xs font-bold bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg hover:bg-blue-100">
                     <Plus size={14} /> Add New Section
                   </button>
                </div>

                <div className="space-y-4">
                   {contentForm.sections.map((section, index) => {
                     const isEditing = editingSectionId === section.id;
                     
                     if (isEditing && sectionForm) {
                       // SECTION EDIT FORM
                       return (
                         <div key={section.id} className="border-2 border-blue-500 rounded-xl p-6 bg-slate-50">
                            <div className="flex justify-between items-start mb-4">
                               <h4 className="font-bold text-blue-800">Editing: {section.title}</h4>
                               <button onClick={() => { setEditingSectionId(null); setSectionForm(null); }}><X size={20} className="text-slate-400" /></button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                               <div>
                                  <label className="block text-xs font-bold text-slate-500 mb-1">Title</label>
                                  <input value={sectionForm.title} onChange={e => setSectionForm({...sectionForm, title: e.target.value})} className="w-full p-2 border rounded-lg"/>
                               </div>
                               <div>
                                  <label className="block text-xs font-bold text-slate-500 mb-1">Variant / Style</label>
                                  <select value={sectionForm.variant} onChange={e => setSectionForm({...sectionForm, variant: e.target.value as any})} className="w-full p-2 border rounded-lg">
                                    <option value="default">Default (White/Center)</option>
                                    <option value="accent">Accent (Red/Gradient)</option>
                                    <option value="split">Split (Text + Card)</option>
                                  </select>
                               </div>
                               <div className="md:col-span-2">
                                  <label className="block text-xs font-bold text-slate-500 mb-1">Content / Description</label>
                                  <textarea value={sectionForm.content} onChange={e => setSectionForm({...sectionForm, content: e.target.value})} className="w-full p-2 border rounded-lg" rows={4}/>
                               </div>
                               <div><label className="block text-xs font-bold text-slate-500 mb-1">Subtitle</label><input value={sectionForm.subtitle || ''} onChange={e => setSectionForm({...sectionForm, subtitle: e.target.value})} className="w-full p-2 border rounded-lg"/></div>
                               <div><label className="block text-xs font-bold text-slate-500 mb-1">Video URL</label><input value={sectionForm.videoUrl || ''} onChange={e => setSectionForm({...sectionForm, videoUrl: e.target.value})} className="w-full p-2 border rounded-lg"/></div>
                               <div><label className="block text-xs font-bold text-slate-500 mb-1">Link URL</label><input value={sectionForm.linkUrl || ''} onChange={e => setSectionForm({...sectionForm, linkUrl: e.target.value})} className="w-full p-2 border rounded-lg"/></div>
                               <div><label className="block text-xs font-bold text-slate-500 mb-1">Link Text</label><input value={sectionForm.linkText || ''} onChange={e => setSectionForm({...sectionForm, linkText: e.target.value})} className="w-full p-2 border rounded-lg"/></div>
                            </div>
                            <div className="flex justify-end gap-2">
                               <button onClick={handleSaveSection} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2"><Save size={16}/> Save Section</button>
                            </div>
                         </div>
                       );
                     }
                     return (
                       <div key={section.id} className="border border-slate-200 rounded-lg p-4 flex items-center justify-between bg-slate-50 hover:bg-white transition-colors">
                          <div className="flex items-center gap-4">
                             <div className="flex flex-col gap-1">
                                <button onClick={() => moveSection(index, 'up')} disabled={index === 0} className="text-slate-400 hover:text-blue-600 disabled:opacity-20"><ArrowUp size={16}/></button>
                                <button onClick={() => moveSection(index, 'down')} disabled={index === contentForm.sections.length - 1} className="text-slate-400 hover:text-blue-600 disabled:opacity-20"><ArrowDown size={16}/></button>
                             </div>
                             <div>
                                <h4 className="font-bold text-slate-800">{section.title}</h4>
                                <p className="text-xs text-slate-500 truncate max-w-md">{section.content}</p>
                             </div>
                          </div>
                          <div className="flex items-center gap-2">
                             <button onClick={() => handleEditSection(section)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit2 size={18}/></button>
                             <button onClick={() => handleDeleteSection(section.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={18}/></button>
                          </div>
                       </div>
                     );
                   })}
                </div>
             </div>

             {/* PHOTO GALLERY MANAGEMENT */}
             <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h3 className="font-bold text-slate-500 text-sm uppercase tracking-wide mb-4 border-b border-slate-200 pb-2">Photo Gallery</h3>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    {contentForm.gallery && contentForm.gallery.map(item => (
                        <div key={item.id} className="relative group aspect-square rounded-lg overflow-hidden border border-slate-200">
                            <img src={item.imageUrl} alt={item.caption} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white p-2 text-center">
                                <p className="text-xs font-bold mb-2">{item.caption}</p>
                                <button onClick={() => handleDeleteGallery(item.id)} className="bg-red-500 p-1.5 rounded-full hover:bg-red-600"><Trash2 size={14}/></button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                    <h4 className="font-bold text-[#0a1e3f] mb-3 flex items-center gap-2 text-sm"><ImageIcon size={16}/> Add New Photo</h4>
                    <div className="flex flex-col md:flex-row gap-2">
                        <input type="text" value={newGalleryUrl} onChange={(e) => setNewGalleryUrl(e.target.value)} placeholder="Image URL (https://...)" className="flex-[2] p-2 text-sm border border-slate-300 rounded-lg" />
                        <input type="text" value={newGalleryCaption} onChange={(e) => setNewGalleryCaption(e.target.value)} placeholder="Caption / Description" className="flex-1 p-2 text-sm border border-slate-300 rounded-lg" />
                        <button onClick={handleAddGallery} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-700">Add</button>
                    </div>
                </div>
             </div>

             {/* Footer Info */}
             <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                 <h3 className="font-bold text-slate-500 text-sm uppercase tracking-wide mb-4 border-b border-slate-200 pb-2">Footer Contact Info</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                      <input 
                        type="text" 
                        value={contentForm.contactEmail}
                        onChange={(e) => handleContentChange('contactEmail', e.target.value)}
                        className="w-full p-2 border border-slate-300 rounded-lg"
                      />
                    </div>
                    <div><label className="block text-sm font-medium text-slate-700 mb-1">Address 1</label><input type="text" value={contentForm.contactAddress1} onChange={(e) => handleContentChange('contactAddress1', e.target.value)} className="w-full p-2 border border-slate-300 rounded-lg"/></div>
                    <div><label className="block text-sm font-medium text-slate-700 mb-1">Address 2</label><input type="text" value={contentForm.contactAddress2} onChange={(e) => handleContentChange('contactAddress2', e.target.value)} className="w-full p-2 border border-slate-300 rounded-lg"/></div>
                 </div>
             </div>

             <div className="flex justify-end sticky bottom-6 z-30">
                <button
                  onClick={handleSaveContent}
                  disabled={showContentSuccess}
                  className={`px-8 py-3 rounded-xl font-bold text-white shadow-xl flex items-center justify-center gap-2 transform transition-all duration-300 w-64 ${
                    showContentSuccess
                      ? 'bg-emerald-600 shadow-emerald-200'
                      : 'bg-blue-600 hover:bg-blue-700 shadow-blue-200 hover:scale-105'
                  }`}
                >
                  {showContentSuccess ? (
                    <>
                      <CheckCircle size={20} /> Draft Saved!
                    </>
                  ) : (
                    <>
                      <Edit2 size={20} /> Save to Draft
                    </>
                  )}
                </button>
             </div>
          </div>
        )}
        
        <div className="mt-12 text-center text-slate-400 text-sm">
           <p>Apps PDB Content Management System v2.3 (API Config Support)</p>
        </div>
      </div>
    </div>
  );
};