import { PillarItem, NewsArticle, Partner, Testimonial, DonationOption, GalleryProject } from './types';


export const NGO_INFO = {
  name: "VISION HUMAINE 59",
  acronym: "VH59",
  tagline: "Ensemble, semons l'espoir et cultivons l'avenir.",
  vision: "Améliorer durablement les conditions de vie des enfants en situation précaire en Afrique grâce à des actions humanitaires, éducatives et sanitaires concertées.",
  description: "VISION HUMAINE 59 est une association humanitaire engagée pour apporter un soutien concret, mesurable et pérenne aux enfants les plus vulnérables ainsi qu'à leurs communautés locales.",
  siegeFrance: "Cambrai, 59400 France",
  annexeBenin: "Cotonou, Tchankpamè",
  address: "Siège : Cambrai, 59400 France | Annexe : Cotonou, Tchankpamè",
  phone: "+33 6 40 90 88 91",
  phoneRaw: "+33640908891",
  phoneDisplay: "+33 6 40 90 88 91",
  email: "contact@vision-humaine59.com",
  whatsappUrl: "https://wa.me/33640908891?text=Bonjour%20VISION%20HUMAINE%2059,%20je%20souhaite%20vous%20contacter",
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
    id: "glo-djigbe-2",
    title: "Deuxième édition de partage dans l’orphelinat Demeure d’Amour, du docteur Léon Sacramento à Glo-Djigbé",
    shortTitle: "Orphelinat Demeure d'Amour - 2ème Édition",
    location: "Glo-Djigbé",
    department: "Atlantique",
    edition: "2ème Édition",
    date: "Octobre 2026",
    badge: "Orphelinat Dr Léon Sacramento",
    description: "Deuxième mission de soutien humanitaire et de distribution de vivres, kits et matériels essentiels à l’orphelinat Demeure d’Amour du docteur Léon Sacramento à Glo-Djigbé au Bénin.",
    photos: [
      {
        id: "glo2-1",
        src: "/images/galerie/glo-djigbe-2/glo-djigbe-2-1.jpeg",
        caption: "Arrivée et déchargement des vivres et dons pour les pensionnaires de l'orphelinat",
        alt: "Deuxième édition de partage à l'orphelinat Demeure d'amour Glo-Djigbé"
      },
      {
        id: "glo2-2",
        src: "/images/galerie/glo-djigbe-2/glo-djigbe-2-2.jpeg",
        caption: "Accueil chaleureux des enfants et présentation des actions de la journée",
        alt: "Accueil des enfants orphelins à Glo-Djigbé"
      },
      {
        id: "glo2-3",
        src: "/images/galerie/glo-djigbe-2/glo-djigbe-2-3.jpeg",
        caption: "Mise en place des tables de dons et préparation de la remise solennelle",
        alt: "Préparation des dons à l'orphelinat Demeure d'amour"
      },
      {
        id: "glo2-4",
        src: "/images/galerie/glo-djigbe-2/glo-djigbe-2-4.jpeg",
        caption: "Distribution des denrées alimentaires et produits de première nécessité",
        alt: "Distribution alimentaire aux enfants"
      },
      {
        id: "glo2-5",
        src: "/images/galerie/glo-djigbe-2/glo-djigbe-2-5.jpeg",
        caption: "Remise personnalisée des fournitures et paquets aux pensionnaires",
        alt: "Remise de fournitures aux orphelins"
      },
      {
        id: "glo2-6",
        src: "/images/galerie/glo-djigbe-2/glo-djigbe-2-6.jpeg",
        caption: "Échanges bienveillants entre les bénévoles de VH59 et les enfants",
        alt: "Bénévoles avec les enfants à Glo-Djigbé"
      },
      {
        id: "glo2-7",
        src: "/images/galerie/glo-djigbe-2/glo-djigbe-2-7.jpeg",
        caption: "Sourires et joie partagée lors de la remise des dons d'amour",
        alt: "Sourires des enfants de l'orphelinat"
      },
      {
        id: "glo2-8",
        src: "/images/galerie/glo-djigbe-2/glo-djigbe-2-8.jpeg",
        caption: "Moments fraternels au sein de la cour de l'orphelinat Demeure d'Amour",
        alt: "Moments fraternels à Glo-Djigbé"
      },
      {
        id: "glo2-9",
        src: "/images/galerie/glo-djigbe-2/glo-djigbe-2-9.jpeg",
        caption: "Distribution des vêtements et chaussures collectés pour les enfants",
        alt: "Distribution de vêtements à l'orphelinat"
      },
      {
        id: "glo2-10",
        src: "/images/galerie/glo-djigbe-2/glo-djigbe-2-10.jpeg",
        caption: "Coordination et organisation sur le terrain avec l'équipe dirigeante du centre",
        alt: "Équipe VH59 et responsables de l'orphelinat"
      },
      {
        id: "glo2-11",
        src: "/images/galerie/glo-djigbe-2/glo-djigbe-2-11.jpeg",
        caption: "Accompagnement attentif des plus jeunes pensionnaires",
        alt: "Accompagnement des tout-petits à Glo-Djigbé"
      },
      {
        id: "glo2-12",
        src: "/images/galerie/glo-djigbe-2/glo-djigbe-2-12.jpeg",
        caption: "Vérification et affectation des colis de soutien humanitaire",
        alt: "Vérification des dotations humanitaires"
      },
      {
        id: "glo2-13",
        src: "/images/galerie/glo-djigbe-2/glo-djigbe-2-13.jpeg",
        caption: "Regard complice et remerciements chaleureux des encadrants",
        alt: "Remerciements des encadrants de l'orphelinat"
      },
      {
        id: "glo2-14",
        src: "/images/galerie/glo-djigbe-2/glo-djigbe-2-14.jpeg",
        caption: "Immersion et communion au cœur des espaces de vie de l'orphelinat",
        alt: "Immersion au sein de l'orphelinat"
      },
      {
        id: "glo2-15",
        src: "/images/galerie/glo-djigbe-2/glo-djigbe-2-15.jpeg",
        caption: "Échange fraternel avec le personnel soignant et éducatif",
        alt: "Échange avec les éducateurs"
      },
      {
        id: "glo2-16",
        src: "/images/galerie/glo-djigbe-2/glo-djigbe-2-16.jpeg",
        caption: "Partage de repas et de collations avec tous les enfants",
        alt: "Partage de collation avec les orphelins"
      },
      {
        id: "glo2-17",
        src: "/images/galerie/glo-djigbe-2/glo-djigbe-2-17.jpeg",
        caption: "Présentation des progrès accomplis depuis la 1ère édition",
        alt: "Suivi des progrès des enfants"
      },
      {
        id: "glo2-18",
        src: "/images/galerie/glo-djigbe-2/glo-djigbe-2-18.jpeg",
        caption: "Instant d'encouragement et bénédiction partagée avec les volontaires",
        alt: "Moment d'encouragement solidaire"
      },
      {
        id: "glo2-19",
        src: "/images/galerie/glo-djigbe-2/glo-djigbe-2-19.jpeg",
        caption: "Portrait de groupe des enfants avec leurs nouveaux équipements",
        alt: "Groupe des enfants à Glo-Djigbé"
      },
      {
        id: "glo2-20",
        src: "/images/galerie/glo-djigbe-2/glo-djigbe-2-20.jpeg",
        caption: "Grande photo collective immortalisant cette magnifique 2ème édition à Glo-Djigbé",
        alt: "Photo finale 2ème édition orphelinat Demeure d'amour"
      }
    ]
  },
  {
    id: "glo-djigbe-3",
    title: "Troisième édition de partage dans l’orphelinat du docteur Léon Sacramento à Glo-Djigbé au Bénin",
    shortTitle: "Orphelinat Demeure d'Amour - 3ème Édition",
    location: "Glo-Djigbé",
    department: "Atlantique",
    edition: "3ème Édition",
    date: "Octobre 2026",
    badge: "Orphelinat Dr Léon Sacramento",
    description: "Troisième vague de solidarité et d'accompagnement pérenne à l’orphelinat Demeure d’Amour à Glo-Djigbé : appui nutritionnel renforcé, fournitures et soutien continu aux enfants.",
    photos: [
      {
        id: "glo3-1",
        src: "/images/galerie/glo-djigbe-3/glo-djigbe-3-1.jpeg",
        caption: "Arrivée de la 3ème délégation VH59 à l'orphelinat du Dr Léon Sacramento",
        alt: "Troisième édition de partage à Glo-Djigbé"
      },
      {
        id: "glo3-2",
        src: "/images/galerie/glo-djigbe-3/glo-djigbe-3-2.jpeg",
        caption: "Déploiement des stocks de vivres et dotations matérielles",
        alt: "Stocks de vivres pour les orphelins"
      },
      {
        id: "glo3-3",
        src: "/images/galerie/glo-djigbe-3/glo-djigbe-3-3.jpeg",
        caption: "Remise officielle et distribution aux jeunes pensionnaires",
        alt: "Distribution des dons 3ème édition"
      },
      {
        id: "glo3-4",
        src: "/images/galerie/glo-djigbe-3/glo-djigbe-3-4.jpeg",
        caption: "Dialogue chaleureux avec les responsables de l'orphelinat",
        alt: "Échanges avec la direction de l'orphelinat"
      },
      {
        id: "glo3-5",
        src: "/images/galerie/glo-djigbe-3/glo-djigbe-3-5.jpeg",
        caption: "Atelier et moment d'animation récréative avec les enfants",
        alt: "Animation avec les enfants à Glo-Djigbé"
      },
      {
        id: "glo3-6",
        src: "/images/galerie/glo-djigbe-3/glo-djigbe-3-6.jpeg",
        caption: "Soutien affectif et prise en charge des besoins urgents",
        alt: "Soutien fraternel aux orphelins"
      },
      {
        id: "glo3-7",
        src: "/images/galerie/glo-djigbe-3/glo-djigbe-3-7.jpeg",
        caption: "Photo de clôture scellant la fidélité de notre soutien à l'orphelinat de Glo-Djigbé",
        alt: "Photo souvenir 3ème édition Glo-Djigbé"
      }
    ]
  },
  {
    id: "dassa-3",
    title: "Mission de partage dans le département des Collines à Dassa-Zoumè",
    shortTitle: "Dassa-Zoumè (Collines) - Mission Vêtements",
    location: "Dassa-Zoumè",
    department: "Collines",
    edition: "Édition Collines",
    date: "Septembre 2026",
    badge: "Habits & Jouets",
    description: "Mission solidaire dans le département des Collines : distribution de vêtements, habits et jouets aux enfants et familles pour leur apporter réconfort et dignité.",
    photos: [
      {
        id: "dassa3-1",
        src: "/images/galerie/dassa-3/dassa-3-1.jpg",
        caption: "Remise officielle et distribution de vêtements, habits et jouets aux enfants et familles de Dassa-Zoumè",
        alt: "Distribution de vêtements et jouets à Dassa-Zoumè dans les Collines"
      }
    ]
  },
  {
    id: "dassa-4",
    title: "Quatrième édition de partage à Dassa-Zoumè dans le département des Collines au Bénin",
    shortTitle: "Dassa-Zoumè (Collines) - 4ème Édition",
    location: "Dassa-Zoumè",
    department: "Collines",
    edition: "4ème Édition",
    date: "Octobre 2026",
    badge: "4ème Édition Collines",
    description: "Quatrième grande édition de solidarité au cœur du département des Collines à Dassa-Zoumè : distribution massive de vivres, kits scolaires, habits et renforcement du soutien communautaire.",
    photos: [
      {
        id: "dassa4-1",
        src: "/images/galerie/dassa-4/dassa-4-1.jpeg",
        caption: "Rassemblement solidaire au cœur de la commune de Dassa-Zoumè",
        alt: "Quatrième édition de partage à Dassa-Zoumè"
      },
      {
        id: "dassa4-2",
        src: "/images/galerie/dassa-4/dassa-4-2.jpeg",
        caption: "Présentation des dotations alimentaires et fournitures scolaires",
        alt: "Dotations scolaires et vivres à Dassa-Zoumè"
      },
      {
        id: "dassa4-3",
        src: "/images/galerie/dassa-4/dassa-4-3.jpeg",
        caption: "Distribution des kits scolaires aux écoliers des Collines",
        alt: "Distribution de kits scolaires à Dassa"
      },
      {
        id: "dassa4-4",
        src: "/images/galerie/dassa-4/dassa-4-4.jpeg",
        caption: "Mise à disposition des colis de vivres aux familles vulnérables",
        alt: "Colis de vivres pour les familles"
      },
      {
        id: "dassa4-5",
        src: "/images/galerie/dassa-4/dassa-4-5.jpeg",
        caption: "Remise de vêtements et chaussures pour les enfants défavorisés",
        alt: "Remise d'habits aux enfants des Collines"
      },
      {
        id: "dassa4-6",
        src: "/images/galerie/dassa-4/dassa-4-6.jpeg",
        caption: "Coordination active avec les responsables et représentants locaux",
        alt: "Coordination locale à Dassa-Zoumè"
      },
      {
        id: "dassa4-7",
        src: "/images/galerie/dassa-4/dassa-4-7.jpeg",
        caption: "Sourires rayonnants des écoliers bénéficiaires de la 4ème édition",
        alt: "Sourires des enfants bénéficiaires à Dassa"
      },
      {
        id: "dassa4-8",
        src: "/images/galerie/dassa-4/dassa-4-8.jpeg",
        caption: "Engagement indéfectible de nos bénévoles au contact des bénéficiaires",
        alt: "Bénévoles VH59 sur le terrain à Dassa"
      },
      {
        id: "dassa4-9",
        src: "/images/galerie/dassa-4/dassa-4-9.jpeg",
        caption: "Organisation méthodique de la file d'attente pour un partage équitable",
        alt: "Organisation de la distribution"
      },
      {
        id: "dassa4-10",
        src: "/images/galerie/dassa-4/dassa-4-10.jpeg",
        caption: "Témoignage de gratitude des mères de famille et des aînés",
        alt: "Gratitude des familles de Dassa-Zoumè"
      },
      {
        id: "dassa4-11",
        src: "/images/galerie/dassa-4/dassa-4-11.jpeg",
        caption: "Soutien éducatif et mots d'encouragement adressés aux écoliers",
        alt: "Encouragement scolaire aux enfants"
      },
      {
        id: "dassa4-12",
        src: "/images/galerie/dassa-4/dassa-4-12.jpeg",
        caption: "Vue générale de la cérémonie de remise solennelle des dons",
        alt: "Cérémonie de remise solennelle à Dassa"
      },
      {
        id: "dassa4-13",
        src: "/images/galerie/dassa-4/dassa-4-13.jpeg",
        caption: "Moments d'échange culturel et d'unité fraternelle dans les Collines",
        alt: "Unité fraternelle dans les Collines"
      },
      {
        id: "dassa4-14",
        src: "/images/galerie/dassa-4/dassa-4-14.jpeg",
        caption: "Photo souvenir d'ensemble de la 4ème édition de partage à Dassa-Zoumè",
        alt: "Photo souvenir 4ème édition Dassa-Zoumè"
      },
      {
        id: "dassa4-video-1",
        src: "/images/galerie/dassa-4/dassa-4-video-1.mp4",
        caption: "Reportage vidéo : Ambiance et remise des dons en direct à Dassa-Zoumè",
        alt: "Vidéo reportage 4ème édition Dassa-Zoumè",
        mediaType: "video"
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
    description: "Inauguration de notre partenariat humanitaire avec l'orphelinat Saint Dominique des Sœurs Oblates à Azowlissè. Dotation en vivres, produits d'hygiène, vêtements et kits éducatifs.",
    photos: [
      {
        id: "azow1-1",
        src: "/images/galerie/azowlisse-1/azowlisse-1-1.jpg",
        caption: "Présentation des dons matériels, vivres et équipements apportés à l'orphelinat",
        alt: "Première édition à l'orphelinat Saint Dominique d'Azowlissè"
      },
      {
        id: "azow1-4",
        src: "/images/galerie/azowlisse-1/azowlisse-1-4.jpg",
        caption: "Accueil chaleureux et concertation avec les Sœurs Oblates responsables du centre",
        alt: "Accueil par les Sœurs Oblates à Azowlissè"
      },
      {
        id: "azow1-6",
        src: "/images/galerie/azowlisse-1/azowlisse-1-6.jpg",
        caption: "Remise solennelle des dons matériels, jouets et fournitures aux pensionnaires",
        alt: "Remise des dons aux pensionnaires d'Azowlissè"
      },
      {
        id: "azow1-7",
        src: "/images/galerie/azowlisse-1/azowlisse-1-7.jpg",
        caption: "Rassemblement solidaire au centre de vie de l'orphelinat Saint Dominique",
        alt: "Vue d'ensemble de la distribution à Azowlissè"
      },
      {
        id: "azow1-9",
        src: "/images/galerie/azowlisse-1/azowlisse-1-9.jpg",
        caption: "Émouvant portrait de groupe scellant une amitié et un soutien indéfectible",
        alt: "Portrait de groupe avec les enfants et les sœurs d'Azowlissè"
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
        caption: "Distribution des colis de vêtements, chaussures et matériels de soutien",
        alt: "Distribution de colis et vêtements aux pensionnaires"
      },
      {
        id: "azow2-4",
        src: "/images/galerie/azowlisse-2/azowlisse-2-4.jpg",
        caption: "Grande photo de famille témoignant de la persévérance et de la solidarité en action",
        alt: "Grande photo de famille 2ème édition Azowlissè"
      }
    ]
  },
  {
    id: "stands-cambresis",
    title: "Les différents stands de l’association sur les marchés dans le Cambrésis pour faire connaître les produits locaux du Bénin",
    shortTitle: "Stands Marchés du Cambrésis",
    location: "Cambrésis (Nord)",
    department: "France / 59",
    edition: "Sensibilisation & Artisanat",
    date: "2026",
    badge: "Marchés & Produits Locaux du Bénin",
    description: "Présence active et engagée des bénévoles de VISION HUMAINE 59 sur les marchés du Cambrésis pour faire découvrir la richesse des produits du terroir béninois, sensibiliser le public et financer nos actions humanitaires.",
    photos: [
      {
        id: "stand-1",
        src: "/images/galerie/stands-cambresis/stand-cambresis-1.jpeg",
        caption: "Installation et mise en valeur du stand VISION HUMAINE 59 sur le marché",
        alt: "Stand solidaire de VISION HUMAINE 59 dans le Cambrésis"
      },
      {
        id: "stand-2",
        src: "/images/galerie/stands-cambresis/stand-cambresis-2.jpeg",
        caption: "Exposition des produits locaux et créations artisanales venues du Bénin",
        alt: "Produits locaux du Bénin sur le stand"
      },
      {
        id: "stand-3",
        src: "/images/galerie/stands-cambresis/stand-cambresis-3.jpeg",
        caption: "Accueil convivial des visiteurs et explications sur les projets humanitaires",
        alt: "Accueil des visiteurs sur le marché"
      },
      {
        id: "stand-4",
        src: "/images/galerie/stands-cambresis/stand-cambresis-4.jpeg",
        caption: "Présentation des épices, huiles et douceurs traditionnelles béninoises",
        alt: "Épices et produits du terroir béninois"
      },
      {
        id: "stand-5",
        src: "/images/galerie/stands-cambresis/stand-cambresis-5.jpeg",
        caption: "Mobilisation souriante de l'équipe de bénévoles du Nord de la France",
        alt: "Bénévoles VH59 sur le marché du Cambrésis"
      },
      {
        id: "stand-6",
        src: "/images/galerie/stands-cambresis/stand-cambresis-6.jpeg",
        caption: "Échanges chaleureux avec les passants et sensibilisation à nos actions",
        alt: "Sensibilisation du public aux actions de l'ONG"
      },
      {
        id: "stand-7",
        src: "/images/galerie/stands-cambresis/stand-cambresis-7.jpeg",
        caption: "Mise en avant du savoir-faire et de la culture béninoise",
        alt: "Valorisation de la culture et de l'artisanat du Bénin"
      },
      {
        id: "stand-8",
        src: "/images/galerie/stands-cambresis/stand-cambresis-8.jpeg",
        caption: "Stand aux couleurs de VISION HUMAINE 59 attirant curieux et bienfaiteurs",
        alt: "Stand solidaire animé"
      },
      {
        id: "stand-9",
        src: "/images/galerie/stands-cambresis/stand-cambresis-9.jpeg",
        caption: "Découverte des confections textiles et accessoires solidaires",
        alt: "Textiles et accessoires du Bénin"
      },
      {
        id: "stand-10",
        src: "/images/galerie/stands-cambresis/stand-cambresis-10.jpeg",
        caption: "Photo d'équipe des bénévoles de VISION HUMAINE 59 sur le stand du Cambrésis",
        alt: "Équipe VH59 réunie sur le stand du Cambrésis"
      },
      {
        id: "stand-11",
        src: "/images/galerie/stands-cambresis/stand-cambresis-11.jpeg",
        caption: "Table d'exposition des produits locaux, statuettes d'art et artisanat traditionnel du Bénin",
        alt: "Table d'exposition de produits et artisanat béninois"
      },
      {
        id: "stand-video-1",
        src: "/images/galerie/stands-cambresis/stand-cambresis-video-1.mp4",
        caption: "Vidéo immersion : Présentation animée du stand et des produits locaux du Bénin",
        alt: "Vidéo du stand associatif dans le Cambrésis",
        mediaType: "video"
      },
      {
        id: "stand-video-2",
        src: "/images/galerie/stands-cambresis/stand-cambresis-video-2.mp4",
        caption: "Vidéo reportage : Mobilisation de nos bénévoles et échanges avec le public",
        alt: "Vidéo de la mobilisation des bénévoles",
        mediaType: "video"
      }
    ]
  },
  {
    id: "entrepot-cotonou",
    title: "Entrepôt de tri des dons à Cotonou au Bénin par les membres de l’association VISION HUMAINE 59",
    shortTitle: "Entrepôt de Tri des Dons (Cotonou)",
    location: "Cotonou (Tchankpamè)",
    department: "Littoral",
    edition: "Logistique Terrain",
    date: "Octobre 2026",
    badge: "Logistique & Tri des Dons",
    description: "Phase essentielle de notre chaîne logistique : réception, déballage, contrôle rigoureux et tri minutieux des vêtements, fournitures et vivres par les membres dévoués de VISION HUMAINE 59 à Cotonou avant acheminement vers les orphelinats et communautés.",
    photos: [
      {
        id: "entrepot-1",
        src: "/images/galerie/entrepot-cotonou/entrepot-cotonou-1.jpeg",
        caption: "Arrivée et déchargement des cargaisons de dons à l'entrepôt de Cotonou",
        alt: "Arrivée des dons à l'entrepôt de Cotonou"
      },
      {
        id: "entrepot-2",
        src: "/images/galerie/entrepot-cotonou/entrepot-cotonou-2.jpeg",
        caption: "Organisation générale et préparation des espaces de tri et de stockage",
        alt: "Espace de tri à Cotonou"
      },
      {
        id: "entrepot-3",
        src: "/images/galerie/entrepot-cotonou/entrepot-cotonou-3.jpeg",
        caption: "Tri méthodique des vêtements par tranche d'âge et destination",
        alt: "Tri des vêtements par les bénévoles"
      },
      {
        id: "entrepot-4",
        src: "/images/galerie/entrepot-cotonou/entrepot-cotonou-4.jpeg",
        caption: "Contrôle qualité et vérification de l'état des fournitures collectées",
        alt: "Contrôle qualité des fournitures"
      },
      {
        id: "entrepot-5",
        src: "/images/galerie/entrepot-cotonou/entrepot-cotonou-5.jpeg",
        caption: "Membres de VISION HUMAINE 59 mobilisés pour le conditionnement",
        alt: "Membres VH59 au travail à l'entrepôt"
      },
      {
        id: "entrepot-6",
        src: "/images/galerie/entrepot-cotonou/entrepot-cotonou-6.jpeg",
        caption: "Empilement et étiquetage soigné des cartons de dotations",
        alt: "Cartons de dotations étiquetés"
      },
      {
        id: "entrepot-7",
        src: "/images/galerie/entrepot-cotonou/entrepot-cotonou-7.jpeg",
        caption: "Vérification des vivres non périssables avant distribution",
        alt: "Vérification des stocks alimentaires"
      },
      {
        id: "entrepot-8",
        src: "/images/galerie/entrepot-cotonou/entrepot-cotonou-8.jpeg",
        caption: "Mise sous sacs et emballages sécurisés pour le transport",
        alt: "Emballage sécurisé des dons"
      },
      {
        id: "entrepot-9",
        src: "/images/galerie/entrepot-cotonou/entrepot-cotonou-9.jpeg",
        caption: "Coordination logistique pour les convois vers Glo-Djigbé et Dassa",
        alt: "Coordination des convois humanitaires"
      },
      {
        id: "entrepot-10",
        src: "/images/galerie/entrepot-cotonou/entrepot-cotonou-10.jpeg",
        caption: "Ambiance solidaire et engagement sans faille des équipes locales",
        alt: "Équipes locales engagées à Cotonou"
      },
      {
        id: "entrepot-11",
        src: "/images/galerie/entrepot-cotonou/entrepot-cotonou-11.jpeg",
        caption: "Finalisation du chargement des colis humanitaires pour départ terrain",
        alt: "Chargement des colis humanitaires"
      },
      {
        id: "entrepot-12",
        src: "/images/galerie/entrepot-cotonou/entrepot-cotonou-12.jpeg",
        caption: "Vue générale de l'entrepôt de Cotonou prêt pour les distributions",
        alt: "Vue générale entrepôt Cotonou VISION HUMAINE 59"
      }
    ]
  }
];

