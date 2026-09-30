'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  BookOpen, 
  Activity, 
  HeartHandshake, 
  Shield, 
  Sprout, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp
} from 'lucide-react';

const DOMAIN_DETAILS = [
  {
    id: "education",
    title: "Éducation & Apprentissage",
    tagline: "Offrir à chaque enfant les clés d'un avenir instruit et émancipé.",
    icon: BookOpen,
    image: "/images/missions/education-fournitures.jpg",
    problem: "En Afrique subsaharienne, le manque de fournitures et les frais de scolarité privent des milliers d'enfants de leur droit fondamental à l'instruction.",
    solution: "VISION HUMAINE 59 finance l'achat de manuels, fournit des cartables complets et soutient directement les écoles et classes partenaires au Bénin.",
    actions: [
      "Distribution de kits scolaires complets (cartable, cahiers, stylos, trousse)",
      "Programme de parrainage individuel d'écoliers et suivi des bulletins",
      "Prise en charge des frais de scolarisation et des cantines scolaires",
      "Création et réhabilitation d'espaces d'apprentissage sécurisés",
      "Organisation d'ateliers éducatifs, de lecture et d'éveil citoyen"
    ],
    impactStats: [
      { value: "1 450+", label: "Enfants scolarisés" },
      { value: "18", label: "Classes rénovées" },
      { value: "5 200", label: "Kits distribués" }
    ]
  },
  {
    id: "sante",
    title: "Santé & Hygiène Préventive",
    tagline: "Des soins pédiatriques accessibles et la prévention des maladies.",
    icon: Activity,
    image: "/images/missions/sante-hygiene.jpg",
    problem: "Le paludisme, les infections hydriques et la malnutrition restent les principales causes de mortalité infantile évitable.",
    solution: "Nos équipes déploient des cliniques foraines mobiles gratuites, fournissent des kits d'hygiène et forment les familles aux bonnes pratiques.",
    actions: [
      "Campagnes régulières de sensibilisation à l'hygiène et au lavage des mains",
      "Distribution de kits sanitaires, savons et moustiquaires imprégnées",
      "Consultations médicales et pédiatriques gratuites en milieu rural",
      "Aménagement de points d'eau potable et installations sanitaires",
      "Dépistage précoce et traitement antiparasitaire des nourrissons"
    ],
    impactStats: [
      { value: "2 150+", label: "Consultations foraines" },
      { value: "4 800", label: "Kits sanitaires" },
      { value: "9", label: "Points d'eau assainis" }
    ]
  },
  {
    id: "humanitaire",
    title: "Urgence Humanitaire & Vivres",
    tagline: "Acheminement sécurisé de denrées vitales et secours d'urgence.",
    icon: HeartHandshake,
    image: "/images/missions/humanitaire-vivres.jpg",
    problem: "Les crises économiques et climatiques plongent des familles entières dans l'insécurité alimentaire la plus aiguë.",
    solution: "Nous organisons des convois humanitaires d'urgence avec traçabilité intégrale pour acheminer vivres, vêtements et produits de première nécessité.",
    actions: [
      "Collecte et acheminement sécurisé des dons matériels et financiers",
      "Distribution de denrées alimentaires de base (riz, maïs, huile, lait)",
      "Dotation en vêtements et matériel de puériculture d'urgence",
      "Assistance directe aux familles en situation de détresse sévère",
      "Missions de terrain coordonnées avec les autorités locales"
    ],
    impactStats: [
      { value: "32 t", label: "Vivres distribuées" },
      { value: "890+", label: "Familles secourues" },
      { value: "14", label: "Convois organisés" }
    ]
  },
  {
    id: "protection",
    title: "Protection de l'Enfance",
    tagline: "Sécuriser les orphelinats et promouvoir les droits des mineurs.",
    icon: Shield,
    image: "/images/missions/protection-orphelinats.jpg",
    problem: "Les enfants privés de cadre familial sont particulièrement exposés à l'abandon, aux violences et au travail précoce.",
    solution: "VISION HUMAINE 59 soutient structurellement les orphelinats partenaires pour leur garantir hébergement, dignité et protection tutélaire.",
    actions: [
      "Accompagnement psychologique et social des enfants vulnérables",
      "Rénovation et équipement des dortoirs et réfectoires d'orphelinats",
      "Fourniture de produits d'hygiène et de literie adaptée",
      "Promotion active des droits fondamentaux de l'enfant",
      "Soutien à la réinsertion familiale et aux démarches d'état civil"
    ],
    impactStats: [
      { value: "11", label: "Orphelinats soutenus" },
      { value: "430", label: "Enfants hébergés" },
      { value: "120+", label: "Dossiers de protection" }
    ]
  },
  {
    id: "autonomie",
    title: "Développement Local & Autonomie",
    tagline: "Former les communautés pour co-construire des solutions durables.",
    icon: Sprout,
    image: "/images/missions/autonomie-communaute.jpg",
    problem: "L'assistanat sans lendemain fragilise les populations une fois les missions d'urgence terminées.",
    solution: "Nous investissons dans la formation des mères, l'agriculture vivrière locale et le renforcement des capacités des structures de proximité.",
    actions: [
      "Création de potagers nourriciers écologiques au sein des orphelinats",
      "Accompagnement et formation économique des groupements de mères",
      "Formation pédagogique continue des instituteurs et soignants locaux",
      "Soutien aux micro-initiatives artisanales et agricoles villageoises",
      "Mise en place de comités locaux de gestion et de pérennisation"
    ],
    impactStats: [
      { value: "15", label: "Coopératives actives" },
      { value: "280", label: "Acteurs formés" },
      { value: "22", label: "Projets locaux" }
    ]
  }
];

