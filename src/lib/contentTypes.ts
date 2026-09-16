// Pure data types & default content — kept separate from content.tsx
// (the React context) so that src/lib/db.ts can import them without
// creating a circular dependency between the database layer and the
// React state layer.

export interface ValueItem {
  id: string;
  label: string;
  labelAr?: string;
  desc: string;
  descAr?: string;
}

export interface PracticeItem {
  id: string;
  icon: string;
  title: string;
  titleAr?: string;
  description: string;
  descriptionAr?: string;
}

export interface ExperienceItem {
  id: string;
  title: string;
  titleAr?: string;
  org: string;
  orgAr?: string;
  detail: string;
  detailAr?: string;
}

export interface PublicationItem {
  id: string;
  type: string;
  typeAr?: string;
  icon: string;
  title: string;
  titleAr?: string;
  meta: string;
  metaAr?: string;
  coverImage?: string;
  isbn?: string;
  price?: string;
  description?: string;
  descriptionAr?: string;
  fullContent?: string;
  fullContentAr?: string;
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
  altAr?: string;
  large?: boolean;
  category?: 'moscow' | 'court' | 'events' | string;
}

export interface ClientItem {
  id: string;
  name: string;
  nameAr?: string;
}

export interface SiteContent {
  brandName: string;
  brandNameAr?: string;
  brandTagline: string;
  brandTaglineAr?: string;
  heroFirstName: string;
  heroFirstNameAr?: string;
  heroLastName: string;
  heroLastNameAr?: string;
  heroSubtitle: string;
  heroSubtitleAr?: string;
  heroPortrait: string;
  ctaPrimary: string;
  ctaPrimaryAr?: string;
  ctaSecondary: string;
  ctaSecondaryAr?: string;

  phone: string;
  email: string;
  addressLine1: string;
  addressLine1Ar?: string;
  addressLine2: string;
  addressLine2Ar?: string;
  linkedinUrl: string;
  linkedinLabel: string;
  linkedinLabelAr?: string;

  aboutEyebrow: string;
  aboutEyebrowAr?: string;
  aboutTitleLine1: string;
  aboutTitleLine1Ar?: string;
  aboutTitleLine2: string;
  aboutTitleLine2Ar?: string;
  aboutLead: string;
  aboutLeadAr?: string;
  aboutHighlight: string;
  aboutHighlightAr?: string;
  aboutParagraph1: string;
  aboutParagraph1Ar?: string;
  aboutParagraph2: string;
  aboutParagraph2Ar?: string;
  aboutPhoto: string;
  aboutQuote: string;
  aboutQuoteAr?: string;
  values: ValueItem[];

  practiceIntro: string;
  practiceIntroAr?: string;
  practiceAreas: PracticeItem[];

  experienceIntro: string;
  experienceIntroAr?: string;
  experiences: ExperienceItem[];

  internationalIntro: string;
  internationalIntroAr?: string;
  gallery: GalleryImage[];

  publicationsIntro: string;
  publicationsIntroAr?: string;
  publications: PublicationItem[];
  reservations: ReservationItem[];

  clients: ClientItem[];

  contactIntro: string;
  contactIntroAr?: string;
  footerTagline: string;
  footerTaglineAr?: string;
}

