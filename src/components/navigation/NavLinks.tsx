import { cn } from '@/utils/cn';
import { primaryNavItems } from './navItems';

interface NavLinksProps {
  className?: string;
  linkClassName?: string;
  onNavigate?: () => void;
}

export function NavLinks({
  className,
  linkClassName,
  onNavigate,
}: NavLinksProps) {
  return (
    <ul className={cn('flex items-center gap-6', className)}>
      {primaryNavItems.map((item) => (
        <li key={item.href}>
          <a
            href={item.href}
            className={cn(
              'text-sm text-[var(--color-text-muted)] transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:text-[var(--color-text)]',
              linkClassName,
            )}
            onClick={onNavigate}
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
