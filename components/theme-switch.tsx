"use client";

import { useTheme } from "@/context/theme-context";
import React from "react";
import { BsMoon, BsSun } from "react-icons/bs";

export default function ThemeSwitch() {
	const { toggleTheme } = useTheme();

	return (
		<button
			type="button"
			onClick={toggleTheme}
			aria-label="Toggle light and dark theme"
			title="Toggle light and dark theme"
			className="flex h-9 w-9 items-center justify-center rounded-md border border-line text-muted transition-colors hover:border-faint hover:text-ink"
		>
			<BsSun aria-hidden className="dark:hidden" />
			<BsMoon aria-hidden className="hidden dark:block" />
		</button>
	);
}
