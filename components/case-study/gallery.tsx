"use client";

import Image from "next/image";
import React, { useState } from "react";
import Lightbox, { type LightboxItem } from "./lightbox";

type Item = LightboxItem & { caption: string };

// A row of small images with a mono caption under each. Each opens the viewer.
export default function Gallery({ items, caption }: { items: Item[]; caption?: string }) {
	const [open, setOpen] = useState<number | null>(null);

	return (
		<figure data-reveal className="mt-8">
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
				{items.map((item, i) => (
					<div key={item.alt}>
						<button
							type="button"
							onClick={() => setOpen(i)}
							aria-label={`Open image: ${item.alt}`}
							className="group block w-full cursor-zoom-in overflow-hidden rounded-md border border-line bg-surface"
						>
							<Image
								src={item.src}
								alt={item.alt}
								sizes="(min-width: 640px) 14rem, 100vw"
								className="h-auto w-full transition-transform duration-300 group-hover:scale-[1.03] motion-reduce:transition-none"
							/>
						</button>
						<p className="mt-2 font-mono text-xs leading-relaxed text-faint">{item.caption}</p>
					</div>
				))}
			</div>
			{caption && <figcaption className="mt-3 font-mono text-xs text-faint">{caption}</figcaption>}
			<Lightbox items={items} index={open} onIndexChange={setOpen} />
		</figure>
	);
}
