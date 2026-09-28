'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  GraduationCap, 
  Package, 
  Stethoscope, 
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  Calculator
} from 'lucide-react';
import { NGO_INFO } from '@/lib/data';

const STATS_ITEMS = [
  {
    icon: GraduationCap,
    value: "3 850+",
    label: "Enfants scolarisés & accompagnés",
    subtext: "Fournitures, bourses & parrainages",
    color: "from-blue-600 to-indigo-700",
    lightColor: "text-blue-700 bg-blue-50 border-blue-100",
  },
  {
    icon: Package,
    value: "12 400+",
    label: "Kits scolaires & d'hygiène",
    subtext: "Distribués dans les écoles et villages",
    color: "from-amber-500 to-orange-600",
    lightColor: "text-amber-700 bg-amber-50 border-amber-100",
  },
  {
    icon: Stethoscope,
    value: "2 150+",
    label: "Consultations médicales foraines",
    subtext: "Soins pédiatriques & dépistages gratuits",
    color: "from-rose-600 to-red-700",
    lightColor: "text-rose-700 bg-rose-50 border-rose-100",
  },
  {
    icon: TrendingUp,
    value: "91%",
    label: "Fonds alloués directement au terrain",
    subtext: "Traçabilité et rigueur financière certifiées",
    color: "from-emerald-600 to-teal-700",
    lightColor: "text-emerald-700 bg-emerald-50 border-emerald-100",
  },
];

const IMPACT_LEVELS = [
  {
    amount: 20,
    title: "1 Kit Scolaire & Goûters",
    desc: "Assure le cartable complet, les cahiers et les collations d'un élève pendant 1 mois.",
  },
  {
    amount: 50,
    title: "Soins Médicaux de 5 Enfants",
    desc: "Finance les consultations, le déparasitage et les vaccins essentiels pour 5 enfants.",
  },
  {
    amount: 100,
    title: "Nutrition Complète en Orphelinat",
    desc: "Garantit un mois de repas équilibrés, lait infantile et suivi de croissance d'un pensionnaire.",
  },
  {
    amount: 250,
    title: "Équipement d'une Classe",
    desc: "Rénovation de pupitres, dotation en manuels scolaires et coin lecture pour 40 élèves.",
  },
];

export const ImpactStats: React.FC = () => {
  const [selectedImpact, setSelectedImpact] = useState(50);

  const currentImpact = IMPACT_LEVELS.find(i => i.amount === selectedImpact) || IMPACT_LEVELS[1];

  return (
    <section className="py-12 sm:py-16 bg-[#0F1A30] text-white relative overflow-hidden" id="impact">
      
      {/* Background glowing blurred circles */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#292D77]/25 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#D72229]/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15] text-white">
            Des chiffres qui racontent <br />
            des <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-emerald-400">vies transformées</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 mt-3 leading-relaxed font-normal max-w-2xl mx-auto">
            Chaque contribution confiée à VISION HUMAINE 59 est convertie en actions tangibles, mesurables et pérennes.
          </p>
        </div>

        {/* 4 Stats High-Tech Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS_ITEMS.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="group p-8 rounded-3xl bg-slate-900/80 backdrop-blur-md border border-slate-800 hover:border-slate-700 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} text-white flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  
                  <div className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-2">
                    {stat.value}
                  </div>
                  
                  <p className="text-sm font-bold text-slate-200 leading-snug">
                    {stat.label}
                  </p>
                </div>
                
                <p className="text-xs text-slate-400 mt-4 pt-4 border-t border-slate-800/80 leading-relaxed">
                  {stat.subtext}
                </p>
              </div>
            );
          })}
        </div>

        {/* Interactive Impact Simulator Bar */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 border border-slate-700 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-extrabold uppercase tracking-widest">
                <Calculator className="w-4 h-4" />
                <span>Simulateur d&apos;Impact Direct</span>
              </div>
              <h3 className="text-2xl font-extrabold text-white">
                Choisissez un montant et découvrez son effet réel
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Visualisez immédiatement ce que votre générosité permet de réaliser sur le terrain au Bénin.
              </p>
            </div>

            <div className="lg:col-span-7 space-y-5">
              {/* Amount buttons */}
              <div className="grid grid-cols-4 gap-2.5">
                {[20, 50, 100, 250].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setSelectedImpact(amt)}
                    className={`py-3 px-2 rounded-2xl text-center font-extrabold text-sm transition-all ${
                      selectedImpact === amt
                        ? 'bg-amber-400 text-slate-950 shadow-lg scale-105'
                        : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 border border-slate-700'
                    }`}
                  >
                    {amt} €
                  </button>
                ))}
              </div>

              {/* Dynamic result card */}
              <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-base font-extrabold text-amber-300">
                    {currentImpact.title}
                  </h4>
                  <p className="text-xs text-slate-200 mt-1 leading-relaxed max-w-md">
                    {currentImpact.desc}
                  </p>
                </div>

                <Link
                  href={`/don?amount=${selectedImpact}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[30px] font-bold text-xs bg-[#D72229] hover:bg-[#AB161C] text-[#FFFEFC] transition-colors flex-shrink-0 shadow-sm"
                >
                  <span>Donner {selectedImpact} €</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
