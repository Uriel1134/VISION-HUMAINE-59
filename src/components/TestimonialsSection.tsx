import React from 'react';
import Image from 'next/image';
import { Quote, CheckCircle2, ShieldCheck } from 'lucide-react';

const TESTIMONIALS = [
  {
    id: "t1",
    quote: "Grâce à l'appui constant de VISION HUMAINE 59, notre orphelinat a pu sécuriser l'approvisionnement en kits d'hygiène, rénover l'espace de vie et scolariser l'ensemble de nos 45 pensionnaires cette année.",
    author: "Sœur Geneviève A.",
    role: "Directrice d'Orphelinat Partenaire",
    location: "Azowlissè, Bénin",
    avatar: "/images/missions/azowlisse-orphelinat.jpg",
    verifiedTag: "Partenaire de Terrain",
  },
  {
    id: "t2",
    quote: "La transparence financière absolue et les photos directes des distributions à Dassa-Zoumè m'ont immédiatement rassuré. Savoir que 91% des fonds vont au terrain est essentiel.",
    author: "Marc-Antoine D.",
    role: "Parrain Donateur Régulier",
    location: "France",
    avatar: "/images/missions/dassa-1-enfants.jpg",
    verifiedTag: "Donateur Vérifié",
  },
  {
    id: "t3",
    quote: "Les campagnes médicales et les ateliers organisés dans les villages permettent de diagnostiquer et soigner à temps des cas sévères auprès des enfants. Un travail indispensable.",
    author: "Dr. Kossi M.",
    role: "Médecin Bénévole",
    location: "Bénin",
    avatar: "/images/missions/sensibilisation-ateliers.jpg",
    verifiedTag: "Corps Médical Bénévole",
  },
];

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 bg-transparent relative overflow-hidden" id="temoignages">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#292D77] tracking-tight leading-[1.15]">
            Ils témoignent de <br />
            notre <span className="text-[#D72229]">impact sur le terrain</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-3 leading-relaxed font-normal max-w-2xl mx-auto">
            Découvrez les retours authentiques de ceux qui agissent à nos côtés sur le terrain et des donateurs qui soutiennent notre mission.
          </p>
        </div>

        {/* 3 Rich Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between p-8 rounded-3xl bg-slate-50/60 border border-slate-200/90 shadow-subtle hover:shadow-card-hover hover:bg-white hover:-translate-y-1.5 transition-all duration-300 relative group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100 text-blue-600">
                    <Quote className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-600 bg-white px-3 py-1 rounded-full border border-slate-200">
                    {item.verifiedTag}
                  </span>
                </div>

                <p className="text-sm sm:text-base text-slate-700 italic leading-relaxed mb-6 font-normal">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              {/* Author Info with Authentic Photo */}
              <div className="pt-6 border-t border-slate-200/70 flex items-center gap-3.5">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md flex-shrink-0 bg-slate-200">
                  <Image
                    src={item.avatar}
                    alt={item.author}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900 leading-tight">
                    {item.author}
                  </h4>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    {item.role}
                  </p>
                  <p className="text-[11px] text-blue-700 font-semibold">
                    {item.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
