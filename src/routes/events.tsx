import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicLayout } from "@/components/PublicLayout";
import { EVENT_TYPES } from "@/lib/sovoice-data";
import { ArrowRight, Check, Clock, Video } from "lucide-react";

export const Route = createFileRoute("/events")({ component: Events });

function Events() {
  return (
    <PublicLayout>
      <div className="container-app py-12 md:py-16">
        <div className="max-w-2xl mb-10">
          <div className="text-xs uppercase tracking-[0.18em] text-[#60a5fa] mb-3">Terminarten</div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Wähle den passenden Termin für dein Anliegen.</h1>
          <p className="mt-4 text-[color:var(--color-text-muted)]">Vom kurzen Rückruf bis zum vollständigen Onboarding – alle Termine sind unverbindlich und kostenfrei.</p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {EVENT_TYPES.filter(e => e.isActive).map(et => (
            <div key={et.id} className="glass-strong p-6 flex flex-col group hover:border-[rgba(59,130,246,0.35)] transition">
              <div className="flex items-start justify-between">
                <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${et.color} grid place-items-center`}>
                  <Video className="h-5 w-5 text-white" />
                </div>
                <span className="chip"><Clock className="h-3 w-3" /> {et.durationMinutes} Min.</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold">{et.title}</h3>
              <p className="mt-1.5 text-sm text-[color:var(--color-text-muted)]">{et.description}</p>

              <ul className="mt-4 space-y-2 text-sm flex-1">
                {et.benefits.slice(0, 4).map(b => (
                  <li key={b} className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-[color:var(--color-success)] mt-0.5 shrink-0" />
                    <span className="text-[color:var(--color-text-muted)]">{b}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/book"
                search={{ event: et.id } as any}
                className="btn-primary mt-5 justify-center"
              >
                Termin auswählen <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </PublicLayout>
  );
}
