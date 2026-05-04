import React from 'react';
import { motion } from 'motion/react';
import { Check, X } from 'lucide-react';
import { PricingPlan } from '../types';

interface Props {
  plan: PricingPlan;
}

const PriceCard: React.FC<Props> = ({ plan }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`relative bg-white rounded-3xl p-8 border ${
        plan.recommended ? 'border-brand-900 ring-4 ring-brand-900/5 shadow-2xl' : 'border-brand-100 shadow-xl'
      }`}
    >
      {plan.recommended && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-900 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
          Paling Populer
        </div>
      )}

      <div className="mb-8">
        <h3 className="text-xl font-bold text-brand-900 mb-2">{plan.name}</h3>
        <p className="text-sm text-brand-500 mb-6">{plan.bestFor}</p>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-black text-brand-900">{plan.price}</span>
          <span className="text-brand-400 font-medium">/bulan</span>
        </div>
      </div>

      <div className="space-y-4 mb-10">
        {plan.features.map((feature, i) => (
          <div key={i} className="flex gap-3">
            <Check size={18} className="text-emerald-500 shrink-0" />
            <span className="text-sm text-brand-700 font-medium">{feature}</span>
          </div>
        ))}
        {plan.limitations.map((limit, i) => (
          <div key={i} className="flex gap-3 opacity-40">
            <X size={18} className="text-rose-500 shrink-0" />
            <span className="text-sm text-brand-700 font-medium">{limit}</span>
          </div>
        ))}
      </div>

      <button
        className={`w-full py-4 rounded-xl font-bold transition-all ${
          plan.recommended
            ? 'bg-brand-900 text-white hover:bg-brand-800 shadow-lg shadow-brand-900/20'
            : 'bg-brand-50 text-brand-900 hover:bg-brand-100'
        }`}
      >
        Pilih {plan.name}
      </button>
    </motion.div>
  );
};

export default PriceCard;
