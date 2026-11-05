"use client";

import React, { useState } from "react";
import { ACCENT_KEY, accents, type Accent } from "@/lib/accents";

function currentAccent(): Accent {
	const a = document.documentElement.dataset.accent as Accent | undefined;
	return a && accents.includes(a) ? a : "teal";
}

// Picks another accent at random from the checked set and remembers it.
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
		setAnnounce(`Accent colour: ${next}`);
	};

	return (
		<>
			<button
				type="button"
				onClick={shuffle}
				aria-label="Shuffle accent colour"
				title="Shuffle accent colour"
				className="group flex h-9 w-9 items-center justify-center rounded-md border border-line transition-colors hover:border-faint"
			>
				<span
					aria-hidden
					className="h-3 w-3 rounded-full bg-accent transition-transform group-hover:scale-125 group-active:rotate-90 motion-reduce:transition-none"
				/>
			</button>
			<span role="status" aria-live="polite" className="sr-only">
				{announce}
			</span>
		</>
	);
}
