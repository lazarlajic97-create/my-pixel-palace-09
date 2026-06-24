import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

function getInitial(): Theme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.classList.contains("light") ? "light" : "dark";
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitial);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("light", theme === "light");
    root.classList.toggle("dark", theme === "dark");
    try { localStorage.setItem("sovoice-theme", theme); } catch {}
  }, [theme]);

  return { theme, toggle: () => setTheme((t) => (t === "dark" ? "light" : "dark")) };
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";
  return (
    <button
      onClick={toggle}
      aria-label={isDark ? "Light Mode aktivieren" : "Dark Mode aktivieren"}
      title={isDark ? "Light Mode" : "Dark Mode"}
      className={`relative inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[color:var(--color-border-strong)] bg-white/[0.04] hover:bg-white/[0.08] transition ${className}`}
    >
      <Sun className={`h-4 w-4 transition-all ${isDark ? "opacity-0 -rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"} absolute`} />
      <Moon className={`h-4 w-4 transition-all ${isDark ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-90 scale-50"} absolute`} />
    </button>
  );
}
