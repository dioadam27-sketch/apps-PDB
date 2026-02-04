export interface AppModule {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  status: 'active' | 'maintenance' | 'beta';
  urlHash: string;
  externalUrl?: string;
  visible?: boolean;
}

export interface UserProfile {
  name: string;
  role: string;
  avatar: string;
  department: string;
}

export interface HeroSlide {
  id: string;
  imageUrl: string;
  title?: string;
  subtitle?: string;
}

export interface GalleryItem {
  id: string;
  imageUrl: string;
  caption: string;
}

export interface LandingSection {
  id: string;
  title: string;
  subtitle?: string;
  content: string; // Description
  variant: 'default' | 'accent' | 'split'; // Visual style
  videoUrl?: string;
  videoUrl2?: string;
  linkUrl?: string;
  linkText?: string;
  isVisible: boolean;
}

export interface LandingContent {
  // Global Config
  googleApiKey?: string;

  // Hero Config (Text overlay)
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  
  // Dynamic Slider
  slides: HeroSlide[];
  
  // Dynamic Sections (PDB, National, AIL, etc)
  sections: LandingSection[];

  // Dynamic Gallery
  gallery: GalleryItem[];

  // Footer (Tetap Fixed)
  contactEmail: string;
  contactAddress1: string;
  contactAddress2: string;
}