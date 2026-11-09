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
};
