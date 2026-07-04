import type { ComponentType } from "react";
import {
  SiTypescript,
  SiPhp,
  SiJavascript,
  SiHtml5,
  SiSpringboot,
  SiReact,
  SiAngular,
  SiTailwindcss,
  SiBootstrap,
  SiNodedotjs,
  SiExpress,
  SiLaravel,
  SiDocker,
  SiMysql,
  SiMongodb,
  SiNginx,
  SiMocha,
  SiCypress,
  SiGoogleanalytics,
  SiTrello,
  SiGit,
  SiGithub,
  SiFigma,
  SiGooglecloud,
} from "react-icons/si";
import { FaJava, FaAws } from "react-icons/fa6";
import { TbApi, TbDatabase, TbSql } from "react-icons/tb";
import { Workflow, Search, Code2 } from "lucide-react";

export type IconComponent = ComponentType<{ className?: string }>;

export interface Skill {
  name: string;
  icon: IconComponent;
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    title: "Langages",
    description: "Les langages que je manipule au quotidien",
    skills: [
      { name: "TypeScript", icon: SiTypescript },
      { name: "JavaScript", icon: SiJavascript },
      { name: "Java", icon: FaJava },
      { name: "PHP", icon: SiPhp },
      { name: "HTML5", icon: SiHtml5 },
    ],
  },
  {
    id: "frameworks",
    title: "Frameworks & UI",
    description: "Construire des interfaces modernes et réactives",
    skills: [
      { name: "React", icon: SiReact },
      { name: "Angular", icon: SiAngular },
      { name: "Spring Boot", icon: SiSpringboot },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "Bootstrap", icon: SiBootstrap },
    ],
  },
  {
    id: "backend",
    title: "Backend & API",
    description: "Concevoir des API robustes et sécurisées",
    skills: [
      { name: "Node.js", icon: SiNodedotjs },
      { name: "Express.js", icon: SiExpress },
      { name: "Laravel", icon: SiLaravel },
      { name: "REST API", icon: TbApi },
      { name: "PDO", icon: TbDatabase },
      { name: "Docker", icon: SiDocker },
    ],
  },
  {
    id: "databases",
    title: "Bases de données",
    description: "Modéliser et interroger les données",
    skills: [
      { name: "SQL", icon: TbSql },
      { name: "MySQL", icon: SiMysql },
      { name: "MongoDB", icon: SiMongodb },
    ],
  },
  {
    id: "devops",
    title: "DevOps & Tests",
    description: "Automatiser, déployer et fiabiliser",
    skills: [
      { name: "CI/CD", icon: Workflow },
      { name: "Nginx", icon: SiNginx },
      { name: "Mocha", icon: SiMocha },
      { name: "Cypress", icon: SiCypress },
    ],
  },
  {
    id: "cloud",
    title: "Cloud & Outils",
    description: "Infrastructure, design et collaboration",
    skills: [
      { name: "AWS", icon: FaAws },
      { name: "Google Cloud", icon: SiGooglecloud },
      { name: "Git", icon: SiGit },
      { name: "GitHub", icon: SiGithub },
      { name: "Figma", icon: SiFigma },
      { name: "VS Code", icon: Code2 },
      { name: "Trello", icon: SiTrello },
      { name: "SEO Technique", icon: Search },
      { name: "Google Analytics (GA4)", icon: SiGoogleanalytics },
    ],
  },
];
