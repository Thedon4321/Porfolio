import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '@/components/layout/Container';
import { IconButton } from '@/components/ui/IconButton';
import { profile } from '@/data/profile';
import { cn } from '@/utils/cn';
import { hasContent } from '@/utils/content';
import { NavLinks } from './NavLinks';
import { MobileNav } from './MobileNav';
import { PrimaryNavCTA } from './PrimaryNavCTA';

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const brand = hasContent(profile.name) ? profile.name : 'Portfolio';

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 border-b border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg)_88%,transparent)] backdrop-blur transition-[height,box-shadow,background-color] duration-[var(--duration-normal)] ease-[var(--ease-standard)]',
        scrolled &&
          'bg-[color-mix(in_srgb,var(--color-bg)_94%,transparent)] shadow-[var(--shadow-sm)]',
      )}
    >
      <Container
        className={cn(
          'flex items-center justify-between gap-3 transition-[height] duration-[var(--duration-normal)] ease-[var(--ease-standard)]',
          scrolled ? 'h-14' : 'h-16',
        )}
      >
        <Link
          to="/"
          className="min-w-0 flex-1 truncate text-sm font-bold tracking-tight text-[var(--color-text)] md:flex-none md:max-w-[28rem]"
        >
          {brand}
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
          <NavLinks />
          <PrimaryNavCTA />
        </nav>

        <div className="flex shrink-0 items-center gap-2 md:hidden">
          <IconButton
            label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileOpen((open) => !open)}
          >
            <span aria-hidden="true" className="flex flex-col gap-1.5">
              <span className="block h-0.5 w-4 bg-current" />
              <span className="block h-0.5 w-4 bg-current" />
              <span className="block h-0.5 w-4 bg-current" />
            </span>
          </IconButton>
        </div>
      </Container>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
