import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, Clock, ArrowLeft, ArrowRight, Share2, CheckCircle2 } from 'lucide-react';
import { ARTICLES_DATA } from '@/lib/data';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = ARTICLES_DATA.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="bg-slate-50 min-h-screen py-12 lg:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back link */}
        <Link
          href="/actualites"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-600 hover:text-blue-700 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour à toutes les actualités</span>
        </Link>

        {/* Header content */}
        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-slate-200 shadow-xl mb-10">
          
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mb-4">
            <span className="bg-blue-100 text-blue-800 font-bold px-3 py-1 rounded-md">
              {article.category}
            </span>
            <span className="flex items-center gap-1 font-medium">
              <Calendar className="w-3.5 h-3.5" />
              {article.date}
            </span>
            <span>&middot;</span>
            <span className="flex items-center gap-1 font-medium">
              <Clock className="w-3.5 h-3.5" />
              {article.readTime}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-6">
            {article.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 italic border-l-4 border-blue-700 pl-4 py-1 mb-8 leading-relaxed">
            {article.summary}
          </p>

          {/* Hero image */}
          <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden mb-8 bg-slate-900 shadow-md">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Body paragraphs */}
          <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-5 text-sm sm:text-base">
            {article.content.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          {/* Tags */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="text-xs text-slate-500">
              Rédigé par : <strong className="text-slate-800">{article.author}</strong>
            </div>
          </div>

        </div>

        {/* Bottom CTA Banner */}
        <div className="bg-gradient-to-r from-blue-900 to-slate-900 rounded-3xl p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h3 className="text-xl font-bold">Vous souhaitez soutenir de telles initiatives ?</h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Chaque don permet de déployer une nouvelle mission sur le terrain.
            </p>
          </div>

          <Link
            href="/don"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[30px] font-bold text-white bg-[#D72229] hover:bg-[#AB161C] transition-all text-sm flex-shrink-0 shadow-md"
          >
            <span>Faire un don</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </article>
  );
}
