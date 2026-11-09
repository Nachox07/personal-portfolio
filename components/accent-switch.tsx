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
				className="group flex h-9 items-center gap-2 rounded-md border border-line px-2.5 font-mono text-xs uppercase tracking-[0.08em] text-muted transition-colors hover:border-accent hover:text-ink"
			>
				<span
					aria-hidden
					className="h-2.5 w-2.5 rounded-full bg-accent transition-transform group-hover:scale-125 group-active:scale-90 motion-reduce:transition-none"
				/>
				{/* The word drops on the narrowest phones so the menu button fits. */}
				<span className="hidden min-[380px]:inline">Shuffle</span>
			</button>
			<span role="status" aria-live="polite" className="sr-only">
				{announce}
			</span>
		</>
	);
}
