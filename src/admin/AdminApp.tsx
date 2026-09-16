import { useRef, useState } from 'react';
import {
  Scale, LayoutDashboard, Info, Briefcase, History, Images, BookOpen,
  Building2, LogOut, ExternalLink, Download, Upload, RotateCcw, Lock, Eye, EyeOff,
  Database, Loader2, CheckCircle2, AlertTriangle, KeyRound, ShoppingBag,
} from 'lucide-react';
import { useContent } from '../lib/content';
import { useAuth, changeAdminPassword } from '../lib/auth';
import { GeneralTab, AboutTab, PracticeTab, ExperienceTab, GalleryTab, PublicationsTab, ReservationsTab, ClientsTab } from './tabs';
import { Button, Field, TextInput, Section } from './ui';

type TabKey = 'general' | 'about' | 'practice' | 'experience' | 'gallery' | 'publications' | 'reservations' | 'clients' | 'security';

const TABS: { key: TabKey; label: string; icon: typeof LayoutDashboard }[] = [
  { key: 'general', label: 'Général', icon: LayoutDashboard },
  { key: 'about', label: 'Présentation', icon: Info },
  { key: 'practice', label: 'Expertises', icon: Briefcase },
  { key: 'experience', label: 'Parcours', icon: History },
  { key: 'gallery', label: 'Galerie', icon: Images },
  { key: 'publications', label: 'Publications', icon: BookOpen },
  { key: 'reservations', label: 'Réservations', icon: ShoppingBag },
  { key: 'clients', label: 'Clients', icon: Building2 },
  { key: 'security', label: 'Sécurité', icon: KeyRound },
];

