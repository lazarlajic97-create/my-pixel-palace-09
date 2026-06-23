import { Link } from "@tanstack/react-router";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`inline-flex items-center gap-2.5 ${className}`}>
      <span className="relative grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-[#3b82f6] to-[#1e3a8a] shadow-[0_0_20px_-2px_rgba(37,99,235,0.6)]">
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M8 5v14M12 8v8M16 11v2M4 10v4M20 9v6" />
        </svg>
      </span>
      <span className="text-[15px] font-semibold tracking-tight">
        SoVoice <span className="text-[color:var(--color-text-muted)] font-normal">Calendar</span>
      </span>
    </Link>
  );
}
