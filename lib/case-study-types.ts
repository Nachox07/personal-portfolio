import type { StaticImageData } from "next/image";

export type CaseStudyMeta = {
	title: string;
	summary: string;
	// Free text, e.g. "2023 — present".
	period: string;
	role: string;
	// Drafts are left out of production builds; see isPublished.
	status: "draft" | "ready";
	stack: readonly string[];
	links: readonly { label: string; href: string }[];
	cover?: { src: StaticImageData; alt: string };
	// The home-page card: what the project is, its headline claim, and two or three short facts.
	card?: { tagline: string; claim: string; context: string; facts: readonly string[]; image?: StaticImageData };
};
