import { useState } from 'react';
import { Phone, Mail, MapPin, Building2, Globe2, ArrowUpRight, ChevronRight, Layers, Maximize2 } from 'lucide-react';
import { useContent } from './lib/content';
import { getIcon } from './lib/icons';
import { SmartImage, Linkedin, useReveal, ImageLightbox, LightboxItem } from './components/shared';

// ─────────────────────────────────────────────────────────────────
// Hero (full, used on the Home page)
// ─────────────────────────────────────────────────────────────────
export function Hero() {
  const { content } = useContent();
  const [showPortraitModal, setShowPortraitModal] = useState(false);

  return (
    <section
      id="top"
      className="relative min-h-screen flex flex-col justify-end pt-32 pb-16 md:pb-24 overflow-hidden"
    >
      <div className="absolute top-1/4 right-0 md:right-6 -translate-y-1/4 pointer-events-none select-none opacity-[0.04] font-display text-[25vw] leading-none text-ink">
        {content.brandName}
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          <div className="lg:col-span-8 space-y-8">
            <div className="animate-fade-in">
              <div className="inline-flex items-center gap-3 mb-8">
                <div className="h-px w-12 bg-gold"></div>
                <span className="text-xs uppercase tracking-[0.3em] text-ink/60 font-medium">
                  Cabinet d'Avocat
                </span>
              </div>
            </div>

            <h1 className="font-display text-[clamp(2.75rem,8vw,7rem)] leading-[0.95] tracking-tight text-ink animate-fade-in-up">
              {content.heroFirstName}
              <br />
              <span className="italic font-serif font-light text-gold">{content.heroLastName}</span>
            </h1>

            <p className="text-lg md:text-xl text-ink/70 max-w-2xl leading-relaxed animate-fade-in-up animation-delay-200">
              {content.heroSubtitle}
            </p>

            <div className="flex flex-wrap gap-4 pt-4 animate-fade-in-up animation-delay-400">
              <a
                href="#/contact"
                className="inline-flex items-center gap-3 px-7 py-4 bg-ink text-paper font-medium hover:bg-gold transition-all duration-300 group"
              >
                {content.ctaPrimary}
                <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
              <a
                href="#/cabinet"
                className="inline-flex items-center gap-3 px-7 py-4 border border-ink/20 text-ink font-medium hover:border-gold hover:text-gold transition-all duration-300"
              >
                {content.ctaSecondary}
              </a>
            </div>

            {/* Badges Bar — Key information requested by lawyer */}
            <div className="pt-8 border-t border-ink/15 grid grid-cols-2 md:grid-cols-4 gap-3 animate-fade-in-up animation-delay-600">
              <div className="bg-cream/60 border border-ink/10 p-3.5 text-center group hover:border-gold/60 transition-colors">
                <div className="font-display text-xl text-gold font-bold">20+ ans</div>
                <div className="text-[11px] text-ink/70 uppercase tracking-wider font-medium mt-0.5">d'expérience</div>
              </div>
              <div className="bg-cream/60 border border-ink/10 p-3.5 text-center group hover:border-gold/60 transition-colors">
                <div className="font-display text-lg text-gold font-bold">2005 — CAPA</div>
                <div className="text-[11px] text-ink/70 uppercase tracking-wider font-medium mt-0.5">Certificat de compétence</div>
              </div>
              <div className="bg-cream/60 border border-ink/10 p-3.5 text-center group hover:border-gold/60 transition-colors">
                <div className="font-serif text-sm font-semibold text-ink leading-tight">Master + DEA</div>
                <div className="text-[11px] text-ink/70 uppercase tracking-wider font-medium mt-0.5">Études approfondies</div>
              </div>
              <div className="bg-cream/60 border border-ink/10 p-3.5 text-center group hover:border-gold/60 transition-colors">
                <div className="font-serif text-sm font-semibold text-gold leading-tight">Équipe : 6 pers.</div>
                <div className="text-[11px] text-ink/70 uppercase tracking-wider font-medium mt-0.5">2 avocats + 4 secrétaires</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 animate-fade-in-up animation-delay-600 space-y-6">
            <div className="relative group">
              <SmartImage
                src={content.heroPortrait}
                alt={`${content.heroFirstName} ${content.heroLastName}, Avocat près la Cour d'Appel`}
                label={`Portrait officiel — Me ${content.heroLastName}`}
                onClick={() => setShowPortraitModal(true)}
                showZoomIcon={true}
                className="w-full aspect-[4/5] object-cover border border-ink/15 shadow-xl transition-all duration-500 group-hover:border-gold/50"
              />
              <div className="absolute -bottom-4 -left-4 bg-ink text-paper px-5 py-3 hidden md:block shadow-lg border-l-2 border-gold pointer-events-none">
                <div className="text-[10px] uppercase tracking-[0.2em] text-gold">Maître</div>
                <div className="font-serif text-lg leading-tight">
                  {content.heroFirstName} {content.heroLastName}
                </div>
              </div>
            </div>

            {showPortraitModal && (
              <ImageLightbox
                items={[
                  {
                    src: content.heroPortrait,
                    alt: `Maître ${content.heroFirstName} ${content.heroLastName} — Avocat près la Cour d'Appel`,
                  },
                ]}
                currentIndex={0}
                onClose={() => setShowPortraitModal(false)}
                onNavigate={() => {}}
              />
            )}

            <div className="border border-ink/10 bg-cream/50 p-8 space-y-6">
              <div className="text-xs uppercase tracking-[0.25em] text-gold font-semibold">
                Informations
              </div>
              <div className="space-y-5 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-gold mt-0.5 shrink-0" />
                  <div className="text-ink/80 leading-relaxed">
                    {content.addressLine1}<br />
                    {content.addressLine2}
                  </div>
                </div>
                <a href={`tel:${content.phone.replace(/\s/g, '')}`} className="flex items-start gap-3 group">
                  <Phone size={18} className="text-gold mt-0.5 shrink-0" />
                  <div className="text-ink/80 group-hover:text-gold transition-colors">
                    {content.phone}
                  </div>
                </a>
                <a href={`mailto:${content.email}`} className="flex items-start gap-3 group">
                  <Mail size={18} className="text-gold mt-0.5 shrink-0" />
                  <div className="text-ink/80 group-hover:text-gold transition-colors break-all">
                    {content.email}
                  </div>
                </a>
              </div>
              <div className="pt-4 border-t border-ink/10">
                <a
                  href={content.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-ink hover:text-gold transition-colors"
                >
                  <Linkedin size={16} />
                  {content.linkedinLabel}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-3 mt-20 animate-fade-in animation-delay-800">
          <div className="h-px w-16 bg-ink/20"></div>
          <span className="text-xs uppercase tracking-[0.25em] text-ink/50">
            Défiler
          </span>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
// About / Présentation
// ─────────────────────────────────────────────────────────────────
export function About() {
  const { content } = useContent();
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [showAboutModal, setShowAboutModal] = useState(false);

  return (
    <section className="py-24 md:py-36 bg-cream/30">
      <div
        ref={ref}
        className={`max-w-[1400px] mx-auto px-6 md:px-12 transition-all duration-1000 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-4">
            <div className="sticky top-32">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-10 bg-gold"></div>
                <span className="text-xs uppercase tracking-[0.3em] text-ink/60 font-medium">
                  {content.aboutEyebrow}
                </span>
              </div>
              <h2 className="font-display text-5xl md:text-6xl leading-none text-ink">
                {content.aboutTitleLine1}<br />
                <span className="italic font-serif font-light text-gold">{content.aboutTitleLine2}</span>
              </h2>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-6 text-lg leading-[1.9] text-ink/80 font-light">
            <p className="text-2xl md:text-3xl font-serif leading-snug text-ink">
              {content.aboutLead}{' '}
              <em className="text-gold not-italic font-medium">{content.aboutHighlight}</em>.
            </p>
            <p>{content.aboutParagraph1}</p>
            <p>{content.aboutParagraph2}</p>

            <div className="pt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              {content.values.map((v) => (
                <div key={v.id} className="border-t border-ink/15 pt-5">
                  <div className="font-serif text-xl text-ink mb-2">{v.label}</div>
                  <div className="text-sm text-ink/60 leading-relaxed">{v.desc}</div>
                </div>
              ))}
            </div>

            <div className="pt-4 grid grid-cols-1 sm:grid-cols-5 gap-4 items-end">
              <div className="sm:col-span-3">
                <SmartImage
                  src={content.aboutPhoto}
                  alt={`Maître ${content.heroLastName} en intervention lors d'une conférence`}
                  label="En intervention — conférence"
                  onClick={() => setShowAboutModal(true)}
                  showZoomIcon={true}
                  className="w-full aspect-[16/10] object-cover border border-ink/15 shadow-md hover:border-gold/50 transition-all duration-300"
                />
              </div>
              <div className="sm:col-span-2 border-l-2 border-gold pl-5">
                <p className="font-serif italic text-lg text-ink leading-snug">
                  {content.aboutQuote}
                </p>
              </div>
            </div>

            {showAboutModal && (
              <ImageLightbox
                items={[
                  {
                    src: content.aboutPhoto,
                    alt: `Maître ${content.heroFirstName} ${content.heroLastName} en intervention lors d'une conférence`,
                  },
                ]}
                currentIndex={0}
                onClose={() => setShowAboutModal(false)}
                onNavigate={() => {}}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
// Team Section — Maître Ramzi + 2 Avocats Assistants
// ─────────────────────────────────────────────────────────────────
export function TeamSection() {
  const { content } = useContent();
  const { ref, visible } = useReveal<HTMLDivElement>();

  const team = [
    {
      id: 'lead',
      name: `Maître ${content.heroFirstName} ${content.heroLastName}`,
      role: content.brandTagline,
      detail: "20+ ans d'expérience · CAPA 2005 · Master + DEA en Droit Privé",
      photo: content.heroPortrait,
      isLead: true,
    },
    {
      id: 'assistant1',
      name: 'Avocat Assistant',
      role: 'Avocat Collaborateur',
      detail: 'Droit des sociétés & contentieux civil',
      photo: '/images/avocat-assistant-1.jpg',
      isLead: false,
    },
    {
      id: 'assistant2',
      name: 'Avocate Assistante',
      role: 'Avocate Collaboratrice',
      detail: 'Droit de la famille & médiation',
      photo: '/images/avocat-assistant-2.jpg',
      isLead: false,
    },
  ];

  return (
    <section className="py-24 md:py-36 bg-paper" id="equipe">
      <div
        ref={ref}
        className={`max-w-[1400px] mx-auto px-6 md:px-12 transition-all duration-1000 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px w-10 bg-gold"></div>
          <span className="text-xs uppercase tracking-[0.3em] text-ink/60 font-medium">
            Notre Équipe
          </span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
          <h2 className="font-display text-5xl md:text-7xl leading-none text-ink">
            Cabinet &<br />
            <span className="italic font-serif font-light text-gold">Avocats</span>
          </h2>
          <p className="max-w-md text-ink/70 leading-relaxed">
            Une équipe de 3 avocats qualifiés et 4 secrétaires juridiques dédiés, pour un suivi rigoureux et personnalisé de chaque dossier.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member) => (
            <div
              key={member.id}
              className={`group relative border transition-all duration-500 ${
                member.isLead
                  ? 'border-gold/40 bg-ink text-paper shadow-2xl md:col-span-1 md:-mt-6'
                  : 'border-ink/10 bg-paper hover:border-gold/40'
              }`}
            >
              {/* Photo */}
              <div className="relative overflow-hidden aspect-[4/5]">
                <SmartImage
                  src={member.photo}
                  alt={member.name}
                  label={member.name}
                  className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                    member.isLead ? 'object-top' : ''
                  }`}
                />
                {member.isLead && (
                  <div className="absolute top-4 left-4 bg-gold text-paper text-[10px] uppercase tracking-[0.2em] font-bold px-3 py-1.5 shadow-lg">
                    Avocat Principal
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-6 space-y-2">
                <div className={`text-[10px] uppercase tracking-[0.25em] font-semibold ${member.isLead ? 'text-gold' : 'text-gold'}`}>
                  {member.role}
                </div>
                <h3 className={`font-display text-2xl leading-tight ${member.isLead ? 'text-paper' : 'text-ink'}`}>
                  {member.name}
                </h3>
                <p className={`text-sm leading-relaxed ${member.isLead ? 'text-paper/70' : 'text-ink/60'}`}>
                  {member.detail}
                </p>
              </div>

              {/* Bottom gold accent */}
              <div className={`h-0.5 w-full ${member.isLead ? 'bg-gold' : 'bg-ink/10 group-hover:bg-gold transition-colors duration-500'}`}></div>
            </div>
          ))}
        </div>

        {/* Secretariat note */}
        <div className="mt-12 flex items-center gap-4 border border-ink/10 bg-cream/40 p-6">
          <div className="w-12 h-12 border border-gold/40 flex items-center justify-center shrink-0">
            <Phone size={20} className="text-gold" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-gold font-semibold mb-1">Secrétariat Juridique</div>
            <p className="text-ink/70 text-sm leading-relaxed">
              4 secrétaires juridiques qualifiées assurent l'accueil, la gestion des dossiers et le suivi administratif de chaque client.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
// Practice Areas
// ─────────────────────────────────────────────────────────────────
export function Practice({ showHeader = false }: { showHeader?: boolean }) {
  const { content } = useContent();
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <section className="py-16 md:py-24 bg-paper">
      <div
        ref={ref}
        className={`max-w-[1400px] mx-auto px-6 md:px-12 transition-all duration-1000 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        {showHeader && (
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 md:mb-24 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-10 bg-gold"></div>
                <span className="text-xs uppercase tracking-[0.3em] text-ink/60 font-medium">
                  Domaines d'intervention
                </span>
              </div>
              <h2 className="font-display text-5xl md:text-7xl leading-none text-ink">
                Expertises<br />
                <span className="italic font-serif font-light text-gold">& pratique</span>
              </h2>
            </div>
            <p className="max-w-md text-ink/70 leading-relaxed">
              {content.practiceIntro}
            </p>
          </div>
        )}
        <div className="space-y-0 border-t border-ink/15">
          {content.practiceAreas.map((area, idx) => {
            const Icon = getIcon(area.icon);
            return (
              <div
                key={area.id}
                className="group border-b border-ink/15 py-10 md:py-14 grid grid-cols-12 gap-6 items-start hover:bg-cream/40 transition-colors duration-500 px-4 md:px-8 -mx-4 md:-mx-8 cursor-default"
              >
                <div className="col-span-2 md:col-span-1 text-gold font-serif text-sm md:text-base pt-1">
                  {String(idx + 1).padStart(2, '0')}
                </div>
                <div className="col-span-10 md:col-span-1 flex justify-start pt-2">
                  <div className="w-12 h-12 flex items-center justify-center border border-ink/20 group-hover:bg-ink group-hover:border-ink transition-all duration-500">
                    <Icon
                      size={20}
                      className="text-ink group-hover:text-paper transition-colors duration-500"
                    />
                  </div>
                </div>
                <div className="col-span-12 md:col-span-5">
                  <h3 className="font-display text-2xl md:text-3xl lg:text-4xl text-ink leading-tight group-hover:text-gold transition-colors duration-500">
                    {area.title}
                  </h3>
                </div>
                <div className="col-span-12 md:col-span-5">
                  <p className="text-ink/70 leading-relaxed text-base">
                    {area.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
// Compact practice teaser (used on the Home page)
// ─────────────────────────────────────────────────────────────────
export function PracticeTeaser() {
  const { content } = useContent();
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <section className="py-24 md:py-32 bg-paper">
      <div
        ref={ref}
        className={`max-w-[1400px] mx-auto px-6 md:px-12 transition-all duration-1000 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10 bg-gold"></div>
              <span className="text-xs uppercase tracking-[0.3em] text-ink/60 font-medium">
                Domaines d'intervention
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-6xl leading-none text-ink">
              Nos <span className="italic font-serif font-light text-gold">expertises</span>
            </h2>
          </div>
          <a
            href="#/expertises"
            className="inline-flex items-center gap-2 text-sm font-medium text-ink hover:text-gold transition-colors group shrink-0"
          >
            Voir tous les domaines
            <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-ink/10 border border-ink/10">
          {content.practiceAreas.slice(0, 6).map((area) => {
            const Icon = getIcon(area.icon);
            return (
              <a
                key={area.id}
                href="#/expertises"
                className="bg-paper p-8 group hover:bg-cream/60 transition-colors duration-500"
              >
                <div className="w-11 h-11 flex items-center justify-center border border-ink/20 mb-5 group-hover:bg-ink group-hover:border-ink transition-all duration-500">
                  <Icon size={18} className="text-ink group-hover:text-paper transition-colors duration-500" />
                </div>
                <h3 className="font-serif text-xl text-ink leading-snug group-hover:text-gold transition-colors duration-500">
                  {area.title}
                </h3>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
// Experience & Engagements
// ─────────────────────────────────────────────────────────────────
export function Experience({ showHeader = false }: { showHeader?: boolean }) {
  const { content } = useContent();
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <section className="py-24 md:py-36 bg-ink text-paper relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03] font-display text-[30vw] leading-none -right-20">
        <div className="absolute top-10 right-0">DROIT</div>
      </div>
      <div
        ref={ref}
        className={`relative max-w-[1400px] mx-auto px-6 md:px-12 transition-all duration-1000 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-4">
            <div className="sticky top-32">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-10 bg-gold"></div>
                <span className="text-xs uppercase tracking-[0.3em] text-paper/60 font-medium">
                  {showHeader ? 'Parcours' : 'Chronologie'}
                </span>
              </div>
              {showHeader ? (
                <>
                  <h2 className="font-display text-5xl md:text-6xl leading-none">
                    Expériences<br />
                    <span className="italic font-serif font-light text-gold">& engagements</span>
                  </h2>
                  <p className="mt-8 text-paper/70 leading-relaxed">
                    {content.experienceIntro}
                  </p>
                </>
              ) : (
                <p className="text-paper/50 font-serif italic text-lg">
                  {content.experiences.length} étapes clés du parcours professionnel.
                </p>
              )}
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="space-y-0 border-l border-paper/15 pl-8 md:pl-12">
              {content.experiences.map((exp, i) => (
                <div key={exp.id} className="relative pb-10 md:pb-14">
                  <div className="absolute -left-[41px] md:-left-[49px] top-2 w-3 h-3 bg-gold"></div>
                  <div className="mb-1 text-gold font-serif text-sm">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl leading-tight mb-1">
                    {exp.title}
                  </h3>
                  <div className="text-paper/60 font-serif italic text-lg">
                    {exp.org}
                  </div>
                  {exp.detail && (
                    <p className="mt-3 text-paper/70 leading-relaxed max-w-xl">
                      {exp.detail}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
// Médiation & règlement amiable
// ─────────────────────────────────────────────────────────────────
export function MediationSection() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <section className="py-24 md:py-36 bg-cream/40" id="mediation">
      <div
        ref={ref}
        className={`max-w-[1400px] mx-auto px-6 md:px-12 transition-all duration-1000 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-px w-10 bg-gold"></div>
              <span className="text-xs uppercase tracking-[0.3em] text-ink/60 font-medium">
                Résolution alternative des différends
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-6xl leading-tight text-ink">
              Médiation &<br />
              <span className="italic font-serif font-light text-gold">règlement amiable</span>
            </h2>
            <p className="text-lg text-ink/80 leading-relaxed font-light">
              Le cabinet privilégie, chaque fois que possible, la recherche de solutions négociées et transactionnelles. La médiation permet de résoudre les litiges de manière rapide, confidentielle et économique tout en préservant les relations professionnelles et commerciales.
            </p>
            <div className="pt-2">
              <a
                href="#/contact"
                className="inline-flex items-center gap-3 px-7 py-4 bg-ink text-paper font-medium hover:bg-gold transition-all duration-300 group"
              >
                Demander une consultation / médiation
                <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-paper p-8 border border-ink/15 shadow-sm space-y-3 hover:border-gold transition-colors">
              <div className="w-12 h-12 bg-ink/5 border border-ink/10 flex items-center justify-center text-gold mb-4">
                <Building2 size={24} />
              </div>
              <h3 className="font-serif text-2xl text-ink">Négociation des Affaires</h3>
              <p className="text-sm text-ink/70 leading-relaxed">
                Règlement amiable des conflits d'associés, litiges commerciaux inter-entreprises et négociations contractuelles.
              </p>
            </div>

            <div className="bg-paper p-8 border border-ink/15 shadow-sm space-y-3 hover:border-gold transition-colors">
              <div className="w-12 h-12 bg-ink/5 border border-ink/10 flex items-center justify-center text-gold mb-4">
                <Layers size={24} />
              </div>
              <h3 className="font-serif text-2xl text-ink">Protocoles d'Accord</h3>
              <p className="text-sm text-ink/70 leading-relaxed">
                Rédaction et homologation d'accords transactionnels ayant force exécutoire devant les juridictions.
              </p>
            </div>

            <div className="bg-paper p-8 border border-ink/15 shadow-sm space-y-3 hover:border-gold transition-colors">
              <div className="w-12 h-12 bg-ink/5 border border-ink/10 flex items-center justify-center text-gold mb-4">
                <Globe2 size={24} />
              </div>
              <h3 className="font-serif text-2xl text-ink">Confidentialité Absolue</h3>
              <p className="text-sm text-ink/70 leading-relaxed">
                Procédure strictement confidentielle protégeant la réputation, les secrets d'affaires et l'image des parties.
              </p>
            </div>

            <div className="bg-paper p-8 border border-ink/15 shadow-sm space-y-3 hover:border-gold transition-colors">
              <div className="w-12 h-12 bg-ink/5 border border-ink/10 flex items-center justify-center text-gold mb-4">
                <Phone size={24} />
              </div>
              <h3 className="font-serif text-2xl text-ink">Accompagnement Sur-Mesure</h3>
              <p className="text-sm text-ink/70 leading-relaxed">
                Conseil stratégique réactif par Maître Ramzi Lahmadi et son équipe dédiée.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
// International — Roscongress / Russian Energy Week (Moscou)
// ─────────────────────────────────────────────────────────────────
export function International() {
  const { content } = useContent();
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = [
    { id: 'all', label: 'Toutes les photos', count: content.gallery.length },
    { id: 'moscow', label: 'Moscou & Roscongress', count: content.gallery.filter((g) => g.category === 'moscow').length },
    { id: 'court', label: 'Tribunaux & Exercice du Droit', count: content.gallery.filter((g) => g.category === 'court').length },
    { id: 'events', label: 'Conférences & Diplomatie', count: content.gallery.filter((g) => g.category === 'events').length },
  ];

  const filteredGallery =
    activeCategory === 'all'
      ? content.gallery
      : content.gallery.filter((img) => img.category === activeCategory);

  const lightboxItems: LightboxItem[] = filteredGallery.map((img) => ({
    src: img.src,
    alt: img.alt,
    category: img.category,
  }));

  return (
    <section className="py-24 md:py-36 bg-cream/30" id="galerie">
      <div
        ref={ref}
        className={`max-w-[1400px] mx-auto px-6 md:px-12 transition-all duration-1000 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10 bg-gold"></div>
              <span className="text-xs uppercase tracking-[0.3em] text-ink/60 font-medium">
                Rayonnement & Interventions
              </span>
            </div>
            <h2 className="font-display text-5xl md:text-7xl leading-none text-ink">
              Galerie<br />
              <span className="italic font-serif font-light text-gold">& Réalisations</span>
            </h2>
          </div>
          <div className="max-w-md flex items-start gap-3">
            <Globe2 size={22} className="text-gold shrink-0 mt-1" />
            <p className="text-ink/70 leading-relaxed">
              {content.internationalIntro}
            </p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-3 mb-10 pb-4 border-b border-ink/10">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-ink/40 mr-4 hidden sm:flex">
            <Layers size={14} />
            Catégories:
          </div>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 text-xs font-medium tracking-wider uppercase transition-all duration-300 border ${
                activeCategory === cat.id
                  ? 'bg-ink text-paper border-ink shadow-md'
                  : 'bg-paper/50 text-ink/70 border-ink/15 hover:border-gold hover:text-gold'
              }`}
            >
              {cat.label} ({cat.count})
            </button>
          ))}
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 auto-rows-[240px]">
          {filteredGallery.map((img, idx) => (
            <div
              key={img.id}
              onClick={() => setLightboxIndex(idx)}
              className={`group relative overflow-hidden border border-ink/10 bg-paper cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 hover:border-gold/60 ${
                img.large ? 'sm:col-span-2 sm:row-span-2' : ''
              }`}
            >
              <SmartImage
                src={img.src}
                alt={img.alt}
                label={img.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              {/* Subtle hover gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                <div className="transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300 space-y-1">
                  <div className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-gold font-semibold">
                    <Maximize2 size={12} /> Cliquer pour agrandir
                  </div>
                  <p className="font-serif text-sm text-paper leading-snug line-clamp-2">
                    {img.alt}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Slider Modal */}
        <ImageLightbox
          items={lightboxItems}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={(index) => setLightboxIndex(index)}
        />
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
// Publications & Awards
// ─────────────────────────────────────────────────────────────────
export function Publications({ showHeader = false }: { showHeader?: boolean }) {
  const { content } = useContent();
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [selectedCoverModal, setSelectedCoverModal] = useState<string | null>(null);

  // Find book item with cover
  const mainBook = content.publications.find((p) => p.coverImage);
  const otherPubs = content.publications.filter((p) => p.id !== mainBook?.id);

  return (
    <section className="py-16 md:py-24 bg-paper">
      <div
        ref={ref}
        className={`max-w-[1400px] mx-auto px-6 md:px-12 transition-all duration-1000 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        {showHeader && (
          <div className="mb-16 md:mb-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10 bg-gold"></div>
              <span className="text-xs uppercase tracking-[0.3em] text-ink/60 font-medium">
                Travaux & Distinctions
              </span>
            </div>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <h2 className="font-display text-5xl md:text-7xl leading-none text-ink">
                Publications<br />
                <span className="italic font-serif font-light text-gold">
                  & contributions
                </span>
              </h2>
              <p className="max-w-md text-ink/70 leading-relaxed">
                {content.publicationsIntro ||
                  'Ouvrages juridiques, articles de doctrine, prix et contributions scientifiques au service du droit et des politiques publiques.'}
              </p>
            </div>
          </div>
        )}

        {/* Featured Book Showcase Card (if main book with coverImage exists) */}
        {mainBook && (
          <div className="mb-12 bg-cream/40 border border-ink/15 p-6 md:p-10 shadow-lg hover:border-gold/50 transition-all duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Book Cover Image */}
              <div className="lg:col-span-4 flex justify-center">
                <div
                  onClick={() => setSelectedCoverModal(mainBook.coverImage || null)}
                  className="relative group cursor-pointer max-w-[280px] w-full overflow-hidden shadow-2xl border border-ink/20 rounded-sm"
                >
                  <SmartImage
                    src={mainBook.coverImage || ''}
                    alt={mainBook.title}
                    label="Couverture de l'ouvrage"
                    showZoomIcon={true}
                    className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-3 left-3 right-3 bg-ink/90 backdrop-blur-sm text-paper py-2 px-3 text-center text-xs tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    🔍 Agrandi la couverture
                  </div>
                </div>
              </div>

              {/* Book Details */}
              <div className="lg:col-span-8 space-y-5">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-gold text-paper text-xs uppercase tracking-widest font-semibold">
                    {mainBook.type}
                  </span>
                  <span className="text-xs text-ink/50 uppercase tracking-wider">
                    {mainBook.meta}
                  </span>
                </div>

                <div className="space-y-2">
                  {mainBook.titleAr && (
                    <h3 className="font-serif text-3xl md:text-4xl text-ink leading-tight dir-rtl font-semibold text-gold">
                      {mainBook.titleAr}
                    </h3>
                  )}
                  <h4 className="font-serif text-xl md:text-2xl text-ink/90 leading-snug">
                    {mainBook.title}
                  </h4>
                </div>

                {mainBook.description && (
                  <p className="text-ink/80 text-base md:text-lg leading-relaxed font-light">
                    {mainBook.description}
                  </p>
                )}

                {/* Metadata badges & Action button */}
                <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-ink/10 text-xs md:text-sm text-ink/70">
                  <div className="flex flex-wrap gap-3">
                    {mainBook.isbn && (
                      <div className="bg-paper px-4 py-2 border border-ink/10">
                        <span className="text-gold font-semibold">ISBN :</span> {mainBook.isbn}
                      </div>
                    )}
                    {mainBook.price && (
                      <div className="bg-paper px-4 py-2 border border-ink/10">
                        <span className="text-gold font-semibold">Prix :</span> {mainBook.price}
                      </div>
                    )}
                  </div>

                  <a
                    href={`#/publication/${mainBook.id}`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-ink text-paper font-medium hover:bg-gold transition-colors text-xs uppercase tracking-wider group"
                  >
                    Voir la fiche & Réserver
                    <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other Publications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-ink/10 border border-ink/10">
          {otherPubs.map((pub) => {
            const Icon = getIcon(pub.icon);
            return (
              <a
                key={pub.id}
                href={`#/publication/${pub.id}`}
                className="bg-paper p-8 md:p-10 group hover:bg-cream/70 transition-colors duration-500 flex flex-col justify-between block"
              >
                <div>
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 flex items-center justify-center border border-ink/20 group-hover:bg-gold group-hover:border-gold transition-all duration-500">
                        <Icon
                          size={18}
                          className="text-ink group-hover:text-white transition-colors duration-500"
                        />
                      </div>
                      <span className="text-xs uppercase tracking-[0.2em] text-gold font-semibold">
                        {pub.type}
                      </span>
                    </div>
                    <ChevronRight
                      size={20}
                      className="text-ink/30 group-hover:text-gold group-hover:translate-x-1 transition-all duration-500"
                    />
                  </div>
                  <h3 className="font-serif text-xl md:text-2xl leading-snug text-ink mb-3 group-hover:text-gold transition-colors duration-500">
                    {pub.title}
                  </h3>
                  {pub.description && (
                    <p className="text-sm text-ink/70 leading-relaxed mb-4">{pub.description}</p>
                  )}
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-ink/10">
                  <span className="text-xs uppercase tracking-wider text-ink/50">
                    {pub.meta}
                  </span>
                  <span className="text-xs uppercase tracking-wider text-gold font-medium group-hover:underline">
                    Consulter →
                  </span>
                </div>
              </a>
            );
          })}
        </div>

        {/* Lightbox Modal for Book Cover */}
        {selectedCoverModal && (
          <ImageLightbox
            items={[
              {
                src: selectedCoverModal,
                alt: mainBook
                  ? `Couverture officielle de l'ouvrage: "${mainBook.title}" — Maître ${content.heroFirstName} ${content.heroLastName} — Latrach Édition 2026`
                  : 'Couverture de l\'ouvrage',
              },
            ]}
            currentIndex={0}
            onClose={() => setSelectedCoverModal(null)}
            onNavigate={() => {}}
          />
        )}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
// Clients Marquee
// ─────────────────────────────────────────────────────────────────
export function Clients() {
  const { content } = useContent();
  const list = [...content.clients, ...content.clients];
  return (
    <section className="py-20 md:py-28 bg-cream/50 border-y border-ink/10 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px w-10 bg-gold"></div>
          <span className="text-xs uppercase tracking-[0.3em] text-ink/60 font-medium">
            Ils nous font confiance
          </span>
        </div>
        <h2 className="font-display text-3xl md:text-5xl leading-none text-ink">
          Nos clients &<span className="italic font-serif font-light text-gold"> partenaires</span>
        </h2>
      </div>

      <div className="relative overflow-hidden">
        <div className="flex gap-8 whitespace-nowrap marquee-track w-max">
          {list.map((c, i) => (
            <div
              key={`${c.id}-${i}`}
              className="flex items-center gap-4 px-8 py-6 border border-ink/10 bg-paper shrink-0"
            >
              <Building2 size={20} className="text-gold" />
              <span className="font-serif text-lg md:text-xl text-ink whitespace-normal max-w-[280px]">
                {c.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
// Contact
// ─────────────────────────────────────────────────────────────────
export function Contact({ showHeader = false }: { showHeader?: boolean }) {
  const { content } = useContent();
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <section className="py-16 md:py-24 bg-paper">
      <div
        ref={ref}
        className={`max-w-[1400px] mx-auto px-6 md:px-12 transition-all duration-1000 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        {showHeader && (
          <div className="mb-16 md:mb-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10 bg-gold"></div>
              <span className="text-xs uppercase tracking-[0.3em] text-ink/60 font-medium">
                Contact
              </span>
            </div>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <h2 className="font-display text-5xl md:text-7xl leading-[0.95] text-ink">
                Parlons de<br />
                <span className="italic font-serif font-light text-gold">votre dossier</span>
              </h2>
              <p className="max-w-md text-ink/70 leading-relaxed">
                {content.contactIntro}
              </p>
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <a
                href={`tel:${content.phone.replace(/\s/g, '')}`}
                className="group block border border-ink/15 p-6 hover:border-gold transition-colors duration-500"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Phone size={18} className="text-gold" />
                  <span className="text-xs uppercase tracking-[0.2em] text-ink/60">Téléphone</span>
                </div>
                <div className="font-display text-2xl text-ink group-hover:text-gold transition-colors">
                  {content.phone}
                </div>
              </a>

              <a
                href={`mailto:${content.email}`}
                className="group block border border-ink/15 p-6 hover:border-gold transition-colors duration-500"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Mail size={18} className="text-gold" />
                  <span className="text-xs uppercase tracking-[0.2em] text-ink/60">Email</span>
                </div>
                <div className="font-serif text-lg text-ink group-hover:text-gold transition-colors break-all">
                  {content.email}
                </div>
              </a>

              <div className="group block border border-ink/15 p-6 md:col-span-2">
                <div className="flex items-center gap-3 mb-3">
                  <MapPin size={18} className="text-gold" />
                  <span className="text-xs uppercase tracking-[0.2em] text-ink/60">Adresse</span>
                </div>
                <div className="font-display text-xl md:text-2xl text-ink leading-snug">
                  {content.addressLine1}<br />
                  {content.addressLine2}, Tunisie
                </div>
              </div>

              <a
                href={content.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="group block border border-ink/15 p-6 md:col-span-2 hover:border-gold transition-colors duration-500"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Linkedin size={18} className="text-gold" />
                  <span className="text-xs uppercase tracking-[0.2em] text-ink/60">LinkedIn</span>
                </div>
                <div className="font-serif text-lg text-ink group-hover:text-gold transition-colors flex items-center justify-between">
                  {content.heroFirstName} {content.heroLastName}
                  <ArrowUpRight size={20} />
                </div>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Merci ! Votre message a bien été envoyé. Le cabinet vous contactera dans les plus brefs délais.');
              }}
              className="bg-ink text-paper p-8 md:p-10 space-y-6"
            >
              <div>
                <div className="text-xs uppercase tracking-[0.25em] text-gold font-semibold mb-2">
                  Demande de consultation
                </div>
                <h3 className="font-display text-3xl leading-tight">
                  Écrivez-nous
                </h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs uppercase tracking-[0.15em] text-paper/60 mb-2 block">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full bg-transparent border-b border-paper/20 py-2 focus:border-gold outline-none transition-colors text-paper placeholder-paper/30"
                    placeholder="Votre nom"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.15em] text-paper/60 mb-2 block">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full bg-transparent border-b border-paper/20 py-2 focus:border-gold outline-none transition-colors text-paper placeholder-paper/30"
                    placeholder="votre@email.com"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.15em] text-paper/60 mb-2 block">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    className="w-full bg-transparent border-b border-paper/20 py-2 focus:border-gold outline-none transition-colors text-paper placeholder-paper/30"
                    placeholder="+216 ..."
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.15em] text-paper/60 mb-2 block">
                    Votre message
                  </label>
                  <textarea
                    required
                    rows={4}
                    className="w-full bg-transparent border-b border-paper/20 py-2 focus:border-gold outline-none transition-colors text-paper placeholder-paper/30 resize-none"
                    placeholder="Décrivez brièvement votre situation..."
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-gold text-white font-medium hover:bg-gold-light transition-colors duration-300 group"
              >
                Envoyer la demande
                <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>

              <p className="text-xs text-paper/50 leading-relaxed">
                Les informations transmises sont strictement confidentielles et
                soumises au secret professionnel de l'avocat.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
