import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X, Globe } from 'lucide-react';
import { useContent } from '../lib/content';
import { getIcon } from '../lib/icons';

export const PAGES = {
  fr: [
    { label: 'Accueil', path: '#/' },
    { label: 'Cabinet', path: '#/cabinet' },
    { label: 'Expertises', path: '#/expertises' },
    { label: 'Parcours', path: '#/parcours' },
    { label: 'Publications', path: '#/publications' },
    { label: 'Contact', path: '#/contact' },
  ],
  ar: [
    { label: 'الرئيسية', path: '#/' },
    { label: 'المكتب', path: '#/cabinet' },
    { label: 'الخبرات', path: '#/expertises' },
    { label: 'المسار', path: '#/parcours' },
    { label: 'المنشورات', path: '#/publications' },
    { label: 'اتصل بنا', path: '#/contact' },
  ],
};

function normalize(hash: string): string {
  const clean = hash.split('?')[0].split('#')[1] || '';
  const path = `/${clean}`.replace(/\/+/g, '/');
  return path === '/' ? '#/' : `#${path.replace(/\/$/, '')}`;
}

export default function Nav({ currentHash }: { currentHash: string }) {
  const { content, lang, setLang } = useContent();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const current = normalize(currentHash);
  const IconIdentity = getIcon('Scale');
  
  const pages = PAGES[lang];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-paper/90 backdrop-blur-md border-b border-ink/10 py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <a href="#/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 flex items-center justify-center border border-ink/20 group-hover:border-gold group-hover:bg-gold transition-all duration-300">
              <IconIdentity
                size={20}
                className="text-ink group-hover:text-white transition-colors duration-300"
              />
            </div>
            <div className="leading-tight">
              <div className="font-serif text-lg font-semibold tracking-tight text-ink">
                {lang === 'ar' && content.brandNameAr ? content.brandNameAr : content.brandName}
              </div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-ink/60">
                {lang === 'ar' && content.brandTaglineAr ? content.brandTaglineAr : content.brandTagline}
              </div>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-9">
            {pages.map((p) => {
              const active = current === p.path;
              return (
                <a
                  key={p.path}
                  href={p.path}
                  className={`text-sm font-medium transition-colors duration-300 hover-line ${
                    active ? 'text-gold' : 'text-ink/80 hover:text-gold'
                  }`}
                >
                  {p.label}
                </a>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => setLang(lang === 'fr' ? 'ar' : 'fr')}
              className="flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-ink/60 hover:text-gold transition-colors"
            >
              <Globe size={14} />
              {lang === 'fr' ? 'AR' : 'FR'}
            </button>
            <a
              href="#/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-ink text-paper text-sm font-medium hover:bg-gold transition-all duration-300 group"
            >
              {lang === 'ar' ? 'استشارة' : 'Consultation'}
              <ArrowUpRight size={16} className={`transition-transform ${lang === 'ar' ? 'group-hover:-translate-x-0.5' : 'group-hover:translate-x-0.5'} group-hover:-translate-y-0.5`} />
            </a>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={() => setLang(lang === 'fr' ? 'ar' : 'fr')}
              className="flex items-center gap-1 text-xs font-semibold text-ink/80"
            >
              {lang === 'fr' ? 'AR' : 'FR'}
            </button>
            <button
              onClick={() => setOpen(!open)}
              className="text-ink"
              aria-label="Menu"
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-40 bg-paper md:hidden pt-24 px-6">
          <nav className="flex flex-col gap-6">
            {pages.map((p) => (
              <a
                key={p.path}
                href={p.path}
                onClick={() => setOpen(false)}
                className={`text-3xl font-serif py-2 border-b border-ink/10 ${
                  current === p.path ? 'text-gold' : 'text-ink'
                }`}
              >
                {p.label}
              </a>
            ))}
            <a
              href="#/contact"
              onClick={() => setOpen(false)}
              className="mt-6 inline-flex items-center justify-center gap-2 px-5 py-4 bg-ink text-paper font-medium"
            >
              {lang === 'ar' ? 'حجز موعد' : 'Prendre rendez-vous'}
              <ArrowUpRight size={18} />
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