// ─────────────────────────────────────────────────────────────────
// Default content — mirrors the original hard-coded copy. Used to
// seed the SQLite database, and as the local fallback.
// ─────────────────────────────────────────────────────────────────
export const DEFAULT_CONTENT: SiteContent = {
  brandName: 'LAHMADI',
  brandNameAr: 'الحمادي',
  brandTagline: 'Avocat près la Cour de Cassation',
  brandTaglineAr: 'محام لدى التعقيب',
  heroFirstName: 'Ramzi',
  heroFirstNameAr: 'رمزي',
  heroLastName: 'Lahmadi',
  heroLastNameAr: 'الحمادي',
  heroSubtitle:
    "Avocat près la Cour de cassation · +20 ans d’expérience\nDroit des sociétés · Droit pénal privé · Contentieux & Médiation",
  heroSubtitleAr:
    "محام لدى التعقيب · أكثر من 20 سنة خبرة\nقانون الشركات · القانون الجزائي الخاص · النزاعات والوساطة",
  heroPortrait: '/images/ramzi-portrait.jpg',
  ctaPrimary: 'Prendre rendez-vous',
  ctaPrimaryAr: 'حجز موعد',
  ctaSecondary: 'Découvrir le cabinet',
  ctaSecondaryAr: 'اكتشف المكتب',

  phone: '+216 97 89 28 74',
  email: 'contact.ramzilahmadi@gmail.com',
  addressLine1: 'Immeuble Star — Complexe Esplanade, 1er étage,',
  addressLine1Ar: 'عمارة ستار — مركب إسبلاناد، الطابق الأول،',
  addressLine2: 'Bureau N — Monastir 5000',
  addressLine2Ar: 'مكتب N — المنستير 5000',
  linkedinUrl: '#',
  linkedinLabel: 'LinkedIn — Ramzi Lahmadi',
  linkedinLabelAr: 'لينكد إن — رمزي الحمادي',

  aboutEyebrow: 'Cabinet & Équipe',
  aboutEyebrowAr: 'المكتب وفريق العمل',
  aboutTitleLine1: 'Maître Ramzi Lahmadi',
  aboutTitleLine1Ar: 'الأستاذ رمزي الحمادي',
  aboutTitleLine2: "Avocat près la Cour de cassation",
  aboutTitleLine2Ar: 'محام لدى التعقيب',
  aboutLead:
    "Maître Ramzi Lahmadi, Avocat près la Cour de cassation cumulant plus de 20 ans d'expérience, met son savoir-faire stratégique au service de la défense",
  aboutLeadAr:
    "يضع الأستاذ رمزي الحمادي، المحامي لدى التعقيب بخبرة تتجاوز 20 عاماً، خبرته الاستراتيجية في خدمة الدفاع",
  aboutHighlight: "d'élite, hautement rigoureuse et axée sur les résultats",
  aboutHighlightAr: "النخبوي، بصرامة عالية وتركيز على النتائج",
  aboutParagraph1:
    "Inscrit au barreau et titulaire du Certificat d'Aptitude à la Profession d'Avocat (CAPA) depuis 2005, diplômé d'un Master et d'études approfondies en droit privé, Maître Ramzi Lahmadi cumule plus de deux décennies d'exercice au plus haut niveau de juridiction.",
  aboutParagraph1Ar:
    "مرسم بالهيئة الوطنية للمحامين ومتحصل على شهادة الكفاءة لمهنة المحاماة منذ 2005، وحاصل على الماجستير والدراسات المعمقة في القانون الخاص، يجمع الأستاذ رمزي الحمادي أكثر من عقدين من الممارسة في أعلى درجات التقاضي.",
  aboutParagraph2:
    "Le cabinet s'appuie sur une structure solide et réactive comprenant 2 avocats assistants collaborateurs et 4 secrétaires juridiques, permettant un suivi personnalisé de chaque dossier tant en contentieux qu'en médiation et règlement amiable.",
  aboutParagraph2Ar:
    "يعتمد المكتب على هيكل صلب ومتجاوب يضم محاميين مساعدين و4 كتاب قانونيين، مما يسمح بمتابعة شخصية لكل ملف سواء في النزاعات أو الوساطة والتسوية الودية.",
  aboutPhoto: '/images/ramzi-about.jpg',
  aboutQuote:
    '« Plus de 20 ans de rigueur juridique et de dévouement au service de la justice et de vos intérêts. »',
  aboutQuoteAr:
    '« أكثر من 20 عاماً من الصرامة القانونية والتفاني في خدمة العدالة ومصالحكم. »',
  values: [
    { id: 'v1', label: "20+ Ans d'Expérience", labelAr: "20+ سنة خبرة", desc: "Avocat près la Cour de cassation depuis 2005, CAPA, Master & études approfondies en droit privé.", descAr: "محام لدى التعقيب منذ 2005، شهادة الكفاءة لمهنة المحاماة، ماجستير ودراسات معمقة في القانون الخاص." },
    { id: 'v2', label: 'Équipe Dédiée', labelAr: "فريق متخصص", desc: 'Un cabinet structuré avec 2 avocats assistants et 4 secrétaires pour un suivi constant.', descAr: "مكتب منظم يضم محاميين مساعدين و4 كتاب لمتابعة مستمرة." },
    { id: 'v3', label: 'Médiation & Contentieux', labelAr: "الوساطة والنزاعات", desc: 'Spécialiste en Droit des sociétés, Droit pénal privé et règlement amiable des différends.', descAr: "متخصص في قانون الشركات، القانون الجزائي الخاص والتسوية الودية للنزاعات." },
  ],

  practiceIntro:
    "Domaines d'intervention privilégiés s'appuyant sur plus de 20 ans de pratique et la maîtrise des procédures de Cassation.",
  practiceIntroAr:
    "مجالات التدخل المفضلة بالاستناد إلى أكثر من 20 عاماً من الممارسة والتمكن من إجراءات التعقيب.",
  practiceAreas: [
    {
      id: 'p1',
      icon: 'Briefcase',
      title: 'Droit des Sociétés & des Affaires',
      titleAr: 'قانون الشركات والأعمال',
      description:
        "Conseil stratégique, création, restructuration d'entreprises, gouvernance sociale, contrats commerciaux complexes et contentieux des affaires.",
      descriptionAr:
        "الاستشارة الاستراتيجية، تأسيس وإعادة هيكلة الشركات، الحوكمة، العقود التجارية المعقدة ونزاعات الأعمال.",
    },
    {
      id: 'p2',
      icon: 'Shield',
      title: 'Droit Pénal Privé',
      titleAr: 'القانون الجزائي الخاص',
      description:
        "Défense pénaliste d'excellence, infractions financières, droit pénal des affaires et représentation devant les juridictions criminelles et de cassation.",
      descriptionAr:
        "دفاع جزائي متميز، الجرائم المالية، القانون الجزائي للأعمال والتمثيل أمام المحاكم الجنائية والتعقيب.",
    },
    {
      id: 'p3',
      icon: 'Scale',
      title: 'Contentieux & Cour de Cassation',
      titleAr: 'النزاعات ومحكمة التعقيب',
      description:
        'Représentation au plus haut degré de juridiction (Cour de Cassation), pourvoi, révision et gestion des litiges civils et commerciaux complexes.',
      descriptionAr:
        "التمثيل في أعلى درجات التقاضي (محكمة التعقيب)، الطعن، المراجعة وإدارة النزاعات المدنية والتجارية المعقدة.",
    },
    {
      id: 'p4',
      icon: 'Users',
      title: 'Médiation & Règlement Amiable',
      titleAr: 'الوساطة والتسوية الودية',
      description:
        'Résolution alternative des différends, négociations transactionnelles et conciliation pour éviter ou clore rapidement les procédures judiciaires.',
      descriptionAr:
        "الحلول البديلة للنزاعات، المفاوضات والصلح لتجنب أو إنهاء الإجراءات القضائية بسرعة.",
    },
  ],

  experienceIntro:
    "Chronologie et parcours d'excellence académique et professionnelle.",
  experienceIntroAr:
    "التسلسل الزمني ومسار التميز الأكاديمي والمهني.",
  experiences: [
    { id: 'e1', title: 'Avocat près la Cour de cassation', titleAr: 'محام لدى التعقيب', org: 'Ordre National des Avocats de Tunisie', orgAr: 'الهيئة الوطنية للمحامين بتونس', detail: "Grade suprême du barreau — plus de 20 ans d'exercice continu.", detailAr: 'أعلى رتبة في المحاماة — أكثر من 20 عاماً من الممارسة المستمرة.' },
    { id: 'e2', title: "Certificat d'Aptitude à la Profession d'Avocat (CAPA)", titleAr: 'شهادة الكفاءة لمهنة المحاماة', org: 'Session 2005', orgAr: 'دورة 2005', detail: "Prestation de serment et inscription au tableau de l'Ordre des Avocats.", detailAr: 'أداء اليمين والترسيم بجدول الهيئة الوطنية للمحامين.' },
    { id: 'e3', title: 'Master + Études Approfondies en Droit Privé', titleAr: 'ماجستير ودراسات معمقة في القانون الخاص', org: 'Faculté de Droit', orgAr: 'كلية الحقوق', detail: 'Spécialisation universitaire de haut niveau en droit des affaires et contentieux.', detailAr: 'تخصص جامعي عالي المستوى في قانون الأعمال والنزاعات.' },
    { id: 'e4', title: 'Direction du Cabinet & Équipe', titleAr: 'إدارة المكتب وفريق العمل', org: 'Cabinet Maître Ramzi Lahmadi', orgAr: 'مكتب الأستاذ رمزي الحمادي', detail: 'Équipe permanente : 2 avocats assistants + 4 secrétaires juridiques.', detailAr: 'فريق دائم: محاميان مساعدان + 4 كتاب قانونيين.' },
  ],

  internationalIntro:
    "Rayonnement et interventions du cabinet en Tunisie et à l'international.",
  internationalIntroAr:
    "إشعاع وتدخلات المكتب في تونس وعلى الصعيد الدولي.",
  gallery: [
    { id: 'g1', src: '/images/ramzi-portrait.jpg', alt: 'Maître Ramzi Lahmadi — Portrait officiel', altAr: 'الأستاذ رمزي الحمادي — صورة رسمية', category: 'court', large: true },
    { id: 'g2', src: '/images/ramzi-about.jpg', alt: "Maître Ramzi Lahmadi — Cabinet d'avocat", altAr: 'الأستاذ رمزي الحمادي — مكتب المحاماة', category: 'court' },
    { id: 'g3', src: '/images/ramzi-presentation.jpg', alt: 'Maître Ramzi Lahmadi — Conférence juridique', altAr: 'الأستاذ رمزي الحمادي — مؤتمر قانوني', category: 'events' },
  ],

  publicationsIntro: '',
  publicationsIntroAr: '',
  publications: [],
  reservations: [],

  clients: [
    { id: 'c1', name: 'Entreprises & PME', nameAr: 'الشركات والمؤسسات الصغيرة والمتوسطة' },
    { id: 'c2', name: 'Particuliers & Familles', nameAr: 'الأفراد والعائلات' },
    { id: 'c3', name: 'Associations & ONG', nameAr: 'الجمعيات والمنظمات' },
    { id: 'c4', name: 'Institutionnels & Collectivités', nameAr: 'المؤسسات والجماعات المحلية' },
  ],

  contactIntro:
    "Le cabinet vous reçoit sur rendez-vous à Monastir. Pour toute demande de consultation ou d'information, n'hésitez pas à nous contacter.",
  contactIntroAr:
    "يستقبلكم المكتب بموعد مسبق في المنستير. لأي طلب استشارة أو معلومات، لا تترددوا في الاتصال بنا.",
  footerTagline: '« La rigueur est la marque du droit. »',
  footerTaglineAr: '« الصرامة هي سمة القانون. »',
};

export function uid(prefix = 'id'): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}
