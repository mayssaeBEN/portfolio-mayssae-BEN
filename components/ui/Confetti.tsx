"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

const COLORS = ["var(--color-primary)", "var(--color-secondary)", "var(--color-accent)"];
const ease = [0.16, 1, 0.3, 1] as const;

interface ConfettiProps {
  count?: number;
}

export default function Confetti({ count = 28 }: ConfettiProps) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        // Golden-angle spread keeps the burst looking organic without relying on Math.random.
        const angle = ((i * 137.5) % 360) * (Math.PI / 180);
        const distance = 90 + ((i * 53) % 230);
        return {
          id: i,
          x: Math.cos(angle) * distance,
          y: -Math.abs(Math.sin(angle) * distance) - 40,
          rotate: ((i * 137.5) % 360) - 180,
          scale: 0.5 + ((i * 0.137) % 0.8),
          color: COLORS[i % COLORS.length],
          delay: (i % 7) * 0.02,
          rounded: i % 2 === 0,
        };
      }),
    [count]
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          initial={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 0 }}
          animate={{ opacity: 0, x: p.x, y: p.y, rotate: p.rotate, scale: p.scale }}
          transition={{ duration: 1.1, delay: p.delay, ease }}
          className={p.rounded ? "absolute left-6 top-1/2 size-2.5 rounded-full" : "absolute left-6 top-1/2 size-2.5 rounded-sm"}
          style={{ background: p.color }}
        />
      ))}
    </div>
  );
}
