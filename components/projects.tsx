import React from "react";
import SectionHeading from "./section-heading";
import InViewSection from "./in-view-section";
import Project from "./project";
import { projectsData } from "@/lib/data";

// The first few are current work; the rest sit under "Earlier".
const RECENT = 3;

export default function Projects() {
	return (
		<InViewSection
			name="Projects"
			id="projects"
			labelledBy="projects-title"
			className="scroll-mt-20 pb-24 sm:pb-32"
		>
			<SectionHeading index="02" id="projects-title">
				Projects
			</SectionHeading>
			<ol className="border-t border-line">
				{projectsData.slice(0, RECENT).map((project, index) => (
					<Project key={project.title} index={index} {...project} />
				))}
			</ol>
			<h3 className="mono-label mb-0 mt-12 pb-3">Earlier</h3>
			<ol className="border-t border-line" start={RECENT + 1}>
				{projectsData.slice(RECENT).map((project, index) => (
					<Project key={project.title} index={RECENT + index} {...project} />
				))}
			</ol>
		</InViewSection>
	);
}
