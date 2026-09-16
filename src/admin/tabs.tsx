import { useState } from 'react';
import { useContent, uid } from '../lib/content';
import type { PracticeItem, ExperienceItem, PublicationItem, GalleryImage, ClientItem, ValueItem } from '../lib/content';
import { ICON_NAMES, getIcon } from '../lib/icons';
import { Section, Field, TextInput, TextArea, Select, ImageField, ListItemToolbar, AddButton, reorder } from './ui';

// ─────────────────────────────────────────────────────────────────
// Général — identité, coordonnées, portrait
// ─────────────────────────────────────────────────────────────────
export function GeneralTab() {
  const { content, setContent } = useContent();

  return (
    <div className="space-y-6">
      <Section title="Identité du cabinet" description="Nom, slogan et texte d'accroche affichés en en-tête et sur la page d'accueil.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="Sigle / marque">
            <TextInput
              value={content.brandName}
              onChange={(e) => setContent((c) => ({ ...c, brandName: e.target.value }))}
            />
          </Field>
          <Field label="Sous-titre du sigle">
            <TextInput
              value={content.brandTagline}
              onChange={(e) => setContent((c) => ({ ...c, brandTagline: e.target.value }))}
            />
          </Field>
          <Field label="Prénom (affiché en grand)">
            <TextInput
              value={content.heroFirstName}
              onChange={(e) => setContent((c) => ({ ...c, heroFirstName: e.target.value }))}
            />
          </Field>
          <Field label="Nom (affiché en grand, doré)">
            <TextInput
              value={content.heroLastName}
              onChange={(e) => setContent((c) => ({ ...c, heroLastName: e.target.value }))}
            />
          </Field>
        </div>
        <Field label="Phrase d'accroche (sous le nom)">
          <TextArea
            rows={2}
            value={content.heroSubtitle}
            onChange={(e) => setContent((c) => ({ ...c, heroSubtitle: e.target.value }))}
          />
        </Field>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="Bouton principal">
            <TextInput
              value={content.ctaPrimary}
              onChange={(e) => setContent((c) => ({ ...c, ctaPrimary: e.target.value }))}
            />
          </Field>
          <Field label="Bouton secondaire">
            <TextInput
              value={content.ctaSecondary}
              onChange={(e) => setContent((c) => ({ ...c, ctaSecondary: e.target.value }))}
            />
          </Field>
        </div>
        <ImageField
          label="Portrait affiché sur la page d'accueil"
          value={content.heroPortrait}
          onChange={(v) => setContent((c) => ({ ...c, heroPortrait: v }))}
        />
      </Section>

      <Section title="Coordonnées" description="Utilisées dans l'en-tête, le pied de page et la section contact.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="Téléphone">
            <TextInput
              value={content.phone}
              onChange={(e) => setContent((c) => ({ ...c, phone: e.target.value }))}
            />
          </Field>
          <Field label="Email">
            <TextInput
              value={content.email}
              onChange={(e) => setContent((c) => ({ ...c, email: e.target.value }))}
            />
          </Field>
          <Field label="Adresse — ligne 1">
            <TextInput
              value={content.addressLine1}
              onChange={(e) => setContent((c) => ({ ...c, addressLine1: e.target.value }))}
            />
          </Field>
          <Field label="Adresse — ligne 2">
            <TextInput
              value={content.addressLine2}
              onChange={(e) => setContent((c) => ({ ...c, addressLine2: e.target.value }))}
            />
          </Field>
          <Field label="Lien LinkedIn (URL)">
            <TextInput
              value={content.linkedinUrl}
              onChange={(e) => setContent((c) => ({ ...c, linkedinUrl: e.target.value }))}
            />
          </Field>
          <Field label="Libellé LinkedIn">
            <TextInput
              value={content.linkedinLabel}
              onChange={(e) => setContent((c) => ({ ...c, linkedinLabel: e.target.value }))}
            />
          </Field>
        </div>
      </Section>

      <Section title="Section Contact & Pied de page">
        <Field label="Texte d'introduction de la section contact">
          <TextArea
            rows={3}
            value={content.contactIntro}
            onChange={(e) => setContent((c) => ({ ...c, contactIntro: e.target.value }))}
          />
        </Field>
        <Field label="Citation du pied de page">
          <TextInput
            value={content.footerTagline}
            onChange={(e) => setContent((c) => ({ ...c, footerTagline: e.target.value }))}
          />
        </Field>
      </Section>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Présentation du cabinet
// ─────────────────────────────────────────────────────────────────
export function AboutTab() {
  const { content, setContent } = useContent();

  const updateValue = (id: string, patch: Partial<ValueItem>) => {
    setContent((c) => ({
      ...c,
      values: c.values.map((v) => (v.id === id ? { ...v, ...patch } : v)),
    }));
  };

  return (
    <div className="space-y-6">
      <Section title="Titre de la section">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Field label="Sur-titre">
            <TextInput
              value={content.aboutEyebrow}
              onChange={(e) => setContent((c) => ({ ...c, aboutEyebrow: e.target.value }))}
            />
          </Field>
          <Field label="Titre ligne 1">
            <TextInput
              value={content.aboutTitleLine1}
              onChange={(e) => setContent((c) => ({ ...c, aboutTitleLine1: e.target.value }))}
            />
          </Field>
          <Field label="Titre ligne 2 (doré)">
            <TextInput
              value={content.aboutTitleLine2}
              onChange={(e) => setContent((c) => ({ ...c, aboutTitleLine2: e.target.value }))}
            />
          </Field>
        </div>
      </Section>

      <Section title="Texte de présentation">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="Phrase d'introduction (avant le mot-clé en gras)">
            <TextArea
              rows={2}
              value={content.aboutLead}
              onChange={(e) => setContent((c) => ({ ...c, aboutLead: e.target.value }))}
            />
          </Field>
          <Field label="Mot-clé mis en avant (doré)">
            <TextInput
              value={content.aboutHighlight}
              onChange={(e) => setContent((c) => ({ ...c, aboutHighlight: e.target.value }))}
            />
          </Field>
        </div>
        <Field label="Paragraphe 1">
          <TextArea
            rows={4}
            value={content.aboutParagraph1}
            onChange={(e) => setContent((c) => ({ ...c, aboutParagraph1: e.target.value }))}
          />
        </Field>
        <Field label="Paragraphe 2">
          <TextArea
            rows={4}
            value={content.aboutParagraph2}
            onChange={(e) => setContent((c) => ({ ...c, aboutParagraph2: e.target.value }))}
          />
        </Field>
        <Field label="Citation affichée à côté de la photo">
          <TextArea
            rows={2}
            value={content.aboutQuote}
            onChange={(e) => setContent((c) => ({ ...c, aboutQuote: e.target.value }))}
          />
        </Field>
        <ImageField
          label="Photo d'illustration (conférence)"
          value={content.aboutPhoto}
          onChange={(v) => setContent((c) => ({ ...c, aboutPhoto: v }))}
        />
      </Section>

      <Section title="Valeurs du cabinet" description="Les trois piliers affichés sous le texte de présentation.">
        <div className="space-y-4">
          {content.values.map((v, i) => (
            <div key={v.id} className="border border-slate-200 rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <TextInput
                    value={v.label}
                    onChange={(e) => updateValue(v.id, { label: e.target.value })}
                    placeholder="Libellé (ex. Rigueur)"
                  />
                  <TextInput
                    value={v.desc}
                    onChange={(e) => updateValue(v.id, { desc: e.target.value })}
                    placeholder="Description courte"
                  />
                </div>
                <ListItemToolbar
                  canMoveUp={i > 0}
                  canMoveDown={i < content.values.length - 1}
                  onMoveUp={() => setContent((c) => ({ ...c, values: reorder(c.values, i, -1) }))}
                  onMoveDown={() => setContent((c) => ({ ...c, values: reorder(c.values, i, 1) }))}
                  onDelete={() => setContent((c) => ({ ...c, values: c.values.filter((x) => x.id !== v.id) }))}
                />
              </div>
            </div>
          ))}
          <AddButton
            label="Ajouter une valeur"
            onClick={() =>
              setContent((c) => ({
                ...c,
                values: [...c.values, { id: uid('v'), label: 'Nouvelle valeur', desc: '' }],
              }))
            }
          />
        </div>
      </Section>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Domaines d'intervention (practice areas)
// ─────────────────────────────────────────────────────────────────
export function PracticeTab() {
  const { content, setContent } = useContent();

  const update = (id: string, patch: Partial<PracticeItem>) => {
    setContent((c) => ({
      ...c,
      practiceAreas: c.practiceAreas.map((p) => (p.id === id ? { ...p, ...patch } : p)),
    }));
  };

  return (
    <div className="space-y-6">
      <Section title="Introduction de la section">
        <Field label="Texte d'introduction">
          <TextArea
            rows={2}
            value={content.practiceIntro}
            onChange={(e) => setContent((c) => ({ ...c, practiceIntro: e.target.value }))}
          />
        </Field>
      </Section>

      <Section title="Domaines d'intervention" description="Chaque domaine est numéroté automatiquement selon son ordre.">
        <div className="space-y-4">
          {content.practiceAreas.map((p, i) => {
            const Icon = getIcon(p.icon);
            return (
              <div key={p.id} className="border border-slate-200 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <ListItemToolbar
                    canMoveUp={i > 0}
                    canMoveDown={i < content.practiceAreas.length - 1}
                    onMoveUp={() => setContent((c) => ({ ...c, practiceAreas: reorder(c.practiceAreas, i, -1) }))}
                    onMoveDown={() => setContent((c) => ({ ...c, practiceAreas: reorder(c.practiceAreas, i, 1) }))}
                    onDelete={() =>
                      setContent((c) => ({ ...c, practiceAreas: c.practiceAreas.filter((x) => x.id !== p.id) }))
                    }
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-[100px_1fr] gap-3 items-start">
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="w-11 h-11 rounded-lg border border-slate-200 flex items-center justify-center bg-slate-50">
                      <Icon size={18} className="text-slate-700" />
                    </div>
                    <Select value={p.icon} onChange={(v) => update(p.id, { icon: v })} options={ICON_NAMES} />
                  </div>
                  <div className="space-y-3">
                    <TextInput
                      value={p.title}
                      onChange={(e) => update(p.id, { title: e.target.value })}
                      placeholder="Titre du domaine"
                    />
                    <TextArea
                      rows={3}
                      value={p.description}
                      onChange={(e) => update(p.id, { description: e.target.value })}
                      placeholder="Description"
                    />
                  </div>
                </div>
              </div>
            );
          })}
          <AddButton
            label="Ajouter un domaine d'intervention"
            onClick={() =>
              setContent((c) => ({
                ...c,
                practiceAreas: [
                  ...c.practiceAreas,
                  { id: uid('p'), icon: 'Scale', title: 'Nouveau domaine', description: '' },
                ],
              }))
            }
          />
        </div>
      </Section>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Parcours / Expériences
// ─────────────────────────────────────────────────────────────────
export function ExperienceTab() {
  const { content, setContent } = useContent();

  const update = (id: string, patch: Partial<ExperienceItem>) => {
    setContent((c) => ({
      ...c,
      experiences: c.experiences.map((x) => (x.id === id ? { ...x, ...patch } : x)),
    }));
  };

  return (
    <div className="space-y-6">
      <Section title="Introduction de la section">
        <Field label="Texte d'introduction">
          <TextArea
            rows={2}
            value={content.experienceIntro}
            onChange={(e) => setContent((c) => ({ ...c, experienceIntro: e.target.value }))}
          />
        </Field>
      </Section>

      <Section title="Expériences & engagements">
        <div className="space-y-4">
          {content.experiences.map((exp, i) => (
            <div key={exp.id} className="border border-slate-200 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">{String(i + 1).padStart(2, '0')}</span>
                <ListItemToolbar
                  canMoveUp={i > 0}
                  canMoveDown={i < content.experiences.length - 1}
                  onMoveUp={() => setContent((c) => ({ ...c, experiences: reorder(c.experiences, i, -1) }))}
                  onMoveDown={() => setContent((c) => ({ ...c, experiences: reorder(c.experiences, i, 1) }))}
                  onDelete={() =>
                    setContent((c) => ({ ...c, experiences: c.experiences.filter((x) => x.id !== exp.id) }))
                  }
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <TextInput
                  value={exp.title}
                  onChange={(e) => update(exp.id, { title: e.target.value })}
                  placeholder="Titre / fonction"
                />
                <TextInput
                  value={exp.org}
                  onChange={(e) => update(exp.id, { org: e.target.value })}
                  placeholder="Organisation"
                />
              </div>
              <TextArea
                rows={2}
                value={exp.detail}
                onChange={(e) => update(exp.id, { detail: e.target.value })}
                placeholder="Détail (optionnel)"
              />
            </div>
          ))}
          <AddButton
            label="Ajouter une expérience"
            onClick={() =>
              setContent((c) => ({
                ...c,
                experiences: [...c.experiences, { id: uid('e'), title: 'Nouvelle expérience', org: '', detail: '' }],
              }))
            }
          />
        </div>
      </Section>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Galerie internationale (Moscou / Roscongress)
// ─────────────────────────────────────────────────────────────────
export function GalleryTab() {
  const { content, setContent } = useContent();

  const update = (id: string, patch: Partial<GalleryImage>) => {
    setContent((c) => ({
      ...c,
      gallery: c.gallery.map((g) => (g.id === id ? { ...g, ...patch } : g)),
    }));
  };

  return (
    <div className="space-y-6">
      <Section title="Introduction de la section">
        <Field label="Texte d'introduction (rayonnement international)">
          <TextArea
            rows={2}
            value={content.internationalIntro}
            onChange={(e) => setContent((c) => ({ ...c, internationalIntro: e.target.value }))}
          />
        </Field>
      </Section>

      <Section title="Galerie photo" description="Ajoutez, réordonnez ou supprimez les photos. Activez « Grande vignette » pour mettre une image en avant.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {content.gallery.map((img, i) => (
            <div key={img.id} className="border border-slate-200 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">{String(i + 1).padStart(2, '0')}</span>
                <ListItemToolbar
                  canMoveUp={i > 0}
                  canMoveDown={i < content.gallery.length - 1}
                  onMoveUp={() => setContent((c) => ({ ...c, gallery: reorder(c.gallery, i, -1) }))}
                  onMoveDown={() => setContent((c) => ({ ...c, gallery: reorder(c.gallery, i, 1) }))}
                  onDelete={() => setContent((c) => ({ ...c, gallery: c.gallery.filter((x) => x.id !== img.id) }))}
                />
              </div>
              <ImageField label="Photo" value={img.src} onChange={(v) => update(img.id, { src: v })} />
              <TextInput
                value={img.alt}
                onChange={(e) => update(img.id, { alt: e.target.value })}
                placeholder="Légende / texte alternatif"
              />
              <label className="flex items-center gap-2 text-sm text-slate-600">
                <input
                  type="checkbox"
                  checked={!!img.large}
                  onChange={(e) => update(img.id, { large: e.target.checked })}
                  className="rounded border-slate-300 text-indigo-800 focus:ring-indigo-700"
                />
                Grande vignette (mise en avant)
              </label>
            </div>
          ))}
        </div>
        <AddButton
          label="Ajouter une photo à la galerie"
          onClick={() =>
            setContent((c) => ({
              ...c,
              gallery: [...c.gallery, { id: uid('g'), src: '', alt: 'Nouvelle photo' }],
            }))
          }
        />
      </Section>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Publications & distinctions
// ─────────────────────────────────────────────────────────────────
export function PublicationsTab() {
  const { content, setContent } = useContent();

  const update = (id: string, patch: Partial<PublicationItem>) => {
    setContent((c) => ({
      ...c,
      publications: c.publications.map((p) => (p.id === id ? { ...p, ...patch } : p)),
    }));
  };

  return (
    <div className="space-y-6">
      <Section title="Introduction de la page">
        <Field label="Texte d'introduction (page Publications)">
          <TextArea
            rows={2}
            value={content.publicationsIntro}
            onChange={(e) => setContent((c) => ({ ...c, publicationsIntro: e.target.value }))}
            placeholder="Ouvrages, articles, prix et policy briefs portant la voix du cabinet..."
          />
        </Field>
      </Section>

      <Section title="Publications, prix & contributions" description="Gérez les ouvrages, articles, prix et études. Renseignez la couverture et le prix pour afficher le bouton de réservation.">
        <div className="space-y-6">
          {content.publications.map((pub, i) => {
            const Icon = getIcon(pub.icon);
            return (
              <div key={pub.id} className="border border-slate-200 rounded-lg p-5 space-y-4 bg-slate-50/50">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-slate-400 font-bold">{String(i + 1).padStart(2, '0')}</span>
                    <span className="text-xs uppercase font-semibold px-2.5 py-0.5 bg-indigo-100 text-indigo-700 rounded">
                      {pub.type || 'Publication'}
                    </span>
                  </div>
                  <ListItemToolbar
                    canMoveUp={i > 0}
                    canMoveDown={i < content.publications.length - 1}
                    onMoveUp={() => setContent((c) => ({ ...c, publications: reorder(c.publications, i, -1) }))}
                    onMoveDown={() => setContent((c) => ({ ...c, publications: reorder(c.publications, i, 1) }))}
                    onDelete={() =>
                      setContent((c) => ({ ...c, publications: c.publications.filter((x) => x.id !== pub.id) }))
                    }
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Field label="Type (ex: Ouvrage, Article...)">
                    <TextInput
                      value={pub.type}
                      onChange={(e) => update(pub.id, { type: e.target.value })}
                      placeholder="Type"
                    />
                  </Field>

                  <Field label="Icône">
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center bg-white shrink-0">
                        <Icon size={16} className="text-slate-700" />
                      </div>
                      <Select value={pub.icon} onChange={(v) => update(pub.id, { icon: v })} options={ICON_NAMES} />
                    </div>
                  </Field>

                  <Field label="Prix (optionnel pour commande)">
                    <TextInput
                      value={pub.price || ''}
                      onChange={(e) => update(pub.id, { price: e.target.value })}
                      placeholder="Ex: 12 TND (12 د.ت)"
                    />
                  </Field>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Field label="Titre en français">
                    <TextInput
                      value={pub.title}
                      onChange={(e) => update(pub.id, { title: e.target.value })}
                      placeholder="Titre de la publication"
                    />
                  </Field>

                  <Field label="Titre en arabe (optionnel)">
                    <TextInput
                      value={pub.titleAr || ''}
                      onChange={(e) => update(pub.id, { titleAr: e.target.value })}
                      placeholder="العنوان بالعربية"
                      className="dir-rtl font-serif"
                    />
                  </Field>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Field label="Référence / Éditeur / Année">
                    <TextInput
                      value={pub.meta}
                      onChange={(e) => update(pub.id, { meta: e.target.value })}
                      placeholder="Ex: Latrach Édition — Tunis 2026"
                    />
                  </Field>

                  <Field label="Code ISBN (optionnel)">
                    <TextInput
                      value={pub.isbn || ''}
                      onChange={(e) => update(pub.id, { isbn: e.target.value })}
                      placeholder="Ex: 978-9938-20-976-1"
                    />
                  </Field>
                </div>

                <ImageField
                  label="Image de couverture de l'ouvrage (optionnel)"
                  value={pub.coverImage || ''}
                  onChange={(v) => update(pub.id, { coverImage: v })}
                />

                <Field label="Résumé court (affiché dans la grille)">
                  <TextArea
                    rows={2}
                    value={pub.description || ''}
                    onChange={(e) => update(pub.id, { description: e.target.value })}
                    placeholder="Synthèse de l'ouvrage ou de l'article..."
                  />
                </Field>

                <Field label="Contenu détaillé / Sommaire / Extrait (affiché sur sa page dédiée)">
                  <TextArea
                    rows={4}
                    value={pub.fullContent || ''}
                    onChange={(e) => update(pub.id, { fullContent: e.target.value })}
                    placeholder="Texte intégral, extrait ou sommaire détaillé..."
                  />
                </Field>
              </div>
            );
          })}

          <AddButton
            label="Ajouter une publication"
            onClick={() =>
              setContent((c) => ({
                ...c,
                publications: [
                  ...c.publications,
                  { id: uid('pub'), type: 'Article', icon: 'FileText', title: 'Nouvelle publication', meta: '' },
                ],
              }))
            }
          />
        </div>
      </Section>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Gestion des Réservations & Commandes d'ouvrages
// ─────────────────────────────────────────────────────────────────
export function ReservationsTab() {
  const { content, setContent } = useContent();
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const reservations = content.reservations || [];

  const filtered = statusFilter === 'all'
    ? reservations
    : reservations.filter((r) => r.status === statusFilter);

  const updateStatus = (id: string, status: 'pending' | 'confirmed' | 'delivered' | 'cancelled') => {
    setContent((c) => ({
      ...c,
      reservations: (c.reservations || []).map((r) => (r.id === id ? { ...r, status } : r)),
    }));
  };

  const deleteReservation = (id: string) => {
    if (confirm('Voulez-vous supprimer cette réservation ?')) {
      setContent((c) => ({
        ...c,
        reservations: (c.reservations || []).filter((r) => r.id !== id),
      }));
    }
  };

  const statusBadges: Record<string, { label: string; bg: string }> = {
    pending: { label: 'En attente', bg: 'bg-amber-100 text-amber-900 border-amber-300 font-semibold' },
    confirmed: { label: 'Confirmée', bg: 'bg-blue-100 text-blue-900 border-blue-300 font-semibold' },
    delivered: { label: 'Livrée / Honorée', bg: 'bg-emerald-100 text-emerald-900 border-emerald-300 font-semibold' },
    cancelled: { label: 'Annulée', bg: 'bg-rose-100 text-rose-900 border-rose-300 font-semibold' },
  };

  return (
    <div className="space-y-6 font-sans">
      <Section
        title="Commandes & Réservations d'ouvrages"
        description="Gérez les demandes de réservation déposées par les visiteurs pour les ouvrages du cabinet."
      >
        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-ink/10">
          {[
            { id: 'all', label: 'Toutes', count: reservations.length },
            { id: 'pending', label: 'En attente', count: reservations.filter((r) => r.status === 'pending').length },
            { id: 'confirmed', label: 'Confirmées', count: reservations.filter((r) => r.status === 'confirmed').length },
            { id: 'delivered', label: 'Livrées', count: reservations.filter((r) => r.status === 'delivered').length },
            { id: 'cancelled', label: 'Annulées', count: reservations.filter((r) => r.status === 'cancelled').length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-4 py-2 text-xs font-semibold tracking-wider uppercase rounded transition-all duration-300 border ${
                statusFilter === tab.id
                  ? 'bg-gold text-paper border-gold shadow-sm'
                  : 'bg-cream/40 text-ink/70 border-ink/15 hover:border-gold hover:text-gold'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="p-12 text-center text-ink/40 bg-cream/30 rounded border border-dashed border-ink/20 space-y-2">
            <p className="font-serif font-semibold text-lg text-ink">Aucune réservation trouvée</p>
            <p className="text-xs text-ink/60">Les demandes de commande déposées par les clients s'afficheront ici en temps réel.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((res) => {
              const badge = statusBadges[res.status] || statusBadges.pending;
              return (
                <div key={res.id} className="bg-paper border border-ink/15 rounded p-5 shadow-sm space-y-4 hover:border-gold/50 transition-colors">
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-ink/10">
                    <div>
                      <span className="text-xs font-mono font-bold text-gold mr-3">
                        N° #{res.id.slice(-6).toUpperCase()}
                      </span>
                      <span className="font-serif font-bold text-ink text-base">{res.publicationTitle}</span>
                      <span className="ml-3 text-xs bg-cream text-ink/80 px-2.5 py-0.5 border border-ink/10 rounded font-mono">
                        Qté: {res.quantity || 1}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`text-xs px-3 py-1 rounded-full border ${badge.bg}`}>
                        {badge.label}
                      </span>
                      <button
                        onClick={() => deleteReservation(res.id)}
                        className="text-xs text-rose-600 hover:text-rose-800 font-semibold uppercase tracking-wider px-2 py-1"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-ink/80">
                    <div>
                      <span className="text-ink/40 uppercase tracking-widest block font-semibold text-[10px] mb-1">
                        Client / Destinataire
                      </span>
                      <p className="font-medium text-ink text-sm">{res.clientName}</p>
                    </div>

                    <div>
                      <span className="text-ink/40 uppercase tracking-widest block font-semibold text-[10px] mb-1">
                        Téléphone
                      </span>
                      <a href={`tel:${res.clientPhone}`} className="font-medium text-gold hover:underline text-sm font-mono">
                        📞 {res.clientPhone}
                      </a>
                    </div>

                    <div>
                      <span className="text-ink/40 uppercase tracking-widest block font-semibold text-[10px] mb-1">
                        Adresse E-mail
                      </span>
                      <p className="font-medium text-ink">{res.clientEmail || 'Non communiquée'}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-ink/80 bg-cream/40 p-4 rounded border border-ink/10">
                    <div>
                      <span className="text-ink/40 uppercase tracking-widest block font-semibold text-[10px] mb-1">
                        Adresse de livraison / Ville
                      </span>
                      <p className="font-medium text-ink">{res.clientAddress}</p>
                    </div>

                    <div>
                      <span className="text-ink/40 uppercase tracking-widest block font-semibold text-[10px] mb-1">
                        Remarques & Instructions du client
                      </span>
                      <p className="italic text-ink/70 font-serif">{res.notes || 'Aucune remarque particulière.'}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs border-t border-ink/10">
                    <span className="text-ink/50 text-[11px]">
                      Déposée le {new Date(res.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </span>

                    <div className="flex items-center gap-2">
                      <span className="text-ink/70 font-semibold text-xs uppercase tracking-wider">État :</span>
                      <select
                        value={res.status}
                        onChange={(e) => updateStatus(res.id, e.target.value as any)}
                        className="bg-paper border border-ink/20 rounded text-xs px-3 py-1.5 outline-none focus:border-gold font-medium cursor-pointer"
                      >
                        <option value="pending">En attente</option>
                        <option value="confirmed">Confirmée</option>
                        <option value="delivered">Livrée / Honorée</option>
                        <option value="cancelled">Annulée</option>
                      </select>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Section>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Clients & partenaires
// ─────────────────────────────────────────────────────────────────
export function ClientsTab() {
  const { content, setContent } = useContent();

  const update = (id: string, patch: Partial<ClientItem>) => {
    setContent((c) => ({
      ...c,
      clients: c.clients.map((x) => (x.id === id ? { ...x, ...patch } : x)),
    }));
  };

  return (
    <Section title="Clients & partenaires" description="Ce défilé apparaît juste avant la section contact.">
      <div className="space-y-3">
        {content.clients.map((cl, i) => (
          <div key={cl.id} className="flex items-center gap-3">
            <TextInput
              value={cl.name}
              onChange={(e) => update(cl.id, { name: e.target.value })}
              className="flex-1"
              placeholder="Nom du client / partenaire"
            />
            <ListItemToolbar
              canMoveUp={i > 0}
              canMoveDown={i < content.clients.length - 1}
              onMoveUp={() => setContent((c) => ({ ...c, clients: reorder(c.clients, i, -1) }))}
              onMoveDown={() => setContent((c) => ({ ...c, clients: reorder(c.clients, i, 1) }))}
              onDelete={() => setContent((c) => ({ ...c, clients: c.clients.filter((x) => x.id !== cl.id) }))}
            />
          </div>
        ))}
        <AddButton
          label="Ajouter un client / partenaire"
          onClick={() =>
            setContent((c) => ({ ...c, clients: [...c.clients, { id: uid('c'), name: 'Nouveau partenaire' }] }))
          }
        />
      </div>
    </Section>
  );
}
