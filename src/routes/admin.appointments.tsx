import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/AdminLayout";
import { APPOINTMENTS, statusColor, INDUSTRIES } from "@/lib/sovoice-data";
import { Search, Filter, Download, MoreHorizontal } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/admin/appointments")({ component: AppointmentsPage });

function AppointmentsPage() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<string>("Alle");
  const filtered = APPOINTMENTS.filter(a =>
    (status === "Alle" || a.status === status) &&
    (a.name.toLowerCase().includes(q.toLowerCase()) || a.company.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <AdminLayout title="Termine" subtitle="Alle Buchungen verwalten" actions={
      <button className="btn-secondary hidden md:inline-flex"><Download className="h-4 w-4" /> Export</button>
    }>
      <div className="glass-strong p-4 md:p-5 mb-4">
        <div className="grid md:grid-cols-[1fr_auto_auto] gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[color:var(--color-text-dim)]" />
            <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Name oder Firma suchen..." className="input-field pl-9" />
          </div>
          <select value={status} onChange={e=>setStatus(e.target.value)} className="input-field md:w-48">
            {["Alle","Bestätigt","Offen","Verschoben","Storniert","Abgeschlossen"].map(s => <option key={s} value={s} className="bg-[#0e1426]">{s}</option>)}
          </select>
          <button className="btn-secondary"><Filter className="h-4 w-4" /> Filter</button>
        </div>
      </div>

      {/* Desktop table */}
      <div className="glass-strong overflow-hidden hidden md:block">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-white/[0.02] border-b border-[color:var(--color-border)]">
              <tr className="text-left text-xs uppercase tracking-wider text-[color:var(--color-text-muted)]">
                <th className="px-5 py-3 font-medium">Name</th>
                <th className="px-5 py-3 font-medium">Firma</th>
                <th className="px-5 py-3 font-medium">Branche</th>
                <th className="px-5 py-3 font-medium">Terminzeit</th>
                <th className="px-5 py-3 font-medium">Event Typ</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(a => (
                <tr key={a.id} className="border-b border-[color:var(--color-border)] hover:bg-white/[0.02]">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 shrink-0 rounded-full bg-gradient-to-br from-[#3b82f6] to-[#1e40af] grid place-items-center text-[11px] font-semibold">{a.name.split(" ").map(n=>n[0]).join("").slice(0,2)}</div>
                      <span className="font-medium">{a.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-[color:var(--color-text-muted)]">{a.company}</td>
                  <td className="px-5 py-3.5 text-[color:var(--color-text-muted)]">{a.industry}</td>
                  <td className="px-5 py-3.5 text-[color:var(--color-text-muted)] whitespace-nowrap">{new Date(a.time).toLocaleString("de-DE", { day:"2-digit", month:"short", hour:"2-digit", minute:"2-digit" })}</td>
                  <td className="px-5 py-3.5">{a.event}</td>
                  <td className="px-5 py-3.5"><span className={`chip border ${statusColor(a.status)}`}>{a.status}</span></td>
                  <td className="px-5 py-3.5"><button className="btn-ghost p-1"><MoreHorizontal className="h-4 w-4" /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {filtered.map(a => (
          <div key={a.id} className="glass-strong p-4">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 items-start">
              <div className="min-w-0">
                <div className="font-semibold truncate">{a.name}</div>
                <div className="text-xs text-[color:var(--color-text-muted)] truncate">{a.company} · {a.industry}</div>
              </div>
              <span className={`chip border shrink-0 ${statusColor(a.status)}`}>{a.status}</span>
            </div>
            <div className="mt-3 pt-3 border-t border-[color:var(--color-border)] flex items-center justify-between text-xs text-[color:var(--color-text-muted)]">
              <span>{new Date(a.time).toLocaleString("de-DE", { day:"2-digit", month:"short", hour:"2-digit", minute:"2-digit" })}</span>
              <span>{a.event}</span>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
