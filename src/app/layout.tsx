import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { NGO_INFO } from '@/lib/data';

export const metadata: Metadata = {
  title: {
    default: `${NGO_INFO.name} | Ensemble, semons l'espoir et cultivons l'avenir`,
    template: `%s | ${NGO_INFO.name}`,
  },
  description: `${NGO_INFO.name} est une association humanitaire engagée pour améliorer les conditions de vie des enfants en situation précaire en Afrique à travers des actions éducatives, sanitaires et solidaires.`,
  keywords: [
    'ONG humanitaire Afrique',
    'VISION HUMAINE 59',
    'protection de l\'enfance Bénin',
    'parrainage enfant Afrique',
    'don association humanitaire',
    'scolarisation orphelinats Afrique',
    'missions médicales foraines'
  ],
  authors: [{ name: NGO_INFO.name }],
  metadataBase: new URL('https://visionhumaine59.org'),
  openGraph: {
    title: `${NGO_INFO.name} | Ensemble, semons l'espoir et cultivons l'avenir`,
    description: NGO_INFO.vision,
    url: 'https://visionhumaine59.org',
    siteName: NGO_INFO.name,
    images: [
      {
        url: '/images/logo.jpg',
        width: 800,
        height: 800,
        alt: `Logo officiel de ${NGO_INFO.name}`,
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className="flex flex-col min-h-screen bg-[#FFFEFC] text-[#14172B] antialiased font-sans">
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
