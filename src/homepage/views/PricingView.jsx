import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPricingBillingPeriod, setDemoModal } from '../store/uiSlice.js';
import { PRICING_PLANS, FAQ_ITEMS } from '../data.js';
import { Check, HelpCircle, ChevronDown, ChevronUp, Star, ShieldCheck, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function PricingView() {
  const dispatch = useDispatch();
  const billingPeriod = useSelector((state) => state.ui.pricingBillingPeriod);
  
  // Local state for Accordion
  const [openFaqIdx, setOpenFaqIdx] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaqIdx(openFaqIdx === index ? null : index);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', damping: 25, stiffness: 100 }
    }
  };

  return (
    <div 
      className="bg-[#f8fafc] min-h-screen py-16 sm:py-24 relative overflow-hidden font-sans select-none" 
      id="pricing-view-container"
      style={{
        backgroundImage: 'radial-gradient(rgba(15, 23, 42, 0.015) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    >
      {/* Soft Ambient Blurs */}
      <div className="absolute top-[5%] right-[-5%] w-[400px] h-[400px] bg-sky-400/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-[40%] left-[-5%] w-[450px] h-[450px] bg-indigo-400/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title & Period Selector */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-flex items-center space-x-2 rounded-full bg-sky-500/10 px-4 py-1 text-[11px] font-mono font-bold tracking-widest text-sky-700 border border-sky-500/20 shadow-2xs mb-4">
            <span className="flex h-1.5 w-1.5 rounded-full bg-sky-500 animate-pulse" />
            <span>PLANLAR &amp; ÜCRETLER</span>
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mt-2.5 leading-tight">
            Basit, Şeffaf Fiyatlandırma
          </h1>
          <p className="text-sm text-slate-500 mt-4 leading-relaxed max-w-2xl mx-auto">
            Şirketinizin büyüklüğüne göre ölçeklenebilen, gizli maliyetler barındırmayan net fiyat planları.
          </p>

          {/* Toggle Monthly / Yearly */}
          <div className="flex items-center justify-center mt-8">
            <div className="relative flex rounded-xl bg-slate-100 p-1 border border-slate-200/50 shadow-inner">
              <button
                type="button"
                onClick={() => dispatch(setPricingBillingPeriod('monthly'))}
                className={`relative rounded-lg px-4 py-2 text-xs font-bold transition-all duration-300 ${
                  billingPeriod === 'monthly'
                    ? 'bg-white text-sky-650 shadow-xs border border-slate-200/20'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                id="pricing-toggle-monthly"
              >
                Aylık Ödeme
              </button>
              <button
                type="button"
                onClick={() => dispatch(setPricingBillingPeriod('yearly'))}
                className={`relative rounded-lg px-4 py-2 text-xs font-bold transition-all duration-300 flex items-center ${
                  billingPeriod === 'yearly'
                    ? 'bg-white text-sky-650 shadow-xs border border-slate-200/20'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                id="pricing-toggle-yearly"
              >
                <span>Yıllık Ödeme</span>
                <span className="text-[8px] bg-sky-500 text-white px-1.5 py-0.5 rounded-md font-bold ml-2 shadow-2xs border border-sky-400/20">%20 TASARRUF</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Pricing Cards Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-20"
        >
          {PRICING_PLANS.map((plan, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{ y: plan.isPopular ? -6 : -4, scale: plan.isPopular ? 1.015 : 1.005 }}
              className={`relative border rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-[0_8px_30px_rgba(0,0,0,0.015)] transition-all duration-500 ${
                plan.isPopular
                  ? 'border-sky-500 bg-white ring-2 ring-sky-500/20 shadow-[0_20px_50px_rgba(14,165,233,0.08)] scale-[1.01]'
                  : 'border-slate-100 bg-white hover:border-slate-300/40 hover:shadow-[0_15px_45px_rgba(0,0,0,0.02)]'
              }`}
              id={`pricing-card-${plan.name.toLowerCase()}`}
            >
              
              {/* Popular ribbon */}
              {plan.isPopular && (
                <div className="absolute top-0 right-8 -translate-y-1/2 bg-sky-500 text-white text-[9px] font-mono font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-[0_0_15px_rgba(14,165,233,0.3)] flex items-center space-x-1.5 border border-sky-400">
                  <Star className="h-3 w-3 fill-current animate-pulse" />
                  <span>EN POPÜLER PLAN</span>
                </div>
              )}

              <div className="space-y-6">
                
                {/* Plan Head */}
                <div>
                  <h3 className="text-xl font-bold text-slate-900 leading-tight">{plan.name}</h3>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed min-h-[36px]">
                    {plan.description}
                  </p>
                </div>

                {/* Plan Pricing */}
                <div className="py-4 border-y border-slate-100">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-black text-slate-950 tracking-tight font-sans">
                      ${billingPeriod === 'monthly' ? plan.price.monthly : plan.price.yearly}
                    </span>
                    <span className="text-xs font-bold text-slate-400 ml-1.5"> / ay</span>
                  </div>
                  <p className="text-[9px] text-slate-400 mt-1.5 font-mono font-bold">
                    {billingPeriod === 'yearly' ? '// YILLIK PEŞİN ÖDEME' : '// AYLIK YENİLENEN'}
                  </p>
                </div>

                {/* Features list */}
                <div className="space-y-3.5">
                  <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest block">// İÇERİKLER</span>
                  <ul className="space-y-2.5 text-xs text-slate-650">
                    {plan.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start space-x-2.5">
                        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-sky-50 text-sky-500 border border-sky-100 shrink-0 mt-0.5">
                          <Check className="h-2.5 w-2.5" />
                        </span>
                        <span className="leading-relaxed text-slate-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* CTA Action */}
              <button
                onClick={() => dispatch(setDemoModal({ open: true, service: `${plan.name} Planı Satın Alma` }))}
                className={`w-full mt-8 py-3 px-4 rounded-xl text-xs font-bold transition-all duration-300 ${
                  plan.isPopular
                    ? 'bg-sky-500 text-white hover:bg-sky-600 shadow-[0_0_20px_rgba(14,165,233,0.25)] hover:shadow-[0_0_25px_rgba(14,165,233,0.35)]'
                    : 'bg-slate-900 text-white hover:bg-slate-850 shadow-2xs hover:shadow-xs'
                }`}
                id={`pricing-cta-${plan.name.toLowerCase()}`}
              >
                {plan.ctaText}
              </button>

            </motion.div>
          ))}
        </motion.div>

        {/* FAQ Section (Sıkça Sorulan Sorular Accordion) */}
        <motion.section 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto py-8" 
          id="faq-section"
        >
          <div className="text-center mb-10">
            <span className="inline-flex items-center space-x-2 rounded-full bg-sky-500/10 px-4 py-1 text-[11px] font-mono font-bold tracking-widest text-sky-700 border border-sky-500/20 shadow-2xs mb-4">
              <span className="flex h-1.5 w-1.5 rounded-full bg-sky-500" />
              <span>SIKÇA SORULAN SORULAR</span>
            </span>
            <p className="text-xs text-slate-500 mt-2">ConneXion-AI güvenlik, teknik özellikler ve fiyatlandırma hakkında merak edilenler.</p>
          </div>

          <div className="space-y-3.5">
            {FAQ_ITEMS.map((faq, idx) => {
              const isOpened = openFaqIdx === idx;
              return (
                <div
                  key={idx}
                  className={`border rounded-2xl overflow-hidden bg-white shadow-[0_5px_15px_rgba(0,0,0,0.005)] transition-all duration-300 border-slate-100 ${
                    isOpened ? 'ring-1 ring-sky-500/20 border-sky-500/30' : 'hover:border-slate-300/60'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between p-5 text-left font-bold text-slate-900 hover:bg-slate-50/50 transition-colors"
                    id={`faq-btn-${idx}`}
                  >
                    <span className="text-xs sm:text-sm tracking-wide">{faq.question}</span>
                    <span className={`h-6 w-6 rounded-lg bg-slate-50 border border-slate-150 flex items-center justify-center text-slate-400 shrink-0 transition-transform duration-300 ${isOpened ? 'rotate-180 text-sky-500 bg-sky-50/50 border-sky-100' : ''}`}>
                      <ChevronDown className="h-3.5 w-3.5" />
                    </span>
                  </button>
                  
                  <AnimatePresence initial={false}>
                    {isOpened && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-500 leading-relaxed border-t border-slate-100 bg-slate-50/30">
                          <p>{faq.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </motion.section>

      </div>
    </div>
  );
}
