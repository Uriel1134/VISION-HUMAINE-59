import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ArrowRight, BookOpen, MapPin } from 'lucide-react';
import { ARTICLES_DATA } from '@/lib/data';

export const metadata = {
  title: 'Actualités & Rapports de Missions au Bénin | VISION HUMAINE 59',
  description: 'Suivez les éditions de partage à Dassa-Zoumè (Collines), la visite à l\'orphelinat Saint Dominique d\'Azowlissè et nos actions de terrain.',
};

export default function ActualitesPage() {
  return (
    <div className="bg-[#FFFEFC] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#292D77] tracking-tight leading-[1.12]">
            Actualités & <br />
            <span className="text-[#D72229]">Rapports de Terrain</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed font-normal max-w-2xl mx-auto">
            Revivez en images et en récits authentiques nos éditions de partage à Dassa-Zoumè, nos visites d&apos;orphelinats et nos distributions solidaires.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ARTICLES_DATA.map((article) => (
            <article
              key={article.id}
              className="flex flex-col bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-lg hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 group"
            >
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-900">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <span className="px-3.5 py-1.5 rounded-full text-xs font-bold text-white bg-[#D72229] shadow-md">
                    {article.category}
                  </span>
                </div>
              </div>

              <div className="p-7 sm:p-8 flex-1 flex flex-col justify-between space-y-5">
                <div>
                  <div className="flex items-center gap-3 text-xs text-slate-400 font-medium mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {article.date}
                    </span>
                    <span>&middot;</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {article.readTime}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#292D77] leading-snug group-hover:text-[#D72229] transition-colors mb-3">
                    {article.title}
                  </h2>

                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    {article.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500">{article.author}</span>
                  <Link
                    href={`/actualites/${article.slug}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[30px] text-xs font-bold text-[#292D77] hover:bg-[#292D77]/10 transition-colors"
                  >
                    <span>Lire le compte-rendu</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </div>
  );
}
