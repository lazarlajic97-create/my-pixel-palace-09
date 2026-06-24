import { useEffect } from "react";
import { animate, motion, useMotionTemplate, useMotionValue } from "motion/react";

const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

export function AuroraBackground() {
  const color = useMotionValue(COLORS_TOP[0]);

  useEffect(() => {
    const controls = animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
    return () => controls.stop();
  }, [color]);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`;

  return (
    <motion.div
      aria-hidden
      className="absolute inset-0 -z-10 pointer-events-none"
      style={{ backgroundImage }}
    />
  );
}
