"use client";

import React, { useState } from "react";

// Copies the address for people whose mail client isn't set up for mailto links.
export default function CopyEmail({ email }: { email: string }) {
	const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");

	const copy = async () => {
		try {
			await navigator.clipboard.writeText(email);
			setStatus("copied");
		} catch {
			setStatus("failed");
		}
		window.setTimeout(() => setStatus("idle"), 2000);
	};

	return (
		<button
			type="button"
			onClick={copy}
			className="font-mono text-sm text-muted hover:text-ink"
		>
			<span aria-live="polite">
				{status === "copied" ? "Copied ✓" : status === "failed" ? "Copy failed" : "Copy email"}
			</span>
		</button>
	);
}
