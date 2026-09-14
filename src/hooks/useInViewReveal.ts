import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface UseInViewRevealOptions {
  /** Fraction of element that must be visible (0–1) */
  threshold?: number;
  /** CSS rootMargin — default reveals slightly before fully in view */
  rootMargin?: string;
}

/**
 * Intersection Observer reveal — toggles `.is-visible` on the element.
 * When reduced motion is preferred, marks visible immediately (no hide).
 * Content stays visible if JS never runs (see CSS `.js-motion` gate).
 */
export function useInViewReveal<T extends HTMLElement>({
  threshold = 0.12,
  rootMargin = '0px 0px -6% 0px',
}: UseInViewRevealOptions = {}) {
  const ref = useRef<T | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (reducedMotion) {
      node.classList.add('is-visible');
      return;
    }

    if (typeof IntersectionObserver === 'undefined') {
      node.classList.add('is-visible');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [reducedMotion, threshold, rootMargin]);

  return ref;
}