export default function MissionsPage() {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const displayedDomains = activeFilter === 'all' 
    ? DOMAIN_DETAILS 
    : DOMAIN_DETAILS.filter(d => d.id === activeFilter);

  return (
    <div className="min-h-screen">
      
      {/* 1. Hero Header Banner */}
      <section className="border-b border-slate-200/60 pt-10 pb-12 sm:pt-14 sm:pb-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#292D77] tracking-tight leading-[1.12] mb-4">
            Nos actions <br />
            <span className="text-[#D72229]">sur le terrain en Afrique</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto font-normal mb-8">
            VISION HUMAINE 59 intervient au quotidien à travers des programmes concrets et coordonnés au Bénin pour répondre aux urgences vitales et bâtir un avenir solide pour chaque enfant.
          </p>

          {/* Quick Metrics Strip */}
          <div className="max-w-4xl mx-auto p-4 sm:p-5 rounded-3xl bg-white shadow-md border border-slate-200/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#292D77]/10 text-[#292D77] flex items-center justify-center font-bold text-xs flex-shrink-0">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <p className="text-lg font-black text-slate-900">1 450+</p>
                <p className="text-xs text-slate-500 font-medium">Écoliers soutenus</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#D72229]/10 text-[#D72229] flex items-center justify-center font-bold text-xs flex-shrink-0">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <p className="text-lg font-black text-slate-900">2 150+</p>
                <p className="text-xs text-slate-500 font-medium">Soins délivrés</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#292D77]/10 text-[#292D77] flex items-center justify-center font-bold text-xs flex-shrink-0">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <p className="text-lg font-black text-slate-900">32 Tonnes</p>
                <p className="text-xs text-slate-500 font-medium">Vivres acheminées</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#D72229]/10 text-[#D72229] flex items-center justify-center font-bold text-xs flex-shrink-0">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <p className="text-lg font-black text-slate-900">91%</p>
                <p className="text-xs text-slate-500 font-medium">Direct au terrain</p>
              </div>
            </div>
          </div>

          {/* Interactive Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-8">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
                activeFilter === 'all'
                  ? 'bg-[#292D77] text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              Tous les domaines (5)
            </button>
            {DOMAIN_DETAILS.map((d) => (
              <button
                key={d.id}
                onClick={() => setActiveFilter(d.id)}
                className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
                  activeFilter === d.id
                    ? 'bg-[#292D77] text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                {d.title.split(' ')[0]}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* 2. Detailed Missions Showcase with Equal Height Columns */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
          
          {displayedDomains.map((domain, index) => {
            const Icon = domain.icon;
            const isEven = index % 2 === 0;

            return (
              <div
                key={domain.id}
                id={domain.id}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden scroll-mt-28"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                  
                  {/* Photo Column with Authentic Photo */}
                  <div className={`lg:col-span-5 relative min-h-[340px] lg:min-h-full bg-slate-900 ${isEven ? '' : 'lg:order-2'}`}>
                    <Image
                      src={domain.image}
                      alt={domain.title}
                      fill
                      className="object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent"></div>
                    
                    {/* Bottom overlay caption */}
                    <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                      <p className="text-base font-bold text-white leading-snug">
                        {domain.tagline}
                      </p>
                      <p className="text-xs text-slate-300 font-normal">
                        Missions coordonnées sur le terrain au Bénin
                      </p>
                    </div>
                  </div>

                  {/* Text & Actions Column */}
                  <div className={`lg:col-span-7 p-7 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6 ${isEven ? '' : 'lg:order-1'}`}>
                    
                    <div className="space-y-5">
                      
                      {/* Top icon and title */}
                      <div className="flex items-center gap-3.5">
                        <div className="w-12 h-12 rounded-2xl bg-[#292D77]/10 text-[#292D77] flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#292D77] leading-snug">
                          {domain.title}
                        </h2>
                      </div>

                      {/* Problem vs Solution comparison */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-100 space-y-1">
                          <p className="text-xs font-bold text-[#D72229]">
                            Le constat de terrain :
                          </p>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            {domain.problem}
                          </p>
                        </div>

                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                          <p className="text-xs font-bold text-[#292D77]">
                            Notre action concrète :
                          </p>
                          <p className="text-xs text-slate-600 leading-relaxed font-medium">
                            {domain.solution}
                          </p>
                        </div>
                      </div>

                      {/* Concrete Actions List */}
                      <div className="space-y-2">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                          Actions déployées :
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {domain.actions.map((act, i) => (
                            <div key={i} className="flex items-start gap-2 text-xs font-semibold text-slate-800">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#292D77] flex-shrink-0 mt-0.5" />
                              <span>{act}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 3 Impact Stat Boxes */}
                      <div className="grid grid-cols-3 gap-3 pt-1">
                        {domain.impactStats.map((stat, i) => (
                          <div key={i} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-center">
                            <p className="text-xl sm:text-2xl font-black text-[#292D77]">
                              {stat.value}
                            </p>
                            <p className="text-xs font-semibold text-slate-500 mt-0.5">
                              {stat.label}
                            </p>
                          </div>
                        ))}
                      </div>

                    </div>

                    {/* Bottom CTA Buttons */}
                    <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-3.5">
                      <Link
                        href={`/don?pillar=${domain.id}`}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-[30px] font-bold text-sm text-white bg-[#D72229] hover:bg-[#AB161C] shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
                      >
                        <span>Soutenir ce domaine</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>

                      <Link
                        href="/parrainage"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-[30px] font-bold text-sm text-[#292D77] bg-white hover:bg-[#292D77]/10 border border-[#292D77] shadow-sm hover:shadow transition-all active:scale-[0.98]"
                      >
                        <span>Parrainer un enfant</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>

                  </div>

                </div>
              </div>
            );
          })}

        </div>
      </section>

      {/* 3. Bottom Global Commitment CTA Banner */}
      <section className="py-12 sm:py-16 bg-[#FFFEFC] border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#14172B] via-[#292D77] to-[#14172B] text-white shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8 border border-slate-700/60">
            <div className="space-y-3 max-w-2xl">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#FFFEFC] tracking-tight leading-snug">
                Vous souhaitez vous engager ou devenir entreprise partenaire ?
              </h3>
              <p className="text-sm text-slate-200 leading-relaxed font-normal">
                Nous établissons des conventions de partenariat transparentes avec suivi semestriel et reçus fiscaux officiels.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0 w-full sm:w-auto">
              <Link
                href="/agir"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[30px] font-bold text-sm bg-[#D72229] hover:bg-[#AB161C] text-white transition-all shadow-md active:scale-[0.98]"
              >
                <span>Rejoindre nos actions</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[30px] font-bold text-sm bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors"
              >
                <span>Nous contacter</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
