import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, ShoppingBag, Users, MessageSquare, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';

const UMKMDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-brand-900">Dashboard UMKM</h1>
        <p className="text-brand-500">Selamat datang kembali, {user?.displayName}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-8 rounded-[30px] border border-brand-100 shadow-sm">
          <div className="bg-brand-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 text-brand-500">
            <Users size={24} />
          </div>
          <h3 className="text-2xl font-black text-brand-900">12</h3>
          <p className="text-brand-500 text-sm">Kolaborasi Aktif</p>
        </div>
        <div className="bg-white p-8 rounded-[30px] border border-brand-100 shadow-sm">
          <div className="bg-brand-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 text-brand-500">
            <MessageSquare size={24} />
          </div>
          <h3 className="text-2xl font-black text-brand-900">5</h3>
          <p className="text-brand-500 text-sm">Pesan Baru</p>
        </div>
        <div className="bg-white p-8 rounded-[30px] border border-brand-100 shadow-sm">
          <div className="bg-brand-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 text-brand-500">
            <TrendingUp size={24} />
          </div>
          <h3 className="text-2xl font-black text-brand-900">+24%</h3>
          <p className="text-brand-500 text-sm">Peningkatan Reach</p>
        </div>
      </div>

      <div className="bg-brand-900 text-white rounded-[40px] p-12 overflow-hidden relative">
        <div className="relative z-10">
          <h2 className="text-3xl font-black mb-4">Temukan Influencer Baru</h2>
          <p className="text-brand-300 mb-8 max-w-xl">
            Mulai kampanye baru dan hubungkan brand kuliner Anda dengan ribuan micro-influencer terakreditasi.
          </p>
          <button className="bg-brand-400 text-brand-900 px-8 py-4 rounded-2xl font-bold hover:bg-brand-300 transition-colors">
            Cari Influencer
          </button>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/20 rounded-full blur-3xl -mr-32 -mt-32" />
      </div>
    </div>
  );
};

export default UMKMDashboard;
