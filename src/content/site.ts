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
  slug: "saeiv" | "statlink" | "technical-chat" | "university-sso" | "e-story" | "devops-pipeline";
  /** Featured work is production or public; academic projects come from the engineering program. */
  kind: "featured" | "academic";
  number: string;
  title: string;
  shortTitle: string;
  category: string;
  /** Short qualifier shown as a badge, e.g. "Academic team project". */
  context?: string;
  summary: string;
  cardDescription: string;
  stack: string[];
  github?: string;
  facts: { value: string; label: string }[];
  /** Ordered steps rendered as a rail on the case study page. */
  journey?: { title: string; steps: string[] };
  sections: { heading: string; body: string; bullets?: string[] }[];
};

export const projects: Project[] = [
  {
    slug: "saeiv",
    kind: "featured",
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
    kind: "featured",
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
    kind: "featured",
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
  {
    slug: "university-sso",
    kind: "academic",
    number: "04",
    title: "University SSO — Campus Catering & Residence Platform",
    shortTitle: "University SSO",
    category: "Academic / Microservices",
    context: "Academic team project",
    summary: "A university platform where students, staff, professors and administrators sign in once through Keycloak to use catering, student residence, reservation, subscription and claims services.",
    cardDescription: "Six Spring Boot microservices with Eureka discovery and OpenFeign, secured by Keycloak single sign-on and role mapping, with an Angular front end.",
    stack: ["Java", "Spring Boot", "Spring Cloud", "Eureka", "OpenFeign", "Keycloak", "Spring Security", "JWT", "PostgreSQL", "Hibernate / JPA", "Angular", "OpenAPI / Swagger", "Stripe", "Twilio", "Thymeleaf", "Maven"],
    facts: [
      { value: "6", label: "Spring Boot microservices" },
      { value: "7", label: "application roles" },
      { value: "SSO", label: "one sign-in for every service" },
    ],
    journey: { title: "Keycloak single sign-on", steps: ["One Keycloak realm for the whole platform", "A dedicated Keycloak client per microservice", "Accounts managed through the Keycloak Admin Client", "Realm roles assigned to every user", "Role-based access in each service"] },
    sections: [
      { heading: "Problem", body: "Campus services such as catering, the student residence, reservations and claims were separate concerns, yet students, staff, professors and administrators needed one secure account to use all of them." },
      { heading: "Architecture", body: "Each business domain runs as its own Spring Boot microservice registered with a Eureka discovery server. Services call each other through OpenFeign, persist data in PostgreSQL with JPA / Hibernate and document their REST APIs with OpenAPI / Swagger. An Angular application provides the interface.", bullets: ["Authentication: users, roles and Keycloak administration", "Catering: menus, meals and meal votes", "Residence: blocks and rooms", "Reservations: residence and restaurant bookings with Stripe payments", "Subscriptions: residence and restaurant subscriptions with QR codes", "Claims: attachments, a dashboard and SMS alerts through Twilio"] },
      { heading: "Single Sign-On with Keycloak", body: "A dedicated Keycloak realm secures the whole platform. Every microservice is declared as its own Keycloak client with resource role mappings. The authentication service uses Spring Security and the Keycloak Admin Client to register accounts, update or delete them and assign realm roles, from administrators to students, staff and professors." },
      { heading: "Features", body: "Users book residence rooms and restaurant meals, pay through a Stripe integration in test mode, receive PDF documents, QR codes and email notifications, and file claims with attachments that trigger SMS alerts." },
      { heading: "Engineering Details", body: "Maven-built Spring Boot services with Lombok, Bean Validation, Thymeleaf and FreeMarker email templates, and Swagger UI to explore every API." },
    ],
  },
  {
    slug: "e-story",
    kind: "academic",
    number: "05",
    title: "E-story — Reading & Learning Platform on Microservices",
    shortTitle: "E-story",
    category: "Academic / Microservices",
    context: "Academic project",
    summary: "A reading and learning platform split into Spring Boot microservices behind a Spring Cloud Gateway, with Keycloak authentication and one PostgreSQL database per service, all running in Docker Compose.",
    cardDescription: "Spring Cloud Gateway, Eureka and Keycloak in front of five Spring Boot microservices, each with its own PostgreSQL database, orchestrated with Docker Compose.",
    stack: ["Java", "Spring Boot", "Spring Cloud Gateway", "Eureka", "OpenFeign", "Keycloak", "Spring Security", "JWT", "PostgreSQL", "Hibernate / JPA", "Docker", "Docker Compose", "OpenAPI / Swagger", "Maven"],
    facts: [
      { value: "5", label: "business microservices" },
      { value: "5", label: "PostgreSQL databases, one per service" },
      { value: "13", label: "containers in Docker Compose" },
    ],
    journey: { title: "Request path", steps: ["Client request", "Spring Cloud Gateway routes it", "Keycloak secures access", "Eureka locates the service", "The service reads its own PostgreSQL database"] },
    sections: [
      { heading: "Problem", body: "E-story brings together book catalogues, private course requests, evaluations of submitted texts with their corrections, and user claims. Each area needed to evolve and be deployed independently." },
      { heading: "Architecture", body: "A Spring Cloud Gateway is the single entry point and routes requests to services registered in Eureka. Each Spring Boot microservice owns its PostgreSQL database and calls the others through OpenFeign.", bullets: ["Authentication: users, roles, verification tokens and Keycloak integration", "Catalogues: book catalogues", "Private courses: course requests", "Evaluation: submitted texts and their corrections", "Claims: attachments and a dashboard"] },
      { heading: "Security with Keycloak", body: "Keycloak runs in its own container with a dedicated realm. Each microservice is registered as a Keycloak client, and the authentication service combines Spring Security, JWT and the Keycloak Admin Client to manage accounts and roles." },
      { heading: "Containerised Delivery", body: "Every service has its own Dockerfile. Docker Compose starts the full platform on a shared network: five PostgreSQL databases, the Eureka server, the gateway, Keycloak and the five business services, with startup dependencies and configuration passed through the environment." },
      { heading: "Engineering Details", body: "Swagger / OpenAPI documentation on each service, Lombok, Bean Validation and a database-per-service model that keeps every domain independent." },
    ],
  },
  {
    slug: "devops-pipeline",
    kind: "academic",
    number: "06",
    title: "DevOps CI/CD — Pipeline for a Spring Boot Stock Management API",
    shortTitle: "DevOps CI/CD",
    category: "Academic / DevOps",
    context: "Academic project · ESPRIT",
    summary: "A Spring Boot stock management API delivered through a Jenkins CI/CD pipeline: Maven build, unit tests, a Nexus artifact repository, a Docker image and a Docker Compose deployment.",
    cardDescription: "A Jenkins pipeline that builds and tests a Spring Boot API with Maven, JUnit and Mockito, publishes it to Nexus and ships it as a Docker image.",
    stack: ["Jenkins", "Git", "GitHub", "Maven", "JUnit", "Mockito", "Nexus", "Docker", "Docker Hub", "Docker Compose", "Java 11", "Spring Boot", "Spring Data JPA", "PostgreSQL", "Spring Boot Actuator", "OpenAPI / Swagger"],
    facts: [],
    journey: { title: "Jenkins pipeline", steps: ["Check out the code from GitHub", "Build and package with Maven", "Run JUnit 5 and Mockito unit tests", "Publish the artifact to Nexus", "Build the Docker image and push it to Docker Hub", "Deploy with Docker Compose and PostgreSQL"] },
    sections: [
      { heading: "Goal", body: "Automate the path from a code change to a running container for a Spring Boot application, with tests and versioned artifacts along the way." },
      { heading: "The Application", body: "A layered Spring Boot 2.7 / Java 11 REST API for stock management: products, stock, suppliers, invoices and their details, operators and activity sectors, persisted in PostgreSQL with Spring Data JPA and documented with OpenAPI." },
      { heading: "CI/CD with Jenkins", body: "A Jenkins pipeline orchestrates the delivery: it checks out the repository, builds the application with Maven, runs the unit tests, publishes the versioned artifact to a Nexus repository, then builds a Docker image and pushes it to Docker Hub." },
      { heading: "Testing", body: "Service-layer unit tests use JUnit 5 and Mockito: repositories are mocked so the business logic is verified in isolation, with a dedicated test configuration." },
      { heading: "Containerised Deployment", body: "Docker Compose runs the application image next to a PostgreSQL container with a persistent volume, a restart policy and configuration passed through the environment. Spring Boot Actuator exposes the health endpoint." },
    ],
  },
];

export const featuredProjects = projects.filter(project => project.kind === "featured");

export const skills = [
  { label: "Backend", items: ["Java", "Spring Boot", "Spring Security", "Spring Cloud", "Microservices", "Hibernate / JPA", "REST APIs", "OpenFeign", "WebClient", "WebSocket", "JWT", "Keycloak", "Camunda BPMN"] },
  { label: "Event-driven", items: ["Apache Kafka", "Debezium", "Kafka Connect", "CDC"] },
  { label: "Frontend", items: ["Angular", "React", "TypeScript", "JavaScript", "RxJS", "ApexCharts"] },
  { label: "Data", items: ["PostgreSQL", "MySQL", "MongoDB", "Cube.js"] },
  { label: "DevOps", items: ["Docker", "Docker Compose", "Jenkins", "GitHub Actions", "GitLab CI/CD", "Maven", "Nexus", "Nginx", "Linux", "SonarQube"] },
  { label: "Testing & practices", items: ["JUnit", "Mockito", "Clean Code", "SOLID", "Code Review", "Agile / Scrum"] },
];

/** Logos shown in the hero orbit and the scrolling stack band; every entry also appears in `skills`. */
export const orbitStack = ["Java", "Spring Boot", "Apache Kafka", "Angular", "React", "Docker", "PostgreSQL", "Keycloak"];
export const marqueeStack = ["Java", "Spring Boot", "Spring Security", "Apache Kafka", "Keycloak", "Angular", "React", "TypeScript", "PostgreSQL", "MongoDB", "Hibernate / JPA", "Docker", "Jenkins", "GitHub Actions", "Maven", "Nginx", "JUnit", "Camunda BPMN"];

export const metrics = [
  { value: "8+", label: "Spring Boot microservices" },
  { value: "22M+", label: "records in source tables" },
  { value: "50K+", label: "new rows / day" },
  { value: "~42", label: "Kafka Connect / Debezium connectors" },
  { value: "50%", label: "MongoDB processing latency reduction" },
];
