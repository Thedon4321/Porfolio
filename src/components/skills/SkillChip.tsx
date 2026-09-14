import type { HTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

interface SkillChipProps extends HTMLAttributes<HTMLLIElement> {
  name: string;
}

/**
 * Compact skill label — token-driven chip (not a heavy card).
 */
export function SkillChip({ name, className, ...props }: SkillChipProps) {
  return (
    <li
      className={cn(
        'inline-flex items-center rounded-[var(--radius-sm)] bg-[var(--color-surface-muted)] px-3 py-1.5 text-sm font-medium text-[var(--color-text)] transition-[background-color,color,transform] duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:bg-[var(--color-accent-soft)] hover:text-[var(--color-accent)] hover:-translate-y-px',
        className,
      )}
      {...props}
    >
      {name}
    </li>
  );
}
