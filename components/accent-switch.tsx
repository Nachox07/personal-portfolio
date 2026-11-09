"use client";

import React, { useState } from "react";
import { ACCENT_KEY, accents, type Accent } from "@/lib/accents";

function currentAccent(): Accent {
	const a = document.documentElement.dataset.accent as Accent | undefined;
	return a && accents.includes(a) ? a : "teal";
}

// Picks another colour theme at random from the checked set and remembers it.
export default function AccentSwitch() {
	const [announce, setAnnounce] = useState("");

	const shuffle = () => {
		const now = currentAccent();
		const others = accents.filter((a) => a !== now);
		const next = others[Math.floor(Math.random() * others.length)];
		if (next === "teal") delete document.documentElement.dataset.accent;
		else document.documentElement.dataset.accent = next;
		try {
			localStorage.setItem(ACCENT_KEY, next);
		} catch {}
		setAnnounce(`Colour theme: ${next}`);
	};

	return (
		<>
			<button
				type="button"
				onClick={shuffle}
				aria-label="Shuffle colour theme"
				title="Shuffle colour theme"
				className="group grid h-9 w-9 place-items-center rounded-md border border-line transition-colors hover:border-accent"
			>
				{/* Three overlapping circles in the current theme; they turn a little on hover. */}
				<svg
					aria-hidden
					width="16"
					height="16"
					viewBox="0 0 16 16"
					className="transition-transform duration-300 group-hover:rotate-[120deg] group-active:scale-90 motion-reduce:transition-none"
				>
					<circle cx="5.5" cy="6" r="3.6" className="fill-accent" />
					<circle cx="10.5" cy="6" r="3.6" className="fill-accent/50" />
					<circle cx="8" cy="10.4" r="3.6" className="fill-accent/20" />
				</svg>
			</button>
			<span role="status" aria-live="polite" className="sr-only">
				{announce}
			</span>
		</>
	);
}
