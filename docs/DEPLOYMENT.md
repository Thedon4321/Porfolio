# Deployment Architecture

**Status:** ARCHITECTURE APPROVED → READY FOR IMPLEMENTATION  
**Related:** [ARCHITECTURE.md](./ARCHITECTURE.md) · [PERFORMANCE.md](./PERFORMANCE.md)

---

## 1. Recommended flow

```
GitHub repository
      ↓
Build (Vite)
      ↓
Hosting platform (CDN + HTTPS)
      ↓
Production (custom domain)
```

Preview deployments on pull requests where supported.

---

## 2. Hosting recommendation

| Platform | Fit | Notes |
| --- | --- | --- |
| **Netlify** | **Strong default** | Excellent static hosting, SPA redirects, **Netlify Forms** pairs with Contact ADR |
| **Vercel** | Strong alternative | Excellent Vite support; pair contact with Web3Forms/Formspree |
| Cloudflare Pages | Strong | Great CDN; contact via third-party |
| GitHub Pages | Acceptable | Fewer form/header conveniences |

**Approved preference:** **Netlify** is the preferred deployment target. Keep the app portable enough to deploy to **Vercel** or another static host without architectural change (standard Vite `dist` output + SPA fallback).

**Contact pairing:** Prefer **Netlify Forms** on Netlify; if hosted elsewhere, use an equivalent external form service. Endpoint/keys = **TODO — INFORMATION REQUIRED** at implementation.

### Why these platforms

- Zero/low cost for portfolio traffic
- Automatic HTTPS
- Git-integrated deploys
- Preview URLs for QA
- Easy SPA fallback routing
- Netlify Forms reduces need for a separate contact vendor when on Netlify

---

## 3. Build configuration

| Item | Value |
| --- | --- |
| Install | `npm ci` (or `npm install`) |
| Build command | `npm run build` |
| Output directory | `dist` (Vite default) |
| Node version | LTS (pin in `.nvmrc` or host setting) |

### SPA fallback

Redirect all non-file routes to `index.html` (Netlify `_redirects` or `netlify.toml`; Vercel `rewrites`).

Example Netlify:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## 4. Environment variables

| Variable | Public? | Purpose |
| --- | --- | --- |
| `VITE_CONTACT_ENDPOINT` or provider key designed for client | Public | Form submission |
| `VITE_SITE_URL` | Public | Canonical / OG absolute URLs |
| SMTP / private mail API keys | **Never in frontend** | Only in serverless if Option C adopted |

Commit `.env.example` with empty placeholders. Never commit `.env`.

---

## 5. Custom domain & HTTPS

- Attach custom domain at host dashboard
- Force HTTPS
- Apex + `www` redirect policy (choose one canonical)
- Update `siteUrl` in data config to match

Domain: TODO — INFORMATION REQUIRED

---

## 6. Deployment workflow

| Event | Action |
| --- | --- |
| Push/merge to `main` | Production deploy |
| Pull request | Preview deploy |
| Tag/release | Optional manual promotion (usually unnecessary) |

### Suggested checks before production

- Build succeeds
- Preview link smoke-tested
- Env vars present
- Forms deliver test email
- robots/sitemap reachable
- No FarmLink/DevHub strings

---

## 7. Headers (recommended)

Configure at host:

- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` minimal
- CSP baseline (start report-only if needed)

---

## 8. Rollback

- Host dashboard rollback to prior deploy
- Or revert git commit on `main` and redeploy

---

## Document control

| Version | Date | Notes |
| --- | --- | --- |
| 0.1 | 2026-09-09 | Initial deployment architecture |
| 0.2 | 2026-09-09 | Netlify confirmed as preferred; portability retained |
