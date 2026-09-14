# Design System Architecture

**Status:** Phase 8 implemented — tokens, primitives, and motion language live  
**Related:** [ARCHITECTURE.md](./ARCHITECTURE.md) · [COMPONENTS.md](./COMPONENTS.md) · [ACCESSIBILITY.md](./ACCESSIBILITY.md) · [PHASE-2.md](./PHASE-2.md) · [PHASE-8.md](./PHASE-8.md)

---

## 1. Design principles

1. **Dark-first professional atmosphere** — dark primary surfaces, blue/teal accents, neutral text.
2. **One composition per viewport** — hero is brand + headline + support + CTAs; no dashboard clutter.
3. **Subtle depth** — soft gradients and restrained elevation, not neon glow stacks.
4. **Clarity over decoration** — motion and colour support hierarchy; they never compete with content.
5. **Token-driven** — all colour/type/space decisions flow from CSS variables for dark/light themes.

---

## 2. Colour system

### Brand direction

| Role | Direction |
| --- | --- |
| Primary background | Dark navy/charcoal |
| Accent | Blue → teal spectrum |
| Text | Neutral light grays on dark; dark neutrals on light |
| Gradients | Subtle radial/linear washes behind hero only |

### Recommended tokens (dark default)

Exact hex may be tuned during Phase 2; names are stable.

| Token | Dark value (proposed) | Light value (proposed) | Usage |
| --- | --- | --- | --- |
| `--color-bg` | `#0B1220` | `#F7FAFC` | Page background |
| `--color-bg-elevated` | `#121A2B` | `#FFFFFF` | Cards, nav |
| `--color-bg-muted` | `#182338` | `#E8EEF5` | Skill chips, secondary surfaces |
| `--color-border` | `#243049` | `#D5DEEA` | Dividers, card borders |
| `--color-text` | `#E8EEF7` | `#0F172A` | Primary text |
| `--color-text-muted` | `#9AA8C0` | `#475569` | Secondary text |
| `--color-accent` | `#2DD4BF` (teal) | `#0D9488` | Links, highlights |
| `--color-accent-strong` | `#38BDF8` (blue) | `#0284C7` | Primary button / key CTA |
| `--color-accent-soft` | `rgba(45, 212, 191, 0.12)` | `rgba(13, 148, 136, 0.12)` | Soft fills |
| `--color-danger` | `#F87171` | `#DC2626` | Form errors |
| `--color-success` | `#34D399` | `#059669` | Form success |
| `--color-focus` | `#38BDF8` | `#0284C7` | Focus rings |

### Gradients

- Hero: subtle `radial-gradient` from accent-soft toward `--color-bg`
- Avoid purple-indigo marketing clichés and heavy glow bloom

### Contrast

- Body text vs background: target **WCAG AA** (≥ 4.5:1)
- Large text / UI chrome: ≥ 3:1
- Validate both themes in Phase 9

---

## 3. Typography

### Font recommendation

| Role | Font | Notes |
| --- | --- | --- |
| **Primary UI / body** | **Plus Jakarta Sans** | Distinctive, modern, professional; preferred over Inter |
| **Fallback** | `Plus Jakarta Sans`, `Manrope`, `Segoe UI`, `system-ui`, sans-serif | System fallbacks only after branded font |
| **Monospace (optional)** | `ui-monospace`, `SFMono-Regular`, `Menlo`, monospace | Tech labels / code chips only |

**Considered:** Inter, Manrope, Plus Jakarta Sans  
**Selected:** Plus Jakarta Sans (primary) with Manrope as acceptable alternate if licensing/loading differs.

### Type scale (rem, mobile → desktop)

| Token | Mobile | Desktop | Use |
| --- | --- | --- | --- |
| `--text-xs` | 0.75rem | 0.75rem | Labels, captions |
| `--text-sm` | 0.875rem | 0.875rem | Secondary UI |
| `--text-base` | 1rem | 1rem | Body |
| `--text-lg` | 1.125rem | 1.25rem | Lead paragraphs |
| `--text-xl` | 1.25rem | 1.5rem | Section intros |
| `--text-2xl` | 1.5rem | 1.875rem | Section titles |
| `--text-3xl` | 1.875rem | 2.25rem | Hero name/title support |
| `--text-4xl` | 2.25rem | 3rem | Hero brand/headline |

### Weights

| Weight | Use |
| --- | --- |
| 400 | Body |
| 500 | UI emphasis |
| 600 | Subheads, buttons |
| 700 | Hero / section titles |

### Line height

- Body: 1.6–1.7
- Display: 1.15–1.25
- Max measure for prose: ~65ch

---

## 4. Spacing

### Scale (4px base)

| Token | Value |
| --- | --- |
| `space-1` | 0.25rem (4px) |
| `space-2` | 0.5rem (8px) |
| `space-3` | 0.75rem (12px) |
| `space-4` | 1rem (16px) |
| `space-5` | 1.5rem (24px) |
| `space-6` | 2rem (32px) |
| `space-8` | 3rem (48px) |
| `space-10` | 4rem (64px) |
| `space-12` | 5rem (80px) |
| `space-16` | 7rem (112px) |

### Section rhythm

| Context | Padding (block) |
| --- | --- |
| Mobile sections | `space-10`–`space-12` |
| Desktop sections | `space-12`–`space-16` |
| Container gutter | `space-4` mobile → `space-6`/`space-8` desktop |
| Max content width | `72rem` (≈1152px); prose blocks narrower |

