import { useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { Upload, Link as LinkIcon, Trash2, ArrowUp, ArrowDown, Plus, ImageOff, Loader2 } from 'lucide-react';
import { uploadImage } from '../lib/content';

export function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <div className="bg-paper border border-ink/15 rounded-md p-6 md:p-8 space-y-6 shadow-sm">
      <div className="border-b border-ink/10 pb-4">
        <h3 className="font-serif font-bold text-xl text-ink tracking-tight">{title}</h3>
        {description && <p className="text-xs text-ink/60 mt-1">{description}</p>}
      </div>
      <div className="space-y-5">{children}</div>
    </div>
  );
}

export function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-semibold uppercase tracking-wider text-ink/70">{label}</span>
      {children}
      {hint && <span className="block text-xs text-ink/50">{hint}</span>}
    </label>
  );
}

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full rounded border border-ink/20 bg-cream/30 px-3.5 py-2.5 text-sm text-ink focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all ${props.className || ''}`}
    />
  );
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`w-full rounded border border-ink/20 bg-cream/30 px-3.5 py-2.5 text-sm text-ink focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all resize-y ${props.className || ''}`}
    />
  );
}

export function Select({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded border border-ink/20 bg-cream/30 px-3.5 py-2.5 text-sm text-ink focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all cursor-pointer font-sans"
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}

export function Button({
  children,
  onClick,
  variant = 'primary',
  type = 'button',
  className = '',
  disabled,
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  type?: 'button' | 'submit';
  className?: string;
  disabled?: boolean;
}) {
  const styles: Record<string, string> = {
    primary: 'bg-ink text-paper hover:bg-gold transition-colors font-medium text-xs uppercase tracking-wider shadow-sm',
    secondary: 'bg-cream/60 border border-ink/20 text-ink hover:border-gold hover:text-gold hover:bg-paper transition-all text-xs uppercase tracking-wider font-medium',
    danger: 'bg-rose-900/10 text-rose-800 border border-rose-200 hover:bg-rose-900 hover:text-white transition-all text-xs uppercase font-medium',
    ghost: 'text-ink/60 hover:text-ink hover:bg-cream/50 text-xs uppercase tracking-wider font-medium',
  };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded text-xs font-semibold transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

export function ImageField({
  value,
  onChange,
  label,
}: {
  value: string;
  onChange: (v: string) => void;
  label: string;
}) {
  const [mode, setMode] = useState<'url' | 'upload'>('url');
  const [errored, setErrored] = useState(false);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    const maxSize = 3.5 * 1024 * 1024;
    if (file.size > maxSize) {
      alert(
        "Cette image dépasse 3,5 Mo. Merci d'utiliser une image plus légère : elle est embarquée directement dans la base SQLite."
      );
      return;
    }
    try {
      setUploading(true);
      const url = await uploadImage(file);
      onChange(url);
      setErrored(false);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-3">
      <span className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</span>

      <div className="flex gap-4">
        <div className="w-28 h-28 rounded-lg border border-slate-200 bg-slate-50 overflow-hidden flex items-center justify-center shrink-0">
          {value && !errored ? (
            <img
              src={value}
              alt=""
              className="w-full h-full object-cover"
              onError={() => setErrored(true)}
            />
          ) : (
            <ImageOff size={20} className="text-slate-300" />
          )}
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setMode('url')}
              className={`px-2.5 py-1 rounded-md text-xs font-medium flex items-center gap-1 ${
                mode === 'url' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
              }`}
            >
              <LinkIcon size={12} /> URL
            </button>
            <button
              type="button"
              onClick={() => setMode('upload')}
              className={`px-2.5 py-1 rounded-md text-xs font-medium flex items-center gap-1 ${
                mode === 'upload' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
              }`}
            >
              <Upload size={12} /> Importer
            </button>
          </div>

          {mode === 'url' ? (
            <TextInput
              value={value}
              onChange={(e) => {
                onChange(e.target.value);
                setErrored(false);
              }}
              placeholder="/images/mon-fichier.jpg ou https://..."
            />
          ) : (
            <div>
              <input
                ref={inputRef}
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp"
                className="hidden"
                onChange={(e) => handleFile(e.target.files?.[0])}
              />
              <Button variant="secondary" onClick={() => inputRef.current?.click()} disabled={uploading}>
                {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                {uploading ? 'Envoi en cours…' : 'Choisir une image'}
              </Button>
              <p className="text-[11px] text-slate-400 mt-1.5">
                Formats JPG/PNG/WebP, 3,5 Mo max. L'image est intégrée directement dans la base SQLite.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Generic list editor toolbar (used inside each list-item card)
// ─────────────────────────────────────────────────────────────────
export function ListItemToolbar({
  onMoveUp,
  onMoveDown,
  onDelete,
  canMoveUp,
  canMoveDown,
}: {
  onMoveUp: () => void;
  onMoveDown: () => void;
  onDelete: () => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
}) {
  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={onMoveUp}
        disabled={!canMoveUp}
        className="p-1.5 rounded-md text-slate-400 hover:text-slate-900 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed"
        title="Monter"
      >
        <ArrowUp size={15} />
      </button>
      <button
        type="button"
        onClick={onMoveDown}
        disabled={!canMoveDown}
        className="p-1.5 rounded-md text-slate-400 hover:text-slate-900 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed"
        title="Descendre"
      >
        <ArrowDown size={15} />
      </button>
      <button
        type="button"
        onClick={onDelete}
        className="p-1.5 rounded-md text-red-400 hover:text-red-600 hover:bg-red-50"
        title="Supprimer"
      >
        <Trash2 size={15} />
      </button>
    </div>
  );
}

export function AddButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <Button variant="secondary" onClick={onClick} className="w-full justify-center border border-dashed border-slate-300">
      <Plus size={15} /> {label}
    </Button>
  );
}

export function reorder<T>(arr: T[], index: number, direction: -1 | 1): T[] {
  const next = [...arr];
  const target = index + direction;
  if (target < 0 || target >= next.length) return next;
  [next[index], next[target]] = [next[target], next[index]];
  return next;
}
