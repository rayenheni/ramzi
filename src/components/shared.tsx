import { useEffect, useRef, useState } from 'react';
import { ImageOff, Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useContent } from '../lib/content';

// ─────────────────────────────────────────────────────────────────
// SmartImage: shows the real photo when available, otherwise falls
// back to an elegant placeholder (no broken icon).
// ─────────────────────────────────────────────────────────────────
export function SmartImage({
  src,
  alt,
  className = '',
  label,
  onClick,
  showZoomIcon = false,
}: {
  src: string;
  alt: string;
  className?: string;
  label?: string;
  onClick?: () => void;
  showZoomIcon?: boolean;
}) {
  const [errored, setErrored] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (!src || errored) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-ink/5 via-cream to-ink/10 border border-ink/10 text-ink/40 ${className}`}
      >
        <ImageOff size={28} strokeWidth={1.5} />
        {label && (
          <span className="text-[11px] uppercase tracking-[0.15em] text-center px-4 text-ink/40">
            {label}
          </span>
        )}
      </div>
    );
  }

  const isClickable = Boolean(onClick);

  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden ${isClickable ? 'cursor-pointer group' : ''} ${className}`}
    >
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={() => setErrored(true)}
        className={`w-full h-full object-cover transition-all duration-700 ${
          loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
        } ${isClickable ? 'group-hover:scale-105' : ''}`}
        loading="lazy"
      />
      {isClickable && showZoomIcon && (
        <div className="absolute inset-0 bg-ink/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="p-3 bg-paper/90 rounded-full text-ink shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <Maximize2 size={18} />
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// ImageLightbox: Fullscreen modal to inspect photos in high quality
// ─────────────────────────────────────────────────────────────────
export interface LightboxItem {
  src: string;
  alt: string;
  category?: string;
}

export function ImageLightbox({
  items,
  currentIndex,
  onClose,
  onNavigate,
}: {
  items: LightboxItem[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const { lang } = useContent();
  const isRtl = lang === 'ar';

  useEffect(() => {
    if (currentIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNavigate((currentIndex + (isRtl ? 1 : -1) + items.length) % items.length);
      if (e.key === 'ArrowRight') onNavigate((currentIndex + (isRtl ? -1 : 1) + items.length) % items.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, items.length, onClose, onNavigate, isRtl]);

  if (currentIndex === null || !items[currentIndex]) return null;

  const current = items[currentIndex];
  const goPrev = () => onNavigate((currentIndex + (isRtl ? 1 : -1) + items.length) % items.length);
  const goNext = () => onNavigate((currentIndex + (isRtl ? -1 : 1) + items.length) % items.length);

  return (
    <div className="fixed inset-0 z-50 bg-ink/95 backdrop-blur-md flex flex-col justify-between p-4 md:p-8 animate-fade-in">
      {/* Header Bar */}
      <div className="flex items-center justify-between text-paper/80 border-b border-paper/10 pb-4">
        <div className="flex items-center gap-3">
          <span className="text-xs uppercase tracking-[0.25em] text-gold font-medium">
            {isRtl ? 'صورة' : 'Photo'} {currentIndex + 1} / {items.length}
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-paper/10 rounded-full text-paper/80 hover:text-paper transition-colors"
          title={isRtl ? 'إغلاق (Esc)' : 'Fermer (Échap)'}
        >
          <X size={24} />
        </button>
      </div>

      {/* Main Image Container */}
      <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
        {items.length > 1 && (
          <button
            onClick={goPrev}
            className="absolute start-2 md:start-6 z-10 p-3 bg-ink/60 hover:bg-gold text-paper rounded-full transition-all duration-300 backdrop-blur-sm"
            title={isRtl ? 'الصورة السابقة' : 'Photo précédente (Flèche Gauche)'}
          >
            <ChevronLeft size={24} className="rtl:rotate-180" />
          </button>
        )}

        <img
          src={current.src}
          alt={current.alt}
          className="max-h-[78vh] max-w-[90vw] object-contain shadow-2xl rounded-sm border border-paper/10"
        />

        {items.length > 1 && (
          <button
            onClick={goNext}
            className="absolute end-2 md:end-6 z-10 p-3 bg-ink/60 hover:bg-gold text-paper rounded-full transition-all duration-300 backdrop-blur-sm"
            title={isRtl ? 'الصورة التالية' : 'Photo suivante (Flèche Droite)'}
          >
            <ChevronRight size={24} className="rtl:rotate-180" />
          </button>
        )}
      </div>

      {/* Footer Caption */}
      <div className="text-center text-paper/90 border-t border-paper/10 pt-4 max-w-2xl mx-auto w-full">
        <p className="font-serif text-lg md:text-xl text-paper tracking-wide">{current.alt}</p>
      </div>
    </div>
  );
}

// Simple inline LinkedIn icon (not part of lucide-react)
export const Linkedin = ({ size = 20, className = '' }: { size?: number; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

// ─────────────────────────────────────────────────────────────────
// Utility hook: reveal on scroll
// ─────────────────────────────────────────────────────────────────
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, visible };
}

// ─────────────────────────────────────────────────────────────────
// PageHeader: small reusable banner used at the top of inner pages
// ─────────────────────────────────────────────────────────────────
export function PageHeader({
  eyebrow,
  titleLine1,
  titleLine2,
  description,
}: {
  eyebrow: string;
  titleLine1: string;
  titleLine2?: string;
  description?: string;
}) {
  return (
    <section className="pt-40 pb-16 md:pt-48 md:pb-20 bg-cream/30 border-b border-ink/10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px w-10 bg-gold"></div>
          <span className="text-xs uppercase tracking-[0.3em] text-ink/60 font-medium">
            {eyebrow}
          </span>
        </div>
        <h1 className="font-display text-5xl md:text-7xl leading-none text-ink">
          {titleLine1}
          {titleLine2 && (
            <>
              <br />
              <span className="italic font-serif font-light text-gold">{titleLine2}</span>
            </>
          )}
        </h1>
        {description && (
          <p className="mt-6 max-w-2xl text-lg text-ink/70 leading-relaxed">{description}</p>
        )}
      </div>
    </section>
  );
}
