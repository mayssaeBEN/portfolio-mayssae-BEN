"use client";

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { GraduationCap, Briefcase } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { timeline } from "@/data/timeline";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  return (
    <section id="parcours" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <SectionHeading
          index="02"
          label="Parcours"
          title="Mon chemin jusqu'ici"
          description="Des olympiades de mathématiques aux salles de classe d'Epitech — un parcours façonné par la curiosité, la rigueur et l'envie d'apprendre."
        />

        <div ref={containerRef} className="relative">
          {/* Base line */}
          <div className="absolute left-4 top-2 h-[calc(100%-1rem)] w-px bg-border md:left-1/2 md:-translate-x-1/2" />
          {/* Animated progress line */}
          <motion.div
            style={{ scaleY: scrollYProgress }}
            className="absolute left-4 top-2 h-[calc(100%-1rem)] w-px origin-top bg-linear-to-b from-primary via-secondary to-accent md:left-1/2 md:-translate-x-1/2"
          />

          <div className="space-y-10 md:space-y-14">
            {timeline.map((item, i) => {
              const isEven = i % 2 === 0;
              const Icon = item.category === "education" ? GraduationCap : Briefcase;
              const accent =
                item.category === "education" ? "text-secondary" : "text-primary";
              const dotColor =
                item.category === "education" ? "bg-secondary" : "bg-primary";
              const accentBg =
                item.category === "education"
                  ? "bg-secondary/15 border-secondary/30"
                  : "bg-primary/15 border-primary/30";

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, ease, delay: 0.05 }}
                  className="relative pl-12 md:grid md:grid-cols-2 md:gap-x-12 md:pl-0"
                >
                  {/* Dot */}
                  <div
                    className={cn(
                      "absolute left-4 top-1 flex size-9 -translate-x-1/2 items-center justify-center rounded-full border bg-surface md:left-1/2",
                      accentBg
                    )}
                  >
                    <Icon className={cn("size-4", accent)} />
                    {item.current && (
                      <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent/40" />
                    )}
                  </div>

                  {/* Content */}
                  <div
                    className={cn(
                      isEven
                        ? "md:col-start-1 md:pr-16"
                        : "md:col-start-2 md:pl-16"
                    )}
                  >
                    <div className="glow-border group rounded-2xl border border-border bg-surface/60 p-6 transition-colors">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={cn(
                            "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider",
                            accentBg,
                            accent
                          )}
                        >
                          {item.period}
                        </span>
                        {item.current && (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
                            <span className="relative flex size-1.5">
                              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75" />
                              <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
                            </span>
                            En cours
                          </span>
                        )}
                      </div>

                      <h3 className="mt-3 font-display text-xl font-semibold text-foreground sm:text-2xl">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted-2">
                        {item.organization}
                        {item.location ? ` · ${item.location}` : ""}
                      </p>

                      <ul className="mt-4 space-y-2">
                        {item.description.map((line) => (
                          <li
                            key={line}
                            className="flex gap-2.5 text-sm leading-relaxed text-muted"
                          >
                            <span className={cn("mt-2 size-1.5 shrink-0 rounded-full", dotColor)} />
                            {line}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
