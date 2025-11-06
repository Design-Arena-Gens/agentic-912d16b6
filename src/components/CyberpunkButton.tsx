"use client";

import { motion, useMotionTemplate, useMotionValue, animate, type HTMLMotionProps } from "framer-motion";
import React, { useEffect } from "react";
import clsx from "clsx";

type BaseButtonProps = Omit<HTMLMotionProps<"button">, "children">;

export type CyberpunkButtonProps = BaseButtonProps & {
  glowColor?: string; // tailwind color or hex for glow
  accentColor?: string; // hex used in gradient accents
  size?: "sm" | "md" | "lg";
  children?: React.ReactNode;
};

const sizeClasses: Record<NonNullable<CyberpunkButtonProps["size"]>, string> = {
  sm: "text-xs px-4 py-2",
  md: "text-sm px-6 py-3",
  lg: "text-base px-8 py-4",
};

export function CyberpunkButton({
  children,
  className,
  glowColor = "#00f0ff",
  accentColor = "#ff00ea",
  size = "md",
  ...props
}: CyberpunkButtonProps) {
  // Subtle animated gradient angle for the border
  const angle = useMotionValue(0);
  const borderGradient = useMotionTemplate`conic-gradient(from ${angle}deg at 50% 50%, ${accentColor}, ${glowColor}, ${accentColor})`;

  useEffect(() => {
    const controls = animate(angle, [0, 360], {
      ease: "linear",
      duration: 12,
      repeat: Infinity,
    });
    return () => controls.stop();
  }, [angle]);

  return (
    <motion.button
      whileHover={{
        y: -1.5,
        boxShadow: `0 0 24px ${glowColor}80, 0 0 60px ${glowColor}40`,
      }}
      whileTap={{ y: 0, scale: 0.985 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={clsx(
        "relative inline-flex items-center justify-center select-none noise-overlay",
        "[text-shadow:0_0_20px_rgba(0,255,255,0.35),0_0_40px_rgba(255,0,234,0.25)]",
        "uppercase tracking-[0.2em] font-semibold",
        "rounded-xl",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {/* Glowing animated border */}
      <span
        aria-hidden
        className="absolute inset-0 rounded-xl p-[1px]"
        style={{ background: borderGradient as unknown as string }}
      >
        <span className="block h-full w-full rounded-[10px] bg-black/80 backdrop-blur-[1px]" />
      </span>

      {/* Subtle gradient fill */}
      <span className="absolute inset-[2px] rounded-[10px] bg-[radial-gradient(120%_120%_at_50%_0%,rgba(0,255,255,0.14),rgba(255,0,234,0.08)_35%,transparent_70%)]" />

      {/* Scanlines layer */}
      <span className="scanlines absolute inset-0 rounded-[10px]" aria-hidden />

      {/* Main label */}
      <span className="relative z-10 text-white drop-shadow-[0_0_10px_rgba(0,255,255,0.35)]">
        {children}
      </span>

      {/* Glitch layers */}
      <GlitchLayer color={glowColor} intensity={1}>{children}</GlitchLayer>
      <GlitchLayer color={accentColor} intensity={1.3} invert>
        {children}
      </GlitchLayer>
    </motion.button>
  );
}

function GlitchLayer({ children, color, intensity = 1, invert = false }: { children: React.ReactNode; color: string; intensity?: number; invert?: boolean }) {
  // periodic jitter
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    const controls = animate(
      0,
      [0, 1, 0, -1, 0],
      {
        duration: 0.8 + Math.random() * 0.6,
        repeat: Infinity,
        ease: "easeInOut",
        onUpdate: (v) => {
          const dx = (Math.random() * 2 - 1) * 2 * intensity;
          const dy = (Math.random() * 2 - 1) * 1.5 * intensity;
          x.set(dx * v);
          y.set(dy * v);
        },
      }
    );
    return () => controls.stop();
  }, [intensity, x, y]);

  return (
    <motion.span
      aria-hidden
      style={{ x, y }}
      className={clsx(
        "pointer-events-none absolute inset-0 flex items-center justify-center rounded-[10px]",
        invert ? "mix-blend-screen" : "mix-blend-lighten"
      )}
    >
      <span
        className="px-[inherit] py-[inherit] font-inherit uppercase tracking-[inherit]"
        style={{
          color,
          textShadow: `0 0 16px ${color}66, 0 0 32px ${color}33`,
          filter: invert ? "hue-rotate(20deg)" : undefined,
        }}
      >
        {/* a11y: aria-hidden duplication is visual only */}
        {children}
      </span>
    </motion.span>
  );
}

export default CyberpunkButton;
