// Seed-Daten für SoVoice Calendar (Mock; später durch Backend ersetzbar)
import type { EventType, AvailabilitySettings, Integration, AdminUser } from "./types";

export const EVENT_TYPES: EventType[] = [
  {
    id: "demo",
    slug: "sovoice-demo-call",
    title: "SoVoice Demo Call",
    durationMinutes: 30,
    description: "Live Demo des KI Telefonagenten und Analyse deines Telefonprozesses.",
    color: "from-[#3b82f6] to-[#1e40af]",
    isActive: true,
    meetingType: "Google Meet",
    benefits: [
      "Live Demo des KI Telefonagenten",
      "Analyse deines aktuellen Telefonprozesses",
      "Einschätzung zum Automatisierungspotenzial",
      "Nächste Schritte für die Integration",
    ],
  },
  {
    id: "beratung",
    slug: "erstberatung",
    title: "Erstberatung",
    durationMinutes: 45,
    description: "Unverbindliches Erstgespräch zu Automatisierungspotenzial in deinem Betrieb.",
    color: "from-[#22d3ee] to-[#0891b2]",
    isActive: true,
    meetingType: "Google Meet",
    benefits: [
      "Analyse deiner aktuellen Telefonsituation",
      "Use Cases für KI Telefonie",
      "Individuelle Roadmap",
      "Transparente Kostenübersicht",
    ],
  },
  {
    id: "onboarding",
    slug: "onboarding-call",
    title: "Onboarding Call",
    durationMinutes: 60,
    description: "Einrichtung deines KI Telefonagenten, Konfiguration und Go-Live.",
    color: "from-[#8b5cf6] to-[#6d28d9]",
    isActive: true,
    meetingType: "Google Meet",
    benefits: [
      "Konfiguration deines KI Agenten",
      "Einbindung von CRM und Kalender",
      "Testanrufe und Feinabstimmung",
      "Go-Live Plan",
    ],
  },
  {
    id: "integration",
    slug: "technische-integration",
    title: "Technische Integration",
    durationMinutes: 45,
    description: "CRM- und Kalender-Anbindung gemeinsam mit dem Tech-Team einrichten.",
    color: "from-[#34d399] to-[#059669]",
    isActive: true,
    meetingType: "Google Meet",
    benefits: [
      "API & Webhook Setup",
      "CRM Mapping",
      "Kalender Synchronisation",
      "Datenschutz & Security Check",
    ],
  },
  {
    id: "rueckruf",
    slug: "rueckruftermin",
    title: "Rückruftermin",
    durationMinutes: 15,
    description: "Kurzer Rückruf zu offenen Fragen rund um SoVoice.",
    color: "from-[#fbbf24] to-[#d97706]",
    isActive: true,
    meetingType: "Telefon",
    benefits: ["Kurze, fokussierte Antworten", "Keine Verkaufsabsicht", "Persönlicher Kontakt"],
  },
];

export const INDUSTRIES = [
  "Arztpraxis / Medizin",
  "Garage / Autohaus",
  "Fitnessstudio",
  "Bildungsanbieter",
  "Kanzlei",
  "Versicherung / Broker",
  "Handwerk",
  "Immobilien",
  "Reinigung / Umzug",
  "Andere Branche",
];

export const DEFAULT_AVAILABILITY: AvailabilitySettings = {
  rules: [
    { weekday: 1, isActive: true, startTime: "09:00", endTime: "17:30", breaks: [{ start: "12:00", end: "13:00" }] },
    { weekday: 2, isActive: true, startTime: "09:00", endTime: "17:30", breaks: [{ start: "12:00", end: "13:00" }] },
    { weekday: 3, isActive: true, startTime: "09:00", endTime: "17:30", breaks: [{ start: "12:00", end: "13:00" }] },
    { weekday: 4, isActive: true, startTime: "09:00", endTime: "17:30", breaks: [{ start: "12:00", end: "13:00" }] },
    { weekday: 5, isActive: true, startTime: "09:00", endTime: "16:30", breaks: [{ start: "12:00", end: "13:00" }] },
    { weekday: 6, isActive: false, startTime: "09:00", endTime: "13:00", breaks: [] },
    { weekday: 0, isActive: false, startTime: "09:00", endTime: "13:00", breaks: [] },
  ],
  bufferMinutes: 15,
  minimumNoticeHours: 4,
  maxBookingsPerDay: 6,
  timezone: "Europe/Zurich",
  blockedDates: [],
};

