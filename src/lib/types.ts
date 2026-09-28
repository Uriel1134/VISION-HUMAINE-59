export interface PillarItem {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  iconName: string;
  color: string;
  badge: string;
  actions: string[];
  impactStats: {
    label: string;
    value: string;
  }[];
  image: string;
}

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string[];
  date: string;
  category: string;
  readTime: string;
  author: string;
  image: string;
  tags: string[];
}

export interface Partner {
  id: string;
  name: string;
  category: 'orphelinat' | 'ecole' | 'sante' | 'mecenat' | 'association';
  location: string;
  description: string;
  badge: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  location: string;
  image?: string;
}

export interface DonationOption {
  amount: number;
  amountFCFA: number;
  impactText: string;
  badge?: string;
}

export interface GalleryPhoto {
  id: string;
  src: string;
  caption: string;
  alt: string;
}

export interface GalleryProject {
  id: string;
  title: string;
  shortTitle: string;
  location: string;
  department: string;
  edition: string;
  date: string;
  description: string;
  badge: string;
  photos: GalleryPhoto[];
}

