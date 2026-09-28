import { PillarItem, NewsArticle, Partner, Testimonial, DonationOption, GalleryProject } from './types';


export const NGO_INFO = {
  name: "VISION HUMAINE 59",
  acronym: "VH59",
  tagline: "Ensemble, semons l'espoir et cultivons l'avenir.",
  vision: "Améliorer durablement les conditions de vie des enfants en situation précaire en Afrique grâce à des actions humanitaires, éducatives et sanitaires concertées.",
  description: "VISION HUMAINE 59 est une association humanitaire engagée pour apporter un soutien concret, mesurable et pérenne aux enfants les plus vulnérables ainsi qu'à leurs communautés locales.",
  address: "Cotonou, République du Bénin / Siège International & Antennes Locales",
  phone: "+229 01 23 45 67",
  email: "contact@visionhumaine59.org",
  registration: "Association Humanitaire déclarée - Journal Officiel",
  foundedYear: 2024,
  stats: {
    childrenSupported: "3 850+",
    kitsDistributed: "12 400+",
    medicalConsultations: "2 150+",
    partnerCenters: "24",
    volunteersCount: "180+",
    allocationTerrainRate: "91%",
  },
};

export const PILLARS_DATA: PillarItem[] = [
  {
    id: "education",
    title: "Éducation & Apprentissage",
    shortDescription: "Favoriser l'accès à l'école, au matériel scolaire et bâtir un cadre d'éveil digne.",
    description: "L'éducation est le levier fondamental pour briser le cercle de la précarité. Nous œuvrons quotidiennement pour que chaque enfant ait les moyens d'apprendre et de grandir dans la dignité.",
    iconName: "GraduationCap",
    color: "from-blue-600 to-indigo-700",
    badge: "Priorité Fondamentale",
    actions: [
      "Distribution de fournitures et manuels scolaires complets",
      "Programme structuré de parrainage d'enfants",
      "Soutien direct aux frais de scolarisation et cantines",
      "Création et réhabilitation d'espaces d'apprentissage sécurisés",
      "Organisation d'ateliers éducatifs, de lecture et d'éveil"
    ],
    impactStats: [
      { label: "Enfants scolarisés", value: "1 450+" },
      { label: "Salles rénovées", value: "18" },
      { label: "Kits de rentrée", value: "5 200" }
    ],
    image: "/images/missions/distribution-fournitures-terrain.jpg"
  },
  {
    id: "sante",
    title: "Santé & Hygiène Préventive",
    shortDescription: "Soutenir la prévention, les soins primaires, l'accès à l'eau potable et l'hygiène.",
    description: "Un enfant en bonne santé est un enfant capable d'apprendre et de s'épanouir. Nos équipes et soignants partenaires interviennent sur le terrain pour des soins accessibles et la prévention des maladies.",
    iconName: "Stethoscope",
    color: "from-rose-600 to-red-700",
    badge: "Urgences & Prévention",
    actions: [
      "Campagnes de sensibilisation aux bonnes pratiques d'hygiène",
      "Distribution de kits sanitaires et de première urgence",
      "Organisation de consultations médicales foraines gratuites",
      "Projets d'accès à l'eau potable et installations sanitaires",
      "Actions de prévention contre les maladies hydriques et le paludisme"
    ],
    impactStats: [
      { label: "Consultations médicales", value: "2 150+" },
      { label: "Kits sanitaires remis", value: "4 800" },
      { label: "Points d'eau réhabilités", value: "9" }
    ],
    image: "/images/missions/sensibilisation-ateliers-terrain.jpg"
  },
  {
    id: "humanitaire",
    title: "Action Humanitaire d'Urgence",
    shortDescription: "Collecte, acheminement et distribution de vivres, vêtements et matériel vital.",
    description: "Face aux situations de vulnérabilité extrême ou de crise, VISION HUMAINE 59 déploie des convois solidaires d'urgence avec une traçabilité intégrale de chaque don confié.",
    iconName: "HeartHandshake",
    color: "from-amber-600 to-orange-700",
    badge: "Solidarité Directe",
    actions: [
      "Collecte et acheminement sécurisé des dons matériels",
      "Distribution de vêtements, denrées alimentaires et kits de survie",
      "Assistance aux familles en situation de grande détresse",
      "Missions humanitaires de proximité sur le terrain",
      "Réseau logistique d'acheminement direct et transparent"
    ],
    impactStats: [
      { label: "Tonnes de vivres remises", value: "32 t" },
      { label: "Familles secourues", value: "890+" },
      { label: "Convois organisés", value: "14" }
    ],
    image: "/images/missions/dassa-edition-1.jpg"
  },
  {
    id: "protection",
    title: "Protection de l'Enfance",
    shortDescription: "Améliorer le bien-être, sécuriser les orphelinats et promouvoir les droits des mineurs.",
    description: "Chaque enfant a droit à un foyer sûr, à l'écoute et à la protection contre toute forme de maltraitance ou d'abandon. Nous nous tenons aux côtés des structures d'accueil.",
    iconName: "ShieldCheck",
    color: "from-emerald-600 to-teal-700",
    badge: "Défense des Droits",
    actions: [
      "Accompagnement psychologique et social des enfants vulnérables",
      "Amélioration des conditions d'hébergement quotidiennes",
      "Soutien matériel et structurel aux orphelinats et centres d'accueil",
      "Promotion active de la Convention des Droits de l'Enfant",
      "Programmes de réinsertion et d'encadrement tutélaire"
    ],
    impactStats: [
      { label: "Orphelinats soutenus", value: "11" },
      { label: "Enfants hébergés et suivis", value: "430" },
      { label: "Dossiers de protection traités", value: "120+" }
    ],
    image: "/images/missions/orphelinat-saint-dominique-azowlisse.jpg"
  },
  {
    id: "autonomie",
    title: "Développement Local & Autonomie",
    shortDescription: "Former les communautés locales et co-construire des solutions durables et pérennes.",
    description: "Nous refusons l'assistanat passif. Notre objectif ultime est de rendre les communautés locales autonomes, prospères et actrices de leur propre essor économique et social.",
    iconName: "Globe",
    color: "from-slate-800 to-slate-950",
    badge: "Impact Durable",
    actions: [
      "Collaboration étroite avec les écoles et centres de santé locaux",
      "Soutien aux micro-initiatives agricoles et artisanales communautaires",
      "Renforcement des capacités économiques des mères de famille",
      "Formation pédagogique et accompagnement des acteurs de terrain",
      "Mise en place de comités villageois de suivi et de gestion"
    ],
    impactStats: [
      { label: "Coopératives accompagnées", value: "15" },
      { label: "Acteurs locaux formés", value: "280" },
      { label: "Projets communautaires", value: "22" }
    ],
    image: "/images/missions/dassa-edition-2.jpg"
  }
];

