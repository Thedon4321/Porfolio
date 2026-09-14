# Phase 4 — Hero & About

**Date:** 2026-09-13  
**Status:** Complete

## Scope

Identity sections wired to `src/data/profile.ts` — brand-first hero + About narrative. No invented biography; TODO placeholders remain visible until real content is supplied.

## Delivered

| Item | Detail |
| --- | --- |
| `Hero` | Name (brand), title, shortBio, View projects / Contact CTAs, portrait from `profile.photo` |
| `About` | shortBio (+ longBio when present), location/availability when set, optional email/social/CV links, Get in touch CTA |
| `content.ts` | `hasContent` / `isPlaceholder` helpers for TODO-safe rendering |
| Home wiring | `HomePage` composes `<Hero />` + `<About />` |
| Brand chrome | Navbar / Footer use real `profile.name` when not a TODO |

## Content policy

- Missing optional fields omitted or shown as explicit TODO strings
- Email / GitHub / LinkedIn / Resume links render only when values are real URLs
- Portrait falls back to `/images/profile/placeholder.svg` on error

## Validation

| Check | Result |
| --- | --- |
| `npm run typecheck` | Pass |
| `npm run build` | Pass |

## Deferred

- Skills section (Phase 5)
- Motion polish (Phase 8)
- SEO head tags from profile (Phase 9)
