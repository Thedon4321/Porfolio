import type { Plugin } from 'vite';
import { writeFileSync, mkdirSync, readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import type { IncomingMessage, ServerResponse } from 'node:http';

const INDEXABLE_PATHS = ['/', '/projects/agrinaija'] as const;

function sendFile(
  res: ServerResponse,
  filePath: string,
  contentType: string,
): void {
  const body = readFileSync(filePath);
  res.statusCode = 200;
  res.setHeader('Content-Type', contentType);
  res.end(body);
}

/**
 * Writes `robots.txt` + `sitemap.xml` into `public/` using `VITE_SITE_URL`.
 * Also serves those exact paths in Vite dev (some environments fall through to SPA HTML).
 * Never invents localhost — if origin is empty, sitemap locs are omitted
 * and the Sitemap directive is left out of robots.txt.
 */
export function seoStaticFilesPlugin(siteUrl: string): Plugin {
  const origin = siteUrl.trim().replace(/\/$/, '');
  const publicDir = resolve(process.cwd(), 'public');

  function writeSeoFiles(outDir: string) {
    mkdirSync(outDir, { recursive: true });

    const robotsLines = [
      'User-agent: *',
      'Allow: /',
      '',
      'Disallow: /styleguide',
      'Disallow: /404',
      '',
    ];

    if (origin) {
      robotsLines.push(`Sitemap: ${origin}/sitemap.xml`, '');
    } else {
      robotsLines.push(
        '# Set VITE_SITE_URL at build time to emit: Sitemap: {origin}/sitemap.xml',
        '',
      );
    }

    writeFileSync(resolve(outDir, 'robots.txt'), robotsLines.join('\n'), 'utf8');

    const urlEntries = origin
      ? INDEXABLE_PATHS.map(
          (path) => `  <url>
    <loc>${origin}${path === '/' ? '/' : path}</loc>
  </url>`,
        ).join('\n')
      : '  <!-- Set VITE_SITE_URL then rebuild to emit absolute <loc> entries for /, /projects/agrinaija -->';

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`;

    writeFileSync(resolve(outDir, 'sitemap.xml'), sitemap, 'utf8');
  }

  return {
    name: 'portfolio-seo-static-files',
    buildStart() {
      writeSeoFiles(publicDir);
    },
    configureServer(server) {
      server.middlewares.use(
        (req: IncomingMessage, res: ServerResponse, next: () => void) => {
          const url = req.url?.split('?')[0] ?? '';
          if (url === '/robots.txt') {
            const filePath = resolve(publicDir, 'robots.txt');
            if (existsSync(filePath)) {
              sendFile(res, filePath, 'text/plain; charset=utf-8');
              return;
            }
          }
          if (url === '/sitemap.xml') {
            const filePath = resolve(publicDir, 'sitemap.xml');
            if (existsSync(filePath)) {
              sendFile(res, filePath, 'application/xml; charset=utf-8');
              return;
            }
          }
          next();
        },
      );
    },
  };
}
