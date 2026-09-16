import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';

type CardVariant = 'default' | 'muted' | 'interactive';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: CardVariant;
}

const variantClasses: Record<CardVariant, string> = {
  default:
    'border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-sm)]',
  muted:
    'border-[var(--color-border)] bg-[var(--color-surface-muted)] shadow-none',
  interactive:
    'lift-hover border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-sm)] hover:border-[var(--color-accent)] hover:shadow-[var(--shadow-md)]',
};

export function Card({
  children,
  className,
  variant = 'default',
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        'rounded-[var(--radius-lg)] border p-4 sm:p-5',
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
