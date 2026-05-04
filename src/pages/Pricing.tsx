import React from 'react';
import PriceCard from '../components/PriceCard';
import { PRICING_PLANS } from '../constants';
import { HelpCircle } from 'lucide-react';

const Pricing = () => {
  return (
    <div className="pt-32 pb-24 bg-brand-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <span className="inline-block bg-brand-900 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
            Untuk Influencer
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-brand-900 mb-6">Alat Pertumbuhan Profesional</h1>
          <p className="text-xl text-brand-500 max-w-2xl mx-auto">
            Pilih paket yang sesuai dengan tahap karier Anda. Semua paket mencakup visibilitas ke brand kuliner.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {PRICING_PLANS.map((plan) => (
            <PriceCard key={plan.name} plan={plan} />
          ))}
        </div>

        {/* Business Note */}
        <div className="bg-white rounded-[50px] p-12 text-center border border-brand-100 shadow-sm max-w-4xl mx-auto">
          <HelpCircle size={48} className="mx-auto mb-6 text-brand-200" />
          <h2 className="text-3xl font-black text-brand-900 mb-4">Apakah Anda brand kuliner?</h2>
          <p className="text-lg text-brand-600 mb-8">
            Akses ke direktori influencer dan alat pembuatan kampanye kami sepenuhnya gratis untuk UMKM kuliner terverifikasi.
          </p>
          <a href="/umkm" className="text-brand-900 font-bold border-b-2 border-brand-900 pb-1 hover:text-brand-500 hover:border-brand-500 transition-colors">
            Pelajari lebih lanjut tentang Untuk UMKM
          </a>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
