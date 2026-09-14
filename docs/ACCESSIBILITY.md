# Accessibility Architecture

**Status:** Phase 9 practical a11y behaviours implemented (focus routing, form/nav patterns)  
**Target:** WCAG 2.1 Level AA where practical  
**Related:** [DESIGN-SYSTEM.md](./DESIGN-SYSTEM.md) · [COMPONENTS.md](./COMPONENTS.md) · [TESTING.md](./TESTING.md) · [PHASE-9.md](./PHASE-9.md)

---

## 1. Principles

1. Perceivable — contrast, text alternatives, adaptable layout
2. Operable — keyboard, focus, no seizure-inducing motion
3. Understandable — clear labels, predictable nav, error messaging
4. Robust — valid semantics, ARIA only when needed

---

## 2. Keyboard navigation

| Requirement | Detail |
| --- | --- |
| Tab order | Logical DOM order matching visual order |
| Skip link | “Skip to main content” visible on focus |
| Navbar | All links/buttons reachable |
| Mobile nav | Trap focus while open; restore focus on close; Esc closes |
| Project details | Reachable via links; no hover-only actions |
| Contact form | Tab through fields, submit, and error recovery |

No keyboard traps outside intentional modal/drawer patterns.

---

## 3. Screen readers

- Use semantic elements before ARIA
- Provide `aria-label` / `aria-labelledby` for icon-only controls (theme, menu, social)
- Announce form errors via `aria-describedby` + `aria-invalid`
- Live region for form success/error summaries (`aria-live="polite"`)
- Decorative icons: `aria-hidden="true"`

---

## 4. Focus management

| Scenario | Behaviour |
| --- | --- |
| Route change to project page | Move focus to main heading (`h1`) or `main` |
| Open mobile nav | Focus first interactive element / close control |
| Close mobile nav | Return focus to menu button |
| Form error on submit | Focus first invalid field |

`:focus-visible` styles mandatory; do not remove outlines without replacement.

---

## 5. Colour contrast

- Text vs background ≥ 4.5:1 (normal text)
- Large text ≥ 3:1
- UI components / graphics ≥ 3:1 against adjacent colours
- Do not convey meaning by colour alone (errors need text/icons)
- Validate **dark and light** themes

---

## 6. Form accessibility

| Control | Requirement |
| --- | --- |
| Labels | Visible `<label htmlFor>` for every input |
| Required | `required` + textual indicator |
| Errors | Clear text, associated via `aria-describedby` |
| Honeypot | Visually hidden but not using `display:none` tricks that break AT unexpectedly — use `aria-hidden` + tabindex=-1 + autocomplete off pattern documented at implementation |
| Autocomplete | Appropriate tokens (`email`, `name`) |

---

## 7. Semantic HTML

- One `h1` per view
- Lists for skills/features where appropriate
- Buttons for actions; anchors for navigation
- `main`, `nav`, `header`, `footer` landmarks

---

## 8. Images & media

| Asset | Alt text |
| --- | --- |
| Profile photo | Concise identity description |
| Project screenshots | Describe what UI shows, not “image” |
| Decorative backgrounds | Empty `alt` or CSS background |
| Icons adjacent to text | Hide icon from AT |

---

## 9. Reduced motion

```css
@media (prefers-reduced-motion: reduce) {
  /* disable non-essential transitions/animations */
}
```

JS reveals must no-op or show content immediately when reduced motion is preferred.

---

## 10. Accessible navigation

- Current section indicated visually **and** with `aria-current` where applicable
- Mobile menu button: `aria-expanded`, `aria-controls`
- Drawer: `role="dialog"` or appropriate disclosure pattern with labelling

---

## 11. Accessible project details / modal

If modal used:

- `role="dialog"`, `aria-modal="true"`, labelled by title
- Focus trap + Esc
- Return focus to opener

Prefer routed page for primary case study to simplify a11y.

---

## 12. Tooling (Phase 9/10)

- axe DevTools / Lighthouse Accessibility
- Keyboard-only walkthrough
- Screen reader spot-check (NVDA or VoiceOver)
- eslint-plugin-jsx-a11y during development

---

## Document control

| Version | Date | Notes |
| --- | --- | --- |
| 0.1 | 2026-09-09 | Initial a11y architecture |
