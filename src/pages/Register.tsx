import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  signInWithPopup, 
  GoogleAuthProvider,
} from 'firebase/auth';
import { auth } from '../lib/firebase';
import { motion } from 'motion/react';
import { Chrome, ArrowRight, Camera } from 'lucide-react';

const Register = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleRegister = async () => {
    setLoading(true);
    setError('');
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      // In a real app, you might want to check if it's a new user and create a profile in Firestore
      navigate('/');
    } catch (err: any) {
      console.error(err);
      setError('Gagal mendaftar. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 bg-brand-50 flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white rounded-[40px] shadow-2xl overflow-hidden"
      >
        <div className="bg-brand-900 p-10 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-400/20 rounded-full blur-3xl -mr-16 -mt-16" />
          <motion.div 
            initial={{ rotate: -10 }}
            animate={{ rotate: 0 }}
            className="bg-brand-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 relative z-10"
          >
            <Camera size={32} className="text-white" />
          </motion.div>
          <h1 className="text-3xl font-black text-white relative z-10">Buat Akun</h1>
          <p className="text-brand-300 mt-2 relative z-10">Mulai perjalanan influencer Anda hari ini</p>
        </div>

        <div className="p-10 space-y-8">
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-brand-900">Bergabung sebagai Content Creator</h2>
            <p className="text-brand-500 text-sm leading-relaxed">
              Dapatkan akses ke dashboard analitik, portfolio kustom, dan tawaran kerjasama dari brand kuliner ternama.
            </p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm font-medium border border-red-100">
              {error}
            </div>
          )}

          <button
            onClick={handleGoogleRegister}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-brand-900 text-white py-4 rounded-2xl font-bold hover:bg-brand-800 transition-all shadow-xl shadow-brand-900/20"
          >
            <Chrome size={20} className="text-brand-400" />
            {loading ? 'Memproses...' : 'Daftar dengan Google'}
          </button>

          <p className="text-center text-sm text-brand-400">
            Sudah punya akun?{' '}
            <Link to="/login" className="text-brand-900 font-bold hover:text-brand-500 transition-colors">
              Masuk di sini
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
