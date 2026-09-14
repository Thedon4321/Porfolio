import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element #root not found');
}

/**
 * Gate CSS-only reveal hiding behind `js-motion`.
 * Without JS (or with reduced motion), content stays fully visible.
 */
function enableMotionGate(): void {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduced) {
    document.documentElement.classList.add('js-motion');
  }

  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  const sync = () => {
    document.documentElement.classList.toggle('js-motion', !media.matches);
  };
  media.addEventListener('change', sync);
}

enableMotionGate();

/** Dark-only portfolio — clear any leftover light theme preference. */
document.documentElement.classList.add('dark');
document.documentElement.classList.remove('light');
try {
  window.localStorage.removeItem('portfolio-theme');
} catch {
  /* ignore quota / private mode */
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
