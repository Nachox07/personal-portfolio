import React from "react";
import InViewSection from "./in-view-section";
import { contact } from "@/lib/data";

export default function Footer() {
	return (
		<footer className="border-t border-line">
			<InViewSection
				name="Contact"
				id="contact"
				labelledBy="contact-title"
				className="mx-auto max-w-5xl scroll-mt-20 px-4 py-16 sm:px-8 sm:py-20"
			>
				<p className="font-mono text-xs text-accent" aria-hidden>
					03
				</p>
				<h2
					id="contact-title"
					className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"
				>
					Let&apos;s talk.
				</h2>
				<p className="mt-4 max-w-xl leading-relaxed text-muted">{contact.pitch}</p>
				<div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-sm">
					<a
						href={`mailto:${contact.email}`}
						className="text-ink underline decoration-accent decoration-2 underline-offset-4 hover:text-accent"
					>
						{contact.email}
					</a>
					<a
						href={contact.linkedin}
						target="_blank"
						rel="noopener noreferrer"
						className="text-muted hover:text-ink"
					>
						LinkedIn <span aria-hidden>↗</span>
						<span className="sr-only">(opens in a new tab)</span>
					</a>
				</div>
			</InViewSection>
			<div className="border-t border-line">
				<div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-6 font-mono text-xs text-faint sm:flex-row sm:justify-between sm:px-8">
					<small className="text-xs">
						&copy; {new Date().getFullYear()} Nacho González-Garilleti. All rights
						reserved.
					</small>
					<p>
						Built with React & Next.js, TypeScript, Tailwind CSS, Vercel hosting.
					</p>
				</div>
			</div>
		</footer>
	);
}
