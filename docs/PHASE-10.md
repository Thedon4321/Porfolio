# Phase 10 — Testing and Launch Acceptance

**Date:** 2026-09-14  
**Status:** Complete (acceptance criteria met with **explicit waivers**)  
**Phase 11:** Not started

## Scope

Execute the TESTING.md checklist against the current portfolio. Fix defects within the existing architecture only. No new product features, no invented profile/contact facts, no Phase 11 deployment work.

## Environment

| Item | Value |
| --- | --- |
| Dev | `http://127.0.0.1:5174/` (Vite; SEO middleware fix) |
| Preview | `http://127.0.0.1:4173/` (`serve dist`) |
| Browser | Chromium via Cursor IDE browser + Lighthouse headless |
| `VITE_SITE_URL` | Unset |
| Contact provider | Unconfigured |

---

## Tests performed

### Technical quality

| Check | Result | Notes |
| --- | --- | --- |
| `npm run typecheck` | **Pass** | After fixing missing `Link` import |
| `npm run build` | **Pass** | Re-run after Phase 10 fixes |
| `npm test` / Vitest | **N/A** | No test script or Vitest suite in `package.json` |
| Console / network (spot) | **Pass** | No app console errors observed on home/project/404 navigations |
| Broken links/assets | **Pass** | Project live/GitHub URLs omitted (TODO), not fake `#` hrefs |

### Functional

| Check | Result | Notes |
| --- | --- | --- |
| Home sections | **Partial** | Hero, About, Skills, Projects, Contact, Footer present. **No Approach section** (never built in Phases 1–9) |
| Navigation anchors | **Pass** | About / Skills / Projects / Contact |
| Mobile nav open/close/Esc | **Pass** | Observed on ~559px viewport |
| Desktop primary nav | **Pass** | Visible at ~1265px width |
| Projects listing | **Pass** | AgriNaija + Horticultural Hub only |
| `/projects/agrinaija` | **Pass** | Title `AgriNaija \| Portfolio` |
| `/projects/horticultural-hub` | **Pass** | Title `Horticultural Hub \| Portfolio` |
| Unknown project slug | **Pass** | Project-not-found UI; DevHub/FarmLink not offered |
| `/404` | **Pass** | Title `Page not found \| Portfolio` |
| Contact empty submit | **Pass** | Field errors; focus → `#contact-name` |
| Contact invalid email | **Pass** | “Enter a valid email address.”; focus → email |
| Contact valid + unconfigured | **Pass** | Submitting → error path (`Try again` visible); delivery impossible without provider |
| Theme toggle persist | **Pass** | `localStorage` key `portfolio-theme` |
| Skip-to-content link | **Pass** | Present; `#main` has `tabIndex={-1}` |
| External links | **Pass** | `ExternalLink` uses `noopener noreferrer`; project URLs unset (TODO text, not links) |

### Responsive

| Check | Result | Notes |
| --- | --- | --- |
| Mobile ~360–560 | **Pass** | Menu button; no horizontal overflow (`scrollWidth === clientWidth`) |
| Desktop ~1280 | **Pass** | Primary nav; no horizontal overflow |
| Tablet 768 | **Not separately measured** | Covered by mobile/desktop breakpoints in practice; waived as explicit device pass |
| Mobile drawer | **Pass** | Open / close / Esc |

### Accessibility

| Check | Result | Notes |
| --- | --- | --- |
| Single `h1` / hierarchy | **Pass** | Home H1 → H2 → H3 order |
| Form labels / alerts | **Pass** | `role=alert` on errors; focus first invalid |
| Skip link / main landmark | **Pass** | |
| Buttons/links named | **Pass** | Lighthouse `button-name` / `link-text` |
| Honeypot AT exposure | **Pass after fix** | `hidden` + `aria-hidden`; `document.body.innerText` has no “Company”; some IDE a11y dumps still list the node |
| Reduced-motion | **Partial** | CSS/`js-motion` gate present; OS `prefers-reduced-motion` was **false** in test session — not forced |
| Full keyboard-only tour | **Partial** | Error focus + skip link + mobile nav verified; full tab order not exhaustively walked |
| Real screen reader | **Not executed** | No VoiceOver/NVDA session |

