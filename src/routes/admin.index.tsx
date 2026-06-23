import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/AdminLayout";
import { APPOINTMENTS, statusColor } from "@/lib/sovoice-data";
import { Calendar, TrendingUp, Users, CheckCircle2, ArrowUpRight, MoreHorizontal } from "lucide-react";

export const Route = createFileRoute("/admin/")({ component: Dashboard });

function Dashboard() {
  const todays = APPOINTMENTS.slice(0, 4);

  return (
    <AdminLayout title="Dashboard" subtitle="Überblick über Termine und Conversion">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat label="Heute" value="6" change="+2" icon={Calendar} accent="from-[#3b82f6] to-[#1e40af]" />
        <Stat label="Diese Woche" value="28" change="+14%" icon={TrendingUp} accent="from-[#22d3ee] to-[#0891b2]" />
        <Stat label="Neue Leads" value="42" change="+18%" icon={Users} accent="from-[#8b5cf6] to-[#6d28d9]" />
        <Stat label="Conversion" value="68%" change="+4%" icon={CheckCircle2} accent="from-[#34d399] to-[#059669]" />
      </div>

      <div className="mt-6 grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 glass-strong p-5 md:p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-semibold">Kommende Termine</h3>
              <p className="text-xs text-[color:var(--color-text-muted)] mt-0.5">Heute & morgen</p>
            </div>
            <button className="btn-ghost text-xs">Alle anzeigen <ArrowUpRight className="h-3 w-3" /></button>
          </div>
          <div className="space-y-2">
            {todays.map(a => (
              <div key={a.id} className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-[color:var(--color-border)] hover:border-[rgba(59,130,246,0.3)] transition">
                <div className="h-10 w-10 shrink-0 rounded-lg bg-gradient-to-br from-[#3b82f6] to-[#1e40af] grid place-items-center text-xs font-semibold">
                  {a.name.split(" ").map(n=>n[0]).join("").slice(0,2)}
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-medium truncate">{a.name} · <span className="text-[color:var(--color-text-muted)] font-normal">{a.company}</span></div>
                  <div className="text-xs text-[color:var(--color-text-muted)] truncate">{new Date(a.time).toLocaleString("de-DE", { weekday:"short", hour:"2-digit", minute:"2-digit" })} · {a.event}</div>
                </div>
                <span className={`chip border ${statusColor(a.status)}`}>{a.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-strong p-5 md:p-6">
          <h3 className="font-semibold mb-1">Event Typen</h3>
          <p className="text-xs text-[color:var(--color-text-muted)] mb-5">Meistgewählt</p>
          <div className="space-y-3">
            {[
              { name: "SoVoice Demo Call", pct: 62 },
              { name: "Erstberatung", pct: 22 },
              { name: "Onboarding Call", pct: 10 },
              { name: "Rückruftermin", pct: 6 },
            ].map(r => (
              <div key={r.name}>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-[color:var(--color-text-muted)]">{r.name}</span>
                  <span className="font-semibold">{r.pct}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#3b82f6] to-[#22d3ee]" style={{ width: `${r.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 grid lg:grid-cols-2 gap-4">
        <div className="glass-strong p-5 md:p-6">
          <h3 className="font-semibold mb-4">Leads nach Branche</h3>
          <div className="space-y-2">
            {[
              { n: "Garage / Autohaus", c: 14 },
              { n: "Arztpraxis / Medizin", c: 11 },
              { n: "Kanzlei", c: 8 },
              { n: "Fitnessstudio", c: 6 },
              { n: "Versicherung / Broker", c: 3 },
            ].map(r => (
              <div key={r.n} className="flex items-center justify-between text-sm py-1.5">
                <span className="text-[color:var(--color-text-muted)]">{r.n}</span>
                <span className="font-semibold">{r.c}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-strong p-5 md:p-6">
          <h3 className="font-semibold mb-4">Kalenderauslastung</h3>
          <div className="grid grid-cols-7 gap-2">
            {["Mo","Di","Mi","Do","Fr","Sa","So"].map((d,i) => {
              const h = [70,90,60,85,75,15,5][i];
              return (
                <div key={d} className="flex flex-col items-center gap-2">
                  <div className="h-32 w-full rounded-lg bg-white/[0.03] flex items-end overflow-hidden border border-[color:var(--color-border)]">
                    <div className="w-full bg-gradient-to-t from-[#3b82f6] to-[#22d3ee] rounded-md" style={{ height: `${h}%` }} />
                  </div>
                  <span className="text-[11px] text-[color:var(--color-text-muted)]">{d}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

function Stat({ label, value, change, icon: Icon, accent }: { label: string; value: string; change: string; icon: any; accent: string }) {
  return (
    <div className="glass-strong p-5">
      <div className="flex items-start justify-between">
        <div className={`h-9 w-9 rounded-lg bg-gradient-to-br ${accent} grid place-items-center`}>
          <Icon className="h-4 w-4 text-white" />
        </div>
        <button className="btn-ghost p-1"><MoreHorizontal className="h-4 w-4" /></button>
      </div>
      <div className="mt-4 text-2xl md:text-3xl font-bold">{value}</div>
      <div className="mt-1 flex items-center gap-2 text-xs">
        <span className="text-[color:var(--color-text-muted)]">{label}</span>
        <span className="text-[color:var(--color-success)] font-medium">{change}</span>
      </div>
    </div>
  );
}
