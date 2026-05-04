import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import InfluencerCard from '../components/InfluencerCard';
import { INFLUENCERS } from '../constants';
import { Niche, Platform as PlatformType } from '../types';

const Influencers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNiche, setSelectedNiche] = useState<Niche | 'All'>('All');
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformType | 'All'>('All');

  const filteredInfluencers = INFLUENCERS.filter((inf) => {
    const matchesSearch = inf.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          inf.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesNiche = selectedNiche === 'All' || inf.niche === selectedNiche;
    const matchesPlatform = selectedPlatform === 'All' || inf.platform === selectedPlatform;
    return matchesSearch && matchesNiche && matchesPlatform;
  });

  const niches: (Niche | 'Semua')[] = ['Semua', 'Food Reviewer', 'Cafe Hunter', 'Street Food', 'Dessert', 'Healthy Food'];
  const platforms: (PlatformType | 'Semua')[] = ['Semua', 'TikTok', 'Instagram'];

  return (
    <div className="pt-32 pb-24 bg-brand-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-brand-900 mb-4">Cari Influencer</h1>
          <p className="text-xl text-brand-500">Cari melalui daftar influencer mikro kuliner kami yang sudah terverifikasi.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Filters Sidebar */}
          <aside className="lg:w-1/4 space-y-8">
            <div className="bg-white p-8 rounded-[30px] border border-brand-100 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <Filter size={20} className="text-brand-500" />
                <h3 className="text-lg font-bold text-brand-900">Filter</h3>
              </div>

              {/* Search */}
              <div className="mb-8">
                <label className="block text-xs font-bold text-brand-400 uppercase mb-3">Cari</label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-300" size={18} />
                  <input
                    type="text"
                    placeholder="Nama atau kota..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-brand-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-brand-900 transition-all"
                  />
                </div>
              </div>

              {/* Niche */}
              <div className="mb-8">
                <label className="block text-xs font-bold text-brand-400 uppercase mb-3">Kategori Niche</label>
                <div className="space-y-2">
                  {niches.map((niche) => (
                    <button
                      key={niche}
                      onClick={() => setSelectedNiche(niche === 'Semua' ? 'All' : niche)}
                      className={`block w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        (selectedNiche === 'All' ? 'Semua' : selectedNiche) === niche ? 'bg-brand-900 text-white shadow-lg shadow-brand-900/20' : 'text-brand-600 hover:bg-brand-50'
                      }`}
                    >
                      {niche}
                    </button>
                  ))}
                </div>
              </div>

              {/* Platform */}
              <div>
                <label className="block text-xs font-bold text-brand-400 uppercase mb-3">Platform</label>
                <div className="flex gap-2">
                  {platforms.map((plat) => (
                    <button
                      key={plat}
                      onClick={() => setSelectedPlatform(plat === 'Semua' ? 'All' : plat)}
                      className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all ${
                        (selectedPlatform === 'All' ? 'Semua' : selectedPlatform) === plat ? 'bg-brand-900 text-white shadow-lg shadow-brand-900/20' : 'bg-brand-50 text-brand-600 hover:bg-brand-100'
                      }`}
                    >
                      {plat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Promo Card */}
            <div className="bg-brand-900 p-8 rounded-[30px] text-white">
              <h4 className="text-xl font-bold mb-4">Ingin data lebih?</h4>
              <p className="text-brand-300 text-sm mb-6 leading-relaxed">
                Hubungkan akun brand Anda untuk membuka insight audiens yang mendalam.
              </p>
              <button className="w-full bg-brand-400 text-brand-900 py-3 rounded-xl font-bold text-sm hover:bg-brand-300 transition-all">
                Upgrade Sekarang
              </button>
            </div>
          </aside>

          {/* Listing Grid */}
          <div className="lg:w-3/4">
            {filteredInfluencers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredInfluencers.map((inf) => (
                  <InfluencerCard key={inf.id} influencer={inf} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-[40px] p-20 text-center border border-dashed border-brand-200">
                <Search size={64} className="mx-auto mb-6 text-brand-100" />
                <h3 className="text-2xl font-bold text-brand-900 mb-2">Influencer tidak ditemukan</h3>
                <p className="text-brand-500">Coba sesuaikan filter atau kata kunci pencarian Anda.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Influencers;
