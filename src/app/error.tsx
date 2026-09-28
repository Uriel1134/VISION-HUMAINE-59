'use client';

import React from 'react';
import Link from 'next/link';
import { AlertCircle, RotateCcw } from 'lucide-react';

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-white px-4">
      <div className="text-center max-w-md mx-auto space-y-5">
        <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900">
          Une erreur est survenue
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Nous mettons tout en œuvre pour rétablir la situation dans les plus brefs délais.
        </p>
        <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-white bg-blue-700 hover:bg-blue-800 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Réessayer</span>
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all"
          >
            <span>Retour à l&apos;accueil</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
