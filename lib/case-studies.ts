import type { ComponentType } from "react";
import type { CaseStudyMeta } from "./case-study-types";
import Tardeo, { meta as tardeo } from "@/content/projects/tardeo.mdx";
import ExtractionEvals, { meta as extractionEvals } from "@/content/projects/extraction-evals.mdx";
import Whisperland, { meta as whisperland } from "@/content/projects/whisperland.mdx";

type CaseStudy = { meta: CaseStudyMeta; Content: ComponentType };

// Published case studies, keyed by slug. Each entry imports an MDX file from
// content/projects. Drafts are written and previewed locally and only committed
// once they are ready, because this repository is public.

const all: Record<string, CaseStudy> = {
	tardeo: { meta: tardeo, Content: Tardeo },
	"extraction-evals": { meta: extractionEvals, Content: ExtractionEvals },
	whisperland: { meta: whisperland, Content: Whisperland },
};

// Drafts show locally and on preview deployments, never on garilleti.me.
export function isPublished(slug: string): boolean {
	const study = all[slug];
	if (!study) return false;
	return study.meta.status === "ready" || process.env.VERCEL_ENV !== "production";
}

export function getCaseStudy(slug: string): CaseStudy | undefined {
	return isPublished(slug) ? all[slug] : undefined;
}

export function publishedSlugs(): string[] {
	return Object.keys(all).filter(isPublished);
}
