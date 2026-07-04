"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { skillCategories } from "@/data/skills";

const ease = [0.16, 1, 0.3, 1] as const;

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease } },
};

export default function Skills() {
  return (
    <section id="competences" className="relative py-24 md:py-32">
      <div className="bg-aurora pointer-events-none absolute inset-0 opacity-15" />

      <div className="relative mx-auto max-w-6xl px-6 md:px-10">
        <SectionHeading
          index="03"
          label="Compétences"
          title="Ma boîte à outils"
          description="Une stack pensée pour construire des applications complètes, du modèle de données à l'interface — avec une attention particulière à la qualité et aux tests."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, ci) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease, delay: ci * 0.06 }}
              className="glow-border rounded-3xl border border-border bg-surface/60 p-6 transition-colors md:p-7"
            >
              <h3 className="font-display text-lg font-semibold text-foreground">
                {category.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">
                {category.description}
              </p>

              <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
                className="mt-5 flex flex-wrap gap-2.5"
              >
                {category.skills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    variants={item}
                    whileHover={{ y: -3 }}
                    className="group flex items-center gap-2 rounded-xl border border-border bg-surface-2/60 px-3 py-2 text-sm text-muted transition-colors hover:border-primary/40 hover:text-foreground"
                  >
                    <skill.icon className="size-4 shrink-0 text-muted-2 transition-colors group-hover:text-primary" />
                    {skill.name}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
