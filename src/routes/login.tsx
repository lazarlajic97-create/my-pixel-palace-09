import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { PublicLayout } from "@/components/PublicLayout";
import { LogIn, Mail, Lock, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/login")({ component: LoginPage });

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      try { localStorage.setItem("sovoice_user", JSON.stringify({ email })); } catch {}
      navigate({ to: "/admin" });
    }, 500);
  };

  return (
    <PublicLayout>
      <section className="container-app py-20 max-w-md">
        <div className="glass-strong p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#3b82f6] to-[#1e40af] grid place-items-center">
              <LogIn className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Willkommen zurück</h1>
              <p className="text-xs text-[color:var(--color-text-muted)]">Melde dich in deinem SoVoice Kalender an.</p>
            </div>
          </div>
          <form onSubmit={onSubmit} className="space-y-4">
            <label className="block">
              <span className="text-xs font-medium text-[color:var(--color-text-muted)] mb-1.5 flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" /> E-Mail</span>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" placeholder="du@firma.ch" />
            </label>
            <label className="block">
              <span className="text-xs font-medium text-[color:var(--color-text-muted)] mb-1.5 flex items-center gap-1.5"><Lock className="h-3.5 w-3.5" /> Passwort</span>
              <input type="password" required value={pw} onChange={(e) => setPw(e.target.value)} className="input-field" placeholder="••••••••" />
            </label>
            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? "Anmelden..." : <>Anmelden <ArrowRight className="h-4 w-4" /></>}
            </button>
          </form>
          <div className="mt-6 text-center text-sm text-[color:var(--color-text-muted)]">
            Noch kein Konto? <Link to="/register" className="text-[color:var(--color-accent)] hover:underline font-medium">Jetzt registrieren</Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
