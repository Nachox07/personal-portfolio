import React from "react";

type Span = { name: string; detail: string; start: number; width: number; kind?: "model" | "code" | "person" | "network" };

// A pipeline drawn as a trace waterfall: each step is a span offset in time.
// start and width are percentages of the row, for shape only, not measured durations.
const LEGEND: [NonNullable<Span["kind"]>, string, string][] = [
	["model", "model", "h-2 w-3 rounded-sm bg-accent"],
	["network", "network", "h-2 w-3 rounded-sm bg-accent"],
	["code", "code", "h-2 w-3 rounded-sm bg-bar"],
	["person", "person", "h-2 w-3 rounded-sm border border-dashed border-accent"],
];

export default function Trace({ spans, caption }: { spans: Span[]; caption: string }) {
	// Only show legend entries for the kinds this trace uses.
	const used = new Set(spans.map((s) => s.kind ?? "code"));
	const legend = LEGEND.filter(([kind]) => used.has(kind));
	return (
		<figure className="mt-8 rounded-md border border-line bg-surface p-4 sm:p-5">
			<ol className="space-y-3">
				{spans.map((s) => (
					<li key={s.name} className="grid grid-cols-1 gap-1 sm:grid-cols-[11rem_1fr] sm:items-center sm:gap-4">
						<div>
							<p className="font-mono text-xs text-ink">{s.name}</p>
							<p className="text-xs leading-snug text-faint">{s.detail}</p>
						</div>
						<div aria-hidden className="relative h-2">
							<div className="absolute inset-x-0 top-1/2 h-px bg-line" />
							<div
								className={
									s.kind === "model" || s.kind === "network"
										? "absolute top-0 h-2 rounded-sm bg-accent"
										: s.kind === "person"
											? "absolute top-0 h-2 rounded-sm border border-dashed border-accent"
											: "absolute top-0 h-2 rounded-sm bg-bar"
								}
								style={{ left: `${s.start}%`, width: `${s.width}%` }}
							/>
						</div>
					</li>
				))}
			</ol>
			<figcaption className="mt-4 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-faint">
				<span>{caption}</span>
				{legend.map(([kind, label, swatch]) => (
					<span key={kind} className="flex items-center gap-1.5">
						<span aria-hidden className={swatch} /> {label}
					</span>
				))}
			</figcaption>
		</figure>
	);
}
