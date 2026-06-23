import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";

const SCREENS: { to: string; label: string }[] = [
  { to: "/", label: "Landing" },
  { to: "/book", label: "Termin wählen" },
  { to: "/book/details", label: "Details" },
  { to: "/book/confirmed", label: "Bestätigt" },
  { to: "/manage", label: "Verwalten" },
  { to: "/manage/edit", label: "Bearbeiten" },
  { to: "/admin", label: "Admin Dashboard" },
  { to: "/admin/appointments", label: "Admin Termine" },
  { to: "/admin/appointments/desktop", label: "Termine Desktop" },
  { to: "/admin/mobile", label: "Admin Mobile" },
  { to: "/booking/desktop", label: "Booking Desktop" },
  { to: "/booking/details-desktop", label: "Details Desktop" },
  { to: "/booking/confirmed-desktop", label: "Bestätigt Desktop" },
];

export function ScreenNav() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="fixed bottom-4 right-4 z-[100] font-body-md">
      {open && (
        <div className="mb-2 w-72 max-h-[60vh] overflow-y-auto rounded-xl border border-white/10 bg-surface-container-lowest/95 backdrop-blur-xl p-2 shadow-2xl">
          <div className="px-2 py-1 text-[10px] uppercase tracking-widest text-on-surface-variant">
            Screens
          </div>
          {SCREENS.map((s) => {
            const active = pathname === s.to;
            return (
              <Link
                key={s.to}
                to={s.to}
                onClick={() => setOpen(false)}
                className={
                  "block rounded-lg px-3 py-2 text-sm transition-colors " +
                  (active
                    ? "bg-primary-container/30 text-primary"
                    : "text-on-surface hover:bg-white/5")
                }
              >
                {s.label}
              </Link>
            );
          })}
        </div>
      )}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Screen navigation"
        className="flex items-center gap-2 rounded-full border border-white/15 bg-primary-container px-4 py-3 text-white shadow-lg shadow-primary-container/30 hover:bg-inverse-primary transition-colors"
      >
        <span className="material-symbols-outlined text-[18px]">
          {open ? "close" : "apps"}
        </span>
        <span className="text-xs uppercase tracking-widest font-semibold">
          Screens
        </span>
      </button>
    </div>
  );
}
