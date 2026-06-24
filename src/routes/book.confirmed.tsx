import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicLayout } from "@/components/PublicLayout";
import { Check, Calendar, Clock, Video, User, CalendarPlus, RefreshCw, X, Copy } from "lucide-react";
import { EVENT_TYPES } from "@/lib/sovoice-data";
import { findBookingById } from "@/lib/storage";
import { downloadICS } from "@/lib/ics";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/book/confirmed")({
  component: Confirmed,
  validateSearch: (s: Record<string, unknown>) => ({
    b: (s.b as string) || "",
  }),
});

function Confirmed() {
  const { b: bookingId } = Route.useSearch();
  const booking = useMemo(() => (bookingId ? findBookingById(bookingId) : undefined), [bookingId]);

  if (!booking) {
    return (
      <PublicLayout>
        <div className="container-app py-20 max-w-xl text-center">
          <h1 className="text-2xl font-bold">Termin nicht gefunden</h1>
          <p className="mt-2 text-[color:var(--color-text-muted)]">Bitte buche deinen Termin neu, falls der Link abgelaufen ist.</p>
          <div className="mt-6 flex justify-center gap-2">
            <Link to="/book" search={{ event: "demo" } as any} className="btn-primary">Termin buchen</Link>
            <Link to="/" className="btn-secondary">Zur Startseite</Link>
          </div>
        </div>
      </PublicLayout>
    );
  }

  const event = EVENT_TYPES.find(e => e.id === booking.eventTypeId) ?? EVENT_TYPES[0];
  const d = new Date(`${booking.date}T${booking.startTime}`);
  const dateStr = d.toLocaleDateString("de-DE", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  return (
    <PublicLayout>
      <div className="container-app py-12 md:py-16 max-w-3xl">
        <div className="text-center mb-10">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#34d399] to-[#059669] shadow-[0_0_40px_-5px_rgba(52,211,153,0.5)] mb-5">
            <Check className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">Dein Termin ist bestätigt.</h1>
          <p className="mt-3 text-[color:var(--color-text-muted)]">Wir haben dir die Terminbestätigung an <span className="text-[color:var(--color-text)] font-medium">{booking.email}</span> gesendet.</p>
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
            <Info icon={Clock} label="Uhrzeit" value={`${booking.startTime} – ${booking.endTime} · ${booking.timezone}`} />
            <Info icon={User} label="Teilnehmer" value={`${booking.firstName} ${booking.lastName} · SoVoice Team`} />
            <Info icon={Video} label="Format" value={`${event.meetingType} – Link in der Bestätigungs-E-Mail`} />
          </div>

          <div className="pt-6 flex flex-wrap gap-2">
            <button onClick={() => downloadICS(booking)} className="btn-primary"><CalendarPlus className="h-4 w-4" /> Zum Kalender hinzufügen</button>
            <Link to="/reschedule" search={{ token: booking.rescheduleToken } as any} className="btn-secondary"><RefreshCw className="h-4 w-4" /> Termin verschieben</Link>
            <Link to="/cancel" search={{ token: booking.cancelToken } as any} className="btn-secondary"><X className="h-4 w-4" /> Termin stornieren</Link>
          </div>

          <ShareLinks booking={booking} />
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

function ShareLinks({ booking }: { booking: { rescheduleToken: string; cancelToken: string } }) {
  const [copied, setCopied] = useState<string>("");
  const origin = typeof window !== "undefined" ? window.location.origin : "https://sovoice-calendar.com";
  function copy(label: string, url: string) {
    navigator.clipboard?.writeText(url);
    setCopied(label);
    setTimeout(() => setCopied(""), 1500);
  }
  const rescheduleUrl = `${origin}/reschedule?token=${booking.rescheduleToken}`;
  const cancelUrl = `${origin}/cancel?token=${booking.cancelToken}`;
  return (
    <div className="mt-6 pt-6 border-t border-[color:var(--color-border)] grid sm:grid-cols-2 gap-3">
      <LinkRow label="Verschieben-Link" url={rescheduleUrl} onCopy={() => copy("r", rescheduleUrl)} active={copied === "r"} />
      <LinkRow label="Stornieren-Link" url={cancelUrl} onCopy={() => copy("c", cancelUrl)} active={copied === "c"} />
    </div>
  );
}

function LinkRow({ label, url, onCopy, active }: { label: string; url: string; onCopy: () => void; active: boolean }) {
  return (
    <div>
      <div className="text-xs text-[color:var(--color-text-muted)] mb-1.5">{label}</div>
      <div className="flex items-center gap-1.5">
        <input readOnly value={url} className="input-field truncate text-xs" />
        <button onClick={onCopy} className="btn-secondary shrink-0" title="Kopieren"><Copy className="h-3.5 w-3.5" />{active ? "Kopiert" : "Kopieren"}</button>
      </div>
    </div>
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
