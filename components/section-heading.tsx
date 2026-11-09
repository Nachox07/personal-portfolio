import React from "react";

type SectionHeadingProps = {
	index: string;
	id: string;
	children: React.ReactNode;
};

// A section opens like a span in a trace: a mono index, a name, a rule.
export default function SectionHeading({
	index,
	id,
	children,
}: SectionHeadingProps) {
	return (
		<div className="mb-10 flex items-baseline gap-4">
			<span className="font-mono text-xs text-accent" aria-hidden>
				{index}
			</span>
			<h2 id={id} className="text-2xl font-semibold tracking-tight sm:text-3xl">
				{children}
			</h2>
			<span aria-hidden className="relative h-px flex-1 -translate-y-[0.35rem]">
				<span data-reveal="rule" className="absolute inset-0 bg-line" />
			</span>
		</div>
	);
}
