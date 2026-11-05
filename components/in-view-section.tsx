"use client";

import React from "react";
import { useSectionInView } from "@/lib/hooks";
import type { SectionName } from "@/lib/types";

type InViewSectionProps = {
	name: SectionName;
	id: string;
	labelledBy: string;
	className?: string;
	children: React.ReactNode;
};

// Marks the nav link active while this section is on screen.
export default function InViewSection({
	name,
	id,
	labelledBy,
	className,
	children,
}: InViewSectionProps) {
	const { ref } = useSectionInView(name, 0.25);

	return (
		<section ref={ref} id={id} aria-labelledby={labelledBy} className={className}>
			{children}
		</section>
	);
}
