import Image, { type StaticImageData } from "next/image";
import React from "react";

type Item = { src: StaticImageData; alt: string; caption: string };

// A row of small images with a mono caption under each.
export default function Gallery({ items, caption }: { items: Item[]; caption?: string }) {
	return (
		<figure className="mt-8">
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
				{items.map((item) => (
					<div key={item.alt}>
						<div className="overflow-hidden rounded-md border border-line bg-surface">
							<Image src={item.src} alt={item.alt} sizes="(min-width: 640px) 14rem, 100vw" className="h-auto w-full" />
						</div>
						<p className="mt-2 font-mono text-xs leading-relaxed text-faint">{item.caption}</p>
					</div>
				))}
			</div>
			{caption && <figcaption className="mt-3 font-mono text-xs text-faint">{caption}</figcaption>}
		</figure>
	);
}
