import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { Menu, X } from "lucide-react";

const nav = [
  { to: "/", label: "Startseite" },
  { to: "/events", label: "Terminarten" },
  { to: "/book", label: "Termin buchen" },
];

export function PublicLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-40 border-b border-[color:var(--color-border)] bg-[color:var(--color-bg)]/70 backdrop-blur-xl">
        <div className="container-app flex h-16 items-center justify-between">
          <Logo />
          <nav className="hidden md:flex items-center gap-1">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} className="px-3 py-2 text-sm text-[color:var(--color-text-muted)] hover:text-white transition" activeProps={{ className: "px-3 py-2 text-sm text-white" }}>
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />
            <Link to="/admin" className="btn-ghost">Admin</Link>
            <Link to="/book" className="btn-primary">Termin buchen</Link>
          </div>
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button onClick={() => setOpen(!open)} className="btn-ghost" aria-label="Menü">
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {open && (
          <div className="md:hidden border-t border-[color:var(--color-border)] bg-[color:var(--color-bg-elev)]">
            <div className="container-app py-3 flex flex-col gap-1">
              {nav.map((n) => (
                <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="px-3 py-2.5 rounded-lg text-sm text-[color:var(--color-text-muted)] hover:bg-white/5">
                  {n.label}
                </Link>
              ))}
              <Link to="/admin" onClick={() => setOpen(false)} className="px-3 py-2.5 rounded-lg text-sm text-[color:var(--color-text-muted)] hover:bg-white/5">Admin</Link>
              <Link to="/book" onClick={() => setOpen(false)} className="btn-primary mt-2">Termin buchen</Link>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-[color:var(--color-border)] mt-20">
        <div className="container-app py-12 grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-4 text-sm text-[color:var(--color-text-muted)] max-w-md">
              SoVoice Calendar ist die Terminbuchungsplattform für SoVoice Demo Calls, Beratungen und Onboarding Termine.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="chip"><span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-success)]" /> DSG & DSGVO bewusst</span>
              <span className="chip">Schweizer B2B Qualität</span>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3">Plattform</h4>
            <ul className="space-y-2 text-sm text-[color:var(--color-text-muted)]">
              <li><Link to="/events" className="hover:text-white">Terminarten</Link></li>
              <li><Link to="/book" className="hover:text-white">Termin buchen</Link></li>
              <li><Link to="/admin" className="hover:text-white">Admin Bereich</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3">Rechtliches</h4>
            <ul className="space-y-2 text-sm text-[color:var(--color-text-muted)]">
              <li><Link to="/datenschutz" className="hover:text-white">Datenschutz</Link></li>
              <li><Link to="/impressum" className="hover:text-white">Impressum</Link></li>
              <li><a href="https://sovoice.ch" className="hover:text-white">SoVoice Hauptseite</a></li>
            </ul>
          </div>
        </div>
        <div className="container-app py-6 border-t border-[color:var(--color-border)] text-xs text-[color:var(--color-text-dim)] flex flex-col md:flex-row justify-between gap-2">
          <span>© {new Date().getFullYear()} SoVoice Calendar. Alle Rechte vorbehalten.</span>
          <span>SoVoice-Calendar.com</span>
        </div>
      </footer>
    </div>
  );
}
