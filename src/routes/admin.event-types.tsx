import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/AdminLayout";
import { useEventTypes } from "@/lib/admin-storage";
import { Modal } from "@/components/Modal";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import type { EventType } from "@/lib/types";
import { Clock, Edit2, Link2, Plus, Video, Trash2, Power } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/event-types")({ component: EventTypes });

const COLORS = [
  "from-[#3b82f6] to-[#1e40af]",
  "from-[#22d3ee] to-[#0891b2]",
  "from-[#8b5cf6] to-[#6d28d9]",
  "from-[#34d399] to-[#059669]",
  "from-[#fbbf24] to-[#d97706]",
  "from-[#f87171] to-[#b91c1c]",
];

const MEETING_TYPES: EventType["meetingType"][] = ["Google Meet", "Zoom", "Microsoft Teams", "Telefon"];

function emptyEvent(): EventType {
  return {
    id: `et-${Date.now()}`,
    slug: "neuer-termin",
    title: "Neuer Event Typ",
    description: "",
    durationMinutes: 30,
    color: COLORS[0],
    benefits: [],
    isActive: true,
    meetingType: "Google Meet",
  };
}

function EventTypes() {
  const [eventTypes, setEventTypes] = useEventTypes();
  const [editing, setEditing] = useState<EventType | null>(null);
  const [deleting, setDeleting] = useState<EventType | null>(null);

  const toggleActive = (id: string) => {
    setEventTypes(prev => prev.map(e => e.id === id ? { ...e, isActive: !e.isActive } : e));
    toast.success("Status aktualisiert");
  };

  const save = (et: EventType) => {
    setEventTypes(prev => prev.some(e => e.id === et.id) ? prev.map(e => e.id === et.id ? et : e) : [...prev, et]);
    toast.success("Event Typ gespeichert");
    setEditing(null);
  };

  const remove = (id: string) => {
    setEventTypes(prev => prev.filter(e => e.id !== id));
    toast.success("Event Typ gelöscht");
  };

  const copyLink = (et: EventType) => {
    const url = `${window.location.origin}/book?event=${et.slug}`;
    navigator.clipboard.writeText(url);
    toast.success("Link kopiert", { description: url });
  };

  return (
    <AdminLayout
      title="Event Typen"
      subtitle={`${eventTypes.filter(e => e.isActive).length} aktive · ${eventTypes.length} gesamt`}
      actions={
        <button onClick={() => setEditing(emptyEvent())} className="btn-primary">
          <Plus className="h-4 w-4" /> Neuer Event Typ
        </button>
      }
    >
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {eventTypes.map((et, idx) => (
          <div key={et.id} style={{ animationDelay: `${idx * 50}ms` }} className="glass-strong card-hover p-5 flex flex-col animate-fade-up">
            <div className="flex items-start justify-between mb-4">
              <div className={`h-11 w-11 rounded-xl bg-gradient-to-br ${et.color} grid place-items-center`}>
                <Video className="h-5 w-5 text-white" />
              </div>
              <button
                onClick={() => toggleActive(et.id)}
                className={`chip border cursor-pointer transition ${et.isActive ? "bg-[rgba(52,211,153,0.12)] text-[#34d399] border-[rgba(52,211,153,0.25)]" : "bg-white/[0.03] text-[color:var(--color-text-muted)] border-[color:var(--color-border)]"}`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${et.isActive ? "bg-[color:var(--color-success)]" : "bg-[color:var(--color-text-dim)]"}`} />
                {et.isActive ? "Aktiv" : "Inaktiv"}
              </button>
            </div>
            <h3 className="font-semibold">{et.title}</h3>
            <div className="mt-1 flex items-center gap-2 text-xs text-[color:var(--color-text-muted)]">
              <Clock className="h-3.5 w-3.5" /> {et.durationMinutes} Minuten · {et.meetingType}
            </div>
            <p className="mt-3 text-sm text-[color:var(--color-text-muted)] flex-1 line-clamp-3">{et.description}</p>
            <div className="mt-4 pt-4 border-t border-[color:var(--color-border)] grid grid-cols-3 gap-2">
              <button className="btn-secondary !px-2 text-xs" onClick={() => setEditing(et)}>
                <Edit2 className="h-3.5 w-3.5" /> Bearbeiten
              </button>
              <button className="btn-secondary !px-2 text-xs" onClick={() => copyLink(et)}>
                <Link2 className="h-3.5 w-3.5" /> Link
              </button>
              <button className="btn-ghost !px-2 text-xs hover:!text-[#f87171]" onClick={() => setDeleting(et)}>
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <EventEditor
          event={editing}
          onClose={() => setEditing(null)}
          onSave={save}
        />
      )}

      <ConfirmDialog
        open={!!deleting}
        onClose={() => setDeleting(null)}
        onConfirm={() => deleting && remove(deleting.id)}
        title={`„${deleting?.title}" löschen?`}
        message="Bereits gebuchte Termine bleiben bestehen, neue Buchungen sind danach nicht mehr möglich."
        confirmLabel="Löschen"
        destructive
      />
    </AdminLayout>
  );
}

function EventEditor({ event, onClose, onSave }: { event: EventType; onClose: () => void; onSave: (e: EventType) => void }) {
  const [draft, setDraft] = useState<EventType>(event);
  const upd = <K extends keyof EventType>(k: K, v: EventType[K]) => setDraft(d => ({ ...d, [k]: v }));

  return (
    <Modal
      open
      onClose={onClose}
      title={event.title ? `„${event.title}" bearbeiten` : "Neuer Event Typ"}
      description="Diese Einstellungen erscheinen sofort auf deiner Buchungsseite."
      size="lg"
      footer={
        <>
          <button className="btn-secondary" onClick={onClose}>Abbrechen</button>
          <button
            className="btn-primary"
            onClick={() => {
              if (!draft.title.trim()) return toast.error("Titel ist erforderlich");
              onSave({ ...draft, slug: draft.slug.trim() || draft.title.toLowerCase().replace(/\s+/g, "-") });
            }}
          >
            Speichern
          </button>
        </>
      }
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Titel"><input className="input-field" value={draft.title} onChange={e => upd("title", e.target.value)} /></Field>
        <Field label="URL Slug"><input className="input-field" value={draft.slug} onChange={e => upd("slug", e.target.value)} /></Field>
        <Field label="Dauer (Minuten)">
          <select className="input-field" value={draft.durationMinutes} onChange={e => upd("durationMinutes", Number(e.target.value))}>
            {[15, 30, 45, 60, 90].map(n => <option key={n} value={n} className="bg-[#0e1426]">{n} Minuten</option>)}
          </select>
        </Field>
        <Field label="Meeting Typ">
          <select className="input-field" value={draft.meetingType} onChange={e => upd("meetingType", e.target.value as EventType["meetingType"])}>
            {MEETING_TYPES.map(m => <option key={m} value={m} className="bg-[#0e1426]">{m}</option>)}
          </select>
        </Field>
        <div className="sm:col-span-2">
          <Field label="Beschreibung">
            <textarea
              rows={3}
              className="input-field resize-none"
              value={draft.description}
              onChange={e => upd("description", e.target.value)}
            />
          </Field>
        </div>
        <div className="sm:col-span-2">
          <span className="text-xs font-medium text-[color:var(--color-text-muted)] mb-2 block">Farbe</span>
          <div className="flex flex-wrap gap-2">
            {COLORS.map(c => (
              <button
                key={c}
                onClick={() => upd("color", c)}
                className={`h-9 w-9 rounded-lg bg-gradient-to-br ${c} ring-2 transition ${draft.color === c ? "ring-white" : "ring-transparent"}`}
              />
            ))}
          </div>
        </div>
        <div className="sm:col-span-2">
          <Field label="Vorteile (eine pro Zeile)">
            <textarea
              rows={4}
              className="input-field resize-none"
              value={draft.benefits.join("\n")}
              onChange={e => upd("benefits", e.target.value.split("\n").map(s => s.trim()).filter(Boolean))}
            />
          </Field>
        </div>
        <div className="sm:col-span-2 flex items-center justify-between glass p-3 rounded-lg">
          <div className="flex items-center gap-2 text-sm">
            <Power className="h-4 w-4" />
            <span>Aktiv – auf Buchungsseite sichtbar</span>
          </div>
          <button
            type="button"
            onClick={() => upd("isActive", !draft.isActive)}
            className={`relative h-6 w-11 rounded-full transition ${draft.isActive ? "bg-[color:var(--color-brand)]" : "bg-white/10"}`}
          >
            <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${draft.isActive ? "translate-x-5" : "translate-x-0.5"}`} />
          </button>
        </div>
      </div>
    </Modal>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-[color:var(--color-text-muted)] mb-1.5 block">{label}</span>
      {children}
    </label>
  );
}