export const ARTICLES_DATA: NewsArticle[] = [
  {
    id: "art-dassa-1",
    slug: "premiere-edition-partage-dassa-zoume-collines",
    title: "Première édition de partage à Dassa-Zoumè dans le département des Collines",
    summary: "Retour sur la première grande mission solidaire de VISION HUMAINE 59 à Dassa-Zoumè : distribution de vivres, kits scolaires et vêtements aux enfants et familles vulnérables.",
    content: [
      "Dans le cadre de son engagement humanitaire au Bénin, VISION HUMAINE 59 a organisé avec succès sa Première Édition de Partage dans la commune de Dassa-Zoumè, au cœur du département des Collines.",
      "Cette mission d'envergure a mobilisé bénévoles et acteurs locaux pour distribuer des vivres essentiels, des kits de rentrée scolaire et des vêtements adaptés à des dizaines d'enfants défavorisés.",
      "L'émotion et la gratitude des familles ont témoigné de l'importance vitale de cette première présence sur le terrain, posant les bases solides d'un partenariat continu avec la communauté locale."
    ],
    date: "Septembre 2026",
    category: "Action Humanitaire",
    readTime: "4 min",
    author: "Équipe Terrain VH59",
    image: "/images/missions/dassa-edition-1.jpg",
    tags: ["Dassa-Zoumè", "Collines", "Partage", "Bénin", "Solidarité"]
  },
  {
    id: "art-azowlisse",
    slug: "visite-premiere-edition-partage-orphelinat-saint-dominique-azowlisse",
    title: "Visite et première édition de partage dans l’orphelinat Saint Dominique à Azowlissè",
    summary: "Une journée d'amour, de soutien matériel et de communion fraternelle aux côtés des pensionnaires et encadrants de l'orphelinat Saint Dominique.",
    content: [
      "L'équipe de VISION HUMAINE 59 s'est rendue à Azowlissè pour une visite fraternelle et une remise solennelle de dons à l'orphelinat Saint Dominique.",
      "Au programme de cette journée : apport de denrées alimentaires nutritives, kits d'hygiène, matériel éducatif et moments d'échanges chaleureux avec les enfants et la direction du centre.",
      "Ce premier jalon scelle notre volonté d'accompagner durablement l'orphelinat Saint Dominique dans sa mission quotidienne de protection de l'enfance vulnérable."
    ],
    date: "Septembre 2026",
    category: "Protection de l'Enfance",
    readTime: "4 min",
    author: "Coordination Orphelinats VH59",
    image: "/images/missions/orphelinat-saint-dominique-azowlisse.jpg",
    tags: ["Azowlissè", "Orphelinat Saint Dominique", "Protection", "Enfance"]
  },
  {
    id: "art-dassa-2",
    slug: "deuxieme-edition-partage-collines-dassa-zoume",
    title: "Deuxième édition de partage dans le département des Collines à Dassa-Zoumè",
    summary: "Consolidation de notre présence à Dassa-Zoumè : renforcement des dotations scolaires, soins d'urgence et soutien aux initiatives locales.",
    content: [
      "Fidèle à sa devise 'Ensemble, semons l'espoir et cultivons l'avenir', VISION HUMAINE 59 a réitéré son engagement auprès des populations de Dassa-Zoumè à travers une Deuxième Édition de Partage encore plus impactante.",
      "Grâce à la générosité de nos donateurs et au dévouement de nos volontaires, nous avons étendu la distribution à de nouveaux hameaux, touchant un nombre accru d'écoliers et de mères de famille.",
      "Des ateliers de sensibilisation à l'hygiène et au soutien scolaire ont également ponctué cette mission mémorable."
    ],
    date: "Septembre 2026",
    category: "Développement Local",
    readTime: "5 min",
    author: "Pôle Missions Collines",
    image: "/images/missions/dassa-edition-2.jpg",
    tags: ["Dassa-Zoumè", "Deuxième Édition", "Collines", "Impact Pérenne"]
  },
  {
    id: "art-missions-terrain",
    slug: "distributions-ateliers-suivi-communautes-benin",
    title: "Suivi des missions, distributions de fournitures et ateliers de terrain au Bénin",
    summary: "Un aperçu complet de la continuité de nos actions : acheminement sécurisé, soutien aux écoles et accompagnement bienveillant.",
    content: [
      "Au-delà des grands événements de partage, les volontaires de VISION HUMAINE 59 maintiennent un contact permanent avec les centres partenaires pour assurer la continuité des apprentissages et des soins.",
      "Chaque kit remis fait l'objet d'un suivi scrupuleux pour s'assurer que les enfants bénéficiaires poursuivent leur cursus scolaire dans les meilleures dispositions.",
      "Nous remercions chaleureusement chaque bienfaiteur dont le geste permet de donner corps à ces actions concrètes."
    ],
    date: "Septembre 2026",
    category: "Éducation & Santé",
    readTime: "3 min",
    author: "Secrétariat Général VH59",
    image: "/images/missions/distribution-fournitures-terrain.jpg",
    tags: ["Missions Terrain", "Suivi", "Bénin", "Éducation"]
  }
];

