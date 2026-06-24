import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { PublicLayout } from "@/components/PublicLayout";
import { AuthShell } from "@/components/AuthShell";
import { Mail, Lock, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/login")({ component: LoginPage });

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      try { localStorage.setItem("sovoice_user", JSON.stringify({ email, remember })); } catch {}
      navigate({ to: "/" });
    }, 500);
  };

  return (
    <PublicLayout>
      <AuthShell
        eyebrow="Login"
        title="Willkommen zurück"
        subtitle="Melde dich in deinem SoVoice Kalender an und behalte alle KI-gebuchten Termine im Blick."
        footer={<>Noch kein Konto? <Link to="/register" className="text-[color:var(--color-accent)] font-semibold hover:underline">Jetzt registrieren</Link></>}
      >
        <form onSubmit={onSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-[color:var(--color-text-muted)] uppercase tracking-wider ml-0.5">
              <span className="inline-flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" /> E-Mail</span>
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
            <div className="flex justify-between items-center ml-0.5">
              <label className="block text-xs font-semibold text-[color:var(--color-text-muted)] uppercase tracking-wider">
                <span className="inline-flex items-center gap-1.5"><Lock className="h-3.5 w-3.5" /> Passwort</span>
              </label>
              <a href="#" className="text-[11px] font-semibold text-[color:var(--color-accent)] hover:underline">Vergessen?</a>
            </div>
            <input
              type="password"
              required
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              className="input-field"
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>

          <label className="flex items-center gap-2 text-sm text-[color:var(--color-text-muted)] cursor-pointer select-none">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="h-4 w-4 rounded border-[color:var(--color-border-strong)] accent-[#3b82f6]"
            />
            Gerät merken
          </label>

          <button type="submit" disabled={loading} className="btn-primary w-full justify-center pulse-glow">
            {loading ? "Anmelden..." : <>Anmelden <ArrowRight className="h-4 w-4" /></>}
          </button>
        </form>
      </AuthShell>
    </PublicLayout>
  );
}
