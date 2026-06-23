import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/AdminLayout";
import { useState } from "react";
import { User, Building2, Palette, Globe, Shield, Bell, Users, Calendar, Save, Upload } from "lucide-react";

export const Route = createFileRoute("/admin/settings")({ component: Settings });

const TABS = [
  { id: "profile", label: "Profil", icon: User },
  { id: "company", label: "Unternehmen", icon: Building2 },
  { id: "branding", label: "Branding", icon: Palette },
  { id: "domain", label: "Domain", icon: Globe },
  { id: "privacy", label: "Datenschutz", icon: Shield },
  { id: "notifications", label: "Benachrichtigungen", icon: Bell },
  { id: "team", label: "Team", icon: Users },
  { id: "calendar", label: "Kalender", icon: Calendar },
];

function Settings() {
  const [tab, setTab] = useState("profile");

  return (
    <AdminLayout title="Einstellungen" subtitle="Konto, Branding und Integrationen verwalten" actions={
      <button className="btn-primary"><Save className="h-4 w-4" /> Speichern</button>
    }>
      <div className="grid lg:grid-cols-[240px_minmax(0,1fr)] gap-4">
        <nav className="glass-strong p-2 h-fit overflow-x-auto">
          <div className="flex lg:flex-col gap-1 min-w-max lg:min-w-0">
            {TABS.map(t => {
              const Icon = t.icon;
              const active = tab === t.id;
              return (
                <button key={t.id} onClick={() => setTab(t.id)} className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm whitespace-nowrap transition ${
                  active ? "bg-[rgba(37,99,235,0.15)] text-white border border-[rgba(59,130,246,0.3)]" : "text-[color:var(--color-text-muted)] hover:bg-white/5 border border-transparent"
                }`}>
                  <Icon className="h-4 w-4 shrink-0" />
                  {t.label}
                </button>
              );
            })}
          </div>
        </nav>

        <div className="glass-strong p-5 md:p-6">
          {tab === "profile" && (
            <Section title="Profil" desc="Persönliche Informationen.">
              <div className="grid sm:grid-cols-2 gap-4">
                <Input label="Vorname" defaultValue="Sandro" />
                <Input label="Nachname" defaultValue="Müller" />
                <Input label="E Mail" defaultValue="sandro@sovoice.ch" />
                <Input label="Rolle" defaultValue="Sales Lead" />
              </div>
            </Section>
          )}
          {tab === "company" && (
            <Section title="Unternehmen" desc="Firmendaten für E Mails und Rechnungen.">
              <div className="grid sm:grid-cols-2 gap-4">
                <Input label="Firmenname" defaultValue="SoVoice AG" />
                <Input label="Adresse" defaultValue="Bahnhofstrasse 1, 8001 Zürich" />
                <Input label="Telefon" defaultValue="+41 44 000 00 00" />
                <Input label="Website" defaultValue="sovoice.ch" />
              </div>
            </Section>
          )}
          {tab === "branding" && (
            <Section title="Branding" desc="Logo und Farben anpassen.">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-[#3b82f6] to-[#1e40af] grid place-items-center text-white font-bold">SV</div>
                <button className="btn-secondary"><Upload className="h-4 w-4" /> Logo hochladen</button>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Input label="Primärfarbe" defaultValue="#2563eb" />
                <Input label="Akzentfarbe" defaultValue="#22d3ee" />
                <Input label="Button Stil" defaultValue="Abgerundet" />
                <Input label="E Mail Signatur" defaultValue="SoVoice Team" />
              </div>
            </Section>
          )}
          {tab === "domain" && (
            <Section title="Domain" desc="Deine Buchungsdomain.">
              <div className="glass p-5 flex items-center justify-between flex-wrap gap-3">
                <div>
                  <div className="text-xs text-[color:var(--color-text-muted)]">Aktive Domain</div>
                  <div className="font-semibold text-lg mt-1">SoVoice-Calendar.com</div>
                </div>
                <span className="chip border bg-[rgba(52,211,153,0.12)] text-[#34d399] border-[rgba(52,211,153,0.25)]"><span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-success)]" /> Aktiv</span>
              </div>
              <div className="mt-4">
                <Input label="Eigene Domain hinzufügen" placeholder="termine.deinefirma.ch" />
              </div>
            </Section>
          )}
          {tab === "privacy" && (
            <Section title="Datenschutz" desc="DSG und DSGVO Einstellungen.">
              <Toggle label="Datenverarbeitung in der EU/Schweiz" defaultChecked />
              <Toggle label="Automatische Löschung nach 12 Monaten" defaultChecked />
              <Toggle label="Cookie Banner anzeigen" defaultChecked />
            </Section>
          )}
          {tab === "notifications" && (
            <Section title="Benachrichtigungen" desc="Wann sollen wir dich informieren?">
              <Toggle label="Neue Buchung per E Mail" defaultChecked />
              <Toggle label="Erinnerung 24h vorher" defaultChecked />
              <Toggle label="Erinnerung 1h vorher" />
              <Toggle label="Tägliche Zusammenfassung" defaultChecked />
            </Section>
          )}
          {tab === "team" && (
            <Section title="Team Mitglieder" desc="Wer hat Zugriff auf das Dashboard?">
              {[
                { n: "Sandro Müller", e: "sandro@sovoice.ch", r: "Admin" },
                { n: "Lisa Vogt", e: "lisa@sovoice.ch", r: "Sales" },
                { n: "Tom Bühler", e: "tom@sovoice.ch", r: "Support" },
              ].map(m => (
                <div key={m.e} className="flex items-center justify-between py-3 border-b border-[color:var(--color-border)] last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] grid place-items-center text-xs font-semibold">{m.n.split(" ").map(x=>x[0]).join("")}</div>
                    <div>
                      <div className="text-sm font-medium">{m.n}</div>
                      <div className="text-xs text-[color:var(--color-text-muted)]">{m.e}</div>
                    </div>
                  </div>
                  <span className="chip">{m.r}</span>
                </div>
              ))}
            </Section>
          )}
          {tab === "calendar" && (
            <Section title="Kalender Verbindung" desc="Verknüpfe deinen Kalender für Verfügbarkeiten.">
              <div className="glass p-4 flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-[#60a5fa]" />
                  <div>
                    <div className="font-medium text-sm">Google Calendar</div>
                    <div className="text-xs text-[color:var(--color-text-muted)]">sandro@sovoice.ch</div>
                  </div>
                </div>
                <span className="chip border bg-[rgba(52,211,153,0.12)] text-[#34d399] border-[rgba(52,211,153,0.25)]"><span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-success)]" /> Verbunden</span>
              </div>
            </Section>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

function Section({ title, desc, children }: { title: string; desc: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-sm text-[color:var(--color-text-muted)] mb-5">{desc}</p>
      <div className="space-y-1">{children}</div>
    </div>
  );
}
function Input({ label, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-[color:var(--color-text-muted)] mb-1.5 block">{label}</span>
      <input className="input-field" {...rest} />
    </label>
  );
}
function Toggle({ label, defaultChecked }: { label: string; defaultChecked?: boolean }) {
  const [on, setOn] = useState(!!defaultChecked);
  return (
    <label className="flex items-center justify-between py-3 border-b border-[color:var(--color-border)] last:border-0 cursor-pointer">
      <span className="text-sm">{label}</span>
      <button type="button" onClick={() => setOn(!on)} className={`relative h-6 w-11 rounded-full transition ${on ? "bg-[color:var(--color-brand)]" : "bg-white/10"}`}>
        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${on ? "translate-x-5" : "translate-x-0.5"}`} />
      </button>
    </label>
  );
}
