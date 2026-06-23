import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { PublicLayout } from "@/components/PublicLayout";
import { useMemo, useState } from "react";
import { Calendar, Clock, Video, AlertTriangle } from "lucide-react";
import { findBookingByToken } from "@/lib/storage";
import { cancelBooking } from "@/lib/calendar-service";
import { EVENT_TYPES } from "@/lib/sovoice-data";

export const Route = createFileRoute("/cancel")({
  component: Cancel,
  validateSearch: (s: Record<string, unknown>) => ({ token: (s.token as string) || "" }),
});

function Cancel() {
  const navigate = useNavigate();
  const { token } = Route.useSearch();
  const booking = useMemo(() => (token ? findBookingByToken(token, "cancel") : undefined), [token]);
  const event = booking ? EVENT_TYPES.find(e => e.id === booking.eventTypeId) : undefined;
  const [reason, setReason] = useState("");
  const [done, setDone] = useState(false);

  if (!booking || !event) {
    return (
      <PublicLayout>
        <div className="container-app py-20 max-w-xl text-center">
          <h1 className="text-2xl font-bold">Link ungültig</h1>
          <p className="mt-2 text-[color:var(--color-text-muted)]">Der Stornierungs-Link ist ungültig oder abgelaufen.</p>
          <div className="mt-6 flex justify-center gap-2">
            <Link to="/book" search={{ event: "demo" } as any} className="btn-primary">Neuen Termin buchen</Link>
            <Link to="/" className="btn-secondary">Zur Startseite</Link>
          </div>
        </div>
      </PublicLayout>
    );
  }

  if (done) {
    return (
      <PublicLayout>
        <div className="container-app py-20 max-w-xl text-center">
          <div className="inline-flex h-14 w-14 rounded-2xl bg-[rgba(248,113,113,0.15)] border border-[rgba(248,113,113,0.3)] items-center justify-center mb-5">
            <AlertTriangle className="h-6 w-6 text-[color:var(--color-danger)]" />
          </div>
          <h1 className="text-2xl font-bold">Termin storniert</h1>
          <p className="mt-2 text-[color:var(--color-text-muted)]">Wir haben die Stornierung per E Mail bestätigt. Du kannst jederzeit einen neuen Termin buchen.</p>
          <div className="mt-6 flex justify-center gap-2">
            <Link to="/book" search={{ event: "demo" } as any} className="btn-primary">Neuen Termin buchen</Link>
            <Link to="/" className="btn-secondary">Zur Startseite</Link>
          </div>
        </div>
      </PublicLayout>
    );
  }

  const d = new Date(`${booking.date}T${booking.startTime}`);

  return (
    <PublicLayout>
      <div className="container-app py-10 max-w-2xl">
        <h1 className="text-3xl font-bold">Termin stornieren</h1>
        <p className="mt-2 text-[color:var(--color-text-muted)]">Schade, dass es nicht passt. Du kannst den Termin stornieren oder direkt einen neuen Zeitpunkt wählen.</p>

        <div className="glass-strong p-6 mt-6">
          <div className="text-xs text-[color:var(--color-text-muted)] mb-2">Termin Details</div>
          <h2 className="font-semibold">{event.title}</h2>
          <div className="mt-3 space-y-2 text-sm">
            <div className="flex items-center gap-2 text-[color:var(--color-text-muted)]"><Calendar className="h-4 w-4 text-[#60a5fa]" /> {d.toLocaleDateString("de-DE", { weekday:"long", day:"numeric", month:"long", year:"numeric" })}</div>
            <div className="flex items-center gap-2 text-[color:var(--color-text-muted)]"><Clock className="h-4 w-4 text-[#60a5fa]" /> {booking.startTime} – {booking.endTime} ({booking.timezone})</div>
            <div className="flex items-center gap-2 text-[color:var(--color-text-muted)]"><Video className="h-4 w-4 text-[#60a5fa]" /> {event.meetingType}</div>
          </div>

          <label className="block mt-6">
            <span className="text-xs font-medium text-[color:var(--color-text-muted)] mb-1.5 block">Grund der Stornierung (optional)</span>
            <textarea rows={4} className="input-field resize-none" value={reason} onChange={e => setReason(e.target.value)} placeholder="z. B. Terminkollision, neuer Zeitpunkt benötigt..." />
          </label>

          <div className="mt-6 flex flex-col sm:flex-row gap-2">
            <button onClick={() => { cancelBooking(token, reason || undefined); setDone(true); }} className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm bg-[rgba(248,113,113,0.12)] border border-[rgba(248,113,113,0.3)] text-[color:var(--color-danger)] hover:bg-[rgba(248,113,113,0.18)]">Termin stornieren</button>
            <button onClick={() => navigate({ to: "/reschedule", search: { token: booking.rescheduleToken } as any })} className="btn-secondary">Neuen Termin wählen</button>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
