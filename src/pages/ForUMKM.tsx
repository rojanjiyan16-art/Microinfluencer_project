import React from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, Search, ClipboardList, TrendingUp, CheckCircle2, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';

const ForUMKM = () => {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="bg-brand-900 text-white py-32 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-full h-full opacity-10">
          <ShoppingBag size={600} className="absolute -top-20 -right-20" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-7xl font-black mb-8 leading-tight">
              Kembangkan Brand Kuliner Anda dengan Suara <span className="text-brand-400">Terpercaya</span>.
            </h1>
            <p className="text-lg md:text-2xl text-brand-300 font-light leading-relaxed mb-10 max-w-2xl mx-auto">
              Micro-influencer adalah senjata rahasia bagi UMKM kuliner. Jangkau lingkungan sekitar Anda dengan influencer yang benar-benar mencicipi dan menyukai makanan Anda.
            </p>
            <Link
              to="/influencers"
              className="bg-brand-400 text-brand-900 px-10 py-5 rounded-full text-xl font-bold hover:bg-brand-300 transition-all shadow-2xl shadow-brand-400/20"
            >
              Cari Influencer Pertama Saya
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              {
                icon: Search,
                title: 'Pencarian Berbasis Data',
                desc: 'Cari influencer berdasarkan tingkat engagement nyata dan lokasi audiens, bukan sekadar jumlah pengikut.'
              },
              {
                icon: ClipboardList,
                title: 'Briefing Mudah',
                desc: 'Buat brief kampanye yang jelas untuk memastikan pesan brand Anda tersampaikan dengan sempurna setiap saat.'
              },
              {
                icon: TrendingUp,
                title: 'Pelacakan Langsung',
                desc: 'Pantau performa kampanye Anda dengan dashboard sederhana yang dirancang untuk pemilik bisnis yang sibuk.'
              },
              {
                icon: UserPlus,
                title: 'Talenta Terverifikasi',
                desc: 'Bekerja hanya dengan influencer yang telah diperiksa dari pengikut dan engagement palsu.'
              }
            ].map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <div className="bg-brand-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-900 group-hover:text-white transition-all">
                  <benefit.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-brand-900 mb-3">{benefit.title}</h3>
                <p className="text-brand-500 leading-relaxed font-medium">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Campaign Process */}
      <section className="py-32 bg-brand-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-1/2">
              <h2 className="text-4xl md:text-5xl font-black text-brand-900 mb-8 leading-tight">
                Luncurkan Kampanye Pertama Anda dalam <span className="text-brand-500">3 Langkah Mudah</span>
              </h2>
              <div className="space-y-10">
                {[
                  { step: '01', title: 'Pilih Talenta Anda', desc: 'Gunakan filter untuk menemukan influencer yang sesuai dengan kategori makanan dan anggaran Anda.' },
                  { step: '02', title: 'Kirim Brief', desc: 'Jelaskan makanan Anda dan apa yang ingin Anda capai (kunjungan, awareness, atau penjualan).' },
                  { step: '03', title: 'Pantau Pertumbuhannya', desc: 'Lacak mention dan engagement melalui dashboard bisnis Anda.' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 items-start">
                    <span className="text-4xl font-black text-brand-200">{item.step}</span>
                    <div>
                      <h4 className="text-xl font-bold text-brand-900 mb-2">{item.title}</h4>
                      <p className="text-brand-600 font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=800"
                alt="UMKM Business Owner"
                className="rounded-[50px] shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Free for UMKM Section */}
      <section className="py-32 bg-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="bg-emerald-50 text-emerald-700 inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm uppercase tracking-widest mb-8">
            <CheckCircle2 size={16} /> Sepenuhnya Gratis untuk Bisnis
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-brand-900 mb-8">
            Mengapa gratis untuk UMKM?
          </h2>
          <p className="text-xl text-brand-600 mb-12 leading-relaxed font-medium">
            Kami percaya pada pemberdayaan bisnis kuliner kecil. Kami hanya membebankan biaya kepada influencer untuk analitik premium dan alat otomatisasi. Bisnis dapat mencari, menghubungi, dan berkolaborasi dengan sebanyak mungkin influencer yang mereka inginkan secara gratis.
          </p>
          <Link
            to="/influencers"
            className="bg-brand-900 text-white px-12 py-6 rounded-full text-xl font-bold hover:bg-brand-800 transition-all shadow-xl shadow-brand-900/20"
          >
            Mulai Cari Secara Gratis
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ForUMKM;
