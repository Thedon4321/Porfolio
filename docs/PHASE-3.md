# Phase 3 — Core layout

**Date:** 2026-09-13  
**Status:** Complete

## Scope

Global chrome: sticky navbar, accessible mobile drawer, theme toggle, footer, skip link — without finishing marketing section content.

## Delivered

| Item | Detail |
| --- | --- |
| `NavLinks` | Shared primary anchors |
| `ThemeToggle` | Dark/light with persistence (existing theme hook) |
| `PrimaryNavCTA` | Compact Contact CTA |
| `MobileNav` | Right drawer, overlay, Esc close, focus trap, body scroll lock, restore focus |
| `Navbar` | Desktop links + CTA; mobile hamburger |
| `Footer` | Secondary nav + style-guide link |
| `SkipToContent` | Contrast via `--color-on-accent-strong` |

## Validation

| Check | Result |
| --- | --- |
| `npm run typecheck` | Pass |
| `npm run build` | Pass |

## Deferred

- Scroll-spy active section indication (nice-to-have)
- Full Hero / About composition (Phase 4)
