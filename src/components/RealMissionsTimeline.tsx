'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, ArrowRight, ArrowUpRight } from 'lucide-react';

const FEATURED_MISSION = {
  id: "m-dassa-1",
  title: "1ère Édition de Partage à Dassa-Zoumè",
  location: "Dassa-Zoumè, Bénin",
  edition: "Grande Mission Initiale",
  image: "/images/missions/dassa-edition-1.jpg",
  description: "Opération humanitaire d'envergure ayant permis la distribution directe de vivres, kits scolaires complets et vêtements d'urgence auprès de centaines d'enfants et de familles des Collines.",
  tags: ["Distribution de vivres", "Kits scolaires", "Aide d'urgence direct"]
};

const SECONDARY_MISSIONS = [
  {
    id: "m-azowlisse",
    title: "Soutien à l'Orphelinat Saint Dominique",
    location: "Azowlissè, Bénin",
    edition: "Soutien Orphelinat",
    image: "/images/missions/orphelinat-saint-dominique-azowlisse.jpg",
    description: "Dotation complète en denrées nutritives, produits d'hygiène et ateliers éducatifs.",
    tag: "Orphelinat & Enfance"
  },
  {
    id: "m-dassa-2",
    title: "2ème Édition de Partage dans les Collines",
    location: "Département des Collines, Bénin",
    edition: "Continuité & Pérennité",
    image: "/images/missions/dassa-edition-2.jpg",
    description: "Extension des distributions scolaires et accompagnement des mères de famille vers l'autonomie.",
    tag: "Autonomie & Rentrée"
  },
  {
    id: "m-suivi",
    title: "Suivi Permanent & Ateliers de Prévention",
    location: "Régions Partenaires, Bénin",
    edition: "Action Continue",
    image: "/images/missions/distribution-fournitures-terrain.jpg",
    description: "Sensibilisation sanitaire, distribution de fournitures et accompagnement tutélaire sur place.",
    tag: "Santé & Éducation"
  }
];

export const RealMissionsTimeline: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 bg-[#FFFEFC] relative overflow-hidden" id="realisations-terrain">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#292D77] tracking-tight leading-[1.15]">
            Nos missions de partage <br />
            <span className="text-[#D72229]">sur le terrain au Bénin</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-3 leading-relaxed font-normal">
            Découvrez en images nos actions concrètes menées directement auprès des orphelinats, écoles et communautés locales.
          </p>
        </div>

        {/* Immersive Bento Gallery (Large Featured + 3 Stacked Tiles) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* 1. Large Featured Bento Card (7 cols) */}
          <div className="lg:col-span-7 group relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-200/90 shadow-xl hover:shadow-2xl transition-all duration-500 min-h-[460px] sm:min-h-[520px] flex flex-col justify-between p-6 sm:p-10">
            <Image
              src={FEATURED_MISSION.image}
              alt={FEATURED_MISSION.title}
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/45 to-slate-950/20"></div>

            {/* Top Bar */}
            <div className="relative z-10 flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-[30px] bg-white/95 backdrop-blur-md text-[#292D77] text-xs font-bold shadow-sm">
                <MapPin className="w-3.5 h-3.5 text-[#D72229]" />
                <span>{FEATURED_MISSION.location}</span>
              </span>

              <span className="px-3.5 py-1.5 rounded-[30px] bg-[#D72229] text-white text-xs font-bold shadow-md">
                {FEATURED_MISSION.edition}
              </span>
            </div>

            {/* Bottom Content */}
            <div className="relative z-10 space-y-4">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-snug">
                {FEATURED_MISSION.title}
              </h3>

              <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal max-w-xl">
                {FEATURED_MISSION.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-1">
                {FEATURED_MISSION.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-semibold text-white/90 bg-black/40 backdrop-blur-sm px-3.5 py-1 rounded-[30px] border border-white/15"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <Link
                  href="/missions"
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-[30px] font-bold text-sm text-[#292D77] bg-white hover:bg-slate-100 shadow-md transition-all active:scale-[0.98]"
                >
                  <span>Voir le rapport de mission</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* 2. Three Stacked Secondary Tiles (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-5 justify-between">
            {SECONDARY_MISSIONS.map((mission) => (
              <Link
                key={mission.id}
                href="/missions"
                className="group relative flex-1 min-h-[160px] rounded-3xl overflow-hidden bg-slate-900 border border-slate-200/90 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between p-5 sm:p-6"
              >
                <Image
                  src={mission.image}
                  alt={mission.title}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/50 to-slate-950/25"></div>

                {/* Top Location & Arrow */}
                <div className="relative z-10 flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[30px] bg-white/90 backdrop-blur-md text-[#292D77] text-xs font-bold">
                    <MapPin className="w-3 h-3 text-[#D72229]" />
                    <span>{mission.location}</span>
                  </span>

                  <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-[#D72229] group-hover:border-[#D72229] group-hover:rotate-45 transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Bottom Title & Description */}
                <div className="relative z-10 space-y-1">
                  <h4 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug">
                    {mission.title}
                  </h4>
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed font-normal">
                    {mission.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>

        </div>

        {/* Global Mission CTA Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#14172B] via-[#292D77] to-[#14172B] text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-700/60">
          <div className="space-y-1">
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#FFFEFC]">
              Vous souhaitez nous accompagner sur la prochaine mission ?
            </h3>
            <p className="text-sm text-slate-200 font-normal">
              Rejoignez nos volontaires sur le terrain au Bénin ou participez à distance.
            </p>
          </div>

          <Link
            href="/agir"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[30px] font-bold text-sm bg-[#D72229] hover:bg-[#AB161C] text-white transition-all flex-shrink-0 shadow-md active:scale-[0.98]"
          >
            <span>Devenir Bénévole</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
};
