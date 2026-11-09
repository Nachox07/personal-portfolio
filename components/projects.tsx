import React from "react";
import SectionHeading from "./section-heading";
import InViewSection from "./in-view-section";
import Project from "./project";
import { projectsData } from "@/lib/data";
import { isPublished } from "@/lib/case-studies";

// Projects with a published case study are shown as cards in Selected work.
const others = projectsData.filter((p) => !(p.caseStudy && isPublished(p.caseStudy)));
// The first few are current work; the rest sit under "Earlier".
const firstEarlier = others.findIndex((p) => p.discontinued);
const RECENT = firstEarlier === -1 ? others.length : firstEarlier;

export default function Projects() {
	return (
		<InViewSection
			name="Projects"
			id="projects"
			labelledBy="projects-title"
			className="scroll-mt-20 pb-24 sm:pb-32"
		>
			<SectionHeading index="03" id="projects-title">
				Other projects
			</SectionHeading>
			<ol className="border-t border-line">
				{others.slice(0, RECENT).map((project, index) => (
					<Project key={project.title} index={index} {...project} />
				))}
			</ol>
			<h3 className="mono-label mb-0 mt-12 pb-3">Earlier</h3>
			<ol className="border-t border-line" start={RECENT + 1}>
				{others.slice(RECENT).map((project, index) => (
					<Project key={project.title} index={RECENT + index} {...project} />
				))}
			</ol>
		</InViewSection>
	);
}
