// Pure data types & default content — kept separate from content.tsx
// (the React context) so that src/lib/db.ts can import them without
// creating a circular dependency between the database layer and the
// React state layer.

export interface ValueItem {
  id: string;
  label: string;
  desc: string;
}

export interface PracticeItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface ExperienceItem {
  id: string;
  title: string;
  org: string;
  detail: string;
}

export interface PublicationItem {
  id: string;
  type: string;
  icon: string;
  title: string;
  titleAr?: string;
  meta: string;
  coverImage?: string;
  isbn?: string;
  price?: string;
  description?: string;
  fullContent?: string;
}

export interface ReservationItem {
  id: string;
  publicationId: string;
  publicationTitle: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  clientAddress: string;
  quantity: number;
  status: 'pending' | 'confirmed' | 'delivered' | 'cancelled';
  notes?: string;
  createdAt: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  large?: boolean;
  category?: 'moscow' | 'court' | 'events' | string;
}

export interface ClientItem {
  id: string;
  name: string;
}

export interface SiteContent {
  brandName: string;
  brandTagline: string;
  heroFirstName: string;
  heroLastName: string;
  heroSubtitle: string;
  heroPortrait: string;
  ctaPrimary: string;
  ctaSecondary: string;

  phone: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  linkedinUrl: string;
  linkedinLabel: string;

  aboutEyebrow: string;
  aboutTitleLine1: string;
  aboutTitleLine2: string;
  aboutLead: string;
  aboutHighlight: string;
  aboutParagraph1: string;
  aboutParagraph2: string;
  aboutPhoto: string;
  aboutQuote: string;
  values: ValueItem[];

  practiceIntro: string;
  practiceAreas: PracticeItem[];

  experienceIntro: string;
  experiences: ExperienceItem[];

  internationalIntro: string;
  gallery: GalleryImage[];

  publicationsIntro: string;
  publications: PublicationItem[];
  reservations: ReservationItem[];

  clients: ClientItem[];

  contactIntro: string;
  footerTagline: string;
}

