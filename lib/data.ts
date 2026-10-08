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
      "Security and AI-agent work on a cloud-delivered secure-networking platform: per-customer certificate authorities, device identity, OAuth2/OIDC access, and LangGraph agents on Vertex AI with human approval before they act.",
  },
  {
    role: "Technical Lead Engineer",
    company: "Cognigy (acquired by NICE)",
    period: "Sep 2021 — Nov 2025",
    description:
      "Led Live Agent and AI Copilot, mentoring 7 engineers on products that served Lufthansa's contact centre at 13k+ conversations a day.",
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
      "A platform that I created to help people find the best time to meet with their friends and family using AI",
    tags: [
      "React",
      "Next.js",
      "Tailwind",
      "TypeScript",
      "Langchain",
      "LLMs",
      "OpenAI",
      "Anthropic",
    ],
    imageUrl: tardeo,
    url: "https://tardeo.ai",
  },
  {
    title: "Movie Recommender Alexa Skill",
    description:
      "An Alexa skill that I made for the Amazon Developer Promotion. Thanks to my skills, I won several Echo devices",
    tags: ["TypeScript", "Axios", "AWS Lambda"],
    imageUrl: alexaSkill,
    url: "https://www.amazon.es/Garilleti-Software-Recomendador-de-pel%C3%ADculas/dp/B081F2HJGS",
  },
  {
    title: "Whisperland iOS & Android App",
    description:
      "A social network that revolutionizes the way you discover and connect with your surroundings",
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
    url: "https://whisper.land",
    discontinued: true,
  },
  {
    title: "Mapayuda for Volunteering",
    description:
      "I developed a platform to help people in need, to volunteer and live adventures around the world",
    tags: ["PHP", "JQuery", "AWS", "MySQL", "Bootstrap"],
    imageUrl: mapayuda,
    url: "https://mapayuda.org",
  },
  {
    title: "Dirlin Bookmarks Manager",
    description:
      "A platform which I created to save your favorite links in the cloud. Recommended comparing with other users to offer a personalized experience",
    tags: ["PHP", "JQuery", "AWS", "MySQL", "Bootstrap"],
    imageUrl: dirlin,
    discontinued: true,
  },
  {
    title: "Que Aprendemos Hoy",
    description:
      "I was webmaster of the website for a few years. I was in charge of developing and maintaining the Spanish leader crowd learning platform.",
    tags: ["PHP", "Wordpress", "AWS", "MySQL"],
    imageUrl: qah,
    discontinued: true,
  },
] as const;
