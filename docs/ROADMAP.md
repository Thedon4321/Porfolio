# Implementation Roadmap

**Status:** Phase 0 complete — ARCHITECTURE APPROVED → READY FOR IMPLEMENTATION  
**Rule:** Architecture is approved. **Do not start Phase 1** until a separate, explicit implementation prompt is issued.

---

## Phase 0 — Architecture & Documentation

| | |
| --- | --- |
| **Objective** | Produce the blueprint for the portfolio |
| **Tasks** | Analyse requirements; inspect repo; write docs under `portfolio/docs/`; exclude DevHub; document AgriNaija branding rules; record stakeholder approval clarifications |
| **Expected output** | Complete docs set listed in README |
| **Acceptance criteria** | ADRs recorded; stack chosen; data model defined; TODOs explicit; approval status set; no app code required |

**Complete.** Verdict: **ARCHITECTURE APPROVED → READY FOR IMPLEMENTATION**

Phase 1 implementation notes: [PHASE-1.md](./PHASE-1.md)

---

## Phase 1 — Project Setup

| | |
| --- | --- |
| **Objective** | Scaffold Vite + React + TypeScript + Tailwind app |
| **Tasks** | Re-inspect repo; init project adapted to greenfield `portfolio/` state; ESLint/Prettier; folder structure; routing shell; `.env.example`; README; base `site`/`profile` placeholders |
| **Expected output** | Runnable empty app shell on `npm run dev` |
| **Acceptance criteria** | Typecheck/build succeed; routes render placeholders; no showcase of excluded projects |

**Status:** Complete — foundation ready for next implementation phase

---

## Phase 2 — Design System

| | |
| --- | --- |
| **Objective** | Implement tokens and UI primitives |
| **Tasks** | Colour/type/spacing tokens; dark default theme; Button/Card/Badge/Input; font loading |
| **Expected output** | Story-less but usable primitive set on a sandbox page or styleguide section |
| **Acceptance criteria** | Tokens drive components; contrast sanity check; light theme tokens exist |

**Status:** Complete — see [PHASE-2.md](./PHASE-2.md)

---

## Phase 3 — Core Layout

| | |
| --- | --- |
| **Objective** | Global chrome |
| **Tasks** | AppShell, Container, Section, Navbar, MobileNav, Footer, Skip link, ThemeToggle |
| **Expected output** | Sticky nav + footer around blank sections |
| **Acceptance criteria** | Keyboard-accessible mobile nav; theme persistence; responsive header |

**Status:** Complete — see [PHASE-3.md](./PHASE-3.md)

---

## Phase 4 — Hero & About

| | |
| --- | --- |
| **Objective** | Identity sections |
| **Tasks** | Hero + About wired to `profile.ts`; CTAs to Projects/Contact |
| **Expected output** | Compelling first viewport + about narrative |
| **Acceptance criteria** | Placeholders only where content missing; brand-first hero; responsive |

**Status:** Complete — see [PHASE-4.md](./PHASE-4.md)

---

## Phase 5 — Skills

| | |
| --- | --- |
| **Objective** | Skills signalling |
| **Tasks** | `skills.ts` + SkillGroup/SkillChip UI |
| **Expected output** | Grouped skills section |
| **Acceptance criteria** | Data-driven; readable on mobile |

**Status:** Complete — see [PHASE-5.md](./PHASE-5.md)

---

## Phase 6 — Projects / AgriNaija / Horticultural Hub

| | |
| --- | --- |
| **Objective** | Showcase allowlisted projects |
| **Tasks** | Implement data modules; ProjectGrid/Card/Details; routes; images placeholders; FarmLink string audit prep |
| **Expected output** | Two project cards + detail pages |
| **Acceptance criteria** | Only AgriNaija + Horticultural Hub; verified AgriNaija facts only; TODOs not invented as facts; no DevHub |

**Status:** Complete — see [PHASE-6.md](./PHASE-6.md)

---

## Phase 7 — Contact

