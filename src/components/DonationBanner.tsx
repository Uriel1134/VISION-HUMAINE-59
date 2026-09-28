'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Landmark, CheckSquare, Banknote, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

const PRESETS = [
  { amount: 20, impact: "1 kit scolaire & fournitures pour 2 enfants" },
  { amount: 50, impact: "Soins médicaux de base et dépistage pour 5 enfants" },
  { amount: 100, impact: "1 mois de nutrition complète en orphelinat" },
];

export const DonationBanner: React.FC = () => {
  const [selectedAmt, setSelectedAmt] = useState(50);
  const [donType, setDonType] = useState<'mensuel' | 'ponctuel'>('mensuel');

  const currentImpact = PRESETS.find(p => p.amount === selectedAmt) || PRESETS[1];

  return (
    <section className="py-12 sm:py-16 bg-[#FFFEFC] relative overflow-hidden" id="don-banner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="relative rounded-3xl bg-gradient-to-br from-[#14172B] via-[#292D77] to-[#14172B] text-[#FFFEFC] border border-slate-700/60 shadow-2xl overflow-hidden">
          
          {/* Subtle glow background */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#D72229]/15 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#292D77]/40 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center p-8 sm:p-10 lg:p-14 relative z-10">
            
            {/* Left Column: Interactive Donation Console */}
            <div className="lg:col-span-7 space-y-5">
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#FFFEFC] tracking-tight leading-[1.18]">
                Votre soutien peut <br />
                <span className="text-[#FFFEFC]">
                  changer une vie aujourd&apos;hui
                </span>
              </h2>

              <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal max-w-lg">
                Chaque don, quel que soit son montant, nous aide à poursuivre nos actions sur le terrain au Bénin et à offrir un avenir meilleur aux enfants.
              </p>

              {/* Donation Frequency & Amount Selector */}
              <div className="space-y-4 pt-2">
                <div className="flex gap-2 p-1 bg-slate-900/80 rounded-2xl max-w-sm border border-slate-700">
                  <button
                    onClick={() => setDonType('mensuel')}
                    className={`flex-1 py-2.5 px-2 rounded-xl text-xs font-extrabold transition-all whitespace-nowrap text-center ${
                      donType === 'mensuel' ? 'bg-[#D72229] text-[#FFFEFC] shadow' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Don Mensuel
                  </button>
                  <button
                    onClick={() => setDonType('ponctuel')}
                    className={`flex-1 py-2.5 px-2 rounded-xl text-xs font-extrabold transition-all whitespace-nowrap text-center ${
                      donType === 'ponctuel' ? 'bg-[#D72229] text-[#FFFEFC] shadow' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Don Ponctuel
                  </button>
                </div>

                {/* Amount Pills */}
                <div className="grid grid-cols-3 gap-3 max-w-md">
                  {PRESETS.map((p) => (
                    <button
                      key={p.amount}
                      onClick={() => setSelectedAmt(p.amount)}
                      className={`py-3 rounded-2xl font-black text-sm transition-all text-center border ${
                        selectedAmt === p.amount
                          ? 'bg-[#D72229] text-[#FFFEFC] border-[#D72229] shadow-md scale-105'
                          : 'bg-slate-800/80 text-white border-slate-700 hover:bg-slate-700'
                      }`}
                    >
                      {p.amount} €
                    </button>
                  ))}
                </div>

                {/* Dynamic Impact Display Box */}
                <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 max-w-lg">
                  <p className="text-[11px] font-extrabold uppercase tracking-widest text-slate-300">
                    Impact direct :
                  </p>
                  <p className="text-xs sm:text-sm text-slate-100 mt-1 font-semibold">
                    {currentImpact.impact} (~{Math.round(selectedAmt * 655.957).toLocaleString('fr-FR')} FCFA)
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <Link
                  href={`/don?amount=${selectedAmt}&type=${donType}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-[30px] font-extrabold text-xs sm:text-sm text-[#FFFEFC] bg-[#D72229] hover:bg-[#AB161C] shadow-lg hover:shadow-[#D72229]/30 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 text-center whitespace-nowrap"
                >
                  <span>Donner {selectedAmt} € ({donType})</span>
                  <ArrowRight className="w-4 h-4 flex-shrink-0" />
                </Link>
              </div>

            </div>

            {/* Right Column: Visual Photo & Payment Badges with Authentic Photo */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] bg-slate-800 border-2 border-slate-700 group">
                <Image
                  src="/images/missions/dassa-2.jpg"
                  alt="Mission de partage VISION HUMAINE 59"
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white text-xs font-bold">
                  <p>100% de vos dons sont directement mobilisés sur le terrain.</p>
                </div>
              </div>

              {/* Payment Methods Badges in Dark Mode */}
              <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-700 space-y-3">
                <div className="flex items-center justify-between text-xs font-extrabold text-slate-300 uppercase tracking-wider">
                  <span>Moyens de règlement sécurisés</span>
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="py-2 px-2 bg-slate-800 rounded-xl font-bold text-slate-200 border border-slate-700">
                    PayPal
                  </div>
                  <div className="py-2 px-2 bg-slate-800 rounded-xl font-bold text-slate-200 border border-slate-700">
                    VISA
                  </div>
                  <div className="py-2 px-2 bg-slate-800 rounded-xl font-bold text-slate-200 border border-slate-700">
                    Mastercard
                  </div>
                  <div className="py-2 px-2 bg-slate-800 rounded-xl font-medium text-slate-300 border border-slate-700 text-[11px]">
                    Virement
                  </div>
                  <div className="py-2 px-2 bg-slate-800 rounded-xl font-medium text-slate-300 border border-slate-700 text-[11px]">
                    Mobile Money
                  </div>
                  <div className="py-2 px-2 bg-slate-800 rounded-xl font-medium text-slate-300 border border-slate-700 text-[11px]">
                    Espèces
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
