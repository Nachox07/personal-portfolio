import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import React from "react";
import SectionHeading from "./section-heading";
import InViewSection from "./in-view-section";
import { getCaseStudy } from "@/lib/case-studies";

// The case studies, first thing after the intro. Tardeo leads and takes the big tile.
const FEATURED = ["tardeo", "extraction-evals", "whisperland"];

export default function SelectedWork() {
	const studies = FEATURED.flatMap((slug) => {
		const study = getCaseStudy(slug);
		return study ? [{ slug, meta: study.meta }] : [];
	});
	if (studies.length === 0) return null;

	return (
		<InViewSection name="Work" id="work" labelledBy="work-title" className="scroll-mt-20 pb-24 sm:pb-32">
			<SectionHeading index="01" id="work-title">
				Selected work
			</SectionHeading>
			<ul className="grid grid-cols-1 gap-5 md:grid-cols-2">
				{studies.map(({ slug, meta }, i) => {
					const lead = i === 0;
					return (
						<li
							key={slug}
							className={clsx(
								"work-card reveal group relative flex flex-col overflow-hidden rounded-lg border border-line bg-surface",
								// The lead card spans the row, image beside the text.
								lead && "md:col-span-2 md:grid md:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]"
							)}
						>
							{(meta.card?.image || meta.cover) && (
								<div
									className={clsx(
										"relative overflow-hidden border-b border-line",
										lead ? "aspect-[16/10] md:aspect-auto md:min-h-[22rem] md:border-b-0 md:border-r" : "aspect-[16/7]"
									)}
								>
									<Image
										src={meta.card?.image ?? meta.cover!.src}
										alt=""
										fill
										sizes={lead ? "(min-width: 768px) 34rem, 100vw" : "(min-width: 768px) 30rem, 100vw"}
										quality={80}
										className={clsx("work-cover object-cover", lead ? "object-center" : "object-top")}
									/>
								</div>
							)}
							<div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
								<p className="mono-label normal-case tracking-normal">
									{meta.period} · {meta.role}
								</p>
								<h3 className={clsx("font-semibold tracking-tight", lead ? "text-2xl sm:text-3xl" : "text-xl")}>
									<Link
										href={`/projects/${slug}`}
										className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none group-hover:text-accent"
									>
										{meta.title}
									</Link>
								</h3>
								{meta.card && (
									<>
										<p className="text-sm leading-relaxed text-muted">{meta.card.tagline}</p>
										<p className="leading-snug">
											<span className={clsx("block font-semibold tracking-tight text-accent", lead ? "text-3xl sm:text-4xl" : "text-2xl")}>
												{meta.card.claim}
											</span>
											<span className="mt-1 block text-sm text-ink">{meta.card.context}</span>
										</p>
										<ul className="flex flex-wrap gap-1.5">
											{meta.card.facts.map((fact) => (
												<li
													key={fact}
													className="rounded-sm border border-line px-2 py-0.5 font-mono text-[0.7rem] text-faint"
												>
													{fact}
												</li>
											))}
										</ul>
									</>
								)}
								<p className="mt-auto pt-1 font-mono text-xs text-accent">
									Read the case study <span aria-hidden className="work-arrow inline-block">→</span>
								</p>
							</div>
						</li>
					);
				})}
			</ul>
		</InViewSection>
	);
}
