# Portfolio Architecture

**Status:** ARCHITECTURE APPROVED → READY FOR IMPLEMENTATION  
**Last updated:** 2026-09-09  
**Scope:** Professional software developer portfolio website  
**Code status:** Documentation only — **do not start Phase 1** until a separate, explicit implementation prompt is issued

---

## Table of contents

1. [System overview](#1-system-overview)
2. [Proposed application architecture](#2-proposed-application-architecture)
3. [Frontend architecture](#3-frontend-architecture)
4. [Page / section architecture](#4-page--section-architecture)
5. [Theme architecture](#5-theme-architecture)
6. [Animation architecture](#6-animation-architecture)
7. [Contact architecture](#7-contact-architecture)
8. [Security architecture](#8-security-architecture)
9. [Version control architecture](#9-version-control-architecture)
10. [File / folder architecture](#10-file--folder-architecture)
11. [User journeys](#11-user-journeys)
12. [Content architecture](#12-content-architecture)
13. [Third-party dependencies](#13-third-party-dependencies)
14. [Architectural decision records (ADR)](#14-architectural-decision-records-adr)
15. [Executive summary](#15-executive-summary)
16. [Final Phase 0 approval clarifications](#16-final-phase-0-approval-clarifications)

**Related documents**

| Document | Purpose |
| --- | --- |
| [DESIGN-SYSTEM.md](./DESIGN-SYSTEM.md) | Colour, type, spacing, components tokens |
| [COMPONENTS.md](./COMPONENTS.md) | Component hierarchy and responsibilities |
| [PROJECTS.md](./PROJECTS.md) | AgriNaija & Horticultural Hub content |
| [DATA-MODEL.md](./DATA-MODEL.md) | Project data schema and rendering |
| [SEO.md](./SEO.md) | Metadata, structured data, crawl strategy |
| [ACCESSIBILITY.md](./ACCESSIBILITY.md) | WCAG 2.1 AA requirements |
| [PERFORMANCE.md](./PERFORMANCE.md) | Core Web Vitals and optimisation |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | Hosting and CI/CD |
| [TESTING.md](./TESTING.md) | Test strategy and acceptance checklist |
| [ROADMAP.md](./ROADMAP.md) | Phased implementation plan |

---

## Repository context (inspection findings)

| Finding | Detail |
| --- | --- |
| Workspace | `ndlc-projects` currently contains `gatepass` and this new `portfolio` docs root |
| Existing portfolio app | **None** — greenfield documentation |
| Existing `/docs` for portfolio | **None** — this structure is the source of truth |
| GatePass overlap | GatePass is a separate product; it is **not** a portfolio showcase project for this site |
| Showcase projects (allowed) | **AgriNaija**, **Horticultural Hub** only |
| Excluded project | **DevHub** — must not appear in IA, data model, SEO, UI, or content |
| Branding rename | Old name **FarmLink** (and variants) must not appear in the finished portfolio. During **implementation**, search/replace: `FarmLink`, `Farmlink`, `FARMlink`, `farm-link`, `farm_link` → **AgriNaija**. Not performed in Phase 0 |
| Project positioning | **AgriNaija** = primary/featured; **Horticultural Hub** = second (placeholders for unknown tech details) |
| Hosting preference (approved) | **Netlify** preferred; keep portable for Vercel/other static hosts |
| Analytics (approved) | Deferred until a specific requirement exists |
| Phase boundary | Architecture approved; Phase 1 blocked until explicit implementation prompt |

---

## 1. System overview

### 1.1 What the portfolio is

A modern, professional marketing / credibility site for a software developer. It presents identity, skills, selected real-world projects, problem-solving approach, and contact channels. It is **not** a SaaS product, CMS, or multi-user application.

### 1.2 Target users

| Persona | Goals |
| --- | --- |
| Recruiters / hiring managers | Assess stack fit, project quality, professionalism, contact quickly |
| Potential freelance clients | Understand capability via shipped work, approach, and send an enquiry |
| Technical peers / collaborators | Evaluate engineering depth from project write-ups and links |
| General visitors | Learn who the developer is and what they build |

### 1.3 Main user journeys

See [§11 User journeys](#11-user-journeys). Summary: land → skim credibility → inspect projects → contact or follow external profiles.

### 1.4 Major system components

```
┌─────────────────────────────────────────────────────────────┐
│                     Portfolio Frontend                       │
│  (React + Vite + TypeScript SPA, static assets)             │
│  Layout · Sections · Theme · SEO meta · A11y                │
└───────────────────────────┬─────────────────────────────────┘
                            │
              ┌─────────────┴─────────────┐
              ▼                           ▼
   Static project / profile data    External services
   (typed modules under src/data)   (contact provider,
                                    analytics optional,
                                    GitHub / LinkedIn links)
```

### 1.5 Is a backend required?

**No dedicated application backend is required** for the portfolio itself.

| Concern | Approach |
| --- | --- |
| Project content | Static typed data modules (or JSON) in the repo |
| Profile / skills / copy | Static content modules |
| Images | Optimised static assets in `public/` / `src/assets` |
| Contact form | Third-party form/email service (see Contact ADR) |
| Analytics | Optional third-party script (privacy-conscious) |

A backend would add hosting cost, attack surface, and maintenance without clear product need. Prior projects using Express/Prisma does **not** justify a portfolio backend.

### 1.6 Static frontend responsibilities

- Rendering all marketing sections
- Client-side routing / in-page navigation
- Theme preference persistence (`localStorage` + system preference)
- Opening project detail views (modal or dedicated route with static data)
- Client-side form validation before submit to third-party endpoint
- SEO-oriented meta tags and semantic HTML

### 1.7 Third-party services (where needed)

| Service type | Required? | Purpose |
| --- | --- | --- |
| Contact / email relay | **Recommended** | Deliver enquiry emails without a custom API |
| Spam protection | **Recommended** | Honeypot + provider CAPTCHA/rate limits |
| Hosting CDN | **Required** | Static asset delivery, HTTPS |
| Analytics | Optional | Traffic insight (defer until privacy decision) |
| Font CDN | Prefer self-host | Performance + privacy |

---

## 2. Proposed application architecture

### Options compared

| Option | Description | Fit |
| --- | --- | --- |
| **A — Static frontend** | Build once, serve HTML/JS/CSS/assets from CDN | Excellent for content + demos |
| **B — Frontend + lightweight backend** | Always-on API for contact/CMS | Unnecessary complexity |
| **C — Frontend + serverless functions** | On-demand functions for contact | Viable for contact only |

### Recommendation: **Option A primary + contact via managed service (not custom serverless unless needed)**

**Why**

- **Simplicity:** One deployable artefact; matches solo-developer maintenance capacity
- **Security:** No custom auth, DB, or secret-bearing API to operate
- **Performance:** CDN-cached static assets; excellent LCP/TTFB potential
- **Cost:** Free/low tiers on Netlify/Vercel/Cloudflare Pages are sufficient
- **Deployability:** Git push → build → publish
- **Scalability:** Static sites scale via CDN; portfolio traffic does not need app servers

**When to revisit Option C:** If the chosen contact provider is unacceptable (region, spam, branding) and a single Netlify/Vercel function + email API key becomes preferable. Still avoid Option B.

**High-level flow**

```
User
  ↓
Portfolio Frontend (static SPA)
  ↓
Static Project Data (src/data)
  ↓
External Services (contact provider only where required)
```

---

## 3. Frontend architecture

### 3.1 Stack recommendation

| Layer | Choice | Rationale |
| --- | --- | --- |
| UI library | **React 19** (or current stable) | Matches developer skill narrative; component ecosystem |
| Build tool | **Vite** | Fast DX, simple static output, aligns with GatePass familiarity |
| Language | **TypeScript** | Safer data schemas, better maintainability |
| Styling | **Tailwind CSS** (v4 preferred if tooling stable) | Utility-first speed, design-token mapping via CSS variables |
| Routing | **React Router** (declarative) | Home SPA + optional `/projects/:slug` for shareable project URLs |
| State | **React local state + Context for theme** | No Redux/Zustand needed |
| Data | **Typed modules** in `src/data/` | Versioned with git; easy to extend |
| Forms | **Native controlled inputs + small validation helpers** | Avoid heavy form libraries initially |
| Animation | **CSS transitions + Intersection Observer**; optional motion library only if CSS proves insufficient | Prefer fewer dependencies |
| SEO helpers | **react-helmet-async** or equivalent head manager | Per-route meta for project pages |

### 3.2 Framework decisions explained

- **React over Astro/Next:** Primary goal includes demonstrating React capability. A Vite SPA is enough for a small content site if meta tags, sitemap, and semantic HTML are handled carefully. Astro remains a strong alternative if SEO ever becomes a hard requirement beyond SPA capabilities — see ADR.
- **TypeScript over JavaScript:** Project schema benefits from compile-time checks; little cost at this scale.
- **Tailwind over CSS Modules-only:** Faster iteration for a design-system-driven marketing site; tokens live in CSS variables consumed by Tailwind theme.

### 3.3 Routing strategy

**Hybrid single-page marketing site with optional detail routes**

| Route | Purpose |
| --- | --- |
| `/` | Primary landing: Hero → About → Skills → Projects → Approach → Contact → Footer |
| `/projects/:slug` | Deep-linkable project case study (AgriNaija, Horticultural Hub) |
| Fallback | Soft 404 → home or dedicated Not Found |

In-page section links use hash or scroll-spy anchors (`#about`, `#skills`, `#projects`, `#approach`, `#contact`).

**Why not multi-page marketing site only:** Recruiters expect one scrollable narrative; deep links for projects improve sharing and SEO for case studies.

### 3.4 Component architecture

See [COMPONENTS.md](./COMPONENTS.md).

### 3.5 State management

| State | Location |
| --- | --- |
| Theme (`dark` / `light`) | `ThemeProvider` + `localStorage` + `prefers-color-scheme` |
| Mobile nav open/closed | Local component state |
| Project modal / active project | Local or route param |
| Contact form fields / status | Local form state |
| Scroll / active section | Optional lightweight hook (Intersection Observer) |

No global server cache, no auth session store.

### 3.6 Data management

- Import projects from `src/data/projects.ts` (or per-file modules + index)
- Import profile from `src/data/profile.ts`
- Import skills from `src/data/skills.ts`
- Components remain presentational; data flows as props

### 3.7 Form handling

- Controlled inputs
- Client validation: required fields, email format, message length
- Submit to contact provider endpoint via `fetch`
- UI states: idle → submitting → success | error
- Honeypot field (hidden from users, ignored by AT)

### 3.8 Animation strategy

See [§6](#6-animation-architecture).

### 3.9 Theme management

See [§5](#5-theme-architecture) and [DESIGN-SYSTEM.md](./DESIGN-SYSTEM.md).

### 3.10 Responsive design strategy

Mobile-first breakpoints; see [DESIGN-SYSTEM.md](./DESIGN-SYSTEM.md#responsive-architecture).

---

## 4. Page / section architecture

### Information architecture (initial)

```
/ (Home)
├── Navbar (persistent)
├── Hero
├── About
├── Skills
├── Projects
│   ├── ProjectGrid
│   └── → /projects/:slug (or modal detail)
├── Development Approach
├── Contact
└── Footer
```

### Section purposes

| Section | Purpose | Content notes |
| --- | --- | --- |
| **Hero** | Brand + positioning + primary CTA | Name, title, one-line value prop, CTAs (View Projects / Contact), optional portrait |
| **About** | Credibility and human context | Short bio, focus areas, location/availability flags (TODO if unknown) |
| **Skills** | Stack signal for recruiters | Grouped skills (Frontend, Backend, Tools, Practices) — data-driven |
| **Projects** | Proof of real-world delivery | **Only** AgriNaija and Horticultural Hub cards |
| **Development Approach** | Problem-solving narrative | Process: understand → design → build → validate → ship (keep concise) |
| **Contact** | Conversion | Form + email/social links |
| **Footer** | Secondary nav + legal/meta | Links, copyright, social icons |

**DevHub:** Explicitly excluded from this IA.

---

## 5. Theme architecture

| Item | Decision |
| --- | --- |
| Default | **Dark mode** |
| Optional | Light mode toggle |
| Tokens | CSS custom properties (`--color-bg`, `--color-accent`, etc.) |
| Switching | Toggle in Navbar; updates `class` on `<html>` (`dark` / `light`) |
| Persistence | `localStorage` key e.g. `portfolio-theme` |
| System preference | Used on first visit if no stored preference |
| Accessibility | Maintain WCAG AA contrast in both themes; visible focus rings |

Full token tables: [DESIGN-SYSTEM.md](./DESIGN-SYSTEM.md).

---

## 6. Animation architecture

### Principles

- Subtle, purposeful motion only
- Respect `prefers-reduced-motion: reduce` (disable/non-essential motion)
- Prefer CSS; add a library only if orchestration cost exceeds CSS benefit

### Recommended approach

| Interaction | Technique |
| --- | --- |
| Page entry | Soft fade/slide on hero content (CSS) |
| Section reveal | Intersection Observer + CSS class (`is-visible`) |
| Project cards | Hover lift/border accent (CSS transform/opacity) |
| Buttons | Hover/active scale or colour transition (CSS) |
| Navigation | Mobile drawer slide; focus trap when open |
| Route transitions | Minimal or none (avoid heavy page morphs) |

### Library policy

- **Default:** No animation library
- **Optional later:** `motion` (Framer Motion) only if multi-step choreography is required — mark as optional dependency
- Avoid particle systems, continuous background loops, and scroll-jacking

### Performance

- Animate `transform` and `opacity` only
- Avoid layout thrashing properties (`top`, `height`, `box-shadow` thrash)
- Cap concurrent reveals on low-end devices via reduced-motion and simpler CSS

---

## 7. Contact architecture

### Options

| Option | Pros | Cons |
| --- | --- | --- |
| **1. Third-party email/form service** (Formspree, Web3Forms, Getform, Netlify Forms) | Fast, no backend, spam tools, low cost | Vendor dependency; free-tier limits |
| **2. Serverless function** | Full control | Secrets, cold starts, more ops |
| **3. Backend API** | Full control | Highest cost/complexity — rejected |
| **4. mailto: fallback** | Zero infra | Poor UX on many devices; no structured intake |

### Recommendation: **Option 1 — Third-party form/email service**, with **mailto** as progressive enhancement / failure fallback link

**Selection criteria**

| Criterion | Assessment |
| --- | --- |
| Security | Secrets stay on provider; frontend only posts to public form endpoint / access key designed for client use |
| Cost | Free tier adequate for portfolio volume |
| Reliability | Mature providers |
| Spam | Honeypot + provider rate limits / CAPTCHA |
| Deploy | No custom function required |
| Maintenance | Near zero |

**Preferred pairing with hosting:** If deploying to **Netlify**, prefer **Netlify Forms** for fewer vendors. If deploying to **Vercel/Cloudflare**, prefer **Web3Forms** or **Formspree**.

**Approved hosting preference:** Netlify. Prefer **Netlify Forms** when deploying to Netlify. If portability requires Vercel/another static host, switch contact to Web3Forms/Formspree (or equivalent) without changing app architecture. Exact form endpoint/keys remain **TODO — INFORMATION REQUIRED** at implementation time.

---

## 8. Security architecture

Even as a static site:

| Control | Requirement |
| --- | --- |
| Form spam | Honeypot + provider protections; optional CAPTCHA |
| XSS | React's default escaping; never `dangerouslySetInnerHTML` for user input; sanitise if rich text ever added |
| External links | `rel="noopener noreferrer"` on `target="_blank"` |
| Env vars | Only public Vite `VITE_*` keys in client; no SMTP passwords, private API keys, or DB URLs in frontend |
| Secrets | Contact private keys live in host env or provider dashboard — never committed |
| Dependencies | Lockfile + periodic `npm audit`; minimise deps |
| Content | Project copy is trusted (author-controlled); still treat URLs carefully |
| Headers | Enable security headers via host (CSP baseline, `X-Content-Type-Options`, `Referrer-Policy`) |

---

## 9. Version control architecture

Solo-developer friendly GitHub Flow:

```
main                    ← production
  ├── feature/setup
  ├── feature/design-system
  ├── feature/hero
  ├── feature/projects
  ├── feature/contact
  ├── feature/seo-a11y
  └── fix/...
```

| Practice | Guideline |
| --- | --- |
| Production branch | `main` |
| Feature branches | Short-lived `feature/*`, `fix/*` |
| Commits | Conventional-ish: `feat:`, `fix:`, `docs:`, `chore:`, `perf:`, `a11y:` |
| PRs | Optional for solo but useful for preview deploys; keep small |
| Deploy | Push/merge to `main` → production; PR → preview |
| Secrets | Never commit `.env`; commit `.env.example` only |

---

## 10. File / folder architecture

Proposed structure (to be created in implementation phases — **not created as app code in Phase 0**):

```
portfolio/
├── public/
│   ├── favicon.svg
│   ├── og-image.png
│   ├── robots.txt
│   ├── sitemap.xml          # or generated at build
│   ├── images/
│   │   ├── projects/
│   │   │   ├── agrinaija/
│   │   │   └── horticultural-hub/
│   │   └── profile/
│   └── icons/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── layout/          # AppShell, Section, Container
│   │   ├── navigation/      # Navbar, MobileNav, ThemeToggle
│   │   ├── hero/
│   │   ├── about/
│   │   ├── skills/
│   │   ├── projects/        # ProjectGrid, ProjectCard, ProjectDetails
│   │   ├── approach/
│   │   ├── contact/
│   │   ├── footer/
│   │   └── ui/              # Button, Card, Badge, Input, Textarea
│   ├── data/
│   │   ├── profile.ts
│   │   ├── skills.ts
│   │   ├── approach.ts
│   │   ├── projects/
│   │   │   ├── index.ts
│   │   │   ├── agrinaija.ts
│   │   │   └── horticultural-hub.ts
│   │   └── site.ts          # site URL, socials meta defaults
│   ├── hooks/               # useTheme, usePrefersReducedMotion, useActiveSection
│   ├── lib/                 # contact client, cn() helper
│   ├── styles/              # index.css, tokens
│   ├── utils/
│   ├── pages/               # HomePage, ProjectPage, NotFoundPage
│   ├── App.tsx
│   └── main.tsx
├── docs/                    # ← this documentation set
├── .env.example
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.*        # or CSS-first Tailwind v4 config
└── README.md
```

---

## 11. User journeys

### Visitor journey

```
Landing → Hero → About → Skills → Projects → Project Details → Contact
```

### Recruiter journey

```
Landing → Skills → Projects → GitHub / LinkedIn → Contact
```

### Potential client journey

```
Landing → Projects → Development Approach → Contact → Send Enquiry
```

### Journey requirements

- Primary CTAs always reachable within one click from Navbar
- Project details never dead-end: back to Projects + Contact CTA
- External profile links open safely in new tabs

---

## 12. Content architecture

### AVAILABLE INFORMATION

| Item | Status |
| --- | --- |
| Showcase project: AgriNaija | Partial — overview + known stack/features documented in PROJECTS.md |
| Showcase project: Horticultural Hub | Placeholder structure only |
| Excluded: DevHub | Confirmed exclusion |
| Branding: AgriNaija (not FarmLink) | Confirmed requirement |
| Design direction | Dark primary, blue/teal accent (DESIGN-SYSTEM.md) |
| Stack preference signals | React / Express / Prisma / PostgreSQL known for AgriNaija |

### INFORMATION STILL REQUIRED (checklist)

- [ ] Developer legal / display name
- [ ] Professional title (e.g. Full-Stack Developer)
- [ ] Biography (short + optional long)
- [ ] Profile photograph (rights-cleared)
- [ ] Public email
- [ ] GitHub profile URL
- [ ] LinkedIn URL
- [ ] Resume/CV file or URL
- [ ] Location / availability / timezone (optional but useful)
- [ ] AgriNaija live URL
- [ ] AgriNaija GitHub URL
- [ ] AgriNaija screenshots / demo media
- [ ] AgriNaija challenges, results, exact role wording (if not self-authored yet)
- [ ] Horticultural Hub overview (problem/solution)
- [ ] Horticultural Hub technology stack
- [ ] Horticultural Hub architecture
- [ ] Horticultural Hub features
- [ ] Horticultural Hub live URL
- [ ] Horticultural Hub GitHub URL
- [ ] Horticultural Hub screenshots
- [ ] Canonical production domain
- [ ] Contact provider choice (prefer Netlify Forms on Netlify; portable alternative if host differs)
- [ ] Analytics preference (none / Plausible / etc.)

Until these are supplied, implementation should use clearly marked placeholders — never invented biography or metrics.

---

## 13. Third-party dependencies

### Likely required

| Dependency | Purpose | Optional? | Perf | Security |
| --- | --- | --- | --- | --- |
| `react`, `react-dom` | UI | No | Core | Keep updated |
| `react-router` | Routing | No (if detail routes) | Small | Keep updated |
| `typescript` | Types | Dev | Build-time | N/A |
| `vite` | Bundler | Dev/build | Excellent | N/A |
| `tailwindcss` | Styling | No | CSS purge/build | N/A |
| Contact provider | Forms | Strongly recommended | Negligible JS | Public endpoint only |

### Likely optional

| Dependency | Purpose | Optional? | Notes |
| --- | --- | --- | --- |
| `react-helmet-async` | Document head | Optional but useful | Prefer lightweight head management |
| `clsx` / `tailwind-merge` | Class composition | Optional | Tiny helpers |
| `motion` | Advanced animation | Optional — default off | Only if CSS insufficient |
| `zod` | Runtime data validation | Optional | Useful for project schema guards |
| Icon set (`lucide-react`) | Icons | Optional | Tree-shake; avoid whole-pack imports |
| Analytics SDK | Metrics | Optional | Privacy review first |

### Avoid unless justified

- Full UI kits (heavy, generic look)
- Redux / React Query (no server state)
- CMS SDKs (static data is enough)
- Custom Express portfolio API

---

## 14. Architectural decision records (ADR)

### ADR-001 — Framework

- **Decision:** React + Vite SPA
- **Reason:** Aligns with demonstrated skills; excellent DX; static deploy
- **Alternatives:** Next.js, Astro, plain HTML
- **Why selected:** Skill showcase + simplicity; SSG frameworks add complexity not required at v1
- **Trade-offs:** SPA SEO needs careful meta/sitemap work; Astro would be stronger for content SEO if priorities shift

### ADR-002 — Styling

- **Decision:** Tailwind CSS + CSS design tokens
- **Reason:** Rapid, consistent UI; token-driven themes
- **Alternatives:** CSS Modules, styled-components, vanilla CSS
- **Why selected:** Speed and maintainability for marketing UI
- **Trade-offs:** Utility class verbosity; mitigated with small UI primitives

### ADR-003 — Project data storage

- **Decision:** Typed TypeScript modules under `src/data/projects`
- **Reason:** Git-versioned, typed, no CMS cost
- **Alternatives:** JSON files, headless CMS, markdown MDX
- **Why selected:** Simplest typed approach; easy to add projects
- **Trade-offs:** Non-developers cannot edit without PR (acceptable)

### ADR-004 — Routing

- **Decision:** Home sections + `/projects/:slug`
- **Reason:** Shareable case studies + single narrative homepage
- **Alternatives:** Hash-only SPA, fully multi-page
- **Why selected:** Best recruiter UX + linkability
- **Trade-offs:** Need host rewrite rules for SPA fallback

### ADR-005 — Contact form

- **Decision:** Third-party form/email service (+ mailto fallback)
- **Reason:** Security and ops without a backend
- **Alternatives:** Serverless mailer, custom API, mailto-only
- **Why selected:** Lowest risk/cost for portfolio volume
- **Trade-offs:** Vendor limits; migrate to serverless later if needed

### ADR-006 — Animation

- **Decision:** CSS + Intersection Observer first
- **Reason:** Performance and fewer dependencies
- **Alternatives:** Framer Motion / GSAP by default
- **Why selected:** Sufficient for subtle polish
- **Trade-offs:** Complex choreography harder — accept for v1

### ADR-007 — Hosting

- **Decision:** **Netlify** preferred (static Vite build); remain portable to Vercel/other static hosts
- **Reason:** Stakeholder approval; Git-based deploy, HTTPS, previews, low cost; Netlify Forms pairing
- **Alternatives:** Vercel, Cloudflare Pages, GitHub Pages
- **Why selected:** Best default for this portfolio; Forms reduce contact vendors
- **Trade-offs:** Contact provider may change if host changes — architecture stays static SPA

### ADR-008 — SEO

- **Decision:** Semantic HTML + head meta per route + sitemap/robots + JSON-LD Person/WebSite
- **Reason:** Discoverability without SSR complexity at v1
- **Alternatives:** Force Next.js SSR/SSG now
- **Why selected:** Adequate for personal brand site
- **Trade-offs:** If organic search underperforms, reconsider Astro/Next

### ADR-009 — Theme system

- **Decision:** Dark default + optional light; token-based
- **Reason:** Matches brand brief; accessibility via contrast tokens
- **Alternatives:** Dark-only, system-only
- **Why selected:** User control + modern expectation
- **Trade-offs:** Dual-theme QA cost

---

## 15. Executive summary

### Recommended stack

| Area | Choice |
| --- | --- |
| Frontend | React + Vite |
| Styling | Tailwind CSS + CSS variables |
| Language | TypeScript |
| State management | Local React state + Theme Context |
| Animation | CSS + Intersection Observer (library optional later) |
| Form | External contact service (+ suitable fallback, e.g. mailto) |
| Hosting | **Netlify** preferred (portable to Vercel/other static hosts) |
| Analytics | Deferred until specifically required |

### High-level architecture

```
User
  ↓
React/Vite Portfolio Frontend
  ↓
Typed Project Data (src/data/projects/)
  ↓
External Contact Service (only where required)
```

### Major components

Navbar, MobileNav, ThemeToggle, Hero, About, Skills (SkillGroup/SkillCard), Projects (ProjectGrid/ProjectCard/ProjectDetails), DevelopmentApproach, ContactForm, Footer, shared UI (Button, Card, Badge, Input), AppShell/Section/Container.

### Major risks

| Risk | Mitigation |
| --- | --- |
| Missing content blocks launch quality | Content checklist; placeholders only — no invented claims |
| SPA SEO limitations | Strong meta, sitemap, semantic structure; revisit Astro/Next if needed |
| Contact spam | Honeypot + provider protections |
| Scope creep (extra projects/features) | Hard allowlist: AgriNaija + Horticultural Hub only |
| FarmLink naming regressions | Implementation + pre-launch repo-wide rename audit |
| Over-engineering backend | ADR forbids portfolio backend unless requirements change |

### Open questions (content — not architecture blockers)

1. Developer identity content (name, title, bio, photo, socials, CV)
2. Canonical domain
3. Contact form endpoint/keys (prefer Netlify Forms on Netlify)
4. AgriNaija URLs, media, results metrics
5. All Horticultural Hub technical/content fields

### Phase 0 verdict

# ARCHITECTURE APPROVED → READY FOR IMPLEMENTATION

Stakeholder clarifications accepted (see [§16](#16-final-phase-0-approval-clarifications)).

**Implementation boundary**

- Phase 0 is complete and approved.
- **DO NOT START PHASE 1 IMPLEMENTATION YET.**
- Wait for a **separate, explicit Phase 1 implementation prompt** before creating application code or installing implementation dependencies.
- At Phase 1 start, re-inspect the repository and adapt scaffolding to the actual greenfield state under `portfolio/`.

---

## 16. Final Phase 0 approval clarifications

Recorded stakeholder decisions (2026-09-09):

| Decision | Status |
| --- | --- |
| React + Vite | Approved |
| TypeScript | Approved |
| Tailwind CSS + CSS design tokens | Approved |
| Static architecture — no portfolio backend | Approved |
| Typed project data under `src/data/projects/` | Approved |
| External contact service + suitable fallback | Approved |
| AgriNaija naming everywhere | Approved |
| DevHub completely excluded | Approved |
| FarmLink must not appear; rename to AgriNaija during implementation | Approved |
| Initial showcase: AgriNaija + Horticultural Hub only | Approved |
| Extensible for future projects without restructure | Approved |
| Single homepage narrative | Approved |
| `/projects/:slug` case studies | Approved |
| Data-driven project content (not hardcoded in UI) | Approved |
| Reusable components; separate content / UI / data / utilities | Approved |
| Mobile-first, fully responsive | Approved |
| Dark default; light mode if in approved design | Approved |
| Subtle, performance-conscious animation | Approved |
| WCAG 2.1 AA where practical | Approved |
| Proper SEO (meta, semantic HTML, OG, sitemap, robots) | Approved |
| Performance over unnecessary effects/deps | Approved |
| No invented missing facts; TODO/placeholders only | Approved |
| No unnecessary deps / no backend for its own sake | Approved |
| Re-inspect repo at Phase 1; adapt to greenfield state | Approved |
| Netlify preferred; keep portable to Vercel/other static hosts | Approved |
| Analytics deferred | Approved |
| Favour simplicity, maintainability, performance, professional presentation | Approved |

### Project positioning (approved)

- **AgriNaija** — primary/featured project (substantial full-stack marketplace: frontend, API, DB, auth, RBAC, deployment).
- **Horticultural Hub** — second project; placeholders for any technical details not yet supplied.

---

## Document control

| Version | Date | Notes |
| --- | --- | --- |
| 0.1 | 2026-09-09 | Initial Phase 0 architecture from requirements analysis |
| 0.2 | 2026-09-09 | Stakeholder clarifications; status → ARCHITECTURE APPROVED → READY FOR IMPLEMENTATION; Phase 1 hold |
