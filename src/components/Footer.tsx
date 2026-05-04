import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket, Instagram, Twitter, Facebook, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-brand-900 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="bg-white text-brand-900 p-2 rounded-lg">
                <Rocket size={24} />
              </div>
              <span className="text-xl font-bold tracking-tight">
                MicroInfluencer<span className="text-brand-400">Hub</span>
              </span>
            </div>
            <p className="text-brand-300 leading-relaxed">
              Memberdayakan UMKM kuliner untuk mengembangkan brand mereka dengan pemasaran micro-influencer berbasis data.
            </p>
            <div className="flex gap-4">
              {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="p-2 bg-brand-800 rounded-full hover:bg-brand-700 transition-colors"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">Pasar</h4>
            <ul className="space-y-4 text-brand-300">
              <li><Link to="/influencers" className="hover:text-white transition-colors">Cari Influencer</Link></li>
              <li><Link to="/umkm" className="hover:text-white transition-colors">Untuk UMKM Kuliner</Link></li>
              <li><Link to="/pricing" className="hover:text-white transition-colors">Paket Harga</Link></li>
              <li><Link to="/influencers" className="hover:text-white transition-colors">Kisah Sukses</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">Perusahaan</h4>
            <ul className="space-y-4 text-brand-300">
              <li><Link to="/about" className="hover:text-white transition-colors">Misi Kami</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Anggota Tim</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Karir</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Press Kit</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">Dukungan</h4>
            <ul className="space-y-4 text-brand-300">
              <li><Link to="/contact" className="hover:text-white transition-colors">Hubungi Kami</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Kebijakan Privasi</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Syarat & Ketentuan</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-brand-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-brand-400 text-sm">
          <p>© 2026 MicroInfluencer Hub. Seluruh hak cipta dilindungi.</p>
          <p>Dibuat dengan ❤️ untuk Pecinta Kuliner</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
