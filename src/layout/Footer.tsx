import { Phone, Mail, MapPin, LockKeyhole } from 'lucide-react';
import { useContent } from '../lib/content';
import { getIcon } from '../lib/icons';
import { PAGES } from './Nav';

export default function Footer() {
  const { content, lang } = useContent();
  const IconIdentity = getIcon('Scale');

  const bName = lang === 'ar' && content.brandNameAr ? content.brandNameAr : content.brandName;
  const fName = lang === 'ar' && content.heroFirstNameAr ? content.heroFirstNameAr : content.heroFirstName;
  const lName = lang === 'ar' && content.heroLastNameAr ? content.heroLastNameAr : content.heroLastName;
  const tagline = lang === 'ar' && content.footerTaglineAr ? content.footerTaglineAr : content.footerTagline;
  const addr1 = lang === 'ar' && content.addressLine1Ar ? content.addressLine1Ar : content.addressLine1;
  const addr2 = lang === 'ar' && content.addressLine2Ar ? content.addressLine2Ar : content.addressLine2;

  const pages = PAGES[lang];

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
                  {bName.toLowerCase()}
                </div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-paper/60">
                  {lang === 'ar' ? 'مكتب محاماة' : "Cabinet d'Avocat"}
                </div>
              </div>
            </div>
            <p className="text-paper/60 leading-relaxed max-w-sm text-sm mt-6">
              {lang === 'ar' 
                ? `الأستاذ ${fName} ${lName} — محام لدى التعقيب. قانون الشركات، القانون الجزائي الخاص، النزاعات والوساطة.` 
                : `Maître ${fName} ${lName} — Avocat près la Cour de Cassation. Droit des sociétés, droit pénal privé, contentieux & médiation.`}
            </p>
          </div>

          <div className="md:col-span-3">
            <div className="text-xs uppercase tracking-[0.25em] text-gold font-semibold mb-5">
              {lang === 'ar' ? 'تصفح' : 'Navigation'}
            </div>
            <ul className="space-y-2 text-sm">
              {pages.map((p) => (
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
              {lang === 'ar' ? 'معلومات الاتصال' : 'Coordonnées'}
            </div>
            <ul className="space-y-3 text-sm text-paper/70">
              <li className="flex items-start gap-2">
                <MapPin size={14} className="mt-0.5 text-gold shrink-0" />
                <span>{addr1} {addr2}</span>
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
            © {new Date().getFullYear()} {lang === 'ar' ? 'مكتب المحاماة' : "Cabinet d'Avocat"} {bName} — {lang === 'ar' ? 'جميع الحقوق محفوظة.' : 'Tous droits réservés.'}
          </div>
          <div className="font-serif italic">
            {tagline}
          </div>
          <a
            href="#/admin"
            className="flex items-center gap-1.5 text-paper/30 hover:text-gold transition-colors"
            title={lang === 'ar' ? 'فضاء الإدارة' : 'Espace administrateur'}
          >
            <LockKeyhole size={12} />
            {lang === 'ar' ? 'الإدارة' : 'Administration'}
          </a>
        </div>
      </div>
    </footer>
  );
}