| | |
| --- | --- |
| **Objective** | Enquiry channel |
| **Tasks** | ContactForm + provider integration; honeypot; success/error; mailto fallback; social/CV links |
| **Expected output** | Working contact path on preview |
| **Acceptance criteria** | Test message received; a11y labels/errors; no secrets in repo |

**Status:** Complete — see [PHASE-7.md](./PHASE-7.md)  
**Note:** End-to-end “test message received” requires configuring host env (`VITE_CONTACT_*`) after deploy.

---

## Phase 8 — Animations & Polish

| | |
| --- | --- |
| **Objective** | Subtle motion and visual refinement |
| **Tasks** | Section reveal; hover states; reduced-motion support; spacing polish |
| **Expected output** | Cohesive motion language |
| **Acceptance criteria** | No jank; reduced-motion respected; dependency budget held |

**Status:** Complete — see [PHASE-8.md](./PHASE-8.md)

---

## Phase 9 — SEO & Accessibility

| | |
| --- | --- |
| **Objective** | Discoverability and AA practical compliance |
| **Tasks** | Head tags; OG image; JSON-LD; sitemap; robots; axe fixes; focus/route management |
| **Expected output** | SEO assets + a11y fixes |
| **Acceptance criteria** | Checklists in SEO.md and ACCESSIBILITY.md substantially complete |

**Status:** Complete — see [PHASE-9.md](./PHASE-9.md)

---

## Phase 10 — Testing

| | |
| --- | --- |
| **Objective** | Verify acceptance gate |
| **Tasks** | Execute TESTING.md checklist; fix defects; Lighthouse pass review |
| **Expected output** | Documented test results (short notes in PR/README) |
| **Acceptance criteria** | Launch checklist green or waived explicitly |

**Status:** Complete — see [PHASE-10.md](./PHASE-10.md) and [TESTING.md](./TESTING.md) §12.  
**Verdict:** Acceptance criteria satisfied via **explicit waivers** (live contact delivery, production canonical/sitemap/HTTPS, Vitest, multi-browser/SR). Approach section later completed in Phase 11.

---

## Phase 11 — Deployment

| | |
| --- | --- |
| **Objective** | Production release |
| **Tasks** | Connect host; env vars; domain/HTTPS; SPA redirects; smoke test production; final FarmLink/DevHub grep |
| **Expected output** | Live portfolio URL |
| **Acceptance criteria** | HTTPS site live; forms work; sitemap reachable |

**Status:** Partial — see [PHASE-11.md](./PHASE-11.md).  
**Live URL:** https://triumphudoportfolio.netlify.app/ (HTTPS + SPA verified).  
**Remaining:** Netlify Forms notification + live delivery test. LinkedIn/resume intentionally omitted. Live Lighthouse recorded (mobile 90/100/100/100; desktop 99/100/100/100).  
**Verdict:** `PARTIAL — LIVE SITE UP; CONTACT DELIVERY TEST REMAINS`. Do **not** start Phase 12.

---

## Dependency on content

Phases 4–7 can proceed with placeholders, but **launch quality** depends on completing the content checklist in ARCHITECTURE.md §12 / PROJECTS.md.

---

## Document control

| Version | Date | Notes |
| --- | --- | --- |
| 0.1 | 2026-09-09 | Initial roadmap |
| 0.2 | 2026-09-09 | Phase 0 approved; Phase 1 blocked pending explicit prompt |
| 0.3 | 2026-09-09 | Phase 1 foundation complete |
| 0.4 | 2026-09-13 | Phase 2 design system complete |
| 0.5 | 2026-09-13 | Phase 3 core layout complete |
| 0.6 | 2026-09-13 | Phase 4 Hero & About complete |
| 0.7 | 2026-09-13 | Phase 5 Skills complete |
| 0.8 | 2026-09-13 | Phase 6 Projects showcase complete |
| 0.9 | 2026-09-13 | Phase 7 Contact complete |
| 0.10 | 2026-09-14 | Phase 8 Animations & Polish complete |
| 0.11 | 2026-09-14 | Phase 9 SEO & Accessibility complete |
