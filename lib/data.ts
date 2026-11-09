import { StaticImageData } from "next/image";
import dirlin from "@/public/dirlin.png";
import alexaSkill from "@/public/alexa-skill.png";
import mapayuda from "@/public/mapayuda.jpg";
import whisperland from "@/public/whisperland.webp";
import qah from "@/public/qah.jpg";
import tardeo from "@/public/tardeo.png";
import extractionEvals from "@/public/extraction-evals.png";
import daylit from "@/public/daylit.webp";

export const links = [
  {
    name: "Home",
    hash: "#home",
  },
  {
    name: "Work",
    hash: "#work",
  },
  {
    name: "Experience",
    hash: "#experience",
  },
  {
    name: "Projects",
    hash: "#projects",
  },
  {
    name: "Contact",
    hash: "#contact",
  },
] as const;

export const contact = {
  email: "hello@garilleti.me",
  linkedin: "https://www.linkedin.com/in/nachogonzalezgarilleti/",
  pitch:
    "Open to staff, lead and founding-engineer roles: building AI agents in production, and the team around them. Permanent or contract.",
} as const;

type Experience = {
  role: string;
  company: string;
  period: string;
  description: string;
  highlights?: readonly { label: string; detail: string }[];
  customers?: readonly string[];
};

export const experienceData: readonly Experience[] = [
  {
    role: "Technical Lead Engineer",
    company: "OpenVPN",
    period: "Nov 2025 — Present",
    description:
      "Lead a team of 10 across development, QA and DevOps. Build AI agents that retrieve information and call tools, where a person approves any change before it is applied. Built load tests that emulate 110k+ devices and gateways connecting to the backend at once, to benchmark its performance.",
  },
  {
    role: "Technical Lead Engineer",
    company: "Cognigy (acquired by NICE)",
    period: "Sep 2021 — Oct 2025",
    description:
      "Led AI Copilot and Live Agent with a cross-functional team of 7 reporting to me. I owned the integrations that hand a conversation from the AI agent to human agents and back, with RingCentral Engage, Salesforce, Genesys and others.",
    highlights: [
      {
        label: "Live Agent",
        detail:
          "Scaled the bot-to-human handover from 50 simultaneous agents to 500 registered and 200+ active, at 13k+ conversations a day for a major airline, through the peaks of its strikes. Agent pages that had frozen for up to ten minutes, with requests stuck for 30+ seconds, came back to near-instant.",
      },
      {
        label: "Real-time path",
        detail:
          "Designed the move from broadcasting every event to all agents to per-conversation subscriptions, and added PostgreSQL read replicas with automatic failover on Kubernetes. Autoscaling followed queued chats and app-server metrics, not just CPU and memory.",
      },
      {
        label: "Load tests",
        detail:
          "Replayed how the airline's agents actually worked: real browsers in containers typing, sending and reloading while the backend took the handover load, so the tests measured what an agent feels, not just API throughput.",
      },
      {
        label: "AI Copilot",
        detail:
          "Sentiment analysis and real-time guidance for contact-centre agents, from live messages and call transcripts.",
      },
    ],
    customers: [
      "Lufthansa",
      "Bosch",
      "Allianz",
      "DHL",
      "Lidl",
      "Bayer",
      "E.ON",
      "Škoda",
      "Vueling",
      "Frontier Airlines",
      "ARAG",
      "Fabletics",
      "Mister Spex",
      "Salzburg AG",
      "Direct Travel",
      "Nuuday",
    ],
  },
  {
    role: "Senior Software Developer",
    company: "William Hill",
    period: "Mar 2020 — Sep 2021",
    description:
      "Sportsbook backend microservices on Node.js, TypeScript, Kubernetes and Kafka, handling 300+ requests a second and 1k+ at Boxing Day peaks, with thousands of Kafka messages a second, plus the React front end that consumed them.",
  },
  {
    role: "Senior Software Developer",
    company: "Addison Global (MoPlay)",
    period: "Jun 2019 — Mar 2020",
    description:
      "Shipped the MoPlay React Native app to both stores and built the casino website in three months with React, RxJS and xState.",
  },
  {
    role: "Senior Software Developer",
    company: "Ciklum",
    period: "Dec 2017 — Jun 2019",
    description:
      "Front-end developer for Addison Global, the creators of MoPlay, on Ciklum's team. Promoted to senior in December 2018.",
  },
];

