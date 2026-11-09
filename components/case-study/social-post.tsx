import Image, { type StaticImageData } from "next/image";
import React from "react";

type SocialPostProps = {
	href: string;
	thumbnail: StaticImageData;
	alt: string;
	date: string;
	text: string;
	cta: string;
};

// A link card for a social post. A still and a link, not the platform's embed script,
// so the page loads no third-party code and sets no cookies.
export default function SocialPost({ href, thumbnail, alt, date, text, cta }: SocialPostProps) {
	return (
		<figure data-reveal className="mt-8">
			<a
				href={href}
				target="_blank"
				rel="noopener noreferrer"
				className="group flex items-stretch gap-4 overflow-hidden rounded-md border border-line bg-surface p-3 transition-colors hover:border-accent focus-visible:border-accent"
			>
				<Image src={thumbnail} alt={alt} sizes="7rem" className="h-auto w-24 shrink-0 rounded sm:w-28" />
				<span className="flex min-w-0 flex-col justify-center gap-2">
					<span className="font-mono text-xs text-faint">{date}</span>
					<span className="text-sm text-ink">{text}</span>
					<span className="font-mono text-xs text-accent group-hover:underline">
						{cta} <span aria-hidden>↗</span>
					</span>
				</span>
			</a>
		</figure>
	);
}
