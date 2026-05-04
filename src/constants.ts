import { Influencer, PricingPlan } from './types';

export const INFLUENCERS: Influencer[] = [
  {
    id: '1',
    name: 'Sarah Makan-makan',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400&h=400',
    niche: 'Food Reviewer',
    location: 'Jakarta',
    followers: 12500,
    engagementRate: 8.2,
    avgViews: 45000,
    priceRange: 'Rp 750rb - 2jt',
    platform: 'TikTok',
    bio: 'Menjelajahi permata kuliner tersembunyi di Jakarta satu suapan setiap hari.',
    portfolio: [
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=400&h=400',
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400&h=400',
      'https://images.unsplash.com/photo-1567620905732-2d1ec7bb7445?auto=format&fit=crop&q=80&w=400&h=400',
    ]
  },
  {
    id: '2',
    name: 'Raja Kopi',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=400',
    niche: 'Cafe Hunter',
    location: 'Bandung',
    followers: 8900,
    engagementRate: 6.5,
    avgViews: 22000,
    priceRange: 'Rp 500rb - 1.5jt',
    platform: 'Instagram',
    bio: 'Mencari tempat kopi paling estetik di kota kembang.',
    portfolio: [
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=400&h=400',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=400&h=400',
      'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80&w=400&h=400',
    ]
  },
  {
    id: '3',
    name: 'Sam Street Food',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400&h=400',
    niche: 'Street Food',
    location: 'Surabaya',
    followers: 25000,
    engagementRate: 12.4,
    avgViews: 120000,
    priceRange: 'Rp 1.5jt - 5jt',
    platform: 'TikTok',
    bio: "Ahli makanan kaki lima Surabaya. Kalau ada di gerobak, pasti saya coba.",
    portfolio: [
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=400&h=400',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=400&h=400',
      'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&q=80&w=400&h=400',
    ]
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    name: 'Gratis',
    price: 'Rp 0',
    features: ['Profil Dasar', 'Portfolio Manual', 'Analitik Standar', 'Hubungkan 1 Platform'],
    limitations: ['Statistik Terbatas', 'Tanpa Insight Audiens', 'Dukungan Dasar'],
    bestFor: 'Influencer mikro pemula'
  },
  {
    name: 'Pro',
    price: 'Rp 299rb',
    features: ['Profil Lanjutan', 'Portfolio Otomatis', 'Statistik Engagement Detail', 'Semua Platform'],
    limitations: ['Tanpa Grafik Pertumbuhan', 'Dukungan Email Saja'],
    bestFor: 'Influencer yang sedang berkembang'
  },
  {
    name: 'Premium',
    price: 'Rp 799rb',
    features: ['Dashboard Analitik Lengkap', 'Demografi Audiens', 'Pelacakan Pertumbuhan', 'Dukungan Prioritas'],
    limitations: ['Kelola brand mandiri'],
    bestFor: 'Influencer mikro mapan',
    recommended: true
  },
  {
    name: 'Elite',
    price: 'Rp 1.5jt',
    features: ['Manajer Khusus', 'Matchmaking Brand', 'Optimalisasi Konten AI', 'Laporan White-label'],
    limitations: [],
    bestFor: 'Influencer Top & Agensi'
  }
];
