import React from "react";
import SectionHeading from "./section-heading";
import InViewSection from "./in-view-section";
import Project from "./project";
import { projectsData } from "@/lib/data";

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
				{projectsData.map((project, index) => (
					<Project key={project.title} index={index} {...project} />
				))}
			</ol>
		</InViewSection>
	);
}
