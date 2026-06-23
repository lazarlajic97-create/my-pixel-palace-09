import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { PublicLayout } from "@/components/PublicLayout";
import { BookingCalendar, TimeSlots, formatDateDE } from "@/components/BookingCalendar";
import { EVENT_TYPES } from "@/lib/sovoice-data";
import { useMemo, useState } from "react";
import { Calendar, Clock, Video } from "lucide-react";
import { findBookingByToken } from "@/lib/storage";
import { getAvailableSlots, rescheduleBooking, ymd } from "@/lib/calendar-service";

export const Route = createFileRoute("/reschedule")({
  component: Reschedule,
  validateSearch: (s: Record<string, unknown>) => ({ token: (s.token as string) || "" }),
});

function Reschedule() {
  const navigate = useNavigate();
  const { token } = Route.useSearch();
  const booking = useMemo(() => (token ? findBookingByToken(token, "reschedule") : undefined), [token]);
  const event = booking ? EVENT_TYPES.find(e => e.id === booking.eventTypeId) : undefined;

  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const slots = useMemo(() => (date && event ? getAvailableSlots({ eventType: event, date }) : []), [date, event]);

  if (!booking || !event) {
    return (
      <PublicLayout>
        <div className="container-app py-20 max-w-xl text-center">
          <h1 className="text-2xl font-bold">Link ungültig</h1>
          <p className="mt-2 text-[color:var(--color-text-muted)]">Der Verschieben-Link ist ungültig oder abgelaufen. Bitte buche einen neuen Termin.</p>
          <div className="mt-6 flex justify-center gap-2">
            <Link to="/book" search={{ event: "demo" } as any} className="btn-primary">Neuen Termin buchen</Link>
            <Link to="/" className="btn-secondary">Zur Startseite</Link>
          </div>
        </div>
      </PublicLayout>
    );
  }

  const old = new Date(`${booking.date}T${booking.startTime}`);

  function submit() {
    if (!date || !time) return;
    const fresh = getAvailableSlots({ eventType: event!, date });
    if (!fresh.includes(time)) return;
    const updated = rescheduleBooking(token, ymd(date), time);
    if (updated) navigate({ to: "/book/confirmed", search: { b: updated.id } as any });
  }

  return (
    <PublicLayout>
      <div className="container-app py-10 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Termin verschieben</h1>
          <p className="mt-2 text-[color:var(--color-text-muted)]">Wähle einfach einen neuen Zeitpunkt. Dein alter Termin wird automatisch ersetzt.</p>
        </div>

        <div className="grid lg:grid-cols-[340px_minmax(0,1fr)] gap-6">
          <aside className="glass-strong p-6 h-fit">
            <div className="text-xs text-[color:var(--color-text-muted)] mb-2">Aktueller Termin</div>
            <h2 className="font-semibold">{event.title}</h2>
            <div className="mt-3 space-y-2 text-sm">
              <div className="flex items-center gap-2 text-[color:var(--color-text-muted)]"><Calendar className="h-4 w-4 text-[#60a5fa]" /> {old.toLocaleDateString("de-DE", { weekday:"long", day:"numeric", month:"long", year:"numeric" })}</div>
              <div className="flex items-center gap-2 text-[color:var(--color-text-muted)]"><Clock className="h-4 w-4 text-[#60a5fa]" /> {booking.startTime} – {booking.endTime} ({booking.timezone})</div>
              <div className="flex items-center gap-2 text-[color:var(--color-text-muted)]"><Video className="h-4 w-4 text-[#60a5fa]" /> {event.meetingType}</div>
            </div>
            <div className="mt-5 pt-5 border-t border-[color:var(--color-border)] text-xs text-[color:var(--color-text-muted)]">
              Buchung für {booking.firstName} {booking.lastName} · {booking.companyName}
            </div>
          </aside>

          <div className="glass-strong p-5 md:p-8">
            <h3 className="text-lg font-semibold mb-1">Neuen Zeitpunkt wählen</h3>
            <p className="text-sm text-[color:var(--color-text-muted)] mb-6">Alle Zeiten werden in deiner lokalen Zeitzone angezeigt.</p>
            <div className="grid md:grid-cols-[1fr_280px] gap-6">
              <BookingCalendar value={date} onChange={(d) => { setDate(d); setTime(null); }} event={event} />
              <div>
                <div className="text-sm font-semibold mb-3">{date ? formatDateDE(date) : "Datum wählen"}</div>
                {date ? <TimeSlots value={time} onChange={setTime} slots={slots} /> : (
                  <div className="glass p-6 text-center text-xs text-[color:var(--color-text-muted)]">Bitte zuerst ein Datum auswählen.</div>
                )}
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button disabled={!date || !time} onClick={submit} className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed">Neuen Termin bestätigen</button>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
