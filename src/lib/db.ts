import initSqlJs, { type Database } from 'sql.js';
import { get as idbGet, set as idbSet } from 'idb-keyval';
import wasmUrl from './sqlWasmUrl';
import { DEFAULT_CONTENT, type SiteContent } from './contentTypes';

// ─────────────────────────────────────────────────────────────────
// Real embedded SQLite database (via sql.js / WebAssembly).
//
// - The database engine (SQLite compiled to WASM) runs fully in the
//   browser: no external service, no API keys, no third-party cloud.
// - The database FILE (binary .sqlite) is kept in IndexedDB so it
//   survives page reloads on the same device/browser.
// - Because there is no server process, data does not automatically
//   sync across different browsers/devices. Use the Export / Import
//   buttons in the admin panel to move the database file between
//   machines, or set up automated backups of the exported file.
// ─────────────────────────────────────────────────────────────────

const IDB_KEY = 'ajmi-sqlite-database';

let dbInstance: Database | null = null;
let SQL: Awaited<ReturnType<typeof initSqlJs>> | null = null;
let initPromise: Promise<Database> | null = null;

const SCHEMA = `
  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT
  );
  CREATE TABLE IF NOT EXISTS admin (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    password_hash TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS values_list (
    id TEXT PRIMARY KEY,
    label TEXT,
    labelAr TEXT,
    description TEXT,
    descriptionAr TEXT,
    position INTEGER
  );
  CREATE TABLE IF NOT EXISTS practice_areas (
    id TEXT PRIMARY KEY,
    icon TEXT,
    title TEXT,
    titleAr TEXT,
    description TEXT,
    descriptionAr TEXT,
    position INTEGER
  );
  CREATE TABLE IF NOT EXISTS experiences (
    id TEXT PRIMARY KEY,
    title TEXT,
    titleAr TEXT,
    org TEXT,
    orgAr TEXT,
    detail TEXT,
    detailAr TEXT,
    position INTEGER
  );
  CREATE TABLE IF NOT EXISTS gallery (
    id TEXT PRIMARY KEY,
    src TEXT,
    alt TEXT,
    large INTEGER,
    category TEXT,
    position INTEGER
  );
  CREATE TABLE IF NOT EXISTS publications (
    id TEXT PRIMARY KEY,
    type TEXT,
    icon TEXT,
    title TEXT,
    titleAr TEXT,
    meta TEXT,
    coverImage TEXT,
    isbn TEXT,
    price TEXT,
    description TEXT,
    fullContent TEXT,
    position INTEGER
  );
  CREATE TABLE IF NOT EXISTS reservations (
    id TEXT PRIMARY KEY,
    publicationId TEXT,
    publicationTitle TEXT,
    clientName TEXT,
    clientPhone TEXT,
    clientEmail TEXT,
    clientAddress TEXT,
    quantity INTEGER,
    status TEXT,
    notes TEXT,
    createdAt TEXT,
    position INTEGER
  );
  CREATE TABLE IF NOT EXISTS clients (
    id TEXT PRIMARY KEY,
    name TEXT,
    position INTEGER
  );
`;

const SCALAR_KEYS: (keyof SiteContent)[] = [
  'brandName', 'brandNameAr', 'brandTagline', 'brandTaglineAr', 'heroFirstName', 'heroFirstNameAr',
  'heroLastName', 'heroLastNameAr', 'heroSubtitle', 'heroSubtitleAr', 'heroPortrait',
  'ctaPrimary', 'ctaPrimaryAr', 'ctaSecondary', 'ctaSecondaryAr',
  'phone', 'email', 'addressLine1', 'addressLine1Ar', 'addressLine2', 'addressLine2Ar',
  'linkedinUrl', 'linkedinLabel', 'linkedinLabelAr',
  'aboutEyebrow', 'aboutEyebrowAr', 'aboutTitleLine1', 'aboutTitleLine1Ar',
  'aboutTitleLine2', 'aboutTitleLine2Ar', 'aboutLead', 'aboutLeadAr',
  'aboutHighlight', 'aboutHighlightAr', 'aboutParagraph1', 'aboutParagraph1Ar',
  'aboutParagraph2', 'aboutParagraph2Ar', 'aboutPhoto', 'aboutQuote', 'aboutQuoteAr',
  'practiceIntro', 'practiceIntroAr', 'experienceIntro', 'experienceIntroAr',
  'internationalIntro', 'internationalIntroAr', 'publicationsIntro', 'publicationsIntroAr',
  'contactIntro', 'contactIntroAr', 'footerTagline', 'footerTaglineAr',
];

