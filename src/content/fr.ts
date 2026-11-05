import { metrics, projects, skills, type Project } from "./site";
import type { Dictionary } from "./en";

type ProjectCopy = Pick<Project, "title" | "category" | "summary" | "cardDescription" | "sections" | "context" | "journey"> & { factLabels?: string[] };

const projectCopy: Record<Project["slug"], ProjectCopy> = {
  saeiv: {
    title: "SAEIV — Plateforme de supervision des transports en temps réel",
    category: "Temps réel / Mobilité",
    summary: "Une plateforme de production pour superviser en temps réel les opérations de navettes autonomes et de transport.",
    factLabels: ["microservices Spring Boot", "enregistrements dans les tables sources", "nouvelles lignes par jour", "connecteurs orchestrés"],
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
  "university-sso": {
    title: "SSO universitaire — Plateforme de restauration et de foyer",
    category: "Académique / Microservices",
    context: "Projet académique en équipe",
    summary: "Une plateforme universitaire où étudiants, personnel, enseignants et administrateurs se connectent une seule fois via Keycloak pour accéder à la restauration, au foyer, aux réservations, aux abonnements et aux réclamations.",
    cardDescription: "Six microservices Spring Boot avec découverte Eureka et OpenFeign, sécurisés par l'authentification unique Keycloak et la gestion des rôles, avec un frontend Angular.",
    factLabels: ["microservices Spring Boot", "rôles applicatifs", "une seule connexion pour tous les services"],
    journey: { title: "Authentification unique Keycloak", steps: ["Un realm Keycloak pour toute la plateforme", "Un client Keycloak dédié à chaque microservice", "Comptes gérés via le Keycloak Admin Client", "Rôles du realm attribués à chaque utilisateur", "Accès par rôles dans chaque service"] },
    sections: [
      { heading: "Problème", body: "La restauration, le foyer, les réservations et les réclamations étaient des services distincts, alors qu'étudiants, personnel, enseignants et administrateurs avaient besoin d'un seul compte sécurisé pour tous les utiliser." },
      { heading: "Architecture", body: "Chaque domaine métier est un microservice Spring Boot enregistré auprès d'un serveur de découverte Eureka. Les services communiquent via OpenFeign, stockent leurs données dans PostgreSQL avec JPA / Hibernate et documentent leurs API REST avec OpenAPI / Swagger. Une application Angular fournit l'interface.", bullets: ["Authentification : utilisateurs, rôles et administration Keycloak", "Restauration : menus, repas et votes", "Foyer : blocs et chambres", "Réservations : foyer et restaurant, avec paiement Stripe", "Abonnements : foyer et restaurant, avec QR codes", "Réclamations : pièces jointes, tableau de bord et alertes SMS via Twilio"] },
      { heading: "Authentification unique avec Keycloak", body: "Un realm Keycloak dédié sécurise toute la plateforme. Chaque microservice est déclaré comme client Keycloak avec ses propres mappings de rôles. Le service d'authentification s'appuie sur Spring Security et le Keycloak Admin Client pour créer, modifier ou supprimer les comptes et attribuer les rôles du realm, des administrateurs aux étudiants, au personnel et aux enseignants." },
      { heading: "Fonctionnalités", body: "Les utilisateurs réservent des chambres au foyer et des repas au restaurant, paient via une intégration Stripe en mode test, reçoivent des documents PDF, des QR codes et des notifications par e-mail, et déposent des réclamations avec pièces jointes qui déclenchent des alertes SMS." },
      { heading: "Détails techniques", body: "Services Spring Boot construits avec Maven, Lombok, Bean Validation, des modèles d'e-mails Thymeleaf et FreeMarker, et Swagger UI pour explorer chaque API." },
    ],
  },
  "e-story": {
    title: "E-story — Plateforme de lecture et d'apprentissage en microservices",
    category: "Académique / Microservices",
    context: "Projet académique",
    summary: "Une plateforme de lecture et d'apprentissage découpée en microservices Spring Boot derrière une Spring Cloud Gateway, avec authentification Keycloak et une base PostgreSQL par service, le tout exécuté avec Docker Compose.",
    cardDescription: "Spring Cloud Gateway, Eureka et Keycloak devant cinq microservices Spring Boot, chacun avec sa base PostgreSQL, orchestrés avec Docker Compose.",
    factLabels: ["microservices métier", "bases PostgreSQL, une par service", "conteneurs dans Docker Compose"],
    journey: { title: "Parcours d'une requête", steps: ["Requête du client", "La Spring Cloud Gateway la route", "Keycloak sécurise l'accès", "Eureka localise le service", "Le service lit sa propre base PostgreSQL"] },
    sections: [
      { heading: "Problème", body: "E-story réunit des catalogues de livres, des demandes de cours particuliers, l'évaluation de textes soumis avec leurs corrections et les réclamations des utilisateurs. Chaque domaine devait pouvoir évoluer et être déployé indépendamment." },
      { heading: "Architecture", body: "Une Spring Cloud Gateway sert de point d'entrée unique et route les requêtes vers les services enregistrés dans Eureka. Chaque microservice Spring Boot possède sa base PostgreSQL et appelle les autres via OpenFeign.", bullets: ["Authentification : utilisateurs, rôles, jetons de vérification et intégration Keycloak", "Catalogues : catalogues de livres", "Cours particuliers : demandes de cours", "Évaluation : textes soumis et corrections", "Réclamations : pièces jointes et tableau de bord"] },
      { heading: "Sécurité avec Keycloak", body: "Keycloak tourne dans son propre conteneur avec un realm dédié. Chaque microservice est enregistré comme client Keycloak, et le service d'authentification associe Spring Security, JWT et le Keycloak Admin Client pour gérer les comptes et les rôles." },
      { heading: "Livraison conteneurisée", body: "Chaque service possède son Dockerfile. Docker Compose démarre toute la plateforme sur un réseau commun : cinq bases PostgreSQL, le serveur Eureka, la gateway, Keycloak et les cinq services métier, avec les dépendances de démarrage et la configuration passée par l'environnement." },
      { heading: "Détails techniques", body: "Documentation Swagger / OpenAPI sur chaque service, Lombok, Bean Validation et un modèle « une base par service » qui garde chaque domaine indépendant." },
    ],
  },
  "devops-pipeline": {
    title: "DevOps CI/CD — Pipeline pour une API Spring Boot de gestion de stock",
    category: "Académique / DevOps",
    context: "Projet académique · ESPRIT",
    summary: "Une API Spring Boot de gestion de stock livrée par un pipeline CI/CD Jenkins : build Maven, tests unitaires, dépôt d'artefacts Nexus, image Docker et déploiement Docker Compose.",
    cardDescription: "Un pipeline Jenkins qui construit et teste une API Spring Boot avec Maven, JUnit et Mockito, la publie sur Nexus et la livre sous forme d'image Docker.",
    journey: { title: "Pipeline Jenkins", steps: ["Récupération du code depuis GitHub", "Build et packaging avec Maven", "Tests unitaires JUnit 5 et Mockito", "Publication de l'artefact sur Nexus", "Build de l'image Docker et push sur Docker Hub", "Déploiement avec Docker Compose et PostgreSQL"] },
    sections: [
      { heading: "Objectif", body: "Automatiser le chemin entre une modification du code et un conteneur en fonctionnement pour une application Spring Boot, avec des tests et des artefacts versionnés à chaque étape." },
      { heading: "L'application", body: "Une API REST Spring Boot 2.7 / Java 11 en couches pour la gestion de stock : produits, stocks, fournisseurs, factures et leurs détails, opérateurs et secteurs d'activité, stockés dans PostgreSQL avec Spring Data JPA et documentés avec OpenAPI." },
      { heading: "CI/CD avec Jenkins", body: "Un pipeline Jenkins orchestre la livraison : il récupère le dépôt, construit l'application avec Maven, exécute les tests unitaires, publie l'artefact versionné sur un dépôt Nexus, puis construit une image Docker et la pousse sur Docker Hub." },
      { heading: "Tests", body: "Les tests unitaires de la couche service utilisent JUnit 5 et Mockito : les repositories sont simulés pour vérifier la logique métier de manière isolée, avec une configuration de test dédiée." },
      { heading: "Déploiement conteneurisé", body: "Docker Compose exécute l'image de l'application à côté d'un conteneur PostgreSQL avec un volume persistant, une politique de redémarrage et une configuration passée par l'environnement. Spring Boot Actuator expose l'endpoint de santé." },
    ],
  },
};

const frProjects: Project[] = projects.map(project => {
  const { factLabels, ...copy } = projectCopy[project.slug];
  return { ...project, ...copy, facts: project.facts.map((fact, index) => ({ ...fact, label: factLabels?.[index] ?? fact.label })) };
});

export const fr: Dictionary = {
  locale: "fr",
  role: "Développeur Full Stack Java / Spring Boot",
  locationName: "Sfax, Tunisie",
  cv: "/cv/Ali_GHNAINIA_CV_FR.pdf",
  nav: { about: "À propos", projects: "Projets", experience: "Expérience", skills: "Compétences", talk: "Échangeons", main: "Navigation principale", language: "Langue", home: "Ali Ghnainia, accueil", homeShort: "Accueil" },
  hero: {
    availability: "OUVERT AUX OPPORTUNITÉS INTERNATIONALES",
    line1: "Concevoir des systèmes", line2: "qui fonctionnent dans le monde réel.",
    intro: "Je développe des microservices de production, des intégrations en temps réel et des plateformes d'analyse avec Java, Spring Boot, Kafka, Angular et React.",
    viewProjects: "Voir les projets", downloadCv: "Télécharger le CV", cvFormat: "PDF", findMe: "RETROUVEZ-MOI SUR",
    focusLabel: "Domaines clés", focus: ["Ingénierie backend", "Systèmes distribués", "Intégrations événementielles", "Livraison produit Full Stack"],
    asideLabel: "BACKEND / FRONTEND / LIVRAISON", asideNote: "DE LA DONNÉE À L'EXPÉRIENCE UTILISATEUR",
    stackLabel: "TECHNOLOGIES QUE J'UTILISE",
  },
  about: {
    eyebrow: "01 / À PROPOS", line1: "Vision backend.", line2: "Livraison Full Stack.",
    body: "Développeur Full Stack spécialisé en Java / Spring Boot, systèmes distribués et applications web modernes. Je réalise des microservices en production, des intégrations événementielles, des systèmes temps réel et des plateformes d'analyse avec Java, Kafka, Angular, React, PostgreSQL et MongoDB.",
    tags: ["MICROSERVICES", "SYSTÈMES ÉVÉNEMENTIELS", "LIVRAISON PRODUIT"],
  },
  projectsSection: { eyebrow: "02 / RÉALISATIONS", title: "Projets principaux", note: "Un aperçu de systèmes en production et d'une application Full Stack publique." },
  academicSection: { eyebrow: "PROJETS D'ÉCOLE", title: "Projets académiques", note: "Microservices, authentification unique avec Keycloak et CI/CD avec Jenkins, réalisés pendant mes études d'ingénieur." },
  experienceSection: { eyebrow: "03 / PARCOURS", title: "Expérience", note: "Conception et livraison de logiciels pour la mobilité, l'analyse et les intégrations." },
  experience: [
    { dates: "MARS 2025 — AUJOURD'HUI", location: "SFAX, TUNISIE", company: "AI Mobility Solutions", role: "Développeur Full Stack Java / Angular / React — Team Lead", body: "Conception et livraison de services Spring Boot, d'intégrations événementielles et d'applications pour SAEIV et STATLINK. Coordination technique des priorités, revues de code et accompagnement des développeurs.", projects: ["saeiv", "statlink"], tech: ["Spring Boot", "Kafka", "Debezium", "Angular", "React", "MongoDB", "PostgreSQL", "Docker"] },
    { dates: "AOÛT 2024 — MARS 2025", location: "TUNIS, TUNISIE", company: "SOFTParadigm", role: "Développeur Full Stack Java / Angular", body: "Développement de fonctionnalités Java / Spring Boot et Angular, dont les intégrations Uber Eats et Deliveroo avec WebClient : authentification, mapping des données, validation et gestion des statuts. Optimisation du traitement par agrégation MongoDB, réduisant la latence de 50 %, et contribution à des processus de réservation hôtelière avec Camunda BPMN.", projects: [], tech: ["Spring Boot", "Angular", "MongoDB", "Camunda BPMN"] },
  ],
  skillsSection: { eyebrow: "04 / OUTILS", title: "Compétences techniques", note: "Technologies et pratiques utilisées tout au long du cycle de développement." },
  metricsSection: { eyebrow: "05 / REPÈRES TECHNIQUES", title: "Le travail en chiffres", note: "Périmètre et résultats documentés en production." },
  education: { eyebrow: "06 / FORMATION", title: "Formation", date: "2019 — 2024 · ARIANA, TUNISIE", line1: "Diplôme national d'ingénieur", line2: "en informatique", school: "ESPRIT — École supérieure privée d'ingénierie et de technologies", projectsLabel: "Projets académiques" },
  contact: { eyebrow: "07 / CONTACT", line1: "Construisons quelque chose", line2: "d'utile.", intro: "Pour des postes Java / Spring Boot, des projets Full Stack et des opportunités internationales, je serai ravi d'échanger.", action: "Me contacter", email: "E-MAIL", linkedin: "LINKEDIN", github: "GITHUB", location: "LOCALISATION", linkedinAction: "Me retrouver sur LinkedIn", githubAction: "Voir mes projets" },
  footer: { email: "E-mail", tagline: "Une présentation claire du travail d'ingénierie.", backToTop: "Retour en haut", copyright: "Ali Ghnainia" },
  projectUi: { caseStudy: "ÉTUDE DE CAS", allProjects: "Tous les projets", explore: "Voir l'étude de cas", github: "Voir sur GitHub", inThis: "DANS CETTE ÉTUDE DE CAS", techStack: "Technologies", next: "PROJET SUIVANT", focus: "PARCOURS D'ORCHESTRATION", focusItems: ["Règles d'ordre CSV", "JSON des connecteurs", "API REST Kafka Connect", "État RUNNING et contrôle du retard", "Reprise après échec des tâches"], exploreAreas: "EXPLORER LA PLATEFORME", architecture: "ARCHITECTURE", projectVisualLabel: "Schéma d'architecture", jumpTo: "Aller à la section", sourceTitle: "Code source", sourceNote: "Le code source de ce projet est public sur GitHub.", academic: "Académique", stackCount: "technologies" },
  visuals: {
    systemLabel: "Schéma montrant le flux des données sources vers le traitement événementiel puis le tableau de bord des opérateurs",
    systemTop: "VUE D'ENSEMBLE", sources: "SOURCES DE DONNÉES", operational: "Données opérationnelles", event: "COUCHE ÉVÉNEMENTIELLE", streams: "Flux Kafka", application: "APPLICATION", supervision: "Supervision en direct", systemFoot: "CONÇU POUR LES OPÉRATIONS EN DIRECT",
    flows: {
      saeiv: { foot: "Démarrage contrôlé des connecteurs et supervision en direct", stages: [
        { role: "SOURCE", name: "PostgreSQL", short: "PostgreSQL", detail: "Tables sources" },
        { role: "CDC", name: "Debezium · Kafka Connect", short: "Debezium", detail: "Capture des changements" },
        { role: "ÉVÉNEMENTS", name: "Kafka", short: "Kafka", detail: "Flux d'événements" },
        { role: "SERVICES", name: "Spring Boot", short: "Spring Boot", detail: "Microservices" },
        { role: "INTERFACE", name: "Angular", short: "Angular", detail: "Vues opérateurs en temps réel" },
      ] },
      statlink: { foot: "Filtres, exports et envois programmés", stages: [
        { role: "SOURCE", name: "Sources de données", short: "Données", detail: "Données opérationnelles" },
        { role: "API ET COUCHE SÉMANTIQUE", name: "Spring Boot · Cube.js", short: "Spring · Cube.js", detail: "API sécurisées · couche sémantique" },
        { role: "TABLEAUX DE BORD", name: "Tableaux de bord React", short: "React", detail: "ApexCharts · filtres dynamiques" },
        { role: "SORTIE", name: "Rapports", short: "Rapports", detail: "Excel · PDF · envoi programmé par e-mail" },
      ] },
      "technical-chat": { foot: "Messagerie authentifiée, en direct et conservée", stages: [
        { role: "CLIENT", name: "Angular", short: "Angular", detail: "Vues de conversation" },
        { role: "API", name: "Spring Boot · STOMP", short: "Spring · STOMP", detail: "JWT · WebSocket" },
        { role: "STOCKAGE", name: "MongoDB", short: "MongoDB", detail: "Conversations conservées" },
      ] },
      "university-sso": { foot: "Une seule connexion pour la restauration, le foyer et les réservations", stages: [
        { role: "CLIENT", name: "Angular", short: "Angular", detail: "Vues étudiants, personnel et admin" },
        { role: "IDENTITÉ", name: "Keycloak SSO", short: "Keycloak", detail: "Un realm · un client par service" },
        { role: "DÉCOUVERTE", name: "Eureka · OpenFeign", short: "Eureka", detail: "Registre et appels de services" },
        { role: "SERVICES", name: "Spring Boot", short: "Spring Boot", detail: "Six microservices métier" },
        { role: "DONNÉES", name: "PostgreSQL", short: "PostgreSQL", detail: "Persistance JPA / Hibernate" },
      ] },
      "e-story": { foot: "Entièrement conteneurisée avec Docker Compose", stages: [
        { role: "ENTRÉE", name: "Spring Cloud Gateway", short: "Gateway", detail: "Point d'entrée et routage" },
        { role: "IDENTITÉ", name: "Keycloak", short: "Keycloak", detail: "Realm et clients dédiés" },
        { role: "DÉCOUVERTE", name: "Eureka", short: "Eureka", detail: "Registre de services" },
        { role: "SERVICES", name: "Spring Boot", short: "Spring Boot", detail: "Cinq microservices métier" },
        { role: "DONNÉES", name: "PostgreSQL × 5", short: "PostgreSQL", detail: "Une base par service" },
      ] },
      "devops-pipeline": { foot: "Du commit au conteneur en fonctionnement", stages: [
        { role: "SOURCE", name: "GitHub", short: "GitHub", detail: "Code source versionné" },
        { role: "CI", name: "Jenkins", short: "Jenkins", detail: "Orchestration du pipeline" },
        { role: "BUILD ET TESTS", name: "Maven · JUnit · Mockito", short: "Maven", detail: "Build et tests unitaires" },
        { role: "ARTEFACTS", name: "Nexus", short: "Nexus", detail: "Versions publiées" },
        { role: "IMAGE", name: "Docker Hub", short: "Docker", detail: "Image de l'application" },
        { role: "DÉPLOIEMENT", name: "Docker Compose", short: "Compose", detail: "API avec PostgreSQL" },
      ] },
    },
  },
  theme: {
    toggle: "Changer de thème",
    toLight: "Activer le mode clair",
    toDark: "Activer le mode sombre",
    light: "Clair",
    dark: "Sombre"
  },
  engineering: {
    eyebrow: "L’ARCHITECTURE EN PRATIQUE",
    title: "Explorez le système.",
    workbenchLabel: "Architecture interactive des projets sélectionnés",
    projectTabs: "Choisir l’architecture d’un projet",
    layerNavigation: "Explorer les couches d’architecture",
    selectedLayer: "COUCHE SÉLECTIONNÉE",
    diagramNote: "Flux de données illustré",
    explore: "Explorer le projet",
    pauseMotion: "Mettre les animations en pause",
    resumeMotion: "Reprendre les animations",
    reducedMotion: "Animations réduites activées"
  },
  portrait: { placeholder: "PORTRAIT / À VENIR", placeholderAlt: "Emplacement du portrait ; photo professionnelle à venir", photoAlt: "Portrait d'Ali Ghnainia" },
  notFound: { eyebrow: "404 / PAGE INTROUVABLE", title: "Cette page est introuvable.", body: "Elle a peut-être été déplacée. Les projets sont toujours ici.", action: "Retour à l'accueil" },
  a11y: { skip: "Aller au contenu", switchTo: "Passer en", caseNav: "Sections de l'étude de cas", breadcrumbs: "Fil d'Ariane" },
  seo: { title: "Ali Ghnainia | Développeur Full Stack Java & Spring Boot", description: "Ali Ghnainia est développeur Full Stack Java et Spring Boot à Sfax, en Tunisie. Il réalise des microservices, des intégrations temps réel et des applications d'analyse.", ogDescription: "Microservices, intégrations temps réel et plateformes d'analyse avec Java, Spring Boot, Kafka, Angular et React.", siteName: "Portfolio d'Ali Ghnainia" },
  projects: frProjects,
  skills: skills.map((group, index) => ({ ...group, label: ["Backend", "Événementiel", "Frontend", "Données", "DevOps", "Tests et pratiques"][index] })),
  metrics: metrics.map((metric, index) => ({ ...metric, label: ["microservices Spring Boot", "enregistrements dans les tables sources", "nouvelles lignes par jour", "connecteurs Kafka Connect / Debezium", "de réduction de la latence de traitement MongoDB"][index] })),
};
