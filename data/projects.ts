import {
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiJsonwebtokens,
  SiZod,
  SiVite,
  SiLaravel,
  SiMysql,
  SiJavascript,
  SiAxios,
  SiPhp,
} from "react-icons/si";
import { KeyRound, Layers } from "lucide-react";
import type { IconComponent } from "./skills";

export interface ProjectTech {
  name: string;
  icon?: IconComponent;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  tech: ProjectTech[];
  tags: string[];
  links: { repo: string; demo?: string };
  accent: string;
  gradient: [string, string];
}

export const projectFilters = [
  "Tous",
  "React",
  "Node.js",
  "Laravel",
  "PHP",
] as const;

export const projects: Project[] = [
  {
    id: "corelab",
    title: "CoreLab",
    subtitle: "Plateforme LMS collaborative",
    description:
      "Plateforme d'apprentissage en ligne (LMS) sécurisée : gestion de cours et de quiz, rôles utilisateurs, import CSV et notifications, avec une suite de tests automatisés pour garantir la robustesse de l'application.",
    highlights: [
      "Gestion de cours, quiz et rôles utilisateurs",
      "Authentification sécurisée (JWT + bcrypt)",
      "Import CSV & notifications en temps réel",
      "Validation des données avec Zod",
      "Suite de tests automatisés",
    ],
    tech: [
      { name: "React", icon: SiReact },
      { name: "Node.js", icon: SiNodedotjs },
      { name: "Express", icon: SiExpress },
      { name: "MongoDB", icon: SiMongodb },
      { name: "JWT", icon: SiJsonwebtokens },
      { name: "bcrypt", icon: KeyRound },
      { name: "Zod", icon: SiZod },
      { name: "Vite", icon: SiVite },
    ],
    tags: ["React", "Node.js"],
    links: {
      repo: "https://github.com/mayssaeBEN/W-WEB-201-PAR-2-1-corelab-8",
      demo: "https://client-mocha-omega.vercel.app",
    },
    accent: "#A78BFA",
    gradient: ["#A78BFA", "#F472B6"],
  },
  {
    id: "connectin",
    title: "Connect'In",
    subtitle: "Réseau social d'entreprise",
    description:
      "Plateforme collaborative interne avec authentification sécurisée, gestion des publications et communication d'équipe — une API REST Laravel consommée par une interface React dynamique.",
    highlights: [
      "API REST sécurisée développée avec Laravel",
      "Authentification & gestion des rôles",
      "Fil d'actualité et publications internes",
      "Consommation de l'API via Axios",
      "Communication interne entre collaborateurs",
    ],
    tech: [
      { name: "Laravel", icon: SiLaravel },
      { name: "React", icon: SiReact },
      { name: "MySQL", icon: SiMysql },
      { name: "JavaScript", icon: SiJavascript },
      { name: "Axios", icon: SiAxios },
    ],
    tags: ["Laravel", "React"],
    links: {
      repo: "https://github.com/mayssaeBEN/connect_in-15",
      demo: "https://backend-production-9a90.up.railway.app/feed/",
    },
    accent: "#F472B6",
    gradient: ["#F472B6", "#38BDF8"],
  },
  {
    id: "mycinema",
    title: "My Cinema",
    subtitle: "Gestion de back-office",
    description:
      "Interface d'administration sécurisée pour la gestion des stocks et des plannings d'un cinéma, développée en PHP 8.3 selon une architecture MVC claire et maintenable.",
    highlights: [
      "Architecture MVC en PHP 8.3",
      "Gestion des stocks et des plannings",
      "Interface d'administration sécurisée",
      "Base de données relationnelle MySQL",
    ],
    tech: [
      { name: "PHP 8.3", icon: SiPhp },
      { name: "MySQL", icon: SiMysql },
      { name: "MVC", icon: Layers },
    ],
    tags: ["PHP"],
    links: {
      repo: "https://github.com/mayssaeBEN/my-cinema",
      demo: "https://frontend-lovat-three-73.vercel.app",
    },
    accent: "#38BDF8",
    gradient: ["#38BDF8", "#A78BFA"],
  },
];
