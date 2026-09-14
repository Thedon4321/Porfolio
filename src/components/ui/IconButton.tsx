import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  label: string;
}

export function IconButton({
  children,
  label,
  className,
  type = 'button',
  ...props
}: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      className={cn(
        'inline-flex h-[var(--touch-min)] w-[var(--touch-min)] items-center justify-center rounded-[var(--radius-md)] text-[var(--color-text)] transition-[background-color,transform,color] duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:bg-[var(--color-surface-muted)] hover:scale-[1.04] active:scale-[0.96] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
