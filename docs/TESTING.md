# Testing Architecture

**Status:** Phase 10 executed — see [PHASE-10.md](./PHASE-10.md)  
**Related:** [ROADMAP.md](./ROADMAP.md) · [ACCESSIBILITY.md](./ACCESSIBILITY.md)

---

## 1. Strategy overview

This is a content-heavy marketing SPA. Testing prioritises **correct rendering of critical journeys**, **accessibility**, **responsiveness**, and **regression of project data** — not heavy backend integration.

| Layer | Approach | When |
| --- | --- | --- |
| Static analysis | TypeScript (+ ESLint when configured) | Every commit |
| Unit / component | Vitest + React Testing Library | Deferred — **not installed** (Phase 10 waiver) |
| Manual functional | Checklist walks | Each phase + pre-launch |
| Visual / responsive | Browser DevTools + real devices if available | Phases 3–8, 10 |
| A11y | Lighthouse a11y + keyboard spot checks | Phase 9–10 |
| Performance | Lighthouse | Phase 10–11 |
| SEO | Meta/sitemap validation | Phase 9–11 |

---

## 2. Component testing

Focus (when Vitest is added later):

- `Button` variants render and handle click/disabled
- `ContactForm` validation messages
- `ProjectCard` renders name/description/tech from fixtures
- `getProjectBySlug` returns expected project / undefined
- Theme toggle updates `document.documentElement` class

Avoid brittle snapshot-heavy suites.

**Phase 10:** No automated component suite executed (none present).

---

## 3. Functional testing

| Journey | Assertions |
| --- | --- |
| Visitor | Can scroll/navigate all sections |
| Projects | Both AgriNaija and Horticultural Hub visible; no DevHub |
| Project detail | Slug route shows correct project; unknown slug → 404 UI |
| Contact | Valid submit → success; invalid → errors; honeypot not required for users |
| External links | GitHub/LinkedIn/Live open with `noopener noreferrer` |

---

## 4. Responsive testing

Viewports: 360, 768, 1024, 1280, 1440+

Check:

- Nav collapse/expand
- Hero stacking
- 1→2 column project grid
- Form usability on mobile
- No horizontal scroll

---

## 5. Accessibility testing

- Keyboard-only full pass
- axe clean on home + project page
- Focus visible
- Form labels/errors
- Reduced motion: no essential content hidden behind motion

---

## 6. Navigation testing

- All anchor IDs resolve
- Active section indication does not break scroll
- Mobile menu open/close + focus restore
- Logo → home

---

## 7. Form testing

| Case | Expected |
| --- | --- |
| Empty submit | Field errors |
| Invalid email | Error |
| Valid submit | Success state; provider 200 |
| Provider failure | Error state + mailto fallback visible |
| Spam honeypot filled | Silently reject / ignore |

---

## 8. Link testing

- No `FarmLink` / `DevHub` hrefs or labels
- Live/GitHub links either valid or omitted (not `href="#"` fake)
- Resume link works when provided

---

## 9. Browser testing

Minimum:

- Chromium (Chrome/Edge)
- Firefox
- Safari / WebKit if available

---

## 10. Performance testing

- Lighthouse mobile ≥ acceptable CWV band
- LCP image identified and optimised
- No huge uncompressed PNGs in critical path

---

## 11. SEO validation

- Unique titles
- Description present
- Canonical absolute
- robots.txt + sitemap entries for home + both projects
- JSON-LD parses

---

## 12. Acceptance checklist (launch gate)

Results from Phase 10 execution (2026-09-14). Only mark pass if executed.

- [x] Build passes with zero TypeScript errors — **Pass** (`npm run typecheck` + `npm run build`)
- [x] Home renders Hero, About, Skills, Projects, Approach, Contact, Footer — **Pass (Approach added in Phase 11)**; identity content still TODO
- [x] Only AgriNaija and Horticultural Hub in Projects — **Pass**
- [x] No FarmLink / DevHub string matches in `src/` and user-facing `public/` — **Pass** (DevHub comment-only in allowlist)
- [x] Project detail routes work — **Pass** (incl. unknown slug UI)
- [ ] Contact form delivers a test message — **Fail / waived until Phase 11**: provider unconfigured; error path verified
- [x] Theme toggle persists — **Pass** (`portfolio-theme`)
- [ ] Keyboard navigation complete — **Partial / waived**: error focus, skip link, mobile nav verified; full tour + SR not done
- [x] Lighthouse a11y and performance reviewed — **Pass** (Perf 86, A11y 100 after contrast fix, BP 100, SEO 100)
- [ ] SEO tags + sitemap live on production domain — **Fail / deferred Phase 11**: local tags OK; absolute canonical/sitemap need `VITE_SITE_URL`
- [ ] HTTPS + custom domain (if configured) — **Deferred Phase 11**
- [x] Mobile layout verified — **Pass** (no horizontal overflow; drawer OK)

**Gate verdict:** Launch checklist **not fully green**. Phase 10 closed with **explicit waivers** documented in [PHASE-10.md](./PHASE-10.md). Portfolio is ready for Phase 11 configuration/deploy work, not for claiming full public-launch readiness.

---

## 13. Phase 10 execution log (summary)

| Area | Outcome |
| --- | --- |
| Typecheck / build | Pass (after Link import + contrast token fixes) |
| Functional / routes / form | Pass within unconfigured-provider limits |
| Responsive | Pass mobile + desktop; no overflow |
| SEO local | Pass; canonical correctly omitted without origin |
| Security greps | Pass |
| Lighthouse | Reviewed; contrast defect fixed and rechecked |
| Automated unit tests | None available |

Full detail: [PHASE-10.md](./PHASE-10.md)

---

## Document control

| Version | Date | Notes |
| --- | --- | --- |
| 0.1 | 2026-09-09 | Initial testing architecture |
| 0.2 | 2026-09-14 | Phase 10 results + checklist status |
