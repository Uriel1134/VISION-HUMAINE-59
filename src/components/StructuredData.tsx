import React from 'react';
import { NGO_INFO } from '@/lib/data';

export const StructuredData: React.FC = () => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'NGO',
        '@id': 'https://visionhumaine59.org/#organization',
        name: NGO_INFO.name,
        legalName: 'VISION HUMAINE 59',
        url: 'https://visionhumaine59.org',
        logo: 'https://visionhumaine59.org/images/logo.jpg',
        image: 'https://visionhumaine59.org/images/missions/hero-banner.jpg',
        description: NGO_INFO.vision,
        slogan: NGO_INFO.tagline,
        telephone: NGO_INFO.phone,
        email: NGO_INFO.email,
        address: [
          {
            '@type': 'PostalAddress',
            streetAddress: 'Siège social',
            addressLocality: 'Cambrai',
            postalCode: '59400',
            addressCountry: 'FR',
          },
          {
            '@type': 'PostalAddress',
            streetAddress: 'Tchankpamè',
            addressLocality: 'Cotonou',
            addressCountry: 'BJ',
          }
        ],
        areaServed: [
          {
            '@type': 'Country',
            name: 'France',
          },
          {
            '@type': 'Country',
            name: 'Bénin',
          },
          {
            '@type': 'Continent',
            name: 'Afrique',
          },
        ],
        knowsAbout: [
          'Éducation primaire et secondaire en Afrique',
          'Protection de l\'enfance et gestion d\'orphelinats',
          'Santé pédiatrique et cliniques foraines',
          'Acheminement de vivres humanitaires d\'urgence',
          'Autonomie durable et développement communautaire',
        ],
        sameAs: [
          'https://facebook.com',
          'https://instagram.com',
          'https://youtube.com',
          'https://linkedin.com',
        ],
        potentialAction: {
          '@type': 'DonateAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://visionhumaine59.org/don',
            inLanguage: 'fr-FR',
            actionPlatform: [
              'http://schema.org/DesktopWebPlatform',
              'http://schema.org/MobileWebPlatform',
            ],
          },
          recipient: {
            '@type': 'NGO',
            name: NGO_INFO.name,
          },
        },
      },
      {
        '@type': 'WebSite',
        '@id': 'https://visionhumaine59.org/#website',
        url: 'https://visionhumaine59.org',
        name: NGO_INFO.name,
        description: 'Site officiel de l\'ONG VISION HUMAINE 59 - Actions de partage, scolarisation et santé au Bénin.',
        publisher: {
          '@id': 'https://visionhumaine59.org/#organization',
        },
        inLanguage: 'fr-FR',
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};
