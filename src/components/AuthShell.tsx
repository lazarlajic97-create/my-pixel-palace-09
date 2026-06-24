import { ReactNode } from "react";
import { Calendar, ShieldCheck, Sparkles, Zap } from "lucide-react";

interface AuthShellProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}

export function AuthShell({ eyebrow, title, subtitle, children, footer }: AuthShellProps) {
  return (
    <section className="relative min-h-[calc(100vh-160px)] w-full flex items-center justify-center px-4 py-12 overflow-hidden">
      {/* Ambient cosmic glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-[15%] -left-[10%] h-[45%] w-[45%] rounded-full blur-[120px] bg-[rgba(59,130,246,0.22)]" />
        <div className="absolute -bottom-[15%] -right-[10%] h-[45%] w-[45%] rounded-full blur-[120px] bg-[rgba(34,211,238,0.18)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[420px] w-[420px] rounded-full blur-[100px] bg-[rgba(96,165,250,0.10)]" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="glass-strong rounded-3xl overflow-hidden shadow-[0_30px_80px_-20px_rgba(8,15,40,0.45)]">
          {/* Top accent line */}
          <div className="h-[3px] w-full bg-gradient-to-r from-[#3b82f6] via-[#22d3ee] to-[#3b82f6]" />

          <div className="p-8 sm:p-10">
            {/* Brand */}
            <div className="mb-8">
              <div className="flex items-center gap-2.5 mb-7">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#3b82f6] to-[#22d3ee] grid place-items-center shadow-lg shadow-[rgba(59,130,246,0.35)]">
                  <Calendar className="h-5 w-5 text-white" />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-base font-bold tracking-tight">SoVoice</span>
                  <span className="text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-text-muted)]">Calendar</span>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 chip text-[10px] mb-4">
                <Sparkles className="h-3 w-3 text-[color:var(--color-accent)]" />
                {eyebrow}
              </span>
              <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
              <p className="mt-2 text-sm text-[color:var(--color-text-muted)]">{subtitle}</p>
            </div>

            {children}

            {/* Divider */}
            <div className="mt-8 flex items-center gap-3">
              <div className="h-px flex-1 bg-[color:var(--color-border)]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[color:var(--color-text-dim)]">
                Exklusiv für SoVoice Kunden
              </span>
              <div className="h-px flex-1 bg-[color:var(--color-border)]" />
            </div>

            {/* Trust row */}
            <div className="mt-5 grid grid-cols-2 gap-2.5 text-[11px]">
              <div className="flex items-center gap-1.5 text-[color:var(--color-text-muted)]">
                <ShieldCheck className="h-3.5 w-3.5 text-[color:var(--color-success)]" />
                DSG & DSGVO bewusst
              </div>
              <div className="flex items-center gap-1.5 text-[color:var(--color-text-muted)]">
                <Zap className="h-3.5 w-3.5 text-[color:var(--color-accent)]" />
                In 60 Sek. einsatzbereit
              </div>
            </div>

            {/* Footer link */}
            <div className="mt-8 text-center text-sm text-[color:var(--color-text-muted)]">
              {footer}
            </div>
          </div>
        </div>

        {/* Sub footer */}
        <p className="mt-6 text-center text-[10px] font-medium uppercase tracking-[0.2em] text-[color:var(--color-text-dim)]">
          © {new Date().getFullYear()} SoVoice Systems · Schweizer B2B Qualität
        </p>
      </div>
    </section>
  );
}
