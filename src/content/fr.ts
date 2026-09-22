import { metrics, projects, skills, type Project } from "./site";
import type { Dictionary } from "./en";

const projectCopy: Record<Project["slug"], Pick<Project, "title" | "category" | "summary" | "cardDescription" | "sections">> = {
  saeiv: {
    title: "SAEIV — Plateforme de supervision des transports en temps réel",
    category: "Temps réel / Mobilité",
    summary: "Une plateforme de production pour superviser en temps réel les opérations de navettes autonomes et de transport.",
    cardDescription: "Microservices Spring Boot, flux de données événementiels et démarrage orchestré du CDC pour la supervision des transports.",
    sections: [
      { heading: "Problème", body: "La plateforme devait présenter les informations de transport en direct tout en acheminant un volume important de changements depuis les sources opérationnelles vers les services en aval. En production, le démarrage des connecteurs Kafka Connect et Debezium nécessitait aussi un ordre maîtrisé." },
      { heading: "Architecture", body: "Les services Spring Boot communiquent par API REST et Kafka. Spring Cloud Gateway, Eureka et OpenFeign facilitent l'accès aux services et leur découverte. Debezium et Kafka Connect capturent les changements en base ; Angular et WebSocket alimentent les vues en temps réel des opérateurs.", bullets: ["API REST sécurisées par JWT", "Données sources PostgreSQL et flux d'événements Kafka", "Docker Compose, GitHub Actions et Nginx pour le déploiement"] },
      { heading: "Ce que j'ai développé", body: "J'ai conçu et développé plus de huit microservices Spring Boot ainsi qu'un orchestrateur autonome en Java 17 / Spring Boot pour le démarrage des connecteurs après déploiement. Il lit les règles d'ordre dans un CSV et les configurations des connecteurs dans des fichiers JSON, crée les connecteurs via l'API REST de Kafka Connect, attend l'état RUNNING, contrôle l'activité Kafka et le retard des consommateurs, puis passe à l'étape suivante lorsque les conditions sont réunies." },
      { heading: "Échelle", body: "Les tables sources contenaient plus de 22 millions d'enregistrements et recevaient plus de 50 000 nouvelles lignes par jour. Environ 42 connecteurs Kafka Connect / Debezium nécessitaient une création et un démarrage contrôlés." },
      { heading: "Défis techniques", body: "Les tâches des connecteurs peuvent échouer ou démarrer dans le mauvais ordre. L'orchestrateur suit leur état et permet la reprise après un échec afin de rendre la séquence de démarrage observable et maîtrisée. J'ai également contribué au suivi des déploiements et à l'analyse des incidents de production." },
      { heading: "Résultat / apport technique", body: "Le démarrage est devenu un processus reproductible, piloté par des règles et des contrôles de santé explicites avant chaque étape. J'ai assuré la coordination technique, le suivi des priorités, les revues de code et l'accompagnement des développeurs autour de la plateforme." },
    ],
  },
  statlink: {
    title: "STATLINK — Plateforme d'analyse et de reporting",
    category: "Analyse / Reporting",
    summary: "Une plateforme de reporting qui relie données opérationnelles, tableaux de bord interactifs et rapports programmés.",
    cardDescription: "API Spring Boot, tableaux de bord React, couche sémantique Cube.js et fonctions de reporting pour l'analyse opérationnelle.",
    sections: [
      { heading: "Problème", body: "Les équipes opérationnelles avaient besoin d'un moyen plus clair d'explorer les données, de créer des rapports visuels et de recevoir des résultats récurrents sans reconstruire chaque vue manuellement." },
      { heading: "Architecture", body: "Spring Boot et MongoDB fournissent des API REST sécurisées par JWT et contrôle d'accès par rôles. React et TypeScript affichent des composants de tableaux de bord réutilisables avec ApexCharts. Cube.js constitue la couche sémantique au-dessus d'un entrepôt de données PostgreSQL." },
      { heading: "Ma contribution", body: "J'ai travaillé sur les API et le frontend : composants de tableaux de bord réutilisables, filtres dynamiques, visualisations configurables, endpoints sécurisés, interfaces d'administration et traçabilité des actions." },
      { heading: "Reporting et analyse", body: "Les utilisateurs peuvent filtrer et visualiser les données, puis exporter les résultats en Excel ou PDF. Les données d'audit permettent de retracer les actions dans l'application." },
      { heading: "Rapports programmés", body: "La plateforme prend en charge l'envoi programmé de rapports par e-mail, sans répéter les exports manuels." },
      { heading: "Module prédictif", body: "Un module Python documenté contribue à l'anticipation des pannes, à l'analyse de la consommation et à la détection d'anomalies. Il s'agit d'un module produit ciblé, sans prétention à une infrastructure ML plus large." },
    ],
  },
  "technical-chat": {
    title: "Technical Chat — Application de messagerie en temps réel",
    category: "Projet public / Full Stack",
    summary: "Une application de messagerie individuelle avec conversations conservées et échanges en temps réel.",
    cardDescription: "Un projet Full Stack public associant Spring Security, MongoDB et WebSocket/STOMP à une interface Angular.",
    sections: [
      { heading: "Problème", body: "Créer une messagerie ciblée avec accès aux comptes, annuaire des utilisateurs et transmission fiable des messages en temps réel." },
      { heading: "Architecture", body: "Une API Spring Boot gère l'inscription, l'authentification, la validation et l'historique des conversations stocké dans MongoDB. WebSocket/STOMP transmet les messages en direct. Un client Angular propose des vues de conversation adaptées aux écrans mobiles et aux ordinateurs." },
      { heading: "Ce que j'ai développé", body: "L'application comprend une authentification JWT sans session, Spring Security, la présence en ligne et hors ligne, un annuaire des utilisateurs, des conversations individuelles et une gestion structurée des erreurs REST et de messagerie." },
      { heading: "Détails techniques", body: "Le backend suit une architecture en couches avec contrôleurs, services, repositories, DTO et mappers, ainsi que Lombok et MapStruct. Le client utilise TypeScript et Angular. CORS et la validation des requêtes complètent l'API destinée au navigateur." },
    ],
  },
};

