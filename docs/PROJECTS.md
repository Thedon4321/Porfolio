# Portfolio Projects Documentation

**Status:** ARCHITECTURE APPROVED → READY FOR IMPLEMENTATION (content TODOs remain)  
**Related:** [DATA-MODEL.md](./DATA-MODEL.md) · [ARCHITECTURE.md](./ARCHITECTURE.md)

---

## Hard rules

1. Showcase **only**:
   - **AgriNaija** (primary / featured)
2. **Do not** document, reference, or reserve UI slots for **DevHub**.
3. **Horticultural Hub** is **excluded** (owner confirmation: never built / not part of this portfolio).
4. Branding: agricultural marketplace is **AgriNaija**. **FarmLink** and variants must not appear in the finished portfolio.
5. Do not invent features, metrics, URLs, or stack items. Use `TODO — INFORMATION REQUIRED` when unknown.

### Project positioning (approved)

| Priority | Project | Presentation |
| --- | --- | --- |
| 1 (featured) | **AgriNaija** | Primary case study — substantial real-world app (frontend, backend/API, DB, auth, RBAC, deployment) |

### Implementation rename audit (during Phase 1+ — not Phase 0)

During implementation / before launch, search the portfolio codebase for:

- `FarmLink`
- `Farmlink`
- `FARMlink`
- `farm-link`
- `farm_link`

Replace relevant user-facing and data references with **AgriNaija** (default: full replacement / removal).

---

## Project 1 — AgriNaija (primary / featured)

### Project overview

AgriNaija is a digital agricultural marketplace designed to connect farmers directly with consumers and reduce unnecessary middlemen.

| Field | Value |
| --- | --- |
| Display name | AgriNaija |
| Portfolio role | **Primary / featured** (`featured: true`, `order: 1`) |
| Former name | FarmLink (**must not appear in finished portfolio**) |
| Category | TODO — INFORMATION REQUIRED (suggested: Marketplace / AgriTech — confirm before use) |
| Status | TODO — INFORMATION REQUIRED |
| Live URL | TODO — INFORMATION REQUIRED |
| GitHub URL | TODO — INFORMATION REQUIRED |
| Primary image | TODO — INFORMATION REQUIRED |
| Role | TODO — INFORMATION REQUIRED |

### Problem

TODO — INFORMATION REQUIRED  
*(Known intent: reduce unnecessary middlemen between farmers and consumers — expand with verified problem framing before implementation copy is finalised.)*

### Solution

Digital marketplace connecting farmers directly with consumers.

TODO — INFORMATION REQUIRED for expanded solution narrative.

### Features (verified / known areas only)

Document only these known areas — do not invent additional functionality:

- Authentication
- Role-based access control
- Buyer functionality
- Farmer functionality
- Admin functionality
- Product listings
- Inventory
- Cart
- Orders
- Farmer verification
- Listing management
- PWA functionality
- API security
- Deployment

Any feature beyond this list = **out of scope for claims** until verified.

### Technology stack (verified)

| Layer | Technology |
| --- | --- |
| Frontend | React |
| API | Express REST API |
| ORM | Prisma |
| Database | PostgreSQL |

Additional libraries/services: TODO — INFORMATION REQUIRED

### Architecture (verified reference)

```
React Frontend
      ↓
Express REST API
      ↓
Prisma ORM
      ↓
PostgreSQL
```

Notes on hosting, auth mechanism, payment, file storage: TODO — INFORMATION REQUIRED

### Developer contribution

TODO — INFORMATION REQUIRED

### Deployment

Known as a concern/area of the project; specifics: TODO — INFORMATION REQUIRED

### Challenges

TODO — INFORMATION REQUIRED

### Results

TODO — INFORMATION REQUIRED  
Do not invent user counts, revenue, or performance metrics.

### SEO / card copy drafts (pending approval)

| Field | Draft / status |
| --- | --- |
| Card description | Digital agricultural marketplace connecting farmers directly with consumers. |
| Long description | TODO — INFORMATION REQUIRED |
| `seoTitle` | TODO — INFORMATION REQUIRED |
| `seoDescription` | TODO — INFORMATION REQUIRED |

---

## Project 2 — Horticultural Hub (second)

### Project overview

Horticultural Hub is a software project to be showcased in the portfolio as the **second** project. Use placeholders for any technical details not yet supplied — do not invent stack, features, or URLs.

| Field | Value |
| --- | --- |
| Display name | Horticultural Hub |
| Portfolio role | Second project (`featured: false` or secondary featured styling; `order: 2`) |
| Category | TODO — INFORMATION REQUIRED |
| Status | placeholder until content supplied |
| Live URL | TODO — INFORMATION REQUIRED |
| GitHub URL | TODO — INFORMATION REQUIRED |
| Primary image | TODO — INFORMATION REQUIRED |
| Role | TODO — INFORMATION REQUIRED |

### Problem

TODO — INFORMATION REQUIRED

### Solution

TODO — INFORMATION REQUIRED

### Key features

TODO — INFORMATION REQUIRED

### Technology

TODO — INFORMATION REQUIRED

### Architecture

TODO — INFORMATION REQUIRED

### Developer contribution

TODO — INFORMATION REQUIRED

### Deployment

TODO — INFORMATION REQUIRED

### Challenges

TODO — INFORMATION REQUIRED

### Results

TODO — INFORMATION REQUIRED

### Screenshots / media

TODO — INFORMATION REQUIRED

---

## Explicitly excluded

### DevHub

- Not a portfolio project
- Not listed in data model seed list
- Not referenced in SEO keywords, sitemap entries, or UI navigation
- No “coming soon” card for DevHub

---

## Content readiness matrix

| Item | AgriNaija | Horticultural Hub |
| --- | --- | --- |
| Name | Available | Available |
| One-line purpose | Available | Missing |
| Features list | Partial (known areas) | Missing |
| Stack | Available | Missing |
| Architecture | Available (high-level) | Missing |
| Live URL | Missing | Missing |
| GitHub URL | Missing | Missing |
| Screenshots | Missing | Missing |
| Role | Missing | Missing |
| Results | Missing | Missing |

---

## Document control

| Version | Date | Notes |
| --- | --- | --- |
| 0.1 | 2026-09-09 | Initial project docs with verified AgriNaija facts only |
| 0.2 | 2026-09-09 | Featured positioning; approval status; FarmLink audit deferred to implementation |
| 0.3 | 2026-09-13 | Phase 6 UI live; canonical slugs `agrinaija` / `horticultural-hub`; src audit clean |
