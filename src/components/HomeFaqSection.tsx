'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, HelpCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { FAQ_ITEMS } from '@/lib/data';

export const HomeFaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-10 sm:py-14 bg-[#FFFEFC] border-t border-slate-100" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#292D77] tracking-tight leading-tight mb-2">
            Tout ce que vous devez savoir
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Nous répondons en toute transparence à vos interrogations sur la gestion de nos fonds et l&apos;impact de vos dons.
          </p>
        </div>

        {/* Accordion Items */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden transition-all duration-200 shadow-subtle hover:border-slate-300"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full px-6 py-5 text-left font-extrabold text-sm sm:text-base text-slate-900 flex justify-between items-center gap-4 hover:bg-slate-50/50 transition-colors"
                >
                  <span className="leading-snug">{item.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform duration-300 flex-shrink-0 ${
                      isOpen ? 'rotate-180 text-[#292D77]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-[#FFFEFC]">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact CTA */}
        <div className="mt-10 text-center">
          <p className="text-xs sm:text-sm text-slate-500 mb-3">
            Vous avez une question spécifique ou un projet de partenariat ?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#292D77] hover:text-[#1B1E54] transition-colors"
          >
            <span>Contacter notre équipe directement</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
};
