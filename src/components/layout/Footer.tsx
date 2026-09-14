import { Link } from 'react-router-dom';
import { Container } from '@/components/layout/Container';
import { primaryNavItems } from '@/components/navigation/navItems';
import { profile } from '@/data/profile';
import { hasContent } from '@/utils/content';

export function Footer() {
  const year = new Date().getFullYear();
  const brand = hasContent(profile.name) ? profile.name : 'Portfolio';

  return (
    <footer className="border-t border-[var(--color-border)] py-[var(--space-8)]">
      <Container className="flex flex-col gap-6 text-sm text-[var(--color-text-muted)] sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <p className="font-semibold text-[var(--color-text)]">{brand}</p>
          <p>© {year}. All rights reserved.</p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-4 gap-y-2">
            {primaryNavItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="transition-colors hover:text-[var(--color-text)]"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="/#contact"
                className="transition-colors hover:text-[var(--color-text)]"
              >
                Contact
              </a>
            </li>
            <li>
              <Link
                to="/styleguide"
                className="transition-colors hover:text-[var(--color-text)]"
              >
                Style guide
              </Link>
            </li>
          </ul>
        </nav>
      </Container>
    </footer>
  );
}
