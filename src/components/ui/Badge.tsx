import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';

type BadgeVariant = 'muted' | 'accent' | 'outline';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  variant?: BadgeVariant;
}

const variantClasses: Record<BadgeVariant, string> = {
  muted:
    'bg-[var(--color-surface-muted)] text-[var(--color-text-muted)]',
  accent:
    'bg-[var(--color-accent-soft)] text-[var(--color-accent)]',
  outline:
    'border border-[var(--color-border)] bg-transparent text-[var(--color-text-muted)]',
};

export function Badge({
  children,
  className,
  variant = 'muted',
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-[var(--radius-sm)] px-2.5 py-1 text-xs font-medium',
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
