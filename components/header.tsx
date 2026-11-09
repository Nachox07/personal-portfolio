"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { links } from "@/lib/data";
import { useActiveSectionContext } from "@/context/active-section-context";
import ThemeSwitch from "./theme-switch";
import AccentSwitch from "./accent-switch";

export default function Header() {
	const { activeSection, setActiveSection, setTimeOfLastClick } =
		useActiveSectionContext();
	const [menuOpen, setMenuOpen] = useState(false);
	const menuButton = useRef<HTMLButtonElement>(null);
	const sections = links.filter((link) => link.name !== "Home");

	// The phone menu closes on Esc (focus back to its button) and on a tap outside the header.
	useEffect(() => {
		if (!menuOpen) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				setMenuOpen(false);
				menuButton.current?.focus();
			}
		};
		const onPointer = (e: PointerEvent) => {
			if (!(e.target as Element).closest("header")) setMenuOpen(false);
		};
		document.addEventListener("keydown", onKey);
		document.addEventListener("pointerdown", onPointer);
		return () => {
			document.removeEventListener("keydown", onKey);
			document.removeEventListener("pointerdown", onPointer);
		};
	}, [menuOpen]);

	return (
		<header className="sticky top-0 z-50 border-b border-line bg-bg/85 backdrop-blur-md">
			<nav
				aria-label="Main"
				className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-4 sm:px-8"
			>
				<Link
					href="/#home"
					className="font-mono text-sm font-medium tracking-tight text-ink transition-colors hover:text-accent"
					onClick={() => {
						setActiveSection("Home");
						setTimeOfLastClick(Date.now());
					}}
				>
					garilleti.me
				</Link>

				<div className="flex items-center gap-1 sm:gap-3">
					<ul className="flex items-center font-mono text-xs uppercase tracking-[0.12em]">
						{sections.map((link) => {
								const active = activeSection === link.name;
								return (
									// On phones the section links live in the menu below.
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
					<button
						ref={menuButton}
						type="button"
						aria-expanded={menuOpen}
						aria-controls="section-menu"
						aria-label={menuOpen ? "Close menu" : "Open menu"}
						onClick={() => setMenuOpen((open) => !open)}
						className="grid h-9 w-9 place-items-center rounded-md border border-line text-muted transition-colors hover:text-ink sm:hidden"
					>
						<span aria-hidden className="relative block h-3 w-4">
							<span className={clsx("menu-line top-0", menuOpen && "translate-y-[5px] rotate-45")} />
							<span className={clsx("menu-line top-[5px]", menuOpen && "opacity-0")} />
							<span className={clsx("menu-line top-[10px]", menuOpen && "-translate-y-[5px] -rotate-45")} />
						</span>
					</button>
				</div>
			</nav>
			<div
				id="section-menu"
				hidden={!menuOpen}
				className="menu-panel border-t border-line bg-bg/95 backdrop-blur-md sm:hidden"
			>
				<ul className="mx-auto max-w-5xl px-4 py-2">
					{sections.map((link, i) => (
						<li key={link.hash} style={{ "--i": i } as React.CSSProperties} className="menu-item">
							<Link
								href={`/${link.hash}`}
								aria-current={activeSection === link.name ? "location" : undefined}
								className={clsx(
									"flex min-h-[44px] items-center justify-between border-b border-line font-mono text-sm uppercase tracking-[0.12em] last:border-b-0",
									activeSection === link.name ? "text-accent" : "text-ink"
								)}
								onClick={() => {
									setActiveSection(link.name);
									setTimeOfLastClick(Date.now());
									setMenuOpen(false);
								}}
							>
								{link.name}
								<span aria-hidden className="text-faint">→</span>
							</Link>
						</li>
					))}
				</ul>
			</div>
		</header>
	);
}
