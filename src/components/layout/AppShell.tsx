import type { ReactNode } from 'react';
import { SkipToContent } from '@/components/layout/SkipToContent';
import { FocusOnRouteChange } from '@/components/seo/FocusOnRouteChange';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/layout/Footer';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <SkipToContent />
      <FocusOnRouteChange />
      <Navbar />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        {children}
      </main>
      <Footer />
    </div>
  );
}
