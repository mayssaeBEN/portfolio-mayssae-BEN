"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, AnimatePresence, animate } from "framer-motion";
import { siteConfig } from "@/data/site";

const STORAGE_KEY = "portfolio-visited";
const ease = [0.16, 1, 0.3, 1] as const;

function subscribe() {
  return () => {};
}

function getSnapshot() {
  if (typeof window === "undefined") return false;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const alreadyVisited = sessionStorage.getItem(STORAGE_KEY);
  return !alreadyVisited && !reduceMotion;
}

function getServerSnapshot() {
  return false;
}

export default function Preloader() {
  const shouldShow = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [dismissed, setDismissed] = useState(false);
  const [progress, setProgress] = useState(0);
  const visible = shouldShow && !dismissed;

  useEffect(() => {
    if (!shouldShow || dismissed) return;

    sessionStorage.setItem(STORAGE_KEY, "1");
    document.body.style.overflow = "hidden";

    const controls = animate(0, 100, {
      duration: 1.6,
      ease,
      onUpdate: (v) => setProgress(Math.round(v)),
      onComplete: () => {
        setTimeout(() => {
          setDismissed(true);
          document.body.style.overflow = "";
        }, 250);
      },
    });

    return () => controls.stop();
  }, [shouldShow, dismissed]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          exit={{ y: "-100%" }}
          transition={{ duration: 0.7, ease }}
          className="fixed inset-0 z-100 flex flex-col items-center justify-center gap-6 bg-background"
        >
          <div className="bg-aurora pointer-events-none absolute inset-0 opacity-40" />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, ease }}
            className="relative font-display text-5xl font-semibold tracking-tight text-gradient sm:text-6xl"
          >
            {siteConfig.initials}
          </motion.div>

          <div className="relative h-px w-48 overflow-hidden rounded-full bg-surface-2 sm:w-64">
            <motion.div
              className="absolute inset-y-0 left-0 bg-linear-to-r from-primary via-secondary to-accent"
              style={{ width: `${progress}%` }}
            />
          </div>

          <span className="relative font-mono text-xs text-muted-2">{progress}%</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
