import React from "react";

// A question for the owner, left in a draft where only he can supply the fact.
// tests/case-studies.spec.ts fails if a page marked "ready" still contains one.
export default function Ask({ children }: { children: React.ReactNode }) {
	return (
		<aside className="mt-6 rounded-md border border-dashed border-accent px-4 py-3 text-sm text-ink">
			<span className="mr-2 font-mono text-xs uppercase tracking-[0.1em] text-accent">
				Question for Nacho
			</span>
			{children}
		</aside>
	);
}
