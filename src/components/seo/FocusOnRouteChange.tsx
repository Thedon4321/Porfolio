import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * After client-side navigations, move focus to `#main` so assistive tech
 * lands on the new view — without focusing the hero `h1` (which drew a
 * visible blue focus border around the name).
 */
export function FocusOnRouteChange() {
  const { pathname } = useLocation();
  const previousPathname = useRef<string | null>(null);

  useEffect(() => {
    // Skip first paint and React StrictMode’s re-run on the same path.
    if (previousPathname.current === null) {
      previousPathname.current = pathname;
      return;
    }
    if (previousPathname.current === pathname) {
      return;
    }
    previousPathname.current = pathname;

    const main = document.getElementById('main');
    if (!main) return;

    const frame = window.requestAnimationFrame(() => {
      main.focus({ preventScroll: true });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}
