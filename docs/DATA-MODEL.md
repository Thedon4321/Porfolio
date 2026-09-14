# Project Data Model

**Status:** ARCHITECTURE APPROVED → READY FOR IMPLEMENTATION  
**Related:** [PROJECTS.md](./PROJECTS.md) · [ARCHITECTURE.md](./ARCHITECTURE.md)

---

## 1. Goals

- Keep portfolio projects **data-driven** (not hardcoded in JSX strings scattered across components)
- Support **AgriNaija** and **Horticultural Hub** initially
- Allow adding future projects by appending data modules — **without** including DevHub
- Type fields so missing content is obvious (`TODO` / optional)

---

## 2. Storage approach

| Approach | Decision |
| --- | --- |
| Format | TypeScript modules (`src/data/projects/*.ts`) exporting typed objects |
| Index | `src/data/projects/index.ts` exports `projects[]` and helpers `getProjectBySlug` |
| Runtime source | Bundled at build time (static) |
| CMS | Not required for v1 |

---

## 3. Final schema

```ts
export type ProjectStatus = 'shipped' | 'in-progress' | 'placeholder';

export interface ProjectLink {
  label: string;
  url: string;
  external?: boolean;
}

export interface ProjectArchitectureLayer {
  name: string;
  description?: string;
}

export interface Project {
  /** Stable unique id (string slug-like or uuid) */
  id: string;
  /** URL segment: /^[a-z0-9]+(?:-[a-z0-9]+)*$/ */
  slug: string;
  /** Display name */
  name: string;
  /** One-line card summary */
  description: string;
  /** Longer case-study overview */
  longDescription?: string;
  /** Grouping label for UI filters later (optional in v1) */
  category?: string;
  /** Tech names shown as badges */
  technologies: string[];
  /** Bullet feature list — only verified features */
  features: string[];
  /** Human-readable architecture summary */
  architectureSummary?: string;
  /** Optional layered architecture for diagrams/lists */
  architectureLayers?: ProjectArchitectureLayer[];
  /** Problem statement */
  problem?: string;
  /** Solution statement */
  solution?: string;
  /** Developer role / contribution */
  role?: string;
  /** Deployment notes */
  deployment?: string;
  /** Challenges faced */
  challenges?: string[];
  /** Outcomes / results — no invented metrics */
  results?: string[];
  /** Card / OG image path under public or imported asset */
  image: string;
  /** Optional gallery */
  images?: string[];
  liveUrl?: string;
  githubUrl?: string;
  /** Highlight on homepage */
  featured: boolean;
  /** Sort order ascending */
  order: number;
  status: ProjectStatus;
  /** SEO overrides */
  seoTitle?: string;
  seoDescription?: string;
}
```

### Required fields

| Field | Rule |
| --- | --- |
| `id` | Required, unique |
| `slug` | Required, unique, URL-safe |
| `name` | Required |
| `description` | Required (card) |
| `technologies` | Required array (may be empty **only** if `status === 'placeholder'`) |
| `features` | Required array (may be empty if placeholder) |
| `image` | Required (may point to placeholder asset) |
| `featured` | Required boolean |
| `order` | Required number |
| `status` | Required |

### Optional fields

`longDescription`, `category`, `architectureSummary`, `architectureLayers`, `problem`, `solution`, `role`, `deployment`, `challenges`, `results`, `images`, `liveUrl`, `githubUrl`, `seoTitle`, `seoDescription`.

---

## 4. Validation rules

| Rule | Detail |
| --- | --- |
| Slug uniqueness | Enforced in index helper / unit test |
| Allowed showcase set (v1) | `agrinaija`, `horticultural-hub` only |
| Forbidden names | Any DevHub entity; any FarmLink naming |
| URLs | If present, must be absolute `https://` (or documented relative for internal) |
| Empty optional text | Omit field or use explicit `undefined` — do not invent |
| Placeholder projects | `status: 'placeholder'` + honest UI labelling where needed |
| Featured / order (v1) | AgriNaija: `featured: true`, `order: 1` (primary). Horticultural Hub: `order: 2` (second; placeholders OK) |

**Optional runtime validation:** `zod` schema in `src/data/projects/schema.ts` (dev/test only or assert on import).

---

## 5. Dynamic rendering

```
projects/index.ts
        │
        ├─► Home ProjectGrid
        │     └─ filter featured / sort by order
        │           └─ ProjectCard (description, technologies, image, links)
        │
        └─► Route /projects/:slug
              └─ getProjectBySlug(slug)
                    └─ ProjectDetails maps schema → sections
```

- Unknown slug → Not Found page
- Missing optional sections → skip heading (cleaner than “TODO” in production UI). Keep TODOs in docs/`PROJECTS.md` and optionally in comments in data files during draft.

---

## 6. Adding a project later

1. Create `src/data/projects/my-project.ts` satisfying `Project`
2. Register in `index.ts`
3. Add images under `public/images/projects/my-project/`
4. Verify slug route + card
5. Update sitemap
6. **Do not** add DevHub
7. Run FarmLink string audit if agricultural naming involved

---

## 7. Initial records (non-content)

| id | slug | name | featured / order | status |
| --- | --- | --- | --- | --- |
| `agrinaija` | `agrinaija` | AgriNaija | `featured: true`, `order: 1` | `shipped` or `in-progress` — **TODO — INFORMATION REQUIRED** for final status label |
| `horticultural-hub` | `horticultural-hub` | Horticultural Hub | `order: 2` | `placeholder` until content supplied |

---

## 8. Profile & site companion models

### `profile.ts` (required before polished launch)

```ts
export interface Profile {
  name: string;              // TODO
  title: string;             // TODO
  shortBio: string;          // TODO
  longBio?: string;
  photo: string;             // TODO path
  email: string;             // TODO
  githubUrl?: string;        // TODO
  linkedinUrl?: string;      // TODO
  resumeUrl?: string;        // TODO
  location?: string;         // TODO
  availability?: string;     // TODO
}
```

### `site.ts`

```ts
export interface SiteConfig {
  siteName: string;
  siteUrl: string;           // canonical origin — TODO
  defaultTitle: string;
  defaultDescription: string;
  ogImage: string;
  twitterHandle?: string;    // TODO optional
}
```

---

### `skills.ts`

Grouped skills for the Skills section (ARCHITECTURE.md: Frontend, Backend, Tools, Practices).

```ts
export interface Skill {
  id: string;
  name: string;
}

export interface SkillGroup {
  id: string;
  label: string;
  skills: Skill[]; // may be empty → UI shows TODO placeholder
}
```

**v1 content rule:** Only names verified via allowlisted project `technologies` (currently AgriNaija). Do not invent Tools/Practices entries.

---

### `contact.ts`

Public form field configuration (no secrets). Provider URLs/keys come from Vite env.

```ts
export const contactConfig = {
  formName: 'portfolio-contact',
  fields: {
    name: 'name',
    email: 'email',
    message: 'message',
    honeypot: 'bot-field',
  },
  minMessageLength: 10,
  maxMessageLength: 5000,
};
```

**Env (public only):** `VITE_CONTACT_FORM_ENDPOINT`, `VITE_CONTACT_PROVIDER`, optional `VITE_CONTACT_ACCESS_KEY`.

---

## Document control

| Version | Date | Notes |
| --- | --- | --- |
| 0.1 | 2026-09-09 | Initial data model |
| 0.2 | 2026-09-09 | AgriNaija featured order; approval status |
| 0.3 | 2026-09-13 | Skills model + content sourcing rule |
| 0.4 | 2026-09-13 | Contact config model |
