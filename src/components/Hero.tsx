import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#FFFEFC] min-h-[340px] sm:min-h-[440px] lg:min-h-[540px] flex items-center border-b border-slate-100">
      
      {/* 1. Full-Width Authentic Background Photo (Active on Mobile & Desktop) */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src="/images/missions/hero-banner.jpg"
          alt="Mission humanitaire et partage VISION HUMAINE 59 au Bénin"
          fill
          priority
          className="object-cover object-[65%_35%] lg:object-[right_38%]"
        />
        
        {/* 2. Linear Gradient Overlay on Desktop (Smooth left-to-right fade) */}
        <div 
          className="absolute inset-0 pointer-events-none hidden lg:block"
          style={{
            background: 'linear-gradient(to right, #FFFEFC 0%, #FFFEFC 38%, rgba(255, 254, 252, 0.96) 50%, rgba(255, 254, 252, 0.72) 65%, rgba(255, 254, 252, 0.15) 85%, transparent 100%)'
          }}
        />

        {/* 3. Linear Gradient Overlay on Mobile & Tablet */}
        <div 
          className="absolute inset-0 pointer-events-none lg:hidden"
          style={{
            background: 'linear-gradient(175deg, rgba(255, 254, 252, 0.97) 0%, rgba(255, 254, 252, 0.92) 40%, rgba(255, 254, 252, 0.75) 70%, rgba(255, 254, 252, 0.35) 100%)'
          }}
        />
      </div>

      {/* Main Hero Text Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8 lg:py-12 z-10 w-full">
        <div className="max-w-xl lg:max-w-2xl space-y-2.5 sm:space-y-4">
          
          {/* Main Headline */}
          <h1 className="text-[22px] sm:text-4xl lg:text-[50px] font-black text-slate-900 tracking-tight leading-[1.14]">
            Ensemble, semons <br />
            l&apos;espoir et cultivons <br />
            <span className="text-[#D72229]">l&apos;avenir.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xs sm:text-base lg:text-lg text-slate-700 leading-relaxed font-normal max-w-xl">
            VISION HUMAINE 59 soutient les enfants vulnérables en Afrique à travers l&apos;éducation, la santé pédiatrique, l&apos;accès à l&apos;eau potable et la protection des orphelinats.
          </p>

          {/* Action CTA Buttons (1 Single Line) */}
          <div className="flex flex-row items-center gap-2 sm:gap-3.5 pt-0.5 sm:pt-1 w-full max-w-lg">
            <Link
              href="/don"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 sm:px-7 py-2.5 sm:py-3.5 rounded-[30px] font-bold text-xs sm:text-sm text-[#FFFEFC] bg-[#D72229] hover:bg-[#AB161C] shadow-md hover:shadow-lg shadow-[#D72229]/25 active:scale-[0.98] transition-all duration-300 text-center whitespace-nowrap"
            >
              <span>Faire un don</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </Link>

            <Link
              href="/missions"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3 sm:px-6 py-2.5 sm:py-3.5 rounded-[30px] font-bold text-xs sm:text-sm text-[#292D77] bg-white/95 backdrop-blur-md hover:bg-white border border-slate-300 hover:border-[#292D77] shadow-xs hover:shadow active:scale-[0.98] transition-all duration-300 text-center whitespace-nowrap"
            >
              <span>Découvrir nos actions</span>
            </Link>
          </div>

          {/* Trust Capsules (1 Single Line) */}
          <div className="pt-1 sm:pt-2 flex flex-row items-center justify-between sm:justify-start gap-1 sm:gap-2 text-slate-800 w-full max-w-lg">
            <div className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-xs text-[9px] sm:text-xs font-bold whitespace-nowrap">
              <CheckCircle2 className="w-3 h-3 text-[#292D77] flex-shrink-0" />
              <span>91% terrain</span>
            </div>

            <div className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-xs text-[9px] sm:text-xs font-bold whitespace-nowrap">
              <ShieldCheck className="w-3 h-3 text-[#292D77] flex-shrink-0" />
              <span>100% sécurisé</span>
            </div>

            <div className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-xs text-[9px] sm:text-xs font-bold whitespace-nowrap">
              <Sparkles className="w-3 h-3 text-[#D72229] flex-shrink-0" />
              <span>Impact certifié</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};


