import { useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export function RouteTransition() {
  const isLoading = useRouterState({
    select: (s) => s.status === "pending" || s.isLoading,
  });
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf: number | undefined;
    let timeout: ReturnType<typeof setTimeout> | undefined;
    if (isLoading) {
      setVisible(true);
      setProgress(10);
      const tick = () => {
        setProgress((p) => (p < 85 ? p + (90 - p) * 0.04 : p));
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    } else if (visible) {
      setProgress(100);
      timeout = setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, 350);
    }
    return () => {
      if (raf) cancelAnimationFrame(raf);
      if (timeout) clearTimeout(timeout);
    };
  }, [isLoading]);

  return (
    <>
      <div
        className="fixed top-0 left-0 right-0 z-[100] h-[2px] pointer-events-none transition-opacity duration-300"
        style={{ opacity: visible ? 1 : 0 }}
      >
        <div
          className="h-full transition-[width] duration-200 ease-out"
          style={{
            width: `${progress}%`,
            background:
              "linear-gradient(90deg, #3b82f6, #22d3ee, #8b5cf6)",
            boxShadow: "0 0 12px rgba(59,130,246,0.8)",
          }}
        />
      </div>
      {visible && (
        <div className="fixed inset-0 z-[99] pointer-events-none flex items-start justify-end p-6">
          <div className="glass-strong px-3.5 py-2 flex items-center gap-2 text-xs text-[color:var(--color-text-muted)] animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[color:var(--color-accent)] opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[color:var(--color-accent)]" />
            </span>
            Lädt…
          </div>
        </div>
      )}
    </>
  );
}