type Project = {
  title: string;
  description: string;
  tags: readonly string[];
  imageUrl: StaticImageData | string;
  url?: string;
  discontinued?: boolean;
  // Slug of a case study under content/projects, when one exists.
  caseStudy?: string;
};

export const projectsData: readonly Project[] = [
  {
    title: "Tardeo.ai",
    description:
      "A free daily agenda of evening plans in Málaga, Sevilla, Fuengirola and Marbella. A Node service reads what venues post, uses AI models, Claude today, to pull the events out, and publishes them to the site and Telegram channels",
    tags: [
      "TypeScript",
      "Node.js",
      "Anthropic Claude",
      "SQLite",
      "Telegram Bot API",
      "Astro",
      "Cloudflare",
    ],
    imageUrl: tardeo,
    url: "https://tardeo.ai/?s=garilleti",
    caseStudy: "tardeo",
  },
  {
    title: "Extraction evals",
    description:
      "How I measure prompt changes on Tardeo's extraction pipeline: a hit rule frozen before scoring, misses and false alarms counted apart, a human review of every disagreement, and a held-out check where the gain did not replicate",
    tags: ["TypeScript", "LLM evaluation", "Vitest", "Anthropic Claude"],
    imageUrl: extractionEvals,
    url: "https://github.com/Nachox07/extraction-evals",
    caseStudy: "extraction-evals",
  },
  {
    title: "Daylit",
    description:
      "A macOS menu-bar app and Windows tray app that sets external monitor brightness from the sun's height, and from a window blind and room lights through Home Assistant",
    tags: ["Swift", "SwiftUI", "WPF", ".NET", "Home Assistant"],
    imageUrl: daylit,
    url: "https://github.com/Nachox07/daylit",
  },
  {
    title: "Movie Recommender Alexa Skill",
    description:
      "An Alexa skill I built for the Amazon Developer Promotion, which won several Echo devices. Built before LLMs on Alexa's own language understanding: a custom intent with a genre slot, sample phrases, Alexa asking for the genre when it was missing, and screens for Echo Show. It reached thousands of monthly users",
    tags: ["JavaScript", "Node.js", "Alexa Skills Kit", "AWS Lambda", "Cheerio"],
    imageUrl: alexaSkill,
    discontinued: true,
  },
  {
    title: "Whisperland iOS & Android App",
    description:
      "The first version of Tardeo: a location-based social app for discovering what is happening around you. Shipped to both stores, and retired when the product became Tardeo.ai",
    tags: [
      "React Native",
      "Nest.js",
      "Postgres",
      "Redux",
      "OneSignal",
      "Mapbox",
      "Digital Ocean",
      "Redis",
    ],
    imageUrl: whisperland,
    discontinued: true,
    caseStudy: "whisperland",
  },
  {
    title: "Mapayuda for Volunteering",
    description:
      "A platform connecting volunteers with people and projects that need help, anywhere in the world",
    tags: ["PHP", "JQuery", "AWS", "MySQL", "Bootstrap"],
    imageUrl: mapayuda,
    url: "https://mapayuda.org",
  },
  {
    title: "Dirlin Bookmarks Manager",
    description:
      "A bookmark manager that suggested links based on what similar users had saved",
    tags: ["PHP", "JQuery", "AWS", "MySQL", "Bootstrap"],
    imageUrl: dirlin,
    discontinued: true,
  },
  {
    title: "Que Aprendemos Hoy",
    description:
      "I was webmaster for a few years, developing and maintaining one of the largest Spanish-language crowd-learning platforms.",
    tags: ["PHP", "Wordpress", "AWS", "MySQL"],
    imageUrl: qah,
    discontinued: true,
  },
] as const;
