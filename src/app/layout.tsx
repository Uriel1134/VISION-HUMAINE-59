import type { Metadata, Viewport } from 'next';
import Image from 'next/image';
import Script from 'next/script';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { WatermarkBackground } from '@/components/WatermarkBackground';
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
      <body className="flex flex-col min-h-screen bg-[#F4EFE6] text-[#14172B] antialiased font-sans relative selection:bg-[#292D77] selection:text-[#F4EFE6]">
        
        {/* Fixed Watermark Background in Filigrane (Warm Atmosphere - Auto-hidden on /admin) */}
        <WatermarkBackground />

        <Header />
        <main className="flex-grow relative z-10">
          {children}
        </main>
        <Footer />
        <Script src="https://cdn.kkiapay.me/k.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}