export const DONATION_PRESETS: DonationOption[] = [
  {
    amount: 20,
    amountFCFA: 13000,
    impactText: "Fournit un kit scolaire complet (sac, cahiers, stylos, trousse) à 2 écoliers.",
  },
  {
    amount: 50,
    amountFCFA: 32500,
    impactText: "Couvre les soins médicaux de base et le traitement antiparasitaire de 5 enfants.",
    badge: "Recommandé"
  },
  {
    amount: 100,
    amountFCFA: 65000,
    impactText: "Assure un mois d'alimentation équilibrée et le suivi nutritionnel d'un enfant en orphelinat.",
    badge: "Impact Majeur"
  },
  {
    amount: 250,
    amountFCFA: 165000,
    impactText: "Finance l'équipement d'un atelier éducatif et la dotation en matériel pour une école.",
  }
];

export const PARTNERS_DATA: Partner[] = [
  {
    id: "orphelinat-saint-dominique",
    name: "Orphelinat Saint Dominique",
    category: "orphelinat",
    location: "Azowlissè, Bénin",
    description: "Centre d'accueil et d'hébergement partenaire pour enfants orphelins et vulnérables.",
    badge: "Orphelinat Partenaire"
  },
  {
    id: "communaute-dassa",
    name: "Communautés & Écoles des Collines",
    category: "ecole",
    location: "Dassa-Zoumè, Bénin",
    description: "Réseau d'écoles et de groupements bénéficiaires des 1ère et 2ème éditions de partage.",
    badge: "Collectivités & Écoles"
  },
  {
    id: "centre-sante-solidarite",
    name: "Dispensaire Médical Saint-Luc",
    category: "sante",
    location: "Porto-Novo, Bénin",
    description: "Pôle de soins de première ligne assurant consultations pédiatriques et vaccinations.",
    badge: "Centre de Santé"
  },
  {
    id: "asso-afrique-solidaire",
    name: "Collectif Solidarité Terres d'Afrique",
    category: "association",
    location: "International & Bénin",
    description: "Réseau de coordination logistique pour l'acheminement de dons matériels et de fournitures.",
    badge: "Association Partenaire"
  },
  {
    id: "mecenat-groupe-horizon",
    name: "Fondation Entreprises & Solidarité",
    category: "mecenat",
    location: "France & Afrique de l'Ouest",
    description: "Mécénat de compétences et soutien financier aux programmes d'autonomie communautaire.",
    badge: "Entreprise Mécène"
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: "t1",
    quote: "La visite et la remise de dons à l'orphelinat Saint Dominique d'Azowlissè ont apporté un immense soulagement à nos pensionnaires. Les kits d'hygiène et les vivres reçus nous permettent d'assurer le quotidien dans la dignité.",
    author: "Responsable du centre d'accueil",
    role: "Orphelinat Saint Dominique",
    location: "Azowlissè, Bénin"
  },
  {
    id: "t2",
    quote: "Voir les équipes de VISION HUMAINE 59 revenir à Dassa-Zoumè pour la 2ème édition consécutive prouve la sincérité et la durabilité de leur engagement auprès de nos enfants.",
    author: "Représentant des parents d'élèves",
    role: "Comité Local des Collines",
    location: "Dassa-Zoumè, Bénin"
  },
  {
    id: "t3",
    quote: "La transparence financière et les photos en direct des distributions sur le terrain m'ont totalement convaincu. Chaque euro versé a une utilité directe et visible.",
    author: "Marc-Antoine D.",
    role: "Parrain donateur régulier",
    location: "France"
  }
];

