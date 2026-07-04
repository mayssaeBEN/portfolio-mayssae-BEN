"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/data/site";

const ease = [0.16, 1, 0.3, 1] as const;

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

const LEVEL_COLORS = [
  "var(--color-surface-2)",
  "color-mix(in srgb, var(--color-primary) 35%, var(--color-surface-2))",
  "color-mix(in srgb, var(--color-primary) 70%, var(--color-surface-2))",
  "color-mix(in srgb, var(--color-secondary) 75%, var(--color-primary))",
  "var(--color-secondary)",
];

type Status = "loading" | "success" | "error";

export default function ContributionGraph() {
  const [status, setStatus] = useState<Status>("loading");
  const [days, setDays] = useState<ContributionDay[]>([]);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        const res = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${siteConfig.githubUsername}?y=last`,
          { signal: controller.signal }
        );
        if (!res.ok) throw new Error("Contributions not found");
        const data: { contributions: ContributionDay[] } = await res.json();
        setDays(data.contributions);
        setStatus("success");
      } catch {
        setStatus("error");
      }
    }

    load();
    return () => controller.abort();
  }, []);

  if (status === "loading") {
    return <div className="col-span-full h-40 animate-pulse rounded-3xl border border-border bg-surface/60" />;
  }

  if (status === "error" || days.length === 0) return null;

  const firstDay = new Date(`${days[0].date}T00:00:00Z`).getUTCDay();
  const padded: (ContributionDay | null)[] = [...Array(firstDay).fill(null), ...days];
  const weeks: (ContributionDay | null)[][] = [];
  for (let i = 0; i < padded.length; i += 7) {
    weeks.push(padded.slice(i, i + 7));
  }
  const lastWeek = weeks[weeks.length - 1];
  while (lastWeek.length < 7) lastWeek.push(null);

  const total = days.reduce((sum, d) => sum + d.count, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease }}
      className="glow-border col-span-full rounded-3xl border border-border bg-surface/60 p-6 sm:p-7"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h4 className="font-display text-base font-semibold text-foreground">
          Activité sur les 12 derniers mois
        </h4>
        <p className="text-sm text-muted-2">
          <span className="font-display font-semibold text-foreground">{total}</span> contribution
          {total === 1 ? "" : "s"}
        </p>
      </div>

      <div className="mt-5 overflow-x-auto pb-2">
        <div className="flex w-max gap-[3px]">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[3px]">
              {week.map((day, di) => (
                <motion.div
                  key={di}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: (wi * 7 + di) * 0.0015 }}
                  title={
                    day
                      ? `${day.count} contribution${day.count === 1 ? "" : "s"} · ${day.date}`
                      : undefined
                  }
                  className="size-[10px] shrink-0 rounded-[2px]"
                  style={{ background: day ? LEVEL_COLORS[day.level] ?? LEVEL_COLORS[0] : "transparent" }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-end gap-1.5 text-[11px] text-muted-2">
        <span>Moins</span>
        {LEVEL_COLORS.map((color, i) => (
          <span key={i} className="size-[10px] rounded-[2px]" style={{ background: color }} />
        ))}
        <span>Plus</span>
      </div>
    </motion.div>
  );
}
