import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ArrowRight, BookOpen, Sparkles } from 'lucide-react';
import { ARTICLES_DATA } from '@/lib/data';

export const FieldReportsPreview: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 bg-transparent border-t border-slate-200/60" id="actualites">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Title and Link */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#292D77] tracking-tight leading-[1.15]">
              Dernières nouvelles du terrain
            </h2>
            <p className="text-base sm:text-lg text-slate-600 mt-2 leading-relaxed max-w-xl font-normal">
              Suivez l&apos;avancée de nos programmes et découvrez en direct l&apos;impact de chaque mission menée au Bénin.
            </p>
          </div>

          <Link
            href="/actualites"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-[30px] font-bold text-sm text-[#292D77] bg-white hover:bg-[#292D77]/10 border border-[#292D77] shadow-sm hover:shadow transition-all self-start md:self-auto"
          >
            <span>Voir tous les rapports</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 3 Magazine-style Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ARTICLES_DATA.map((article) => (
            <article
              key={article.id}
              className="flex flex-col bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-subtle hover:shadow-card-hover hover:-translate-y-2 transition-all duration-300 group"
            >
              {/* Photo Box */}
              <div className="relative h-56 w-full overflow-hidden bg-slate-900">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"></div>
                
                {/* Category Pill */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold text-[#FFFEFC] bg-[#292D77] shadow-md">
                    {article.category}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-7 flex-1 flex flex-col justify-between space-y-4">
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

                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-snug group-hover:text-[#292D77] transition-colors mb-3">
                    {article.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 font-normal">
                    {article.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">
                    {article.author}
                  </span>
                  <Link
                    href={`/actualites/${article.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-extrabold text-[#292D77] group-hover:text-[#1B1E54]"
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
    </section>
  );
};
