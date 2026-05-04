import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-brand-100 last:border-none">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-center text-left hover:text-brand-500 transition-colors"
      >
        <span className="text-lg font-bold text-brand-900">{question}</span>
        {isOpen ? <Minus size={20} className="text-brand-400" /> : <Plus size={20} className="text-brand-400" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-brand-600 font-medium leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Contact = () => {
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Pesan terkirim! Kami akan segera menghubungi Anda.');
    setTimeout(() => setStatus(null), 5000);
  };

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Contact Form */}
          <div>
            <h1 className="text-5xl font-black text-brand-900 mb-6">Mari Berdiskusi.</h1>
            <p className="text-xl text-brand-500 mb-12">
              Punya pertanyaan tentang platform kami atau ingin menyarankan fitur? Kirimkan pesan kepada kami.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-brand-400 uppercase mb-3">Nama Lengkap</label>
                  <input
                    required
                    type="text"
                    className="w-full px-6 py-4 bg-brand-50 border-none rounded-2xl text-brand-900 focus:ring-2 focus:ring-brand-900 transition-all font-medium"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-brand-400 uppercase mb-3">Alamat Email</label>
                  <input
                    required
                    type="email"
                    className="w-full px-6 py-4 bg-brand-50 border-none rounded-2xl text-brand-900 focus:ring-2 focus:ring-brand-900 transition-all font-medium"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-brand-400 uppercase mb-3">Subjek</label>
                <select className="w-full px-6 py-4 bg-brand-50 border-none rounded-2xl text-brand-900 focus:ring-2 focus:ring-brand-900 transition-all font-medium">
                  <option>Pertanyaan Kemitraan</option>
                  <option>Permintaan Dukungan</option>
                  <option>Saran Fitur</option>
                  <option>Lainnya</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-brand-400 uppercase mb-3">Pesan</label>
                <textarea
                  required
                  rows={5}
                  className="w-full px-6 py-4 bg-brand-50 border-none rounded-2xl text-brand-900 focus:ring-2 focus:ring-brand-900 transition-all font-medium resize-none"
                  placeholder="Bagaimana kami bisa membantu Anda?"
                />
              </div>
              <button
                type="submit"
                className="flex items-center justify-center gap-3 w-full bg-brand-900 text-white py-5 rounded-2xl font-black text-lg hover:bg-brand-800 transition-all shadow-xl shadow-brand-900/10"
              >
                Kirim Pesan <Send size={20} />
              </button>
              {status && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-emerald-600 font-bold text-center"
                >
                  {status}
                </motion.p>
              )}
            </form>
          </div>

          {/* Info & FAQ */}
          <div className="space-y-16">
            <div className="bg-brand-50 p-10 rounded-[40px] space-y-8">
              <div className="flex gap-6 items-start">
                <div className="bg-white p-4 rounded-2xl text-brand-900 shadow-sm">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-brand-900 mb-1">Email Kami</h4>
                  <p className="text-brand-500 font-medium underline underline-offset-4">halo@microinfluhub.id</p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="bg-white p-4 rounded-2xl text-brand-900 shadow-sm">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-brand-900 mb-1">Hubungi Kami</h4>
                  <p className="text-brand-500 font-medium">+62 812-3456-7890</p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="bg-white p-4 rounded-2xl text-brand-900 shadow-sm">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-brand-900 mb-1">Kantor Kami</h4>
                  <p className="text-brand-500 font-medium">SCBD, Jakarta, Indonesia</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-black text-brand-900 mb-8">Pertanyaan Umum</h2>
              <div className="space-y-2">
                <FAQItem
                  question="Berapa lama waktu yang dibutuhkan untuk melihat hasil?"
                  answer="Sebagian besar UMKM melihat lonjakan engagement dalam waktu 24-48 jam setelah influencer memposting ulasan mereka."
                />
                <FAQItem
                  question="Apakah diperlukan kontrak?"
                  answer="Tidak, kami beroperasi dengan basis langganan bulanan untuk influencer. UMKM dapat menggunakan marketplace secara gratis tanpa komitmen."
                />
                <FAQItem
                  question="Bagaimana influencer diverifikasi?"
                  answer="Kami menggunakan AI milik kami untuk menganalisis pola pertumbuhan akun dan keaslian engagement untuk memastikan tidak ada bot yang terlibat."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
