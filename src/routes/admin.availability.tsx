import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/AdminLayout";
import { useAvailabilitySettings } from "@/lib/admin-storage";
import { DEFAULT_AVAILABILITY } from "@/lib/sovoice-data";
import { Save, Plus, X, RotateCcw } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/availability")({ component: Avail });

const DAYS = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];

function Avail() {
  const [settings, setSettings] = useAvailabilitySettings();

  const updRule = (weekday: number, patch: Partial<typeof settings.rules[number]>) => {
    setSettings(s => ({ ...s, rules: s.rules.map(r => r.weekday === weekday ? { ...r, ...patch } : r) }));
  };
  const addBreak = (weekday: number) => {
    setSettings(s => ({
      ...s,
      rules: s.rules.map(r => r.weekday === weekday ? { ...r, breaks: [...r.breaks, { start: "12:00", end: "13:00" }] } : r),
    }));
  };
  const removeBreak = (weekday: number, idx: number) => {
    setSettings(s => ({
      ...s,
      rules: s.rules.map(r => r.weekday === weekday ? { ...r, breaks: r.breaks.filter((_, i) => i !== idx) } : r),
    }));
  };

  return (
    <AdminLayout
      title="Verfügbarkeiten"
      subtitle="Arbeitszeiten und Buchungsregeln"
      actions={
        <>
          <button
            className="btn-secondary hidden md:inline-flex"
            onClick={() => { setSettings(DEFAULT_AVAILABILITY); toast.success("Zurückgesetzt"); }}
          >
            <RotateCcw className="h-4 w-4" /> Reset
          </button>
          <button className="btn-primary" onClick={() => toast.success("Verfügbarkeiten gespeichert")}>
            <Save className="h-4 w-4" /> Speichern
          </button>
        </>
      }
    >
      <div className="grid lg:grid-cols-[minmax(0,1fr)_340px] gap-4">
        <div className="glass-strong p-5 md:p-6">
          <h3 className="font-semibold mb-1">Wochenplan</h3>
          <p className="text-xs text-[color:var(--color-text-muted)] mb-5">Lege fest, wann Termine möglich sind.</p>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5, 6, 0].map(wd => {
              const r = settings.rules.find(x => x.weekday === wd)!;
              return (
                <div key={wd} className="p-3 rounded-xl bg-white/[0.02] border border-[color:var(--color-border)]">
                  <div className="grid sm:grid-cols-[140px_auto_1fr_auto] items-center gap-3">
                    <label className="flex items-center gap-2.5 cursor-pointer min-w-0">
                      <input
                        type="checkbox"
                        checked={r.isActive}
                        onChange={e => updRule(wd, { isActive: e.target.checked })}
                        className="h-4 w-4 rounded"
                      />
                      <span className="font-medium text-sm truncate">{DAYS[wd]}</span>
                    </label>
                    <span className="hidden sm:block text-xs text-[color:var(--color-text-dim)]">
                      {r.isActive ? "Verfügbar" : "Geschlossen"}
                    </span>
                    <div className="flex items-center gap-2">
                      <input type="time" disabled={!r.isActive} value={r.startTime}
                        onChange={e => updRule(wd, { startTime: e.target.value })}
                        className="input-field py-1.5 px-2 w-28 text-sm disabled:opacity-40" />
                      <span className="text-[color:var(--color-text-dim)]">–</span>
                      <input type="time" disabled={!r.isActive} value={r.endTime}
                        onChange={e => updRule(wd, { endTime: e.target.value })}
                        className="input-field py-1.5 px-2 w-28 text-sm disabled:opacity-40" />
                    </div>
                    <button
                      disabled={!r.isActive}
                      onClick={() => addBreak(wd)}
                      className="btn-ghost text-xs disabled:opacity-30"
                    >
                      <Plus className="h-3 w-3" /> Pause
                    </button>
                  </div>
                  {r.breaks.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-[color:var(--color-border)] flex flex-wrap gap-2">
                      {r.breaks.map((b, i) => (
                        <div key={i} className="flex items-center gap-1.5 bg-white/[0.04] rounded-md px-2 py-1">
                          <input type="time" value={b.start}
                            onChange={e => updRule(wd, { breaks: r.breaks.map((x, j) => j === i ? { ...x, start: e.target.value } : x) })}
                            className="bg-transparent text-xs w-20 outline-none" />
                          <span className="text-xs text-[color:var(--color-text-dim)]">–</span>
                          <input type="time" value={b.end}
                            onChange={e => updRule(wd, { breaks: r.breaks.map((x, j) => j === i ? { ...x, end: e.target.value } : x) })}
                            className="bg-transparent text-xs w-20 outline-none" />
                          <button onClick={() => removeBreak(wd, i)} className="text-[color:var(--color-text-dim)] hover:text-[#f87171]">
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="glass-strong p-5 md:p-6 h-fit">
          <h3 className="font-semibold mb-4">Buchungsregeln</h3>
          <div className="space-y-4 text-sm">
            <NumberRule label="Pufferzeit zwischen Terminen (Minuten)" value={settings.bufferMinutes}
              onChange={v => setSettings(s => ({ ...s, bufferMinutes: v }))} />
            <NumberRule label="Mindestvorlaufzeit (Stunden)" value={settings.minimumNoticeHours}
              onChange={v => setSettings(s => ({ ...s, minimumNoticeHours: v }))} />
            <NumberRule label="Maximale Termine pro Tag" value={settings.maxBookingsPerDay}
              onChange={v => setSettings(s => ({ ...s, maxBookingsPerDay: v }))} />
            <label className="block">
              <span className="text-xs text-[color:var(--color-text-muted)] mb-1 block">Zeitzone</span>
              <select value={settings.timezone}
                onChange={e => setSettings(s => ({ ...s, timezone: e.target.value }))}
                className="input-field">
                {["Europe/Zurich", "Europe/Berlin", "Europe/Vienna", "Europe/London"].map(tz => (
                  <option key={tz} value={tz} className="bg-[#0e1426]">{tz}</option>
                ))}
              </select>
            </label>
          </div>
          <div className="mt-5 pt-5 border-t border-[color:var(--color-border)] text-xs text-[color:var(--color-text-muted)]">
            Änderungen gelten ab der nächsten Buchung.
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

function NumberRule({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <label className="block">
      <span className="text-xs text-[color:var(--color-text-muted)] mb-1 block">{label}</span>
      <input type="number" min={0} value={value} onChange={e => onChange(Number(e.target.value) || 0)} className="input-field" />
    </label>
  );
}
