'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { GraduationCap, ArrowRight, Stethoscope, Utensils } from 'lucide-react';

export const SponsorshipSpotlight: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 bg-[#FFFEFC] border-y border-slate-100 relative overflow-hidden" id="parrainage-spotlight">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10 sm:space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#292D77] tracking-tight leading-[1.15]">
            Parrainer un enfant, c&apos;est <br />
            lui ouvrir <span className="text-[#D72229]">les portes de l&apos;école</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-3 leading-relaxed max-w-2xl mx-auto font-normal">
            Avec 30 € par mois (soit 1 € par jour ou 19 500 FCFA), vous changez durablement la trajectoire de vie d&apos;un enfant orphelin ou en situation de grande précarité.
          </p>
        </div>

        {/* Dynamic Dual-Card Showcase: Story on Left, Action Plan on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Inspiring Real Human Photo */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-[4/3] bg-slate-900 border border-slate-200/80 group">
              <Image
                src="/images/missions/parrainage-enfant.jpg"
                alt="Enfants soutenus par VISION HUMAINE 59"
                fill
                className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>

              {/* Bottom Quote */}
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <p className="text-base font-bold text-white leading-snug">
                  « Grâce à mon parrain, j&apos;ai mes cahiers, mes uniformes et je peux aller à l&apos;école chaque jour. »
                </p>
                <p className="text-xs text-slate-300 mt-1">
                  Suivi personnalisé et correspondance semestrielle garantie
                </p>
              </div>
            </div>
          </div>

          {/* Right: Interactive 3-Pillars Commitment Box */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6 bg-white p-4 sm:p-7 lg:p-9 rounded-3xl border border-slate-200 shadow-xl">
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#292D77] tracking-tight">
              Ce que comprend votre parrainage :
            </h3>

            <div className="space-y-3">
              
              {/* Card 1: Scolarité */}
              <div className="group flex items-start gap-3.5 p-3.5 sm:p-4 rounded-2xl bg-white hover:bg-blue-50/40 border border-slate-200/90 hover:border-[#292D77]/40 shadow-xs hover:shadow-md transition-all duration-200">
                <div className="w-10 h-10 rounded-xl bg-[#292D77]/10 text-[#292D77] flex items-center justify-center flex-shrink-0 border border-[#292D77]/20 group-hover:scale-105 transition-transform">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 group-hover:text-[#292D77] transition-colors">
                    Scolarité, Fournitures & Uniformes
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    Paiement des droits d&apos;inscription, sac d&apos;école, cahiers, trousse et manuels conformes.
                  </p>
                </div>
              </div>

              {/* Card 2: Santé */}
              <div className="group flex items-start gap-3.5 p-3.5 sm:p-4 rounded-2xl bg-white hover:bg-emerald-50/40 border border-slate-200/90 hover:border-emerald-500/40 shadow-xs hover:shadow-md transition-all duration-200">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0 border border-emerald-200 group-hover:scale-105 transition-transform">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 group-hover:text-emerald-800 transition-colors">
                    Santé, Dépistages & Soins Primaires
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    Bilans pédiatriques réguliers, traitements antiparasitaires et kits sanitaires.
                  </p>
                </div>
              </div>

              {/* Card 3: Nutrition */}
              <div className="group flex items-start gap-3.5 p-3.5 sm:p-4 rounded-2xl bg-white hover:bg-amber-50/40 border border-slate-200/90 hover:border-amber-500/40 shadow-xs hover:shadow-md transition-all duration-200">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center flex-shrink-0 border border-amber-200 group-hover:scale-105 transition-transform">
                  <Utensils className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 group-hover:text-amber-800 transition-colors">
                    Nutrition & Cadre de Vie Digne
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    Repas équilibrés et soutien matériel au centre d&apos;accueil ou à la famille tutélaire.
                  </p>
                </div>
              </div>

            </div>

            <div className="pt-2">
              <Link
                href="/parrainage"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 sm:px-8 py-3.5 sm:py-4 rounded-[30px] font-extrabold text-xs sm:text-sm text-[#FFFEFC] bg-[#D72229] hover:bg-[#AB161C] shadow-md hover:shadow-lg shadow-[#D72229]/25 active:scale-[0.98] transition-all duration-200 text-center whitespace-nowrap"
              >
                <span className="whitespace-nowrap">Parrainer un enfant dès 30 € / mois</span>
                <ArrowRight className="w-4 h-4 flex-shrink-0" />
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
