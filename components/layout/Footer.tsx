"use client";

import { ArrowUp, Mail } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";
import { navLinks, siteConfig } from "@/data/site";

const socials = [
  { name: "GitHub", href: siteConfig.links.github, icon: SiGithub },
  { name: "LinkedIn", href: siteConfig.links.linkedin, icon: FaLinkedin },
  { name: "Email", href: siteConfig.links.email, icon: Mail },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-border bg-surface">
      <div className="bg-aurora pointer-events-none absolute inset-0 opacity-20" />

      <div className="relative mx-auto max-w-6xl px-6 py-16 md:px-10">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <div>
            <a
              href="#hero"
              data-cursor="true"
              className="font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl"
            >
              Mayssae<span className="text-gradient">.</span>
            </a>
            <p className="mt-3 max-w-sm text-sm text-muted">
              {siteConfig.availability}.
              <br />
              Conçu et développé avec soin à Paris.
            </p>
          </div>

          <div className="flex gap-3">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel={social.href.startsWith("http") ? "noreferrer" : undefined}
                data-cursor="true"
                aria-label={social.name}
                className="flex size-11 items-center justify-center rounded-full border border-border text-muted transition-all hover:-translate-y-1 hover:border-border-strong hover:text-foreground"
              >
                <social.icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col-reverse items-center justify-between gap-6 border-t border-border pt-8 text-sm text-muted-2 md:flex-row">
          <p>
            © {year} {siteConfig.name}. Tous droits réservés.
          </p>

          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-cursor="true"
                className="transition-colors hover:text-foreground"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <a
            href="#hero"
            data-cursor="true"
            aria-label="Retour en haut"
            className="flex size-11 items-center justify-center rounded-full border border-border text-muted transition-all hover:-translate-y-1 hover:border-border-strong hover:text-foreground"
          >
            <ArrowUp className="size-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
