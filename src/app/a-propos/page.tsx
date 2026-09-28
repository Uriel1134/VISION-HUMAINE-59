import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Target, 
  Users, 
  Award, 
  CheckCircle2, 
  Globe, 
  Building2, 
  ArrowRight,
  BookOpen,
  Activity,
  HeartHandshake,
  Shield,
  Sprout
} from 'lucide-react';
import { NGO_INFO } from '@/lib/data';

export const metadata = {
  title: 'À Propos & Vision de l\'ONG | VISION HUMAINE 59',
  description: 'Découvrez l\'histoire, la vision du promoteur, les missions et les engagements de transparence de VISION HUMAINE 59 au Bénin.',
};

export default function AProposPage() {
  return (
    <div className="bg-[#FFFEFC] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* 1. Header Section */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#292D77] tracking-tight leading-[1.12]">
            Notre engagement pour <br />
            <span className="text-[#D72229]">l&apos;enfance et la dignité</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed font-normal">
            VISION HUMAINE 59 est une organisation humanitaire animée par la conviction profonde que chaque enfant mérite un avenir digne, protégé et instruit.
          </p>
        </div>

        {/* 2. Editorial Story & Founder Vision (Modern Split Layout with Real Photo) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          
          {/* Left: Authentic Field Photo */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200/80 bg-slate-900 group w-full h-full min-h-[420px] flex-1">
              <Image
                src="/images/missions/dassa-1-enfants.jpg"
                alt="Enfants et bénévoles de VISION HUMAINE 59 au Bénin"
                fill
                className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <p className="text-base font-bold text-white leading-snug">
                  « Donner à chaque enfant les moyens de grandir dignement. »
                </p>
                <p className="text-xs text-slate-300 font-normal">
                  Actions directes menées au Bénin et en Afrique
                </p>
              </div>
            </div>
          </div>

          {/* Right: Narrative Story & Motto */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#292D77] tracking-tight leading-snug">
                Une vocation née sur le terrain, <br />
                <span className="text-[#D72229]">portée par des liens humains réels</span>
              </h2>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                {NGO_INFO.description} Née d&apos;un engagement profond pour la dignité des plus vulnérables, VISION HUMAINE 59 refuse la fatalité de la précarité et agit concrètement pour offrir à chaque orphelin et enfant démuni l&apos;accès à l&apos;éducation, à la santé et à un environnement sécurisé.
              </p>

              <p className="text-base text-slate-600 leading-relaxed font-normal">
                Notre démarche s&apos;appuie sur une présence directe sans intermédiaire superflu : nous collaborons main dans la main avec les directeurs d&apos;orphelinats, les instituteurs et les familles locales pour bâtir des solutions pérennes.
              </p>
            </div>

            {/* Motto Box */}
            <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-[#14172B] via-[#292D77] to-[#14172B] text-white shadow-lg border border-slate-700/60">
              <p className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Notre Devise Fondatrice :
              </p>
              <p className="text-xl sm:text-2xl font-black text-[#FFFEFC] italic leading-snug">
                « {NGO_INFO.tagline} »
              </p>
            </div>
          </div>

        </div>

        {/* 3. Notre Méthode d'Action : 3 Principes Fondamentaux */}
        <div className="space-y-8 pt-4">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#292D77] tracking-tight">
              Comment nous agissons au quotidien
            </h2>
            <p className="text-base text-slate-600 mt-2 font-normal">
              Une méthode claire, responsable et axée sur l&apos;autonomie à long terme.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Principe 1 */}
            <div className="bg-white p-7 sm:p-8 rounded-3xl border border-slate-200/90 shadow-md flex flex-col justify-between space-y-4 hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 rounded-2xl bg-[#292D77]/10 text-[#292D77] flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#292D77] mb-2">
                  1. Diagnostic & Proximité
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  Chaque action part d&apos;une évaluation précise sur place avec les orphelinats, centres d&apos;accueil et écoles partenaires pour cibler les urgences réelles.
                </p>
              </div>
            </div>

            {/* Principe 2 */}
            <div className="bg-white p-7 sm:p-8 rounded-3xl border border-slate-200/90 shadow-md flex flex-col justify-between space-y-4 hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 rounded-2xl bg-[#D72229]/10 text-[#D72229] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#292D77] mb-2">
                  2. Zéro Intermédiaire
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  91% des ressources sont directement affectées aux missions de terrain, sans frais superflus, avec traçabilité intégrale et retours photos systématiques.
                </p>
              </div>
            </div>

            {/* Principe 3 */}
            <div className="bg-white p-7 sm:p-8 rounded-3xl border border-slate-200/90 shadow-md flex flex-col justify-between space-y-4 hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 rounded-2xl bg-[#292D77]/10 text-[#292D77] flex items-center justify-center">
                <Sprout className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#292D77] mb-2">
                  3. Impact Durable
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  Nous refusons l&apos;assistanat passif : formation des mères, soutien aux coopératives et potagers écologiques pour garantir l&apos;indépendance des communautés.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* 4. Carte d'Identité Statutaire & Transparence */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-md">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#292D77]/10 text-[#292D77] flex items-center justify-center flex-shrink-0">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Structure Reconnue</h4>
                <p className="text-xs text-slate-500 mt-0.5">Association déclarée d&apos;intérêt général</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#D72229]/10 text-[#D72229] flex items-center justify-center flex-shrink-0">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Terrain d&apos;Action</h4>
                <p className="text-xs text-slate-500 mt-0.5">Bénin et Afrique de l&apos;Ouest</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#292D77]/10 text-[#292D77] flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Traçabilité 100%</h4>
                <p className="text-xs text-slate-500 mt-0.5">Rapports semestriels et photos directes</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#D72229]/10 text-[#D72229] flex items-center justify-center flex-shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Reçus Fiscaux</h4>
                <p className="text-xs text-slate-500 mt-0.5">Attestation officielle pour chaque don</p>
              </div>
            </div>
          </div>
        </div>

        {/* 5. Bottom Navigation CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2 w-full max-w-lg mx-auto">
          <Link
            href="/missions"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-7 py-3 sm:py-3.5 rounded-[30px] font-bold text-xs sm:text-sm text-white bg-[#292D77] hover:bg-[#1f225a] shadow-md hover:shadow-lg transition-all active:scale-[0.98] whitespace-nowrap text-center"
          >
            <span className="whitespace-nowrap">Découvrir nos actions</span>
            <ArrowRight className="w-4 h-4 flex-shrink-0" />
          </Link>

          <Link
            href="/don"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-7 py-3 sm:py-3.5 rounded-[30px] font-bold text-xs sm:text-sm text-white bg-[#D72229] hover:bg-[#AB161C] shadow-md hover:shadow-lg transition-all active:scale-[0.98] whitespace-nowrap text-center"
          >
            <span className="whitespace-nowrap">Faire un don</span>
            <ArrowRight className="w-4 h-4 flex-shrink-0" />
          </Link>
        </div>

      </div>
    </div>
  );
}
