import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MONTHS = ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"];
const DAYS = ["Mo","Di","Mi","Do","Fr","Sa","So"];

export function BookingCalendar({ value, onChange }: { value: Date | null; onChange: (d: Date) => void }) {
  const today = new Date(); today.setHours(0,0,0,0);
  const [view, setView] = useState(() => {
    const d = value ?? today;
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });

  const year = view.getFullYear();
  const month = view.getMonth();
  const firstDay = new Date(year, month, 1);
  const startWeekday = (firstDay.getDay() + 6) % 7; // Mon=0
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (Date | null)[] = [];
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));

  const isSameDay = (a: Date, b: Date) => a.toDateString() === b.toDateString();
  const isDisabled = (d: Date) => d < today || d.getDay() === 0 || d.getDay() === 6;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-base font-semibold">{MONTHS[month]} {year}</div>
          <div className="text-xs text-[color:var(--color-text-dim)]">Zeitzone: Europa/Zürich</div>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => setView(new Date(year, month - 1, 1))} className="h-9 w-9 grid place-items-center rounded-lg border border-[color:var(--color-border-strong)] hover:bg-white/5"><ChevronLeft className="h-4 w-4" /></button>
          <button onClick={() => setView(new Date(year, month + 1, 1))} className="h-9 w-9 grid place-items-center rounded-lg border border-[color:var(--color-border-strong)] hover:bg-white/5"><ChevronRight className="h-4 w-4" /></button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {DAYS.map(d => <div key={d} className="text-center text-[11px] font-medium text-[color:var(--color-text-dim)] py-1">{d}</div>)}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {cells.map((d, i) => {
          if (!d) return <div key={i} />;
          const disabled = isDisabled(d);
          const selected = value && isSameDay(value, d);
          const isToday = isSameDay(today, d);
          return (
            <button
              key={i}
              disabled={disabled}
              onClick={() => onChange(d)}
              className={`aspect-square rounded-lg text-sm font-medium transition relative ${
                selected
                  ? "bg-gradient-to-br from-[#3b82f6] to-[#1e40af] text-white shadow-[0_0_24px_-4px_rgba(59,130,246,0.8)]"
                  : disabled
                  ? "text-[color:var(--color-text-dim)] opacity-30 cursor-not-allowed"
                  : "text-[color:var(--color-text)] hover:bg-white/5 border border-transparent hover:border-[color:var(--color-border-strong)]"
              }`}
            >
              {d.getDate()}
              {isToday && !selected && <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-[color:var(--color-accent)]" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function TimeSlots({ value, onChange, slots }: { value: string | null; onChange: (t: string) => void; slots: string[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
      {slots.map((t) => {
        const selected = value === t;
        return (
          <button
            key={t}
            onClick={() => onChange(t)}
            className={`px-3 py-2.5 rounded-lg text-sm font-medium transition border ${
              selected
                ? "bg-gradient-to-br from-[#3b82f6] to-[#1e40af] text-white border-[#60a5fa] shadow-[0_0_20px_-4px_rgba(59,130,246,0.7)]"
                : "bg-white/[0.02] border-[color:var(--color-border-strong)] text-[color:var(--color-text)] hover:border-[rgba(59,130,246,0.5)] hover:bg-[rgba(59,130,246,0.06)]"
            }`}
          >
            {t}
          </button>
        );
      })}
    </div>
  );
}

export function formatDateDE(d: Date) {
  return d.toLocaleDateString("de-DE", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}
