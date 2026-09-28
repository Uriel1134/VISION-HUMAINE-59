import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[#FFFEFC] px-4">
      <div className="text-center max-w-md mx-auto space-y-5">
        <span className="text-xs font-extrabold uppercase tracking-wider text-[#292D77] bg-[#292D77]/10 px-3.5 py-1.5 rounded-full">
          Erreur 404
        </span>
        <h1 className="text-4xl font-extrabold text-[#292D77]">
          Page Introuvable
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed font-normal">
          La page que vous recherchez n&apos;existe pas ou a été déplacée.
        </p>
        <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-[30px] font-bold text-sm text-white bg-[#292D77] hover:bg-[#1f225a] transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour à l&apos;accueil</span>
          </Link>
          <Link
            href="/don"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-[30px] font-bold text-sm text-white bg-[#D72229] hover:bg-[#AB161C] transition-all"
          >
            <span>Faire un don</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