export const INTEGRATIONS: Integration[] = [
  { id: "gcal", name: "Google Calendar", provider: "Google", description: "Synchronisiere Termine automatisch mit deinem Google Kalender.", status: "Verbunden", category: "Kalender" },
  { id: "outlook", name: "Outlook Calendar", provider: "Microsoft", description: "Outlook & Microsoft 365 Kalender Sync.", status: "Nicht verbunden", category: "Kalender" },
  { id: "icloud", name: "Apple iCloud", provider: "Apple", description: "iCloud Kalender via .ics Feed abonnieren.", status: "Nicht verbunden", category: "Kalender" },
  { id: "gmeet", name: "Google Meet", provider: "Google", description: "Automatische Meeting-Links bei Buchung.", status: "Verbunden", category: "Meeting" },
  { id: "zoom", name: "Zoom", provider: "Zoom", description: "Zoom Meetings automatisch erstellen.", status: "Einrichtung erforderlich", category: "Meeting" },
  { id: "teams", name: "Microsoft Teams", provider: "Microsoft", description: "Teams Meeting Links automatisch generieren.", status: "Nicht verbunden", category: "Meeting" },
  { id: "hubspot", name: "HubSpot CRM", provider: "HubSpot", description: "Leads als Kontakte synchronisieren.", status: "Fehler", category: "CRM" },
  { id: "zapier", name: "Zapier", provider: "Zapier", description: "Verbinde SoVoice Calendar mit 6000+ Apps.", status: "Nicht verbunden", category: "Automation" },
  { id: "webhook", name: "Webhook", provider: "Custom", description: "Eigene Webhook-Endpunkte für Buchungs-Events.", status: "Verbunden", category: "Automation" },
  { id: "sendgrid", name: "E Mail Benachrichtigungen", provider: "SendGrid", description: "Versand von Bestätigungen, Erinnerungen und Storno-Mails.", status: "Verbunden", category: "Benachrichtigung" },
  { id: "twilio", name: "SMS Benachrichtigungen", provider: "Twilio", description: "SMS Erinnerungen 1 Stunde vor dem Termin.", status: "Nicht verbunden", category: "Benachrichtigung" },
];

export const ADMIN_USERS: AdminUser[] = [
  { id: "u1", name: "Sina Vogel", email: "sina@sovoice.ch", role: "Admin" },
  { id: "u2", name: "Marc Beyeler", email: "marc@sovoice.ch", role: "Member" },
];

// Statische Seed-Buchungen (werden im Service mit gespeicherten Buchungen zusammengeführt)
export const SEED_APPOINTMENTS = [
  { id: "a1", name: "Markus Weber", company: "Weber Garage AG", industry: "Garage / Autohaus", time: "2026-06-23T10:00", event: "SoVoice Demo Call", status: "Bestätigt" as const, notes: "Erstkontakt über LinkedIn" },
  { id: "a2", name: "Dr. Anna Keller", company: "Praxis Keller", industry: "Arztpraxis / Medizin", time: "2026-06-23T13:30", event: "Erstberatung", status: "Bestätigt" as const, notes: "Interessiert an Anrufweiterleitung" },
  { id: "a3", name: "Lukas Brunner", company: "FitZone Studios", industry: "Fitnessstudio", time: "2026-06-24T11:00", event: "Onboarding Call", status: "Offen" as const, notes: "" },
  { id: "a4", name: "Sarah Meier", company: "Meier & Partner", industry: "Kanzlei", time: "2026-06-24T14:00", event: "Technische Integration", status: "Bestätigt" as const, notes: "CRM Anbindung HubSpot" },
  { id: "a5", name: "Thomas Huber", company: "Huber Versicherungen", industry: "Versicherung / Broker", time: "2026-06-25T09:30", event: "SoVoice Demo Call", status: "Verschoben" as const, notes: "Termin verschoben auf 28.06." },
  { id: "a6", name: "Julia Frei", company: "Frei Immobilien", industry: "Immobilien", time: "2026-06-25T15:00", event: "Rückruftermin", status: "Bestätigt" as const, notes: "" },
  { id: "a7", name: "Peter Schmid", company: "Schmid Schreinerei", industry: "Handwerk", time: "2026-06-22T16:00", event: "Erstberatung", status: "Abgeschlossen" as const, notes: "Follow-Up nächste Woche" },
  { id: "a8", name: "Nina Roth", company: "CleanFast GmbH", industry: "Reinigung / Umzug", time: "2026-06-22T11:30", event: "SoVoice Demo Call", status: "Storniert" as const, notes: "" },
];

// Kompatibilität mit bestehenden Admin-Seiten
export const APPOINTMENTS = SEED_APPOINTMENTS;

export const TIME_SLOTS = [
  "09:00","09:30","10:00","10:30","11:00","11:30",
  "13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30",
];

export function statusColor(s: string) {
  switch (s) {
    case "Bestätigt": return "bg-[rgba(52,211,153,0.12)] text-[#34d399] border-[rgba(52,211,153,0.25)]";
    case "Offen": return "bg-[rgba(251,191,36,0.12)] text-[#fbbf24] border-[rgba(251,191,36,0.25)]";
    case "Verschoben": return "bg-[rgba(139,92,246,0.12)] text-[#a78bfa] border-[rgba(139,92,246,0.25)]";
    case "Storniert": return "bg-[rgba(248,113,113,0.12)] text-[#f87171] border-[rgba(248,113,113,0.25)]";
    case "Abgeschlossen": return "bg-[rgba(148,163,220,0.12)] text-[#9aa3c7] border-[rgba(148,163,220,0.25)]";
    default: return "bg-white/5 text-white border-white/10";
  }
}
