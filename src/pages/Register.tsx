import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  createUserWithEmailAndPassword, 
  updateProfile 
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { handleFirestoreError, OperationType } from '../lib/firestore-errors';
import { useNavigate } from 'react-router-dom';
import { Loader2, Store, Users, User, ArrowRight, Instagram, MessageSquare, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const umkmSchemaBase = z.object({
  ownerName: z.string().min(3, 'Nama pemilik minimal 3 karakter'),
  businessName: z.string().min(3, 'Nama usaha minimal 3 karakter'),
  category: z.string().min(1, 'Pilih kategori makanan'),
  location: z.string().min(1, 'Masukkan lokasi kota/kabupaten'),
  waNumber: z.string().min(10, 'Nomor WhatsApp minimal 10 digit').regex(/^\d+$/, 'Hanya angka'),
  email: z.string().email('Email tidak valid'),
  password: z.string().min(8, 'Password minimal 8 karakter')
    .regex(/[A-Za-z]/, 'Harus mengandung huruf')
    .regex(/[0-9]/, 'Harus mengandung angka'),
  confirmPassword: z.string()
});

const umkmSchema = umkmSchemaBase.refine((data) => data.password === data.confirmPassword, {
  message: "Konfirmasi password tidak cocok",
  path: ["confirmPassword"],
});

type UMKMValues = z.infer<typeof umkmSchemaBase>;

const influencerSchemaBase = z.object({
  fullName: z.string().min(3, 'Nama lengkap minimal 3 karakter'),
  username: z.string().min(3, 'Nama panggung minimal 3 karakter'),
  location: z.string().min(1, 'Masukkan lokasi'),
  niche: z.string().min(1, 'Pilih niche kuliner'),
  email: z.string().email('Email tidak valid'),
  waNumber: z.string().min(10, 'Nomor WhatsApp minimal 10 digit'),
  bio: z.string().min(10, 'Bio minimal 10 karakter'),
  tiktokRate: z.number().min(0),
  igReelsRate: z.number().min(0),
  igStoryRate: z.number().min(0),
  photoUrl: z.string().url('Link foto tidak valid (https://...)'),
  password: z.string().min(8, 'Password minimal 8 karakter')
    .regex(/[A-Za-z]/, 'Harus mengandung huruf')
    .regex(/[0-9]/, 'Harus mengandung angka'),
  confirmPassword: z.string()
});

const influencerSchema = influencerSchemaBase.refine((data) => data.password === data.confirmPassword, {
  message: "Konfirmasi password tidak cocok",
  path: ["confirmPassword"],
});

type InfluencerValues = z.infer<typeof influencerSchemaBase>;

const Register = () => {
  const [role, setRole] = useState<'umkm' | 'influencer' | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const umkmForm = useForm<UMKMValues>({
    resolver: zodResolver(umkmSchema),
  });

  const influencerForm = useForm<InfluencerValues>({
    resolver: zodResolver(influencerSchema),
  });

  const onUMKMSubmit = async (values: UMKMValues) => {
    setLoading(true);
    setError('');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      const user = userCredential.user;
      
      await updateProfile(user, { displayName: values.businessName });

      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: values.email,
        role: 'umkm',
        displayName: values.businessName,
        waNumber: values.waNumber,
        location: values.location,
        createdAt: serverTimestamp(),
        business: {
          ownerName: values.ownerName,
          businessName: values.businessName,
          category: values.category,
        }
      }).catch(err => handleFirestoreError(err, OperationType.CREATE, `users/${user.uid}`));

      navigate('/dashboard/umkm');
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/operation-not-allowed') {
        setError('Metode Email/Password belum diaktifkan di Firebase Console. Silakan aktifkan di menu Authentication > Sign-in method.');
      } else if (err.code === 'auth/email-already-in-use') {
        setError('Email sudah terdaftar sebagai UMKM atau tipe lain. Silakan gunakan email berbeda.');
      } else {
        setError(err.message || 'Pendaftaran UMKM gagal');
      }
    } finally {
      setLoading(false);
    }
  };

  const onInfluencerSubmit = async (values: InfluencerValues) => {
    setLoading(true);
    setError('');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      const user = userCredential.user;
      
      await updateProfile(user, { 
        displayName: values.username,
        photoURL: values.photoUrl
      });

      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: values.email,
        role: 'influencer',
        displayName: values.username,
        waNumber: values.waNumber,
        location: values.location,
        createdAt: serverTimestamp(),
        influencer: {
          fullName: values.fullName,
          username: values.username,
          niche: values.niche,
          photoUrl: values.photoUrl,
          bio: values.bio,
          rateCard: {
            tiktokVideo: values.tiktokRate,
            igReels: values.igReelsRate,
            igStory: values.igStoryRate,
          },
          status: 'FREE',
          connectedAccounts: {
            tiktok: false,
            instagram: false
          }
        }
      }).catch(err => handleFirestoreError(err, OperationType.CREATE, `users/${user.uid}`));

      navigate('/dashboard/influencer');
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/operation-not-allowed') {
        setError('Metode Email/Password belum diaktifkan di Firebase Console. Silakan aktifkan di menu Authentication > Sign-in method.');
      } else if (err.code === 'auth/email-already-in-use') {
        setError('Email sudah terdaftar. Silakan gunakan email lain atau masuk.');
      } else {
        setError(err.message || 'Pendaftaran Influencer gagal');
      }
    } finally {
      setLoading(false);
    }
  };

  if (!role) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-brand-50 flex items-center justify-center px-4">
        <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setRole('umkm')}
            className="bg-white p-10 rounded-[40px] shadow-2xl border-4 border-transparent hover:border-brand-400 transition-all text-center group"
          >
            <div className="bg-brand-50 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-8 text-brand-500 group-hover:bg-brand-400 group-hover:text-brand-900 transition-colors">
              <Store size={48} />
            </div>
            <h2 className="text-3xl font-black text-brand-900 mb-4">Saya UMKM</h2>
            <p className="text-brand-500 mb-8 leading-relaxed">
              Daftarkan brand kuliner Anda dan temukan influencer yang tepat untuk meningkatkan penjualan.
            </p>
            <div className="inline-flex items-center gap-2 text-brand-900 font-bold">
              Mulai Sekarang <ArrowRight size={20} />
            </div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setRole('influencer')}
            className="bg-brand-900 p-10 rounded-[40px] shadow-2xl border-4 border-transparent hover:border-brand-400 transition-all text-center group"
          >
            <div className="bg-white/10 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-8 text-brand-400 group-hover:bg-brand-400 group-hover:text-brand-900 transition-colors">
              <Users size={48} />
            </div>
            <h2 className="text-3xl font-black text-white mb-4">Saya Influencer</h2>
            <p className="text-brand-300 mb-8 leading-relaxed">
              Bagikan konten kuliner Anda dan berkolaborasi dengan brand-brand menarik di kota Anda.
            </p>
            <div className="inline-flex items-center gap-2 text-brand-400 font-bold">
              Daftar Sekarang <ArrowRight size={20} />
            </div>
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 bg-brand-50 flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full bg-white rounded-[40px] shadow-2xl overflow-hidden"
      >
        <div className="bg-brand-900 p-8 md:p-12 text-center text-white relative">
          <button 
            onClick={() => setRole(null)}
            className="absolute top-8 left-8 text-brand-400 hover:text-white text-sm font-bold flex items-center gap-2"
          >
            Kembali
          </button>
          <h1 className="text-3xl md:text-4xl font-black">
            Register as {role === 'umkm' ? 'UMKM' : 'Influencer'}
          </h1>
          <p className="text-brand-300 mt-2">Lengkapi data profil Anda untuk memulai</p>
        </div>

        <div className="p-8 md:p-12">
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm font-medium border border-red-100 mb-8">
              {error}
            </div>
          )}

          {role === 'umkm' ? (
            <form onSubmit={umkmForm.handleSubmit(onUMKMSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-brand-400 uppercase tracking-widest mb-2">Nama Pemilik Usaha</label>
                  <input {...umkmForm.register('ownerName')} className="w-full bg-brand-50 border-none rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-400 transition-all font-medium" />
                  {umkmForm.formState.errors.ownerName && <p className="text-red-500 text-xs mt-1 italic">{umkmForm.formState.errors.ownerName.message}</p>}
                </div>
                <div>
                  <label className="block text-xs font-bold text-brand-400 uppercase tracking-widest mb-2">Nama Usaha</label>
                  <input {...umkmForm.register('businessName')} className="w-full bg-brand-50 border-none rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-400 transition-all font-medium" />
                  {umkmForm.formState.errors.businessName && <p className="text-red-500 text-xs mt-1 italic">{umkmForm.formState.errors.businessName.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-brand-400 uppercase tracking-widest mb-2">Kategori Kuliner</label>
                  <select {...umkmForm.register('category')} className="w-full bg-brand-50 border-none rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-400 transition-all font-medium">
                    <option value="">Pilih Kategori</option>
                    <option value="Kuliner">Kuliner</option>
                    <option value="Minuman">Minuman</option>
                    <option value="Dessert">Dessert</option>
                    <option value="Catering">Catering</option>
                    <option value="Coffee Shop">Coffee Shop</option>
                  </select>
                  {umkmForm.formState.errors.category && <p className="text-red-500 text-xs mt-1 italic">{umkmForm.formState.errors.category.message}</p>}
                </div>
                <div>
                  <label className="block text-xs font-bold text-brand-400 uppercase tracking-widest mb-2">Lokasi (Kota/Kab)</label>
                  <input {...umkmForm.register('location')} placeholder="Jakarta Selatan" className="w-full bg-brand-50 border-none rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-400 transition-all font-medium" />
                  {umkmForm.formState.errors.location && <p className="text-red-500 text-xs mt-1 italic">{umkmForm.formState.errors.location.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-400 uppercase tracking-widest mb-2">Nomor WhatsApp</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-brand-400">+62</span>
                  <input {...umkmForm.register('waNumber')} placeholder="8123456789" className="w-full bg-brand-50 border-none rounded-2xl pr-4 pl-12 py-3 outline-none focus:ring-2 focus:ring-brand-400 transition-all font-medium" />
                </div>
                {umkmForm.formState.errors.waNumber && <p className="text-red-500 text-xs mt-1 italic">{umkmForm.formState.errors.waNumber.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-400 uppercase tracking-widest mb-2">Email</label>
                <input {...umkmForm.register('email')} type="email" className="w-full bg-brand-50 border-none rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-400 transition-all font-medium" />
                {umkmForm.formState.errors.email && <p className="text-red-500 text-xs mt-1 italic">{umkmForm.formState.errors.email.message}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-brand-400 uppercase tracking-widest mb-2">Password</label>
                  <input {...umkmForm.register('password')} type="password" className="w-full bg-brand-50 border-none rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-400 transition-all font-medium" />
                  {umkmForm.formState.errors.password && <p className="text-red-500 text-xs mt-1 italic">{umkmForm.formState.errors.password.message}</p>}
                </div>
                <div>
                  <label className="block text-xs font-bold text-brand-400 uppercase tracking-widest mb-2">Konfirmasi Password</label>
                  <input {...umkmForm.register('confirmPassword')} type="password" className="w-full bg-brand-50 border-none rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-400 transition-all font-medium" />
                  {umkmForm.formState.errors.confirmPassword && <p className="text-red-500 text-xs mt-1 italic">{umkmForm.formState.errors.confirmPassword.message}</p>}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-brand-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-brand-800 transition-all shadow-xl shadow-brand-900/20 disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin" /> : 'Selesaikan Pendaftaran'}
              </button>
            </form>
          ) : (
            <form onSubmit={influencerForm.handleSubmit(onInfluencerSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-brand-400 uppercase tracking-widest mb-2">Nama Lengkap</label>
                  <input {...influencerForm.register('fullName')} className="w-full bg-brand-50 border-none rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-400 transition-all font-medium" />
                   {influencerForm.formState.errors.fullName && <p className="text-red-500 text-xs mt-1 italic">{influencerForm.formState.errors.fullName.message}</p>}
                </div>
                <div>
                  <label className="block text-xs font-bold text-brand-400 uppercase tracking-widest mb-2">Nama Panggung/Username</label>
                  <input {...influencerForm.register('username')} placeholder="@username" className="w-full bg-brand-50 border-none rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-400 transition-all font-medium" />
                   {influencerForm.formState.errors.username && <p className="text-red-500 text-xs mt-1 italic">{influencerForm.formState.errors.username.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-brand-400 uppercase tracking-widest mb-2">Lokasi Kota/Kab</label>
                  <input {...influencerForm.register('location')} className="w-full bg-brand-50 border-none rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-400 transition-all font-medium" />
                  {influencerForm.formState.errors.location && <p className="text-red-500 text-xs mt-1 italic">{influencerForm.formState.errors.location.message}</p>}
                </div>
                <div>
                  <label className="block text-xs font-bold text-brand-400 uppercase tracking-widest mb-2">Niche Utama</label>
                   <select {...influencerForm.register('niche')} className="w-full bg-brand-50 border-none rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-400 transition-all font-medium">
                    <option value="">Pilih Niche</option>
                    <option value="Kuliner Umum">Kuliner Umum</option>
                    <option value="Review Makanan">Review Makanan</option>
                    <option value="Lifestyle">Lifestyle</option>
                    <option value="Cafe Hopping">Cafe Hopping</option>
                    <option value="Street Food">Street Food</option>
                  </select>
                  {influencerForm.formState.errors.niche && <p className="text-red-500 text-xs mt-1 italic">{influencerForm.formState.errors.niche.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-400 uppercase tracking-widest mb-2">Email</label>
                <input {...influencerForm.register('email')} type="email" className="w-full bg-brand-50 border-none rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-400 transition-all font-medium" />
                {influencerForm.formState.errors.email && <p className="text-red-500 text-xs mt-1 italic">{influencerForm.formState.errors.email.message}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-brand-400 uppercase tracking-widest mb-2">WhatsApp</label>
                  <input {...influencerForm.register('waNumber')} className="w-full bg-brand-50 border-none rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-400 transition-all font-medium" />
                  {influencerForm.formState.errors.waNumber && <p className="text-red-500 text-xs mt-1 italic">{influencerForm.formState.errors.waNumber.message}</p>}
                </div>
                <div>
                  <label className="block text-xs font-bold text-brand-400 uppercase tracking-widest mb-2">Link Foto Profil</label>
                  <input {...influencerForm.register('photoUrl')} placeholder="https://..." className="w-full bg-brand-50 border-none rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-400 transition-all font-medium" />
                  {influencerForm.formState.errors.photoUrl && <p className="text-red-500 text-xs mt-1 italic">{influencerForm.formState.errors.photoUrl.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-400 uppercase tracking-widest mb-2">Bio Singkat</label>
                <textarea {...influencerForm.register('bio')} rows={3} className="w-full bg-brand-50 border-none rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-400 transition-all font-medium resize-none" />
                {influencerForm.formState.errors.bio && <p className="text-red-500 text-xs mt-1 italic">{influencerForm.formState.errors.bio.message}</p>}
              </div>

              <div className="space-y-4">
                <label className="block text-xs font-bold text-brand-400 uppercase tracking-widest">Rate Card (Mulai dari Rp)</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                   <div>
                    <label className="block text-[10px] font-bold text-brand-300 uppercase mb-1">TikTok Video</label>
                    <input {...influencerForm.register('tiktokRate', { valueAsNumber: true })} type="number" className="w-full bg-brand-50 border-none rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-400" />
                  </div>
                   <div>
                    <label className="block text-[10px] font-bold text-brand-300 uppercase mb-1">IG Reels</label>
                    <input {...influencerForm.register('igReelsRate', { valueAsNumber: true })} type="number" className="w-full bg-brand-50 border-none rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-400" />
                  </div>
                   <div>
                    <label className="block text-[10px] font-bold text-brand-300 uppercase mb-1">IG Story</label>
                    <input {...influencerForm.register('igStoryRate', { valueAsNumber: true })} type="number" className="w-full bg-brand-50 border-none rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-400" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-brand-400 uppercase tracking-widest mb-2">Password</label>
                  <input {...influencerForm.register('password')} type="password" className="w-full bg-brand-50 border-none rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-400 transition-all font-medium" />
                  {influencerForm.formState.errors.password && <p className="text-red-500 text-xs mt-1 italic">{influencerForm.formState.errors.password.message}</p>}
                </div>
                <div>
                  <label className="block text-xs font-bold text-brand-400 uppercase tracking-widest mb-2">Konfirmasi Password</label>
                  <input {...influencerForm.register('confirmPassword')} type="password" className="w-full bg-brand-50 border-none rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-400 transition-all font-medium" />
                  {influencerForm.formState.errors.confirmPassword && <p className="text-red-500 text-xs mt-1 italic">{influencerForm.formState.errors.confirmPassword.message}</p>}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-brand-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-brand-800 transition-all shadow-xl shadow-brand-900/20 disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin" /> : 'Mulai Karier Influencer'}
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