### SEO

| Check | Result | Notes |
| --- | --- | --- |
| Titles / descriptions | **Pass** | Home + projects + 404 |
| Robots meta | **Pass** | `index, follow` on home |
| Canonical | **Expected empty** | No `link[rel=canonical]` when origin unset — **not** localhost |
| OG / Twitter | **Pass** | `og:title`, `og:description`, `twitter:card=summary_large_image` |
| JSON-LD | **Pass** | Person + WebSite on home |
| `robots.txt` (dist) | **Pass** | Allow `/`; disallow styleguide/404; sitemap comment until origin set |
| `sitemap.xml` (dist) | **Pass (placeholder)** | Empty urlset with build-time instruction; no localhost locs |
| Dev SEO middleware | **Pass after fix** | `/robots.txt` + `/sitemap.xml` no longer SPA HTML |

### Security / configuration

| Check | Result | Notes |
| --- | --- | --- |
| No committed `.env` | **Pass** | Only `.env.example` |
| No FarmLink in `src/` | **Pass** | `rg` clean |
| DevHub not a project | **Pass** | Comment-only allowlist note |
| No credentials in source | **Pass** | Public env keys only; comments warn against secrets |

### Lighthouse (preview `http://127.0.0.1:4173/`)

**Initial run (before contrast token fix):**

| Category | Score |
| --- | --- |
| Performance | 86 |
| Accessibility | 96 |
| Best Practices | 100 |
| SEO | 100 |

Finding: light-theme primary CTA contrast 4.09:1 (`#ffffff` on `#0284c7`).

**After `--color-accent-strong: #0369a1`:**

| Category | Score |
| --- | --- |
| Accessibility | **100** |
| color-contrast | **Pass** (score 1, no failing nodes) |

Full category re-score after contrast fix was not re-run for Perf/BP/SEO; initial scores remain the recorded baseline except a11y contrast recheck.

Raw JSON: `docs/lighthouse-phase10.json` (initial full run).

---

## Defects discovered

1. **Vite dev** served SPA HTML for `/robots.txt` and `/sitemap.xml`.
2. **Nested interactives** — `<Link>` / `<a>` wrapping `<Button>`.
3. **Honeypot** label visible in some a11y trees.
4. **`ProjectDetails`** used `<Link>` without import → typecheck fail.
5. **Light theme primary CTA** insufficient contrast (Lighthouse).

---

## Fixes made

1. `vite.seo-plugin.ts` — `configureServer` middleware for robots/sitemap; Netlify SPA redirect `force = false`.
2. `Button` — `href` support + `buttonClassName()`; Hero/About/nav/cards/404 updated.
3. Contact honeypot — `hidden` + `aria-hidden` wrapper.
4. `ProjectDetails.tsx` — import `Link` from `react-router-dom`.
5. `index.css` light theme — `--color-accent-strong` / `--color-focus` → `#0369a1`.

---

## Remaining known limitations / explicit waivers

| Item | Waiver / defer |
| --- | --- |
| Approach homepage section | **Waived** — not in shipped IA; adding it would be a new feature |
| Contact “test message received” | **Waived until Phase 11** — needs `VITE_CONTACT_*` + real email/profile |
| Absolute canonical / populated sitemap | **Waived until production build** — set `VITE_SITE_URL` then rebuild |
| HTTPS + custom domain | **Phase 11** |
| Vitest component suite | **Waived** — not installed; avoid new libraries in Phase 10 |
| Firefox / Safari / real SR / forced reduced-motion | **Waived** — Chromium-only this pass |
| Profile/content TODOs | Content debt — not defects of architecture |
| SPA unknown URL HTTP status | Host still returns 200 for client 404s |

---

## Launch acceptance status

**Phase 10 acceptance: PASS WITH EXPLICIT WAIVERS.**

The portfolio is **not** fully production-ready for public launch until Phase 11 configures site URL, contact provider, identity content, and HTTPS/domain. Architecturally, tested journeys behave as designed and critical defects found in this phase were fixed.

**Do not start Phase 11 from this document alone** — wait for an explicit deployment prompt.
