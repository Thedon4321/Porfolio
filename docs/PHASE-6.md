# Phase 6 — Projects / AgriNaija / Horticultural Hub

**Date:** 2026-09-13  
**Status:** Complete

## Scope

Data-driven project showcase UI: grid, cards, and case-study detail pages for the allowlisted projects only.

## Delivered

| Item | Detail |
| --- | --- |
| `ProjectCard` | Summary card; featured visual hierarchy for AgriNaija |
| `ProjectGrid` | Responsive grid; featured card spans full row at `md+` |
| `ProjectDetails` | Schema-driven case study (overview → links); TODOs where missing |
| `Projects` section | Homepage composition after Skills |
| Routes | `/projects/agrinaija`, `/projects/horticultural-hub`; unknown slugs → project 404 copy |

## Content policy

- **AgriNaija** (`featured: true`, `order: 1`, slug `agrinaija`) — verified facts only from `agrinaija.ts` / PROJECTS.md
- **Horticultural Hub** (`order: 2`, slug `horticultural-hub`) — placeholders; status banner on detail page
- No invented metrics, URLs, partnerships, or stack items
- **DevHub** not present in data or UI

## String audit (Phase 6)

| Scope | FarmLink variants | DevHub as product |
| --- | --- | --- |
| `src/` | None (exclusion comment only in `projects/index.ts`) | Comment-only exclusion |
| `public/` | None | None |
| `docs/` | Intentional exclusion / rename-audit instructions preserved | Intentional exclusion docs preserved |

## Canonical slugs

| Project | Slug | URL |
| --- | --- | --- |
| AgriNaija | `agrinaija` | `/projects/agrinaija` |
| Horticultural Hub | `horticultural-hub` | `/projects/horticultural-hub` |

Note: `/projects/agri-naija` is **not** a canonical route and correctly 404s.

## Validation

| Check | Result |
| --- | --- |
| `npm run typecheck` | Pass |
| `npm run build` | Pass |

## Deferred

- Contact form (Phase 7)
- Motion polish (Phase 8)
- SEO head tags / sitemap (Phase 9)
