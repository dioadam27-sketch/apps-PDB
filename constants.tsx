import { AppModule, UserProfile } from './types';
import React from 'react';

export const APP_MODULES: AppModule[] = [
  {
    id: 'simpdb',
    name: 'SIMPDB Admin',
    description: 'Sistem Penjadwalan dan plotting Dosen.',
    icon: 'CalendarDays',
    color: 'bg-blue-600',
    status: 'active',
    urlHash: 'simpdb',
    externalUrl: 'https://simpdb-ua.netlify.app/'
  },
  {
    id: 'helpdesk',
    name: 'Helpdesk PDB',
    description: 'Layanan komplain pengajuan izin tidak masuk kuliah.',
    icon: 'LifeBuoy',
    color: 'bg-emerald-500',
    status: 'active',
    urlHash: 'helpdesk',
    externalUrl: 'https://helpdeskpdb.netlify.app/'
  },
  {
    id: 'phl',
    name: 'Ruang PDB',
    description: 'Pesan Ruang untuk kuliah pengganti.',
    icon: 'Building2',
    color: 'bg-orange-500',
    status: 'beta',
    urlHash: 'phl',
    externalUrl: 'https://ruangpdb.netlify.app/'
  },
  {
    id: 'repository',
    name: 'PKKII Repository',
    description: 'Arsip Digital.',
    icon: 'Archive',
    color: 'bg-indigo-600',
    status: 'active',
    urlHash: 'repository',
    externalUrl: 'https://arsip-pkkii.netlify.app/'
  }
];

export const MOCK_USER: UserProfile = {
  name: "Dr. Budi Santoso",
  role: "Super Administrator",
  department: "Direktorat Sumber Daya Manusia",
  avatar: "https://picsum.photos/200"
};