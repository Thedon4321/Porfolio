# Phase 7 — Contact

**Date:** 2026-09-13  
**Status:** Complete

## Scope

Enquiry channel: validated `ContactForm`, external provider client, honeypot, mailto fallback, and profile-driven social/CV links.

## Delivered

| Item | Detail |
| --- | --- |
| `ContactForm` | Name / email / message + honeypot; idle / submitting / success / error |
| `ContactChannels` | Email / GitHub / LinkedIn / CV only when real profile values exist |
| `Contact` section | Homepage after Projects |
| `src/data/contact.ts` | Form name, field keys, length limits |
| `src/lib/contact.ts` | Provider mode detection, submit helper, mailto builder |
| Env | `.env.example` documents `VITE_CONTACT_*` (no secrets committed) |
| Netlify stub | Hidden form in `index.html` for Forms detection |

## Provider behaviour

| Mode | When | Behaviour |
| --- | --- | --- |
| `endpoint` | `VITE_CONTACT_FORM_ENDPOINT` set (or `VITE_CONTACT_PROVIDER=endpoint`) | `POST` `application/x-www-form-urlencoded` to endpoint; optional public `access_key` |
| `netlify` | `VITE_CONTACT_PROVIDER=netlify` | `POST` to `/` with `form-name=portfolio-contact` |
| `unconfigured` | Default until env set | Form validates; submit returns clear error; mailto fallback if real email exists |

Honeypot (`bot-field`) filled → silent success (no provider call).

## Content / secrets policy

- No invented email, social, CV, or credentials
- Profile email remains `TODO — EMAIL REQUIRED` until supplied → mailto omitted as actionable real address (TODO note shown)
- No private SMTP / API secrets in repo

## Validation

| Check | Result |
| --- | --- |
| `npm run typecheck` | Pass |
| `npm run build` | Pass |

## Deferred

- Live provider smoke test after env is set on the host
- Motion polish (Phase 8)
- CAPTCHA (optional later if spam warrants)
