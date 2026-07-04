"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, GitFork, Users, FolderGit2, ArrowUpRight } from "lucide-react";
import { SiGithub } from "react-icons/si";
import SectionHeading from "@/components/ui/SectionHeading";
import MagneticButton from "@/components/ui/MagneticButton";
import Counter from "@/components/ui/Counter";
import ContributionGraph from "@/components/ui/ContributionGraph";
import { siteConfig } from "@/data/site";

const ease = [0.16, 1, 0.3, 1] as const;

interface GithubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
}

interface GithubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  fork: boolean;
  updated_at: string;
}

const languageColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  PHP: "#4F5D95",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Java: "#b07219",
  Python: "#3572A5",
  Vue: "#41b883",
};

type Status = "loading" | "success" | "error";

export default function Github() {
  const [status, setStatus] = useState<Status>("loading");
  const [user, setUser] = useState<GithubUser | null>(null);
  const [repos, setRepos] = useState<GithubRepo[]>([]);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${siteConfig.githubUsername}`, {
            signal: controller.signal,
          }),
          fetch(
            `https://api.github.com/users/${siteConfig.githubUsername}/repos?per_page=100&sort=updated`,
            { signal: controller.signal }
          ),
        ]);

        if (!userRes.ok || !reposRes.ok) throw new Error("GitHub user not found");

        const userData: GithubUser = await userRes.json();
        const reposData: GithubRepo[] = await reposRes.json();

        setUser(userData);
        setRepos(reposData);
        setStatus("success");
      } catch {
        setStatus("error");
      }
    }

    load();
    return () => controller.abort();
  }, []);

  const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);

  const languageCounts = repos
    .filter((repo) => !repo.fork && repo.language)
    .reduce<Record<string, number>>((acc, repo) => {
      const lang = repo.language as string;
      acc[lang] = (acc[lang] ?? 0) + 1;
      return acc;
    }, {});

  const topLanguages = Object.entries(languageCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  const totalLangCount = topLanguages.reduce((sum, [, count]) => sum + count, 0);

  const topRepos = [...repos]
    .filter((repo) => !repo.fork)
    .sort((a, b) => b.stargazers_count - a.stargazers_count || (a.updated_at < b.updated_at ? 1 : -1))
    .slice(0, 4);

  return (
    <section id="github" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <SectionHeading
          index="05"
          label="GitHub"
          title="Mon activité open-source"
          description="Code, expérimentations et projets personnels — directement synchronisés depuis mon profil GitHub."
        />

        {status === "loading" && (
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="h-64 animate-pulse rounded-3xl border border-border bg-surface/60" />
            <div className="grid gap-4 sm:grid-cols-2">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="h-32 animate-pulse rounded-3xl border border-border bg-surface/60" />
              ))}
            </div>
          </div>
        )}

        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease }}
            className="bg-aurora relative overflow-hidden rounded-3xl border border-border bg-surface/60 px-8 py-16 text-center opacity-100"
          >
            <div className="relative">
              <SiGithub className="mx-auto size-10 text-muted-2" />
              <h3 className="mt-4 font-display text-2xl font-semibold text-foreground">
                Profil GitHub bientôt connecté
              </h3>
              <p className="mx-auto mt-3 max-w-md text-muted">
                Les statistiques et dépôts s&apos;afficheront automatiquement ici dès
                que le profil GitHub sera en ligne.
              </p>
              <MagneticButton className="mt-6">
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="true"
                  className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-transform hover:scale-105"
                >
                  Voir le profil GitHub
                  <ArrowUpRight className="size-4" />
                </a>
              </MagneticButton>
            </div>
          </motion.div>
        )}

        {status === "success" && user && (
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            {/* Profile card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease }}
              className="glow-border rounded-3xl border border-border bg-surface/60 p-7"
            >
              <div className="flex items-center gap-4">
                <div className="relative size-16 shrink-0 overflow-hidden rounded-2xl border border-border">
                  <Image src={user.avatar_url} alt={user.login} fill sizes="64px" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-foreground">
                    {user.name ?? user.login}
                  </h3>
                  <p className="text-sm text-muted-2">@{user.login}</p>
                </div>
              </div>

              {user.bio && <p className="mt-4 text-sm leading-relaxed text-muted">{user.bio}</p>}

              <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                <div className="rounded-2xl border border-border bg-surface-2/50 px-3 py-4">
                  <FolderGit2 className="mx-auto size-4 text-primary" />
                  <div className="mt-2 font-display text-xl font-semibold text-foreground">
                    <Counter value={user.public_repos} />
                  </div>
                  <p className="mt-1 text-[11px] text-muted-2">Dépôts</p>
                </div>
                <div className="rounded-2xl border border-border bg-surface-2/50 px-3 py-4">
                  <Star className="mx-auto size-4 text-secondary" />
                  <div className="mt-2 font-display text-xl font-semibold text-foreground">
                    <Counter value={totalStars} />
                  </div>
                  <p className="mt-1 text-[11px] text-muted-2">Stars</p>
                </div>
                <div className="rounded-2xl border border-border bg-surface-2/50 px-3 py-4">
                  <Users className="mx-auto size-4 text-accent" />
                  <div className="mt-2 font-display text-xl font-semibold text-foreground">
                    <Counter value={user.followers} />
                  </div>
                  <p className="mt-1 text-[11px] text-muted-2">Followers</p>
                </div>
              </div>

              {topLanguages.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-2">
                    Langages les plus utilisés
                  </h4>
                  <div className="mt-3 flex h-2 overflow-hidden rounded-full bg-surface-2">
                    {topLanguages.map(([lang, count]) => (
                      <div
                        key={lang}
                        style={{
                          width: `${(count / totalLangCount) * 100}%`,
                          background: languageColors[lang] ?? "var(--color-muted-2)",
                        }}
                      />
                    ))}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
                    {topLanguages.map(([lang, count]) => (
                      <span key={lang} className="inline-flex items-center gap-1.5 text-xs text-muted">
                        <span
                          className="size-2 rounded-full"
                          style={{ background: languageColors[lang] ?? "var(--color-muted-2)" }}
                        />
                        {lang}
                        <span className="text-muted-2">· {count}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <MagneticButton className="mt-6 block">
                <a
                  href={user.html_url}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="true"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-border-strong px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-foreground/40"
                >
                  Voir le profil complet
                  <ArrowUpRight className="size-4" />
                </a>
              </MagneticButton>
            </motion.div>

            {/* Repos */}
            <div className="grid gap-4 sm:grid-cols-2">
              {topRepos.length === 0 && (
                <p className="col-span-2 rounded-3xl border border-border bg-surface/60 p-8 text-center text-muted">
                  Aucun dépôt public pour le moment.
                </p>
              )}
              {topRepos.map((repo, i) => (
                <motion.a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="true"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, ease, delay: i * 0.08 }}
                  className="glow-border group flex flex-col rounded-3xl border border-border bg-surface/60 p-6 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="font-display text-base font-semibold text-foreground group-hover:text-primary">
                      {repo.name}
                    </h4>
                    <ArrowUpRight className="size-4 shrink-0 text-muted-2 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
                  </div>
                  <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-muted">
                    {repo.description ?? "Pas de description disponible."}
                  </p>
                  <div className="mt-4 flex items-center gap-4 text-xs text-muted-2">
                    {repo.language && (
                      <span className="inline-flex items-center gap-1.5">
                        <span
                          className="size-2 rounded-full"
                          style={{ background: languageColors[repo.language] ?? "var(--color-muted-2)" }}
                        />
                        {repo.language}
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1">
                      <Star className="size-3.5" />
                      {repo.stargazers_count}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <GitFork className="size-3.5" />
                      {repo.forks_count}
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>

            <ContributionGraph />
          </div>
        )}
      </div>
    </section>
  );
}
