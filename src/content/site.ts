export const profile = {
  name: "Ali GHNAINIA",
  role: "Java / Spring Boot Full Stack Developer",
  location: "Sfax, Tunisia",
  email: "ali.ghnainia@esprit.tn",
  linkedin: "https://linkedin.com/in/ali-ghnainia-9397a0279",
  github: "https://github.com/AliGhnainia2",
  cv: "/cv/Ali_GHNAINIA_CV_EN.pdf",
} as const;

export type Project = {
  slug: "saeiv" | "statlink" | "technical-chat";
  number: string;
  title: string;
  shortTitle: string;
  category: string;
  summary: string;
  cardDescription: string;
  stack: string[];
  github?: string;
  facts: { value: string; label: string }[];
  sections: { heading: string; body: string; bullets?: string[] }[];
};

export const projects: Project[] = [
  {
    slug: "saeiv",
    number: "01",
    title: "SAEIV — Real-Time Transport Supervision Platform",
    shortTitle: "SAEIV",
    category: "Real-time systems / Mobility",
    summary: "A production platform for supervising autonomous shuttle and transport operations in real time.",
    cardDescription: "Spring Boot microservices, event-driven data flows and an orchestrated CDC startup sequence for transport supervision.",
    stack: ["Java 17", "Spring Boot", "Spring Cloud Gateway", "Eureka", "OpenFeign", "REST APIs", "Kafka", "Debezium", "Kafka Connect", "CDC", "Angular", "WebSocket", "JWT", "PostgreSQL", "Docker Compose", "GitHub Actions", "Nginx"],
    facts: [
      { value: "8+", label: "Spring Boot microservices" },
      { value: "22M+", label: "records in source tables" },
      { value: "50K+", label: "new rows per day" },
      { value: "~42", label: "connectors orchestrated" },
    ],
    sections: [
      { heading: "Problem", body: "The platform needed to surface live transport information while moving high-volume changes from operational data sources into downstream services. Production startup also required careful sequencing of Kafka Connect and Debezium connectors." },
      { heading: "Architecture", body: "Spring Boot services communicate through REST APIs and Kafka. Spring Cloud Gateway, Eureka and OpenFeign support service access and discovery. Debezium and Kafka Connect capture database changes; Angular and WebSocket deliver real-time views to operators.", bullets: ["Secured REST endpoints with JWT", "PostgreSQL source data and Kafka event streams", "Docker Compose, GitHub Actions and Nginx for deployment"] },
      { heading: "What I Built", body: "I designed and developed more than eight Spring Boot microservices and built a standalone Java 17 / Spring Boot orchestrator for connector startup after deployment. It reads ordering rules from CSV and connector configurations from JSON, creates connectors through the Kafka Connect REST API, waits for RUNNING status, checks Kafka activity and consumer lag, then advances when conditions are safe." },
      { heading: "Scale", body: "The source tables contained more than 22 million records and grew by over 50,000 rows per day. Around 42 Kafka Connect / Debezium connectors required controlled creation and startup." },
      { heading: "Technical Challenges", body: "Connector tasks can fail or start out of order. The orchestrator tracks task state and supports recovery around failures, keeping the startup sequence observable and controlled. I also contributed to deployment follow-up and production issue investigation." },
      { heading: "Result / Engineering Value", body: "The startup process became a repeatable, rule-driven workflow with explicit health checks before each next step. I supported technical coordination, priorities, code reviews and developer support around the platform." },
    ],
  },
  {
    slug: "statlink",
    number: "02",
    title: "STATLINK — Analytics & Reporting Platform",
    shortTitle: "STATLINK",
    category: "Analytics / Reporting",
    summary: "A reporting platform that connects operational data, interactive dashboards and scheduled outputs.",
    cardDescription: "Spring Boot APIs, React dashboards, a Cube.js semantic layer and reporting workflows for operational analysis.",
    stack: ["Java", "Spring Boot", "MongoDB", "REST APIs", "JWT", "Role-based access control", "React", "TypeScript", "ApexCharts", "Cube.js", "PostgreSQL", "Python", "Docker Compose"],
    facts: [],
    sections: [
      { heading: "Problem", body: "Operational teams needed a clearer way to explore data, build visual reports and receive recurring results without manually assembling each view." },
      { heading: "Architecture", body: "Spring Boot and MongoDB provide secured REST APIs with JWT and role-based access control. React and TypeScript render reusable dashboard components with ApexCharts. Cube.js serves as the semantic layer over a PostgreSQL data warehouse." },
      { heading: "My Contribution", body: "I worked across the API and frontend: reusable dashboard components, dynamic filters, configurable visualizations, secured endpoints, administrative interfaces and action traceability." },
      { heading: "Reporting & Analytics", body: "Users can filter and visualize data, then export results to Excel or PDF. Audit information helps trace actions through the application." },
      { heading: "Scheduled Reporting", body: "The platform supports scheduled email reports so recurring views can be delivered without repeated manual exports." },
      { heading: "Predictive Module", body: "A documented Python module supports failure anticipation, consumption analysis and anomaly detection. This was a focused product module, not a claim of broader ML infrastructure." },
    ],
  },
  {
    slug: "technical-chat",
    number: "03",
    title: "Technical Chat — Real-Time Messaging Application",
    shortTitle: "Technical Chat",
    category: "Open-source / Full stack",
    summary: "A one-to-one messaging application with persisted conversations and live delivery.",
    cardDescription: "A public full-stack project combining Spring Security, MongoDB and WebSocket/STOMP with an Angular interface.",
    stack: ["Java 21", "Spring Boot", "Spring Security", "MongoDB", "WebSocket / STOMP", "JWT", "Angular", "Maven", "Lombok", "MapStruct", "REST API", "Validation", "CORS"],
    github: "https://github.com/AliGhnainia2/technical-chat-app",
    facts: [],
    sections: [
      { heading: "Problem", body: "Create a focused messaging experience with account access, a conversation directory and reliable real-time message delivery." },
      { heading: "Architecture", body: "A Spring Boot API handles registration, authentication, validation and persisted conversation history in MongoDB. WebSocket/STOMP carries live messages. An Angular client provides responsive conversation views." },
      { heading: "What I Built", body: "The application includes stateless JWT authentication, Spring Security, online and offline presence, a user directory, one-to-one conversations and structured REST and messaging error handling." },
      { heading: "Engineering Details", body: "The backend uses layered controllers, services, repositories, DTOs and mappers with Lombok and MapStruct. The client uses TypeScript and Angular. CORS and request validation support the browser-facing API." },
    ],
  },
];

export const skills = [
  { label: "Backend", items: ["Java", "Spring Boot", "Spring Security", "Spring Cloud", "Hibernate / JPA", "REST APIs", "OpenFeign", "WebClient", "WebSocket", "JWT", "Camunda BPMN"] },
  { label: "Event-driven", items: ["Apache Kafka", "Debezium", "Kafka Connect", "CDC"] },
  { label: "Frontend", items: ["Angular", "React", "TypeScript", "JavaScript", "RxJS", "ApexCharts"] },
  { label: "Data", items: ["PostgreSQL", "MySQL", "MongoDB", "Cube.js"] },
  { label: "DevOps", items: ["Docker", "Docker Compose", "GitHub Actions", "GitLab CI/CD", "Maven", "Nginx", "Linux", "SonarQube"] },
  { label: "Testing & practices", items: ["JUnit", "Mockito", "Clean Code", "SOLID", "Code Review", "Agile / Scrum"] },
];

export const metrics = [
  { value: "8+", label: "Spring Boot microservices" },
  { value: "22M+", label: "records in source tables" },
  { value: "50K+", label: "new rows / day" },
  { value: "~42", label: "Kafka Connect / Debezium connectors" },
  { value: "50%", label: "MongoDB processing latency reduction" },
];
