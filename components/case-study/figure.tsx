import Image, { type StaticImageData } from "next/image";
import React from "react";

type FigureProps = {
	src: StaticImageData;
	alt: string;
	caption: string;
};

export default function Figure({ src, alt, caption }: FigureProps) {
	return (
		<figure className="mt-8">
			<div className="overflow-hidden rounded-md border border-line bg-surface">
				<Image src={src} alt={alt} sizes="(min-width: 768px) 42rem, 100vw" className="h-auto w-full" />
			</div>
			<figcaption className="mt-2 font-mono text-xs text-faint">{caption}</figcaption>
		</figure>
	);
}
