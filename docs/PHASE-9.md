# Phase 9 — SEO & Accessibility

**Date:** 2026-09-14  
**Status:** Complete

## Scope

Discoverability and practical WCAG-oriented accessibility for the existing SPA — no UI redesign, no invented identity content, no Phase 10 test suite expansion.

## SEO delivered

| Item | Detail |
| --- | --- |
| `HeadTags` | Client head manager: title, description, robots, canonical, OG, Twitter |
| Route meta | `/`, `/projects/:slug`, `/404`, `/styleguide` (noindex for 404 + styleguide) |
| JSON-LD | Person + WebSite on home (verified profile fields only); CreativeWork on projects |
| OG image | Uses `site.ogImage` / project image; absolute when `VITE_SITE_URL` set |
| `robots.txt` | Allow `/`; disallow `/styleguide` + `/404`; Sitemap line when origin configured |
| `sitemap.xml` | `/`, `/projects/agrinaija`, `/projects/horticultural-hub` when `VITE_SITE_URL` set |
| Build plugin | `vite.seo-plugin.ts` regenerates public robots/sitemap from env (no localhost inventing) |

## Accessibility delivered

| Item | Detail |
| --- | --- |
| `FocusOnRouteChange` | Focuses page `h1` (or `#main`) after client navigations |
| `#main` | `tabIndex={-1}` for skip-link / programmatic focus |
| Contact form | Focuses first invalid field on failed validation |
| Mobile nav | Existing focus trap / Esc / restore (verified retained) |
| Skip link | Focus-visible reveal retained |
| Reduced motion | Phase 8 gate retained (content never hidden without motion) |

## Content / secrets policy

- Titles/descriptions fall back to documented TODO site defaults until profile fields are real
- JSON-LD omits empty/TODO profile properties
- No FarmLink product strings; DevHub not a project entry
- No credentials committed

## Remaining launch TODOs

- Set production `VITE_SITE_URL` and rebuild so canonical/OG/sitemap absolute URLs populate
- Replace profile TODO identity strings for richer titles/Person schema
- Host-level true HTTP 404 status for unknown URLs (SPA fallback still returns 200)

## Validation

| Check | Result |
| --- | --- |
| `npm run typecheck` | Pass |
| `npm run build` | Pass |

## Deferred

- Full TESTING.md / Lighthouse gate (Phase 10)
- Production deploy (Phase 11)
