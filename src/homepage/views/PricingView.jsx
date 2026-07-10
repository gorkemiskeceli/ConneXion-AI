import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPricingBillingPeriod, setDemoModal } from '../store/uiSlice.js';
import { PRICING_PLANS, FAQ_ITEMS } from '../data.js';
import { Check, HelpCircle, ChevronDown, ChevronUp, Star, ShieldCheck, Mail } from 'lucide-react';

export default function PricingView() {
  const dispatch = useDispatch();
  const billingPeriod = useSelector((state) => state.ui.pricingBillingPeriod);
  
  // Local state for Accordion
  const [openFaqIdx, setOpenFaqIdx] = useState(null);

  const toggleFaq = (index) => {
    if (openFaqIdx === index) {
      setOpenFaqIdx(null);
    } else {
      setOpenFaqIdx(index);
    }
  };

  return (
    <div className="bg-[#f0f2f5] min-h-screen py-8 sm:py-12" id="pricing-view-container">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center space-x-1 rounded bg-sky-50 px-2 py-0.5 text-[11px] font-mono font-bold text-sky-800 border border-sky-150">// PLANLAR & ÜCRETLER</span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2.5">
            Basit, Şeffaf Fiyatlandırma
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
            Şirketinizin büyüklüğüne göre ölçeklenebilen, gizli maliyetler barındırmayan net fiyat planları.
          </p>

          {/* Toggle Monthly / Yearly */}
          <div className="flex items-center justify-center mt-6">
            <div className="relative flex rounded bg-slate-200 p-0.5 border border-slate-300">
              <button
                type="button"
                onClick={() => dispatch(setPricingBillingPeriod('monthly'))}
                className={`relative rounded px-3 py-1 text-xs font-bold transition-all ${
                  billingPeriod === 'monthly'
                    ? 'bg-white text-sky-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                id="pricing-toggle-monthly"
              >
                Aylık Ödeme
              </button>
              <button
                type="button"
                onClick={() => dispatch(setPricingBillingPeriod('yearly'))}
                className={`relative rounded px-3 py-1 text-xs font-bold transition-all ${
                  billingPeriod === 'yearly'
                    ? 'bg-white text-sky-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                id="pricing-toggle-yearly"
              >
                Yıllık Ödeme <span className="text-[9px] bg-sky-50 text-sky-800 px-1 rounded font-bold border border-sky-150 ml-1">%20 TASARRUF</span>
              </button>
            </div>
          </div>

        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch mb-16">
          {PRICING_PLANS.map((plan, idx) => (
            <div
              key={idx}
              className={`relative border rounded-lg p-5 flex flex-col justify-between shadow-2xs transition-all duration-300 ${
                plan.isPopular
                  ? 'border-sky-500 bg-white ring-1 ring-sky-500 shadow-xs'
                  : 'border-slate-200 bg-slate-50/40 hover:bg-white hover:shadow-2xs'
              }`}
              id={`pricing-card-${plan.name.toLowerCase()}`}
            >
              
              {/* Popular ribbon */}
              {plan.isPopular && (
                <div className="absolute top-0 right-5 -translate-y-1/2 bg-sky-500 text-white text-[9px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded shadow-xs flex items-center space-x-1 border border-sky-400">
                  <Star className="h-2.5 w-2.5 fill-current" />
                  <span>EN POPÜLER PLAN</span>
                </div>
              )}

              <div className="space-y-4">
                
                {/* Plan Head */}
                <div>
                  <h3 className="text-base font-bold text-slate-900">{plan.name}</h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed min-h-[30px]">
                    {plan.description}
                  </p>
                </div>

                {/* Plan Pricing */}
                <div className="py-3 border-y border-slate-100">
                  <span className="text-3xl font-black text-slate-950 font-sans">
                    ${billingPeriod === 'monthly' ? plan.price.monthly : plan.price.yearly}
                  </span>
                  <span className="text-xs font-bold text-slate-400"> / ay</span>
                  <p className="text-[10px] text-slate-400 mt-0.5 font-mono">
                    {billingPeriod === 'yearly' ? '// YILLIK PEŞİN ÖDEME' : '// AYLIK YENİLENEN'}
                  </p>
                </div>

                {/* Features list */}
                <div className="space-y-2.5">
                  <span className="text-[10px] font-mono font-bold text-slate-900 uppercase tracking-wider block">// İÇERİKLER</span>
                  <ul className="space-y-2 text-xs text-slate-600">
                    {plan.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start space-x-2">
                        <Check className="h-4 w-4 text-sky-500 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* CTA Action */}
              <button
                onClick={() => dispatch(setDemoModal({ open: true, service: `${plan.name} Planı Satın Alma` }))}
                className={`w-full mt-6 py-2.5 px-3 rounded text-xs font-bold transition-all shadow-2xs ${
                  plan.isPopular
                    ? 'bg-sky-500 text-white hover:bg-sky-600'
                    : 'bg-slate-850 text-white hover:bg-slate-800'
                }`}
                id={`pricing-cta-${plan.name.toLowerCase()}`}
              >
                {plan.ctaText}
              </button>

            </div>
          ))}
        </div>

        {/* FAQ Section (Sıkça Sorulan Sorular Accordion) */}
        <section className="max-w-3xl mx-auto py-8" id="faq-section">
          <div className="text-center mb-8">
            <span className="inline-flex items-center space-x-1 rounded bg-sky-50 px-2 py-0.5 text-[11px] font-mono font-bold text-sky-800 border border-sky-150">// SIKÇA SORULAN SORULAR</span>
            <p className="text-xs text-slate-500 mt-1">ConneXion-AI güvenlik, teknik özellikler ve fiyatlandırma hakkında merak edilenler.</p>
          </div>

          <div className="space-y-2.5">
            {FAQ_ITEMS.map((faq, idx) => {
              const isOpened = openFaqIdx === idx;
              return (
                <div
                  key={idx}
                  className="border border-slate-200 rounded overflow-hidden bg-white shadow-2xs transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between p-4 text-left font-bold text-slate-900 hover:bg-slate-50 transition-colors"
                    id={`faq-btn-${idx}`}
                  >
                    <span className="text-xs sm:text-sm">{faq.question}</span>
                    {isOpened ? (
                      <ChevronUp className="h-4 w-4 text-slate-500 shrink-0" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-slate-500 shrink-0" />
                    )}
                  </button>
                  
                  {isOpened && (
                    <div className="px-4 pb-4 pt-1.5 text-xs text-slate-500 leading-relaxed border-t border-slate-150 bg-slate-50/50">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
}