const frProjects: Project[] = projects.map(project => ({
  ...project,
  ...projectCopy[project.slug],
  facts: project.slug === "saeiv" ? project.facts.map((fact, index) => ({ ...fact, label: ["microservices Spring Boot", "enregistrements dans les tables sources", "nouvelles lignes par jour", "connecteurs orchestrés"][index] })) : project.facts,
}));

export const fr: Dictionary = {
  locale: "fr",
  role: "Développeur Full Stack Java / Spring Boot",
  locationName: "Sfax, Tunisie",
  cv: "/cv/Ali_GHNAINIA_CV_FR.pdf",
  nav: { about: "À propos", projects: "Projets", experience: "Expérience", skills: "Compétences", talk: "Échangeons", main: "Navigation principale", language: "Langue", home: "Ali Ghnainia, accueil", homeShort: "Accueil" },
  hero: {
    availability: "OUVERT AUX OPPORTUNITÉS INTERNATIONALES", greeting: "BONJOUR, JE SUIS ALI GHNAINIA",
    line1: "Concevoir des systèmes", line2: "qui fonctionnent dans le monde réel.",
    intro: "Je développe des microservices de production, des intégrations en temps réel et des plateformes d'analyse avec Java, Spring Boot, Kafka, Angular et React.",
    viewProjects: "Voir les projets", downloadCv: "Télécharger le CV", findMe: "RETROUVEZ-MOI SUR",
    asideLabel: "BACKEND / FRONTEND / LIVRAISON", asideNote: "DE LA DONNÉE À L'EXPÉRIENCE UTILISATEUR",
  },
  about: {
    eyebrow: "01 / À PROPOS", line1: "Vision backend.", line2: "Livraison Full Stack.",
    body: "Développeur Full Stack spécialisé en Java / Spring Boot, systèmes distribués et applications web modernes. Je réalise des microservices en production, des intégrations événementielles, des systèmes temps réel et des plateformes d'analyse avec Java, Kafka, Angular, React, PostgreSQL et MongoDB.",
    tags: ["MICROSERVICES", "SYSTÈMES ÉVÉNEMENTIELS", "LIVRAISON PRODUIT"],
  },
  projectsSection: { eyebrow: "02 / RÉALISATIONS", title: "Projets principaux", note: "Un aperçu de systèmes en production et d'une application Full Stack publique." },
  experienceSection: { eyebrow: "03 / PARCOURS", title: "Expérience", note: "Conception et livraison de logiciels pour la mobilité, l'analyse et les intégrations." },
  experience: [
    { dates: "MARS 2025 — AUJOURD'HUI", location: "SFAX, TUNISIE", company: "AI Mobility Solutions", role: "Développeur Full Stack Java / Angular / React — Team Lead", body: "Conception et livraison de services Spring Boot, d'intégrations événementielles et d'applications pour SAEIV et STATLINK. Coordination technique des priorités, revues de code et accompagnement des développeurs.", projects: ["saeiv", "statlink"], tech: [] },
    { dates: "AOÛT 2024 — MARS 2025", location: "TUNIS, TUNISIE", company: "SOFTParadigm", role: "Développeur Full Stack Java / Angular", body: "Développement de fonctionnalités Java / Spring Boot et Angular, dont les intégrations Uber Eats et Deliveroo avec WebClient : authentification, mapping des données, validation et gestion des statuts. Optimisation du traitement par agrégation MongoDB, réduisant la latence de 50 %, et contribution à des processus de réservation hôtelière avec Camunda BPMN.", projects: [], tech: ["Spring Boot", "Angular", "MongoDB", "Camunda BPMN"] },
  ],
  skillsSection: { eyebrow: "04 / OUTILS", title: "Compétences techniques", note: "Technologies et pratiques utilisées tout au long du cycle de développement." },
  metricsSection: { eyebrow: "05 / REPÈRES TECHNIQUES", title: "Le travail en chiffres", note: "Périmètre et résultats documentés en production." },
  education: { eyebrow: "06 / FORMATION", title: "Formation", date: "2019 — 2024 · ARIANA, TUNISIE", line1: "Diplôme national d'ingénieur", line2: "en informatique", school: "ESPRIT — École supérieure privée d'ingénierie et de technologies" },
  contact: { eyebrow: "07 / CONTACT", line1: "Construisons quelque chose", line2: "d'utile.", intro: "Pour des postes Java / Spring Boot, des projets Full Stack et des opportunités internationales, je serai ravi d'échanger.", action: "Me contacter", email: "E-MAIL", linkedin: "LINKEDIN", github: "GITHUB", location: "LOCALISATION", linkedinAction: "Me retrouver sur LinkedIn", githubAction: "Voir mes projets" },
  footer: { tagline: "Une présentation claire du travail d'ingénierie.", backToTop: "Retour en haut", copyright: "Ali Ghnainia" },
  projectUi: { caseStudy: "ÉTUDE DE CAS", allProjects: "Tous les projets", explore: "Voir l'étude de cas", github: "Voir sur GitHub", inThis: "DANS CETTE ÉTUDE DE CAS", techStack: "Technologies", next: "PROJET SUIVANT", focus: "PARCOURS D'ORCHESTRATION", focusItems: ["Règles d'ordre CSV", "JSON des connecteurs", "API REST Kafka Connect", "État RUNNING et contrôle du retard", "Reprise après échec des tâches"], exploreAreas: "EXPLORER LA PLATEFORME", architecture: "ARCHITECTURE", input: "ENTRÉE", process: "TRAITEMENT", experience: "EXPÉRIENCE", projectVisualLabel: "Schéma d'architecture" },
  visuals: {
    systemLabel: "Schéma montrant le flux des données sources vers le traitement événementiel puis le tableau de bord des opérateurs",
    systemTop: "VUE D'ENSEMBLE", sources: "SOURCES DE DONNÉES", operational: "Données opérationnelles", event: "COUCHE ÉVÉNEMENTIELLE", streams: "Flux Kafka", application: "APPLICATION", supervision: "Supervision en direct", systemFoot: "CONÇU POUR LES OPÉRATIONS EN DIRECT",
    flows: {
      saeiv: { from: "Sources PostgreSQL", through: "Debezium · Kafka Connect", to: "Services Spring · Angular", foot: "Démarrage contrôlé des connecteurs et supervision en direct" },
      statlink: { from: "Données opérationnelles", through: "Cube.js · API Spring", to: "Tableaux de bord React · rapports", foot: "Filtres, exports et envois programmés" },
      "technical-chat": { from: "Client Angular", through: "Spring Boot · STOMP", to: "Conversations MongoDB", foot: "Messagerie authentifiée, en direct et conservée" },
    },
  },
  portrait: { placeholder: "PORTRAIT / À VENIR", placeholderAlt: "Emplacement du portrait ; photo professionnelle à venir", photoAlt: "Portrait d'Ali Ghnainia" },
  notFound: { eyebrow: "404 / PAGE INTROUVABLE", title: "Cette page est introuvable.", body: "Elle a peut-être été déplacée. Les projets sont toujours ici.", action: "Retour à l'accueil" },
  a11y: { skip: "Aller au contenu", viewProject: "Voir", switchTo: "Passer en", caseNav: "Sections de l'étude de cas", breadcrumbs: "Fil d'Ariane" },
  seo: { title: "Ali Ghnainia | Développeur Full Stack Java & Spring Boot", description: "Ali Ghnainia est développeur Full Stack Java et Spring Boot à Sfax, en Tunisie. Il réalise des microservices, des intégrations temps réel et des applications d'analyse.", ogDescription: "Microservices, intégrations temps réel et plateformes d'analyse avec Java, Spring Boot, Kafka, Angular et React.", siteName: "Portfolio d'Ali Ghnainia" },
  projects: frProjects,
  skills: skills.map((group, index) => ({ ...group, label: ["Backend", "Événementiel", "Frontend", "Données", "DevOps", "Tests et pratiques"][index] })),
  metrics: metrics.map((metric, index) => ({ ...metric, label: ["microservices Spring Boot", "enregistrements dans les tables sources", "nouvelles lignes par jour", "connecteurs Kafka Connect / Debezium", "de réduction de la latence de traitement MongoDB"][index] })),
};