export const FAQ_ITEMS = [
  {
    question: "Comment sont utilisés les dons faits à VISION HUMAINE 59 ?",
    answer: "Plus de 91% des fonds collectés sont directement alloués aux actions humanitaires de terrain au Bénin (Dassa-Zoumè, Azowlissè, Glo-Djigbé, etc. : vivres, fournitures scolaires, soins, rénovations). Les 9% restants couvrent les frais administratifs et bancaires stricts."
  },
  {
    question: "Comment fonctionne le parrainage d'un enfant ?",
    answer: "Le parrainage permet d'assurer la scolarité, la santé et le soutien alimentaire d'un enfant en situation précaire. Vous recevez un rapport semestriel détaillé avec des nouvelles, des photos et les résultats scolaires de votre filleul(e)."
  },
  {
    question: "Les dons sont-ils sécurisés et donnent-ils droit à une attestation ?",
    answer: "Absolument. Toutes nos transactions transitent par des passerelles chiffrées selon les standards bancaires les plus élevés (SSL 256 bits). Une attestation de don officielle avec référence unique et traçabilité est émise instantanément pour chaque contribution."
  },
  {
    question: "Quels sont les moyens de paiement acceptés ?",
    answer: "Nous acceptons les cartes bancaires internationales (Visa, Mastercard), PayPal, les virements bancaires directs, ainsi que les solutions Mobile Money largement utilisées en Afrique de l'Ouest (MTN Mobile Money, Moov Money, Wave)."
  },
  {
    question: "Comment puis-je devenir bénévole ou partenaire ?",
    answer: "Vous pouvez postuler en ligne via notre page 'Agir avec nous'. Que vous souhaitiez intervenir sur le terrain au Bénin (Collines, Ouémé, Atlantique, Littoral) ou apporter des compétences à distance, nous serons ravis de vous accueillir."
  }
];

