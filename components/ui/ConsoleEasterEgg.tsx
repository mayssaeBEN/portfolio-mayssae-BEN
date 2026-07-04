"use client";

import { useEffect } from "react";
import { siteConfig } from "@/data/site";

export default function ConsoleEasterEgg() {
  useEffect(() => {
    console.log(
      "%c👋 Hey, curieux développeur·se !",
      "font-size: 16px; font-weight: bold; color: #A78BFA;"
    );
    console.log(
      "%cCe portfolio est fait avec Next.js, Tailwind CSS v4 et Framer Motion.",
      "font-size: 12px; color: #B6ABD6;"
    );
    console.log(
      "%cSi tu inspectes le code... peut-être qu'on devrait travailler ensemble ?",
      "font-size: 12px; color: #38BDF8;"
    );
    console.log(
      `%c→ ${siteConfig.email}\n→ ${siteConfig.links.github}`,
      "font-size: 12px; font-weight: bold; color: #F472B6;"
    );
  }, []);

  return null;
}
