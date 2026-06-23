import { useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export function RouteTransition() {
  const isLoading = useRouterState({
    select: (s) => s.status === "pending" || s.isLoading,
  });
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const showDelay = useRef<ReturnType<typeof setTimeout>>();
  const hideDelay = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    let raf: number | undefined;
    if (isLoading) {
      if (hideDelay.current) clearTimeout(hideDelay.current);
      // Tiny delay so flash-quick navigations don't show overlay
      showDelay.current = setTimeout(() => {
        setVisible(true);
        setProgress(8);
        const tick = () => {
          setProgress((p) => (p < 88 ? p + (92 - p) * 0.05 : p));
          raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      }, 80);
    } else {
      if (showDelay.current) clearTimeout(showDelay.current);
      if (visible) {
        setProgress(100);
        hideDelay.current = setTimeout(() => {
          setVisible(false);
          setProgress(0);
        }, 400);
      }
    }
    return () => {
      if (raf) cancelAnimationFrame(raf);
    };
  }, [isLoading]);

  return (
    <>
      {/* Top progress bar */}
      <div
        className="fixed top-0 left-0 right-0 z-[101] h-[2px] pointer-events-none transition-opacity duration-300"
        style={{ opacity: visible ? 1 : 0 }}
      >
        <div
          className="h-full transition-[width] duration-200 ease-out"
          style={{
            width: `${progress}%`,
            background: "linear-gradient(90deg, #3b82f6, #22d3ee, #8b5cf6)",
            boxShadow: "0 0 12px rgba(59,130,246,0.8)",
          }}
        />
      </div>

      {/* Full-screen premium loader */}
      <div
        className={`fixed inset-0 z-[100] flex items-center justify-center transition-all duration-500 ${
          visible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(10,15,28,0.92) 0%, rgba(5,7,13,0.98) 70%)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
        aria-hidden={!visible}
      >
        <div className="flex flex-col items-center gap-6">
          {/* Animated orb */}
          <div className="relative h-20 w-20">
            <div
              className="absolute inset-0 rounded-full opacity-60 blur-2xl"
              style={{
                background:
                  "radial-gradient(circle, #3b82f6 0%, transparent 70%)",
                animation: "pulse-glow 2s ease-in-out infinite",
              }}
            />
            <svg
              viewBox="0 0 50 50"
              className="absolute inset-0 h-full w-full"
              style={{ animation: "spin 1.4s linear infinite" }}
            >
              <defs>
                <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="50%" stopColor="#22d3ee" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
              <circle
                cx="25"
                cy="25"
                r="20"
                fill="none"
                stroke="rgba(148,163,220,0.12)"
                strokeWidth="3"
              />
              <circle
                cx="25"
                cy="25"
                r="20"
                fill="none"
                stroke="url(#lg)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="90 200"
              />
            </svg>
            <div className="absolute inset-0 grid place-items-center">
              <div
                className="h-3 w-3 rounded-full bg-gradient-to-br from-[#22d3ee] to-[#3b82f6]"
                style={{ animation: "pulse-glow 1.4s ease-out infinite" }}
              />
            </div>
          </div>

          <div className="text-center">
            <div className="text-sm font-semibold tracking-wide bg-gradient-to-r from-white via-[#93c5fd] to-[#22d3ee] bg-clip-text text-transparent">
              SoVoice Calendar
            </div>
            <div className="mt-1 text-xs text-[color:var(--color-text-muted)]">
              Seite wird geladen…
            </div>
          </div>

          {/* Progress track */}
          <div className="w-48 h-1 rounded-full bg-white/5 overflow-hidden">
            <div
              className="h-full transition-[width] duration-200 ease-out rounded-full"
              style={{
                width: `${progress}%`,
                background:
                  "linear-gradient(90deg, #3b82f6, #22d3ee, #8b5cf6)",
                boxShadow: "0 0 14px rgba(59,130,246,0.6)",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
