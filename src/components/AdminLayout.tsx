import { Link, useRouterState } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { LayoutDashboard, Calendar, Layers, Clock, Plug, Settings, Menu, Bell, Search, BarChart3 } from "lucide-react";

const nav = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/appointments", label: "Termine", icon: Calendar },
  { to: "/admin/event-types", label: "Event Typen", icon: Layers },
  { to: "/admin/availability", label: "Verfügbarkeiten", icon: Clock },
  { to: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/admin/integrations", label: "Integrationen", icon: Plug },
  { to: "/admin/settings", label: "Einstellungen", icon: Settings },
];

export function AdminLayout({ children, title, subtitle, actions }: { children: ReactNode; title: string; subtitle?: string; actions?: ReactNode }) {
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });
  const isActive = (to: string, exact?: boolean) => exact ? path === to : path === to || path.startsWith(to + "/");

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="px-5 py-5 border-b border-[color:var(--color-border)]">
        <Logo />
        <div className="mt-3 chip text-[10px]"><span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-success)] animate-pulse" /> System Online</div>
      </div>
      <nav className="flex-1 p-3 space-y-0.5">
        <div className="px-2 pt-1 pb-2 text-[10px] uppercase tracking-wider text-[color:var(--color-text-dim)] font-semibold">Workspace</div>
        {nav.map((n) => {
          const Icon = n.icon;
          const active = isActive(n.to, n.exact);
          return (
            <Link
              key={n.to}
              to={n.to}
              onClick={() => setOpen(false)}
              className={`relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition group ${
                active
                  ? "text-white"
                  : "text-[color:var(--color-text-muted)] hover:bg-white/5 hover:text-white"
              }`}
            >
              {active && (
                <>
                  <span className="absolute inset-0 rounded-lg ring-active" />
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-0.5 rounded-r bg-gradient-to-b from-[#60a5fa] to-[#22d3ee]" />
                </>
              )}
              <Icon className={`relative h-4 w-4 shrink-0 ${active ? "text-[#60a5fa]" : ""}`} />
              <span className="relative">{n.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-3 border-t border-[color:var(--color-border)]">
        <div className="glass rounded-xl p-3 hover:border-[rgba(59,130,246,0.35)] transition cursor-pointer">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <div className="h-8 w-8 shrink-0 rounded-full bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] grid place-items-center text-xs font-semibold">SV</div>
              <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-[color:var(--color-success)] border-2 border-[color:var(--color-bg-elev)]" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-semibold truncate">SoVoice Team</div>
              <div className="text-[11px] text-[color:var(--color-text-dim)] truncate">team@sovoice.ch</div>
            </div>
          </div>
        </div>
        <Link to="/" className="mt-2 block text-center text-xs text-[color:var(--color-text-dim)] hover:text-white">← Zur öffentlichen Seite</Link>
      </div>
    </div>
  );


  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[260px_minmax(0,1fr)]">
      {/* Desktop sidebar */}
      <aside className="hidden lg:block border-r border-[color:var(--color-border)] bg-[color:var(--color-bg-elev)]/50 sticky top-0 h-screen">
        {sidebar}
      </aside>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <aside className="absolute left-0 top-0 h-full w-72 bg-[color:var(--color-bg-elev)] border-r border-[color:var(--color-border)]">
            {sidebar}
          </aside>
        </div>
      )}

      <div className="flex flex-col min-w-0">
        <header className="sticky top-0 z-30 border-b border-[color:var(--color-border)] bg-[color:var(--color-bg)]/80 backdrop-blur-xl">
          <div className="px-4 md:px-8 h-16 grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3">
            <button onClick={() => setOpen(true)} className="lg:hidden btn-ghost" aria-label="Menü">
              <Menu className="h-5 w-5" />
            </button>
            <div className="min-w-0">
              <h1 className="text-lg md:text-xl font-semibold truncate tracking-tight">{title}</h1>
              {subtitle && <p className="text-xs text-[color:var(--color-text-muted)] truncate hidden md:block">{subtitle}</p>}
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <div className="hidden md:flex items-center gap-2 px-3 h-9 rounded-lg bg-white/[0.03] border border-[color:var(--color-border-strong)] text-xs text-[color:var(--color-text-dim)] w-56 focus-within:border-[rgba(59,130,246,0.5)] transition">
                <Search className="h-3.5 w-3.5" />
                <input placeholder="Suchen ..." className="bg-transparent outline-none w-full placeholder:text-[color:var(--color-text-dim)] text-[color:var(--color-text)]" />
                <kbd className="hidden lg:inline-flex text-[10px] px-1.5 py-0.5 rounded bg-white/5 border border-[color:var(--color-border-strong)]">⌘K</kbd>
              </div>
              <ThemeToggle />
              <button className="btn-ghost relative" aria-label="Benachrichtigungen">
                <Bell className="h-4 w-4" />
                <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-[color:var(--color-accent)] animate-pulse" />
              </button>
              {actions}
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-8 min-w-0 animate-fade-up">{children}</main>
      </div>
      {open && <div onClick={() => setOpen(false)} />}
    </div>
  );
}

