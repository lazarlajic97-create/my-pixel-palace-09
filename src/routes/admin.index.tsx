import { createFileRoute, Link } from "@tanstack/react-router";
import { AdminLayout } from "@/components/AdminLayout";
import { statusColor } from "@/lib/sovoice-data";
import { useAppointments, useEventTypes } from "@/lib/admin-storage";
import { Calendar, TrendingUp, Users, CheckCircle2, ArrowUpRight, Plus, Download } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/")({ component: Dashboard });

function Dashboard() {
  const [appointments] = useAppointments();
  const [eventTypes] = useEventTypes();

  const today = new Date();
  const todayStr = today.toISOString().slice(0, 10);
  const todays = appointments
    .filter(a => a.status !== "Storniert")
    .sort((a, b) => a.time.localeCompare(b.time))
    .slice(0, 5);
  const todayCount = appointments.filter(a => a.time.startsWith(todayStr)).length;
  const weekCount = appointments.length;
  const confirmedCount = appointments.filter(a => a.status === "Bestätigt" || a.status === "Abgeschlossen").length;
  const conversion = appointments.length ? Math.round((confirmedCount / appointments.length) * 100) : 0;

  const totalEvents = appointments.length || 1;
  const eventDistribution = eventTypes
    .map(et => ({
      name: et.title,
      pct: Math.round((appointments.filter(a => a.event === et.title).length / totalEvents) * 100),
    }))
    .filter(e => e.pct > 0)
    .sort((a, b) => b.pct - a.pct);

  return (
    <AdminLayout
      title="Dashboard"
      subtitle="Überblick über Termine und Conversion"
      actions={
        <>
          <button
            onClick={() => {
              const csv = appointmentsCsv(appointments);
              downloadCsv("termine.csv", csv);
              toast.success("Export gestartet");
            }}
            className="btn-secondary hidden md:inline-flex"
          >
            <Download className="h-4 w-4" /> Export
          </button>
          <Link to="/admin/event-types" className="btn-primary"><Plus className="h-4 w-4" /> Event Typ</Link>
        </>
      }
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat label="Heute" value={String(todayCount)} change="+2" icon={Calendar} accent="from-[#3b82f6] to-[#1e40af]" trend={[3,5,2,6,4,7,6]} />
        <Stat label="Diese Woche" value={String(weekCount)} change="+14%" icon={TrendingUp} accent="from-[#22d3ee] to-[#0891b2]" trend={[12,16,14,20,22,25,28]} />
        <Stat label="Neue Leads" value="42" change="+18%" icon={Users} accent="from-[#8b5cf6] to-[#6d28d9]" trend={[20,18,25,24,30,36,42]} />
        <Stat label="Conversion" value={`${conversion}%`} change="+4%" icon={CheckCircle2} accent="from-[#34d399] to-[#059669]" trend={[55,58,60,62,63,66,68]} />
      </div>

      <div className="mt-6 grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 glass-strong p-5 md:p-6 animate-fade-up-d1">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-semibold">Kommende Termine</h3>
              <p className="text-xs text-[color:var(--color-text-muted)] mt-0.5">Nächste Buchungen</p>
            </div>
            <Link to="/admin/appointments" className="btn-ghost text-xs">Alle anzeigen <ArrowUpRight className="h-3 w-3" /></Link>
          </div>
          <div className="space-y-2">
            {todays.length === 0 && (
              <div className="text-sm text-[color:var(--color-text-muted)] py-8 text-center">Keine kommenden Termine.</div>
            )}
            {todays.map(a => (
              <Link
                key={a.id}
                to="/admin/appointments"
                className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-[color:var(--color-border)] hover:border-[rgba(59,130,246,0.35)] hover:bg-[rgba(59,130,246,0.04)] transition"
              >
                <div className="h-10 w-10 shrink-0 rounded-lg bg-gradient-to-br from-[#3b82f6] to-[#1e40af] grid place-items-center text-xs font-semibold ring-1 ring-[rgba(96,165,250,0.3)]">
                  {a.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-medium truncate">{a.name} · <span className="text-[color:var(--color-text-muted)] font-normal">{a.company}</span></div>
                  <div className="text-xs text-[color:var(--color-text-muted)] truncate">{new Date(a.time).toLocaleString("de-DE", { weekday: "short", hour: "2-digit", minute: "2-digit" })} · {a.event}</div>
                </div>
                <span className={`chip border ${statusColor(a.status)}`}>{a.status}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="glass-strong p-5 md:p-6 animate-fade-up-d2">
          <h3 className="font-semibold mb-1">Event Typen</h3>
          <p className="text-xs text-[color:var(--color-text-muted)] mb-5">Meistgewählt</p>
          <div className="space-y-3">
            {eventDistribution.map(r => (
              <div key={r.name}>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-[color:var(--color-text-muted)] truncate pr-2">{r.name}</span>
                  <span className="font-semibold">{r.pct}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#3b82f6] to-[#22d3ee] shine" style={{ width: `${r.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
          <Link to="/admin/analytics" className="mt-5 btn-ghost text-xs">Mehr Statistiken <ArrowUpRight className="h-3 w-3" /></Link>
        </div>
      </div>

      <div className="mt-6 grid lg:grid-cols-2 gap-4">
        <div className="glass-strong p-5 md:p-6 animate-fade-up-d2">
          <h3 className="font-semibold mb-4">Leads nach Branche</h3>
          <div className="space-y-2">
            {Array.from(appointments.reduce((m, a) => m.set(a.industry, (m.get(a.industry) ?? 0) + 1), new Map<string, number>()))
              .sort((a, b) => b[1] - a[1])
              .slice(0, 6)
              .map(([n, c]) => (
                <div key={n} className="flex items-center justify-between text-sm py-1.5">
                  <span className="text-[color:var(--color-text-muted)]">{n}</span>
                  <span className="font-semibold">{c}</span>
                </div>
              ))}
          </div>
        </div>

        <div className="glass-strong p-5 md:p-6 animate-fade-up-d3">
          <h3 className="font-semibold mb-4">Kalenderauslastung</h3>
          <div className="grid grid-cols-7 gap-2">
            {["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"].map((d, i) => {
              const h = [70, 90, 60, 85, 75, 15, 5][i];
              return (
                <div key={d} className="flex flex-col items-center gap-2 group">
                  <div className="h-32 w-full rounded-lg bg-white/[0.03] flex items-end overflow-hidden border border-[color:var(--color-border)] group-hover:border-[rgba(59,130,246,0.35)] transition">
                    <div className="w-full bg-gradient-to-t from-[#3b82f6] to-[#22d3ee] rounded-md transition-all group-hover:brightness-110" style={{ height: `${h}%` }} />
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

export function appointmentsCsv(rows: { name: string; company: string; industry: string; time: string; event: string; status: string }[]) {
  const head = ["Name", "Firma", "Branche", "Termin", "Event", "Status"].join(";");
  const body = rows
    .map(r => [r.name, r.company, r.industry, r.time, r.event, r.status].map(v => `"${String(v).replace(/"/g, '""')}"`).join(";"))
    .join("\n");
  return head + "\n" + body;
}

export function downloadCsv(filename: string, csv: string) {
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function Sparkline({ data, color = "#60a5fa" }: { data: number[]; color?: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = 100 - ((v - min) / range) * 100;
    return `${x},${y}`;
  }).join(" ");
  const id = `g-${color.replace("#", "")}`;
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-8">
      <defs>
        <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.4" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline points={points} fill="none" stroke={color} strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" />
      <polygon points={`0,100 ${points} 100,100`} fill={`url(#${id})`} />
    </svg>
  );
}

function Stat({ label, value, change, icon: Icon, accent, trend }: { label: string; value: string; change: string; icon: any; accent: string; trend: number[] }) {
  return (
    <div className="glass-strong card-hover p-5 animate-fade-up relative overflow-hidden">
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[rgba(59,130,246,0.12)] blur-2xl pointer-events-none" />
      <div className="relative flex items-start justify-between">
        <div className={`h-9 w-9 rounded-lg bg-gradient-to-br ${accent} grid place-items-center shadow-lg`}>
          <Icon className="h-4 w-4 text-white" />
        </div>
      </div>
      <div className="relative mt-4 text-2xl md:text-3xl font-bold tracking-tight">{value}</div>
      <div className="relative mt-1 flex items-center gap-2 text-xs">
        <span className="text-[color:var(--color-text-muted)]">{label}</span>
        <span className="text-[color:var(--color-success)] font-medium inline-flex items-center gap-0.5"><ArrowUpRight className="h-3 w-3" />{change}</span>
      </div>
      <div className="relative mt-3 -mx-1">
        <Sparkline data={trend} />
      </div>
    </div>
  );
}
