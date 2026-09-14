# Developer Portfolio

**Repository root:** `portfolio/` (under `ndlc-projects/`, sibling of `gatepass/`)

**Status**

- Phases 0–10 — Complete (Phase 10 with documented waivers)
- Phase 11 — Production readiness **blocked** on owner identity, contact env, domain/hosting (see [`docs/PHASE-11.md`](./docs/PHASE-11.md))
- Phase 12 — Not started

This is a tested local portfolio application. It is **not** a public live site until Phase 11 blockers are cleared.

---

## What this is

A professional software developer portfolio website built as a static React application. It showcases:

1. **AgriNaija** (primary / featured) — `/projects/agrinaija`

**DevHub is excluded.** Horticultural Hub was removed by owner request (never shipped). The agricultural marketplace is branded **AgriNaija** only (not FarmLink).

---

## Technology stack

| Layer | Choice | Version note |
| --- | --- | --- |
| Frontend | React + Vite | React 19 · Vite 6 |
| Language | TypeScript | ~5.8 |
| Styling | Tailwind CSS + CSS design tokens | **Tailwind CSS 4.3.3** (pinned) via `@tailwindcss/vite@4.3.3` |
| Routing | React Router | v7 |
| Hosting target | Netlify (preferred) | Portable static `dist/` |

No portfolio backend. No Redux/Zustand. No animation library in Phase 1.

---

## Architecture documentation

Approved Phase 0 docs live in [`docs/`](./docs/README.md):

- [ARCHITECTURE.md](./docs/ARCHITECTURE.md)
- [DATA-MODEL.md](./docs/DATA-MODEL.md)
- [PROJECTS.md](./docs/PROJECTS.md)
- [ROADMAP.md](./docs/ROADMAP.md)

---

## Project structure (Phase 1)

```
portfolio/
├── docs/                 # Phase 0 architecture (preserved)
├── public/               # Static assets, favicon, placeholders
├── src/
│   ├── components/       # layout, navigation, ui
│   ├── data/             # profile, site, projects/*
│   ├── hooks/
│   ├── lib/
│   ├── pages/            # Home, Project, NotFound
│   ├── styles/           # tokens + global CSS
│   ├── types/
│   ├── utils/
│   ├── App.tsx
│   └── main.tsx
├── .env.example
├── netlify.toml
├── package.json
└── vite.config.ts
```

---

## Development commands

```bash
npm install
npm run dev        # http://localhost:5173
npm run typecheck
npm run build
npm run preview
```

---

## Environment

Copy `.env.example` to `.env` locally when needed (never commit `.env`):

| Variable | Purpose |
| --- | --- |
| `VITE_SITE_URL` | Production origin for canonical / OG / sitemap (set on the host for production builds) |
| `VITE_CONTACT_PROVIDER` | `endpoint` or `netlify` |
| `VITE_CONTACT_FORM_ENDPOINT` | Public form endpoint (endpoint mode) |
| `VITE_CONTACT_ACCESS_KEY` | Optional public client key (e.g. Web3Forms) |

Production secrets and keys belong in the hosting platform’s environment settings — not in Git.

---

## Deployment (Netlify preferred)

- Build: `npm run build` → publish `dist/`
- Config: `netlify.toml` (SPA fallback + security headers)
- Set host env: `VITE_SITE_URL`, contact vars as needed, then rebuild

See [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md) and [docs/PHASE-11.md](./docs/PHASE-11.md).

---

## Next steps

Clear Phase 11 blockers (identity, contact provider, domain/HTTPS, `VITE_SITE_URL`), deploy, then run production smoke + live Lighthouse. Do not start Phase 12 until Phase 11 is evaluated complete.