---

## 5. Border radius

| Token | Value | Use |
| --- | --- | --- |
| `radius-sm` | 0.375rem | Inputs, small chips |
| `radius-md` | 0.5rem | Buttons |
| `radius-lg` | 0.75rem | Cards |
| `radius-xl` | 1rem | Large media frames |
| `radius-full` | 9999px | Avatars only — avoid pill-cluster UI patterns |

---

## 6. Shadows (subtle elevation)

| Token | Intention |
| --- | --- |
| `shadow-none` | Flat by default on dark surfaces |
| `shadow-sm` | Slight lift on light theme cards |
| `shadow-md` | Hover elevation for project cards |
| `shadow-focus` | Focus ring companion (prefer outline/ring over heavy shadow) |

Dark theme relies more on **border + background elevation** than deep shadows.

---

## 7. Buttons

| Variant | Visual | Use |
| --- | --- | --- |
| **Primary** | Accent-strong fill, high-contrast text | Contact, primary CTA |
| **Secondary** | Outline / muted fill | Secondary CTA (View Projects) |
| **Ghost** | Transparent, text accent | Navbar links, tertiary actions |
| **Icon** | Square/round hit target ≥ 44×44px | Theme toggle, social, menu |

### Button rules

- Min height 44px for touch
- Visible `:focus-visible` ring using `--color-focus`
- Disabled: reduced opacity + `aria-disabled` / disabled attribute
- Loading: disable double-submit; announce status to SR when used in forms

---

## 8. Cards

| Type | Purpose | Notes |
| --- | --- | --- |
| **Project card** | Entry point to case study | Image/thumbnail, title, short description, tech chips, CTA |
| **Skill card / chip** | Skill signalling | Prefer compact chips/groups over heavy card chrome when possible |
| **Information card** | Approach steps / callouts | Use sparingly; only when interaction or grouping needs a container |

**Default philosophy:** Prefer open layout; use card surfaces when they improve scanning of projects.

---

## 9. Responsive architecture

### Breakpoints (mobile-first)

| Name | Min width | Target |
| --- | --- | --- |
| `xs` | 0 | Phones |
| `sm` | 640px | Large phones |
| `md` | 768px | Tablets |
| `lg` | 1024px | Laptops |
| `xl` | 1280px | Desktops |
| `2xl` | 1536px | Large screens |

### Behaviour matrix

| Concern | Mobile | Tablet | Laptop / Desktop | Large |
| --- | --- | --- | --- | --- |
| **Navigation** | Hamburger + drawer; sticky top | Same or condensed inline | Horizontal links + CTAs | Same, generous spacing |
| **Hero** | Stacked: text → CTA → image | Stacked / mild split | Split text / visual | Constrained width, not ultra-stretched text |
| **Project grid** | 1 col | 2 col | 2 col (only 2 projects) | 2 col max unless more projects later |
| **Typography** | Base scale | Intermediate | Display scale up | Cap max font size; increase whitespace |
| **Sections** | Full-bleed bg, padded container | Same | Same | Optional wider container still capped |
| **Images** | Full width, `aspect-ratio` reserved | Same | Contained in card/media frame | Prevent enormous bitmaps; use srcset |

### Mobile-first rules

- Design smallest complete experience first
- Enhance columns, nav, and type at `md`/`lg`
- Never hide essential CTAs solely on mobile
- Touch targets ≥ 44×44px

---

## 10. Iconography & imagery

- Prefer one consistent icon set (e.g. Lucide), tree-shaken imports
- Project images: real UI screenshots when available; placeholders labelled until assets arrive
- Profile photo: circular or soft-radius; always meaningful `alt`
- No emoji as primary UI ornament

---

## 11. Motion tokens

| Token | Value | Use |
| --- | --- | --- |
| `--duration-fast` | 150ms | Buttons, colour |
| `--duration-normal` | 250ms | Panels, hovers |
| `--duration-slow` | 400ms | Section reveals |
| `--ease-standard` | `cubic-bezier(0.2, 0.8, 0.2, 1)` | Default |
| `--reveal-distance` | `0.75rem` | Section reveal translateY |
| `--hover-lift` | `-0.15rem` | Interactive card lift |

### Reveal pattern (Phase 8)

1. `main.tsx` adds `js-motion` on `<html>` only when motion is allowed
2. Sections use `.reveal`; Intersection Observer adds `.is-visible`
3. CSS hides pending reveals **only** under `.js-motion .reveal:not(.is-visible)`
4. No JS / reduced motion → content remains fully visible

Under `prefers-reduced-motion: reduce`: set durations to `0.01ms`, remove `js-motion`, disable lift transforms.

---

## 12. Implementation notes

- Tokens live in `src/styles/index.css` (`:root` / `html.light` + `@theme inline`)
- Map Tailwind colour/spacing scales to tokens
- Do not hardcode hex in components except inside token files
- Theme class on `<html>` switches token bundles
- Animation library: **not used** (CSS + Intersection Observer)

---

## Document control

| Version | Date | Notes |
| --- | --- | --- |
| 0.1 | 2026-09-09 | Initial design system architecture |
| 0.2 | 2026-09-13 | Phase 2 implemented — tokens, fonts, primitives, `/styleguide` |
| 0.3 | 2026-09-14 | Phase 8 motion language + reveal pattern documented |
