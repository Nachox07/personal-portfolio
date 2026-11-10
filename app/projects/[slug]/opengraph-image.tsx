import { getCaseStudy, publishedSlugs } from "@/lib/case-studies";
import { shareImage, shareSize } from "@/lib/share-card";

export const alt = "Case study by Nacho González-Garilleti";
export const size = shareSize;
export const contentType = "image/png";

export function generateStaticParams() {
	return publishedSlugs().map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const study = getCaseStudy(slug);
	if (!study) return new Response("Not found", { status: 404 });
	const { meta } = study;
	return shareImage({
		label: `Case study · ${meta.period}`,
		title: meta.title,
		lead: meta.card?.tagline ?? meta.summary,
		claim: meta.card?.claim,
		context: meta.card?.context,
		facts: meta.card?.facts,
	});
}
