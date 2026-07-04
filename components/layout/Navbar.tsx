"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Search } from "lucide-react";
import { navLinks, siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.querySelector(link.href))
      .filter((el): el is Element => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <motion.div
        className="fixed inset-x-0 top-0 z-50 h-px origin-left bg-linear-to-r from-primary via-secondary to-accent"
        style={{ scaleX: progress }}
      />

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-all duration-500",
          scrolled
            ? "py-3"
            : "py-5"
        )}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 md:px-10">
          <div
            className={cn(
              "flex w-full items-center justify-between rounded-full border px-4 py-2.5 transition-all duration-500 md:px-6",
              scrolled
                ? "border-border bg-surface/70 backdrop-blur-xl shadow-[0_8px_30px_-15px_rgba(0,0,0,0.6)]"
                : "border-transparent bg-transparent"
            )}
          >
            <a
              href="#hero"
              data-cursor="true"
              className="font-display text-lg font-semibold tracking-tight text-foreground"
            >
              <span className="text-gradient">{siteConfig.initials}</span>
              <span className="hidden sm:inline">
                {" "}
                / {siteConfig.name.split(" ")[0]}
              </span>
            </a>

            <nav className="hidden items-center gap-1 lg:flex">
              {navLinks.map((link) => {
                const id = link.href.replace("#", "");
                const isActive = activeSection === id;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    data-cursor="true"
                    className={cn(
                      "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "text-foreground"
                        : "text-muted hover:text-foreground"
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-full bg-surface-2"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{link.name}</span>
                  </a>
                );
              })}
            </nav>

            <button
              type="button"
              data-cursor="true"
              aria-label="Ouvrir la palette de commandes"
              onClick={() => window.dispatchEvent(new Event("command-palette:toggle"))}
              className="hidden items-center gap-2 rounded-full border border-border-strong bg-surface/60 px-3 py-2 text-xs font-medium text-muted-2 backdrop-blur-xl transition-colors hover:border-foreground/40 hover:text-foreground lg:flex"
            >
              <Search className="size-3.5" />
              <kbd className="font-display text-[11px]">⌘K</kbd>
            </button>

            <a
              href="#contact"
              data-cursor="true"
              className="group btn-glow hidden items-center gap-1.5 rounded-full bg-linear-to-r from-primary to-secondary px-4 py-2 text-sm font-semibold text-background transition-transform hover:scale-105 md:flex"
            >
              Me contacter
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <button
              type="button"
              aria-label="Ouvrir le menu"
              data-cursor="true"
              onClick={() => setIsOpen((v) => !v)}
              className="flex items-center justify-center rounded-full p-2 text-foreground lg:hidden"
            >
              {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 bg-background/95 backdrop-blur-2xl lg:hidden"
          >
            <div className="bg-aurora absolute inset-0 opacity-40" />
            <nav className="relative flex h-full flex-col items-center justify-center gap-2">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display text-4xl font-semibold tracking-tight text-foreground/80 transition-colors hover:text-foreground"
                >
                  {link.name}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
