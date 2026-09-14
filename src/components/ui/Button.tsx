import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'md' | 'sm';

type CommonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  loading?: boolean;
};

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className'> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children' | 'className'> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-[var(--color-accent-strong)] text-[var(--color-on-accent-strong)] hover:bg-[var(--color-accent-hover)] hover:text-[var(--color-on-accent-strong)]',
  secondary:
    'border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:border-[var(--color-accent)] hover:bg-[var(--color-surface-muted)]',
  ghost:
    'bg-transparent text-[var(--color-text-muted)] hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-text)]',
};

const sizeClasses: Record<ButtonSize, string> = {
  md: 'min-h-[var(--touch-min)] px-4 py-2 text-sm',
  sm: 'min-h-9 px-3 py-1.5 text-xs',
};

const baseClasses =
  'inline-flex items-center justify-center gap-2 rounded-[var(--radius-md)] font-semibold no-underline transition-[color,background-color,border-color,box-shadow,transform,opacity] duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:-translate-y-px active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0';


/** Shared class helper for `<Link className={buttonClassName(...)}>` etc. */
export function buttonClassName(options: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}): string {
  const { variant = 'primary', size = 'md', className } = options;
  return cn(baseClasses, variantClasses[variant], sizeClasses[size], className);
}

/**
 * Button primitive — renders `<button>` or `<a>` (when `href` is set) to avoid nested interactives.
 */
export function Button({
  children,
  className,
  variant = 'primary',
  size = 'md',
  loading = false,
  ...props
}: ButtonProps) {
  const classes = buttonClassName({ variant, size, className });

  if ('href' in props && props.href) {
    const { href, ...linkProps } = props;
    return (
      <a href={href} className={classes} {...linkProps}>
        {children}
      </a>
    );
  }

  const buttonProps = props as ButtonAsButton;
  const isDisabled = buttonProps.disabled || loading;

  return (
    <button
      type={buttonProps.type ?? 'button'}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      className={classes}
      {...buttonProps}
    >
      {loading ? <span className="sr-only">Loading</span> : null}
      {children}
    </button>
  );
}
