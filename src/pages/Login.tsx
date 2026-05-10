import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  signInWithPopup, 
  GoogleAuthProvider,
} from 'firebase/auth';
import { auth } from '../lib/firebase';
import { motion } from 'motion/react';
import { Chrome, ArrowRight, Bot } from 'lucide-react';

const Login = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (err: any) {
      console.error(err);
      setError('Gagal masuk dengan Google. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 bg-brand-50 flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-[40px] shadow-2xl overflow-hidden"
      >
        <div className="bg-brand-900 p-10 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-400/10 rounded-full blur-3xl -mr-16 -mt-16" />
          <motion.div 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="bg-brand-400 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 relative z-10"
          >
            <Bot size={32} className="text-brand-900" />
          </motion.div>
          <h1 className="text-3xl font-black text-white relative z-10">Selamat Datang</h1>
          <p className="text-brand-300 mt-2 relative z-10">Masuk untuk mengelola kolaborasi Anda</p>
        </div>

        <div className="p-10 space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm font-medium border border-red-100 italic">
              {error}
            </div>
          )}

          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-white border-2 border-brand-100 text-brand-900 py-4 rounded-2xl font-bold hover:bg-brand-50 transition-all shadow-sm"
          >
            <Chrome size={20} className="text-brand-500" />
            {loading ? 'Menghubungkan...' : 'Lanjutkan dengan Google'}
          </button>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-brand-100"></div></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-4 text-brand-400 font-bold tracking-widest">Informasi</span></div>
          </div>

          <div className="space-y-4 text-center">
            <p className="text-sm text-brand-500 leading-relaxed">
              Belum punya akun? Registrasi sekarang untuk mulai berkolaborasi dengan brand kuliner terbaik.
            </p>
            <Link 
              to="/register" 
              className="inline-flex items-center gap-2 text-brand-900 font-bold hover:text-brand-500 transition-colors"
            >
              Daftar Sekarang <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
