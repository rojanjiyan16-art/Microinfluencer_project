import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Users, TrendingUp, Eye, MapPin, Instagram, 
  ChevronLeft, Calendar, MessageSquare, ArrowUpRight,
  PieChart as PieChartIcon, BarChart3
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, PieChart, Pie } from 'recharts';
import { INFLUENCERS } from '../constants';

const data = [
  { name: 'Jan', views: 4000, er: 7.2 },
  { name: 'Feb', views: 3000, er: 7.8 },
  { name: 'Mar', views: 5000, er: 8.1 },
  { name: 'Apr', views: 4500, er: 8.5 },
  { name: 'May', views: 6000, er: 8.2 },
  { name: 'Jun', views: 7500, er: 9.1 },
];

const genderData = [
  { name: 'Female', value: 65 },
  { name: 'Male', value: 35 },
];

const COLORS = ['#64748b', '#cbd5e1'];

const InfluencerProfile = () => {
  const { id } = useParams();
  const influencer = INFLUENCERS.find(inf => inf.id === id);

  if (!influencer) {
    return (
      <div className="pt-32 pb-24 text-center">
        <h2 className="text-3xl font-bold mb-4">Influencer tidak ditemukan</h2>
        <Link to="/influencers" className="text-brand-500 underline">Kembali ke daftar</Link>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-24 bg-white min-h-screen">
      {/* Hero Banner */}
      <section className="relative h-[300px] md:h-96">
        <img
          src={influencer.portfolio[0]}
          alt="Banner"
          className="w-full h-full object-cover blur-[2px] brightness-50"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-x-0 bottom-0 translate-y-1/2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-32 h-32 md:w-48 md:h-48 rounded-[30px] md:rounded-[40px] border-4 md:border-8 border-white overflow-hidden shadow-2xl bg-white"
              >
                <img src={influencer.photo} alt={influencer.name} className="w-full h-full object-cover" />
              </motion.div>
              <div className="flex-1 text-center md:text-left pb-0 md:pb-4">
                <div className="flex flex-col md:flex-row flex-wrap items-center gap-2 md:gap-4 mb-2">
                  <h1 className="text-3xl md:text-4xl font-black text-brand-900 leading-tight">{influencer.name}</h1>
                  <span className="bg-brand-900 text-white px-4 py-1 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                    <Instagram size={14} /> {influencer.platform}
                  </span>
                </div>
                <div className="flex flex-col md:flex-row items-center text-brand-500 gap-2 md:gap-4 font-medium text-sm md:text-base">
                  <div className="flex items-center gap-1"><MapPin size={16} /> {influencer.location}</div>
                  <div className="flex items-center gap-1 capitalize"><PieChartIcon size={16} /> {influencer.niche}</div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto md:pb-4 mt-4 md:mt-0">
                <button className="flex-1 flex items-center justify-center gap-2 bg-brand-900 text-white px-6 md:px-8 py-4 rounded-2xl font-bold hover:bg-brand-800 transition-all shadow-xl shadow-brand-900/20 text-sm md:text-base">
                  <MessageSquare size={20} /> Ajukan Kolaborasi
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 bg-brand-50 text-brand-900 px-6 md:px-8 py-4 rounded-2xl font-bold hover:bg-brand-100 transition-all text-sm md:text-base">
                  <Calendar size={20} /> Cek Ketersediaan
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-48 md:mt-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-12">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: 'Pengikut', value: (influencer.followers / 1000).toFixed(1) + 'rb', icon: Users },
                { label: 'Rata-rata View', value: (influencer.avgViews / 1000).toFixed(1) + 'rb', icon: Eye },
                { label: 'Engagement', value: influencer.engagementRate + '%', icon: TrendingUp },
                { label: 'Mulai Harga', value: influencer.priceRange.split(' - ')[0], icon: BarChart3 },
              ].map((stat, i) => (
                <div key={i} className="bg-brand-50 p-6 rounded-3xl border border-brand-100 shadow-sm">
                  <stat.icon size={20} className="text-brand-400 mb-2" />
                  <p className="text-2xl font-black text-brand-900">{stat.value}</p>
                  <p className="text-xs font-bold text-brand-400 uppercase tracking-widest">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Bio */}
            <div className="bg-white rounded-[40px] p-10 border border-brand-100 shadow-sm mb-12">
              <h2 className="text-2xl font-black text-brand-900 mb-6">Tentang {influencer.name}</h2>
              <p className="text-brand-600 leading-relaxed text-lg italic">
                "{influencer.bio} Spesialisasi dalam membuat konten dengan retensi tinggi yang mendorong kunjungan nyata ke toko. Audiens saya adalah pecinta kuliner dan pemburu kafe."
              </p>
            </div>

            {/* Portfolio */}
            <div>
              <div className="flex justify-between items-end mb-8">
                <h2 className="text-2xl font-black text-brand-900">Showcase Portofolio</h2>
                <button className="text-brand-500 font-bold text-sm flex items-center gap-1 hover:text-brand-900 transition-colors">
                  Lihat feed lengkap <ArrowUpRight size={16} />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {influencer.portfolio.map((img, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    className="aspect-square rounded-[30px] overflow-hidden shadow-lg"
                  >
                    <img src={img} alt="Portfolio" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Analytics Section - Only for Paid Profiles Preview */}
            <div className="bg-brand-900 text-white rounded-[30px] md:rounded-[50px] p-6 md:p-12 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl -mr-32 -mt-32" />
              <div className="relative z-10 flex flex-col md:flex-row justify-between items-start gap-4 md:gap-8 mb-10">
                <div>
                  <h2 className="text-2xl md:text-3xl font-black mb-2">Analitik Performa</h2>
                  <p className="text-brand-300 text-sm md:text-base">Metrik pertumbuhan dan engagement detail (Data Terverifikasi)</p>
                </div>
                <div className="bg-brand-400 text-brand-900 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest shrink-0">
                  Analitik Terverifikasi
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
                <div className="bg-white/5 rounded-3xl p-6 border border-white/10 backdrop-blur-sm">
                  <h3 className="text-sm font-bold uppercase tracking-widest mb-6 opacity-60">Pertumbuhan View (6 Bulan Terakhir)</h3>
                  <div className="h-64 mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={data}>
                        <defs>
                          <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#94a3b8" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                        <XAxis dataKey="name" stroke="#ffffff40" fontSize={10} />
                        <YAxis stroke="#ffffff40" fontSize={10} />
                        <Tooltip />
                        <Area type="monotone" dataKey="views" stroke="#94a3b8" fillOpacity={1} fill="url(#colorViews)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-white/5 rounded-3xl p-6 border border-white/10 backdrop-blur-sm">
                  <h3 className="text-sm font-bold uppercase tracking-widest mb-6 opacity-60">Demografi Audiens</h3>
                  <div className="h-64 flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={genderData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {genderData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute flex flex-col items-center">
                      <span className="text-3xl font-black">65%</span>
                      <span className="text-[10px] uppercase opacity-50 tracking-widest">Wanita</span>
                    </div>
                  </div>
                  <div className="flex justify-center gap-8 mt-4">
                     <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-brand-500" />
                        <span className="text-xs">Wanita (65%)</span>
                     </div>
                     <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-brand-300" />
                        <span className="text-xs">Pria (35%)</span>
                     </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Info */}
          <aside className="space-y-12">
            {/* Packages */}
            <div className="bg-brand-50 rounded-[40px] p-8 border border-brand-100">
              <h3 className="text-xl font-bold text-brand-900 mb-6">Paket Kolaborasi</h3>
              <div className="space-y-4">
                {[
                  { name: 'Kunjungan Standar', price: 'Rp 1jt', desc: '1 Story + 1 Post Permanen' },
                  { name: 'Video Review Reel', price: 'Rp 2jt', desc: 'Audio Trending + Link di Bio' },
                  { name: 'Ambassador Bulanan', price: 'Rp 7jt', desc: '4 Post + 8 Story' },
                ].map((pkg, i) => (
                  <div key={i} className="bg-white p-6 rounded-3xl border border-brand-200">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-bold text-brand-900">{pkg.name}</h4>
                      <span className="text-lg font-black text-brand-900">{pkg.price}</span>
                    </div>
                    <p className="text-sm text-brand-500">{pkg.desc}</p>
                  </div>
                ))}
              </div>
              <button className="w-full mt-8 bg-brand-900 text-white py-4 rounded-2xl font-bold hover:bg-brand-800 transition-all shadow-lg">
                Pesan Paket
              </button>
            </div>

            {/* Availability */}
            <div className="bg-white rounded-[40px] p-10 border border-brand-100 shadow-sm">
                <h3 className="text-xl font-bold text-brand-900 mb-6">Ketersediaan Saat Ini</h3>
                <div className="space-y-4">
                   <div className="flex justify-between items-center py-3 border-b border-brand-50">
                      <span className="text-brand-500">Minggu Ini</span>
                      <span className="text-xs font-bold text-rose-500 uppercase bg-rose-50 px-3 py-1 rounded-full">Penuh</span>
                   </div>
                   <div className="flex justify-between items-center py-3 border-b border-brand-50">
                      <span className="text-brand-500">Minggu Depan</span>
                      <span className="text-xs font-bold text-emerald-500 uppercase bg-emerald-50 px-3 py-1 rounded-full">Tersedia</span>
                   </div>
                   <div className="flex justify-between items-center py-3">
                      <span className="text-brand-500">Waktu Respon</span>
                      <span className="text-xs font-bold text-brand-900 uppercase bg-brand-50 px-3 py-1 rounded-full">~ 2 Jam</span>
                   </div>
                </div>
            </div>

            {/* Back Button */}
            <Link to="/influencers" className="flex items-center gap-2 text-brand-400 hover:text-brand-900 transition-colors font-bold px-4">
              <ChevronLeft size={20} /> Kembali ke marketplace
            </Link>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default InfluencerProfile;
