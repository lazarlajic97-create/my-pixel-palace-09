import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/AdminLayout";
import { useState } from "react";
import { Save } from "lucide-react";

export const Route = createFileRoute("/admin/availability")({ component: Avail });

const DAYS = ["Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag","Sonntag"];

function Avail() {
  const [days, setDays] = useState(DAYS.map((d,i) => ({ name: d, on: i < 5, start: "09:00", end: "17:30" })));

  return (
    <AdminLayout title="Verfügbarkeiten" subtitle="Arbeitszeiten und Buchungsregeln" actions={
      <button className="btn-primary"><Save className="h-4 w-4" /> Speichern</button>
    }>
      <div className="grid lg:grid-cols-[minmax(0,1fr)_340px] gap-4">
        <div className="glass-strong p-5 md:p-6">
          <h3 className="font-semibold mb-1">Wochenplan</h3>
          <p className="text-xs text-[color:var(--color-text-muted)] mb-5">Lege fest, an welchen Tagen Termine möglich sind.</p>
          <div className="space-y-2">
            {days.map((d, i) => (
              <div key={d.name} className="grid grid-cols-[auto_minmax(0,1fr)_auto_auto] sm:grid-cols-[140px_auto_1fr_auto] items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-[color:var(--color-border)]">
                <label className="flex items-center gap-2.5 cursor-pointer min-w-0">
                  <input type="checkbox" checked={d.on} onChange={e=>{const n=[...days]; n[i].on=e.target.checked; setDays(n);}} className="h-4 w-4 rounded" />
                  <span className="font-medium text-sm truncate">{d.name}</span>
                </label>
                <span className="hidden sm:block text-xs text-[color:var(--color-text-dim)]">{d.on ? "Verfügbar" : "Geschlossen"}</span>
                <div className="col-span-full sm:col-auto flex items-center gap-2">
                  <input type="time" disabled={!d.on} value={d.start} onChange={e=>{const n=[...days]; n[i].start=e.target.value; setDays(n);}} className="input-field py-1.5 px-2 w-28 text-sm disabled:opacity-40" />
                  <span className="text-[color:var(--color-text-dim)]">–</span>
                  <input type="time" disabled={!d.on} value={d.end} onChange={e=>{const n=[...days]; n[i].end=e.target.value; setDays(n);}} className="input-field py-1.5 px-2 w-28 text-sm disabled:opacity-40" />
                </div>
                <button className="btn-ghost text-xs hidden md:inline-flex">+ Pause</button>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-strong p-5 md:p-6 h-fit">
          <h3 className="font-semibold mb-4">Buchungsregeln</h3>
          <div className="space-y-4 text-sm">
            <Rule label="Pufferzeit zwischen Terminen" value="15 Minuten" />
            <Rule label="Mindestvorlaufzeit" value="4 Stunden" />
            <Rule label="Maximale Termine pro Tag" value="8" />
            <Rule label="Zeitzone" value="Europa / Zürich" />
          </div>
          <div className="mt-5 pt-5 border-t border-[color:var(--color-border)] text-xs text-[color:var(--color-text-muted)]">
            Änderungen gelten ab der nächsten Buchung.
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

function Rule({ label, value }: { label: string; value: string }) {
  return (
    <label className="block">
      <span className="text-xs text-[color:var(--color-text-muted)] mb-1 block">{label}</span>
      <input defaultValue={value} className="input-field" />
    </label>
  );
}
