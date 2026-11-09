import React from "react";
import SectionHeading from "./section-heading";
import InViewSection from "./in-view-section";
import Project from "./project";
import { projectsData } from "@/lib/data";
import { isPublished } from "@/lib/case-studies";

// Projects with a published case study are shown as cards in Selected work.
const others = projectsData.filter((p) => !(p.caseStudy && isPublished(p.caseStudy)));
// The two most relevant stay open; the oldest fold under "Earlier projects".
const SHOWN = 2;

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
				{others.slice(0, SHOWN).map((project, index) => (
					<Project key={project.title} index={index} {...project} />
				))}
			</ol>
			{others.length > SHOWN && (
				<details className="group/earlier mt-10">
					<summary className="mono-label inline-flex cursor-pointer list-none items-center gap-2 pb-3 hover:text-ink [&::-webkit-details-marker]:hidden">
						<span aria-hidden className="inline-block transition-transform group-open/earlier:rotate-90">
							›
						</span>
						Earlier projects ({others.length - SHOWN})
					</summary>
					<ol className="border-t border-line" start={SHOWN + 1}>
						{others.slice(SHOWN).map((project, index) => (
							<Project key={project.title} index={SHOWN + index} {...project} />
						))}
					</ol>
				</details>
			)}
		</InViewSection>
	);
}
