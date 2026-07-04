export type TimelineCategory = "education" | "experience";

export interface TimelineItem {
  period: string;
  title: string;
  organization: string;
  location?: string;
  category: TimelineCategory;
  description: string[];
  current?: boolean;
}

export const timeline: TimelineItem[] = [
  {
    period: "2016 — 2020",
    title: "Olympiades de mathématiques",
    organization: "Maroc — Russie",
    category: "education",
    description: [
      "Participation à des olympiades internationales de mathématiques, à l'origine d'une rigueur analytique et d'un goût prononcé pour la résolution de problèmes complexes.",
    ],
  },
  {
    period: "2020",
    title: "Cours de dessin industriel",
    organization: "Centre de formation Urs",
    location: "Kazan, Russie",
    category: "education",
    description: [
      "Premiers pas dans la conception structurée et la pensée visuelle, des bases aujourd'hui réinvesties dans la conception d'interfaces.",
    ],
  },
  {
    period: "2021",
    title: "Formation pré-universitaire en informatique",
    organization: "Institut KAI",
    location: "Kazan, Russie",
    category: "education",
    description: [
      "Découverte des fondamentaux de l'informatique : logique algorithmique et premières bases de programmation.",
    ],
  },
  {
    period: "2024 — 2025",
    title: "Agent d'entretien — Trains SNCF (via ONET)",
    organization: "ONET",
    location: "Île-de-France",
    category: "experience",
    description: [
      "Nettoyage et remise en état des trains dans le respect strict des normes de sécurité.",
      "Travail de nuit nécessitant autonomie, rigueur et sens de l'organisation — des qualités directement transposées au développement logiciel.",
    ],
  },
  {
    period: "Activité en parallèle",
    title: "Professeure de soutien en mathématiques",
    organization: "Indépendante",
    category: "experience",
    description: [
      "Accompagnement personnalisé d'élèves de différents niveaux.",
      "Développement de compétences pédagogiques, de communication et de résolution de problèmes — essentielles pour expliquer du code et travailler en équipe.",
    ],
  },
  {
    period: "2025 — 2027",
    title: "Développeuse Web — Titre RNCP 5",
    organization: "Web@Académie — Epitech",
    location: "Paris",
    category: "education",
    description: [
      "Formation intensive en développement web Full Stack en alternance (6 semaines en entreprise / 2 semaines en formation).",
      "Acquisition de compétences front-end et back-end à travers des projets concrets : CoreLab, Connect'In, My Cinema.",
    ],
    current: true,
  },
];
