import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/AdminLayout";
import { statusColor } from "@/lib/sovoice-data";
import { useAppointments, type AppointmentRow } from "@/lib/admin-storage";
import { Modal } from "@/components/Modal";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { Search, Filter, Download, MoreHorizontal, Mail, RefreshCcw, Trash2, CheckCircle2, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { appointmentsCsv, downloadCsv } from "./admin.index";

export const Route = createFileRoute("/admin/appointments")({ component: AppointmentsPage });

const STATUS_OPTIONS: AppointmentRow["status"][] = ["Bestätigt", "Offen", "Verschoben", "Storniert", "Abgeschlossen"];

function AppointmentsPage() {
  const [appointments, setAppointments] = useAppointments();
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<string>("Alle");
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [detail, setDetail] = useState<AppointmentRow | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<AppointmentRow | null>(null);
  const [reschedule, setReschedule] = useState<AppointmentRow | null>(null);

  const filtered = useMemo(
    () =>
      appointments.filter(
        a =>
          (status === "Alle" || a.status === status) &&
          (a.name.toLowerCase().includes(q.toLowerCase()) || a.company.toLowerCase().includes(q.toLowerCase())),
      ),
    [appointments, q, status],
  );

  const updateStatus = (id: string, s: AppointmentRow["status"]) => {
    setAppointments(prev => prev.map(a => (a.id === id ? { ...a, status: s } : a)));
    toast.success(`Status aktualisiert: ${s}`);
  };
  const deleteRow = (id: string) => {
    setAppointments(prev => prev.filter(a => a.id !== id));
    toast.success("Termin gelöscht");
  };

  return (
    <AdminLayout
      title="Termine"
      subtitle={`${filtered.length} von ${appointments.length} Buchungen`}
      actions={
        <button
          onClick={() => {
            downloadCsv("termine.csv", appointmentsCsv(filtered));
            toast.success("Export gestartet");
          }}
          className="btn-secondary hidden md:inline-flex"
        >
          <Download className="h-4 w-4" /> Export
        </button>
      }
    >
      <div className="glass-strong p-4 md:p-5 mb-4">
        <div className="grid md:grid-cols-[1fr_auto_auto] gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[color:var(--color-text-dim)]" />
            <input
              value={q}
              onChange={e => setQ(e.target.value)}
              placeholder="Name oder Firma suchen..."
              className="input-field pl-9"
            />
          </div>
          <select value={status} onChange={e => setStatus(e.target.value)} className="input-field md:w-48">
            {["Alle", ...STATUS_OPTIONS].map(s => (
              <option key={s} value={s} className="bg-[#0e1426]">{s}</option>
            ))}
          </select>
          <button
            className="btn-secondary"
            onClick={() => {
              setQ("");
              setStatus("Alle");
              toast.success("Filter zurückgesetzt");
            }}
          >
            <Filter className="h-4 w-4" /> Reset
          </button>
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
                <th className="px-5 py-3 font-medium w-12"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(a => (
                <tr key={a.id} className="border-b border-[color:var(--color-border)] hover:bg-white/[0.02] transition">
                  <td className="px-5 py-3.5">
                    <button onClick={() => setDetail(a)} className="flex items-center gap-3 text-left hover:text-[#60a5fa] transition">
                      <div className="h-8 w-8 shrink-0 rounded-full bg-gradient-to-br from-[#3b82f6] to-[#1e40af] grid place-items-center text-[11px] font-semibold">
                        {a.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                      </div>
                      <span className="font-medium">{a.name}</span>
                    </button>
                  </td>
                  <td className="px-5 py-3.5 text-[color:var(--color-text-muted)]">{a.company}</td>
                  <td className="px-5 py-3.5 text-[color:var(--color-text-muted)]">{a.industry}</td>
                  <td className="px-5 py-3.5 text-[color:var(--color-text-muted)] whitespace-nowrap">
                    {new Date(a.time).toLocaleString("de-DE", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}
                  </td>
                  <td className="px-5 py-3.5">{a.event}</td>
                  <td className="px-5 py-3.5"><span className={`chip border ${statusColor(a.status)}`}>{a.status}</span></td>
                  <td className="px-5 py-3.5 relative">
                    <RowMenu
                      open={openMenu === a.id}
                      setOpen={v => setOpenMenu(v ? a.id : null)}
                      onView={() => setDetail(a)}
                      onReschedule={() => setReschedule(a)}
                      onConfirm={() => updateStatus(a.id, "Bestätigt")}
                      onCancel={() => updateStatus(a.id, "Storniert")}
                      onMail={() => {
                        navigator.clipboard.writeText(`${a.name}`);
                        toast.success("Mail-Vorlage in Zwischenablage kopiert");
                      }}
                      onDelete={() => setConfirmDelete(a)}
                    />
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-10 text-center text-sm text-[color:var(--color-text-muted)]">
                    Keine Termine gefunden.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {filtered.map(a => (
          <button
            key={a.id}
            onClick={() => setDetail(a)}
            className="block w-full text-left glass-strong p-4"
          >
            <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 items-start">
              <div className="min-w-0">
                <div className="font-semibold truncate">{a.name}</div>
                <div className="text-xs text-[color:var(--color-text-muted)] truncate">{a.company} · {a.industry}</div>
              </div>
              <span className={`chip border shrink-0 ${statusColor(a.status)}`}>{a.status}</span>
            </div>
            <div className="mt-3 pt-3 border-t border-[color:var(--color-border)] flex items-center justify-between text-xs text-[color:var(--color-text-muted)]">
              <span>{new Date(a.time).toLocaleString("de-DE", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}</span>
              <span>{a.event}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Detail modal */}
      {detail && (
        <Modal
          open
          onClose={() => setDetail(null)}
          title={detail.name}
          description={`${detail.company} · ${detail.industry}`}
          footer={
            <>
              <button className="btn-secondary" onClick={() => setReschedule(detail)}>
                <RefreshCcw className="h-3.5 w-3.5" /> Verschieben
              </button>
              <button className="btn-secondary" onClick={() => { updateStatus(detail.id, "Storniert"); setDetail(null); }}>
                <X className="h-3.5 w-3.5" /> Stornieren
              </button>
              <button className="btn-primary" onClick={() => { updateStatus(detail.id, "Bestätigt"); setDetail(null); }}>
                <CheckCircle2 className="h-3.5 w-3.5" /> Bestätigen
              </button>
            </>
          }
        >
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <Field label="Termin" value={new Date(detail.time).toLocaleString("de-DE", { dateStyle: "full", timeStyle: "short" })} />
            <Field label="Event Typ" value={detail.event} />
            <Field label="Status" value={detail.status} />
            <Field label="Branche" value={detail.industry} />
            <div className="sm:col-span-2">
              <div className="text-xs text-[color:var(--color-text-muted)] mb-1">Status ändern</div>
              <div className="flex flex-wrap gap-2">
                {STATUS_OPTIONS.map(s => (
                  <button
                    key={s}
                    onClick={() => updateStatus(detail.id, s)}
                    className={`chip border cursor-pointer ${detail.status === s ? statusColor(s) : "border-[color:var(--color-border)] text-[color:var(--color-text-muted)] hover:text-white"}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            {detail.notes && (
              <div className="sm:col-span-2">
                <div className="text-xs text-[color:var(--color-text-muted)] mb-1">Notiz</div>
                <div className="glass p-3 rounded-lg text-sm">{detail.notes}</div>
              </div>
            )}
          </div>
        </Modal>
      )}

      {/* Reschedule modal */}
      {reschedule && (
        <RescheduleModal
          appointment={reschedule}
          onClose={() => setReschedule(null)}
          onSave={(newTime) => {
            setAppointments(prev => prev.map(a => a.id === reschedule.id ? { ...a, time: newTime, status: "Verschoben" } : a));
            toast.success("Termin verschoben");
            setReschedule(null);
            setDetail(null);
          }}
        />
      )}

      <ConfirmDialog
        open={!!confirmDelete}
        onClose={() => setConfirmDelete(null)}
        onConfirm={() => confirmDelete && deleteRow(confirmDelete.id)}
        title="Termin löschen?"
        message="Diese Aktion kann nicht rückgängig gemacht werden."
        confirmLabel="Löschen"
        destructive
      />
    </AdminLayout>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs text-[color:var(--color-text-muted)] mb-1">{label}</div>
      <div className="font-medium">{value}</div>
    </div>
  );
}

function RowMenu({
  open, setOpen, onView, onReschedule, onConfirm, onCancel, onMail, onDelete,
}: {
  open: boolean; setOpen: (v: boolean) => void;
  onView: () => void; onReschedule: () => void; onConfirm: () => void; onCancel: () => void; onMail: () => void; onDelete: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [open, setOpen]);

  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen(!open)} className="btn-ghost p-1"><MoreHorizontal className="h-4 w-4" /></button>
      {open && (
        <div className="absolute right-0 top-full mt-1 w-48 glass-strong rounded-lg p-1 z-20 shadow-xl">
          <MenuItem icon={Search} label="Details" onClick={() => { onView(); setOpen(false); }} />
          <MenuItem icon={CheckCircle2} label="Bestätigen" onClick={() => { onConfirm(); setOpen(false); }} />
          <MenuItem icon={RefreshCcw} label="Verschieben" onClick={() => { onReschedule(); setOpen(false); }} />
          <MenuItem icon={X} label="Stornieren" onClick={() => { onCancel(); setOpen(false); }} />
          <MenuItem icon={Mail} label="Mail-Vorlage" onClick={() => { onMail(); setOpen(false); }} />
          <div className="my-1 h-px bg-[color:var(--color-border)]" />
          <MenuItem icon={Trash2} label="Löschen" danger onClick={() => { onDelete(); setOpen(false); }} />
        </div>
      )}
    </div>
  );
}

function MenuItem({ icon: Icon, label, onClick, danger }: { icon: any; label: string; onClick: () => void; danger?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-sm text-left transition ${danger ? "text-[#f87171] hover:bg-[rgba(248,113,113,0.1)]" : "hover:bg-white/5"}`}
    >
      <Icon className="h-3.5 w-3.5" /> {label}
    </button>
  );
}

function RescheduleModal({ appointment, onClose, onSave }: { appointment: AppointmentRow; onClose: () => void; onSave: (iso: string) => void }) {
  const [value, setValue] = useState(appointment.time.slice(0, 16));
  return (
    <Modal
      open
      onClose={onClose}
      title="Termin verschieben"
      description={`${appointment.name} · ${appointment.event}`}
      size="sm"
      footer={
        <>
          <button className="btn-secondary" onClick={onClose}>Abbrechen</button>
          <button className="btn-primary" onClick={() => onSave(value)}>Speichern</button>
        </>
      }
    >
      <label className="block">
        <span className="text-xs text-[color:var(--color-text-muted)] mb-1.5 block">Neue Terminzeit</span>
        <input type="datetime-local" value={value} onChange={e => setValue(e.target.value)} className="input-field" />
      </label>
    </Modal>
  );
}
