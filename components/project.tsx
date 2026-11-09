import Image from "next/image";
import clsx from "clsx";
import Link from "next/link";
import { projectsData } from "@/lib/data";
import { isPublished } from "@/lib/case-studies";

type ProjectProps = (typeof projectsData)[number] & { index: number };

export default function Project({
	index,
	title,
	description,
	tags,
	imageUrl,
	url,
	discontinued,
	caseStudy,
}: ProjectProps) {
	const study = caseStudy && isPublished(caseStudy) ? `/projects/${caseStudy}` : null;
	const linked = Boolean(study || url);

	return (
		<li
			data-reveal
			className={clsx(
				"group relative grid grid-cols-1 gap-x-8 gap-y-3 border-b border-line py-7 sm:grid-cols-[3rem_1fr_13rem]",
				linked && "transition-colors hover:bg-surface"
			)}
		>
			<span aria-hidden className="hidden font-mono text-xs text-faint sm:block sm:pl-2 sm:pt-1.5">
				{String(index + 1).padStart(2, "0")}
			</span>

			<div className="min-w-0">
				<h3 className="flex flex-wrap items-center gap-x-3 gap-y-1 text-lg font-semibold tracking-tight">
					{study ? (
						// The whole row opens the case study; the external link sits above it.
						<Link
							href={study}
							className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none group-focus-within:underline group-hover:text-accent"
						>
							{title}
						</Link>
					) : url ? (
						<a
							href={url}
							target="_blank"
							rel="noopener noreferrer"
							className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none group-focus-within:underline group-hover:text-accent"
						>
							{title}
							<span aria-hidden className="ml-1 font-mono text-sm text-faint group-hover:text-accent">
								↗
							</span>
							<span className="sr-only"> (opens in a new tab)</span>
						</a>
					) : (
						title
					)}
					{discontinued && (
						<span className="rounded-sm border border-line px-1.5 py-0.5 font-mono text-[0.68rem] font-normal uppercase tracking-[0.1em] text-faint">
							Discontinued
						</span>
					)}
				</h3>
				<p className="mt-2 max-w-xl leading-relaxed text-muted">{description}</p>
				<ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-faint">
					{tags.map((tag) => (
						<li key={tag}>{tag}</li>
					))}
				</ul>
				{study && (
					<p className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1 font-mono text-xs">
						<span className="text-accent">
							Read the case study <span aria-hidden>→</span>
						</span>
						{url && (
							<a
								href={url}
								target="_blank"
								rel="noopener noreferrer"
								className="relative z-10 text-faint hover:text-ink"
							>
								{url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/?\?.*$/, "")} <span aria-hidden>↗</span>
								<span className="sr-only"> (opens in a new tab)</span>
							</a>
						)}
					</p>
				)}
			</div>

			<div className="relative hidden aspect-[16/10] overflow-hidden rounded-md border border-line bg-surface sm:block">
				<Image
					src={imageUrl}
					alt={`Screenshot of ${title}`}
					fill
					sizes="13rem"
					quality={80}
					className={clsx(
						"object-cover object-top transition duration-300 group-hover:scale-[1.03]",
						discontinued
							? "opacity-60 grayscale group-hover:opacity-100 group-hover:grayscale-0"
							: "opacity-90 group-hover:opacity-100"
					)}
				/>
			</div>
		</li>
	);
}
