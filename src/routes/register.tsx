import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { PublicLayout } from "@/components/PublicLayout";
import { AuthShell } from "@/components/AuthShell";
import { Mail, Lock, Building2, ArrowRight } from "lucide-react";

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
      navigate({ to: "/" });
    }, 600);
  };

  return (
    <PublicLayout>
      <AuthShell
        eyebrow="Konto erstellen"
        title="Aktiviere deinen SoVoice Kalender"
        subtitle="Dein KI Voice Agent telefoniert, dein Kalender ist die Schaltzentrale. In 60 Sekunden einsatzbereit."
        footer={<>Bereits Kunde? <Link to="/login" className="text-[color:var(--color-accent)] font-semibold hover:underline">Hier anmelden</Link></>}
      >
        <form onSubmit={onSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-[color:var(--color-text-muted)] uppercase tracking-wider ml-0.5">
              <span className="inline-flex items-center gap-1.5"><Building2 className="h-3.5 w-3.5" /> Unternehmen</span>
            </label>
            <input
              type="text"
              required
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="input-field"
              placeholder="Musterfirma AG"
              autoComplete="organization"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-semibold text-[color:var(--color-text-muted)] uppercase tracking-wider ml-0.5">
              <span className="inline-flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" /> Geschäfts-E-Mail</span>
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              placeholder="du@firma.ch"
              autoComplete="email"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-semibold text-[color:var(--color-text-muted)] uppercase tracking-wider ml-0.5">
              <span className="inline-flex items-center gap-1.5"><Lock className="h-3.5 w-3.5" /> Passwort</span>
            </label>
            <input
              type="password"
              required
              minLength={8}
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              className="input-field"
              placeholder="Mindestens 8 Zeichen"
              autoComplete="new-password"
            />
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full justify-center pulse-glow">
            {loading ? "Wird erstellt..." : <>Kostenlos starten <ArrowRight className="h-4 w-4" /></>}
          </button>

          <p className="text-[11px] text-center text-[color:var(--color-text-dim)] leading-relaxed">
            Mit der Registrierung akzeptierst du unsere AGB und die Datenschutzerklärung.
          </p>
        </form>
      </AuthShell>
    </PublicLayout>
  );
}