function AdminLogin({
  onSuccess,
  signIn,
  authError,
}: {
  onSuccess: () => void;
  signIn: (password: string) => Promise<boolean>;
  authError: string | null;
}) {
  const { content } = useContent();
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const ok = await signIn(password);
    setSubmitting(false);
    if (ok) onSuccess();
  };

  return (
    <div className="min-h-screen bg-[#0b0d12] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background brand glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-sm relative z-10">
        <div className="flex flex-col items-center mb-8 text-center">
          {/* Brand Logo Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gold/15 border border-gold/40 flex items-center justify-center text-gold font-display font-bold text-xl rounded">
              {content.brandName.slice(0, 2)}
            </div>
            <div className="text-left">
              <div className="font-display font-bold text-2xl text-paper tracking-wider leading-tight flex items-center gap-2">
                {content.brandName} <span className="w-2 h-2 rounded-full bg-gold inline-block"></span>
              </div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-gold font-medium">
                Cabinet d'Avocat
              </div>
            </div>
          </div>

          <h1 className="text-paper font-serif text-2xl">Espace Administration</h1>
          <p className="text-paper/60 text-xs tracking-wider uppercase mt-1">Me {content.heroFirstName} {content.heroLastName}</p>

          <div className="mt-4 flex items-center gap-2 text-xs px-3 py-1.5 rounded-full border border-gold/30 bg-gold/10 text-gold font-medium">
            <Database size={13} /> Base SQLite embarquée & chiffrée
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-paper/5 border border-paper/15 backdrop-blur-md rounded-lg p-6 space-y-5 shadow-2xl">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest font-semibold text-paper/80">
              Mot de passe administrateur
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gold/70" />
              <input
                type={show ? 'text' : 'password'}
                autoFocus
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-paper/10 border border-paper/20 rounded pl-10 pr-10 py-3 text-sm text-paper placeholder-paper/40 outline-none focus:border-gold focus:ring-1 focus:ring-gold font-mono"
                placeholder="••••••••••"
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-paper/40 hover:text-paper"
              >
                {show ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {authError && <p className="text-rose-400 text-xs font-medium pt-1">{authError}</p>}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-gold hover:bg-gold/90 disabled:opacity-60 text-paper font-medium py-3 rounded text-xs uppercase tracking-widest transition-all duration-300 shadow-lg flex items-center justify-center gap-2 font-semibold"
          >
            {submitting && <Loader2 size={15} className="animate-spin" />}
            Accéder au panneau de gestion
          </button>

          <p className="text-[11px] text-paper/50 leading-relaxed text-center pt-2">
            Mot de passe par défaut : <code className="text-gold font-bold">Ajmi2025!</code>
          </p>

          <a href="#/" className="block text-center text-xs text-gold/80 hover:text-gold pt-2 uppercase tracking-wider font-medium">
            ← Retour au site public
          </a>
        </form>
      </div>
    </div>
  );
}

function BackendBadge() {
  const { backendStatus, saving, lastSavedAt } = useContent();

  if (backendStatus === 'loading') {
    return (
      <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-full">
        <Loader2 size={12} className="animate-spin" /> Chargement…
      </div>
    );
  }
  if (backendStatus === 'error') {
    return (
      <div className="flex items-center gap-1.5 text-xs text-red-600 bg-red-50 border border-red-200 px-2.5 py-1 rounded-full">
        <AlertTriangle size={12} /> Erreur d'écriture
      </div>
    );
  }
  return (
    <div className="flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
      {saving ? <Loader2 size={12} className="animate-spin" /> : <CheckCircle2 size={12} />}
      {saving ? 'Enregistrement…' : lastSavedAt ? 'Sauvegardé (SQLite)' : 'Base prête'}
    </div>
  );
}

function SecurityTab() {
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [confirm, setConfirm] = useState('');
  const [status, setStatus] = useState<'idle' | 'saving' | 'done' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);
  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (next.length < 6) {
      setError('Le nouveau mot de passe doit contenir au moins 6 caractères.');
      return;
    }
    if (next !== confirm) {
      setError('La confirmation ne correspond pas au nouveau mot de passe.');
      return;
    }

    setStatus('saving');
    const ok = await signIn(current);
    if (!ok) {
      setStatus('error');
      setError('Mot de passe actuel incorrect.');
      return;
    }

    try {
      await changeAdminPassword(next);
      setStatus('done');
      setCurrent('');
      setNext('');
      setConfirm('');
    } catch {
      setStatus('error');
      setError('Impossible de mettre à jour le mot de passe.');
    }
  };

  return (
    <Section
      title="Changer le mot de passe administrateur"
      description="Le mot de passe est stocké sous forme de hachage (SHA-256) dans la base SQLite du site."
    >
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <Field label="Mot de passe actuel">
          <TextInput
            type="password"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            required
          />
        </Field>
        <Field label="Nouveau mot de passe">
          <TextInput
            type="password"
            value={next}
            onChange={(e) => setNext(e.target.value)}
            required
          />
        </Field>
        <Field label="Confirmer le nouveau mot de passe">
          <TextInput
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
        </Field>

        {error && <p className="text-sm text-red-600">{error}</p>}
        {status === 'done' && <p className="text-sm text-emerald-600">Mot de passe mis à jour avec succès.</p>}

        <Button type="submit" disabled={status === 'saving'}>
          {status === 'saving' ? <Loader2 size={14} className="animate-spin" /> : <KeyRound size={14} />}
          Mettre à jour le mot de passe
        </Button>
      </form>
    </Section>
  );
}

function AdminShell({ signOut }: { signOut: () => void }) {
  const { content, resetToDefault, exportJson, importJson, exportSqlite, importSqlite } = useContent();
  const [tab, setTab] = useState<TabKey>('general');
  const jsonFileRef = useRef<HTMLInputElement>(null);
  const sqliteFileRef = useRef<HTMLInputElement>(null);

  const pendingReservationsCount = (content.reservations || []).filter((r) => r.status === 'pending').length;

  const handleImportJson = async (file: File | undefined) => {
    if (!file) return;
    try {
      await importJson(file);
      alert('Contenu importé avec succès.');
    } catch {
      alert("Ce fichier n'est pas un export JSON valide.");
    }
  };

  const handleImportSqlite = async (file: File | undefined) => {
    if (!file) return;
    if (!confirm('Importer ce fichier .sqlite remplacera tout le contenu actuel. Continuer ?')) return;
    try {
      await importSqlite(file);
      alert('Base de données importée avec succès.');
    } catch (err) {
      alert(err instanceof Error ? err.message : "Ce fichier n'est pas une base SQLite valide.");
    }
  };

  const handleReset = () => {
    if (confirm('Réinitialiser tout le contenu aux valeurs par défaut ? Cette action est irréversible.')) {
      resetToDefault();
    }
  };

  const ActiveTab = {
    general: GeneralTab,
    about: AboutTab,
    practice: PracticeTab,
    experience: ExperienceTab,
    gallery: GalleryTab,
    publications: PublicationsTab,
    reservations: ReservationsTab,
    clients: ClientsTab,
    security: SecurityTab,
  }[tab];

  return (
    <div className="min-h-screen bg-cream/30 flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 bg-[#0b0d12] text-paper flex flex-col border-r border-gold/20 shadow-2xl">
        {/* Brand Header */}
        <div className="p-6 flex items-center gap-3 border-b border-gold/20">
          <div className="w-10 h-10 rounded bg-gold/15 border border-gold/40 flex items-center justify-center font-display text-gold font-bold text-lg shrink-0">
            {content.brandName.slice(0, 2)}
          </div>
          <div className="min-w-0">
            <div className="font-display font-bold text-paper text-base tracking-wider leading-tight flex items-center gap-1.5">
              {content.brandName} <span className="w-2 h-2 rounded-full bg-gold inline-block"></span>
            </div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-gold font-medium truncate">
              Espace Administration
            </div>
          </div>
        </div>

        {/* Nav Tabs */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {TABS.map((t) => {
            const Icon = t.icon;
            const active = tab === t.key;
            return (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                  active
                    ? 'bg-gold text-paper shadow-lg font-bold'
                    : 'text-paper/70 hover:bg-gold/15 hover:text-gold'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={16} />
                  {t.label}
                </div>
                {t.key === 'reservations' && pendingReservationsCount > 0 && (
                  <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                    active ? 'bg-paper text-ink' : 'bg-gold text-paper'
                  }`}>
                    {pendingReservationsCount}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gold/20 space-y-2 bg-black/20">
          <a
            href="#/"
            target="_blank"
            rel="noreferrer"
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded text-xs uppercase tracking-wider font-medium text-paper/70 hover:text-gold hover:bg-gold/10 transition-colors"
          >
            <ExternalLink size={15} />
            Voir le site public
          </a>
          <button
            onClick={signOut}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded text-xs uppercase tracking-wider font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 transition-colors"
          >
            <LogOut size={15} />
            Déconnexion
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-slate-200 px-8 py-5 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="font-semibold text-lg text-slate-900">
                {TABS.find((t) => t.key === tab)?.label}
              </h2>
              <BackendBadge />
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Les modifications sont enregistrées automatiquement dans la base SQLite.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <input
              ref={sqliteFileRef}
              type="file"
              accept=".sqlite,application/x-sqlite3"
              className="hidden"
              onChange={(e) => handleImportSqlite(e.target.files?.[0])}
            />
            <Button variant="secondary" onClick={() => sqliteFileRef.current?.click()}>
              <Database size={14} /> Importer .sqlite
            </Button>
            <Button variant="secondary" onClick={() => exportSqlite()}>
              <Download size={14} /> Exporter .sqlite
            </Button>
            <input
              ref={jsonFileRef}
              type="file"
              accept="application/json"
              className="hidden"
              onChange={(e) => handleImportJson(e.target.files?.[0])}
            />
            <Button variant="secondary" onClick={() => jsonFileRef.current?.click()}>
              <Upload size={14} /> Importer JSON
            </Button>
            <Button variant="secondary" onClick={exportJson}>
              <Download size={14} /> Exporter JSON
            </Button>
            <Button variant="danger" onClick={handleReset}>
              <RotateCcw size={14} /> Réinitialiser
            </Button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-4xl mx-auto">
            <ActiveTab />
          </div>
        </main>
      </div>
    </div>
  );
}

export default function AdminApp() {
  const { loading, authed, error, signIn, signOut } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader2 size={28} className="animate-spin text-indigo-400" />
      </div>
    );
  }

  if (!authed) {
    return <AdminLogin onSuccess={() => {}} signIn={signIn} authError={error} />;
  }

  return <AdminShell signOut={signOut} />;
}
