import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCaseStudy, publishedSlugs } from "@/lib/case-studies";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
	return publishedSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params;
	const study = getCaseStudy(slug);
	if (!study) return {};
	const title = `${study.meta.title} — case study | Nacho González-Garilleti`;
	return {
		title,
		description: study.meta.summary,
		openGraph: { title, description: study.meta.summary, type: "article" },
		...(study.meta.status === "draft" ? { robots: { index: false } } : {}),
	};
}

export default async function CaseStudyPage({ params }: Props) {
	const { slug } = await params;
	const study = getCaseStudy(slug);
	if (!study) notFound();
	const { meta, Content } = study;

	return (
		<main id="main" className="mx-auto w-full max-w-5xl scroll-mt-24 px-4 pb-24 pt-10 sm:px-8 sm:pt-16">
			<Link
				href="/#projects"
				className="font-mono text-xs uppercase tracking-[0.12em] text-faint hover:text-accent"
			>
				← All projects
			</Link>

			<header className="mt-8 max-w-3xl">
				<p className="mono-label normal-case tracking-normal">
					Case study · {meta.period}
					{meta.status === "draft" && (
						<span className="ml-2 rounded-sm border border-dashed border-accent px-1.5 py-0.5 text-accent">
							draft
						</span>
					)}
				</p>
				<h1 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-6xl">
					{meta.title}
				</h1>
				<p className="mt-6 text-lg leading-relaxed text-muted sm:text-xl">{meta.summary}</p>
			</header>

			<div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-16">
				<article className="max-w-2xl">
					{meta.cover && (
						<div className="mb-4 overflow-hidden rounded-md border border-line bg-surface">
							<Image
								src={meta.cover.src}
								alt={meta.cover.alt}
								priority
								sizes="(min-width: 768px) 42rem, 100vw"
								className="h-auto w-full"
							/>
						</div>
					)}
					<Content />
				</article>

				{/* The span's attributes, like a trace viewer's side panel. */}
				<aside className="order-first lg:order-none">
					<dl className="space-y-5 border-l border-line pl-5 font-mono text-xs lg:sticky lg:top-24">
						<div>
							<dt className="uppercase tracking-[0.12em] text-faint">Period</dt>
							<dd className="mt-1 text-ink">{meta.period}</dd>
						</div>
						<div>
							<dt className="uppercase tracking-[0.12em] text-faint">Role</dt>
							<dd className="mt-1 text-ink">{meta.role}</dd>
						</div>
						<div>
							<dt className="uppercase tracking-[0.12em] text-faint">Stack</dt>
							<dd className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-muted">
								{meta.stack.map((s) => (
									<span key={s}>{s}</span>
								))}
							</dd>
						</div>
						{meta.links.length > 0 && (
							<div>
								<dt className="uppercase tracking-[0.12em] text-faint">Links</dt>
								<dd className="mt-1 space-y-1">
									{meta.links.map((l) => (
										<a
											key={l.href}
											href={l.href}
											target="_blank"
											rel="noopener noreferrer"
											className="block text-ink hover:text-accent"
										>
											{l.label} <span aria-hidden>↗</span>
											<span className="sr-only"> (opens in a new tab)</span>
										</a>
									))}
								</dd>
							</div>
						)}
					</dl>
				</aside>
			</div>
		</main>
	);
}
