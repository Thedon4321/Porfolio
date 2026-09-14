# Component Architecture

**Status:** Phase 0 — Documentation  
**Related:** [ARCHITECTURE.md](./ARCHITECTURE.md) · [DESIGN-SYSTEM.md](./DESIGN-SYSTEM.md)

---

## 1. Hierarchy overview

```
Application
├── AppShell (layout)
│   ├── SkipToContent (a11y utility)
│   ├── Navbar
│   │   ├── Logo / Name
│   │   ├── NavLinks
│   │   ├── ThemeToggle
│   │   ├── PrimaryNavCTA
│   │   └── MobileNav (drawer)
│   ├── Main (routes)
│   │   ├── HomePage
│   │   │   ├── Hero
│   │   │   ├── About
│   │   │   ├── Skills
│   │   │   │   ├── SkillGroup
│   │   │   │   └── SkillChip / SkillCard
│   │   │   ├── Projects
│   │   │   │   ├── ProjectGrid
│   │   │   │   └── ProjectCard
│   │   │   ├── DevelopmentApproach
│   │   │   │   └── ApproachStep
│   │   │   └── Contact
│   │   │       ├── ContactForm
│   │   │       └── ContactChannels
│   │   ├── ProjectPage (`/projects/:slug`)
│   │   │   └── ProjectDetails
│   │   └── NotFoundPage
│   └── Footer
└── UI primitives (shared)
    ├── Button
    ├── Card
    ├── Badge
    ├── Input
    ├── Textarea
    ├── Container
    ├── Section
    └── ExternalLink
```

**Excluded:** Any DevHub-specific components or data bindings.

---

## 2. Component categories

### 2.1 Layout components

| Component | Responsibility |
| --- | --- |
| `AppShell` | Global frame: nav + main + footer; applies theme class context |
| `Container` | Max-width + horizontal padding |
| `Section` | Landmark section with `id`, optional eyebrow/title/description slots |
| `SkipToContent` | Skip link targeting `#main` |

### 2.2 Navigation components

| Component | Responsibility |
| --- | --- |
| `Navbar` | Sticky header; desktop links; wires mobile menu |
| `NavLinks` | In-page anchors + active section indication |
| `MobileNav` | Accessible dialog/drawer; focus trap; Esc/overlay close |
| `ThemeToggle` | Dark/light switch; persists preference |
| `PrimaryNavCTA` | Compact Contact button |

### 2.3 Section components

| Component | Responsibility |
| --- | --- |
| `Hero` | Brand signal, headline, short support, CTA group, optional portrait |
| `About` | Bio and positioning copy from profile data |
| `Skills` | Renders skill groups from data |
| `SkillGroup` | Category heading + chips |
| `SkillChip` / `SkillCard` | Individual skill presentation |
| `Projects` | Section wrapper + intro copy |
| `ProjectGrid` | Responsive grid of project cards (AgriNaija, Horticultural Hub only) |
| `ProjectCard` | Summary card linking to details route or modal |
| `ProjectDetails` | Full case study layout from project schema |
| `DevelopmentApproach` | Process narrative |
| `ApproachStep` | Single step (title + text) |
| `Contact` | Section shell for form + channels |
| `ContactForm` | Validated enquiry form |
| `ContactChannels` | Email / GitHub / LinkedIn / CV links |
| `Footer` | Secondary links, social, copyright |

### 2.4 UI primitives

| Component | Responsibility |
| --- | --- |
| `Button` | Variants: primary, secondary, ghost, icon |
| `Card` | Elevated surface primitive for project/info cards |
| `Badge` | Tech/feature chips |
| `Input` / `Textarea` | Accessible labelled fields with error text |
| `ExternalLink` | Safe `target="_blank"` + `rel` defaults |

### 2.5 Utility components / hooks

| Unit | Responsibility |
| --- | --- |
| `useTheme` | Read/set theme |
| `usePrefersReducedMotion` | Motion gating |
| `useActiveSection` | Scroll-spy for nav |
| `cn()` | Class name merge helper |
| `seo/HeadTags` | Per-page title/description/OG tags |

---

## 3. Data → UI mapping

```
profile.ts  → Hero, About, Footer, ContactChannels
skills.ts   → Skills / SkillGroup
approach.ts → DevelopmentApproach
projects/*  → ProjectGrid, ProjectCard, ProjectDetails
site.ts     → SEO defaults, canonical base URL
```

Components must not hardcode project-specific AgriNaija/Horticultural Hub copy except via data modules.

---

## 4. Project details presentation

**Recommended:** Dedicated route `/projects/:slug` using `ProjectDetails`.

Optional enhancement: modal on homepage for quick preview **plus** “Open full case study” link to the route (progressive). If only one pattern ships in v1, prefer the **route** for shareability and SEO.

`ProjectDetails` sections (driven by schema):

1. Overview
2. Problem
3. Solution
4. Features
5. Technology stack
6. Architecture diagram/text
7. Role / contribution
8. Deployment (if present)
9. Challenges / Results (if present)
10. Links (Live / GitHub)

Missing fields render nothing or a discreet “Details coming soon” only when the whole subsection is empty — never invent content.

---

## 5. State ownership

| State | Owner |
| --- | --- |
| Theme | `ThemeProvider` |
| Mobile nav | `Navbar` / `MobileNav` |
| Form fields | `ContactForm` |
| Active section | `useActiveSection` in `Navbar` |
| Project slug | Router |

---

## 6. Composition rules

1. Sections receive data via props or thin containers; keep presentational components pure where practical.
2. No cross-imports between unrelated feature folders; share only through `ui/`, `hooks/`, `lib/`, `data/`.
3. Do not add DevHub cards, filters, or placeholders.
4. Naming in code and UI copy: **AgriNaija** only (never FarmLink variants).

---

## Document control

| Version | Date | Notes |
| --- | --- | --- |
| 0.1 | 2026-09-09 | Initial component architecture |
