"use client";

import { useCallback, useEffect, useMemo, useState, type ComponentType } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ArrowRight,
  Mail,
  Copy,
  Check,
  Home,
  User,
  Briefcase,
  Code2,
  FolderGit2,
  Send,
} from "lucide-react";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";
import { navLinks, siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

type AppIcon = ComponentType<{ className?: string }>;

const navIcons: Record<string, AppIcon> = {
  "#hero": Home,
  "#about": User,
  "#parcours": Briefcase,
  "#competences": Code2,
  "#projets": FolderGit2,
  "#github": SiGithub,
  "#contact": Send,
};

const GROUP_ORDER = ["Navigation", "Liens", "Actions"] as const;

interface CommandItem {
  id: string;
  label: string;
  hint?: string;
  group: (typeof GROUP_ORDER)[number];
  icon: AppIcon;
  keywords?: string;
  action: () => void;
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActiveIndex(0);
  }, []);

  const commands = useMemo<CommandItem[]>(() => {
    const navCommands: CommandItem[] = navLinks.map((link) => ({
      id: `nav-${link.href}`,
      label: link.name,
      hint: "Aller à la section",
      group: "Navigation",
      icon: navIcons[link.href] ?? Home,
      action: () => {
        document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
      },
    }));

    return [
      ...navCommands,
      {
        id: "github",
        label: "Ouvrir le profil GitHub",
        hint: siteConfig.links.github.replace("https://", ""),
        group: "Liens",
        icon: SiGithub,
        keywords: "git code depots",
        action: () => window.open(siteConfig.links.github, "_blank", "noopener,noreferrer"),
      },
      {
        id: "linkedin",
        label: "Ouvrir LinkedIn",
        hint: "Profil professionnel",
        group: "Liens",
        icon: FaLinkedin,
        keywords: "reseau pro",
        action: () => window.open(siteConfig.links.linkedin, "_blank", "noopener,noreferrer"),
      },
      {
        id: "copy-email",
        label: copied ? "Email copié !" : "Copier l'adresse email",
        hint: siteConfig.email,
        group: "Actions",
        icon: copied ? Check : Copy,
        keywords: "email mail contact copier adresse",
        action: () => {
          navigator.clipboard.writeText(siteConfig.email);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        },
      },
      {
        id: "send-email",
        label: "Envoyer un email",
        hint: siteConfig.email,
        group: "Actions",
        icon: Mail,
        keywords: "email mail contact envoyer",
        action: () => {
          window.location.href = siteConfig.links.email;
        },
      },
    ];
  }, [copied]);

  const filtered = useMemo(() => {
    if (!query.trim()) return commands;
    const q = query.toLowerCase();
    return commands.filter(
      (c) =>
        c.label.toLowerCase().includes(q) ||
        c.hint?.toLowerCase().includes(q) ||
        c.keywords?.toLowerCase().includes(q)
    );
  }, [commands, query]);

  const [prevQuery, setPrevQuery] = useState(query);
  if (query !== prevQuery) {
    setPrevQuery(query);
    setActiveIndex(0);
  }

  const runCommand = useCallback(
    (cmd: CommandItem) => {
      cmd.action();
      if (cmd.id !== "copy-email") close();
    },
    [close]
  );

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
        return;
      }

      if (!open) return;

      if (e.key === "Escape") {
        close();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const cmd = filtered[activeIndex];
        if (cmd) runCommand(cmd);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, filtered, activeIndex, close, runCommand]);

  useEffect(() => {
    function handleToggle() {
      setOpen((v) => !v);
    }
    window.addEventListener("command-palette:toggle", handleToggle);
    return () => window.removeEventListener("command-palette:toggle", handleToggle);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={close}
          className="fixed inset-0 z-100 flex items-start justify-center px-4 pt-[12vh] sm:pt-[16vh]"
        >
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />

          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.97 }}
            transition={{ duration: 0.25, ease }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-border-strong bg-surface/95 shadow-2xl shadow-black/50 backdrop-blur-2xl"
          >
            <div className="flex items-center gap-3 border-b border-border px-4 py-3.5">
              <Search className="size-4 shrink-0 text-muted-2" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher une section, un lien, une action..."
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-2 focus:outline-none"
              />
              <kbd className="hidden rounded-md border border-border px-1.5 py-0.5 text-[10px] font-medium text-muted-2 sm:inline">
                Esc
              </kbd>
            </div>

            <div className="max-h-80 overflow-y-auto p-2">
              {filtered.length === 0 && (
                <p className="px-3 py-8 text-center text-sm text-muted-2">
                  Aucun résultat pour « {query} ».
                </p>
              )}

              {GROUP_ORDER.map((group) => {
                const items = filtered.filter((c) => c.group === group);
                if (items.length === 0) return null;

                return (
                  <div key={group} className="mb-1">
                    <p className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-2">
                      {group}
                    </p>
                    {items.map((cmd) => {
                      const globalIndex = filtered.indexOf(cmd);
                      const isActive = globalIndex === activeIndex;
                      return (
                        <button
                          key={cmd.id}
                          type="button"
                          data-cursor="true"
                          onMouseEnter={() => setActiveIndex(globalIndex)}
                          onClick={() => runCommand(cmd)}
                          className={cn(
                            "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors",
                            isActive
                              ? "bg-surface-2 text-foreground"
                              : "text-muted hover:bg-surface-2/60 hover:text-foreground"
                          )}
                        >
                          <cmd.icon className="size-4 shrink-0 text-primary" />
                          <span className="flex-1 truncate font-medium">{cmd.label}</span>
                          {cmd.hint && (
                            <span className="hidden truncate text-xs text-muted-2 sm:inline">
                              {cmd.hint}
                            </span>
                          )}
                          {isActive && <ArrowRight className="size-3.5 shrink-0 text-muted-2" />}
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between gap-4 border-t border-border px-4 py-2.5 text-[11px] text-muted-2">
              <span className="flex items-center gap-1.5">
                <kbd className="rounded-md border border-border px-1.5 py-0.5 font-medium">↑↓</kbd>
                Naviguer
              </span>
              <span className="flex items-center gap-1.5">
                <kbd className="rounded-md border border-border px-1.5 py-0.5 font-medium">↵</kbd>
                Sélectionner
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
