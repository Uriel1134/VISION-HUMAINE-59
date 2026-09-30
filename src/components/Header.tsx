'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight } from 'lucide-react';

const NAV_LINKS = [
  { name: 'Accueil', href: '/' },
  { name: 'Nos actions', href: '/missions' },
  { name: 'Galerie', href: '/#galerie' },
  { name: 'À propos', href: '/a-propos' },
  { name: 'Partenaires', href: '/#partenaires' },
  { name: 'Actualités', href: '/actualites' },
  { name: 'Contact', href: '/contact' },
];

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100 py-3' 
        : 'bg-white border-b border-slate-100 py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center group" aria-label="Accueil VISION HUMAINE 59">
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden flex-shrink-0 bg-white shadow-sm border border-slate-100 p-0.5 group-hover:scale-105 transition-transform duration-300">
              <Image
                src="/images/logo.jpg"
                alt="Logo VISION HUMAINE 59"
                width={56}
                height={56}
                className="w-full h-full object-contain"
                priority
              />
            </div>
          </Link>

          {/* Center Navigation Links (Modern Segmented Dock) */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-[30px] border border-slate-200/70">
            {NAV_LINKS.map((link, idx) => {
              const isActive = (link.href === '/' && pathname === '/') || (link.href !== '/' && pathname.startsWith(link.href) && link.href !== '/#partenaires');
              return (
                <Link
                  key={idx}
                  href={link.href}
                  className={`px-4 py-1.5 text-sm font-semibold rounded-[30px] transition-all duration-200 ${
                    isActive
                      ? 'bg-white text-[#292D77] shadow-xs font-bold border border-slate-200/60'
                      : 'text-slate-600 hover:text-[#292D77] hover:bg-white/60'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Red CTA Button */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/don"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-[30px] font-bold text-sm text-[#FFFEFC] bg-[#D72229] hover:bg-[#AB161C] shadow-sm hover:shadow-[#D72229]/25 hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200"
            >
              <span>Faire un don</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href="/don"
              className="sm:hidden inline-flex items-center gap-1.5 px-4 py-1.5 rounded-[30px] font-bold text-xs text-[#FFFEFC] bg-[#D72229] shadow-sm"
            >
              <span>Donner</span>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:outline-none transition-colors"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF8F5]/98 backdrop-blur-lg border-t border-slate-200/80 px-6 py-5 space-y-3 shadow-xl animate-fade-in">
          {NAV_LINKS.map((link, idx) => (
            <Link
              key={idx}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2.5 px-3 rounded-xl text-sm font-semibold text-slate-700 hover:text-[#292D77] hover:bg-[#292D77]/10 transition-colors"
            >
              <span>{link.name}</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>
          ))}
          <div className="pt-3 border-t border-slate-200/80">
            <Link
              href="/don"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-[30px] font-bold text-sm text-[#FAF8F5] bg-[#D72229] hover:bg-[#AB161C] shadow-md"
            >
              <span>Faire un don en ligne</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
