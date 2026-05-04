import React from 'react';
import { Link } from 'react-router-dom';
import { Users, TrendingUp, Eye, MapPin, ExternalLink } from 'lucide-react';
import { Influencer } from '../types';
import { motion } from 'motion/react';

interface Props {
  influencer: Influencer;
}

const InfluencerCard: React.FC<Props> = ({ influencer }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-3xl overflow-hidden border border-brand-100 hover:border-brand-300 transition-all shadow-sm hover:shadow-xl"
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={influencer.photo}
          alt={influencer.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-brand-900 shadow-sm uppercase tracking-wider">
            {influencer.niche}
          </span>
          <span className={`bg-brand-900/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm uppercase tracking-wider`}>
            {influencer.platform}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-brand-900 mb-1">{influencer.name}</h3>
            <div className="flex items-center text-brand-500 text-sm gap-1">
              <MapPin size={14} />
              <span>{influencer.location}</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs font-bold text-brand-400 uppercase">Mulai dari</span>
            <p className="text-lg font-bold text-brand-900">{influencer.priceRange.split(' - ')[0]}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-6">
          <div className="bg-brand-50 p-2 rounded-xl text-center">
            <Users size={16} className="mx-auto mb-1 text-brand-500" />
            <span className="block text-xs font-bold text-brand-900">{(influencer.followers / 1000).toFixed(1)}k</span>
            <span className="text-[10px] text-brand-400 uppercase font-medium">Pengikut</span>
          </div>
          <div className="bg-brand-50 p-2 rounded-xl text-center">
            <TrendingUp size={16} className="mx-auto mb-1 text-brand-500" />
            <span className="block text-xs font-bold text-brand-900">{influencer.engagementRate}%</span>
            <span className="text-[10px] text-brand-400 uppercase font-medium">Engagement</span>
          </div>
          <div className="bg-brand-50 p-2 rounded-xl text-center">
            <Eye size={16} className="mx-auto mb-1 text-brand-500" />
            <span className="block text-xs font-bold text-brand-900">{(influencer.avgViews / 1000).toFixed(1)}k</span>
            <span className="text-[10px] text-brand-400 uppercase font-medium">Rata-rata View</span>
          </div>
        </div>

        <Link
          to={`/influencers/${influencer.id}`}
          className="flex items-center justify-center gap-2 w-full bg-brand-100 text-brand-900 py-3 rounded-xl font-semibold hover:bg-brand-900 hover:text-white transition-all group"
        >
          Lihat Profil
          <ExternalLink size={16} className="opacity-50 group-hover:opacity-100 transition-opacity" />
        </Link>
      </div>
    </motion.div>
  );
};

export default InfluencerCard;
