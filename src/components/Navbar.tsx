import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Rocket, Camera } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Beranda', path: '/' },
    { name: 'Influencer', path: '/influencers' },
    { name: 'Untuk UMKM', path: '/umkm' },
    { name: 'Harga', path: '/pricing' },
    { name: 'Tentang', path: '/about' },
    { name: 'Kontak', path: '/contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-brand-900 text-white p-2 rounded-xl flex items-center justify-center">
              <Camera size={22} className="text-brand-400" />
            </div>
            <span className="text-xl font-black tracking-tight text-brand-900">
              MicroInfluencer<span className="text-brand-500 italic">Hub</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-brand-500 ${
                  location.pathname === link.path ? 'text-brand-500' : 'text-brand-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/login"
              className="bg-brand-900 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-brand-800 transition-all shadow-lg shadow-brand-900/10"
            >
              Daftar
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-brand-900 hover:text-brand-500 transition-colors"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-brand-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-base font-medium text-brand-600 hover:bg-brand-50 rounded-xl transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 px-4">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center bg-brand-900 text-white py-4 rounded-xl font-semibold shadow-lg shadow-brand-900/10"
                >
                  Daftar Sekarang
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
