import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { motion } from 'motion/react';
import { Store, Users, Loader2, ArrowRight, Chrome, Mail, Lock } from 'lucide-react';

const Login = () => {
  const [role, setRole] = useState<'umkm' | 'influencer' | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!role) return;
    
    setLoading(true);
    setError('');
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData.role !== role) {
          setError(`Akun ini tidak terdaftar sebagai ${role === 'umkm' ? 'UMKM' : 'Influencer'}`);
          await auth.signOut();
          return;
        }
        navigate(role === 'umkm' ? '/dashboard/umkm' : '/dashboard/influencer');
      } else {
        setError('Data profil tidak ditemukan');
      }
    } catch (err: any) {
      console.error(err);
      setError('Email atau password salah');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    if (!role) return;
    setLoading(true);
    setError('');
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData.role !== role) {
          setError(`Akun ini tidak terdaftar sebagai ${role === 'umkm' ? 'UMKM' : 'Influencer'}`);
          await auth.signOut();
          return;
        }
        navigate(role === 'umkm' ? '/dashboard/umkm' : '/dashboard/influencer');
      } else {
        setError('Akun belum terdaftar. Silakan register terlebih dahulu.');
        await auth.signOut();
      }
    } catch (err: any) {
      console.error(err);
      setError('Login Google gagal');
    } finally {
      setLoading(false);
    }
  };

  if (!role) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-brand-50 flex items-center justify-center px-4">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-black text-brand-900 mb-4">Masuk ke Akun Anda</h1>
            <p className="text-brand-500">Pilih tipe akun untuk melanjutkan</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.button
              whileHover={{ scale: 1.02 }}
              onClick={() => setRole('umkm')}
              className="bg-white p-10 rounded-[40px] shadow-2xl border-4 border-transparent hover:border-brand-400 transition-all text-center group"
            >
              <div className="bg-brand-50 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-brand-500 group-hover:bg-brand-400 group-hover:text-brand-900 transition-colors">
                <Store size={40} />
              </div>
              <h2 className="text-2xl font-black text-brand-900 mb-2">Masuk sebagai UMKM</h2>
              <p className="text-brand-500 text-sm">Kelola campaign & influencers</p>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              onClick={() => setRole('influencer')}
              className="bg-brand-900 p-10 rounded-[40px] shadow-2xl border-4 border-transparent hover:border-brand-400 transition-all text-center group"
            >
              <div className="bg-white/10 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-brand-400 group-hover:bg-brand-400 group-hover:text-brand-900 transition-colors">
                <Users size={40} />
              </div>
              <h2 className="text-2xl font-black text-white mb-2">Masuk sebagai Influencer</h2>
              <p className="text-brand-300 text-sm">Cari kerjasama & cek analitik</p>
            </motion.button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 bg-brand-50 flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white rounded-[40px] shadow-2xl overflow-hidden"
      >
        <div className="bg-brand-900 p-10 text-center text-white relative">
          <button 
            onClick={() => setRole(null)}
            className="absolute top-8 left-8 text-brand-400 hover:text-white text-xs font-bold"
          >
            Kembali
          </button>
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 ${role === 'umkm' ? 'bg-brand-50 text-brand-500' : 'bg-brand-400 text-brand-900'}`}>
            {role === 'umkm' ? <Store size={32} /> : <Users size={32} />}
          </div>
          <h1 className="text-2xl font-black">Login {role === 'umkm' ? 'UMKM' : 'Influencer'}</h1>
        </div>

        <form onSubmit={handleLogin} className="p-10 space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm font-medium border border-red-100">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-400" size={18} />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Alamat Email"
                className="w-full bg-brand-50 border-none rounded-2xl pl-12 pr-4 py-4 outline-none focus:ring-2 focus:ring-brand-400 transition-all font-medium"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-400" size={18} />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full bg-brand-50 border-none rounded-2xl pl-12 pr-4 py-4 outline-none focus:ring-2 focus:ring-brand-400 transition-all font-medium"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 text-brand-500 font-bold cursor-pointer">
              <input type="checkbox" className="rounded border-brand-200 text-brand-400 focus:ring-brand-400" />
              Ingat Saya
            </label>
            <button type="button" className="text-brand-900 font-bold hover:text-brand-400 transition-colors">Lupa Password?</button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-brand-800 transition-all shadow-xl shadow-brand-900/20 disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" /> : 'Masuk ke Dashboard'}
          </button>

          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-white border-2 border-brand-100 text-brand-900 py-4 rounded-2xl font-bold hover:bg-brand-50 transition-all"
          >
            <Chrome size={20} className="text-brand-500" />
            Lanjutkan dengan Google
          </button>

          <p className="text-center text-sm text-brand-400">
            Belum punya akun?{' '}
            <Link to="/register" className="text-brand-900 font-bold hover:text-brand-500 transition-colors">
              Daftar Sekarang
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
