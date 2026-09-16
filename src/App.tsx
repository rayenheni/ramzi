import { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import { Loader2, Scale } from 'lucide-react';
import { ContentProvider, useContent } from './lib/content';
import PageShell from './layout/PageShell';
import AdminApp from './admin/AdminApp';
import HomePage from './pages/HomePage';
import CabinetPage from './pages/CabinetPage';
import ExpertisesPage from './pages/ExpertisesPage';
import ParcoursPage from './pages/ParcoursPage';
import PublicationsPage from './pages/PublicationsPage';
import PublicationDetailPage from './pages/PublicationDetailPage';
import ContactPage from './pages/ContactPage';

function useHashRoute() {
  const [hash, setHash] = useState(() => window.location.hash || '#/');

  useEffect(() => {
    const onHashChange = () => {
      setHash(window.location.hash || '#/');
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return hash;
}

function BootScreen() {
  return (
    <div className="min-h-screen bg-paper flex flex-col items-center justify-center gap-4">
      <div className="w-12 h-12 rounded-xl bg-ink flex items-center justify-center">
        <Scale size={22} className="text-white" />
      </div>
      <Loader2 size={20} className="animate-spin text-ink/40" />
    </div>
  );
}

function normalizePath(hash: string): string {
  const clean = hash.split('?')[0].replace(/^#/, '') || '/';
  const path = clean.startsWith('/') ? clean : `/${clean}`;
  return path.length > 1 ? path.replace(/\/$/, '') : path;
}

function Routes() {
  const hash = useHashRoute();
  const { backendStatus } = useContent();
  const path = normalizePath(hash);

  if (path === '/admin') {
    return <AdminApp />;
  }

  // Avoid a flash of default content while the initial read from the
  // embedded SQLite database is in flight.
  if (backendStatus === 'loading') {
    return <BootScreen />;
  }

  // Dynamic route for individual publication pages /publication/:id
  if (path.startsWith('/publication/')) {
    const publicationId = path.replace('/publication/', '');
    return (
      <PageShell hash={hash} key={path}>
        <PublicationDetailPage publicationId={publicationId} />
      </PageShell>
    );
  }

  const pageMap: Record<string, ReactElement> = {
    '/': <HomePage />,
    '/cabinet': <CabinetPage />,
    '/expertises': <ExpertisesPage />,
    '/parcours': <ParcoursPage />,
    '/publications': <PublicationsPage />,
    '/contact': <ContactPage />,
  };

  const page = pageMap[path] ?? pageMap['/'];

  return (
    <PageShell hash={hash} key={path}>
      {page}
    </PageShell>
  );
}

export default function App() {
  return (
    <ContentProvider>
      <Routes />
    </ContentProvider>
  );
}
