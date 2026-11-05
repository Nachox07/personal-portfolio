"use client";

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

	return (
		<section
			ref={ref}
			id="home"
			aria-label="Introduction"
			className="relative scroll-mt-[100rem] pb-24 pt-16 sm:pb-32 sm:pt-24"
		>
			<div
				aria-hidden
				className="trace-grid pointer-events-none absolute left-1/2 w-screen -translate-x-1/2 top-0 -z-10 h-full"
			/>

			<p className="rise mono-label flex flex-wrap items-center gap-x-2 gap-y-1 normal-case tracking-normal">
				<span className="live-dot h-2 w-2 rounded-full bg-accent" aria-hidden />
				<span className="text-ink">{current.role}</span>
				<span aria-hidden>·</span>
				<span>{current.company}</span>
				<span aria-hidden>·</span>
				<span>{current.period}</span>
			</p>

			<div className="mt-8 flex flex-col-reverse gap-8 sm:flex-row sm:items-end sm:justify-between">
				<h1
					className="rise text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.035em] sm:text-7xl"
					style={{ animationDelay: "60ms" }}
				>
					Nacho
					<br />
					González-Garilleti
				</h1>
				<Image
					src={nachoWebp}
					alt="Portrait of Nacho González-Garilleti"
					width={112}
					height={112}
					quality={90}
					priority
					className="rise h-24 w-24 shrink-0 rounded-md border border-line object-cover sm:h-28 sm:w-28"
				/>
			</div>

			<div
				className="rise mt-10 grid gap-6 sm:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] sm:gap-12"
				style={{ animationDelay: "120ms" }}
			>
				<p className="text-xl font-medium leading-snug tracking-tight sm:text-2xl">
					Software engineer, 9 years in production. I build AI agents that are{" "}
					<span className="text-accent">allowed to act on real systems.</span>
				</p>
				<div className="space-y-4 text-base leading-relaxed text-muted">
					<p>
						Currently technical lead at OpenVPN, with 10 engineers across
						development, QA and DevOps, after leading a cross-functional team of
						7 at Cognigy.
					</p>
					<p>I like automating things, at work and at home.</p>
					<p className="font-mono text-sm text-faint">
						&quot;Success is not assured, failures either.&quot;
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
