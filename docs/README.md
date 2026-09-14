# Portfolio — Documentation Index

**Status:** Phase 11 blocked on production dependencies — see [PHASE-11.md](./PHASE-11.md)

Professional software developer portfolio — architecture docs (Phase 0) plus phase notes.

---

## Documents

| File | Contents |
| --- | --- |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | System overview, stack, ADRs, approval clarifications, executive summary |
| [DESIGN-SYSTEM.md](./DESIGN-SYSTEM.md) | Colour, typography, spacing, components tokens, responsive behaviour |
| [COMPONENTS.md](./COMPONENTS.md) | Component hierarchy and responsibilities |
| [DATA-MODEL.md](./DATA-MODEL.md) | Project/profile schema, validation, rendering |
| [PROJECTS.md](./PROJECTS.md) | AgriNaija (featured) + Horticultural Hub placeholders; DevHub exclusion; FarmLink rename note |
| [SEO.md](./SEO.md) | Metadata, OG/Twitter, sitemap, structured data |
| [ACCESSIBILITY.md](./ACCESSIBILITY.md) | WCAG 2.1 AA practical requirements |
| [PERFORMANCE.md](./PERFORMANCE.md) | CWV, images, bundle, fonts, caching |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | Netlify preferred; portable static hosting |
| [TESTING.md](./TESTING.md) | Test strategy + launch acceptance checklist |
| [PHASE-1.md](./PHASE-1.md) | Phase 1 scaffolding notes |
| [PHASE-2.md](./PHASE-2.md) | Phase 2 design system notes |
| [PHASE-3.md](./PHASE-3.md) | Phase 3 core layout notes |
| [PHASE-4.md](./PHASE-4.md) | Phase 4 Hero & About notes |
| [PHASE-5.md](./PHASE-5.md) | Phase 5 Skills notes |
| [PHASE-6.md](./PHASE-6.md) | Phase 6 Projects / AgriNaija / Horticultural Hub |
| [PHASE-7.md](./PHASE-7.md) | Phase 7 Contact |
| [PHASE-8.md](./PHASE-8.md) | Phase 8 Animations & Polish |
| [PHASE-9.md](./PHASE-9.md) | Phase 9 SEO & Accessibility |
| [PHASE-10.md](./PHASE-10.md) | Phase 10 Testing & launch acceptance |
| [PHASE-11.md](./PHASE-11.md) | Phase 11 Production readiness & deployment |
| [ROADMAP.md](./ROADMAP.md) | Phases 0–11 |

---

## Non-negotiables

- Showcase **only** AgriNaija (primary/featured)
- **Never** include DevHub
- **Horticultural Hub** excluded (owner: never made)
- Brand agricultural marketplace as **AgriNaija** (not FarmLink); rename any FarmLink refs during implementation
- Do not invent missing project facts — use `TODO — INFORMATION REQUIRED`
- No portfolio backend; keep dependencies minimal
- Analytics deferred

---

## Recommended next step

1. Content checklist items may be supplied anytime (identity + project URLs/media)
2. Issue a separate **Phase 1 implementation prompt** to begin scaffolding
3. At Phase 1 start, re-inspect `portfolio/` and adapt to the greenfield repo state

**Verdict:**

# ARCHITECTURE APPROVED → READY FOR IMPLEMENTATION

**Do not start Phase 1 until explicitly prompted.**
