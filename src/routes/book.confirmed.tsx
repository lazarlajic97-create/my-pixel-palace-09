import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicLayout } from "@/components/PublicLayout";
import { Check, Calendar, Clock, Video, User, CalendarPlus, RefreshCw, X } from "lucide-react";
import { EVENT_TYPES } from "@/lib/sovoice-data";

export const Route = createFileRoute("/book/confirmed")({
  component: Confirmed,
  validateSearch: (s: Record<string, unknown>) => ({
    event: (s.event as string) || "demo",
    date: (s.date as string) || "",
    time: (s.time as string) || "10:00",
    name: (s.name as string) || "Gast",
  }),
});

function Confirmed() {
  const { event: eventId, date, time, name } = Route.useSearch();
  const event = EVENT_TYPES.find(e => e.id === eventId) ?? EVENT_TYPES[0];
  const d = date ? new Date(date) : new Date();
  const dateStr = d.toLocaleDateString("de-DE", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  return (
    <PublicLayout>
      <div className="container-app py-12 md:py-16 max-w-3xl">
        <div className="text-center mb-10">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#34d399] to-[#059669] shadow-[0_0_40px_-5px_rgba(52,211,153,0.5)] mb-5">
            <Check className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">Dein Termin ist bestätigt.</h1>
          <p className="mt-3 text-[color:var(--color-text-muted)]">Wir haben dir die Terminbestätigung per E Mail gesendet.</p>
        </div>

        <div className="glass-strong p-6 md:p-8">
          <div className="flex items-start gap-4 pb-6 border-b border-[color:var(--color-border)]">
            <div className={`h-12 w-12 shrink-0 rounded-xl bg-gradient-to-br ${event.color} grid place-items-center`}>
              <Video className="h-5 w-5 text-white" />
            </div>
            <div className="min-w-0">
              <h2 className="text-lg font-semibold">{event.title}</h2>
              <p className="text-sm text-[color:var(--color-text-muted)] mt-0.5">{event.description}</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5 py-6 border-b border-[color:var(--color-border)]">
            <Info icon={Calendar} label="Datum" value={dateStr} />
            <Info icon={Clock} label="Uhrzeit" value={`${time} (${event.duration} Min.) · CET`} />
            <Info icon={User} label="Teilnehmer" value={`${name} · SoVoice Team`} />
            <Info icon={Video} label="Format" value="Google Meet – Link in der Bestätigungs-E-Mail" />
          </div>

          <div className="pt-6 flex flex-wrap gap-2">
            <button className="btn-primary"><CalendarPlus className="h-4 w-4" /> Zum Kalender hinzufügen</button>
            <Link to="/reschedule" className="btn-secondary"><RefreshCw className="h-4 w-4" /> Termin verschieben</Link>
            <Link to="/cancel" className="btn-secondary"><X className="h-4 w-4" /> Termin stornieren</Link>
          </div>
        </div>

        <div className="glass p-6 md:p-8 mt-6">
          <h3 className="font-semibold mb-3">Bereite dich optimal vor</h3>
          <ul className="space-y-2.5 text-sm">
            {["Notiere dir, wie viele Anrufe täglich eingehen.","Überlege dir, welche Anfragen automatisiert werden sollen.","Halte deine Webseite oder aktuelle Prozesse bereit."].map(t => (
              <li key={t} className="flex items-start gap-2.5">
                <Check className="h-4 w-4 text-[color:var(--color-success)] mt-0.5 shrink-0" />
                <span className="text-[color:var(--color-text-muted)]">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </PublicLayout>
  );
}

function Info({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex gap-3">
      <Icon className="h-4 w-4 text-[#60a5fa] mt-0.5 shrink-0" />
      <div className="min-w-0">
        <div className="text-xs text-[color:var(--color-text-muted)]">{label}</div>
        <div className="text-sm font-medium mt-0.5">{value}</div>
      </div>
    </div>
  );
}
