import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, ShoppingBag, BarChart3, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import InfluencerCard from '../components/InfluencerCard';
import PriceCard from '../components/PriceCard';
import { INFLUENCERS, PRICING_PLANS } from '../constants';

const Home = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] md:h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=2000"
            alt="Micro influencer taking food photo"
            className="w-full h-full object-cover brightness-[0.4]"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20 md:pt-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-white text-center md:text-left"
          >
            <h1 className="text-4xl md:text-7xl font-black leading-[1.1] mb-6">
              Temukan <span className="text-brand-400">Micro-Influencer</span> Terbaik untuk Bisnis Kuliner Anda
            </h1>
            <p className="text-lg md:text-2xl text-brand-200 mb-10 leading-relaxed font-light">
              Analistik real-time dari TikTok & Instagram untuk membantu Anda memilih influencer yang tepat. Data terverifikasi, engagement nyata.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/influencers"
                className="bg-white text-brand-900 px-10 py-5 rounded-full text-lg font-bold hover:bg-brand-50 transition-all text-center shadow-2xl"
              >
                Cari Influencer
              </Link>
              <Link
                to="/login"
                className="bg-brand-900/40 backdrop-blur-md border border-white/20 text-white px-10 py-5 rounded-full text-lg font-bold hover:bg-white/10 transition-all text-center"
              >
                Gabung sebagai Influencer
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-brand-900 mb-4">Cara Kerja</h2>
            <p className="text-xl text-brand-500">Langkah mudah untuk meningkatkan engagement bisnis kuliner Anda hingga 10x lipat</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* For UMKM */}
            <div className="bg-brand-50 p-10 rounded-[40px] relative overflow-hidden">
              <div className="absolute -top-10 -right-10 text-brand-100">
                <ShoppingBag size={200} />
              </div>
              <h3 className="text-3xl font-black text-brand-900 mb-8 relative z-10">Untuk UMKM</h3>
              <div className="space-y-6 relative z-10">
                {[
                  'Cari influencer berdasarkan data performa nyata',
                  'Buat brief kampanye dalam hitungan menit',
                  'Komunikasi langsung dengan talenta terverifikasi',
                  'Pantau hasil dengan analitik real-time'
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="bg-white p-1 rounded-full"><CheckCircle2 className="text-emerald-500" size={24} /></div>
                    <p className="text-brand-700 font-medium text-lg">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* For Influencers */}
            <div className="bg-brand-900 p-10 rounded-[40px] text-white relative overflow-hidden">
               <div className="absolute -top-10 -right-10 text-white/5">
                <Users size={200} />
              </div>
              <h3 className="text-3xl font-black mb-8 relative z-10">Untuk Influencer</h3>
              <div className="space-y-6 relative z-10">
                {[
                  'Tampilkan analitik real-time Anda',
                  'Ditemukan oleh brand kuliner ternama',
                  'Kelola kolaborasi dan portofolio',
                  'Atur tarif dan ketersediaan Anda sendiri'
                ].map((item, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <div className="bg-white/10 p-1 rounded-full"><CheckCircle2 className="text-brand-300" size={24} /></div>
                    <p className="text-brand-200 font-medium text-lg">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Influencers */}
      <section className="py-24 bg-brand-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-16 gap-6">
            <div>
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-4">Influencer Unggulan</h2>
              <p className="text-lg md:text-xl text-brand-500">Pilih dari daftar pakar kuliner terverifikasi kami</p>
            </div>
            <Link to="/influencers" className="text-brand-900 font-bold border-b-2 border-brand-900 pb-1 hover:text-brand-500 hover:border-brand-500 transition-colors shrink-0">
              Lihat Semua Influencer
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {INFLUENCERS.map((inf) => (
              <InfluencerCard key={inf.id} influencer={inf} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Micro-Influencers */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&q=80&w=800"
                alt="Engagement statistics"
                className="rounded-[40px] shadow-2xl"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-8 -right-8 bg-brand-900 text-white p-10 rounded-[30px] shadow-2xl max-w-[280px]">
                <BarChart3 size={40} className="mb-4 text-brand-400" />
                <h4 className="text-3xl font-black mb-2">10.5%</h4>
                <p className="text-brand-300 font-medium">Rata-rata engagement rate influencer mikro.</p>
              </div>
            </motion.div>
          </div>
          <div className="lg:w-1/2 space-y-8">
            <h2 className="text-4xl md:text-5xl font-black text-brand-900 leading-tight">
               Mengapa <span className="text-brand-500">Micro-Influencer</span>?
            </h2>
            <p className="text-lg text-brand-600 leading-relaxed">
              Berbeda dengan selebriti besar, influencer mikro (1rb-50rb pengikut) memiliki hubungan personal yang mendalam dengan audiens mereka. Bagi bisnis kuliner, ini berarti tingkat kepercayaan yang lebih tinggi dan lebih banyak orang yang benar-benar mengunjungi toko Anda.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-brand-50 p-6 rounded-2xl">
                <h5 className="font-bold text-brand-900 mb-2">Kepercayaan Tinggi</h5>
                <p className="text-sm text-brand-500">Audiens menganggap ulasan mereka sebagai rekomendasi dari teman.</p>
              </div>
              <div className="bg-brand-50 p-6 rounded-2xl">
                <h5 className="font-bold text-brand-900 mb-2">Hemat Anggaran</h5>
                <p className="text-sm text-brand-500">Dapatkan hasil lebih baik dengan biaya yang jauh lebih rendah.</p>
              </div>
              <div className="bg-brand-50 p-6 rounded-2xl">
                <h5 className="font-bold text-brand-900 mb-2">Target Niche</h5>
                <p className="text-sm text-brand-500">Sangat pas untuk menargetkan kota atau kategori makanan tertentu.</p>
              </div>
              <div className="bg-brand-50 p-6 rounded-2xl">
                <h5 className="font-bold text-brand-900 mb-2">Hasil Cepat</h5>
                <p className="text-sm text-brand-500">Lonjakan trafik dan engagement media sosial secara instan.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-24 bg-brand-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-brand-900 mb-4">Paket untuk Influencer</h2>
            <p className="text-xl text-brand-500">Percepat pertumbuhan Anda dengan alat data profesional</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PRICING_PLANS.map((plan) => (
              <PriceCard key={plan.name} plan={plan} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-brand-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl -ml-48 -mb-48" />
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
            Siap Membawa Brand Kuliner Anda ke Level Berikutnya?
          </h2>
          <p className="text-xl text-brand-300 mb-12 max-w-2xl mx-auto font-light">
            Bergabunglah dengan ribuan UMKM kuliner dan micro-influencer yang sudah tumbuh bersama di platform kami.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link
              to="/umkm"
              className="bg-brand-400 text-brand-900 px-12 py-6 rounded-full text-xl font-bold hover:bg-brand-300 transition-all shadow-2xl"
            >
              Mulai Gratis (UMKM)
            </Link>
            <Link
              to="/pricing"
              className="bg-transparent border-2 border-white/30 text-white px-12 py-6 rounded-full text-xl font-bold hover:bg-white/10 transition-all"
            >
              Pelajari Lebih Lanjut
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
