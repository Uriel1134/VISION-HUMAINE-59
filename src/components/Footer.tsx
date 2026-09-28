import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowRight, 
  Mail, 
  Phone, 
  MapPin 
} from 'lucide-react';
import { NGO_INFO } from '@/lib/data';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0A0F1D] text-slate-300 border-t border-slate-800/80 relative overflow-hidden">
      
      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          
          {/* Col 1: Identity & Direct Contact */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="flex items-center gap-3.5 group">
              <div className="relative w-14 h-14 rounded-full overflow-hidden bg-white p-0.5 shadow-md flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                <Image
                  src="/images/logo.jpg"
                  alt="Logo VISION HUMAINE 59"
                  width={56}
                  height={56}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="font-extrabold text-lg text-white tracking-tight block">
                  VISION HUMAINE 59
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {NGO_INFO.tagline}
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
              Association humanitaire engagée pour l&apos;éducation, la santé, la protection des orphelinats et l&apos;autonomie durable des communautés au Bénin.
            </p>

            {/* Direct Contact Pills */}
            <div className="space-y-2 pt-1 text-xs text-slate-300 font-medium">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#D72229] flex-shrink-0" />
                <span>Cotonou, République du Bénin</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                <a href={`mailto:${NGO_INFO.email}`} className="hover:text-white transition-colors">
                  {NGO_INFO.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <a href={`tel:${NGO_INFO.phone}`} className="hover:text-white transition-colors">
                  {NGO_INFO.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Domaines d'Actions */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-white font-extrabold text-sm tracking-wider uppercase">
              Domaines d&apos;action
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400">
              <li>
                <Link href="/missions#education" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-200">
                  Éducation & Scolarité
                </Link>
              </li>
              <li>
                <Link href="/missions#sante" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-200">
                  Santé & Hygiène Préventive
                </Link>
              </li>
              <li>
                <Link href="/missions#humanitaire" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-200">
                  Urgence Humanitaire & Vivres
                </Link>
              </li>
              <li>
                <Link href="/missions#protection" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-200">
                  Protection des Orphelinats
                </Link>
              </li>
              <li>
                <Link href="/missions#autonomie" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-200">
                  Développement & Autonomie
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: L'Organisation */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-white font-extrabold text-sm tracking-wider uppercase">
              L&apos;ONG
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400">
              <li>
                <Link href="/a-propos" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-200">
                  Notre Vision & Équipe
                </Link>
              </li>
              <li>
                <Link href="/#galerie" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-200">
                  Galerie Photos par Projet
                </Link>
              </li>
              <li>
                <Link href="/#partenaires" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-200">
                  Partenaires de Terrain
                </Link>
              </li>
              <li>
                <Link href="/actualites" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-200">
                  Rapports de Missions
                </Link>
              </li>
              <li>
                <Link href="/agir" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-200">
                  Devenir Bénévole
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-200">
                  FAQ & Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Soutenir & Suivre */}
          <div className="lg:col-span-3 space-y-5">
            <h3 className="text-white font-extrabold text-sm tracking-wider uppercase">
              Soutenir notre mission
            </h3>
            
            <p className="text-xs text-slate-400 leading-relaxed font-normal">
              Votre générosité finance directement les fournitures scolaires, les soins et les denrées de première urgence au Bénin.
            </p>

            {/* Action CTA Button */}
            <div className="space-y-2.5">
              <Link
                href="/don"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-[30px] font-bold text-xs sm:text-sm text-[#FFFEFC] bg-[#D72229] hover:bg-[#AB161C] shadow-md hover:shadow-[#D72229]/25 hover:shadow-lg transition-all active:scale-[0.98] whitespace-nowrap text-center"
              >
                <span className="whitespace-nowrap">Faire un don en ligne</span>
                <ArrowRight className="w-4 h-4 flex-shrink-0" />
              </Link>
              
              <Link
                href="/parrainage"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-[30px] font-bold text-xs text-slate-200 bg-white/10 hover:bg-white/15 border border-white/15 transition-all whitespace-nowrap text-center"
              >
                <span className="whitespace-nowrap">Parrainer un enfant</span>
              </Link>
            </div>

            {/* Modern Social Media SVG Icons */}
            <div className="pt-2">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                Nous suivre sur les réseaux :
              </p>
              <div className="flex items-center gap-2.5">
                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-full bg-slate-800/90 hover:bg-[#1877F2] text-slate-300 hover:text-white border border-slate-700/80 flex items-center justify-center transition-all hover:scale-105"
                  aria-label="Facebook VISION HUMAINE 59"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-full bg-slate-800/90 hover:bg-[#E4405F] text-slate-300 hover:text-white border border-slate-700/80 flex items-center justify-center transition-all hover:scale-105"
                  aria-label="Instagram VISION HUMAINE 59"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-full bg-slate-800/90 hover:bg-[#FF0000] text-slate-300 hover:text-white border border-slate-700/80 flex items-center justify-center transition-all hover:scale-105"
                  aria-label="YouTube VISION HUMAINE 59"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-full bg-slate-800/90 hover:bg-[#0A66C2] text-slate-300 hover:text-white border border-slate-700/80 flex items-center justify-center transition-all hover:scale-105"
                  aria-label="LinkedIn VISION HUMAINE 59"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* 3. Bottom Legal & Copyright Bar */}
      <div className="border-t border-slate-800/80 bg-[#060911] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            
            <p className="text-center sm:text-left">
              &copy; {new Date().getFullYear()} VISION HUMAINE 59. Association humanitaire déclarée. Tous droits réservés.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
              <Link href="/contact" className="hover:text-white transition-colors">
                Mentions légales
              </Link>
              <Link href="/contact" className="hover:text-white transition-colors">
                Politique de confidentialité
              </Link>
              <div className="flex items-center gap-1.5 ml-2">
                <span className="w-2 h-2 bg-[#292D77] rounded-full"></span>
                <span className="w-2 h-2 bg-[#D72229] rounded-full"></span>
                <span className="w-2 h-2 bg-[#FFFEFC] rounded-full"></span>
              </div>
            </div>

          </div>
        </div>
      </div>

    </footer>
  );
};
