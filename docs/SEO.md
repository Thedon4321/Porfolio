# SEO Architecture

**Status:** Phase 9 implemented — head manager, JSON-LD, robots/sitemap scaffolding  
**Related:** [ARCHITECTURE.md](./ARCHITECTURE.md) · [PERFORMANCE.md](./PERFORMANCE.md) · [PHASE-9.md](./PHASE-9.md)

---

## 1. Goals

- Help recruiters and clients discover the developer via relevant search queries
- Ensure shared links (LinkedIn, Twitter/X, Slack) render professional previews
- Avoid keyword stuffing and false claims
- Support homepage + project case-study URLs

**Excluded keywords / entities:** DevHub, FarmLink (any variant)

---

## 2. Primary metadata

> Final strings depend on developer name/domain — mark TODOs until supplied.

### Homepage

| Tag | Guidance | Status |
| --- | --- | --- |
| `<title>` | `{Name} | Full-Stack Developer` (≤ ~60 chars) | TODO — INFORMATION REQUIRED |
| Meta description | 150–160 chars: role + value + CTA signal | TODO — INFORMATION REQUIRED |
| Canonical | `https://{domain}/` | TODO — domain |

### Project pages

| Tag | Guidance |
| --- | --- |
| Title | `{ProjectName} | {DeveloperName}` |
| Description | From `seoDescription` or truncated `description` |
| Canonical | `https://{domain}/projects/{slug}` |

---

## 3. Open Graph

| Property | Value |
| --- | --- |
| `og:type` | `website` (home), `article` optional for case studies |
| `og:title` | Align with page title |
| `og:description` | Align with meta description |
| `og:url` | Canonical URL |
| `og:image` | Absolute URL to `og-image.png` or project image (≥1200×630 recommended) |
| `og:site_name` | Portfolio / developer name |

---

## 4. Twitter / X

| Meta | Value |
| --- | --- |
| `twitter:card` | `summary_large_image` |
| `twitter:title` | Same as OG title |
| `twitter:description` | Same as OG description |
| `twitter:image` | Same as OG image |
| `twitter:creator` | TODO — INFORMATION REQUIRED (optional) |

---

## 5. Canonical URL

- Single canonical per indexable URL
- `siteUrl` from `src/data/site.ts`
- Prevent duplicate content from trailing slashes / preview URLs via host redirects where possible

---

## 6. Structured data (JSON-LD)

### Person (homepage)

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "TODO",
  "url": "TODO",
  "jobTitle": "TODO",
  "sameAs": ["GitHub URL", "LinkedIn URL"]
}
```

### WebSite (homepage)

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "TODO",
  "url": "TODO"
}
```

### CreativeWork / SoftwareApplication (optional per project)

Only with verified names/descriptions — no invented ratings.

---

## 7. Sitemap & robots

### `robots.txt`

```
User-agent: *
Allow: /

Sitemap: https://{domain}/sitemap.xml
```

### `sitemap.xml`

Include at minimum:

- `/`
- `/projects/agrinaija`
- `/projects/horticultural-hub`

Update on each new **allowed** project. Do not include DevHub.

Generation: static file in `public/` or Vite plugin during build.

---

## 8. Semantic HTML & heading hierarchy

| Rule | Implementation |
| --- | --- |
| One `h1` per page | Home: name/role; Project: project name |
| Logical `h2`/`h3` | Section titles → subsections |
| Landmarks | `header`, `nav`, `main`, `footer`, section labels |
| Links | Descriptive text (avoid “click here”) |
| Images | Meaningful `alt`; decorative → empty `alt` |

---

## 9. Keyword strategy (natural language)

Use naturally in bio/titles where accurate:

- Full-Stack Developer
- Software Developer
- React Developer
- Node.js Developer
- JavaScript Developer
- Web Developer
- Nigerian Software Developer (only if accurate/desired)
- Freelance Software Developer (only if offering freelance)

**Do not** stuff meta tags with comma-separated keyword lists. Prefer readable sentences.

Project-specific terms: AgriNaija, agricultural marketplace, Horticultural Hub (when defined).

---

## 10. SPA considerations

| Risk | Mitigation |
| --- | --- |
| Client-only meta | Use head manager; verify with “view-source” / prerender checks |
| Crawl of `/projects/:slug` | Host SPA fallback + sitemap; consider prerender later if needed |
| Slow JS | Progressive content in HTML shell where practical |

If organic SEO becomes critical, revisit Astro/Next SSG (see ADR-001/008).

---

## 11. Pre-launch SEO checklist

- [x] Unique titles/descriptions for home + both projects (TODO fallbacks until profile/project SEO fields supplied)
- [ ] Canonical domain configured (`VITE_SITE_URL` required at build/runtime)
- [x] OG image present (`/images/og-placeholder.svg`; absolute when origin set)
- [x] robots.txt + sitemap scaffolding live (absolute locs when `VITE_SITE_URL` set)
- [x] JSON-LD emitted for home + projects (validate in Rich Results after real identity content)
- [x] No FarmLink / DevHub product entries in `src/`
- [x] Heading hierarchy: one `h1` per view via existing sections
- [ ] 404 page returns proper status if host supports it (SPA fallback still 200)

---

## Document control

| Version | Date | Notes |
| --- | --- | --- |
| 0.1 | 2026-09-09 | Initial SEO architecture |
| 0.2 | 2026-09-14 | Phase 9 head manager + robots/sitemap plugin |
