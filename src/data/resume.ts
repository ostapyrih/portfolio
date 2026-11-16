/**
 * All personal content lives here.
 * Anything marked TODO is a placeholder - replace it with real data.
 */

export const DATA = {
  name: "Ostap Pyrih",
  initials: "OP",
  url: "https://ostapyrih.com",
  role: "Full-Stack Developer / DevOps Engineer",
  location: "Asturias, Spain",
  avatarUrl: "/avatar.jpg",
  languages: ["English", "Ukrainian", "Polish", "Russian"],
  description:
    "Full-Stack Developer & DevOps Engineer with 8+ years of experience. I build SaaS products, backend APIs and business automation - and run them in the cloud.",
  summary:
    "I've spent 8+ years building web applications, SaaS products, e-commerce solutions, business automation systems and cloud infrastructure - covering the full lifecycle from architecture design and implementation to deployment and maintenance. My core stack is React, TypeScript, Python, AWS, Terraform and Docker. I spent three years building Atlassian Jira Cloud and Data Center apps at SaaSJet, and today I design and ship my own SaaS products while helping clients turn ideas into reliable software.",

  skills: [
    "TypeScript",
    "JavaScript",
    "Python",
    "SQL",
    "React",
    "Node.js",
    "FastAPI",
    "REST APIs",
    "Microservices",
    "MongoDB",
    "MySQL",
    "AWS",
    "Terraform",
    "Docker",
    "Nginx",
    "CI/CD",
    "Linux",
    "Atlassian Jira Cloud & Data Center",
    "Telegram bots",
    "WordPress",
    "Magento",
    "Agile / Scrum",
  ],

  contact: {
    email: "ostapyrih@gmail.com",
    telegram: "ostapyrih",
    social: {
      GitHub: "https://github.com/ostapyrih",
      Fiverr: "https://www.fiverr.com/ostapyrih",
      LinkedIn: "https://www.linkedin.com/in/ostapyrih",
    },
  },

  work: [
    {
      company: "Freelance & own SaaS products",
      href: "https://www.fiverr.com/ostapyrih",
      title: "Full-Stack Developer / DevOps Engineer",
      logo: "",
      start: "2024",
      end: "Present",
      bullets: [
        "Designed, built and launched ClientStatus, Collectly and CaseForge - multi-tenant SaaS products.",
        "Full-stack web applications, backend APIs, bots and DevOps for clients via Fiverr and direct contracts.",
      ],
    },
    {
      company: "SaaSJet",
      href: "https://saasjet.com",
      title: "Full-Stack Developer / DevOps Engineer · Ternopil, Ukraine",
      logo: "/logos/saasjet.png",
      start: "2021",
      end: "2024",
      bullets: [
        "Developed and maintained apps for the Atlassian ecosystem, including Jira Cloud and Jira Data Center products.",
        "Built frontend and backend functionality in TypeScript and JavaScript.",
        "Integrated Atlassian APIs and built custom workflow-automation and business-process solutions.",
        "Took part in architecture design, troubleshooting and performance optimization.",
        "Managed AWS infrastructure as code with Terraform; built Docker-based dev and production environments.",
        "Configured Nginx servers and reverse proxies and automated deployment and provisioning.",
      ],
    },
    {
      company: "Ismart.How LLC",
      href: "",
      title: "Full-Stack Developer · Warsaw, Poland",
      logo: "",
      start: "2019",
      end: "2020",
      bullets: [
        "Developed and maintained Telegram bots in Python - workflows, business logic and user interaction.",
        "Integrated bots with third-party APIs and external services.",
        "Built backend functionality and automation tools, plus data storage, processing and reporting.",
      ],
    },
    {
      company: "Goodahead LLC",
      href: "",
      title: "Full-Stack Developer · Ternopil, Ukraine",
      logo: "",
      start: "2016",
      end: "2018",
      bullets: [
        "Developed custom websites and web applications.",
        "Built WordPress solutions with custom themes and plugins; developed and customized Magento stores.",
        "Integrated third-party services, payment systems and external APIs.",
      ],
    },
    {
      company: "Evolution LLC",
      href: "",
      title: "Junior Full-Stack Developer · Ternopil, Ukraine",
      logo: "",
      start: "2016",
      end: "2016",
      bullets: [
        "Built and maintained WordPress and Magento websites, themes, plugins and e-commerce features.",
        "Implemented frontend components with HTML, CSS and JavaScript.",
      ],
    },
  ],

  education: [
    {
      school: "Polish-Japanese Academy of Information Technology (PJATK)",
      href: "https://pja.edu.pl/en/",
      degree: "Computer Science studies",
      logo: "/logos/pjatk.png",
      start: "",
      end: "",
    },
  ],

  projects: [
    {
      title: "ClientStatus",
      href: "https://clientstatus.cloud",
      image: "/projects/clientstatus.png",
      dates: "2026", // TODO: confirm
      description:
        "A lightweight client-portal layer for small teams. Rows in Google Sheets become branded, tokenized client portals with timelines, milestones and file sharing - clients check status themselves instead of emailing “any updates yet?”.",
      technologies: ["SaaS", "Google Sheets sync", "SAML SSO", "Multi-language"],
      links: [{ type: "Website", href: "https://clientstatus.cloud" }],
    },
    {
      title: "Collectly",
      href: "https://collectly.cloud",
      image: "/projects/collectly.png",
      dates: "2026", // TODO: confirm
      description:
        "Document collection for accountants, lawyers and brokers. Send one secure link, the client uploads everything without an account, automatic reminders do the chasing and you download a single ZIP at the end.",
      technologies: ["SaaS", "Multi-tenant", "File uploads", "Automated reminders"],
      links: [{ type: "Website", href: "https://collectly.cloud" }],
    },
    {
      title: "CaseForge",
      href: "https://caseforge.cloud",
      image: "/projects/caseforge.png",
      dates: "2026", // TODO: confirm
      description:
        "Legal document automation for solo lawyers, small firms and notaries. Reusable templates with variables generate DOCX and PDF documents in seconds, alongside case tracking and deadline management.",
      technologies: ["SaaS", "Document generation", "DOCX / PDF", "Case management"],
      links: [{ type: "Website", href: "https://caseforge.cloud" }],
    },
  ],
} as const;

/** Telegram links are hidden until a real username is set above. */
export const hasTelegram = !(DATA.contact.telegram as string).startsWith("TODO");
export const telegramUrl = `https://t.me/${DATA.contact.telegram}`;
export const emailUrl = `mailto:${DATA.contact.email}`;
