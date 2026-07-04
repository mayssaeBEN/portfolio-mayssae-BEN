"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";
import SectionHeading from "@/components/ui/SectionHeading";
import MagneticButton from "@/components/ui/MagneticButton";
import Confetti from "@/components/ui/Confetti";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

const contactSchema = z.object({
  name: z.string().min(2, "Indiquez votre nom (2 caractères min.)"),
  email: z.string().email("Adresse email invalide"),
  subject: z.string().min(2, "Indiquez un sujet"),
  message: z.string().min(10, "Votre message doit faire au moins 10 caractères"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const contactInfo = [
  { label: "Email", value: siteConfig.email, href: siteConfig.links.email, icon: Mail },
  { label: "Téléphone", value: siteConfig.phone, href: siteConfig.links.phone, icon: Phone },
  { label: "Localisation", value: siteConfig.location, href: undefined, icon: MapPin },
];

const socials = [
  { name: "GitHub", href: siteConfig.links.github, icon: SiGithub },
  { name: "LinkedIn", href: siteConfig.links.linkedin, icon: FaLinkedin },
];

export default function Contact() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: ContactFormData) => {
    const body = `Nom : ${data.name}\nEmail : ${data.email}\n\n${data.message}`;
    const mailto = `${siteConfig.links.email}?subject=${encodeURIComponent(
      data.subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
    setSent(true);
    reset();
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <section id="contact" className="relative overflow-hidden py-24 md:py-32">
      <div className="bg-aurora pointer-events-none absolute inset-0 opacity-20" />

      <div className="relative mx-auto max-w-6xl px-6 md:px-10">
        <SectionHeading
          index="06"
          label="Contact"
          title="Travaillons ensemble"
          description="En recherche active d'une alternance dès septembre 2026 — n'hésitez pas à me contacter pour échanger sur une opportunité ou un projet."
        />

        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease }}
          >
            <p className="text-lg leading-relaxed text-muted">
              Une question, une offre d&apos;alternance ou simplement envie d&apos;échanger ?
              Toutes les coordonnées sont ici.
            </p>

            <div className="mt-8 space-y-3">
              {contactInfo.map((item) => {
                const content = (
                  <>
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-border bg-surface-2/60 text-primary transition-colors group-hover:border-primary/40">
                      <item.icon className="size-5" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-2">
                        {item.label}
                      </p>
                      <p className="font-display text-base font-medium text-foreground sm:text-lg">
                        {item.value}
                      </p>
                    </div>
                  </>
                );

                return item.href ? (
                  <a
                    key={item.label}
                    href={item.href}
                    data-cursor="true"
                    className="group flex items-center gap-4 rounded-2xl border border-border bg-surface/60 p-4 transition-colors hover:border-border-strong"
                  >
                    {content}
                  </a>
                ) : (
                  <div
                    key={item.label}
                    className="group flex items-center gap-4 rounded-2xl border border-border bg-surface/60 p-4"
                  >
                    {content}
                  </div>
                );
              })}
            </div>

            <div className="mt-10">
              <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-2">
                Retrouvez-moi aussi sur
              </h3>
              <div className="mt-4 flex gap-3">
                {socials.map((social) => (
                  <MagneticButton key={social.name}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor="true"
                      aria-label={social.name}
                      className="flex size-12 items-center justify-center rounded-full border border-border text-muted transition-all hover:-translate-y-1 hover:border-border-strong hover:text-foreground"
                    >
                      <social.icon className="size-5" />
                    </a>
                  </MagneticButton>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease, delay: 0.1 }}
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-3xl border border-border bg-surface/60 p-6 sm:p-8"
            noValidate
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-2">
                  Nom
                </label>
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Votre nom"
                  {...register("name")}
                  className={cn(
                    "mt-2 w-full rounded-xl border bg-surface px-4 py-3 text-foreground placeholder:text-muted-2 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20",
                    errors.name ? "border-danger/60" : "border-border focus:border-primary/50"
                  )}
                />
                {errors.name && <p className="mt-1.5 text-xs text-danger">{errors.name.message}</p>}
              </div>

              <div>
                <label htmlFor="email" className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="vous@exemple.com"
                  {...register("email")}
                  className={cn(
                    "mt-2 w-full rounded-xl border bg-surface px-4 py-3 text-foreground placeholder:text-muted-2 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20",
                    errors.email ? "border-danger/60" : "border-border focus:border-primary/50"
                  )}
                />
                {errors.email && <p className="mt-1.5 text-xs text-danger">{errors.email.message}</p>}
              </div>
            </div>

            <div className="mt-5">
              <label htmlFor="subject" className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-2">
                Sujet
              </label>
              <input
                id="subject"
                type="text"
                placeholder="Proposition d'alternance, projet, question..."
                {...register("subject")}
                className={cn(
                  "mt-2 w-full rounded-xl border bg-surface px-4 py-3 text-foreground placeholder:text-muted-2 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20",
                  errors.subject ? "border-danger/60" : "border-border focus:border-primary/50"
                )}
              />
              {errors.subject && <p className="mt-1.5 text-xs text-danger">{errors.subject.message}</p>}
            </div>

            <div className="mt-5">
              <label htmlFor="message" className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-2">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                placeholder="Décrivez votre projet ou votre offre..."
                {...register("message")}
                className={cn(
                  "mt-2 w-full resize-none rounded-xl border bg-surface px-4 py-3 text-foreground placeholder:text-muted-2 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20",
                  errors.message ? "border-danger/60" : "border-border focus:border-primary/50"
                )}
              />
              {errors.message && <p className="mt-1.5 text-xs text-danger">{errors.message.message}</p>}
            </div>

            <div className="relative mt-6 flex flex-wrap items-center gap-4">
              {sent && <Confetti />}
              <MagneticButton>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  data-cursor="true"
                  className="group btn-glow inline-flex items-center gap-2 rounded-full bg-linear-to-r from-primary to-secondary px-7 py-3.5 text-sm font-semibold text-background transition-transform hover:scale-105 disabled:opacity-60"
                >
                  Envoyer le message
                  <Send className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </MagneticButton>

              <AnimatePresence>
                {sent && (
                  <motion.p
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="inline-flex items-center gap-2 text-sm text-accent"
                  >
                    <CheckCircle2 className="size-4" />
                    Votre client mail va s&apos;ouvrir — à très vite !
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
