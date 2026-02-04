-- --------------------------------------------------------
-- Database Schema for Apps PDB
-- Compatible with MySQL / MariaDB
-- --------------------------------------------------------

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+07:00";

--
-- Table structure for table `app_modules`
--

CREATE TABLE `app_modules` (
  `id` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `icon` varchar(50) NOT NULL DEFAULT 'Grid',
  `color` varchar(50) NOT NULL DEFAULT 'bg-slate-700',
  `status` enum('active','maintenance','beta') NOT NULL DEFAULT 'active',
  `url_hash` varchar(100) NOT NULL,
  `external_url` varchar(255) DEFAULT NULL,
  `visible` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `app_modules` (`id`, `name`, `description`, `icon`, `color`, `status`, `url_hash`, `external_url`, `visible`) VALUES
('simpdb', 'SIMPDB Admin', 'Sistem Penjadwalan dan plotting Dosen.', 'CalendarDays', 'bg-blue-600', 'active', 'simpdb', 'https://simpdb-ua.netlify.app/', 1),
('helpdesk', 'Helpdesk PDB', 'Layanan komplain pengajuan izin tidak masuk kuliah.', 'LifeBuoy', 'bg-emerald-500', 'active', 'helpdesk', 'https://helpdeskpdb.netlify.app/', 1),
('phl', 'Ruang PDB', 'Pesan Ruang untuk kuliah pengganti.', 'Building2', 'bg-orange-500', 'beta', 'phl', 'https://ruangpdb.netlify.app/', 1),
('repository', 'PKKII Repository', 'Arsip Digital.', 'Archive', 'bg-indigo-600', 'active', 'repository', 'https://arsip-pkkii.netlify.app/', 1);

-- --------------------------------------------------------

--
-- Table structure for table `landing_config`
--

CREATE TABLE `landing_config` (
  `id` int(11) NOT NULL,
  `hero_title` varchar(255) NOT NULL,
  `hero_subtitle` varchar(255) NOT NULL,
  `hero_description` text NOT NULL,
  `contact_email` varchar(100) NOT NULL,
  `contact_address1` text NOT NULL,
  `contact_address2` text NOT NULL,
  `google_api_key` varchar(255) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `landing_config` (`id`, `hero_title`, `hero_subtitle`, `hero_description`, `contact_email`, `contact_address1`, `contact_address2`, `google_api_key`) VALUES
(1, 'Sub Direktorat PKKII', 'Pendidikan Karakter, Kebangsaan, Inklusi, dan Interprofesional', 'PKKII merupakan Sub Direktorat di dalam Direktorat Pendidikan UNAIR yang bertugas menjalankan tiga kegiatan utama. Kegiatan tersebut meliputi Pendidikan Dasar Bersama (PDB), Pendidikan Inklusi, Kuliah Kebangsaan, serta Interprofessional Education (IPE) di lingkungan UNAIR.', 'direktorat@ditpend.unair.ac.id', 'Kampus C UNAIR, Jl. Mulyorejo, Surabaya – 60115', 'Gedung Nano Lt 8, Kampus C - JL. Mulyorejo, Surabaya-60115', '');

-- --------------------------------------------------------

--
-- Table structure for table `landing_sections`
--

CREATE TABLE `landing_sections` (
  `id` varchar(50) NOT NULL,
  `title` varchar(255) NOT NULL,
  `subtitle` varchar(100) DEFAULT NULL,
  `content` text NOT NULL,
  `variant` enum('default','accent','split') NOT NULL DEFAULT 'default',
  `video_url` varchar(255) DEFAULT NULL,
  `video_url2` varchar(255) DEFAULT NULL,
  `link_url` varchar(255) DEFAULT NULL,
  `link_text` varchar(100) DEFAULT NULL,
  `is_visible` tinyint(1) NOT NULL DEFAULT 1,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `landing_sections` (`id`, `title`, `subtitle`, `content`, `variant`, `video_url`, `video_url2`, `link_url`, `link_text`, `is_visible`, `sort_order`) VALUES
('sec_pdb', 'Pembelajaran Dasar Bersama', 'Program Unggulan', 'SubDIt PKKII menjalankan PDB (Pembelajaran Dasar Bersama) sebagai langkah dalam memperkuat pendidikan kebangsaan dan karakter mahasiswa. Kegiatan ini terselenggara pada semester pertama terhitung mulai semester Gasal 2021/2022. PDB mengintegrasikan tiga pilar pendidikan, yaitu, pendidikan kewarganegaraan, pengenalan dasar-dasar keilmuan, serta pengembangan keahlian sesuai rumpun ilmu masing-masing.', 'default', 'https://www.youtube-nocookie.com/embed/V2IfvmP-sJE?rel=0', 'https://www.youtube.com/embed/vuAtVd1W1XU?si=xWrw1I8n8Mia87f7', NULL, NULL, 1, 1),
('sec_national', 'Perkuat Kolaborasi dan Pendidikan Kebangsaan', NULL, 'PKKII turut menjalankan kegiatan kuliah kebangsaan yang terselenggara secara periodik dengan menghadirkan tokoh-tokoh nasional, praktisi, dan profesional Indonesia. Lebih lanjut, Interprofessional Education (IPE) juga menjadi mata kuliah dan kegiatan wajib bagi mahasiswa UNAIR guna meningkatkan kemampuan kolaborasi lintas disiplin mahasiswa.', 'accent', 'https://www.youtube-nocookie.com/embed/TFf2g7BqMoY?si=YcAtP99oa0wJLFYk&rel=0', NULL, NULL, NULL, 1, 2),
('sec_ail', 'Airlangga Inklusive Learning (AIL)', NULL, 'Unit Pelayanan Pendidikan Inklusif Universitas Airlangga, atau dikenal sebagai Airlangga Inklusive Learning (AIL), adalah Unit Pelayanan Disabilitas (ULD) yang secara struktural berada di bawah Direktorat Pendidikan. Sejak didirikan pada tahun 2016, AIL berkomitmen untuk mewujudkan pendidikan tinggi yang inklusif, adil, dan setara bagi seluruh komunitas akademik.', 'split', NULL, NULL, 'https://ail.pendidikan.unair.ac.id/', 'Kunjungi Website AIL', 1, 3);

-- --------------------------------------------------------

--
-- Table structure for table `landing_slides`
-- (NEW) Menyimpan gambar slider/carousel di Hero
--

CREATE TABLE `landing_slides` (
  `id` varchar(50) NOT NULL,
  `image_url` varchar(500) NOT NULL,
  `title` varchar(100) DEFAULT NULL,
  `subtitle` varchar(100) DEFAULT NULL,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `landing_slides` (`id`, `image_url`, `title`, `subtitle`, `sort_order`) VALUES
('slide_1', 'https://upkk.unair.ac.id/gambar/VB-6.jpg', 'Gedung Kuliah Bersama', 'Kampus C UNAIR', 1),
('slide_2', 'https://unair.ac.id/wp-content/uploads/2023/11/Gedung-Rektorat-UNAIR-Kampus-C-Mulyorejo-Surabaya.jpg', 'Kampus C Mulyorejo', 'Pusat Administrasi', 2),
('slide_3', 'https://unair.ac.id/wp-content/uploads/2022/07/Danau-Kampus-C-UNAIR.jpg', 'Lingkungan Asri', 'Danau Kampus C', 3);

-- --------------------------------------------------------

--
-- Table structure for table `landing_gallery`
-- (NEW) Menyimpan foto-foto galeri di bawah
--

CREATE TABLE `landing_gallery` (
  `id` varchar(50) NOT NULL,
  `image_url` varchar(500) NOT NULL,
  `caption` varchar(255) DEFAULT NULL,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `landing_gallery` (`id`, `image_url`, `caption`, `sort_order`) VALUES
('gal_1', 'https://ppk2ipe.unair.ac.id/gambar/DSC03511.JPG', 'Kegiatan PDB', 1),
('gal_2', 'https://ppk2ipe.unair.ac.id/gambar/DSC03560.JPG', 'Kuliah Kebangsaan', 2),
('gal_3', 'https://ppk2ipe.unair.ac.id/gambar/DSC03612.JPG', 'Diskusi Kelompok', 3),
('gal_4', 'https://ppk2ipe.unair.ac.id/gambar/DSC03657.JPG', 'Presentasi Mahasiswa', 4);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `role` varchar(50) NOT NULL DEFAULT 'admin',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `users` (`username`, `password_hash`, `full_name`, `role`) VALUES
('admin', '$2y$10$EXAMPLEHASH...', 'Administrator PKKII', 'super_admin');

COMMIT;