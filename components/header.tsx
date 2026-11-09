"use client";

import React from "react";
import Link from "next/link";
import clsx from "clsx";
import { links } from "@/lib/data";
import { useActiveSectionContext } from "@/context/active-section-context";
import ThemeSwitch from "./theme-switch";
import AccentSwitch from "./accent-switch";

export default function Header() {
	const { activeSection, setActiveSection, setTimeOfLastClick } =
		useActiveSectionContext();

	return (
		<header className="sticky top-0 z-50 border-b border-line bg-bg/85 backdrop-blur-md">
			<nav
				aria-label="Main"
				className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-4 sm:px-8"
			>
				<Link
					href="/#home"
					className="flex items-center gap-2 font-mono text-sm text-ink"
					onClick={() => {
						setActiveSection("Home");
						setTimeOfLastClick(Date.now());
					}}
				>
					<span aria-hidden className="h-2 w-2 rounded-full bg-accent" />
					garilleti.me
				</Link>

				<div className="flex items-center gap-1 sm:gap-3">
					<ul className="flex items-center font-mono text-xs uppercase tracking-[0.12em]">
						{links
							.filter((link) => link.name !== "Home")
							.map((link) => {
								const active = activeSection === link.name;
								return (
									// Phones skip the section links: the email button is on the first screen.
									<li key={link.hash} className="hidden sm:block">
										<Link
											href={`/${link.hash}`}
											aria-current={active ? "location" : undefined}
											className={clsx(
												"relative block px-2 py-2 transition-colors sm:px-3",
												active ? "text-ink" : "text-faint hover:text-ink"
											)}
											onClick={() => {
												setActiveSection(link.name);
												setTimeOfLastClick(Date.now());
											}}
										>
											{link.name}
											<span
												aria-hidden
												className={clsx(
													"absolute inset-x-2 -bottom-[13px] h-px bg-accent transition-opacity sm:inset-x-3",
													active ? "opacity-100" : "opacity-0"
												)}
											/>
										</Link>
									</li>
								);
							})}
					</ul>
					<AccentSwitch />
					<ThemeSwitch />
				</div>
			</nav>
		</header>
	);
}
