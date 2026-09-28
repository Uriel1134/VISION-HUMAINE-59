'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Lock, 
  ArrowRight, 
  CreditCard, 
  Smartphone, 
  CheckCircle2, 
  Receipt 
} from 'lucide-react';
import { DONATION_PRESETS } from '@/lib/data';

export const QuickDonationWidget: React.FC = () => {
  const [donationType, setDonationType] = useState<'ponctuel' | 'mensuel'>('mensuel');
  const [selectedAmount, setSelectedAmount] = useState<number>(50);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [currency, setCurrency] = useState<'EUR' | 'XOF'>('EUR');

  const activePreset = DONATION_PRESETS.find(p => p.amount === selectedAmount);

  const getImpactDescription = (amount: number) => {
    if (amount <= 25) return "Finance 1 kit scolaire complet et le goûter d'une semaine pour un écolier.";
    if (amount <= 50) return "Couvre les soins médicaux de base, le déparasitage et les vaccins de 5 enfants.";
    if (amount <= 100) return "Assure un mois complet d'alimentation équilibrée et l'hébergement d'un enfant en orphelinat.";
    return "Soutient la rénovation d'une salle de classe ou l'équipement d'un centre de santé partenaire.";
  };

  const currentAmount = customAmount ? parseFloat(customAmount) || 0 : selectedAmount;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-6 sm:p-12 text-white shadow-2xl relative overflow-hidden border border-slate-800">
          
          {/* Background blur */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Context & Transparency */}
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-400/20 text-amber-300 text-xs font-semibold border border-amber-400/30">
                <Receipt className="w-3.5 h-3.5" />
                <span>Transparence & Déduction Fiscale</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                Votre générosité change concrètement le destin d&apos;un enfant
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Chaque euro ou franc CFA confié à VISION HUMAINE 59 est directement mobilisé sur le terrain. Nos comptes sont tenus avec rigueur et nos actions font l&apos;objet de comptes-rendus publics vérifiables.
              </p>

              {/* Guarantees list */}
              <div className="space-y-2.5 pt-2">
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Attestation officielle de don générée immédiatement</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                  <ShieldCheck className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span>Paiements sécurisés chiffrés SSL 256 bits</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                  <Smartphone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>Paiements adaptés : Cartes, PayPal & Mobile Money (Bénin / MTN / Moov)</span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Widget */}
            <div className="lg:col-span-6">
              <div className="bg-[#FFFEFC] rounded-2xl p-6 sm:p-8 text-slate-900 shadow-xl border border-slate-100">
                
                {/* Frequency Toggle */}
                <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl mb-6">
                  <button
                    onClick={() => setDonationType('mensuel')}
                    className={`py-2.5 px-2 text-xs sm:text-sm font-bold rounded-lg transition-all whitespace-nowrap text-center ${
                      donationType === 'mensuel'
                        ? 'bg-[#292D77] text-[#FFFEFC] shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Don Mensuel
                  </button>
                  <button
                    onClick={() => setDonationType('ponctuel')}
                    className={`py-2.5 px-2 text-xs sm:text-sm font-bold rounded-lg transition-all whitespace-nowrap text-center ${
                      donationType === 'ponctuel'
                        ? 'bg-[#292D77] text-[#FFFEFC] shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Don Ponctuel
                  </button>
                </div>

                {/* Amount presets */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-4">
                  {DONATION_PRESETS.map((preset) => {
                    const isSelected = selectedAmount === preset.amount && !customAmount;
                    return (
                      <button
                        key={preset.amount}
                        onClick={() => {
                          setSelectedAmount(preset.amount);
                          setCustomAmount('');
                        }}
                        className={`py-3 px-2 rounded-xl text-center border font-extrabold text-sm transition-all ${
                          isSelected
                            ? 'border-[#292D77] bg-[#292D77]/10 text-[#292D77] ring-2 ring-[#292D77]/20'
                            : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <span className="block text-base">{preset.amount} €</span>
                        <span className="block text-[10px] text-slate-500 font-normal mt-0.5">
                          ~{preset.amountFCFA.toLocaleString('fr-FR')} FCFA
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Custom Amount Input */}
                <div className="mb-6">
                  <div className="relative">
                    <input
                      type="number"
                      placeholder="Autre montant libre (ex: 75)"
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                      }}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#292D77] focus:border-transparent"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">
                      EUR / FCFA
                    </span>
                  </div>
                </div>

                {/* Live Impact Preview Box */}
                <div className="bg-amber-50/80 border border-amber-200/70 p-4 rounded-xl mb-6">
                  <p className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-1">
                    Impact direct de votre soutien :
                  </p>
                  <p className="text-xs sm:text-sm text-amber-950 font-medium leading-relaxed">
                    {getImpactDescription(currentAmount)}
                  </p>
                </div>

                {/* Final Button */}
                <Link
                  href={`/don?amount=${currentAmount}&type=${donationType}`}
                  className="w-full flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-3.5 sm:py-4 rounded-[30px] font-extrabold text-[#FFFEFC] bg-[#D72229] hover:bg-[#AB161C] shadow-md hover:shadow-[#D72229]/25 hover:shadow-lg transition-all active:scale-[0.98] text-xs min-[380px]:text-sm sm:text-base whitespace-nowrap"
                >
                  <span className="whitespace-nowrap">Continuer mon don ({currentAmount} € / {donationType})</span>
                  <ArrowRight className="w-4 h-4 flex-shrink-0" />
                </Link>

                <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-slate-500">
                  <Lock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Plateforme sécurisée &middot; Annulable à tout moment</span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
