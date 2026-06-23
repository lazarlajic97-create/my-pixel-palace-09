import { useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export function RouteTransition() {
  const isLoading = useRouterState({
    select: (s) => s.status === "pending" || s.isLoading,
  });
  const [visible, setVisible] = useState(false);
  const [phase, setPhase] = useState<"enter" | "settle" | "exit">("enter");
  const showDelay = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const hideDelay = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    if (isLoading) {
      if (hideDelay.current) clearTimeout(hideDelay.current);
      showDelay.current = setTimeout(() => {
        setPhase("enter");
        setVisible(true);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => setPhase("settle"));
        });
      }, 80);
    } else {
      if (showDelay.current) clearTimeout(showDelay.current);
      if (visible) {
        setPhase("exit");
        hideDelay.current = setTimeout(() => {
          setVisible(false);
          setPhase("enter");
        }, 500);
      }
    }
    return () => {
      if (showDelay.current) clearTimeout(showDelay.current);
      if (hideDelay.current) clearTimeout(hideDelay.current);
    };
  }, [isLoading, visible]);

  return (
    <div
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        visible && phase !== "exit"
          ? "opacity-100 scale-100"
          : "opacity-0 scale-[1.02] pointer-events-none"
      }`}
      style={{
        background:
          "radial-gradient(ellipse at 50% 40%, rgba(14,20,38,0.98) 0%, rgba(5,7,13,1) 70%)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
      }}
      aria-hidden={!visible}
      aria-busy={visible}
      role="status"
    >
      {/* Soft ambient glow behind logo */}
      <div
        className="absolute w-[420px] h-[420px] rounded-full opacity-30 blur-[100px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(37,99,235,0.35), transparent 60%)",
        }}
      />

      {/* Logo mark */}
      <div className="relative mb-8">
        <div className="relative h-20 w-20 rounded-2xl bg-gradient-to-br from-[#3b82f6] via-[#22d3ee] to-[#8b5cf6] p-[1px] shadow-2xl shadow-blue-500/20">
          <div className="h-full w-full rounded-2xl bg-[#070a14]/90 flex items-center justify-center backdrop-blur">
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              className="animate-pulse"
            >
              <circle cx="20" cy="18" r="10" stroke="url(#loaderGrad)" strokeWidth="2.5" fill="none" />
              <path d="M20 28V34" stroke="url(#loaderGrad)" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M13 31H27" stroke="url(#loaderGrad)" strokeWidth="2.5" strokeLinecap="round" />
              <defs>
                <linearGradient id="loaderGrad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#3b82f6" />
                  <stop offset="0.5" stopColor="#22d3ee" />
                  <stop offset="1" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Orbiting dot */}
        <div
          className="absolute -inset-4"
          style={{ animation: "loader-orbit 2.4s linear infinite" }}
        >
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 h-2.5 w-2.5 rounded-full"
            style={{
              background:
                "linear-gradient(135deg, #22d3ee, #3b82f6)",
              boxShadow: "0 0 18px rgba(34,211,238,0.8)",
            }}
          />
        </div>
      </div>

      {/* Brand text */}
      <h2 className="text-xl font-semibold tracking-tight text-white mb-1">
        SoVoice Calendar
      </h2>
      <p className="text-sm text-[color:var(--color-text-muted)]">
        Seite wird geladen…
      </p>

      {/* Morphing status dots */}
      <div className="mt-8 flex items-center gap-2">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[#3b82f6] to-[#22d3ee]"
            style={{
              animation: "loader-dots 1.2s ease-in-out infinite",
              animationDelay: `${i * 140}ms`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