export const GALLERY_PROJECTS_DATA: GalleryProject[] = [
  {
    id: "glo-djigbe-1",
    title: "Première édition de partage dans l’orphelinat Demeure d’amour du docteur Léon Sacramento à Glo-Djigbé au Bénin",
    shortTitle: "Orphelinat Demeure d'Amour - 1ère Édition",
    location: "Glo-Djigbé",
    department: "Atlantique",
    edition: "1ère Édition",
    date: "Septembre 2026",
    badge: "Orphelinat Dr Léon Sacramento",
    description: "Remise officielle de vivres de première nécessité, sacs de denrées, fournitures scolaires et moments de joie et de communion fraternelle avec les enfants pensionnaires de l'orphelinat Demeure d'Amour à Glo-Djigbé.",
    photos: [
      {
        id: "glo-1",
        src: "/images/galerie/glo-djigbe-1/glo-djigbe-1-1.jpg",
        caption: "Distribution et remise des sacs de vivres aux enfants et responsables de l'orphelinat",
        alt: "Première édition de partage à l'orphelinat Demeure d'amour de Glo-Djigbé"
      },
      {
        id: "glo-2",
        src: "/images/galerie/glo-djigbe-1/glo-djigbe-1-2.jpg",
        caption: "Mobilisation de l'équipe VISION HUMAINE 59 au cœur de la cour de l'orphelinat Demeure d'Amour",
        alt: "Équipe VISION HUMAINE 59 à l'orphelinat du Dr Léon Sacramento"
      },
      {
        id: "glo-3",
        src: "/images/galerie/glo-djigbe-1/glo-djigbe-1-3.jpg",
        caption: "Échange fraternel et communion chaleureuse avec les pensionnaires et les encadrants",
        alt: "Moment de communion avec les enfants de Glo-Djigbé"
      },
      {
        id: "glo-4",
        src: "/images/galerie/glo-djigbe-1/glo-djigbe-1-4.jpg",
        caption: "Photo souvenir réunissant les orphelins, les encadrants et les volontaires engagés",
        alt: "Photo de groupe solidaire à l'orphelinat Demeure d'amour"
      }
    ]
  },
  {
    id: "dassa-3",
    title: "Troisième édition de partage dans le département des Collines à Dassa-Zoumè",
    shortTitle: "Dassa-Zoumè (Collines) - 3ème Édition",
    location: "Dassa-Zoumè",
    department: "Collines",
    edition: "3ème Édition",
    date: "Septembre 2026",
    badge: "Département des Collines",
    description: "Consolidation de notre impact continu dans le département des Collines : déploiement de nouveaux kits scolaires complets, denrées nutritionnelles et vêtements pour soutenir durablement les enfants et familles de Dassa-Zoumè.",
    photos: [
      {
        id: "dassa3-1",
        src: "/images/galerie/dassa-3/dassa-3-1.jpg",
        caption: "Arrivée et alignement des kits scolaires et vivres destinés aux écoliers des Collines",
        alt: "Troisième édition de partage à Dassa-Zoumè - Collines"
      },
      {
        id: "dassa3-2",
        src: "/images/galerie/dassa-3/dassa-3-2.jpg",
        caption: "Cérémonie de remise et rassemblement populaire avec les parents et les bénéficiaires",
        alt: "Rassemblement pour la distribution solidaire à Dassa-Zoumè"
      },
      {
        id: "dassa3-3",
        src: "/images/galerie/dassa-3/dassa-3-3.jpg",
        caption: "Sourires et fierté des jeunes élèves recevant leurs dotations de rentrée scolaire",
        alt: "Élèves recevant leurs fournitures à Dassa-Zoumè 3ème édition"
      }
    ]
  },
  {
    id: "azowlisse-1",
    title: "Première édition de partage dans l’orphelinat Saint Dominique des sœurs oblates à Azowlissè dans le département de l’Ouémé au Bénin",
    shortTitle: "Orphelinat St Dominique (Azowlissè) - 1ère Édition",
    location: "Azowlissè",
    department: "Ouémé",
    edition: "1ère Édition",
    date: "Septembre 2026",
    badge: "Sœurs Oblates & Orphelinat St Dominique",
    description: "Inauguration de notre partenariat humanitaire avec l'orphelinat Saint Dominique des Sœurs Oblates à Azowlissè. Dotation substantielle en sacs de riz, huiles, produits d'hygiène, vêtements et kits éducatifs.",
    photos: [
      {
        id: "azow1-1",
        src: "/images/galerie/azowlisse-1/azowlisse-1-1.jpg",
        caption: "Présentation des dons matériels, vivres et équipements apportés à l'orphelinat",
        alt: "Première édition à l'orphelinat Saint Dominique d'Azowlissè"
      },
      {
        id: "azow1-2",
        src: "/images/galerie/azowlisse-1/azowlisse-1-2.jpg",
        caption: "Accueil chaleureux par les Sœurs Oblates et les enfants de la structure d'hébergement",
        alt: "Accueil par les Sœurs Oblates à Azowlissè"
      },
      {
        id: "azow1-3",
        src: "/images/galerie/azowlisse-1/azowlisse-1-3.jpg",
        caption: "Déchargement ordonné et inventaire des vivres au profit des pensionnaires",
        alt: "Inventaire et déchargement des dons à Azowlissè"
      },
      {
        id: "azow1-4",
        src: "/images/galerie/azowlisse-1/azowlisse-1-4.jpg",
        caption: "Moment de prière et de bénédiction partagé avec la communauté religieuse et les enfants",
        alt: "Bénédiction et recueillement solidaire à Azowlissè"
      },
      {
        id: "azow1-5",
        src: "/images/galerie/azowlisse-1/azowlisse-1-5.jpg",
        caption: "Échange individuel et écoute attentive des besoins spécifiques des mineurs accueillis",
        alt: "Échange avec les orphelins d'Azowlissè"
      },
      {
        id: "azow1-6",
        src: "/images/galerie/azowlisse-1/azowlisse-1-6.jpg",
        caption: "Remise solennelle des kits d'hygiène préventive et de fournitures scolaires",
        alt: "Remise des fournitures scolaires aux enfants d'Azowlissè"
      },
      {
        id: "azow1-7",
        src: "/images/galerie/azowlisse-1/azowlisse-1-7.jpg",
        caption: "Rassemblement solidaire au centre de vie de l'orphelinat Saint Dominique",
        alt: "Vue d'ensemble de la distribution à Azowlissè"
      },
      {
        id: "azow1-8",
        src: "/images/galerie/azowlisse-1/azowlisse-1-8.jpg",
        caption: "Soutien logistique et organisationnel assuré par les bénévoles de VISION HUMAINE 59",
        alt: "Bénévoles VISION HUMAINE 59 à Azowlissè"
      },
      {
        id: "azow1-9",
        src: "/images/galerie/azowlisse-1/azowlisse-1-9.jpg",
        caption: "Émouvant portrait de groupe scellant une amitié et un soutien indéfectible",
        alt: "Portrait de groupe avec les enfants et les sœurs d'Azowlissè"
      },
      {
        id: "azow1-10",
        src: "/images/galerie/azowlisse-1/azowlisse-1-10.jpg",
        caption: "Clôture festive de la première édition de partage dans l'Ouémé",
        alt: "Clôture de la 1ère édition de partage à Azowlissè"
      }
    ]
  },
  {
    id: "azowlisse-2",
    title: "Deuxième édition de partage dans l’orphelinat Saint Dominique des sœurs oblates à Azowlissè dans le département de l’Ouémé au Bénin",
    shortTitle: "Orphelinat St Dominique (Azowlissè) - 2ème Édition",
    location: "Azowlissè",
    department: "Ouémé",
    edition: "2ème Édition",
    date: "Septembre 2026",
    badge: "Renforcement Ouémé & St Dominique",
    description: "Deuxième grande mission de soutien à l'orphelinat Saint Dominique : renforcement des stocks alimentaires, fournitures complémentaires, vérification des besoins médicaux et célébration du progrès des enfants.",
    photos: [
      {
        id: "azow2-1",
        src: "/images/galerie/azowlisse-2/azowlisse-2-1.jpg",
        caption: "Arrivée de la 2ème mission solidaire et déballage des provisions alimentaires",
        alt: "Deuxième édition de partage à l'orphelinat Saint Dominique d'Azowlissè"
      },
      {
        id: "azow2-2",
        src: "/images/galerie/azowlisse-2/azowlisse-2-2.jpg",
        caption: "Retrouvailles chaleureuses avec les enfants et les sœurs responsables",
        alt: "Retrouvailles fraternelles à Azowlissè - 2ème édition"
      },
      {
        id: "azow2-3",
        src: "/images/galerie/azowlisse-2/azowlisse-2-3.jpg",
        caption: "Distribution des colis de vêtements, chaussures et matériels éducatifs",
        alt: "Distribution de colis et vêtements aux pensionnaires"
      },
      {
        id: "azow2-4",
        src: "/images/galerie/azowlisse-2/azowlisse-2-4.jpg",
        caption: "Atelier de partage, écoute active et motivation pour la réussite des examens scolaires",
        alt: "Atelier de motivation et d'apprentissage à l'orphelinat"
      },
      {
        id: "azow2-5",
        src: "/images/galerie/azowlisse-2/azowlisse-2-5.jpg",
        caption: "Grande photo de famille témoignant de la persévérance et de la solidarité en action",
        alt: "Grande photo de famille 2ème édition Azowlissè"
      }
    ]
  }
];

