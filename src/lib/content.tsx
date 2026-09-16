import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { loadContentFromDb, saveContentToDb, exportDatabaseFile, importDatabaseFile, resetDatabase } from './db';
import { DEFAULT_CONTENT, uid } from './contentTypes';
import type {
  SiteContent, ValueItem, PracticeItem, ExperienceItem, PublicationItem, GalleryImage, ClientItem,
} from './contentTypes';

export { DEFAULT_CONTENT, uid };
export type { SiteContent, ValueItem, PracticeItem, ExperienceItem, PublicationItem, GalleryImage, ClientItem };

// ─────────────────────────────────────────────────────────────────
// Local (browser-only) backup — kept as an extra safety net in
// addition to the SQLite database file stored in IndexedDB, in case
// IndexedDB is unavailable (private browsing, very old browser...).
// ─────────────────────────────────────────────────────────────────
const LOCAL_STORAGE_KEY = 'ajmi-cms-content-backup-v5';

function saveLocalBackup(content: SiteContent) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(content));
  } catch {
    /* ignore quota errors */
  }
}

function loadLocalBackup(): SiteContent {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return DEFAULT_CONTENT;
    return { ...DEFAULT_CONTENT, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_CONTENT;
  }
}

// ─────────────────────────────────────────────────────────────────
// Context
// ─────────────────────────────────────────────────────────────────
export type BackendStatus = 'loading' | 'ready' | 'error';

interface ContentContextValue {
  content: SiteContent;
  setContent: (updater: (prev: SiteContent) => SiteContent) => void;
  lang: 'fr' | 'ar';
  setLang: (lang: 'fr' | 'ar') => void;
  resetToDefault: () => void;
  exportJson: () => void;
  importJson: (file: File) => Promise<void>;
  exportSqlite: () => Promise<void>;
  importSqlite: (file: File) => Promise<void>;
  backendStatus: BackendStatus;
  saving: boolean;
  lastSavedAt: Date | null;
}

const ContentContext = createContext<ContentContextValue | null>(null);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContentState] = useState<SiteContent>(DEFAULT_CONTENT);
  const [lang, setLangState] = useState<'fr' | 'ar'>('fr');
  const [backendStatus, setBackendStatus] = useState<BackendStatus>('loading');
  const [saving, setSaving] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isFirstLoad = useRef(true);

  useEffect(() => {
    // Initial lang load
    const savedLang = localStorage.getItem('ajmi-lang');
    if (savedLang === 'ar') setLangState('ar');
  }, []);

  useEffect(() => {
    // Sync lang with HTML dir and lang tags
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('ajmi-lang', lang);
  }, [lang]);

  // Initial load — read the SQLite database (creates it on first run).
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const loaded = await loadContentFromDb();
        if (cancelled) return;
        setContentState(loaded);
        setBackendStatus('ready');
      } catch (err) {
        console.error('Erreur de lecture de la base SQLite, repli sur la sauvegarde locale :', err);
        if (cancelled) return;
        setContentState(loadLocalBackup());
        setBackendStatus('error');
      } finally {
        isFirstLoad.current = false;
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Persist on every change (debounced), skipping the very first load.
  useEffect(() => {
    if (isFirstLoad.current) return;

    saveLocalBackup(content);

    if (saveTimer.current) clearTimeout(saveTimer.current);
    setSaving(true);
    saveTimer.current = setTimeout(async () => {
      try {
        await saveContentToDb(content);
        setBackendStatus('ready');
        setLastSavedAt(new Date());
      } catch (err) {
        console.error("Erreur d'écriture dans la base SQLite :", err);
        setBackendStatus('error');
      } finally {
        setSaving(false);
      }
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);

  const setContent = useCallback((updater: (prev: SiteContent) => SiteContent) => {
    setContentState((prev) => updater(prev));
  }, []);

  const resetToDefault = useCallback(async () => {
    const fresh = await resetDatabase();
    setContentState(fresh);
  }, []);

  const exportJson = useCallback(() => {
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ajmi-site-content.json';
    a.click();
    URL.revokeObjectURL(url);
  }, [content]);

  const importJson = useCallback((file: File) => {
    return new Promise<void>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const parsed = JSON.parse(String(reader.result));
          setContentState({ ...DEFAULT_CONTENT, ...parsed });
          resolve();
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = reject;
      reader.readAsText(file);
    });
  }, []);

  const exportSqlite = useCallback(async () => {
    await exportDatabaseFile();
  }, []);

  const importSqlite = useCallback(async (file: File) => {
    const loaded = await importDatabaseFile(file);
    setContentState(loaded);
  }, []);

  const value = useMemo(
    () => ({
      content,
      setContent,
      lang,
      setLang: setLangState,
      resetToDefault,
      exportJson,
      importJson,
      exportSqlite,
      importSqlite,
      backendStatus,
      saving,
      lastSavedAt,
    }),
    [content, setContent, lang, resetToDefault, exportJson, importJson, exportSqlite, importSqlite, backendStatus, saving, lastSavedAt]
  );

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent(): ContentContextValue {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error('useContent must be used within a ContentProvider');
  return ctx;
}

// ─────────────────────────────────────────────────────────────────
// Image upload — the app has no server, so images are embedded as
// base64 data URIs and stored directly inside the SQLite database
// (in the relevant text column, e.g. gallery.src). This keeps the
// whole site (content + photos) inside one portable .sqlite file.
// ─────────────────────────────────────────────────────────────────
export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export async function uploadImage(file: File): Promise<string> {
  return fileToDataUrl(file);
}
