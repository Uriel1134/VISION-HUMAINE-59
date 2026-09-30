import type { Metadata, Viewport } from 'next';
import Image from 'next/image';
import Script from 'next/script';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { StructuredData } from '@/components/StructuredData';
import { NGO_INFO } from '@/lib/data';

export const viewport: Viewport = {
  themeColor: '#292D77',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: `${NGO_INFO.name} | Ensemble, semons l'espoir et cultivons l'avenir`,
    template: `%s | ${NGO_INFO.name}`,
  },
  description: `${NGO_INFO.name} est une association humanitaire reconnue œuvrant pour l'éducation, la santé infantile, la nutrition et la protection des orphelinats au Bénin et en Afrique.`,
  keywords: [
    'ONG humanitaire Afrique',
    'VISION HUMAINE 59',
    'association caritative Bénin',
    'parrainage enfant orphelin',
    'faire un don association',
    'don déductible impôt',
    'scolarisation orphelinats Afrique',
    'soins pédiatriques forains',
    'humanitaire Dassa-Zoumè',
    'orphelinat Azowlissè',
    'Glo-Djigbé solidarité'
  ],
  authors: [{ name: NGO_INFO.name, url: 'https://visionhumaine59.org' }],
  creator: NGO_INFO.name,
  publisher: NGO_INFO.name,
  metadataBase: new URL('https://visionhumaine59.org'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: `${NGO_INFO.name} | Ensemble, semons l'espoir et cultivons l'avenir`,
    description: NGO_INFO.vision,
    url: 'https://visionhumaine59.org',
    siteName: NGO_INFO.name,
    images: [
      {
        url: '/images/missions/hero-banner.jpg',
        width: 1200,
        height: 630,
        alt: `Actions de terrain et solidarité de ${NGO_INFO.name}`,
      },
      {
        url: '/images/logo.jpg',
        width: 800,
        height: 800,
        alt: `Logo officiel ${NGO_INFO.name}`,
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${NGO_INFO.name} | Association Humanitaire au Bénin`,
    description: NGO_INFO.tagline,
    images: ['/images/missions/hero-banner.jpg'],
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/images/logo.jpg',
    apple: '/images/logo.jpg',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <StructuredData />
      </head>
      <body className="flex flex-col min-h-screen bg-[#F6F1E8] text-[#14172B] antialiased font-sans relative selection:bg-[#292D77] selection:text-[#F6F1E8]">
        
        {/* Fixed Watermark Background in Filigrane (Warm Atmosphere) */}
        <div 
          className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none"
          aria-hidden="true"
        >
          {/* Subtle Warm Amber & Terracotta Ambient Blooms */}
          <div className="absolute -top-32 -right-32 w-[700px] h-[700px] bg-amber-600/[0.04] rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 -left-32 w-[650px] h-[650px] bg-[#D72229]/[0.035] rounded-full blur-3xl"></div>
          <div className="absolute -bottom-32 right-1/4 w-[750px] h-[750px] bg-[#292D77]/[0.035] rounded-full blur-3xl"></div>

          {/* Center Giant Watermark Logo */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] sm:w-[540px] sm:h-[540px] lg:w-[700px] lg:h-[700px] opacity-[0.13] mix-blend-multiply pointer-events-none">
            <Image
              src="/images/logo.jpg"
              alt=""
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Top-Right Secondary Filigrane Accent */}
          <div className="absolute top-20 right-4 lg:right-16 w-52 h-52 lg:w-72 lg:h-72 opacity-[0.09] mix-blend-multiply pointer-events-none">
            <Image
              src="/images/logo.jpg"
              alt=""
              fill
              className="object-contain"
            />
          </div>

          {/* Bottom-Left Secondary Filigrane Accent */}
          <div className="absolute bottom-24 left-4 lg:left-16 w-52 h-52 lg:w-72 lg:h-72 opacity-[0.09] mix-blend-multiply pointer-events-none">
            <Image
              src="/images/logo.jpg"
              alt=""
              fill
              className="object-contain"
            />
          </div>
        </div>

        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <Script src="https://cdn.kkiapay.me/k.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}

