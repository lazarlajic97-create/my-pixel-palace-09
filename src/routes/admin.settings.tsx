import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/AdminLayout";
import {
  useProfile, useCompany, useBranding, useNotificationPrefs, usePrivacyPrefs, useTeam,
} from "@/lib/admin-storage";
import { Modal } from "@/components/Modal";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import type { AdminUser } from "@/lib/types";
import { useState } from "react";
import { User, Building2, Palette, Globe, Shield, Bell, Users, Calendar, Save, Upload, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

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
  const [profile, setProfile] = useProfile();
  const [company, setCompany] = useCompany();
  const [branding, setBranding] = useBranding();
  const [notif, setNotif] = useNotificationPrefs();
  const [privacy, setPrivacy] = usePrivacyPrefs();
  const [team, setTeam] = useTeam();
  const [addingMember, setAddingMember] = useState(false);
  const [removeMember, setRemoveMember] = useState<AdminUser | null>(null);

  const onLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setBranding({ ...branding, logo: reader.result as string } as any);
      toast.success("Logo aktualisiert");
    };
    reader.readAsDataURL(file);
  };

  return (
    <AdminLayout
      title="Einstellungen"
      subtitle="Konto, Branding und Integrationen"
      actions={
        <button className="btn-primary" onClick={() => toast.success("Einstellungen gespeichert")}>
          <Save className="h-4 w-4" /> Speichern
        </button>
      }
    >
      <div className="grid lg:grid-cols-[240px_minmax(0,1fr)] gap-4">
        <nav className="glass-strong p-2 h-fit overflow-x-auto">
          <div className="flex lg:flex-col gap-1 min-w-max lg:min-w-0">
            {TABS.map(t => {
              const Icon = t.icon;
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm whitespace-nowrap transition ${
                    active ? "bg-[rgba(37,99,235,0.15)] text-white border border-[rgba(59,130,246,0.3)]" : "text-[color:var(--color-text-muted)] hover:bg-white/5 border border-transparent"
                  }`}
                >
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
                <Input label="Vorname" value={profile.firstName} onChange={v => setProfile({ ...profile, firstName: v })} />
                <Input label="Nachname" value={profile.lastName} onChange={v => setProfile({ ...profile, lastName: v })} />
                <Input label="E Mail" value={profile.email} onChange={v => setProfile({ ...profile, email: v })} />
                <Input label="Rolle" value={profile.role} onChange={v => setProfile({ ...profile, role: v })} />
              </div>
            </Section>
          )}
          {tab === "company" && (
            <Section title="Unternehmen" desc="Firmendaten für E Mails und Rechnungen.">
              <div className="grid sm:grid-cols-2 gap-4">
                <Input label="Firmenname" value={company.name} onChange={v => setCompany({ ...company, name: v })} />
                <Input label="Adresse" value={company.address} onChange={v => setCompany({ ...company, address: v })} />
                <Input label="Telefon" value={company.phone} onChange={v => setCompany({ ...company, phone: v })} />
                <Input label="Website" value={company.website} onChange={v => setCompany({ ...company, website: v })} />
              </div>
            </Section>
          )}
          {tab === "branding" && (
            <Section title="Branding" desc="Logo und Farben anpassen.">
              <div className="flex items-center gap-4 mb-6">
                {(branding as any).logo ? (
                  <img src={(branding as any).logo} alt="Logo" className="h-16 w-16 rounded-xl object-cover bg-white/5" />
                ) : (
                  <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-[#3b82f6] to-[#1e40af] grid place-items-center text-white font-bold">SV</div>
                )}
                <label className="btn-secondary cursor-pointer">
                  <Upload className="h-4 w-4" /> Logo hochladen
                  <input type="file" accept="image/*" className="hidden" onChange={onLogoChange} />
                </label>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <ColorInput label="Primärfarbe" value={branding.primary} onChange={v => setBranding({ ...branding, primary: v })} />
                <ColorInput label="Akzentfarbe" value={branding.accent} onChange={v => setBranding({ ...branding, accent: v })} />
                <Input label="Button Stil" value={branding.buttonStyle} onChange={v => setBranding({ ...branding, buttonStyle: v })} />
                <Input label="E Mail Signatur" value={branding.signature} onChange={v => setBranding({ ...branding, signature: v })} />
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
                <span className="chip border bg-[rgba(52,211,153,0.12)] text-[#34d399] border-[rgba(52,211,153,0.25)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-success)]" /> Aktiv
                </span>
              </div>
              <div className="mt-4 grid sm:grid-cols-[1fr_auto] gap-2">
                <input placeholder="termine.deinefirma.ch" className="input-field" />
                <button className="btn-primary" onClick={() => toast.success("DNS Anweisungen wurden per E Mail versendet")}>Hinzufügen</button>
              </div>
            </Section>
          )}
          {tab === "privacy" && (
            <Section title="Datenschutz" desc="DSG und DSGVO Einstellungen.">
              <Toggle label="Datenverarbeitung in der EU/Schweiz" value={privacy.euOnly} onChange={v => setPrivacy({ ...privacy, euOnly: v })} />
              <Toggle label="Automatische Löschung nach 12 Monaten" value={privacy.autoDelete} onChange={v => setPrivacy({ ...privacy, autoDelete: v })} />
              <Toggle label="Cookie Banner anzeigen" value={privacy.cookieBanner} onChange={v => setPrivacy({ ...privacy, cookieBanner: v })} />
            </Section>
          )}
          {tab === "notifications" && (
            <Section title="Benachrichtigungen" desc="Wann sollen wir dich informieren?">
              <Toggle label="Neue Buchung per E Mail" value={notif.newBookingEmail} onChange={v => setNotif({ ...notif, newBookingEmail: v })} />
              <Toggle label="Erinnerung 24h vorher" value={notif.reminder24h} onChange={v => setNotif({ ...notif, reminder24h: v })} />
              <Toggle label="Erinnerung 1h vorher" value={notif.reminder1h} onChange={v => setNotif({ ...notif, reminder1h: v })} />
              <Toggle label="Tägliche Zusammenfassung" value={notif.dailySummary} onChange={v => setNotif({ ...notif, dailySummary: v })} />
            </Section>
          )}
          {tab === "team" && (
            <Section
              title="Team Mitglieder"
              desc="Wer hat Zugriff auf das Dashboard?"
              actions={<button onClick={() => setAddingMember(true)} className="btn-primary"><Plus className="h-4 w-4" /> Mitglied</button>}
            >
              {team.map(m => (
                <div key={m.id} className="flex items-center justify-between py-3 border-b border-[color:var(--color-border)] last:border-0">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-9 w-9 shrink-0 rounded-full bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] grid place-items-center text-xs font-semibold">
                      {m.name.split(" ").map(x => x[0]).join("")}
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-medium truncate">{m.name}</div>
                      <div className="text-xs text-[color:var(--color-text-muted)] truncate">{m.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <select
                      value={m.role}
                      onChange={e => setTeam(team.map(x => x.id === m.id ? { ...x, role: e.target.value as AdminUser["role"] } : x))}
                      className="input-field py-1.5 px-2 text-xs w-auto"
                    >
                      {["Admin", "Member", "Viewer"].map(r => <option key={r} value={r} className="bg-[#0e1426]">{r}</option>)}
                    </select>
                    <button className="btn-ghost p-1.5 hover:!text-[#f87171]" onClick={() => setRemoveMember(m)}>
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
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
                    <div className="text-xs text-[color:var(--color-text-muted)]">{profile.email}</div>
                  </div>
                </div>
                <span className="chip border bg-[rgba(52,211,153,0.12)] text-[#34d399] border-[rgba(52,211,153,0.25)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-success)]" /> Verbunden
                </span>
              </div>
            </Section>
          )}
        </div>
      </div>

      {addingMember && (
        <AddMemberModal
          onClose={() => setAddingMember(false)}
          onAdd={m => { setTeam([...team, m]); toast.success("Mitglied hinzugefügt"); setAddingMember(false); }}
        />
      )}
      <ConfirmDialog
        open={!!removeMember}
        onClose={() => setRemoveMember(null)}
        onConfirm={() => {
          if (removeMember) {
            setTeam(team.filter(x => x.id !== removeMember.id));
            toast.success("Mitglied entfernt");
          }
        }}
        title="Mitglied entfernen?"
        message={`${removeMember?.name} verliert sofort den Zugriff auf das Dashboard.`}
        confirmLabel="Entfernen"
        destructive
      />
    </AdminLayout>
  );
}

function AddMemberModal({ onClose, onAdd }: { onClose: () => void; onAdd: (m: AdminUser) => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<AdminUser["role"]>("Member");

  return (
    <Modal
      open
      onClose={onClose}
      title="Mitglied einladen"
      description="Das Mitglied erhält eine Einladung per E Mail."
      footer={
        <>
          <button className="btn-secondary" onClick={onClose}>Abbrechen</button>
          <button
            className="btn-primary"
            onClick={() => {
              if (!name.trim() || !email.trim()) return toast.error("Name und E Mail erforderlich");
              onAdd({ id: `u-${Date.now()}`, name, email, role });
            }}
          >
            Einladen
          </button>
        </>
      }
    >
      <div className="space-y-4">
        <label className="block">
          <span className="text-xs text-[color:var(--color-text-muted)] mb-1.5 block">Name</span>
          <input className="input-field" value={name} onChange={e => setName(e.target.value)} />
        </label>
        <label className="block">
          <span className="text-xs text-[color:var(--color-text-muted)] mb-1.5 block">E Mail</span>
          <input className="input-field" type="email" value={email} onChange={e => setEmail(e.target.value)} />
        </label>
        <label className="block">
          <span className="text-xs text-[color:var(--color-text-muted)] mb-1.5 block">Rolle</span>
          <select className="input-field" value={role} onChange={e => setRole(e.target.value as AdminUser["role"])}>
            {["Admin", "Member", "Viewer"].map(r => <option key={r} value={r} className="bg-[#0e1426]">{r}</option>)}
          </select>
        </label>
      </div>
    </Modal>
  );
}

function Section({ title, desc, actions, children }: { title: string; desc: string; actions?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-start justify-between gap-4 mb-5">
        <div>
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-sm text-[color:var(--color-text-muted)]">{desc}</p>
        </div>
        {actions}
      </div>
      <div className="space-y-1">{children}</div>
    </div>
  );
}
function Input({ label, value, onChange, ...rest }: { label: string; value: string; onChange: (v: string) => void } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-[color:var(--color-text-muted)] mb-1.5 block">{label}</span>
      <input className="input-field" value={value} onChange={e => onChange(e.target.value)} {...rest} />
    </label>
  );
}
function ColorInput({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-[color:var(--color-text-muted)] mb-1.5 block">{label}</span>
      <div className="flex items-center gap-2">
        <input type="color" value={value} onChange={e => onChange(e.target.value)} className="h-10 w-12 rounded-lg bg-transparent border border-[color:var(--color-border-strong)] cursor-pointer" />
        <input value={value} onChange={e => onChange(e.target.value)} className="input-field" />
      </div>
    </label>
  );
}
function Toggle({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center justify-between py-3 border-b border-[color:var(--color-border)] last:border-0 cursor-pointer">
      <span className="text-sm">{label}</span>
      <button type="button" onClick={() => onChange(!value)} className={`relative h-6 w-11 rounded-full transition ${value ? "bg-[color:var(--color-brand)]" : "bg-white/10"}`}>
        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${value ? "translate-x-5" : "translate-x-0.5"}`} />
      </button>
    </label>
  );
}
