import type { ReactNode } from 'react';
import Nav from './Nav';
import Footer from './Footer';

export default function PageShell({ hash, children }: { hash: string; children: ReactNode }) {
  return (
    <div className="bg-paper text-ink min-h-screen font-sans">
      <Nav currentHash={hash} />
      <main className="animate-fade-in">{children}</main>
      <Footer />
    </div>
  );
}
