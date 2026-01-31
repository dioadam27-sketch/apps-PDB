export interface AppModule {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  status: 'active' | 'maintenance' | 'beta';
  urlHash: string;
  externalUrl?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isLoading?: boolean;
}

export interface UserProfile {
  name: string;
  role: string;
  avatar: string;
  department: string;
}