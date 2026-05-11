import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LogOut, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, signOut } = useAuth();
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
      className={`fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-7xl z-50 transition-all duration-300 rounded-[20px] ${
        scrolled ? 'bg-white/80 backdrop-blur-md shadow-lg py-3' : 'bg-white/20 backdrop-blur-sm py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-black tracking-tight text-brand-500">
              MicroInfluencer<span className="text-brand-400 italic">Hub</span>
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
            {user ? (
              <div className="flex items-center gap-4">
                <Link 
                  to={user.role === 'umkm' ? '/dashboard/umkm' : '/dashboard/influencer'}
                  className="text-sm font-bold text-brand-900 border-b-2 border-transparent hover:border-brand-900 transition-all px-1"
                >
                  Dashboard
                </Link>
                <div className="flex items-center gap-2 bg-brand-50 px-3 py-1.5 rounded-full border border-brand-100">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName || 'User'} className="w-6 h-6 rounded-full" />
                  ) : (
                    <User size={16} className="text-brand-500" />
                  )}
                  <span className="text-sm font-bold text-brand-900 truncate max-w-[100px]">
                    {user.displayName?.split(' ')[0] || 'User'}
                  </span>
                </div>
                <button
                  onClick={() => signOut()}
                  className="text-brand-600 hover:text-brand-900 transition-colors p-1"
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-brand-900 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-brand-800 transition-all shadow-lg shadow-brand-900/10"
              >
                Masuk
              </Link>
            )}
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
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="md:hidden absolute top-[calc(100%+12px)] left-0 w-full bg-white rounded-[24px] shadow-2xl border border-brand-100 overflow-hidden z-50 px-2 py-4"
          >
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-6 py-4 text-base font-bold rounded-2xl transition-all ${
                    location.pathname === link.path 
                      ? 'bg-brand-50 text-brand-500' 
                      : 'text-brand-900 hover:bg-brand-50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 px-2">
                {user ? (
                  <div className="space-y-3">
                    <Link
                      to={user.role === 'umkm' ? '/dashboard/umkm' : '/dashboard/influencer'}
                      onClick={() => setIsOpen(false)}
                      className="block w-full text-center bg-brand-100 text-brand-900 py-4 rounded-2xl font-bold mb-2 transition-colors"
                    >
                      Buka Dashboard
                    </Link>
                    <div className="flex items-center gap-4 p-4 bg-brand-50 rounded-2xl">
                      {user.photoURL ? (
                        <img src={user.photoURL} alt={user.displayName || 'User'} className="w-12 h-12 rounded-xl" />
                      ) : (
                        <div className="bg-brand-200 p-3 rounded-xl"><User size={24} className="text-brand-500" /></div>
                      )}
                      <div>
                        <p className="font-bold text-brand-900">{user.displayName || 'Pengguna'}</p>
                        <p className="text-xs text-brand-400">{user.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        signOut();
                        setIsOpen(false);
                      }}
                      className="flex items-center justify-center gap-2 w-full bg-red-50 text-red-600 py-4 rounded-2xl font-bold transition-colors"
                    >
                      <LogOut size={20} /> Keluar
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/register"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center bg-brand-900 text-white py-4 rounded-2xl font-bold shadow-xl shadow-brand-900/20"
                  >
                    Mulai Sekarang
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
