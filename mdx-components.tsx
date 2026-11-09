import type { MDXComponents } from "mdx/types";
import React from "react";

// Article typography, in the same voice as the rest of the site:
// Inter for prose, JetBrains Mono for labels, one accent.
const components: MDXComponents = {
	h2: ({ children }) => (
		<h2 className="mt-14 flex items-center gap-3 text-2xl font-semibold tracking-tight">
			<span aria-hidden className="h-0.5 w-4 shrink-0 bg-accent" />
			{children}
		</h2>
	),
	h3: ({ children }) => (
		<h3 className="mt-8 text-lg font-semibold tracking-tight">{children}</h3>
	),
	p: ({ children }) => <p className="mt-4 leading-relaxed text-muted">{children}</p>,
	ul: ({ children }) => (
		<ul className="mt-4 list-disc space-y-3 pl-5 text-muted marker:text-accent">{children}</ul>
	),
	ol: ({ children }) => (
		<ol className="mt-4 list-decimal space-y-2 pl-5 text-muted marker:font-mono marker:text-xs marker:text-faint">
			{children}
		</ol>
	),
	li: ({ children }) => <li className="leading-relaxed">{children}</li>,
	a: ({ href, children }) => {
		const external = href?.startsWith("http");
		return (
			<a
				href={href}
				{...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
				className="text-ink underline decoration-accent decoration-1 underline-offset-4 hover:text-accent"
			>
				{children}
			</a>
		);
	},
	strong: ({ children }) => <strong className="font-semibold text-ink">{children}</strong>,
	code: ({ children }) => (
		<code className="rounded-sm bg-surface px-1 py-0.5 font-mono text-[0.85em] text-ink">
			{children}
		</code>
	),
	blockquote: ({ children }) => (
		<blockquote className="mt-6 border-l-2 border-accent pl-4 text-ink">{children}</blockquote>
	),
	table: ({ children }) => (
		<div className="mt-6 overflow-x-auto">
			<table className="w-full border-collapse text-left text-sm">{children}</table>
		</div>
	),
	th: ({ children }) => (
		<th className="border-b border-line py-2 pr-4 font-mono text-xs font-normal uppercase tracking-[0.08em] text-faint">
			{children}
		</th>
	),
	td: ({ children }) => <td className="border-b border-line py-2 pr-4 text-muted">{children}</td>,
};

export function useMDXComponents(): MDXComponents {
	return components;
}
