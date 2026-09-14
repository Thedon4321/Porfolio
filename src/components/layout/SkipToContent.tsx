export function SkipToContent() {
  return (
    <a
      href="#main"
      className="absolute left-4 top-4 z-50 -translate-y-16 rounded-[var(--radius-md)] bg-[var(--color-accent-strong)] px-4 py-2 text-sm font-semibold text-[var(--color-on-accent-strong)] transition-[transform] duration-[var(--duration-fast)] ease-[var(--ease-standard)] focus:translate-y-0 focus-visible:translate-y-0"
    >
      Skip to main content
    </a>
  );
}
