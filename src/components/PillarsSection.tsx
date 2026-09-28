'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  GraduationCap, 
  Stethoscope, 
  HeartHandshake, 
  ShieldCheck, 
  Globe, 
  ArrowRight, 
  CheckCircle2 
} from 'lucide-react';
import { PILLARS_DATA } from '@/lib/data';

export const PillarsSection: React.FC = () => {
  const [activePillarId, setActivePillarId] = useState<string>(PILLARS_DATA[0].id);

  const activePillar = PILLARS_DATA.find((p) => p.id === activePillarId) || PILLARS_DATA[0];

  const getIcon = (id: string, className: string = "w-5 h-5") => {
    switch (id) {
      case 'education':
        return <GraduationCap className={className} />;
      case 'sante':
        return <Stethoscope className={className} />;
      case 'humanitaire':
        return <HeartHandshake className={className} />;
      case 'protection':
        return <ShieldCheck className={className} />;
      case 'autonomie':
        return <Globe className={className} />;
      default:
        return <HeartHandshake className={className} />;
    }
  };

  return (
    <section className="py-20 bg-[#FFFEFC] border-y border-slate-100" id="missions">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-[#292D77] bg-[#292D77]/10 px-3.5 py-1.5 rounded-full border border-[#292D77]/20">
            Nos 5 Piliers d&apos;Intervention
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-4">
            Une approche globale pour transformer des vies
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto mt-3">
            Découvrez nos 5 axes fondamentaux conçus pour répondre aux besoins d&apos;urgence tout en garantissant un développement autonome et durable.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10">
          {PILLARS_DATA.map((pillar) => {
            const isActive = pillar.id === activePillarId;
            return (
              <button
                key={pillar.id}
                onClick={() => setActivePillarId(pillar.id)}
                className={`flex items-center gap-2.5 px-4 sm:px-5 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 ${
                  isActive
                    ? 'bg-[#292D77] text-[#FFFEFC] shadow-md shadow-[#292D77]/20 scale-[1.02]'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {getIcon(pillar.id, isActive ? "text-[#FFFEFC] w-4 h-4" : "text-[#292D77] w-4 h-4")}
                <span>{pillar.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Pillar Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left Column: Details & Actions */}
            <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#D72229] bg-[#D72229]/10 border border-[#D72229]/20 px-3 py-1.5 rounded-lg w-fit mb-4">
                  <span>{activePillar.badge}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
                  {activePillar.title}
                </h3>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
                  {activePillar.description}
                </p>

                {/* Concrete Actions List */}
                <div className="space-y-3 mb-8">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                    Actions concrètes menées sur le terrain :
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activePillar.actions.map((act, index) => (
                      <div key={index} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-[#292D77] flex-shrink-0 mt-0.5" />
                        <span>{act}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Metrics and CTA */}
              <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div className="flex items-center gap-6">
                  {activePillar.impactStats.map((item, idx) => (
                    <div key={idx}>
                      <span className="block text-xl font-extrabold text-[#292D77]">
                        {item.value}
                      </span>
                      <span className="text-[11px] text-slate-500 font-medium">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>

                <Link
                  href={`/missions#${activePillar.id}`}
                  className="inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-[#292D77] hover:text-[#1B1E54] bg-[#292D77]/10 hover:bg-[#292D77]/20 px-4 py-2.5 rounded-xl transition-colors"
                >
                  <span>Explorer ce domaine</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

            </div>

            {/* Right Column: Visual Photo */}
            <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full bg-slate-800">
              <Image
                src={activePillar.image}
                alt={activePillar.title}
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-6 text-white text-xs">
                <p className="font-semibold">{activePillar.title}</p>
                <p className="text-slate-300 text-[11px]">{activePillar.shortDescription}</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
