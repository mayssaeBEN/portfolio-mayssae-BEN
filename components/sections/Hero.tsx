"use client";

import { useRef, type PointerEvent } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useMotionTemplate,
} from "framer-motion";
import { ArrowDown, ArrowUpRight, Sparkles } from "lucide-react";
import {
  SiReact,
  SiTypescript,
  SiNodedotjs,
  SiLaravel,
  SiMongodb,
  SiTailwindcss,
  SiDocker,
  SiExpress,
} from "react-icons/si";
import RevealText from "@/components/ui/RevealText";
import MagneticButton from "@/components/ui/MagneticButton";
import TypewriterText from "@/components/ui/TypewriterText";
import { siteConfig, heroRoles } from "@/data/site";

const marqueeItems = [
  { name: "React", icon: SiReact },
  { name: "TypeScript", icon: SiTypescript },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "Express", icon: SiExpress },
  { name: "Laravel", icon: SiLaravel },
  { name: "MongoDB", icon: SiMongodb },
  { name: "Tailwind CSS", icon: SiTailwindcss },
  { name: "Docker", icon: SiDocker },
];

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const blobOneY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const blobTwoY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const spotlightX = useMotionValue(50);
  const spotlightY = useMotionValue(40);
  const spotlightBackground = useMotionTemplate`radial-gradient(700px circle at ${spotlightX}% ${spotlightY}%, color-mix(in srgb, var(--color-primary) 20%, transparent), transparent 70%)`;

  const handlePointerMove = (e: PointerEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    spotlightX.set(((e.clientX - rect.left) / rect.width) * 100);
    spotlightY.set(((e.clientY - rect.top) / rect.height) * 100);
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-20"
    >
      {/* Background layers */}
      <div className="bg-aurora pointer-events-none absolute inset-0 opacity-60" />
      <motion.div
        className="pointer-events-none absolute inset-0 hidden lg:block"
        style={{ background: spotlightBackground }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #f6f3fc 1px, transparent 1px), linear-gradient(to bottom, #f6f3fc 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
        }}
      />
      <motion.div
        style={{ y: blobOneY }}
        className="pointer-events-none absolute -left-32 top-0 size-[28rem] rounded-full bg-primary/25 blur-[120px]"
      />
      <motion.div
        style={{ y: blobTwoY }}
        className="pointer-events-none absolute -right-24 top-40 size-[24rem] rounded-full bg-secondary/25 blur-[120px]"
      />
      <div className="bg-grain pointer-events-none absolute inset-0 opacity-30" />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative mx-auto grid w-full max-w-6xl gap-16 px-6 md:px-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-12"
      >
        {/* Text column */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.1 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-4 py-1.5 text-sm font-medium text-muted backdrop-blur-xl"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            {siteConfig.availability}
          </motion.div>

          <h1 className="font-display font-semibold leading-[1.05] tracking-tight text-foreground">
            <span className="block font-serif text-2xl italic text-muted sm:text-3xl">
              <RevealText text="Salut, je suis" />
            </span>
            <span className="mt-2 block text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem]">
              <RevealText text="Mayssae" delay={0.05} />
            </span>
            <span className="block text-5xl text-gradient sm:text-6xl md:text-7xl lg:text-[5.5rem]">
              <RevealText text="Bentayeb." delay={0.15} />
            </span>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.35 }}
            className="mt-5 flex items-center gap-2 font-mono text-sm text-muted sm:text-base"
          >
            <span className="text-accent">{">"}</span>
            <TypewriterText words={heroRoles} className="text-foreground" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.5 }}
            className="mt-4 max-w-xl text-lg leading-relaxed text-muted"
          >
            {siteConfig.shortBio}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.6 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <MagneticButton>
              <a
                href="#projets"
                data-cursor="true"
                className="group btn-glow inline-flex items-center gap-2 rounded-full bg-linear-to-r from-primary to-secondary px-7 py-3.5 text-sm font-semibold text-background transition-transform hover:scale-105"
              >
                Voir mes projets
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </MagneticButton>
            <MagneticButton>
              <a
                href="#contact"
                data-cursor="true"
                className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface/60 px-7 py-3.5 text-sm font-semibold text-foreground backdrop-blur-xl transition-colors hover:border-foreground/40"
              >
                Me contacter
              </a>
            </MagneticButton>
          </motion.div>
        </div>

        {/* Floating code card */}
        <motion.div
          initial={{ opacity: 0, y: 24, rotate: -2 }}
          animate={{ opacity: 1, y: 0, rotate: -2 }}
          transition={{ duration: 0.8, ease, delay: 0.4 }}
          whileHover={{ rotate: 0, scale: 1.02 }}
          className="relative mx-auto hidden w-full max-w-md lg:block"
        >
          <div className="absolute -inset-px -z-10 rounded-3xl bg-linear-to-br from-primary/40 via-secondary/30 to-accent/40 opacity-40 blur-2xl" />
          <div className="overflow-hidden rounded-2xl border border-border bg-surface/80 shadow-2xl shadow-black/40 backdrop-blur-xl">
            <div className="flex items-center gap-2 border-b border-border px-4 py-3">
              <span className="size-2.5 rounded-full bg-[#FF6452]" />
              <span className="size-2.5 rounded-full bg-[#F5C84B]" />
              <span className="size-2.5 rounded-full bg-[#5FE3C0]" />
              <span className="ml-2 font-display text-xs text-muted-2">
                profil.ts
              </span>
            </div>
            <pre className="overflow-x-auto p-6 text-[13px] leading-relaxed">
              <code className="font-mono">
                <span className="text-secondary">const</span>{" "}
                <span className="text-foreground">developpeuse</span>{" "}
                <span className="text-muted-2">=</span>{" "}
                <span className="text-muted-2">{"{"}</span>
                {"\n  "}
                <span className="text-accent">nom</span>
                <span className="text-muted-2">:</span>{" "}
                <span className="text-primary">&apos;Mayssae Bentayeb&apos;</span>
                <span className="text-muted-2">,</span>
                {"\n  "}
                <span className="text-accent">role</span>
                <span className="text-muted-2">:</span>{" "}
                <span className="text-primary">&apos;Full Stack Developer&apos;</span>
                <span className="text-muted-2">,</span>
                {"\n  "}
                <span className="text-accent">stack</span>
                <span className="text-muted-2">:</span>{" "}
                <span className="text-muted-2">[</span>
                <span className="text-primary">&apos;React&apos;</span>
                <span className="text-muted-2">,</span>{" "}
                <span className="text-primary">&apos;Node&apos;</span>
                <span className="text-muted-2">,</span>{" "}
                <span className="text-primary">&apos;Laravel&apos;</span>
                <span className="text-muted-2">],</span>
                {"\n  "}
                <span className="text-accent">localisation</span>
                <span className="text-muted-2">:</span>{" "}
                <span className="text-primary">&apos;Paris, FR&apos;</span>
                <span className="text-muted-2">,</span>
                {"\n  "}
                <span className="text-accent">disponible</span>
                <span className="text-muted-2">:</span>{" "}
                <span className="text-secondary">true</span>
                <span className="text-muted-2">,</span>
                {"\n"}
                <span className="text-muted-2">{"}"}</span>
                <span className="text-muted-2">;</span>
              </code>
            </pre>
          </div>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-6 -left-8 flex items-center gap-2 rounded-2xl border border-border bg-surface/90 px-4 py-3 shadow-xl shadow-black/30 backdrop-blur-xl"
          >
            <Sparkles className="size-4 text-accent" />
            <span className="font-display text-sm font-medium text-foreground">
              Prête pour l&apos;alternance
            </span>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Tech marquee */}
      <div className="absolute inset-x-0 bottom-24 hidden md:block">
        <div className="relative overflow-hidden border-y border-border/60 py-3">
          <div className="bg-linear-to-r from-background via-transparent to-background pointer-events-none absolute inset-0 z-10" />
          <div className="animate-marquee flex w-max items-center gap-12 whitespace-nowrap">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span
                key={`${item.name}-${i}`}
                className="flex items-center gap-2 text-sm font-medium text-muted-2"
              >
                <item.icon className="size-4" />
                {item.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="absolute inset-x-0 bottom-6 flex flex-col items-center gap-2 text-muted-2"
      >
        <span className="text-[11px] font-medium uppercase tracking-[0.3em]">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="size-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
