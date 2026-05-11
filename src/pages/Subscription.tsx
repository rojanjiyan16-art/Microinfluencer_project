import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { CreditCard, CheckCircle2, ShieldCheck, ArrowLeft, Loader2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Subscription = () => {
  const [searchParams] = useSearchParams();
  const plan = searchParams.get('plan') || 'Free';
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const handlePayment = () => {
    setLoading(true);
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      // After 2 seconds, redirect to dashboard
      setTimeout(() => {
        navigate(user?.role === 'umkm' ? '/dashboard/umkm' : '/dashboard/influencer');
      }, 2000);
    }, 2000);
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-50 p-4">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-12 rounded-[40px] shadow-2xl text-center max-w-md w-full"
        >
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={48} />
          </div>
          <h1 className="text-3xl font-black text-brand-900 mb-4">Pembayaran Berhasil!</h1>
          <p className="text-brand-500 mb-8">
            Selamat! Akun Anda telah ditingkatkan ke paket <span className="font-bold text-brand-900 uppercase">{plan}</span>.
          </p>
          <p className="text-sm text-brand-400">Mengalihkan ke dashboard...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-40 pb-20 bg-brand-50 px-4">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-brand-900 font-bold mb-8 hover:text-brand-500 transition-colors"
        >
          <ArrowLeft size={20} /> Kembali
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Order Summary */}
          <div className="space-y-6">
            <h1 className="text-4xl font-black text-brand-900">Checkout</h1>
            <p className="text-brand-500">Selesaikan pembayaran untuk mengaktifkan paket Anda.</p>
            
            <div className="bg-white p-8 rounded-[30px] shadow-xl border border-brand-100">
              <h2 className="text-lg font-bold text-brand-900 mb-6 pb-4 border-b border-brand-50">Ringkasan Pesanan</h2>
              <div className="flex justify-between items-center mb-4">
                <span className="text-brand-500">Paket Terpilih</span>
                <span className="font-bold text-brand-900 uppercase">{plan}</span>
              </div>
              <div className="flex justify-between items-center mb-6">
                <span className="text-brand-500">Durasi</span>
                <span className="text-brand-900 font-medium">Bulanan</span>
              </div>
              <div className="flex justify-between items-center pt-6 border-t border-brand-50">
                <span className="text-xl font-black text-brand-900">Total Biaya</span>
                <span className="text-2xl font-black text-brand-900">
                  {plan === 'pro' ? 'Rp 299rb' : plan === 'enterprise' ? 'Rp 999rb' : 'Gratis'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-brand-400 bg-white/50 p-4 rounded-2xl border border-dashed border-brand-200">
              <ShieldCheck size={24} className="shrink-0" />
              <p className="text-xs">
                Transaksi Anda aman dan terenkripsi. Kami bekerja sama dengan penyedia pembayaran terpercaya untuk memastikan keamanan data Anda.
              </p>
            </div>
          </div>

          {/* Payment Form */}
          <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-2xl border border-brand-100">
            <h2 className="text-2xl font-black text-brand-900 mb-8 flex items-center gap-3">
              <CreditCard size={28} /> Metode Pembayaran
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-brand-400 uppercase tracking-widest mb-3">Nomor Kartu / Virtual Account</label>
                <input 
                  type="text" 
                  placeholder="0000 0000 0000 0000"
                  className="w-full bg-brand-50 border-none rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-brand-400 transition-all font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-brand-400 uppercase tracking-widest mb-3">Masa Berlaku</label>
                  <input 
                    type="text" 
                    placeholder="MM/YY"
                    className="w-full bg-brand-50 border-none rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-brand-400 transition-all font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-brand-400 uppercase tracking-widest mb-3">CVV</label>
                  <input 
                    type="text" 
                    placeholder="123"
                    className="w-full bg-brand-50 border-none rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-brand-400 transition-all font-medium"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={handlePayment}
                  disabled={loading}
                  className="w-full bg-black text-white py-5 rounded-[20px] font-bold flex items-center justify-center gap-3 hover:bg-zinc-800 transition-all shadow-xl shadow-black/20 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 size={24} className="animate-spin" />
                      Memproses...
                    </>
                  ) : (
                    'Bayar Sekarang'
                  )}
                </button>
              </div>

              <div className="text-center">
                <p className="text-xs text-brand-300">
                  Dengan mengklik "Bayar Sekarang", Anda menyetujui Ketentuan Layanan dan Kebijakan Privasi kami.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
