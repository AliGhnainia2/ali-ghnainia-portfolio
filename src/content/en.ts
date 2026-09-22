import { metrics, projects, skills } from "./site";

export const en = {
  locale: "en",
  role: "Java / Spring Boot Full Stack Developer",
  locationName: "Sfax, Tunisia",
  cv: "/cv/Ali_GHNAINIA_CV_EN.pdf",
  nav: { about: "About", projects: "Projects", experience: "Experience", skills: "Skills", talk: "Let's talk", main: "Main navigation", language: "Language", home: "Ali Ghnainia, home", homeShort: "Home" },
  hero: {
    availability: "OPEN TO INTERNATIONAL OPPORTUNITIES", greeting: "HELLO, I'M ALI GHNAINIA",
    line1: "Engineering systems", line2: "that work in the real world.",
    intro: "Building production microservices, real-time integrations and analytics platforms with Java, Spring Boot, Kafka, Angular and React.",
    viewProjects: "View projects", downloadCv: "Download CV", findMe: "FIND ME ON",
    asideLabel: "BACKEND / FRONTEND / DELIVERY", asideNote: "FROM DATA FLOW TO USER EXPERIENCE",
  },
  about: {
    eyebrow: "01 / ABOUT", line1: "Backend thinking.", line2: "Full-stack delivery.",
    body: "Full Stack Developer focused on Java / Spring Boot, distributed systems and modern web applications. I build production microservices, event-driven integrations, real-time systems and analytics platforms using Java, Kafka, Angular, React, PostgreSQL and MongoDB.",
    tags: ["MICROSERVICES", "EVENT-DRIVEN SYSTEMS", "PRODUCT DELIVERY"],
  },
  projectsSection: { eyebrow: "02 / SELECTED WORK", title: "Featured projects", note: "A closer look at production systems and one public full-stack application." },
  experienceSection: { eyebrow: "03 / PROFESSIONAL PATH", title: "Experience", note: "Building and shipping software across mobility, analytics and integrations." },
  experience: [
    { dates: "MAR 2025 — PRESENT", location: "SFAX, TUNISIA", company: "AI Mobility Solutions", role: "Java / Angular / React Full Stack Developer — Team Lead", body: "Designing and delivering Spring Boot services, event-driven integrations and user-facing applications for SAEIV and STATLINK. Coordinating technical priorities, reviewing code and supporting developers.", projects: ["saeiv", "statlink"], tech: [] },
    { dates: "AUG 2024 — MAR 2025", location: "TUNIS, TUNISIA", company: "SOFTParadigm", role: "Java / Angular Full Stack Developer", body: "Built Java / Spring Boot and Angular features, including Uber Eats and Deliveroo integrations with WebClient, authentication, payload mapping, validation and status flows. Optimized MongoDB Aggregation processing latency by 50% and worked on Camunda BPMN hotel reservation workflows.", projects: [], tech: ["Spring Boot", "Angular", "MongoDB", "Camunda BPMN"] },
  ],
  skillsSection: { eyebrow: "04 / TOOLKIT", title: "Technical skills", note: "Tools and practices I use across the application lifecycle." },
  metricsSection: { eyebrow: "05 / ENGINEERING HIGHLIGHTS", title: "Work at a glance", note: "Documented scope and outcomes from production work." },
  education: { eyebrow: "06 / FOUNDATION", title: "Education", date: "2019 — 2024 · ARIANA, TUNISIA", line1: "National Engineering Diploma", line2: "in Computer Science", school: "ESPRIT — Private Higher School of Engineering and Technology" },
  contact: { eyebrow: "07 / CONTACT", line1: "Let's build something", line2: "that matters.", intro: "For Java / Spring Boot roles, full-stack product work and international opportunities, I'd be glad to connect.", action: "Get in touch", email: "EMAIL", linkedin: "LINKEDIN", github: "GITHUB", location: "LOCATION", linkedinAction: "Connect on LinkedIn", githubAction: "Explore my work" },
  footer: { tagline: "Designed to make the engineering visible.", backToTop: "Back to top", copyright: "Ali Ghnainia" },
  projectUi: { caseStudy: "CASE STUDY", allProjects: "All projects", explore: "Explore case study", github: "View on GitHub", inThis: "IN THIS CASE STUDY", techStack: "Tech Stack", next: "NEXT PROJECT", focus: "ORCHESTRATION PATH", focusItems: ["CSV ordering rules", "Connector JSON", "Kafka Connect REST API", "RUNNING status and lag checks", "Recovery around failed tasks"], exploreAreas: "EXPLORE THE PLATFORM", architecture: "ARCHITECTURE", input: "INPUT", process: "PROCESS", experience: "EXPERIENCE", projectVisualLabel: "Architecture diagram" },
  visuals: {
    systemLabel: "Diagram showing source data flowing through event processing to an operator dashboard",
    systemTop: "SYSTEM OVERVIEW", sources: "DATA SOURCES", operational: "Operational data", event: "EVENT LAYER", streams: "Kafka streams", application: "APPLICATION", supervision: "Live supervision", systemFoot: "ENGINEERED FOR LIVE OPERATIONS",
    flows: {
      saeiv: { from: "PostgreSQL sources", through: "Debezium · Kafka Connect", to: "Spring services · Angular", foot: "Controlled connector startup and live supervision" },
      statlink: { from: "Operational data", through: "Cube.js · Spring APIs", to: "React dashboards · reports", foot: "Filters, exports and scheduled delivery" },
      "technical-chat": { from: "Angular client", through: "Spring Boot · STOMP", to: "MongoDB conversations", foot: "Authenticated, real-time, persisted messaging" },
    },
  },
  portrait: { placeholder: "PORTRAIT / COMING SOON", placeholderAlt: "Portrait placeholder; professional photo coming soon", photoAlt: "Portrait of Ali Ghnainia" },
  notFound: { eyebrow: "404 / PAGE NOT FOUND", title: "Nothing at this address.", body: "The page may have moved. The work is still here.", action: "Return home" },
  a11y: { skip: "Skip to content", viewProject: "View", switchTo: "Switch to", caseNav: "Case study sections", breadcrumbs: "Breadcrumbs" },
  seo: { title: "Ali Ghnainia | Java & Spring Boot Full Stack Developer", description: "Ali Ghnainia is a Java and Spring Boot Full Stack Developer in Sfax, Tunisia, building microservices, real-time integrations and analytics applications.", ogDescription: "Microservices, real-time integrations and analytics platforms built with Java, Spring Boot, Kafka, Angular and React.", siteName: "Ali Ghnainia Portfolio" },
  projects, skills, metrics,
};

export type Dictionary = typeof en;
