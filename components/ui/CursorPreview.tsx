"use client";

import { useState, type ReactNode, type MouseEvent } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

interface CursorPreviewProps {
  children: ReactNode;
  gradient: readonly [string, string];
  label: string;
  className?: string;
}

export default function CursorPreview({ children, gradient, label, className }: CursorPreviewProps) {
  const [hovered, setHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 30, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 300, damping: 30, mass: 0.5 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    x.set(e.clientX);
    y.set(e.clientY);
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      className={cn("inline-block", className)}
    >
      {children}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.25, ease }}
            style={{ x: springX, y: springY, translateX: "-50%", translateY: "-130%" }}
            className="pointer-events-none fixed left-0 top-0 z-50 hidden overflow-hidden rounded-2xl border border-border shadow-2xl shadow-black/40 lg:block"
          >
            <div
              className="flex h-28 w-44 flex-col items-center justify-center gap-2 p-4 text-center"
              style={{ background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})` }}
            >
              <span className="font-display text-sm font-semibold text-background">{label}</span>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-background/80">
                Voir le projet
                <ArrowUpRight className="size-3.5" />
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
