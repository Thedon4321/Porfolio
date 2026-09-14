import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  hint?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    { id, label, error, hint, className, required, disabled, rows = 5, ...props },
    ref,
  ) {
    const fieldId = id ?? props.name;
    const errorId = fieldId ? `${fieldId}-error` : undefined;
    const hintId = fieldId ? `${fieldId}-hint` : undefined;
    const describedBy = [error ? errorId : null, hint ? hintId : null]
      .filter(Boolean)
      .join(' ') || undefined;

    return (
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={fieldId}
          className="text-sm font-medium text-[var(--color-text)]"
        >
          {label}
          {required ? (
            <span className="text-[var(--color-danger)]" aria-hidden="true">
              {' '}
              *
            </span>
          ) : null}
        </label>
        <textarea
          ref={ref}
          id={fieldId}
          rows={rows}
          required={required}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(
            'w-full resize-y rounded-[var(--radius-sm)] border bg-[var(--color-surface)] px-3 py-2 text-[var(--color-text)] transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] placeholder:text-[var(--color-text-muted)] disabled:cursor-not-allowed disabled:opacity-50',
            error
              ? 'border-[var(--color-danger)]'
              : 'border-[var(--color-border)] hover:border-[var(--color-accent)] focus:border-[var(--color-focus)]',
            className,
          )}
          {...props}
        />
        {hint && !error ? (
          <p id={hintId} className="text-xs text-[var(--color-text-muted)]">
            {hint}
          </p>
        ) : null}
        {error ? (
          <p
            id={errorId}
            role="alert"
            className="text-xs font-medium text-[var(--color-danger)]"
          >
            {error}
          </p>
        ) : null}
      </div>
    );
  },
);
