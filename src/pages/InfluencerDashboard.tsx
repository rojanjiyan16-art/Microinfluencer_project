import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Star, Eye, DollarSign, Zap } from 'lucide-react';
import { motion } from 'motion/react';

const InfluencerDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black text-brand-900 leading-tight">Dashboard Influencer</h1>
          <p className="text-brand-500">Selamat berkarya, <span className="font-bold text-brand-900">{user?.displayName}</span></p>
        </div>
        <div className="bg-brand-400 text-brand-900 px-6 py-2 rounded-full text-sm font-black uppercase tracking-widest flex items-center gap-2">
          <Star size={16} fill="currentColor" /> Paket FREE
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-white p-6 rounded-[30px] border border-brand-100 shadow-sm">
          <div className="bg-brand-50 w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-brand-500">
            <Eye size={20} />
          </div>
          <p className="text-brand-400 text-xs font-bold uppercase tracking-widest mb-1">Total Views</p>
          <h3 className="text-2xl font-black text-brand-900">45.2K</h3>
        </div>
        <div className="bg-white p-6 rounded-[30px] border border-brand-100 shadow-sm">
          <div className="bg-brand-50 w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-brand-500">
            <Star size={20} />
          </div>
          <p className="text-brand-400 text-xs font-bold uppercase tracking-widest mb-1">Engagement Rate</p>
          <h3 className="text-2xl font-black text-brand-900">8.4%</h3>
        </div>
        <div className="bg-white p-6 rounded-[30px] border border-brand-100 shadow-sm">
          <div className="bg-brand-50 w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-brand-500">
            <DollarSign size={20} />
          </div>
          <p className="text-brand-400 text-xs font-bold uppercase tracking-widest mb-1">Penghasilan</p>
          <h3 className="text-2xl font-black text-brand-900">Rp 2.4M</h3>
        </div>
        <div className="bg-white p-6 rounded-[30px] border border-brand-100 shadow-sm">
          <div className="bg-brand-50 w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-brand-500">
            <Zap size={20} />
          </div>
          <p className="text-brand-400 text-xs font-bold uppercase tracking-widest mb-1">Proposal</p>
          <h3 className="text-2xl font-black text-brand-900">3 Baru</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-[40px] border border-brand-100 shadow-sm">
          <h2 className="text-2xl font-black text-brand-900 mb-6">Penawaran Kerjasama Baru</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-brand-50 rounded-2xl border border-brand-100/50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-brand-400 border border-brand-100">
                    <Star size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-900">Warung Makan Bahagia</h4>
                    <p className="text-xs text-brand-500">Campaign: Makan Siang Hemat</p>
                  </div>
                </div>
                <button className="text-brand-500 font-bold text-sm hover:text-brand-900 transition-colors">Lihat Detail</button>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-brand-900 text-white rounded-[40px] p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-black mb-4">Upgrade ke PRO</h2>
            <p className="text-brand-300 text-sm leading-relaxed mb-6">
              Dapatkan badge verifikasi, prioritas dalam pencarian brand, dan analitik real-time yang lebih mendalam.
            </p>
          </div>
          <button className="w-full bg-brand-400 text-brand-900 py-4 rounded-2xl font-bold hover:bg-brand-300 transition-colors">
            Upgrade Sekarang
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfluencerDashboard;
