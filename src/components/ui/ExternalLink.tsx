import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface ExternalLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  href: string;
}

export function ExternalLink({
  children,
  href,
  className,
  ...props
}: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'text-[var(--color-accent)] underline-offset-4 transition-[color,text-decoration-color] duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:underline focus-visible:underline',
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}
