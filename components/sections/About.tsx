"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Users,
  Sparkles,
  Shuffle,
  Compass,
  MapPin,
  GraduationCap,
  Languages as LanguagesIcon,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import TiltCard from "@/components/ui/TiltCard";
import Counter from "@/components/ui/Counter";
import { siteConfig, softSkills, languages, interests } from "@/data/site";

const ease = [0.16, 1, 0.3, 1] as const;

const softSkillIcons: Record<string, typeof Users> = {
  "Travail en équipe": Users,
  "Capacité d'adaptation": Shuffle,
  Créativité: Sparkles,
  Autonomie: Compass,
};

const stats = [
  { value: 3, suffix: "", label: "Projets concrets réalisés" },
  { value: 5, suffix: "", label: "Langues parlées" },
  { value: 2027, suffix: "", label: "Fin de formation RNCP 5" },
];

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <SectionHeading
          index="01"
          label="À propos"
          title="Au-delà du code"
          description="Curieuse, rigoureuse et autonome — je conçois des applications web robustes en gardant toujours un œil sur le détail et l'expérience utilisateur."
        />

        <div className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-20">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease }}
            className="relative mx-auto w-full max-w-sm"
          >
            <TiltCard className="relative">
              <div className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-linear-to-br from-primary via-secondary to-accent opacity-25 blur-3xl" />
              <div
                style={{ transform: "translateZ(0)" }}
                className="relative aspect-square overflow-hidden rounded-[2rem] border border-border shadow-2xl shadow-black/40"
              >
                <Image
                  src="/images/mayssae.jpg"
                  alt="Portrait de Mayssae Bentayeb"
                  fill
                  sizes="(min-width: 1024px) 24rem, 80vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-linear-to-t from-background/40 via-transparent to-transparent" />
              </div>
            </TiltCard>

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-6 -top-6 flex items-center gap-2 rounded-2xl border border-border bg-surface/90 px-4 py-2.5 shadow-xl shadow-black/30 backdrop-blur-xl"
            >
              <MapPin className="size-4 text-primary" />
              <span className="font-display text-sm font-medium text-foreground">
                {siteConfig.location}
              </span>
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 flex items-center gap-2 rounded-2xl border border-border bg-surface/90 px-4 py-2.5 shadow-xl shadow-black/30 backdrop-blur-xl"
            >
              <GraduationCap className="size-4 text-accent" />
              <span className="font-display text-sm font-medium text-foreground">
                Epitech · Web@Académie
              </span>
            </motion.div>
          </motion.div>

          {/* Text content */}
          <div>
            {siteConfig.longBio.map((paragraph, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, ease, delay: i * 0.1 }}
                className="mt-4 leading-relaxed text-muted first:mt-0"
              >
                {paragraph}
              </motion.p>
            ))}

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease, delay: 0.3 }}
              className="mt-10 grid grid-cols-3 gap-4"
            >
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="glow-border rounded-2xl border border-border bg-surface/60 px-4 py-5 text-center"
                >
                  <div className="font-display text-3xl font-semibold text-foreground sm:text-4xl">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="mt-2 text-xs leading-tight text-muted-2 sm:text-sm">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* Soft skills */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease, delay: 0.4 }}
              className="mt-10"
            >
              <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-2">
                Savoir-être
              </h3>
              <div className="mt-4 flex flex-wrap gap-3">
                {softSkills.map((skill) => {
                  const Icon = softSkillIcons[skill] ?? Sparkles;
                  return (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-2 text-sm text-foreground transition-colors hover:border-primary/40 hover:text-primary"
                    >
                      <Icon className="size-3.5" />
                      {skill}
                    </span>
                  );
                })}
              </div>
            </motion.div>

            {/* Languages & interests */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease, delay: 0.5 }}
              className="mt-8 grid gap-6 sm:grid-cols-2"
            >
              <div>
                <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-muted-2">
                  <LanguagesIcon className="size-3.5" />
                  Langues
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {languages.map((lang) => (
                    <span
                      key={lang}
                      className="rounded-full bg-surface-2 px-3.5 py-1.5 text-sm text-muted"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-2">
                  Centres d&apos;intérêt
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {interests.map((interest) => (
                    <span
                      key={interest.name}
                      className="inline-flex items-center gap-1.5 rounded-full bg-surface-2 px-3.5 py-1.5 text-sm text-muted"
                    >
                      <span>{interest.emoji}</span>
                      {interest.name}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
