## Ziel
Aus dem aktuellen Prototyp eine vollständige, konsistente Webapp **SoVoice Calendar** bauen – auf Deutsch, Dark SaaS Design, Calendly-ähnlich, mit allen im PDF und Prompt geforderten Modulen. Frontend-only mit klar getrennter Datenstruktur, vorbereitet für späteres Backend (Lovable Cloud / SoVoice API unter `/api/calendar/*`).

## Architektur-Mapping (PDF → App)
- Frontend: React + TS + Vite + Tailwind (vorhanden, TanStack Start statt CRA).
- Datenmodell: `cal_*`-Tabellen aus PDF werden 1:1 als TypeScript-Modelle in `src/lib/sovoice-data.ts` (umstrukturiert) abgebildet – Bookings, EventTypes, Availability, BlockedTimes, Integrations, Notifications, AdminUser, Teams.
- Buchungs-API (`/api/calendar/availability`, `/bookings`, `/slots`) wird als Service-Layer (`src/lib/calendar-service.ts`) gemockt, mit gleicher Signatur, damit später echte Endpunkte greifen.
- Buchungslogik (Pufferzeiten, Mindestvorlauf, Max/Tag, blockierte Zeiten) wird im Service korrekt implementiert.

## Seiten- & Routenstruktur (TanStack file-based)

```text
src/routes/
  __root.tsx
  index.tsx                     Landing
  events.tsx                    Event-Typen-Übersicht (öffentlich)
  book.$eventSlug.tsx           Buchungsseite (Kalender + Slots + Formular)
  book.confirmed.tsx            Bestätigung
  reschedule.$token.tsx         Verschieben via Token
  cancel.$token.tsx             Stornieren via Token
  datenschutz.tsx
  impressum.tsx

  admin.tsx                     Admin-Layout (Sidebar + Topbar, <Outlet/>)
  admin.index.tsx               Dashboard mit Stats + Tabelle
  admin.appointments.tsx        Termine, Filter, Aktionen
  admin.appointments.$id.tsx    Termin-Detail (Drawer/Modal-Route)
  admin.event-types.tsx         Liste + Create/Edit
  admin.availability.tsx        Wochentage/Pufferzeiten/Ausnahmen
  admin.integrations.tsx        Integrationskarten
  admin.analytics.tsx           Booking-Stats, Heatmap, Conversion
  admin.settings.tsx            Profil, Branding, Domain, Benachrichtigungen, Team
```

## Komponenten (neu / überarbeitet)
- `PublicLayout`, `AdminLayout` (mit Sidebar+Topbar, mobile Drawer).
- `BookingCalendar` (Monatsansicht, verfügbare/deaktivierte Tage), `TimeSlots` (Status-States).
- `EventTypeCard`, `StatCard`, `StatusBadge`, `DataTable` (mit Filter/Suchen), `Drawer/Modal`.
- `BookingForm` mit Zod-Validierung (E-Mail, Telefon, Pflichtfelder, Datenschutz-Checkbox).
- `EmptyState`, `LoadingState`, `ErrorState`, `SuccessState`, `Toast` (sonner vorhanden).
- Branchen-Dropdown, Industry-Select, ICS-Download-Helper (`src/lib/ics.ts`).

## Datenmodell (Frontend)
`src/lib/types.ts`:
- `Booking` (alle Felder aus Prompt + `rescheduleToken`, `cancelToken`).
- `EventType` (slug, color, durationMinutes, benefits[], isActive, questions[]).
- `Availability` (weekday 0–6, start/end, breaks[], buffer, minNoticeHours, maxPerDay, timezone).
- `Integration`, `Notification`, `AdminUser`.

Mock-Persistenz via `localStorage` in `src/lib/storage.ts` (Bookings/Settings überleben Reloads, Admin sieht Live-Buchungen).

## Buchungslogik (im Service)
1. `getAvailableSlots(eventType, date)` → kombiniert Availability + bestehende Bookings + Buffer + MinNotice + MaxPerDay.
2. `createBooking(payload)` → Validierung, Slot-Recheck, Token-Generierung, Notification-Stub.
3. `rescheduleBooking(token, newSlot)`, `cancelBooking(token, reason)`.

## Design
- Bestehendes Dark-Theme + Glassmorphism beibehalten und konsistenter machen (alle Seiten nutzen dieselben Tokens, Cards, Spacings).
- Landing leicht straffen (Hero + CTA + Event-Typen + Vorteile + Branchen + Trust + Footer).
- Admin: echte Sidebar (shadcn-Sidebar) mit aktivem Routen-Highlight, Topbar mit Suche.
- Vollständig responsive (Tabellen → Cards auf Mobile, Sticky CTA).

## Inhalte
- Alle Texte deutsch (keine Lorem Ipsum, keine englischen Platzhalter).
- Event-Typen exakt wie im Prompt (Demo Call 30, Erstberatung 45, Onboarding 60, Technische Integration 45, Rückruf 15).
- Branchen-Liste exakt wie im Prompt.

## Nicht im Scope (bewusst ausgelassen)
- Echtes Backend, echte E-Mail/SMS, OAuth, Auth-Flows, Zahlungs-Tiers, Team-Verwaltung mit echten Rollen. Strukturen sind vorhanden und mit Mock befüllt, damit später Lovable Cloud angedockt werden kann (wird in einem Folge-Schritt vorgeschlagen).

## Umsetzungsschritte
1. `src/lib/types.ts`, `src/lib/storage.ts`, `src/lib/calendar-service.ts`, `src/lib/ics.ts` anlegen; `sovoice-data.ts` zu Seed-Daten umbauen.
2. `PublicLayout`/`AdminLayout` überarbeiten, `BookingCalendar`/`TimeSlots` an Service binden.
3. Öffentliche Routen neu/aufgeräumt: Landing, `events`, `book/$eventSlug`, `book/confirmed`, `reschedule/$token`, `cancel/$token`.
4. Admin-Routen ausbauen: Dashboard, Appointments (Filter+Detail), Event-Types (CRUD-UI), Availability (Editor), Integrations, Analytics, Settings (Tabs).
5. UI-States, Toasts, Empty/Loading/Error überall einheitlich.
6. Responsive-Pass + Build-Verifikation.

## Offene Annahmen
- Mock-Daten via `localStorage` ist akzeptabel; sobald gewünscht, schalten wir Lovable Cloud frei und migrieren Service-Layer auf echte Tabellen + Auth.
- Designstil bleibt beim aktuellen Dark/Cyan/Violett-System, wird nur konsistent durchgezogen.
