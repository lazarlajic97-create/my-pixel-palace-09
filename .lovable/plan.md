# SoVoice Scheduling App

A German-language AI-powered appointment scheduling app ("SoVoice") built from the 15 provided HTML mockups. It has two surfaces:

1. **Public/customer flow** — landing page, choose a slot, enter details, confirmation, manage/reschedule/cancel an existing booking.
2. **Admin panel** — dashboard, appointment list, plus a dedicated mobile admin view.

The plan ports the existing HTML/Tailwind designs into a TanStack Start + React + Tailwind v4 app, preserving the Material-style design system (Material Symbols icons, custom typography tokens like `font-display-sm`, `font-headline-md`, color tokens like `primary`, `on-surface`, `surface-variant`).

## Routes

Following TanStack Start file-based routing under `src/routes/`:

- `index.tsx` → Landing page (file 7)
- `book.tsx` → Step 1: pick date/time (files 8, 13)
- `book.details.tsx` → Step 2: enter details (files 5, 11)
- `book.confirmed.tsx` → Step 3: confirmation (files 6, 10)
- `manage.tsx` → Manage existing appointment (files 1, 9)
- `admin.tsx` → Admin layout w/ sidebar + `<Outlet />`
  - `admin.index.tsx` → Dashboard (file 2)
  - `admin.appointments.tsx` → Appointments table (files 3, 4)
- `admin-mobile.tsx` → Mobile admin dashboard (file 12)

(Files 14/15 are tiny fragments — folded into shared header/footer.)

Each route gets its own `head()` with German title + description; no shared metadata copy-paste.

## Design system

Port the Material 3-inspired tokens from the HTML `<style>` blocks into `src/styles.css`:

- Color tokens: `--primary`, `--on-primary`, `--primary-container`, `--on-primary-container`, `--secondary`, `--surface`, `--surface-variant`, `--on-surface`, `--on-surface-variant`, `--background`, `--outline`, `--error`, plus dark equivalents.
- Typography scale: `--font-display-sm`, `--font-headline-lg`, `--font-headline-md`, `--font-headline-lg-mobile`, `--font-body-lg/md`, `--font-label-md`, registered in `@theme inline` so `text-display-sm`, `font-headline-md` etc. work as utilities.
- Spacing tokens: `xs`/`sm`/`md`/`lg`/`xl` mapped to padding/margin utilities.
- Load Material Symbols + the primary font (looks like Google Sans / Inter / similar) via `<link>` in `__root.tsx` head (not `@import` in CSS — Tailwind v4 Lightning CSS constraint).
- Reusable shadcn components stay available, but the booking/admin UI is built from semantic tokens to match the mockups exactly.

## Shared components

- `src/components/SiteHeader.tsx` — public top bar with SoVoice wordmark.
- `src/components/SiteFooter.tsx` — Impressum / Datenschutz / Kontakt.
- `src/components/AdminSidebar.tsx` — desktop admin nav (Dashboard, Termine, Integrationen, Einstellungen, Support, Logout).
- `src/components/AdminMobileNav.tsx` — tab bar for `admin-mobile`.
- `src/components/MaterialIcon.tsx` — small wrapper around `<span class="material-symbols-outlined">` with optional `filled` / `weight` props.
- `src/components/BookingStepper.tsx` — "Schritt X von 3" indicator used across booking screens.

## Data

All content is static/mocked for now — appointments, time slots, dashboard stats, and the mobile lead list are hard-coded mock arrays in `src/data/mock.ts`. No backend, no auth. Forms are visual (preventDefault + toast) so the flow is fully clickable end-to-end.

Hotlink the existing image URLs straight from the HTML (avatars, hero illustration) instead of re-hosting.

## Implementation order

1. Add design tokens + Material Symbols/font links; verify utilities render.
2. Build shared header/footer/sidebar/icon primitives.
3. Public flow: landing → book → details → confirmed.
4. Manage/reschedule/cancel screen.
5. Admin desktop: layout + dashboard + appointments list.
6. Admin mobile screen.
7. Wire `<Link>` navigation between screens (CTA buttons on landing → `/book`, "Verschieben" on confirmation → `/manage`, etc.).
8. Per-route `head()` metadata.

## Out of scope (ask if you want it)

- Real backend (Lovable Cloud / DB / auth) — booking is currently mock-only.
- Real calendar integrations (Google/Zoom).
- i18n toggle — UI stays German as in the mockups.
- Light/dark mode toggle (tokens are defined but no switcher).
