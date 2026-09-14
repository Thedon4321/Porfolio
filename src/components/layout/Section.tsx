import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';
import { useInViewReveal } from '@/hooks/useInViewReveal';
import { Container } from './Container';

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  'aria-labelledby'?: string;
  /** Disable intersection reveal (e.g. rare edge cases) */
  reveal?: boolean;
}

export function Section({
  id,
  children,
  className,
  containerClassName,
  'aria-labelledby': ariaLabelledBy,
  reveal = true,
}: SectionProps) {
  const revealRef = useInViewReveal<HTMLElement>();

  return (
    <section
      id={id}
      ref={reveal ? revealRef : undefined}
      aria-labelledby={ariaLabelledBy}
      className={cn(
        'py-[var(--space-10)] sm:py-[var(--space-12)] lg:py-[var(--space-16)]',
        reveal && 'reveal',
        className,
      )}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