// ─────────────────────────────────────────────────────────────────
// Default content — mirrors the original hard-coded copy. Used to
// seed the SQLite database, and as the local fallback.
// ─────────────────────────────────────────────────────────────────
export const DEFAULT_CONTENT: SiteContent = {
  brandName: 'LAHMADI',
  brandTagline: 'Avocat près la Cour de Cassation',
  heroFirstName: 'Ramzi',
  heroLastName: 'Lahmadi',
  heroSubtitle:
    "Avocat près la Cour de cassation · +20 ans d’expérience\nDroit des sociétés · Droit pénal privé · Contentieux & Médiation",
  heroPortrait: '/images/ramzi-portrait.jpg',
  ctaPrimary: 'Prendre rendez-vous',
  ctaSecondary: 'Découvrir le cabinet',

  phone: '+216 97 89 28 74',
  email: 'contact.ramzilahmadi@gmail.com',
  addressLine1: 'Immeuble Star — Complexe Esplanade, 1er étage,',
  addressLine2: 'Bureau N — Monastir 5000',
  linkedinUrl: '#',
  linkedinLabel: 'LinkedIn — Ramzi Lahmadi',

  aboutEyebrow: 'Cabinet & Équipe',
  aboutTitleLine1: 'Maître Ramzi Lahmadi',
  aboutTitleLine2: "Avocat près la Cour de cassation",
  aboutLead:
    "Maître Ramzi Lahmadi, Avocat près la Cour de cassation cumulant plus de 20 ans d'expérience, met son savoir-faire stratégique au service de la défense",
  aboutHighlight: "d'élite, hautement rigoureuse et axée sur les résultats",
  aboutParagraph1:
    "Inscrit au barreau et titulaire du Certificat d'Aptitude à la Profession d'Avocat (CAPA) depuis 2005, diplômé d'un Master et d'études approfondies en droit privé, Maître Ramzi Lahmadi cumule plus de deux décennies d'exercice au plus haut niveau de juridiction.",
  aboutParagraph2:
    "Le cabinet s'appuie sur une structure solide et réactive comprenant 2 avocats assistants collaborateurs et 4 secrétaires juridiques, permettant un suivi personnalisé de chaque dossier tant en contentieux qu'en médiation et règlement amiable.",
  aboutPhoto: '/images/ramzi-about.jpg',
  aboutQuote:
    '« Plus de 20 ans de rigueur juridique et de dévouement au service de la justice et de vos intérêts. »',
  values: [
    { id: 'v1', label: "20+ Ans d'Expérience", desc: "Avocat près la Cour de cassation depuis 2005, CAPA, Master & études approfondies en droit privé." },
    { id: 'v2', label: 'Équipe Dédiée', desc: 'Un cabinet structuré avec 2 avocats assistants et 4 secrétaires pour un suivi constant.' },
    { id: 'v3', label: 'Médiation & Contentieux', desc: 'Spécialiste en Droit des sociétés, Droit pénal privé et règlement amiable des différends.' },
  ],

  practiceIntro:
    "Domaines d'intervention privilégiés s'appuyant sur plus de 20 ans de pratique et la maîtrise des procédures de Cassation.",
  practiceAreas: [
    {
      id: 'p1',
      icon: 'Briefcase',
      title: 'Droit des Sociétés & des Affaires',
      description:
        "Conseil stratégique, création, restructuration d'entreprises, gouvernance sociale, contrats commerciaux complexes et contentieux des affaires.",
    },
    {
      id: 'p2',
      icon: 'Shield',
      title: 'Droit Pénal Privé',
      description:
        'Défense pénaliste d\'excellence, infractions financières, droit pénal des affaires et représentation devant les juridictions criminelles et de cassation.',
    },
    {
      id: 'p3',
      icon: 'Scale',
      title: 'Contentieux & Cour de Cassation',
      description:
        'Représentation au plus haut degré de juridiction (Cour de Cassation), pourvoi, révision et gestion des litiges civils et commerciaux complexes.',
    },
    {
      id: 'p4',
      icon: 'Users',
      title: 'Médiation & Règlement Amiable',
      description:
        'Résolution alternative des différends, négociations transactionnelles et conciliation pour éviter ou clore rapidement les procédures judiciaires.',
    },
  ],

  experienceIntro:
    "Chronologie et parcours d'excellence académique et professionnelle.",
  experiences: [
    { id: 'e1', title: 'Avocat près la Cour de cassation', org: 'Ordre National des Avocats de Tunisie', detail: 'Grade suprême du barreau — plus de 20 ans d\'expérience d\'exercice continu.' },
    { id: 'e2', title: 'Certificat d\'Aptitude à la Profession d\'Avocat (CAPA)', org: 'Session 2005', detail: 'Prestation de serment et inscription au tableau de l\'Ordre des Avocats.' },
    { id: 'e3', title: 'Master + Études Approfondies en Droit Privé', org: 'Faculté de Droit', detail: 'Spécialisation universitaire de haut niveau en droit des affaires et contentieux.' },
    { id: 'e4', title: 'Direction du Cabinet & Équipe', org: 'Cabinet Maître Ramzi Lahmadi', detail: 'Équipe permanente : 2 avocats assistants + 4 secrétaires juridiques.' },
  ],

  internationalIntro:
    "Rayonnement et interventions du cabinet en Tunisie et à l'international.",
  gallery: [
    { id: 'g1', src: '/images/ramzi-portrait.jpg', alt: 'Maître Ramzi Lahmadi — Portrait officiel', category: 'court', large: true },
    { id: 'g2', src: '/images/ramzi-about.jpg', alt: "Maître Ramzi Lahmadi — Cabinet d'avocat", category: 'court' },
    { id: 'g3', src: '/images/ramzi-presentation.jpg', alt: 'Maître Ramzi Lahmadi — Conférence juridique', category: 'events' },
  ],

  publicationsIntro: '',
  publications: [],
  reservations: [],

  clients: [
    { id: 'c1', name: 'Entreprises & PME' },
    { id: 'c2', name: 'Particuliers & Familles' },
    { id: 'c3', name: 'Associations & ONG' },
    { id: 'c4', name: 'Institutionnels & Collectivités' },
  ],

  contactIntro:
    "Le cabinet vous reçoit sur rendez-vous à Monastir. Pour toute demande de consultation ou d'information, n'hésitez pas à nous contacter.",
  footerTagline: '« La rigueur est la marque du droit. »',
};

export function uid(prefix = 'id'): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}
