import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/AdminLayout";
import { SEED_APPOINTMENTS, EVENT_TYPES } from "@/lib/sovoice-data";
import { TrendingUp, Users, CalendarCheck, XCircle } from "lucide-react";

export const Route = createFileRoute("/admin/analytics")({ component: Analytics });

function Analytics() {
  const total = SEED_APPOINTMENTS.length;
  const confirmed = SEED_APPOINTMENTS.filter(a => a.status === "Bestätigt" || a.status === "Abgeschlossen").length;
  const cancelled = SEED_APPOINTMENTS.filter(a => a.status === "Storniert").length;
  const conversion = Math.round((confirmed / total) * 100);

  const byEvent = EVENT_TYPES.map(et => ({
    name: et.title,
    count: SEED_APPOINTMENTS.filter(a => a.event === et.title).length,
  })).sort((a,b) => b.count - a.count);
  const maxEvent = Math.max(1, ...byEvent.map(e => e.count));

  const byIndustry = Array.from(
    SEED_APPOINTMENTS.reduce((m, a) => m.set(a.industry, (m.get(a.industry) ?? 0) + 1), new Map<string, number>()),
  ).sort((a,b) => b[1] - a[1]);
  const maxInd = Math.max(1, ...byIndustry.map(x => x[1]));

  return (
    <AdminLayout title="Analytics" subtitle="Performance, Conversion und Auslastung">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card icon={CalendarCheck} label="Buchungen gesamt" value={String(total)} accent="from-[#3b82f6] to-[#1e40af]" />
        <Card icon={TrendingUp} label="Conversion Rate" value={`${conversion}%`} accent="from-[#22d3ee] to-[#0891b2]" />
        <Card icon={Users} label="Neue Leads (30T)" value="42" accent="from-[#8b5cf6] to-[#6d28d9]" />
        <Card icon={XCircle} label="Stornierungen" value={String(cancelled)} accent="from-[#f87171] to-[#b91c1c]" />
      </div>

      <div className="mt-6 grid lg:grid-cols-2 gap-4">
        <div className="glass-strong p-5 md:p-6">
          <h3 className="font-semibold mb-1">Meistgewählte Event Typen</h3>
          <p className="text-xs text-[color:var(--color-text-muted)] mb-5">Verteilung über alle Buchungen</p>
          <div className="space-y-3">
            {byEvent.map(r => (
              <div key={r.name}>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-[color:var(--color-text-muted)]">{r.name}</span>
                  <span className="font-semibold">{r.count}</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#3b82f6] to-[#22d3ee]" style={{ width: `${(r.count / maxEvent) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-strong p-5 md:p-6">
          <h3 className="font-semibold mb-1">Leads nach Branche</h3>
          <p className="text-xs text-[color:var(--color-text-muted)] mb-5">Top Branchen aus aktuellen Buchungen</p>
          <div className="space-y-3">
            {byIndustry.map(([name, count]) => (
              <div key={name}>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-[color:var(--color-text-muted)]">{name}</span>
                  <span className="font-semibold">{count}</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#8b5cf6] to-[#22d3ee]" style={{ width: `${(count / maxInd) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

function Card({ icon: Icon, label, value, accent }: { icon: any; label: string; value: string; accent: string }) {
  return (
    <div className="glass-strong p-5">
      <div className={`h-9 w-9 rounded-lg bg-gradient-to-br ${accent} grid place-items-center`}>
        <Icon className="h-4 w-4 text-white" />
      </div>
      <div className="mt-4 text-2xl md:text-3xl font-bold">{value}</div>
      <div className="mt-1 text-xs text-[color:var(--color-text-muted)]">{label}</div>
    </div>
  );
}
