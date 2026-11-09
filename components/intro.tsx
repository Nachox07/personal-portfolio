"use client";

import { useEffect, useRef, type PointerEvent } from "react";
import Image from "next/image";
import { BsLinkedin } from "react-icons/bs";
import { FaGithub, FaTwitter } from "react-icons/fa";
import { useSectionInView } from "@/lib/hooks";
import { contact, experienceData } from "@/lib/data";
import nachoWebp from "@/public/nacho.webp";

const socials = [
	{
		label: "LinkedIn",
		href: contact.linkedin,
		icon: BsLinkedin,
	},
	{ label: "GitHub", href: "https://github.com/Nachox07/", icon: FaGithub },
	{ label: "X", href: "https://twitter.com/nachox07", icon: FaTwitter },
];

export default function Intro() {
	const { ref } = useSectionInView("Home", 0.5);
	const current = experienceData[0];
	const gridRef = useRef<HTMLDivElement>(null);
	const cellRef = useRef<HTMLDivElement>(null);
	const finePointer = useRef(false);
	const frame = useRef(0);

	useEffect(() => {
		finePointer.current = window.matchMedia(
			"(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)"
		).matches;
		return () => cancelAnimationFrame(frame.current);
	}, []);

	// Light the grid cell under the pointer, snapped to the 22px dot grid.
	const onPointerMove = (e: PointerEvent<HTMLElement>) => {
		if (!finePointer.current || !gridRef.current || !cellRef.current) return;
		const { clientX, clientY } = e;
		cancelAnimationFrame(frame.current);
		frame.current = requestAnimationFrame(() => {
			const grid = gridRef.current!.getBoundingClientRect();
			const cell = cellRef.current!;
			const x = Math.floor((clientX - grid.left) / 22) * 22;
			const y = Math.floor((clientY - grid.top) / 22) * 22;
			cell.style.setProperty("--x", `${x}px`);
			cell.style.setProperty("--y", `${y}px`);
			cell.style.opacity = "1";
		});
	};

	const onPointerLeave = () => {
		cancelAnimationFrame(frame.current);
		if (cellRef.current) cellRef.current.style.opacity = "0";
	};

	return (
		<section
			ref={ref}
			id="home"
			aria-label="Introduction"
			className="relative scroll-mt-[100rem] pb-24 pt-8 sm:pb-32 sm:pt-24"
			onPointerMove={onPointerMove}
			onPointerLeave={onPointerLeave}
		>
			<div
				ref={gridRef}
				aria-hidden
				className="pointer-events-none absolute left-1/2 top-0 -z-10 h-full w-screen -translate-x-1/2 overflow-hidden"
			>
				<div className="trace-grid absolute inset-0" />
				<div
					ref={cellRef}
					className="grid-cell absolute left-0 top-0 h-[22px] w-[22px] rounded-[3px] bg-accent/15 opacity-0 ring-1 ring-accent/40"
				/>
			</div>

			<p className="rise mono-label flex flex-wrap items-center gap-x-2 gap-y-1 normal-case tracking-normal">
				<span className="live-dot h-2 w-2 rounded-full bg-accent" aria-hidden />
				<span className="text-ink">{current.role}</span>
				<span aria-hidden>·</span>
				<span>{current.company}</span>
				<span aria-hidden>·</span>
				<span>{current.period}</span>
			</p>

			<div className="mt-6 flex flex-col-reverse gap-6 sm:mt-8 sm:flex-row sm:gap-8 sm:items-end sm:justify-between">
				<h1
					className="text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.035em] sm:text-7xl"
				>
					Nacho
					<br />
					González-Garilleti
				</h1>
				<div className="portrait h-24 w-24 shrink-0 overflow-hidden rounded-md border border-line sm:h-28 sm:w-28">
					<Image
						src={nachoWebp}
						alt="Portrait of Nacho González-Garilleti"
						width={112}
						height={112}
						quality={90}
						priority
						className="h-full w-full object-cover"
					/>
				</div>
			</div>

			<div
				className="rise mt-10 grid gap-6 sm:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] sm:gap-12"
				style={{ animationDelay: "120ms" }}
			>
				<p className="text-xl font-medium leading-snug tracking-tight sm:text-2xl">
					Software engineer, 9 years in production. I build AI agents that retrieve information and
					call tools,{" "}
					<span className="text-accent">with a person approving every change.</span>
				</p>
				<div className="space-y-4 text-base leading-relaxed text-muted">
					<p>
						Technical lead at OpenVPN, with 10 engineers across development, QA and DevOps.
					</p>
					<p>
						Before that I led AI Copilot and Live Agent at Cognigy (acquired by NICE), a
						cross-functional team of 7 building for enterprise contact centres.
					</p>
				</div>
			</div>

			<div
				className="rise mt-10 flex flex-col gap-4 border-l-2 border-accent pl-4 sm:flex-row sm:items-center sm:justify-between sm:gap-8"
				style={{ animationDelay: "160ms" }}
			>
				<p className="max-w-xl text-sm leading-relaxed text-ink">{contact.pitch}</p>
				<a
					href={`mailto:${contact.email}`}
					className="inline-flex shrink-0 items-center gap-2 self-start rounded-md bg-ink px-4 py-2.5 font-mono text-xs text-bg transition-opacity hover:opacity-85 sm:self-auto"
				>
					{contact.email}
					<span aria-hidden>→</span>
				</a>
			</div>

			<ul
				className="rise mt-6 flex flex-wrap gap-2"
				style={{ animationDelay: "180ms" }}
			>
				{socials.map(({ label, href, icon: Icon }) => (
					<li key={label}>
						<a
							href={href}
							target="_blank"
							rel="noopener noreferrer"
							className="group inline-flex items-center gap-2 rounded-md border border-line bg-surface px-3 py-2 font-mono text-xs text-muted transition-colors hover:border-accent hover:text-ink"
						>
							<Icon aria-hidden className="text-sm" />
							{label}
							<span
								aria-hidden
								className="text-faint transition-transform group-hover:-translate-y-px group-hover:translate-x-px group-hover:text-accent"
							>
								↗
							</span>
							<span className="sr-only">(opens in a new tab)</span>
						</a>
					</li>
				))}
			</ul>
		</section>
	);
}
