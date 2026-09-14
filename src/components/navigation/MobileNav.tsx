import { useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import { IconButton } from '@/components/ui/IconButton';
import { NavLinks } from './NavLinks';
import { PrimaryNavCTA } from './PrimaryNavCTA';

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export function MobileNav({ open, onClose }: MobileNavProps) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const panel = panelRef.current;
    const focusables = panel
      ? Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE))
      : [];
    focusables[0]?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== 'Tab' || !panel) return;

      const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused.current?.focus();
    };
  }, [open, onClose]);

  if (!open || typeof document === 'undefined') return null;

  return createPortal(
    <div className="fixed inset-0 z-50 md:hidden" role="presentation">
      <button
        type="button"
        className="motion-overlay-in absolute inset-0 bg-[color-mix(in_srgb,var(--color-bg)_72%,transparent)] backdrop-blur-sm"
        aria-label="Close menu"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="motion-drawer-in absolute inset-y-0 right-0 flex w-[min(100%,20rem)] max-w-full flex-col border-l border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-[var(--shadow-md)]"
      >
        <div className="mb-6 flex items-center justify-between gap-3">
          <h2
            id={titleId}
            className="text-sm font-semibold tracking-tight text-[var(--color-text)]"
          >
            Menu
          </h2>
          <IconButton label="Close menu" onClick={onClose}>
            <span aria-hidden="true" className="text-lg leading-none">
              ×
            </span>
          </IconButton>
        </div>

        <NavLinks
          className="flex-col items-stretch gap-1"
          linkClassName="block rounded-[var(--radius-md)] px-3 py-3 text-base hover:bg-[var(--color-surface-muted)]"
          onNavigate={onClose}
        />

        <div className="mt-auto border-t border-[var(--color-border)] pt-4">
          <PrimaryNavCTA onNavigate={onClose} className="w-full" />
        </div>
      </div>
    </div>,
    document.body,
  );
}
