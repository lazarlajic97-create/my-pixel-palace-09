import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/AdminLayout";
import { useIntegrations } from "@/lib/admin-storage";
import type { Integration } from "@/lib/types";
import { Modal } from "@/components/Modal";
import { Calendar, Video, Mail, MessageSquare, Webhook, Plug, Settings as SettingsIcon, AlertTriangle } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/integrations")({ component: Integrations });

const ICONS: Record<string, any> = {
  Kalender: Calendar,
  Meeting: Video,
  CRM: Plug,
  Automation: Webhook,
  Benachrichtigung: Mail,
};
const FALLBACK = (i: Integration) => i.name.toLowerCase().includes("sms") ? MessageSquare : ICONS[i.category] ?? Plug;

function Integrations() {
  const [items, setItems] = useIntegrations();
  const [filter, setFilter] = useState<string>("Alle");
  const [config, setConfig] = useState<Integration | null>(null);

  const cats = ["Alle", ...Array.from(new Set(items.map(i => i.category)))];
  const filtered = useMemo(() => items.filter(i => filter === "Alle" || i.category === filter), [items, filter]);

  const setStatus = (id: string, status: Integration["status"]) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, status } : i));
  };

  return (
    <AdminLayout title="Integrationen" subtitle="Verbinde SoVoice Calendar mit deinen Tools">
      <div className="flex flex-wrap gap-2 mb-4">
        {cats.map(c => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`chip border cursor-pointer transition ${filter === c ? "bg-[rgba(37,99,235,0.18)] text-white border-[rgba(59,130,246,0.4)]" : "border-[color:var(--color-border)] text-[color:var(--color-text-muted)] hover:text-white"}`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((i, idx) => {
          const Icon = FALLBACK(i);
          const connected = i.status === "Verbunden";
          const error = i.status === "Fehler";
          return (
            <div key={i.id} style={{ animationDelay: `${idx * 40}ms` }} className="glass-strong card-hover p-5 animate-fade-up flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <div className="h-11 w-11 rounded-xl bg-white/5 border border-[color:var(--color-border-strong)] grid place-items-center">
                  <Icon className="h-5 w-5 text-[#60a5fa]" />
                </div>
                <span className={`chip border ${
                  connected ? "bg-[rgba(52,211,153,0.12)] text-[#34d399] border-[rgba(52,211,153,0.25)]"
                  : error ? "bg-[rgba(248,113,113,0.12)] text-[#f87171] border-[rgba(248,113,113,0.25)]"
                  : "bg-white/[0.03] text-[color:var(--color-text-muted)] border-[color:var(--color-border)]"
                }`}>
                  {error && <AlertTriangle className="h-3 w-3" />}
                  {!error && <span className={`h-1.5 w-1.5 rounded-full ${connected ? "bg-[color:var(--color-success)]" : "bg-[color:var(--color-text-dim)]"}`} />}
                  {i.status}
                </span>
              </div>
              <h3 className="font-semibold">{i.name}</h3>
              <p className="mt-1 text-sm text-[color:var(--color-text-muted)] flex-1">{i.description}</p>
              <div className="mt-4 flex gap-2">
                {connected ? (
                  <>
                    <button className="btn-secondary flex-1" onClick={() => setConfig(i)}>
                      <SettingsIcon className="h-3.5 w-3.5" /> Konfigurieren
                    </button>
                    <button
                      className="btn-ghost hover:!text-[#f87171]"
                      onClick={() => { setStatus(i.id, "Nicht verbunden"); toast.success(`${i.name} getrennt`); }}
                    >
                      Trennen
                    </button>
                  </>
                ) : (
                  <button
                    className="btn-primary flex-1"
                    onClick={() => { setStatus(i.id, "Verbunden"); toast.success(`${i.name} verbunden`); }}
                  >
                    Verbinden
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {config && (
        <Modal
          open
          onClose={() => setConfig(null)}
          title={`${config.name} konfigurieren`}
          description={config.description}
          footer={
            <>
              <button className="btn-secondary" onClick={() => setConfig(null)}>Abbrechen</button>
              <button className="btn-primary" onClick={() => { toast.success("Konfiguration gespeichert"); setConfig(null); }}>
                Speichern
              </button>
            </>
          }
        >
          <div className="space-y-3 text-sm">
            <Row k="Anbieter" v={config.provider} />
            <Row k="Kategorie" v={config.category} />
            <Row k="Status" v={config.status} />
            <label className="block pt-2">
              <span className="text-xs text-[color:var(--color-text-muted)] mb-1.5 block">Webhook URL</span>
              <input className="input-field" defaultValue={`https://sovoice-calendar.com/api/webhooks/${config.id}`} />
            </label>
          </div>
        </Modal>
      )}
    </AdminLayout>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-[color:var(--color-border)]">
      <span className="text-xs text-[color:var(--color-text-muted)]">{k}</span>
      <span className="font-medium">{v}</span>
    </div>
  );
}
