import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/AdminLayout";
import { EVENT_TYPES } from "@/lib/sovoice-data";
import { Clock, Edit2, Link2, Plus, Video } from "lucide-react";

export const Route = createFileRoute("/admin/event-types")({ component: EventTypes });

function EventTypes() {
  return (
    <AdminLayout title="Event Typen" subtitle="Verfügbare Terminarten verwalten" actions={
      <button className="btn-primary"><Plus className="h-4 w-4" /> Neuer Event Typ</button>
    }>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {EVENT_TYPES.map(et => (
          <div key={et.id} className="glass-strong p-5 flex flex-col">
            <div className="flex items-start justify-between mb-4">
              <div className={`h-11 w-11 rounded-xl bg-gradient-to-br ${et.color} grid place-items-center`}>
                <Video className="h-5 w-5 text-white" />
              </div>
              <span className="chip"><span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-success)]" /> Aktiv</span>
            </div>
            <h3 className="font-semibold">{et.title}</h3>
            <div className="mt-1 flex items-center gap-2 text-xs text-[color:var(--color-text-muted)]">
              <Clock className="h-3.5 w-3.5" /> {et.durationMinutes} Minuten · {et.meetingType}
            </div>
            <p className="mt-3 text-sm text-[color:var(--color-text-muted)] flex-1">{et.description}</p>
            <div className="mt-4 pt-4 border-t border-[color:var(--color-border)] flex gap-2">
              <button className="btn-secondary flex-1"><Edit2 className="h-3.5 w-3.5" /> Bearbeiten</button>
              <button className="btn-secondary flex-1"><Link2 className="h-3.5 w-3.5" /> Link kopieren</button>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
