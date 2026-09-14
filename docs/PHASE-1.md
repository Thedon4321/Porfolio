# Phase 1 — Implementation notes

**Date:** 2026-09-09  
**Status:** Foundation scaffolding

## Repository root

Application root is **`portfolio/`**  
(`C:\Users\HP\Projects\ndlc-projects\portfolio`)

Sibling project `gatepass/` is unrelated and was not modified.

## Tailwind version (explicit)

- **Pinned:** `tailwindcss@4.3.3` and `@tailwindcss/vite@4.3.3` in `package.json`
- Integration via official Vite plugin (CSS-first; no classic `tailwind.config.js`)
- Design tokens live in `src/styles/index.css` (`:root` / `html.light` + `@theme inline`)

## Validation (Phase 1)

| Check | Result |
| --- | --- |
| `npm run typecheck` | Pass |
| `npm run build` | Pass |
| Dev server smoke (`/`, `/projects/agrinaija`) | HTTP 200 |
| FarmLink in `src/` / user-facing `public/` | None |
| DevHub as portfolio project entry | None (docs only mention exclusion rules) |

## Architectural alignment

No deviations from approved Phase 0 ADRs. Contact provider intentionally not installed yet (Phase 7).

## Branding / exclusion audits (Phase 1)

- AgriNaija used as marketplace name in data and UI
- Horticultural Hub included as second project with placeholders
- DevHub not present as a portfolio project (only mentioned in docs as excluded)
- No FarmLink product naming in `src/` or user-facing `public/` assets
- Architecture docs retain FarmLink/DevHub exclusion instructions by design
