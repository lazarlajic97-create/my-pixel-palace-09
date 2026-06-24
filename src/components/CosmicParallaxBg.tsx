import { useEffect, useMemo, type ReactNode } from "react";

interface CosmicParallaxBgProps {
  head: string;
  text: string;
  loop?: boolean;
  className?: string;
  children?: ReactNode;
}

function generateStarBoxShadow(count: number): string {
  const shadows: string[] = [];
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * 2000);
    const y = Math.floor(Math.random() * 2000);
    shadows.push(`${x}px ${y}px var(--star-color, #FFF)`);
  }
  return shadows.join(", ");
}

export function CosmicParallaxBg({
  head,
  text,
  loop = true,
  className = "",
  children,
}: CosmicParallaxBgProps) {
  const { small, medium, big } = useMemo(
    () => ({
      small: generateStarBoxShadow(700),
      medium: generateStarBoxShadow(200),
      big: generateStarBoxShadow(100),
    }),
    [],
  );

  const textParts = text.split(",").map((p) => p.trim());

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--animation-iteration",
      loop ? "infinite" : "1",
    );
  }, [loop]);

  const animNames = ["animGravity", "animDont", "animLet", "animGo"];

  return (
    <div
      className={`cosmic-wrap relative overflow-hidden ${className}`}
      style={{
        background:
          "radial-gradient(ellipse at bottom, #0b1a3a 0%, #05070d 70%)",
      }}
    >
      <div
        className="cosmic-stars"
        style={
          {
            width: 1,
            height: 1,
            background: "transparent",
            boxShadow: small,
            animation: "animStar 50s linear var(--animation-iteration)",
          } as React.CSSProperties
        }
      />
      <div
        className="cosmic-stars"
        style={{
          width: 2,
          height: 2,
          background: "transparent",
          boxShadow: medium,
          animation: "animStar 100s linear var(--animation-iteration)",
        }}
      />
      <div
        className="cosmic-stars"
        style={{
          width: 3,
          height: 3,
          background: "transparent",
          boxShadow: big,
          animation: "animStar 150s linear var(--animation-iteration)",
        }}
      />

      {/* Horizon glow */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(59,130,246,0.55) 0%, rgba(34,211,238,0.18) 30%, transparent 60%)",
        }}
      />
      {/* Earth curve */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-[-60%] w-[180%] aspect-square rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, #1e3a8a 0%, #0a0f1c 55%, transparent 70%)",
          boxShadow: "0 -30px 80px -10px rgba(59,130,246,0.45)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
        <h1
          className="cosmic-head font-bold tracking-tight"
          style={{
            fontSize: "clamp(2.5rem, 8vw, 6rem)",
            background:
              "linear-gradient(180deg, #ffffff 0%, #93c5fd 60%, #22d3ee 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 0 40px rgba(59,130,246,0.4)",
          }}
        >
          {head.toUpperCase()}
        </h1>
        <div className="mt-6 flex flex-wrap justify-center gap-x-2 text-sm md:text-base font-semibold text-[color:var(--color-text-muted)] uppercase">
          {textParts.map((part, i) => (
            <span
              key={i}
              style={{
                animation: `${animNames[i % animNames.length]} 6s ease-in-out var(--animation-iteration)`,
                display: "inline-block",
                letterSpacing: "0.2em",
              }}
            >
              {part}
            </span>
          ))}
        </div>
        {children}
      </div>
    </div>
  );
}
