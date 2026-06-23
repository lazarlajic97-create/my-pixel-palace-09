export const EVENT_TYPES = [
  { id: "demo", title: "SoVoice Demo Call", duration: 30, description: "Live Demo des KI Telefonagenten und Analyse deines Telefonprozesses.", color: "from-[#3b82f6] to-[#1e40af]" },
  { id: "beratung", title: "Erstberatung", duration: 45, description: "Unverbindliches Erstgespräch zu Automatisierungspotenzial.", color: "from-[#22d3ee] to-[#0891b2]" },
  { id: "onboarding", title: "Onboarding Call", duration: 60, description: "Einrichtung deines KI Telefonagenten und Konfiguration.", color: "from-[#8b5cf6] to-[#6d28d9]" },
  { id: "integration", title: "Technische Integration", duration: 45, description: "CRM und Kalender Anbindung gemeinsam einrichten.", color: "from-[#34d399] to-[#059669]" },
  { id: "rueckruf", title: "Rückruftermin", duration: 15, description: "Kurzer Rückruf zu offenen Fragen.", color: "from-[#fbbf24] to-[#d97706]" },
] as const;

export const INDUSTRIES = [
  "Arztpraxis / Medizin","Garage / Autohaus","Fitnessstudio","Bildungsanbieter","Kanzlei",
  "Versicherung / Broker","Handwerk","Immobilien","Reinigung / Umzug","Andere Branche",
];

export const TIME_SLOTS = [
  "09:00","09:30","10:00","10:30","11:00","11:30",
  "13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30",
];

export const APPOINTMENTS = [
  { id: 1, name: "Markus Weber", company: "Weber Garage AG", industry: "Garage / Autohaus", time: "2026-06-23T10:00", event: "SoVoice Demo Call", status: "Bestätigt", notes: "Erstkontakt über LinkedIn" },
  { id: 2, name: "Dr. Anna Keller", company: "Praxis Keller", industry: "Arztpraxis / Medizin", time: "2026-06-23T13:30", event: "Erstberatung", status: "Bestätigt", notes: "Interessiert an Anrufweiterleitung" },
  { id: 3, name: "Lukas Brunner", company: "FitZone Studios", industry: "Fitnessstudio", time: "2026-06-24T11:00", event: "Onboarding Call", status: "Offen", notes: "" },
  { id: 4, name: "Sarah Meier", company: "Meier & Partner", industry: "Kanzlei", time: "2026-06-24T14:00", event: "Technische Integration", status: "Bestätigt", notes: "CRM Anbindung HubSpot" },
  { id: 5, name: "Thomas Huber", company: "Huber Versicherungen", industry: "Versicherung / Broker", time: "2026-06-25T09:30", event: "SoVoice Demo Call", status: "Verschoben", notes: "Termin verschoben auf 28.06." },
  { id: 6, name: "Julia Frei", company: "Frei Immobilien", industry: "Immobilien", time: "2026-06-25T15:00", event: "Rückruftermin", status: "Bestätigt", notes: "" },
  { id: 7, name: "Peter Schmid", company: "Schmid Schreinerei", industry: "Handwerk", time: "2026-06-22T16:00", event: "Erstberatung", status: "Abgeschlossen", notes: "Follow-Up nächste Woche" },
  { id: 8, name: "Nina Roth", company: "CleanFast GmbH", industry: "Reinigung / Umzug", time: "2026-06-22T11:30", event: "SoVoice Demo Call", status: "Storniert", notes: "" },
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
