'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  BookOpen, 
  Activity, 
  HeartHandshake, 
  Shield, 
  Sprout, 
  ArrowUpRight
} from 'lucide-react';

export const ActionDomains: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 bg-transparent relative overflow-hidden" id="domaines">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-8 sm:mb-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#292D77] tracking-tight leading-[1.15]">
            Des actions concrètes pour <br />
            <span className="text-[#D72229]">un meilleur avenir</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-2.5 leading-relaxed font-normal">
            Découvrez nos 5 piliers d&apos;intervention sur le terrain au Bénin pour bâtir un écosystème bienveillant et durable.
          </p>
        </div>

        {/* Asymmetric Bento Grid (7+5 on top, 4+4+4 on bottom) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-6">
          
          {/* Bento Item 1: Éducation (Large 7 cols) */}
          <Link
            href="/missions#education"
            className="group relative lg:col-span-7 min-h-[380px] sm:min-h-[420px] rounded-3xl overflow-hidden bg-slate-900 border border-slate-200/80 shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col justify-between p-6 sm:p-8"
          >
            {/* Full-bleed Photo */}
            <Image
              src="/images/missions/education-fournitures.jpg"
              alt="Éducation & Apprentissage"
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/45 to-slate-950/20"></div>

            {/* Top Bar */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs font-bold">
                <BookOpen className="w-3.5 h-3.5 text-[#FFFEFC]" />
                <span>1 450+ écoliers soutenus</span>
              </div>

              <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-[#D72229] group-hover:border-[#D72229] group-hover:rotate-45 transition-all duration-300">
                <ArrowUpRight className="w-5 h-5" />
              </div>
            </div>

            {/* Bottom Content */}
            <div className="relative z-10 space-y-3">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
                Éducation & Apprentissage
              </h3>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal max-w-xl">
                Fournitures, manuels scolaires, parrainages et rénovation de classes pour donner à chaque enfant les moyens d&apos;apprendre dans la dignité.
              </p>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-1">
                {['Kits scolaires complets', 'Parrainages individuels', 'Rénovation de classes'].map((tag, i) => (
                  <span key={i} className="text-xs font-semibold text-white/90 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full border border-white/15">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>

          {/* Bento Item 2: Santé & Hygiène (5 cols) */}
          <Link
            href="/missions#sante"
            className="group relative lg:col-span-5 min-h-[380px] sm:min-h-[420px] rounded-3xl overflow-hidden bg-slate-900 border border-slate-200/80 shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col justify-between p-6 sm:p-8"
          >
            {/* Full-bleed Photo */}
            <Image
              src="/images/missions/sante-hygiene.jpg"
              alt="Santé & Hygiène Préventive"
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/45 to-slate-950/20"></div>

            {/* Top Bar */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D72229]/80 backdrop-blur-md text-white text-xs font-bold border border-white/20">
                <Activity className="w-3.5 h-3.5 text-white" />
                <span>2 150+ soins délivrés</span>
              </div>

              <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-[#D72229] group-hover:border-[#D72229] group-hover:rotate-45 transition-all duration-300">
                <ArrowUpRight className="w-5 h-5" />
              </div>
            </div>

            {/* Bottom Content */}
            <div className="relative z-10 space-y-3">
              <h3 className="text-2xl font-extrabold text-white tracking-tight leading-snug">
                Santé & Hygiène Préventive
              </h3>
              <p className="text-sm text-slate-200 leading-relaxed font-normal">
                Consultations pédiatriques foraines gratuites, dépistages, prévention du paludisme et distribution de kits sanitaires.
              </p>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-1">
                {['Consultations foraines', 'Kits sanitaires', 'Dépistages pédiatriques'].map((tag, i) => (
                  <span key={i} className="text-xs font-semibold text-white/90 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full border border-white/15">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>

          {/* Bento Item 3: Urgence Humanitaire (4 cols) */}
          <Link
            href="/missions#humanitaire"
            className="group relative md:col-span-1 lg:col-span-4 min-h-[320px] rounded-3xl overflow-hidden bg-slate-900 border border-slate-200/80 shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col justify-between p-6"
          >
            <Image
              src="/images/missions/humanitaire-vivres.jpg"
              alt="Urgence Humanitaire & Vivres"
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/45 to-slate-950/20"></div>

            <div className="relative z-10 flex items-center justify-between">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs font-bold">
                <HeartHandshake className="w-3.5 h-3.5 text-amber-300" />
                <span>32 Tonnes distribuées</span>
              </div>

              <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-[#D72229] group-hover:border-[#D72229] group-hover:rotate-45 transition-all duration-300">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>

            <div className="relative z-10 space-y-2">
              <h3 className="text-xl font-extrabold text-white tracking-tight">
                Urgence Humanitaire & Vivres
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                Collecte et acheminement transparent de colis alimentaires et vêtements d&apos;urgence.
              </p>
            </div>
          </Link>

          {/* Bento Item 4: Protection de l'Enfance (4 cols) */}
          <Link
            href="/missions#protection"
            className="group relative md:col-span-1 lg:col-span-4 min-h-[320px] rounded-3xl overflow-hidden bg-slate-900 border border-slate-200/80 shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col justify-between p-6"
          >
            <Image
              src="/images/missions/protection-orphelinats.jpg"
              alt="Protection de l'Enfance & Orphelinats"
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/45 to-slate-950/20"></div>

            <div className="relative z-10 flex items-center justify-between">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs font-bold">
                <Shield className="w-3.5 h-3.5 text-emerald-300" />
                <span>11 orphelinats partenaires</span>
              </div>

              <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-[#D72229] group-hover:border-[#D72229] group-hover:rotate-45 transition-all duration-300">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>

            <div className="relative z-10 space-y-2">
              <h3 className="text-xl font-extrabold text-white tracking-tight">
                Protection de l&apos;Enfance
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                Accompagnement continu des centres d&apos;accueil et défense active des droits des mineurs.
              </p>
            </div>
          </Link>

          {/* Bento Item 5: Développement Local & Autonomie (4 cols) */}
          <Link
            href="/missions#autonomie"
            className="group relative md:col-span-2 lg:col-span-4 min-h-[320px] rounded-3xl overflow-hidden bg-slate-900 border border-slate-200/80 shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col justify-between p-6"
          >
            <Image
              src="/images/missions/autonomie-communaute.jpg"
              alt="Développement Local & Autonomie"
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/45 to-slate-950/20"></div>

            <div className="relative z-10 flex items-center justify-between">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs font-bold">
                <Sprout className="w-3.5 h-3.5 text-teal-300" />
                <span>15 coopératives soutenues</span>
              </div>

              <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-[#D72229] group-hover:border-[#D72229] group-hover:rotate-45 transition-all duration-300">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>

            <div className="relative z-10 space-y-2">
              <h3 className="text-xl font-extrabold text-white tracking-tight">
                Développement & Autonomie
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                Formation des mères de famille, potagers communautaires et solutions économiques durables.
              </p>
            </div>
          </Link>

        </div>

      </div>
    </section>
  );
};
