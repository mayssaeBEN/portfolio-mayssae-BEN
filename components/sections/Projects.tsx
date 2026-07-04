"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { SiGithub } from "react-icons/si";
import SectionHeading from "@/components/ui/SectionHeading";
import TiltCard from "@/components/ui/TiltCard";
import ProjectMockup from "@/components/ui/ProjectMockup";
import CursorPreview from "@/components/ui/CursorPreview";
import { projects, projectFilters, type Project } from "@/data/projects";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

const mockups: Record<
  string,
  { variant: "dashboard" | "feed" | "table"; label: string; image?: string }
> = {
  corelab: {
    variant: "dashboard",
    label: "app.corelab.io/dashboard",
    image: "/projects/corelab.png",
  },
  connectin: {
    variant: "feed",
    label: "connectin.app/feed",
    image: "/projects/connectin.png",
  },
  mycinema: {
    variant: "table",
    label: "admin.mycinema.fr/planning",
    image: "/projects/mycinema.png",
  },
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const isOdd = index % 2 === 1;
  const mockup = mockups[project.id];

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease }}
      className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
    >
      <div className={cn(isOdd && "lg:order-2")}>
        <TiltCard intensity={5} className="group">
          <div className="relative aspect-4/3">
            <div
              className="absolute -inset-px -z-10 rounded-[1.75rem] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-50"
              style={{ background: `linear-gradient(135deg, ${project.gradient[0]}, ${project.gradient[1]})` }}
            />
            <ProjectMockup
              variant={mockup.variant}
              gradient={project.gradient}
              accent={project.accent}
              label={mockup.label}
              image={mockup.image}
            />
          </div>
        </TiltCard>
      </div>

      <div className={cn(isOdd && "lg:order-1")}>
        <span className="font-display text-sm font-medium text-muted-2">
          Projet {String(index + 1).padStart(2, "0")}
        </span>
        <CursorPreview gradient={project.gradient} label={project.subtitle}>
          <h3 className="mt-2 font-display text-3xl font-semibold text-foreground sm:text-4xl">
            {project.title}
          </h3>
        </CursorPreview>
        <p className="mt-1 text-sm font-medium" style={{ color: project.accent }}>
          {project.subtitle}
        </p>

        <p className="mt-4 leading-relaxed text-muted">{project.description}</p>

        <ul className="mt-5 grid gap-2 sm:grid-cols-2">
          {project.highlights.map((highlight) => (
            <li key={highlight} className="flex items-start gap-2 text-sm text-muted">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-accent" />
              {highlight}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span
              key={tech.name}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-2/60 px-3 py-1.5 text-xs font-medium text-muted"
            >
              {tech.icon && <tech.icon className="size-3.5" />}
              {tech.name}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={project.links.repo}
            target="_blank"
            rel="noreferrer"
            data-cursor="true"
            className="inline-flex items-center gap-2 rounded-full border border-border-strong px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-foreground/40"
          >
            <SiGithub className="size-4" />
            Code source
          </a>
          {project.links.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noreferrer"
              data-cursor="true"
              className="group btn-glow inline-flex items-center gap-2 rounded-full bg-linear-to-r from-primary to-secondary px-5 py-2.5 text-sm font-semibold text-background transition-transform hover:scale-105"
            >
              Démo live
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState<(typeof projectFilters)[number]>("Tous");

  const filtered =
    filter === "Tous" ? projects : projects.filter((p) => p.tags.includes(filter));

  return (
    <section id="projets" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <SectionHeading
          index="04"
          label="Projets"
          title="Réalisations récentes"
          description="Trois projets concrets, menés du cahier des charges à la mise en production, illustrant mes compétences front-end, back-end et architecture."
        />

        <div className="mb-12 flex flex-wrap gap-2">
          {projectFilters.map((f) => (
            <button
              key={f}
              type="button"
              data-cursor="true"
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                filter === f
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted hover:border-border-strong hover:text-foreground"
              )}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-24 md:gap-32">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </AnimatePresence>

          {filtered.length === 0 && (
            <p className="text-center text-muted">
              Aucun projet ne correspond à ce filtre pour le moment.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
