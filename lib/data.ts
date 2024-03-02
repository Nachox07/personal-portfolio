import { StaticImageData } from "next/image";
import dirlin from "@/public/dirlin.png";
import alexaSkill from "@/public/alexa-skill.png";
import mapayuda from "@/public/mapayuda.jpg";
import qah from "@/public/qah.jpg";

export const links = [
	{
		name: "Home",
		hash: "#home",
	},
	{
		name: "Projects",
		hash: "#projects",
	},
] as const;

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
		imageUrl: "https://whisper.land/wp-content/uploads/2024/02/1.png" as string,
		url: "https://whisper.land",
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
