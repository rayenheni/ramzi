import { Phone, Mail, MapPin, LockKeyhole } from 'lucide-react';
import { useContent } from '../lib/content';
import { getIcon } from '../lib/icons';
import { PAGES } from './Nav';

export default function Footer() {
  const { content } = useContent();
  const IconIdentity = getIcon('Scale');

  return (
    <footer className="bg-ink text-paper py-16">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-paper/10">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 flex items-center justify-center border border-gold">
                <IconIdentity size={20} className="text-gold" />
              </div>
              <div>
                <div className="font-display text-2xl leading-none capitalize">
                  {content.brandName.toLowerCase()}
                </div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-paper/60">
                  Cabinet d'Avocat
                </div>
              </div>
            </div>
            <p className="text-paper/60 leading-relaxed max-w-sm text-sm mt-6">
              Maître {content.heroFirstName} {content.heroLastName} — Avocat près la Cour d'Appel.
              Droit des affaires, droit médical, droit de la famille, droits humains.
            </p>
          </div>

          <div className="md:col-span-3">
            <div className="text-xs uppercase tracking-[0.25em] text-gold font-semibold mb-5">
              Navigation
            </div>
            <ul className="space-y-2 text-sm">
              {PAGES.map((p) => (
                <li key={p.path}>
                  <a href={p.path} className="hover:text-gold transition-colors">
                    {p.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <div className="text-xs uppercase tracking-[0.25em] text-gold font-semibold mb-5">
              Coordonnées
            </div>
            <ul className="space-y-3 text-sm text-paper/70">
              <li className="flex items-start gap-2">
                <MapPin size={14} className="mt-0.5 text-gold shrink-0" />
                <span>{content.addressLine1} {content.addressLine2}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-gold shrink-0" />
                <a href={`tel:${content.phone.replace(/\s/g, '')}`} className="hover:text-gold transition-colors">{content.phone}</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-gold shrink-0" />
                <a href={`mailto:${content.email}`} className="hover:text-gold transition-colors break-all">{content.email}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-paper/50">
          <div>
            © {new Date().getFullYear()} Cabinet d'Avocat {content.brandName} — Tous droits réservés.
          </div>
          <div className="font-serif italic">
            {content.footerTagline}
          </div>
          <a
            href="#/admin"
            className="flex items-center gap-1.5 text-paper/30 hover:text-gold transition-colors"
            title="Espace administrateur"
          >
            <LockKeyhole size={12} />
            Administration
          </a>
        </div>
      </div>
    </footer>
  );
}
