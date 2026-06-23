import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { PublicLayout } from "@/components/PublicLayout";
import { BookingCalendar, TimeSlots, formatDateDE } from "@/components/BookingCalendar";
import { EVENT_TYPES, INDUSTRIES } from "@/lib/sovoice-data";
import { useMemo, useState } from "react";
import { Clock, Video, Check, ArrowLeft, ArrowRight } from "lucide-react";
import { createBooking, getAvailableSlots, ymd } from "@/lib/calendar-service";

export const Route = createFileRoute("/book")({
  component: BookPage,
  validateSearch: (s: Record<string, unknown>) => ({
    event: (s.event as string) || "demo",
  }),
});

type Step = "event" | "slot" | "form";

function BookPage() {
  const navigate = useNavigate();
  const { event: initialEvent } = Route.useSearch();
  const [step, setStep] = useState<Step>(initialEvent ? "slot" : "event");
  const [eventId, setEventId] = useState<string>(initialEvent ?? "demo");
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "", company: "", industry: INDUSTRIES[0],
    website: "", callVolume: "", automate: "", notes: "", consent: false,
  });
  const [errors, setErrors] = useState<Record<string,string>>({});
  const [submitting, setSubmitting] = useState(false);

  const event = EVENT_TYPES.find(e => e.id === eventId)!;
  const slots = useMemo(
    () => (date ? getAvailableSlots({ eventType: event, date }) : []),
    [date, event],
  );

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!date || !time) return;
    const err: Record<string,string> = {};
    if (!form.firstName.trim()) err.firstName = "Pflichtfeld";
    if (!form.lastName.trim()) err.lastName = "Pflichtfeld";
    if (!form.email || !/^\S+@\S+\.\S+$/.test(form.email)) err.email = "Bitte gib eine gültige E Mail Adresse ein.";
    if (!form.phone.trim() || form.phone.replace(/\D/g, "").length < 6) err.phone = "Bitte gib eine gültige Telefonnummer ein.";
    if (!form.company.trim()) err.company = "Pflichtfeld";
    if (!form.consent) err.consent = "Bitte akzeptiere die Datenschutzbestimmungen.";
    setErrors(err);
    if (Object.keys(err).length) return;

    // Slot revalidieren
    const fresh = getAvailableSlots({ eventType: event, date });
    if (!fresh.includes(time)) {
      setErrors({ slot: "Der gewählte Zeitpunkt ist nicht mehr verfügbar. Bitte wähle einen anderen Slot." });
      setStep("slot");
      setTime(null);
      return;
    }

    setSubmitting(true);
    const booking = createBooking({
      eventTypeId: event.id,
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      companyName: form.company.trim(),
      industry: form.industry,
      website: form.website.trim() || undefined,
      incomingCallsPerDay: form.callVolume.trim() || undefined,
      automationGoal: form.automate.trim() || undefined,
      message: form.notes.trim() || undefined,
      date: ymd(date),
      startTime: time,
    });
    navigate({ to: "/book/confirmed", search: { b: booking.id } as any });
  }

  return (
    <PublicLayout>
      <div className="container-app py-8 md:py-12">
        {/* Stepper */}
        <ol className="flex items-center gap-2 text-xs text-[color:var(--color-text-muted)] mb-6">
          {[
            {id:"event",l:"Terminart"},
            {id:"slot",l:"Zeitpunkt"},
            {id:"form",l:"Daten"},
          ].map((s,i,arr) => {
            const active = step === s.id;
            const done = arr.findIndex(x=>x.id===step) > i;
            return (
              <li key={s.id} className="flex items-center gap-2">
                <span className={`h-6 w-6 grid place-items-center rounded-full text-[11px] font-semibold border ${
                  active ? "border-[#60a5fa] bg-[rgba(37,99,235,0.2)] text-white" :
                  done ? "border-[color:var(--color-success)] bg-[rgba(52,211,153,0.15)] text-[color:var(--color-success)]" :
                  "border-[color:var(--color-border-strong)]"
                }`}>{done ? <Check className="h-3 w-3" /> : i+1}</span>
                <span className={active ? "text-white font-medium" : ""}>{s.l}</span>
                {i<arr.length-1 && <span className="w-8 h-px bg-[color:var(--color-border-strong)]" />}
              </li>
            );
          })}
        </ol>

        <div className="grid lg:grid-cols-[380px_minmax(0,1fr)] gap-6">
          {/* LEFT: Event info */}
          <aside className="glass-strong p-6 h-fit lg:sticky lg:top-24">
            <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${event.color} grid place-items-center mb-4`}>
              <Video className="h-5 w-5 text-white" />
            </div>
            <div className="text-xs text-[color:var(--color-text-muted)]">SoVoice Calendar</div>
            <h2 className="text-xl font-semibold mt-1">{event.title}</h2>
            <div className="mt-2 flex items-center gap-3 text-xs text-[color:var(--color-text-muted)]">
              <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {event.durationMinutes} Minuten</span>
              <span className="inline-flex items-center gap-1.5"><Video className="h-3.5 w-3.5" /> {event.meetingType}</span>
            </div>
            <p className="mt-4 text-sm text-[color:var(--color-text-muted)]">{event.description}</p>

            <div className="mt-5 pt-5 border-t border-[color:var(--color-border)]">
              <div className="text-xs font-semibold mb-2 text-[color:var(--color-text-muted)]">Das erwartet dich</div>
              <ul className="space-y-2 text-sm">
                {event.benefits.map(b => (
                  <li key={b} className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-[color:var(--color-success)] mt-0.5 shrink-0" />
                    <span className="text-[color:var(--color-text-muted)]">{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {(date || time) && (
              <div className="mt-5 pt-5 border-t border-[color:var(--color-border)] text-sm">
                {date && <div className="text-[color:var(--color-text-muted)]">{formatDateDE(date)}</div>}
                {time && <div className="font-semibold mt-1">{time} – {addMinutes(time, event.durationMinutes)} (CET)</div>}
              </div>
            )}

            <div className="mt-5 pt-5 border-t border-[color:var(--color-border)] text-xs text-[color:var(--color-text-muted)]">
              Deine Daten werden verschlüsselt übertragen und ausschliesslich für die Terminorganisation verwendet. Mehr in der <Link to="/datenschutz" className="text-[#60a5fa] underline">Datenschutzerklärung</Link>.
            </div>
          </aside>

          {/* RIGHT: dynamic step */}
          <div className="glass-strong p-5 md:p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(96,165,250,0.6)] to-transparent" />
            {step === "event" && (
              <div key="event" className="animate-fade-up">
                <h3 className="text-lg font-semibold mb-1">Wähle deine Terminart</h3>

                <p className="text-sm text-[color:var(--color-text-muted)] mb-6">Alle Termine sind unverbindlich.</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {EVENT_TYPES.map(et => {
                    const selected = eventId === et.id;
                    return (
                      <button key={et.id} onClick={() => setEventId(et.id)} className={`text-left p-4 rounded-xl border transition ${
                        selected ? "border-[#60a5fa] bg-[rgba(37,99,235,0.08)] glow-accent" : "border-[color:var(--color-border-strong)] bg-white/[0.02] hover:border-[rgba(59,130,246,0.4)]"
                      }`}>
                        <div className={`h-9 w-9 rounded-lg bg-gradient-to-br ${et.color} grid place-items-center mb-3`}>
                          <Video className="h-4 w-4 text-white" />
                        </div>
                        <div className="font-semibold text-sm">{et.title}</div>
                        <div className="text-xs text-[color:var(--color-text-muted)] mt-1">{et.durationMinutes} Minuten · {et.meetingType}</div>
                        <div className="text-xs text-[color:var(--color-text-muted)] mt-2 line-clamp-2">{et.description}</div>
                      </button>
                    );
                  })}
                </div>
                <div className="mt-6 flex justify-end">
                  <button onClick={() => setStep("slot")} className="btn-primary">Weiter <ArrowRight className="h-4 w-4" /></button>
                </div>
              </div>
            )}

            {step === "slot" && (
              <div key="slot" className="animate-fade-up">
                <h3 className="text-lg font-semibold mb-1">Wähle einen Zeitpunkt</h3>

                <p className="text-sm text-[color:var(--color-text-muted)] mb-6">Alle Zeiten werden in deiner lokalen Zeitzone angezeigt.</p>
                {errors.slot && <div className="mb-4 text-sm text-[color:var(--color-danger)] glass p-3 border border-[rgba(248,113,113,0.3)]">{errors.slot}</div>}
                <div className="grid md:grid-cols-[1fr_280px] gap-6">
                  <BookingCalendar value={date} onChange={(d) => { setDate(d); setTime(null); }} event={event} />
                  <div>
                    <div className="text-sm font-semibold mb-3">
                      {date ? formatDateDE(date) : "Datum wählen"}
                    </div>
                    {date ? (
                      <TimeSlots value={time} onChange={setTime} slots={slots} />
                    ) : (
                      <div className="glass p-6 text-center text-xs text-[color:var(--color-text-muted)]">
                        Bitte zuerst ein Datum auswählen.
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-6 flex justify-between">
                  <button onClick={() => setStep("event")} className="btn-secondary"><ArrowLeft className="h-4 w-4" /> Zurück</button>
                  <button disabled={!date || !time} onClick={() => setStep("form")} className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed">Weiter <ArrowRight className="h-4 w-4" /></button>
                </div>
              </div>
            )}

            {step === "form" && (
              <form onSubmit={submit}>
                <h3 className="text-lg font-semibold mb-1">Deine Daten</h3>
                <p className="text-sm text-[color:var(--color-text-muted)] mb-6">Damit wir den Termin optimal vorbereiten können.</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Vorname" error={errors.firstName}>
                    <input className="input-field" value={form.firstName} onChange={e=>setForm({...form,firstName:e.target.value})} />
                  </Field>
                  <Field label="Nachname" error={errors.lastName}>
                    <input className="input-field" value={form.lastName} onChange={e=>setForm({...form,lastName:e.target.value})} />
                  </Field>
                  <Field label="E Mail" error={errors.email}>
                    <input type="email" className="input-field" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
                  </Field>
                  <Field label="Telefonnummer" error={errors.phone}>
                    <input className="input-field" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} />
                  </Field>
                  <Field label="Firmenname" error={errors.company}>
                    <input className="input-field" value={form.company} onChange={e=>setForm({...form,company:e.target.value})} />
                  </Field>
                  <Field label="Branche">
                    <select className="input-field" value={form.industry} onChange={e=>setForm({...form,industry:e.target.value})}>
                      {INDUSTRIES.map(i => <option key={i} value={i} className="bg-[#0e1426]">{i}</option>)}
                    </select>
                  </Field>
                  <Field label="Webseite (optional)">
                    <input className="input-field" placeholder="https://" value={form.website} onChange={e=>setForm({...form,website:e.target.value})} />
                  </Field>
                  <Field label="Anrufe pro Tag (ca.)">
                    <input className="input-field" placeholder="z. B. 30" value={form.callVolume} onChange={e=>setForm({...form,callVolume:e.target.value})} />
                  </Field>
                </div>
                <div className="mt-4">
                  <Field label="Was soll SoVoice für dich automatisieren?">
                    <input className="input-field" placeholder="z. B. Terminbuchung, Rückrufe, FAQs" value={form.automate} onChange={e=>setForm({...form,automate:e.target.value})} />
                  </Field>
                </div>
                <div className="mt-4">
                  <Field label="Was möchtest du im Termin besprechen?">
                    <textarea rows={4} className="input-field resize-none" value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})} />
                  </Field>
                </div>
                <label className="mt-5 flex items-start gap-3 text-sm cursor-pointer">
                  <input type="checkbox" checked={form.consent} onChange={e=>setForm({...form,consent:e.target.checked})} className="mt-0.5 h-4 w-4 rounded border-[color:var(--color-border-strong)] bg-white/5 text-[color:var(--color-brand)]" />
                  <span className="text-[color:var(--color-text-muted)]">Ich akzeptiere die <Link to="/datenschutz" className="text-[#60a5fa] underline">Datenschutzbestimmungen</Link>.</span>
                </label>
                {errors.consent && <div className="mt-1 text-xs text-[color:var(--color-danger)]">{errors.consent}</div>}

                <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <button type="button" onClick={() => setStep("slot")} className="btn-secondary"><ArrowLeft className="h-4 w-4" /> Zurück</button>
                  <div className="text-xs text-[color:var(--color-text-muted)] sm:text-right">Du erhältst direkt nach der Buchung eine Bestätigung per E Mail.</div>
                  <button type="submit" disabled={submitting} className="btn-primary disabled:opacity-60">{submitting ? "Wird gebucht..." : "Termin bestätigen"}</button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-[color:var(--color-text-muted)] mb-1.5 block">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-[color:var(--color-danger)]">{error}</span>}
    </label>
  );
}

function addMinutes(time: string, minutes: number) {
  const [h,m] = time.split(":").map(Number);
  const total = h*60 + m + minutes;
  return `${String(Math.floor(total/60)).padStart(2,"0")}:${String(total%60).padStart(2,"0")}`;
}
