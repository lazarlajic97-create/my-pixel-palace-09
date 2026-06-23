import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PublicLayout } from "@/components/PublicLayout";
import { BookingCalendar, TimeSlots, formatDateDE } from "@/components/BookingCalendar";
import { TIME_SLOTS } from "@/lib/sovoice-data";
import { useState } from "react";
import { Calendar, Clock, Video } from "lucide-react";

export const Route = createFileRoute("/reschedule")({ component: Reschedule });

function Reschedule() {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<string | null>(null);

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
            <h2 className="font-semibold">SoVoice Demo Call</h2>
            <div className="mt-3 space-y-2 text-sm">
              <div className="flex items-center gap-2 text-[color:var(--color-text-muted)]"><Calendar className="h-4 w-4 text-[#60a5fa]" /> Mittwoch, 25. Juni 2026</div>
              <div className="flex items-center gap-2 text-[color:var(--color-text-muted)]"><Clock className="h-4 w-4 text-[#60a5fa]" /> 14:00 – 14:30 (CET)</div>
              <div className="flex items-center gap-2 text-[color:var(--color-text-muted)]"><Video className="h-4 w-4 text-[#60a5fa]" /> Google Meet</div>
            </div>
            <div className="mt-5 pt-5 border-t border-[color:var(--color-border)] text-xs text-[color:var(--color-text-muted)]">
              Du kannst den Termin jederzeit verschieben oder stornieren.
            </div>
          </aside>

          <div className="glass-strong p-5 md:p-8">
            <h3 className="text-lg font-semibold mb-1">Neuen Zeitpunkt wählen</h3>
            <p className="text-sm text-[color:var(--color-text-muted)] mb-6">Alle Zeiten werden in deiner lokalen Zeitzone angezeigt.</p>
            <div className="grid md:grid-cols-[1fr_280px] gap-6">
              <BookingCalendar value={date} onChange={(d) => { setDate(d); setTime(null); }} />
              <div>
                <div className="text-sm font-semibold mb-3">{date ? formatDateDE(date) : "Datum wählen"}</div>
                {date ? <TimeSlots value={time} onChange={setTime} slots={TIME_SLOTS} /> : (
                  <div className="glass p-6 text-center text-xs text-[color:var(--color-text-muted)]">Bitte zuerst ein Datum auswählen.</div>
                )}
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button disabled={!date || !time} onClick={() => navigate({ to: "/book/confirmed", search: { event: "demo", date: date?.toISOString() ?? "", time: time ?? "", name: "Gast" } as any })} className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed">Neuen Termin bestätigen</button>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
