"use client";

import Image, { type StaticImageData } from "next/image";
import React, { useState } from "react";
import Lightbox from "./lightbox";

type FigureProps = {
	src: StaticImageData;
	alt: string;
	caption: string;
};

// One image with a caption; click to see it full size.
export default function Figure({ src, alt, caption }: FigureProps) {
	const [open, setOpen] = useState<number | null>(null);

	return (
		<figure data-reveal className="mt-8">
			<button
				type="button"
				onClick={() => setOpen(0)}
				aria-label={`Open image: ${alt}`}
				className="block w-full cursor-zoom-in overflow-hidden rounded-md border border-line bg-surface"
			>
				<Image src={src} alt={alt} sizes="(min-width: 768px) 42rem, 100vw" className="h-auto w-full" />
			</button>
			<figcaption className="mt-2 font-mono text-xs text-faint">{caption}</figcaption>
			<Lightbox items={[{ src, alt, caption }]} index={open} onIndexChange={setOpen} />
		</figure>
	);
}
