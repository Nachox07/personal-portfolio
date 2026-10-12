import { StaticImageData } from "next/image";
import dirlin from "@/public/dirlin.png";
import alexaSkill from "@/public/alexa-skill.png";
import mapayuda from "@/public/mapayuda.jpg";
import whisperland from "@/public/whisperland.webp";
import qah from "@/public/qah.jpg";
import tardeo from "@/public/tardeo.png";

export const links = [
  {
    name: "Home",
    hash: "#home",
  },
  {
    name: "Experience",
    hash: "#experience",
  },
  {
    name: "Projects",
    hash: "#projects",
  },
] as const;

type Experience = {
  role: string;
  company: string;
  period: string;
  description: string;
};

export const experienceData: readonly Experience[] = [
  {
    role: "Technical Lead Engineer",
    company: "OpenVPN",
    period: "Nov 2025 — Present",
    description:
      "Lead a team of 10 across development, QA and DevOps. Build AI agents that retrieve information and call tools, where a person approves any change before it is applied.",
  },
  {
    role: "Technical Lead Engineer",
    company: "Cognigy (acquired by NICE)",
    period: "Sep 2021 — Oct 2025",
    description:
      "Led AI Copilot and Live Agent, turning live messages and call transcripts into real-time guidance for contact-centre agents. Mentored 7 engineers on products serving Lufthansa at 13k+ conversations a day.",
  },
  {
    role: "Senior Software Developer",
    company: "William Hill",
    period: "Mar 2020 — Sep 2021",
    description:
      "Sportsbook backend microservices on Node.js, TypeScript, Kubernetes and Kafka, plus the React front end that consumed them.",
  },
  {
    role: "Senior Software Developer",
    company: "Addison Global (MoPlay)",
    period: "Jun 2019 — Mar 2020",
    description:
      "Shipped the MoPlay React Native app to both stores and built the casino website in three months with React, RxJS and xState.",
  },
];

type Project = {
  title: string;
  description: string;
  tags: readonly string[];
  imageUrl: StaticImageData | string;
  url?: string;
  discontinued?: boolean;
};

export const projectsData: readonly Project[] = [
  {
    title: "Tardeo.ai",
    description:
      "A free daily agenda of evening plans in Málaga, Sevilla, Fuengirola and Marbella. A Node service reads what venues post, uses Claude to pull the events out, and publishes them to the site, Telegram channels and Instagram",
    tags: [
      "TypeScript",
      "Node.js",
      "Puppeteer",
      "Anthropic Claude",
      "SQLite",
      "Telegram Bot API",
      "Astro",
      "Cloudflare",
    ],
    imageUrl: tardeo,
    url: "https://tardeo.ai",
  },
  {
    title: "Movie Recommender Alexa Skill",
    description:
      "An Alexa skill I built for the Amazon Developer Promotion, which won several Echo devices",
    tags: ["TypeScript", "Axios", "AWS Lambda"],
    imageUrl: alexaSkill,
    url: "https://www.amazon.es/Garilleti-Software-Recomendador-de-pel%C3%ADculas/dp/B081F2HJGS",
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
