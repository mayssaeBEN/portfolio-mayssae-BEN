# Portfolio — Mayssae Bentayeb

Portfolio personnel développé avec **Next.js 16**, **Tailwind CSS v4** et **Framer Motion**.

---

## Ce qu'il reste à faire

### 1. Ajouter les vrais liens de tes projets

Ouvre le fichier `data/projects.ts` et remplace les `"#"` par tes vraies URLs :

```ts
// Pour chaque projet, mets à jour links :
links: {
  repo: "https://github.com/mayssaeBEN/nom-du-repo",  // lien GitHub du projet
  demo: "https://mon-projet.vercel.app",               // lien démo (optionnel)
},
```

Les trois projets à compléter sont : **CoreLab**, **Connect'In**, **My Cinema**.  
Si un projet n'a pas de démo en ligne, supprime simplement la ligne `demo`.

---

### 2. Mettre à jour l'URL du site après déploiement

Dans `data/site.ts`, ligne 4, remplace l'URL placeholder par ton URL Vercel une fois déployé :

```ts
url: "https://ton-portfolio.vercel.app",
```

---

### 3. Vérifier ta photo

Ta photo est dans `public/images/mayssae.jpg`. Si tu veux la remplacer, mets le nouveau fichier au même endroit avec le même nom.

---

## Lancer le projet en local

```bash
# 1. Installe les dépendances
npm install

# 2. Lance le serveur de développement
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000) dans ton navigateur.

---

## Mettre en ligne (déploiement sur Vercel)

Vercel est la solution la plus simple pour déployer un projet Next.js — gratuit, rapide, et aucune configuration nécessaire.

### Étape 1 — Crée un compte Vercel

Va sur [vercel.com](https://vercel.com) et connecte-toi avec ton **compte GitHub** (`mayssaeBEN`).

### Étape 2 — Importe le projet

1. Clique sur **"Add New Project"**
2. Sélectionne le repo `portfolio-mayssae` dans la liste
3. Laisse tous les paramètres par défaut (Vercel détecte Next.js automatiquement)
4. Clique sur **"Deploy"**

C'est tout. Vercel te donnera une URL du type `portfolio-mayssae.vercel.app`.

### Étape 3 — Personnalise l'URL (optionnel)

Dans les paramètres du projet sur Vercel → **Domains**, tu peux :
- Renommer en quelque chose comme `mayssae-bentayeb.vercel.app`
- Ou connecter un nom de domaine personnalisé si tu en as un

### Étape 4 — Mets à jour l'URL dans le code

Une fois l'URL connue, modifie `data/site.ts` :
```ts
url: "https://mayssae-bentayeb.vercel.app",
```

Puis fais un commit + push sur GitHub — Vercel redéploie automatiquement.

---

## Structure des fichiers à connaître

```
data/
  site.ts        → toutes tes infos personnelles (nom, bio, email, liens, etc.)
  projects.ts    → tes trois projets (titre, description, liens, technos)
  timeline.ts    → ton parcours (formations, expériences)
  skills.ts      → tes compétences techniques

public/
  images/
    mayssae.jpg  → ta photo de profil
```

Ces fichiers sont les seuls que tu auras besoin de modifier pour mettre à jour le contenu.

---

## Stack technique

| Technologie | Rôle |
|---|---|
| Next.js 16 (App Router) | Framework React |
| Tailwind CSS v4 | Styles |
| Framer Motion | Animations |
| Lenis + GSAP | Scroll fluide |
| GitHub REST API | Données GitHub en temps réel |
