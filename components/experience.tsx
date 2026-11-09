import React from "react";
import SectionHeading from "./section-heading";
import InViewSection from "./in-view-section";
import { experienceData } from "@/lib/data";
import { parsePeriod } from "@/lib/timeline";

export default function Experience() {
	// Rendered at build time, so the "Present" bar reaches the last deploy.
	// TIMELINE_NOW pins the date in visual tests so the "Present" bar stays still.
	const now = process.env.TIMELINE_NOW
		? new Date(process.env.TIMELINE_NOW)
		: new Date();
	const spans = experienceData.map((item) => parsePeriod(item.period, now));
	const axisStart = Math.floor(Math.min(...spans.map((s) => s.start)) / 12) * 12;
	const axisEnd = Math.max(...spans.map((s) => s.end));
	const total = axisEnd - axisStart;
	const pct = (month: number) => ((month - axisStart) / total) * 100;

	const years: number[] = [];
	for (let y = axisStart / 12; y * 12 < axisEnd; y++) years.push(y);

	return (
		<InViewSection
			name="Experience"
			id="experience"
			labelledBy="experience-title"
			className="scroll-mt-20 pb-24 sm:pb-32"
		>
			<SectionHeading index="02" id="experience-title">
				Experience
			</SectionHeading>

			<div className="grid grid-cols-1 sm:grid-cols-[17rem_1fr] sm:gap-x-8">
				{/* Year axis */}
				<div className="hidden sm:block" />
				<div aria-hidden className="relative mb-2 ml-6 h-5 font-mono text-[0.68rem] text-faint sm:ml-0">
					{years.map((y, i) => (
						<span
							key={y}
							className={i % 2 ? "absolute hidden sm:inline" : "absolute"}
							style={{ left: `${pct(y * 12)}%` }}
						>
							<span className="absolute -bottom-2 left-0 h-1.5 w-px bg-line" />
							{`'${String(y).slice(2)}`}
						</span>
					))}
				</div>
			</div>

			<ol className="border-t border-line">
				{experienceData.map((item, i) => {
					const span = spans[i];
					return (
						<li key={item.company} data-reveal className="border-b border-line">
							<details open={i < 2} className="group">
								<summary className="grid cursor-pointer list-none grid-cols-1 gap-x-8 gap-y-3 py-5 sm:grid-cols-[17rem_1fr] sm:items-center [&::-webkit-details-marker]:hidden">
									<div className="flex gap-3">
										<span
											aria-hidden
											className="w-3 shrink-0 pt-px font-mono text-sm leading-6 text-faint group-hover:text-accent"
										>
											<span className="group-open:hidden">+</span>
											<span className="hidden group-open:inline">−</span>
										</span>
										<div>
											<h3 className="font-semibold leading-snug">
												{item.company}
											</h3>
											<p className="text-sm text-muted">{item.role}</p>
											<p className="mt-1 font-mono text-xs text-faint">
												{item.period}
											</p>
										</div>
									</div>

									<div aria-hidden className="relative ml-6 h-2 sm:ml-0">
										<div className="absolute inset-x-0 top-1/2 h-px bg-line" />
										<div
											className={
												span.current
													? "draw-bar absolute top-0 h-2 rounded-sm bg-accent"
													: "draw-bar absolute top-0 h-2 rounded-sm bg-bar transition-colors group-hover:bg-faint"
											}
											style={{
												left: `${pct(span.start)}%`,
												width: `${pct(span.end) - pct(span.start)}%`,
											}}
										/>
										{span.current && (
											<span
												className="live-dot absolute right-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-accent"
											/>
										)}
									</div>
								</summary>

								<div className="max-w-2xl pb-7 pl-6 sm:ml-[19rem] sm:pl-0">
									<p className="leading-relaxed text-muted">{item.description}</p>

									{item.highlights && (
										// Child spans: what the role produced, hung off the parent bar.
										<ul className="mt-5 space-y-4 border-l border-line pl-5">
											{item.highlights.map((h) => (
												<li key={h.label} className="relative">
													<span
														aria-hidden
														className="absolute -left-5 top-[0.55rem] h-px w-3 bg-line"
													/>
													<p className="font-mono text-xs text-accent">{h.label}</p>
													<p className="mt-1 text-sm leading-relaxed text-muted">
														{h.detail}
													</p>
												</li>
											))}
										</ul>
									)}

									{item.customers && (
										<div className="mt-6">
											<p className="mono-label">Enterprise customers I worked with directly</p>
											<ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-sm text-ink">
												{item.customers.map((c, ci) => (
													<li key={c}>
														{c}
														{ci < item.customers!.length - 1 && (
															<span aria-hidden className="ml-3 text-faint">
																·
															</span>
														)}
													</li>
												))}
											</ul>
										</div>
									)}
								</div>
							</details>
						</li>
					);
				})}
			</ol>
			<p className="mt-5 font-mono text-xs text-faint">
				<a
					href="https://www.linkedin.com/in/nachogonzalezgarilleti/"
					target="_blank"
					rel="noopener noreferrer"
					className="transition-colors hover:text-accent"
				>
					Full history on LinkedIn <span aria-hidden>↗</span>
					<span className="sr-only">(opens in a new tab)</span>
				</a>
			</p>
		</InViewSection>
	);
}
