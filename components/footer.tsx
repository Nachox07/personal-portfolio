import React from "react";

export default function Footer() {
	return (
		<footer className="border-t border-line">
			<div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-8 font-mono text-xs text-faint sm:flex-row sm:justify-between sm:px-8">
				<small className="text-xs">
					&copy; {new Date().getFullYear()} Nacho González-Garilleti. All rights
					reserved.
				</small>
				<p>
					Built with React & Next.js, TypeScript, Tailwind CSS, Vercel hosting.
				</p>
			</div>
		</footer>
	);
}
