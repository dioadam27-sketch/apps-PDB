import { AppModule, UserProfile, LandingContent } from './types';
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
    externalUrl: 'https://simpdb-ua.netlify.app/',
    visible: true
  },
  {
    id: 'helpdesk',
    name: 'Helpdesk PDB',
    description: 'Layanan komplain pengajuan izin tidak masuk kuliah.',
    icon: 'LifeBuoy',
    color: 'bg-emerald-500',
    status: 'active',
    urlHash: 'helpdesk',
    externalUrl: 'https://helpdeskpdb.netlify.app/',
    visible: true
  },
  {
    id: 'phl',
    name: 'Ruang PDB',
    description: 'Pesan Ruang untuk kuliah pengganti.',
    icon: 'Building2',
    color: 'bg-orange-500',
    status: 'beta',
    urlHash: 'phl',
    externalUrl: 'https://ruangpdb.netlify.app/',
    visible: true
  },
  {
    id: 'repository',
    name: 'PKKII Repository',
    description: 'Arsip Digital.',
    icon: 'Archive',
    color: 'bg-indigo-600',
    status: 'active',
    urlHash: 'repository',
    externalUrl: 'https://arsip-pkkii.netlify.app/',
    visible: true
  }
];

export const MOCK_USER: UserProfile = {
  name: "Dr. Budi Santoso",
  role: "Super Administrator",
  department: "Direktorat Sumber Daya Manusia",
  avatar: "https://picsum.photos/200"
};

export const DEFAULT_LANDING_CONTENT: LandingContent = {
  googleApiKey: "", // Default empty, to be configured in Admin Panel
  heroTitle: "Sub Direktorat PKKII",
  heroSubtitle: "Pendidikan Karakter, Kebangsaan, Inklusi, dan Interprofesional",
  heroDescription: "PKKII merupakan Sub Direktorat di dalam Direktorat Pendidikan UNAIR yang bertugas menjalankan tiga kegiatan utama. Kegiatan tersebut meliputi Pendidikan Dasar Bersama (PDB), Pendidikan Inklusi, Kuliah Kebangsaan, serta Interprofessional Education (IPE) di lingkungan UNAIR.",
  
  slides: [
    {
      id: 'slide_1',
      imageUrl: 'https://upkk.unair.ac.id/gambar/VB-6.jpg',
      title: 'Gedung Kuliah Bersama',
      subtitle: 'Kampus C UNAIR'
    },
    {
      id: 'slide_2',
      imageUrl: 'https://unair.ac.id/wp-content/uploads/2023/11/Gedung-Rektorat-UNAIR-Kampus-C-Mulyorejo-Surabaya.jpg',
      title: 'Kampus C Mulyorejo',
      subtitle: 'Pusat Administrasi'
    },
    {
      id: 'slide_3',
      imageUrl: 'https://unair.ac.id/wp-content/uploads/2022/07/Danau-Kampus-C-UNAIR.jpg',
      title: 'Lingkungan Asri',
      subtitle: 'Danau Kampus C'
    }
  ],

  sections: [
    {
      id: 'sec_pdb',
      title: "Pembelajaran Dasar Bersama",
      subtitle: "Program Unggulan",
      content: "SubDIt PKKII menjalankan PDB (Pembelajaran Dasar Bersama) sebagai langkah dalam memperkuat pendidikan kebangsaan dan karakter mahasiswa. Kegiatan ini terselenggara pada semester pertama terhitung mulai semester Gasal 2021/2022. PDB mengintegrasikan tiga pilar pendidikan, yaitu, pendidikan kewarganegaraan, pengenalan dasar-dasar keilmuan, serta pengembangan keahlian sesuai rumpun ilmu masing-masing.",
      variant: 'default',
      videoUrl: "https://www.youtube-nocookie.com/embed/V2IfvmP-sJE?rel=0",
      videoUrl2: "https://www.youtube.com/embed/vuAtVd1W1XU?si=xWrw1I8n8Mia87f7",
      isVisible: true
    },
    {
      id: 'sec_national',
      title: "Perkuat Kolaborasi dan Pendidikan Kebangsaan",
      content: "PKKII turut menjalankan kegiatan kuliah kebangsaan yang terselenggara secara periodik dengan menghadirkan tokoh-tokoh nasional, praktisi, dan profesional Indonesia. Lebih lanjut, Interprofessional Education (IPE) juga menjadi mata kuliah dan kegiatan wajib bagi mahasiswa UNAIR guna meningkatkan kemampuan kolaborasi lintas disiplin mahasiswa.",
      variant: 'accent',
      videoUrl: "https://www.youtube-nocookie.com/embed/TFf2g7BqMoY?si=YcAtP99oa0wJLFYk&rel=0",
      isVisible: true
    },
    {
      id: 'sec_ail',
      title: "Airlangga Inklusive Learning (AIL)",
      content: "Unit Pelayanan Pendidikan Inklusif Universitas Airlangga, atau dikenal sebagai Airlangga Inklusive Learning (AIL), adalah Unit Pelayanan Disabilitas (ULD) yang secara struktural berada di bawah Direktorat Pendidikan. Sejak didirikan pada tahun 2016, AIL berkomitmen untuk mewujudkan pendidikan tinggi yang inklusif, adil, dan setara bagi seluruh komunitas akademik.",
      variant: 'split',
      linkUrl: "https://ail.pendidikan.unair.ac.id/",
      linkText: "Kunjungi Website AIL",
      isVisible: true
    }
  ],

  gallery: [
    {
      id: 'gal_1',
      imageUrl: 'https://ppk2ipe.unair.ac.id/gambar/DSC03511.JPG',
      caption: 'Kegiatan PDB'
    },
    {
      id: 'gal_2',
      imageUrl: 'https://ppk2ipe.unair.ac.id/gambar/DSC03560.JPG',
      caption: 'Kuliah Kebangsaan'
    },
    {
      id: 'gal_3',
      imageUrl: 'https://ppk2ipe.unair.ac.id/gambar/DSC03612.JPG',
      caption: 'Diskusi Kelompok'
    },
    {
      id: 'gal_4',
      imageUrl: 'https://ppk2ipe.unair.ac.id/gambar/DSC03657.JPG',
      caption: 'Presentasi Mahasiswa'
    }
  ],

  contactEmail: "direktorat@ditpend.unair.ac.id",
  contactAddress1: "Kampus C UNAIR, Jl. Mulyorejo, Surabaya – 60115",
  contactAddress2: "Gedung Nano Lt 8, Kampus C - JL. Mulyorejo, Surabaya-60115"
};