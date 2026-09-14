# Performance Architecture

**Status:** Phase 0 — Documentation  
**Related:** [ARCHITECTURE.md](./ARCHITECTURE.md) · [SEO.md](./SEO.md) · [DEPLOYMENT.md](./DEPLOYMENT.md)

---

## 1. Targets (Core Web Vitals)

| Metric | Target (practical) |
| --- | --- |
| LCP | ≤ 2.5s on mid-tier mobile |
| INP | ≤ 200ms |
| CLS | ≤ 0.1 |
| Bundled JS (initial) | Keep lean — prefer < ~150–200KB gzip for critical path where feasible |

---

## 2. Image optimisation

- Prefer modern formats (WebP/AVIF) with fallbacks if needed
- Provide appropriately sized assets for card vs hero vs OG
- Explicit `width`/`height` or CSS `aspect-ratio` to prevent CLS
- Compress screenshots before commit
- Lazy-load below-the-fold images (`loading="lazy"`)
- Eager-load only LCP candidate (hero/profile or first project visual)

---

## 3. Lazy loading & code splitting

| Technique | Use |
| --- | --- |
| Route-based split | Lazy-load `ProjectPage` |
| Component lazy | Optional for heavy below-fold sections |
| Images | Native lazy loading |
| Fonts | Subset + `font-display: swap` |

---

## 4. Bundle size discipline

- Minimise dependencies (see ARCHITECTURE third-party list)
- Tree-shake icons (per-icon imports)
- No full UI kit
- Avoid shipping animation libraries unless necessary
- Analyse with `rollup-plugin-visualizer` if budget slips

---

## 5. Font loading

- Self-host Plus Jakarta Sans (preferred over third-party render-blocking CSS)
- Preload primary woff2 weight(s) used in hero
- Limit weights to those defined in the design system (400/500/600/700 max)

---

## 6. Caching

| Asset | Policy (host level) |
| --- | --- |
| Hashed JS/CSS | Long-lived immutable cache |
| HTML | Short cache / revalidate |
| Images | Long cache with hashed filenames or manual versioning |
| Fonts | Long cache |

---

## 7. Static generation posture

- Vite production build outputs static files
- No SSR required for v1
- Optional prerender of `/` and project routes later if SEO/LCP need it

---

## 8. Animation performance

- Transform/opacity only
- Avoid animating large blur/filter stacks
- Respect reduced motion
- Do not run continuous animations on scroll without throttling

---

## 9. Third-party scripts

- Defer analytics until after interactive (if used)
- Prefer privacy-friendly lightweight analytics
- Contact provider: use fetch to endpoint; no heavy embeds if avoidable

---

## 10. Measurement

- Lighthouse CI or manual Lighthouse before launch
- WebPageTest optional
- Check mobile throttling profiles
- Verify CLS with project card images present

---

## Document control

| Version | Date | Notes |
| --- | --- | --- |
| 0.1 | 2026-09-09 | Initial performance architecture |
