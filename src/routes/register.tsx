import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { PublicLayout } from "@/components/PublicLayout";
import { UserPlus, Mail, Lock, Building2, ArrowRight, Check } from "lucide-react";

export const Route = createFileRoute("/register")({ component: RegisterPage });

function RegisterPage() {
  const navigate = useNavigate();
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      try { localStorage.setItem("sovoice_user", JSON.stringify({ email, company })); } catch {}
      navigate({ to: "/admin" });
    }, 600);
  };

  return (
    <PublicLayout>
      <section className="container-app py-20 grid md:grid-cols-[1.1fr_1fr] gap-8 max-w-5xl items-start">
        <div className="glass-strong p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#3b82f6] to-[#1e40af] grid place-items-center">
              <UserPlus className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Konto erstellen</h1>
              <p className="text-xs text-[color:var(--color-text-muted)]">Aktiviere deinen SoVoice Kalender in 60 Sekunden.</p>
            </div>
          </div>
          <form onSubmit={onSubmit} className="space-y-4">
            <label className="block">
              <span className="text-xs font-medium text-[color:var(--color-text-muted)] mb-1.5 flex items-center gap-1.5"><Building2 className="h-3.5 w-3.5" /> Unternehmen</span>
              <input type="text" required value={company} onChange={(e) => setCompany(e.target.value)} className="input-field" placeholder="Musterfirma AG" />
            </label>
            <label className="block">
              <span className="text-xs font-medium text-[color:var(--color-text-muted)] mb-1.5 flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" /> Geschäfts-E-Mail</span>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" placeholder="du@firma.ch" />
            </label>
            <label className="block">
              <span className="text-xs font-medium text-[color:var(--color-text-muted)] mb-1.5 flex items-center gap-1.5"><Lock className="h-3.5 w-3.5" /> Passwort</span>
              <input type="password" required minLength={8} value={pw} onChange={(e) => setPw(e.target.value)} className="input-field" placeholder="Mindestens 8 Zeichen" />
            </label>
            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? "Wird erstellt..." : <>Kostenlos starten <ArrowRight className="h-4 w-4" /></>}
            </button>
          </form>
          <div className="mt-6 text-center text-sm text-[color:var(--color-text-muted)]">
            Bereits Kunde? <Link to="/login" className="text-[color:var(--color-accent)] hover:underline font-medium">Hier anmelden</Link>
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Warum SoVoice + Kalender?</h2>
          <p className="text-sm text-[color:var(--color-text-muted)]">Dein KI Voice Agent telefoniert – dein Kalender ist die Schaltzentrale.</p>
          <ul className="space-y-3 mt-4">
            {[
              "Termine werden vom KI Agent direkt eingetragen – ohne manuelle Pflege.",
              "Du legst Event Typen, Zeiten und Regeln fest, die KI hält sich exakt daran.",
              "Alle Anrufdetails, Notizen und Kontaktdaten landen automatisch am Termin.",
              "Keine Doppelbuchungen dank Live Verfügbarkeitsabgleich.",
              "DSG / DSGVO bewusst, Hosting in der EU.",
            ].map((t) => (
              <li key={t} className="flex items-start gap-2.5 text-sm">
                <Check className="h-4 w-4 mt-0.5 text-[color:var(--color-success)] shrink-0" /> {t}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </PublicLayout>
  );
}
