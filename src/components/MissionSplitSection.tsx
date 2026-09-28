import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2, ShieldCheck, Users, Sparkles, Target } from 'lucide-react';

export const MissionSplitSection: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 bg-[#FFFEFC] relative overflow-hidden" id="notre-mission">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-stretch">
          
          {/* Left Column: Authentic Clean Photo matching height with right column */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200/80 bg-slate-900 group w-full h-full min-h-[420px] flex-1">
              <Image
                src="/images/missions/dassa-1-distribution.jpg"
                alt="Équipe VISION HUMAINE 59 en mission de partage au Bénin"
                fill
                className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/15 to-transparent"></div>
              
              {/* Clean quote at the bottom of the photo */}
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <p className="text-sm sm:text-base font-semibold text-white/95 leading-snug">
                  « Ensemble, semons l&apos;espoir et cultivons l&apos;avenir. »
                </p>
                <p className="text-xs text-white/70 mt-1 font-normal">
                  Distribution directe aux enfants et familles partenaires au Bénin
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Mission Text & Key Principles */}
          <div className="lg:col-span-6 flex flex-col justify-between py-1 space-y-6">
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#292D77] tracking-tight leading-[1.15]">
              Agir aujourd&apos;hui pour <br />
              <span className="text-[#D72229]">des lendemains meilleurs</span>
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Notre mission est de soutenir les enfants vulnérables en Afrique en leur donnant accès à l&apos;éducation, aux soins, à la protection et aux opportunités de développement. Nous croyons en la force de la solidarité et en l&apos;impact durable de chaque geste.
            </p>

            {/* Clean Value Points */}
            <div className="space-y-4 pt-1">
              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-[#292D77]/10 text-[#292D77] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900">Écouter et Agir au plus près du terrain</h4>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                    Collaboration directe avec les orphelinats, écoles et dispensaires locaux au Bénin, sans intermédiaire superflu.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-[#D72229]/10 text-[#D72229] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900">Solutions Durables & Autonomie</h4>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                    Nous refusons l&apos;assistanat passif : nous formons, équipons et accompagnons pour rendre les communautés autonomes.
                  </p>
                </div>
              </div>
            </div>

            {/* Clean CTA */}
            <div className="pt-2">
              <Link
                href="/a-propos"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-[30px] font-bold text-xs sm:text-sm text-white bg-[#292D77] hover:bg-[#1f225a] shadow-md hover:shadow-lg transition-all active:scale-[0.98] whitespace-nowrap text-center"
              >
                <span className="whitespace-nowrap">En savoir plus sur notre mission</span>
                <ArrowRight className="w-4 h-4 flex-shrink-0" />
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
