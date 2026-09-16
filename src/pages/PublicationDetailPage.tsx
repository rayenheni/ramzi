import { useState } from 'react';
import { useContent, uid } from '../lib/content';
import { PageHeader, SmartImage, ImageLightbox } from '../components/shared';
import { ArrowLeft, BookOpen, ShoppingBag, CheckCircle2, ShieldCheck, MapPin, Phone, Mail, FileText, Tag, Award } from 'lucide-react';
import { getIcon } from '../lib/icons';

export default function PublicationDetailPage({ publicationId }: { publicationId: string }) {
  const { content, setContent } = useContent();

  const publication = content.publications.find((p) => p.id === publicationId) || content.publications[0];

  const [showCoverModal, setShowCoverModal] = useState(false);
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [reservationSuccess, setReservationSuccess] = useState<string | null>(null);

  // Reservation form state
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientAddress, setClientAddress] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const reservationId = uid('res');
    const newReservation = {
      id: reservationId,
      publicationId: publication.id,
      publicationTitle: publication.title,
      clientName,
      clientPhone,
      clientEmail,
      clientAddress,
      quantity: Number(quantity) || 1,
      status: 'pending' as const,
      notes,
      createdAt: new Date().toISOString(),
    };

    setContent((prev) => ({
      ...prev,
      reservations: [newReservation, ...(prev.reservations || [])],
    }));

    setSubmitting(false);
    setShowReservationModal(false);
    setReservationSuccess(reservationId);

    // Reset form
    setClientName('');
    setClientPhone('');
    setClientEmail('');
    setClientAddress('');
    setQuantity(1);
    setNotes('');
  };

  const Icon = getIcon(publication.icon);

  return (
    <div className="pt-32 pb-24 bg-paper min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Back Link */}
        <div className="mb-8">
          <a
            href="#/publications"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-ink/60 hover:text-gold transition-colors font-medium"
          >
            <ArrowLeft size={16} />
            Retour à toutes les publications
          </a>
        </div>

        {/* Success Banner */}
        {reservationSuccess && (
          <div className="mb-10 p-6 bg-emerald-900/10 border-2 border-emerald-600 text-emerald-950 rounded-md flex items-start gap-4 shadow-sm animate-fade-in">
            <CheckCircle2 size={28} className="text-emerald-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-serif text-lg font-semibold text-emerald-900">
                Demande de réservation enregistrée avec succès !
              </h4>
              <p className="text-sm text-emerald-800 leading-relaxed">
                Votre demande de réservation n° <code className="font-mono font-bold">{reservationSuccess}</code> pour l'ouvrage « {publication.title} » a bien été transmise au cabinet. Notre équipe vous contactera sous peu au téléphone indiqué pour confirmer la livraison.
              </p>
              <button
                onClick={() => setReservationSuccess(null)}
                className="text-xs uppercase tracking-wider underline text-emerald-900 pt-2 font-medium"
              >
                Fermer ce message
              </button>
            </div>
          </div>
        )}

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Book Cover / Media Showcase */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 space-y-6">
              {publication.coverImage ? (
                <div
                  onClick={() => setShowCoverModal(true)}
                  className="relative group cursor-pointer overflow-hidden shadow-2xl border border-ink/15 rounded-sm bg-cream/50"
                >
                  <SmartImage
                    src={publication.coverImage}
                    alt={publication.title}
                    label="Couverture de la publication"
                    showZoomIcon={true}
                    className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-ink/90 backdrop-blur-sm text-paper py-3 px-4 text-center text-xs tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    🔍 Agrandir la couverture
                  </div>
                </div>
              ) : (
                <div className="w-full aspect-[3/4] bg-cream/60 border border-ink/10 flex flex-col items-center justify-center p-8 text-center text-ink/40 space-y-3">
                  <Icon size={48} className="text-gold" />
                  <span className="text-xs uppercase tracking-widest">{publication.type}</span>
                </div>
              )}

              {/* Order / Reservation CTA Box */}
              <div className="bg-cream/40 border border-ink/15 p-6 space-y-4 rounded-sm shadow-sm">
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-gold font-semibold">
                  <ShoppingBag size={16} />
                  Disponibilité & Commande
                </div>

                {publication.price && (
                  <div className="text-2xl font-serif font-bold text-ink">
                    {publication.price}
                  </div>
                )}

                <p className="text-xs text-ink/70 leading-relaxed">
                  Réservez un exemplaire directement auprès du cabinet. Remise en main propre ou livraison sur toute la Tunisie.
                </p>

                <button
                  onClick={() => setShowReservationModal(true)}
                  className="w-full inline-flex items-center justify-center gap-3 px-6 py-4 bg-ink text-paper font-medium hover:bg-gold transition-all duration-300 shadow-md group"
                >
                  <ShoppingBag size={18} className="group-hover:scale-110 transition-transform" />
                  Réserver / Commander un exemplaire
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Publication Description */}
          <div className="lg:col-span-8 space-y-8">
            {/* Header info */}
            <div className="space-y-4 border-b border-ink/10 pb-8">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 bg-gold text-paper text-xs uppercase tracking-widest font-semibold">
                  {publication.type}
                </span>
                <span className="text-xs text-ink/50 uppercase tracking-wider">
                  {publication.meta}
                </span>
              </div>

              {publication.titleAr && (
                <h1 className="font-serif text-3xl md:text-5xl text-gold leading-tight dir-rtl font-semibold pt-2">
                  {publication.titleAr}
                </h1>
              )}

              <h2 className="font-serif text-2xl md:text-4xl text-ink leading-snug">
                {publication.title}
              </h2>

              {/* Badges bar */}
              <div className="pt-2 flex flex-wrap gap-4 text-xs md:text-sm text-ink/70">
                {publication.isbn && (
                  <div className="bg-cream/60 px-4 py-2 border border-ink/10 flex items-center gap-2">
                    <Tag size={14} className="text-gold" />
                    <span><strong className="font-medium text-ink">ISBN :</strong> {publication.isbn}</span>
                  </div>
                )}
                {publication.price && (
                  <div className="bg-cream/60 px-4 py-2 border border-ink/10 flex items-center gap-2">
                    <ShoppingBag size={14} className="text-gold" />
                    <span><strong className="font-medium text-ink">Prix :</strong> {publication.price}</span>
                  </div>
                )}
                <div className="bg-cream/60 px-4 py-2 border border-ink/10 flex items-center gap-2">
                  <ShieldCheck size={14} className="text-gold" />
                  <span><strong className="font-medium text-ink">Auteur :</strong> Me {content.heroFirstName} {content.heroLastName}</span>
                </div>
              </div>
            </div>

            {/* Abstract / Summary */}
            {publication.description && (
              <div className="space-y-3">
                <h3 className="text-xs uppercase tracking-[0.25em] text-gold font-semibold">
                  Présentation & Résumé
                </h3>
                <p className="text-lg md:text-xl text-ink/80 leading-relaxed font-serif italic border-l-2 border-gold pl-5 py-1">
                  {publication.description}
                </p>
              </div>
            )}

            {/* Full text content */}
            {publication.fullContent && (
              <div className="space-y-4 pt-4">
                <h3 className="text-xs uppercase tracking-[0.25em] text-gold font-semibold">
                  Extrait & Contenu de l'ouvrage
                </h3>
                <div className="text-base md:text-lg text-ink/80 leading-loose space-y-4 whitespace-pre-line bg-cream/20 p-6 border border-ink/10 rounded-sm">
                  {publication.fullContent}
                </div>
              </div>
            )}

            {/* Bottom CTA */}
            <div className="pt-8 border-t border-ink/10 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <h4 className="font-serif text-lg text-ink">Vous souhaitez vous procurer cet ouvrage ?</h4>
                <p className="text-sm text-ink/60">Contactez directement le cabinet d'avocat ou effectuez une réservation en ligne.</p>
              </div>
              <button
                onClick={() => setShowReservationModal(true)}
                className="px-6 py-3.5 bg-ink text-paper text-sm font-medium hover:bg-gold transition-colors shrink-0 flex items-center gap-2"
              >
                <ShoppingBag size={16} />
                Commander un exemplaire
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Cover Modal */}
      {showCoverModal && publication.coverImage && (
        <ImageLightbox
          items={[
            {
              src: publication.coverImage,
              alt: `Couverture officielle : ${publication.title} — Maître ${content.heroFirstName} ${content.heroLastName}`,
            },
          ]}
          currentIndex={0}
          onClose={() => setShowCoverModal(false)}
          onNavigate={() => {}}
        />
      )}

      {/* Reservation Form Modal */}
      {showReservationModal && (
        <div className="fixed inset-0 z-50 bg-ink/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
          <div className="bg-paper max-w-lg w-full p-6 md:p-8 border border-ink/20 shadow-2xl relative my-8">
            <div className="flex items-center justify-between border-b border-ink/10 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-cream/80 border border-ink/15 flex items-center justify-center">
                  <ShoppingBag size={18} className="text-gold" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-ink">Réservation d'ouvrage</h3>
                  <p className="text-xs text-ink/60 line-clamp-1">{publication.title}</p>
                </div>
              </div>
              <button
                onClick={() => setShowReservationModal(false)}
                className="text-ink/40 hover:text-ink text-xl font-light"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleReservationSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-ink/70 font-semibold mb-1">
                  Nom et Prénom *
                </label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Ex: Maitre Karim Ben Salem"
                  className="w-full px-4 py-2.5 bg-cream/40 border border-ink/20 text-sm text-ink outline-none focus:border-gold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-ink/70 font-semibold mb-1">
                    Téléphone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="+216 98 123 456"
                    className="w-full px-4 py-2.5 bg-cream/40 border border-ink/20 text-sm text-ink outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-ink/70 font-semibold mb-1">
                    Nombre d'exemplaires
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={50}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full px-4 py-2.5 bg-cream/40 border border-ink/20 text-sm text-ink outline-none focus:border-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-ink/70 font-semibold mb-1">
                  Adresse e-mail
                </label>
                <input
                  type="email"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  placeholder="nom@exemple.com"
                  className="w-full px-4 py-2.5 bg-cream/40 border border-ink/20 text-sm text-ink outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-ink/70 font-semibold mb-1">
                  Adresse de livraison / Ville *
                </label>
                <input
                  type="text"
                  required
                  value={clientAddress}
                  onChange={(e) => setClientAddress(e.target.value)}
                  placeholder="Ex: Rue Farhat Hached, Sousse"
                  className="w-full px-4 py-2.5 bg-cream/40 border border-ink/20 text-sm text-ink outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-ink/70 font-semibold mb-1">
                  Remarques ou instructions
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Souhaitez-vous une dédicace ou une livraison urgente ?"
                  className="w-full px-4 py-2.5 bg-cream/40 border border-ink/20 text-sm text-ink outline-none focus:border-gold"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-ink/10">
                <button
                  type="button"
                  onClick={() => setShowReservationModal(false)}
                  className="px-5 py-2.5 border border-ink/20 text-sm text-ink hover:bg-cream/60 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 bg-ink text-paper text-sm font-medium hover:bg-gold transition-colors flex items-center gap-2"
                >
                  Confirmé la réservation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
