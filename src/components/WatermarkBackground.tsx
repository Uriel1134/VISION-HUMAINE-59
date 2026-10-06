'use client';

import React from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export const WatermarkBackground: React.FC = () => {
  const pathname = usePathname();

  // Hide watermark on admin routes for a clean dashboard interface
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Subtle Warm Amber & Terracotta Ambient Blooms */}
      <div className="absolute -top-32 -right-32 w-[700px] h-[700px] bg-amber-600/[0.06] rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 -left-32 w-[650px] h-[650px] bg-[#D72229]/[0.045] rounded-full blur-3xl"></div>
      <div className="absolute -bottom-32 right-1/4 w-[750px] h-[750px] bg-[#292D77]/[0.045] rounded-full blur-3xl"></div>

      {/* Center Large Watermark Logo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] lg:w-[680px] lg:h-[680px] opacity-[0.14] sm:opacity-[0.20] mix-blend-multiply pointer-events-none">
        <Image
          src="/images/logo.jpg"
          alt=""
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Top-Right Secondary Filigrane Accent (Hidden on mobile) */}
      <div className="hidden md:block absolute top-28 right-6 lg:right-20 w-48 h-48 lg:w-64 lg:h-64 opacity-[0.14] mix-blend-multiply pointer-events-none">
        <Image
          src="/images/logo.jpg"
          alt=""
          fill
          className="object-contain"
        />
      </div>

      {/* Bottom-Left Secondary Filigrane Accent (Hidden on mobile) */}
      <div className="hidden md:block absolute bottom-28 left-6 lg:left-20 w-48 h-48 lg:w-64 lg:h-64 opacity-[0.14] mix-blend-multiply pointer-events-none">
        <Image
          src="/images/logo.jpg"
          alt=""
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
};
