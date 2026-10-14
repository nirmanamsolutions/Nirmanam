export const siteContent = {
  branding: {
    name: "Nirmanam Solutions",
    tagline: "Premium Software Engineering & Design Studio",
    location: "Pune, Maharashtra, India",
    email: "nirmanamsolutions@gmail.com",
    github: "https://github.com/nirnamam",
    linkedin: "https://linkedin.com/company/nirmanam-solutions",
    website: "https://nirmanamsolutions.netlify.app/"
  },

  meta: {
    title: "Nirmanam Solutions – Premium Software Engineering & Design Studio",
    description: "Nirmanam Solutions is a premier software engineering and design studio in Pune, India. We architect high-performance web applications, native mobile apps, and scalable cloud solutions for startups and enterprises worldwide.",
    keywords: "Nirmanam Solutions, Software Engineering Studio, Web Development, Mobile Apps, React Native, Next.js, Node.js, Cloud DevOps, Pune Startups",
    tabAwayTitle: "We miss you :( | Nirmanam Solutions"
  },

  nav: {
    links: [
      { name: "Home", href: "#home" },
      { name: "About", href: "#about" },
      { name: "Services", href: "#services" },
      { name: "Work", href: "#portfolio" },
      { name: "Process", href: "#process" },
      { name: "Contact", href: "#contact" }
    ],
    cta: "Let's Talk"
  },

  hero: {
    staircaseHeading: [
      { text: "WE'RE", indent: false, accent: false },
      { text: "BUILDING", indent: false, accent: false },
      { text: "COOL", indent: false, accent: false },
      { text: "EXPERIENCES", indent: true, accent: false },
      { text: "FOR YOUR", indent: true, accent: false },
      { text: "BUSINESS", indent: true, accent: true }
    ],
    subheading: "Crafting Awesome Stories and Killer Designs to Make Brands Stand Out",
    ctaPrimary: { text: "EXPLORE OUR WORK", href: "#portfolio" },
    ctaSecondary: { text: "VIEW OUR PROCESS", href: "#process" },
    videoUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260823_050407_500d0339-ab28-41c1-9688-132a74a3b5aa.mp4"
  },

  about: {
    tag: "Our Philosophy",
    staircaseHeading: [
      { text: "OUR", indent: false, accent: false },
      { text: "PHILOSOPHY", indent: true, accent: true }
    ],
    description: "At Nirmanam Solutions, we understand the challenges Indian founders face. We provide affordable, transparent, and quality software development so you can focus on growing your business.",
    highlights: ["QUALITY", "PRECISION", "EXCELLENCE", "TRUST"],
    values: [
      {
        id: "01",
        title: "Client Partnership",
        description: "We focus on long-term partnerships, aligning closely with your product vision."
      },
      {
        id: "02",
        title: "Engineering Quality",
        description: "Modular, well-tested code crafted to scale seamlessly under heavy load."
      },
      {
        id: "03",
        title: "Timely Execution",
        description: "Clear milestones, transparent Git logs, and on-time launch delivery."
      },
      {
        id: "04",
        title: "Product Ownership",
        description: "We take direct accountability for your tech stack and business objectives."
      },
      {
        id: "05",
        title: "Scalable Architecture",
        description: "Future-proof cloud infrastructure & scalable frontend engineering."
      }
    ],
    videoUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260823_063501_2e2c8971-de1e-473a-8611-a0c9ae7ee186.mp4"
  },

  services: {
    tag: "Core Competencies",
    staircaseHeading: [
      { text: "OUR ENGINEERING", indent: false, accent: false },
      { text: "SOLUTIONS", indent: true, accent: true }
    ],
    description: "We combine deep technical expertise with careful product engineering to build web and mobile products that scale seamlessly.",
    items: [
      {
        id: "01",
        title: "Web Platforms",
        description: "Architecting high-performance web applications, server-rendered React frontends, and enterprise WebGL web ecosystems.",
        features: [
          "Server-Side Rendering (SSR) & Static Generation",
          "Sub-second First Contentful Paint Optimization",
          "Custom State & Micro-Frontend Architecture"
        ],
        tags: ["React", "Next.js", "TypeScript", "Vite"]
      },
      {
        id: "02",
        title: "Mobile Architecture",
        description: "Cross-platform iOS & Android apps engineered for 60 FPS native performance, offline persistence, and fluid gesture UX.",
        features: [
          "Native Hardware Acceleration & GPU Animations",
          "Offline Data Sync & Encrypted Local Storage",
          "Seamless App Store & Google Play Deployment"
        ],
        tags: ["React Native", "Flutter", "iOS & Android", "Expo"]
      },
      {
        id: "03",
        title: "Product Design & UX",
        description: "Human-centered UI/UX research, component design systems, motion design prototypes, and interactive user interface models.",
        features: [
          "Tailored High-Fidelity Figma Design Systems",
          "Interactive Prototype Animations & Micro-Interactions",
          "Usability Testing & Conversion Optimization"
        ],
        tags: ["Figma", "Design Systems", "Prototyping", "UI/UX"]
      },
      {
        id: "04",
        title: "Custom Systems & APIs",
        description: "Designing resilient backend architectures, GraphQL & RESTful APIs, microservices, and high-concurrency database schemas.",
        features: [
          "Distributed Event-Driven Microservices Architecture",
          "High-Throughput PostgreSQL & Redis Cache Clustering",
          "Enterprise OAuth2 & Zero-Trust API Security"
        ],
        tags: ["Node.js", "PostgreSQL", "GraphQL", "Redis"]
      },
      {
        id: "05",
        title: "Cloud & DevOps",
        description: "Automated multi-cloud infrastructure provision, CI/CD deployment pipelines, container orchestration, and serverless scaling.",
        features: [
          "Automated GitHub Actions CI/CD Deployment",
          "Docker Containerization & Kubernetes Clusters",
          "Global CDN & Multi-Region Cloud Redundancy"
        ],
        tags: ["AWS", "Docker", "Kubernetes", "CI/CD"]
      },
      {
        id: "06",
        title: "Performance & Security",
        description: "In-depth code reviews, Web Vitals performance optimization, memory leak eradication, and automated security vulnerability hardening.",
        features: [
          "Full Lighthouse 100/100 Core Web Vitals Audit",
          "Memory Leak Profiling & JS Runtime Tracing",
          "OWASP Security Audit & Vulnerability Remediation"
        ],
        tags: ["SEO", "Web Vitals", "Security", "Audits"]
      }
    ]
  },

  portfolio: {
    tag: "Case Studies",
    staircaseHeading: [
      { text: "PROJECTS WE ARE", indent: false, accent: false },
      { text: "PROUD OF", indent: true, accent: true }
    ],
    description: "A look into digital systems we've engineered to solve real, scalable business challenges.",
    categories: [
      { id: "all", label: "All Systems" },
      { id: "web", label: "Web Platforms" },
      { id: "mobile", label: "Mobile Systems" }
    ],
    projects: [
      {
        id: "project-1",
        category: "mobile",
        title: "Sarvasvaa Dairy Management System",
        subtitle: "Full-Stack Dairy Management Platform",
        description: "A full-stack dairy management platform for farmers, collection centers, and administrators featuring real-time milk collection, automated FAT/SNF-based payment calculation, analytics, and secure role-based dashboards.",
        tags: ["React Native", "Node.js", "Express.js", "MongoDB Atlas", "Firebase Cloud Messaging"],
        image: "/project_sarvasvaa_dairy.png",
        link: "https://play.google.com/store/apps/details?id=com.sarvasvaa.dairy",
        linkText: "View on Play Store"
      },
      {
        id: "project-2",
        category: "web",
        title: "SkillSutra - E-Learning Platform",
        subtitle: "Enterprise E-Learning Platform",
        description: "A comprehensive e-learning platform featuring secure Stripe payment gateway integration, structured course paths, interactive video modules, and specialized DRM/video download restrictions preventing unauthorized saving of content.",
        tags: ["React", "Node.js", "Express.js", "MongoDB", "HLS Encrypted Streaming", "Stripe API"],
        image: "/project_skillsutra.png",
        link: "https://skillsutra.netlify.app/",
        linkText: "Visit SkillSutra Live"
      },
      {
        id: "project-3",
        category: "web",
        title: "Shivratna Kirana – Retail Store Management System",
        subtitle: "Full-Stack Retail Stock, Billing & Ledger Platform",
        description: "A complete offline-first retail management system built for a local Kirana store. Covers real-time stock tracking with low-stock alerts, a 4-step smart billing counter (Cash / UPI / Card / Katha), customer ledger with WhatsApp due reminders, bill history with PDF export, and Bluetooth thermal-printer receipt generation — all behind a secure admin login with 7-day session management. Fully bilingual (Marathi / English) UI.",
        tags: ["React 19", "Vite", "Node.js", "Express.js", "MongoDB Atlas", "jsPDF", "node-cron"],
        image: "/project_shivratna_kirana.png",
        link: "https://regstore.vercel.app/",
        linkText: "View Live Project"
      }

    ]
  },

  process: {
    tag: "Our Process",
    staircaseHeading: [
      { text: "HOW WE APPROACH", indent: false, accent: false },
      { text: "PROJECTS", indent: true, accent: true }
    ],
    description: "A transparent, collaborative workflow from discovery to deployment. You're involved at every step.",
    phases: [
      {
        phase: "Phase 01",
        title: "Discovery & Architecture",
        summary: "Defining scope, technical specifications, and project roadmap.",
        details: "We start by immersing ourselves in your domain, business goals, and user requirements. This phase produces a comprehensive architectural blueprint.",
        checkpoints: [
          "In-depth requirements analysis & scoping workshops",
          "Scalable system architecture & database schema design",
          "Clear milestones, delivery timeline & tech stack selection"
        ]
      },
      {
        phase: "Phase 02",
        title: "Agile Development Sprint",
        summary: "Iterative building with continuous feedback and staging previews.",
        details: "Our core engineering phase follows modern agile methodologies to build clean, maintainable code with high velocity and total transparency.",
        checkpoints: [
          "Iterative bi-weekly build cycles with clear deliverables",
          "Live demo staging environments for continuous review",
          "Clean, well-documented code repository with CI integration"
        ]
      },
      {
        phase: "Phase 03",
        title: "Quality & Security Audit",
        summary: "Thorough testing, optimization, and security vulnerability checks.",
        details: "Before reaching production, every line of code undergoes rigorous testing across performance, security, and user experience standards.",
        checkpoints: [
          "End-to-end user flow & automated unit testing",
          "Performance optimization & Core Web Vitals audit",
          "Security, authentication & payload vulnerability checks"
        ]
      },
      {
        phase: "Phase 04",
        title: "Production Deployment",
        summary: "Automated pipelines, SSL setup, domain routing & code handover.",
        details: "Seamless transition to production servers with zero downtime deployment strategies and complete technical documentation handover.",
        checkpoints: [
          "Automated CI/CD deployment pipeline configuration",
          "Custom domain, DNS & SSL security certificate setup",
          "Comprehensive code handover & operations documentation"
        ]
      },
      {
        phase: "Phase 05",
        title: "Growth & SLA Support",
        summary: "Post-launch maintenance, scalability monitoring, and feature iteration.",
        details: "We stand by our work long after launch, ensuring your application remains fast, secure, and continuously evolving with your user base.",
        checkpoints: [
          "Dedicated post-launch bug fix guarantee",
          "24/7 performance monitoring & traffic scale tuning",
          "Long-term strategic enhancements & feature roadmap"
        ]
      }
    ]
  },

  contact: {
    tag: "Communication Portal",
    staircaseHeading: [
      { text: "LET'S BUILD", indent: false, accent: false },
      { text: "TOGETHER", indent: true, accent: true }
    ],
    description: "Have a project in mind? Reach out directly or submit your requirements below.",
    cards: {
      email: "nirmanamsolutions@gmail.com",
      location: "Pune, Maharashtra, India",
      responseTime: "Within 24 hours guaranteed"
    },
    solutionsNeeded: [
      "Web Platform Development",
      "Mobile Application Engineering",
      "System UI/UX Audit & Design",
      "Cloud Infrastructure & Scaling",
      "Other Development Services"
    ],
    budgetRanges: [
      "Under ₹50,000",
      "₹50,000 - ₹1,50,000",
      "₹1,50,000 - ₹3,00,000",
      "₹3,00,000+"
    ],
    terminalText: "Nirmanam Solutions. High-performance web applications & modern digital software architecture. Built with precision and speed."
  },

  footer: {
    brandStatement: "Premium engineering studio. We build top-tier software systems, reliable web infrastructure, and high-performance digital platforms tailored to complex business challenges.",
    capabilities: [
      "Web Solutions",
      "Mobile Systems",
      "UI/UX Design",
      "Cloud & DevOps"
    ],
    explore: [
      { label: "About Studio", href: "#about" },
      { label: "Case Studies", href: "#portfolio" },
      { label: "Our Process", href: "#process" },
      { label: "Contact Us", href: "#contact" }
    ],
    newsletterHeader: "Stay Connected",
    newsletterDescription: "Subscribe to receive engineering insights, project case studies, and updates from our studio.",
    copyright: "© 2026 Nirmanam Solutions. Engineered with precision for clients globally."
  }
};
