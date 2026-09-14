import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath, URL } from 'node:url';
import { seoStaticFilesPlugin } from './vite.seo-plugin';

/** Application / repository root: `portfolio/` (sibling of `gatepass/` under ndlc-projects). */
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const siteUrl = env.VITE_SITE_URL ?? '';

  return {
    plugins: [react(), tailwindcss(), seoStaticFilesPlugin(siteUrl)],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  };
});
