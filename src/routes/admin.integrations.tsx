import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/AdminLayout";
import { Calendar, Video, Mail, MessageSquare, Webhook, Plug, Settings as SettingsIcon } from "lucide-react";

export const Route = createFileRoute("/admin/integrations")({ component: Integrations });

const INTS = [
  { name: "Google Calendar", desc: "Termine automatisch in Google Calendar synchronisieren.", icon: Calendar, status: "connected" },
  { name: "Outlook Calendar", desc: "Microsoft 365 Kalender Anbindung.", icon: Calendar, status: "disconnected" },
  { name: "Zoom", desc: "Automatische Zoom Meeting Links generieren.", icon: Video, status: "connected" },
  { name: "Google Meet", desc: "Meet Links für jeden Termin.", icon: Video, status: "connected" },
  { name: "Microsoft Teams", desc: "Teams Meeting Integration.", icon: Video, status: "disconnected" },
  { name: "CRM", desc: "Leads direkt in dein CRM übertragen.", icon: Plug, status: "disconnected" },
  { name: "Zapier", desc: "Verknüpfe SoVoice mit über 5000 Tools.", icon: Webhook, status: "disconnected" },
  { name: "Webhook", desc: "Eigene Endpunkte bei Ereignissen aufrufen.", icon: Webhook, status: "disconnected" },
  { name: "E Mail Benachrichtigung", desc: "Automatische Bestätigungen und Erinnerungen.", icon: Mail, status: "connected" },
  { name: "SMS Benachrichtigung", desc: "Terminerinnerungen per SMS.", icon: MessageSquare, status: "disconnected" },
];

function Integrations() {
  return (
    <AdminLayout title="Integrationen" subtitle="Verbinde SoVoice Calendar mit deinen Tools">
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {INTS.map(({ icon: Icon, ...i }) => {
          const connected = i.status === "connected";
          return (
            <div key={i.name} className="glass-strong p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="h-11 w-11 rounded-xl bg-white/5 border border-[color:var(--color-border-strong)] grid place-items-center">
                  <Icon className="h-5 w-5 text-[#60a5fa]" />
                </div>
                <span className={`chip border ${connected ? "bg-[rgba(52,211,153,0.12)] text-[#34d399] border-[rgba(52,211,153,0.25)]" : "bg-white/[0.03] text-[color:var(--color-text-muted)]"}`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${connected ? "bg-[color:var(--color-success)]" : "bg-[color:var(--color-text-dim)]"}`} />
                  {connected ? "Verbunden" : "Nicht verbunden"}
                </span>
              </div>
              <h3 className="font-semibold">{i.name}</h3>
              <p className="mt-1 text-sm text-[color:var(--color-text-muted)] line-clamp-2">{i.desc}</p>
              <div className="mt-4 flex gap-2">
                {connected ? (
                  <button className="btn-secondary flex-1"><SettingsIcon className="h-3.5 w-3.5" /> Konfigurieren</button>
                ) : (
                  <button className="btn-primary flex-1">Verbinden</button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </AdminLayout>
  );
}