const DEFAULT_PASSWORD = 'Ajmi2025!';

async function hashPassword(password: string): Promise<string> {
  const enc = new TextEncoder().encode(`ajmi-cms::${password}`);
  const digest = await crypto.subtle.digest('SHA-256', enc);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function seed(db: Database, content: SiteContent, passwordHash: string) {
  db.run(SCHEMA);
  writeContent(db, content);
  db.run('INSERT OR REPLACE INTO admin (id, password_hash) VALUES (1, ?);', [passwordHash]);
}

function writeContent(db: Database, content: SiteContent) {
  db.run('BEGIN TRANSACTION;');
  try {
    for (const key of SCALAR_KEYS) {
      db.run('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?);', [key, String(content[key] ?? '')]);
    }

    db.run('DELETE FROM values_list;');
    content.values.forEach((v, i) => {
      db.run('INSERT INTO values_list (id, label, labelAr, description, descriptionAr, position) VALUES (?, ?, ?, ?, ?, ?);', [v.id, v.label, v.labelAr ?? '', v.desc, v.descAr ?? '', i]', [v.id, v.label, v.desc, i]);
    });

    db.run('DELETE FROM practice_areas;');
    content.practiceAreas.forEach((p, i) => {
      db.run('INSERT INTO practice_areas (id, icon, title, titleAr, description, descriptionAr, position) VALUES (?, ?, ?, ?, ?, ?, ?);', [p.id, p.icon, p.title, p.titleAr ?? '', p.description, p.descriptionAr ?? '', i]', [p.id, p.icon, p.title, p.description, i]);
    });

    db.run('DELETE FROM experiences;');
    content.experiences.forEach((e, i) => {
      db.run('INSERT INTO experiences (id, title, titleAr, org, orgAr, detail, detailAr, position) VALUES (?, ?, ?, ?, ?, ?, ?, ?);', [e.id, e.title, e.titleAr ?? '', e.org, e.orgAr ?? '', e.detail, e.detailAr ?? '', i]', [e.id, e.title, e.org, e.detail, i]);
    });

    db.run('DELETE FROM gallery;');
    content.gallery.forEach((g, i) => {
      db.run('INSERT INTO gallery (id, src, alt, large, category, position) VALUES (?, ?, ?, ?, ?, ?);', [g.id, g.src, g.alt, g.large ? 1 : 0, g.category ?? '', i]);
    });

    db.run('DELETE FROM publications;');
    content.publications.forEach((p, i) => {
      db.run('INSERT INTO publications (id, type, icon, title, titleAr, meta, coverImage, isbn, price, description, fullContent, position) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);', [
        p.id, p.type, p.icon, p.title, p.titleAr ?? '', p.meta, p.coverImage ?? '', p.isbn ?? '', p.price ?? '', p.description ?? '', p.fullContent ?? '', i
      ]);
    });

    db.run('DELETE FROM reservations;');
    (content.reservations || []).forEach((r, i) => {
      db.run('INSERT INTO reservations (id, publicationId, publicationTitle, clientName, clientPhone, clientEmail, clientAddress, quantity, status, notes, createdAt, position) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);', [
        r.id, r.publicationId, r.publicationTitle, r.clientName, r.clientPhone, r.clientEmail, r.clientAddress, r.quantity || 1, r.status || 'pending', r.notes ?? '', r.createdAt ?? new Date().toISOString(), i
      ]);
    });

    db.run('DELETE FROM clients;');
    content.clients.forEach((c, i) => {
      db.run('INSERT INTO clients (id, name, position) VALUES (?, ?, ?);', [c.id, c.name, i]);
    });

    db.run('COMMIT;');
  } catch (err) {
    db.run('ROLLBACK;');
    throw err;
  }
}

function readContent(db: Database): SiteContent {
  // Ensure schema columns exist
  try {
    db.run(SCHEMA);
  } catch {
    /* ignore */
  }

  const settings: Record<string, string> = {};
  const settingsRes = db.exec('SELECT key, value FROM settings;');
  if (settingsRes[0]) {
    for (const [key, value] of settingsRes[0].values) {
      settings[String(key)] = String(value ?? '');
    }
  }

  const values = queryRows(db, 'SELECT id, label, labelAr, description, descriptionAr FROM values_list ORDER BY position;').map((r) => ({
    id: String(r.id), label: String(r.label ?? ''), desc: String(r.description ?? ''),
  }));

  const practiceAreas = queryRows(db, 'SELECT id, icon, title, titleAr, description, descriptionAr FROM practice_areas ORDER BY position;').map((r) => ({
    id: String(r.id), icon: String(r.icon ?? 'Scale'), title: String(r.title ?? ''), description: String(r.description ?? ''),
  }));

  const experiences = queryRows(db, 'SELECT id, title, titleAr, org, orgAr, detail, detailAr FROM experiences ORDER BY position;').map((r) => ({
    id: String(r.id), title: String(r.title ?? ''), org: String(r.org ?? ''), detail: String(r.detail ?? ''),
  }));

  const galleryRows = queryRows(db, 'SELECT id, src, alt, large, category FROM gallery ORDER BY position;');
  const gallery = galleryRows.map((r) => ({
    id: String(r.id), src: String(r.src ?? ''), alt: String(r.alt ?? ''), large: Number(r.large) === 1, category: String(r.category ?? 'moscow'),
  }));

  const publicationsRows = queryRows(db, 'SELECT id, type, icon, title, titleAr, meta, coverImage, isbn, price, description, fullContent FROM publications ORDER BY position;');
  const publications = publicationsRows.map((r) => ({
    id: String(r.id),
    type: String(r.type ?? ''),
    icon: String(r.icon ?? 'FileText'),
    title: String(r.title ?? ''),
    titleAr: String(r.titleAr ?? ''),
    meta: String(r.meta ?? ''),
    coverImage: String(r.coverImage ?? ''),
    isbn: String(r.isbn ?? ''),
    price: String(r.price ?? ''),
    description: String(r.description ?? ''),
    fullContent: String(r.fullContent ?? ''),
  }));

  const reservationsRows = queryRows(db, 'SELECT id, publicationId, publicationTitle, clientName, clientPhone, clientEmail, clientAddress, quantity, status, notes, createdAt FROM reservations ORDER BY position;');
  const reservations = reservationsRows.map((r) => ({
    id: String(r.id),
    publicationId: String(r.publicationId ?? ''),
    publicationTitle: String(r.publicationTitle ?? ''),
    clientName: String(r.clientName ?? ''),
    clientPhone: String(r.clientPhone ?? ''),
    clientEmail: String(r.clientEmail ?? ''),
    clientAddress: String(r.clientAddress ?? ''),
    quantity: Number(r.quantity ?? 1),
    status: (r.status as any) || 'pending',
    notes: String(r.notes ?? ''),
    createdAt: String(r.createdAt ?? new Date().toISOString()),
  }));

  const clients = queryRows(db, 'SELECT id, name FROM clients ORDER BY position;').map((r) => ({
    id: String(r.id), name: String(r.name ?? ''),
  }));

  const scalars = Object.fromEntries(SCALAR_KEYS.map((k) => [k, settings[k] ?? (DEFAULT_CONTENT[k] as string)]));

  // Migration/Sync check: Automatically update DB with DEFAULT_CONTENT if outdated
  if (settings.heroLastName !== 'Lahmadi' || !settings.heroPortrait?.includes('ramzi') || publications.length > 0) {
    writeContent(db, DEFAULT_CONTENT);
    return DEFAULT_CONTENT;
  }

  return {
    ...DEFAULT_CONTENT,
    ...scalars,
    values: values.length ? values : DEFAULT_CONTENT.values,
    practiceAreas: practiceAreas.length ? practiceAreas : DEFAULT_CONTENT.practiceAreas,
    experiences: experiences.length ? experiences : DEFAULT_CONTENT.experiences,
    gallery: gallery.length ? gallery : DEFAULT_CONTENT.gallery,
    publications: publications.length ? publications : DEFAULT_CONTENT.publications,
    reservations: reservations.length ? reservations : DEFAULT_CONTENT.reservations,
    clients: clients.length ? clients : DEFAULT_CONTENT.clients,
  } as SiteContent;
}

function queryRows(db: Database, sql: string): Record<string, unknown>[] {
  const res = db.exec(sql);
  if (!res[0]) return [];
  const { columns, values } = res[0];
  return values.map((row) => Object.fromEntries(columns.map((col, i) => [col, row[i]])));
}

async function persist(db: Database) {
  const bytes = db.export();
  await idbSet(IDB_KEY, bytes);
}

async function getDb(): Promise<Database> {
  if (dbInstance) return dbInstance;
  if (initPromise) return initPromise;

  initPromise = (async () => {
    SQL = await initSqlJs({ locateFile: () => wasmUrl });

    const saved = await idbGet<Uint8Array>(IDB_KEY);
    if (saved) {
      dbInstance = new SQL.Database(saved);
    } else {
      dbInstance = new SQL.Database();
      const passwordHash = await hashPassword(DEFAULT_PASSWORD);
      seed(dbInstance, DEFAULT_CONTENT, passwordHash);
      await persist(dbInstance);
    }
    return dbInstance;
  })();

  return initPromise;
}

// ─────────────────────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────────────────────
export async function loadContentFromDb(): Promise<SiteContent> {
  const db = await getDb();
  return readContent(db);
}

export async function saveContentToDb(content: SiteContent): Promise<void> {
  const db = await getDb();
  writeContent(db, content);
  await persist(db);
}

export async function verifyAdminPassword(password: string): Promise<boolean> {
  const db = await getDb();
  const res = db.exec('SELECT password_hash FROM admin WHERE id = 1;');
  const stored = res[0]?.values?.[0]?.[0];
  if (!stored) return false;
  const attempt = await hashPassword(password);
  return attempt === stored;
}

export async function setAdminPassword(newPassword: string): Promise<void> {
  const db = await getDb();
  const hash = await hashPassword(newPassword);
  db.run('INSERT OR REPLACE INTO admin (id, password_hash) VALUES (1, ?);', [hash]);
  await persist(db);
}

export async function exportDatabaseFile(): Promise<void> {
  const db = await getDb();
  const bytes = db.export();
  const blob = new Blob([bytes as unknown as BlobPart], { type: 'application/x-sqlite3' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'ajmi-cabinet.sqlite';
  a.click();
  URL.revokeObjectURL(url);
}

export async function importDatabaseFile(file: File): Promise<SiteContent> {
  if (!SQL) {
    SQL = await initSqlJs({ locateFile: () => wasmUrl });
  }
  const buf = new Uint8Array(await file.arrayBuffer());
  const newDb = new SQL.Database(buf);
  // Basic sanity check: the file must contain our expected schema.
  const check = newDb.exec("SELECT name FROM sqlite_master WHERE type='table' AND name='settings';");
  if (!check.length) {
    throw new Error('Fichier .sqlite invalide ou incompatible.');
  }
  dbInstance = newDb;
  await persist(newDb);
  return readContent(newDb);
}

export async function resetDatabase(): Promise<SiteContent> {
  if (!SQL) {
    SQL = await initSqlJs({ locateFile: () => wasmUrl });
  }
  const fresh = new SQL.Database();
  const passwordHash = await hashPassword(DEFAULT_PASSWORD);
  seed(fresh, DEFAULT_CONTENT, passwordHash);
  dbInstance = fresh;
  await persist(fresh);
  return DEFAULT_CONTENT;
}
