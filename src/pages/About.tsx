import React from 'react';
import { motion } from 'motion/react';
import { Rocket, Target, Heart, ShieldCheck, Camera } from 'lucide-react';

const About = () => {
  return (
    <div className="pt-20">
      {/* Vision */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16 md:mb-24 text-center md:text-left">
            <h1 className="text-4xl md:text-7xl font-black text-brand-900 mb-6 md:mb-8 leading-tight">
              Mendigitalkan Word-of-Mouth.
            </h1>
            <p className="text-lg md:text-2xl text-brand-500 leading-relaxed font-light">
              Misi kami adalah menciptakan transparansi dalam dunia pemasaran kuliner. Kami menghubungkan para pencerita kuliner yang antusias dengan bisnis lokal yang membuat kota kita lezat.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-12">
              <div className="bg-brand-50 p-10 rounded-[40px] border border-brand-100">
                <Target size={40} className="text-brand-500 mb-6" />
                <h3 className="text-2xl font-black text-brand-900 mb-4">Visi Kami</h3>
                <p className="text-brand-600 leading-relaxed font-medium">
                  Menjadi standar global untuk pemasaran kuliner hiper-lokal, di mana setiap bisnis kecil memiliki akses ke alat pertumbuhan yang sama dengan rantai global.
                </p>
              </div>
              <div className="bg-brand-900 text-white p-10 rounded-[40px]">
                <Rocket size={40} className="text-brand-400 mb-6" />
                <h3 className="text-2xl font-black mb-4">Misi Kami</h3>
                <p className="text-brand-300 leading-relaxed font-medium">
                  Kami menjembatani kesenjangan antara UMKM dan influencer profesional menggunakan transparansi data real-time dan manajemen kampanye yang sederhana.
                </p>
              </div>
            </div>
              <div className="relative group">
                <img
                  src="https://images.unsplash.com/photo-1616469829581-73993eb86b02?auto=format&fit=crop&q=80&w=1000"
                  alt="Professional Content Creator Setup"
                  className="rounded-[50px] shadow-2xl transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-brand-900/10 rounded-[50px]"></div>
                 <div className="absolute -bottom-4 -left-4 md:-bottom-8 md:-left-8 bg-brand-400 text-brand-900 p-4 md:p-8 rounded-[24px] md:rounded-[30px] font-black text-sm md:text-lg shadow-xl flex items-center gap-3 md:gap-4">
                   <div className="bg-brand-900 text-white p-2 md:p-3 rounded-xl md:rounded-2xl shrink-0">
                     <Camera size={24} className="md:w-8 md:h-8" />
                   </div>
                   <div>
                     <p className="leading-none">Didirikan 2024</p>
                     <p className="text-[10px] md:text-sm font-medium text-brand-900/60 mt-0.5 md:mt-1">Jakarta, Indonesia</p>
                   </div>
                 </div>
              </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-brand-50">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
               <h2 className="text-4xl font-black text-brand-900 mb-4">Nilai Inti Kami</h2>
               <p className="text-xl text-brand-500">Apa yang mendorong kami setiap hari</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
               {[
                 { icon: Heart, title: 'UMKM Utama', desc: 'Setiap keputusan yang kami buat dimulai dengan pertanyaan: "Bagaimana ini membantu bisnis kecil tumbuh?"' },
                 { icon: ShieldCheck, title: 'Integritas Data', desc: 'Tanpa statistik palsu. Tanpa biaya tersembunyi. Kami percaya pada transparansi 100% antara kreator dan brand.' },
                 { icon: Rocket, title: 'Inovasi', desc: 'Terus membangun cara yang lebih cerdas untuk mencocokkan brand kuliner dengan audiens yang tepat.' }
               ].map((value, i) => (
                 <div key={i} className="bg-white p-10 rounded-[40px] text-center border border-brand-100 shadow-sm">
                    <div className="bg-brand-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-8 text-brand-900">
                       <value.icon size={32} />
                    </div>
                    <h4 className="text-xl font-bold text-brand-900 mb-4">{value.title}</h4>
                    <p className="text-brand-600 font-medium leading-relaxed">{value.desc}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* Team */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-black text-brand-900 mb-16">Kenali Pendiri Kami</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
               {[
                 { name: 'Alex Thompson', role: 'CEO & Pendiri', photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400&h=400' },
                 { name: 'Maria Garcia', role: 'CTO', photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400&h=400' },
                 { name: 'Kevin Santoso', role: 'Kepala Kemitraan', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400&h=400' },
                 { name: 'Sarah Wu', role: 'Desain Utama', photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400&h=400' },
               ].map((member, i) => (
                 <motion.div
                   key={i}
                    whileHover={{ y: -10 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                 >
                    <div className="aspect-square rounded-[40px] overflow-hidden mb-6 shadow-xl">
                       <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
                    </div>
                    <h4 className="text-xl font-bold text-brand-900">{member.name}</h4>
                    <p className="text-brand-500 font-medium">{member.role}</p>
                 </motion.div>
               ))}
            </div>
        </div>
      </section>
    </div>
  );
};

export default About;
