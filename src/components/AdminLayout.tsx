import { Link, useRouterState } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Logo } from "./Logo";
import { LayoutDashboard, Calendar, Layers, Clock, Plug, Settings, Menu, X, Bell, Search, BarChart3 } from "lucide-react";

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
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {nav.map((n) => {
          const Icon = n.icon;
          const active = isActive(n.to, n.exact);
          return (
            <Link
              key={n.to}
              to={n.to}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
                active
                  ? "bg-gradient-to-r from-[rgba(37,99,235,0.15)] to-transparent text-white border border-[rgba(59,130,246,0.3)]"
                  : "text-[color:var(--color-text-muted)] hover:bg-white/5 hover:text-white border border-transparent"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span>{n.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-3 border-t border-[color:var(--color-border)]">
        <div className="glass rounded-xl p-3">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 shrink-0 rounded-full bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] grid place-items-center text-xs font-semibold">SV</div>
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
              <h1 className="text-lg md:text-xl font-semibold truncate">{title}</h1>
              {subtitle && <p className="text-xs text-[color:var(--color-text-muted)] truncate hidden md:block">{subtitle}</p>}
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button className="btn-ghost hidden md:inline-flex"><Search className="h-4 w-4" /></button>
              <button className="btn-ghost relative">
                <Bell className="h-4 w-4" />
                <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-[color:var(--color-accent)]" />
              </button>
              {actions}
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-8 min-w-0">{children}</main>
      </div>
      {open && <div onClick={() => setOpen(false)} />}
    </div>
  );
}
