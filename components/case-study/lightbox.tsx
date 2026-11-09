"use client";

import Image, { type StaticImageData } from "next/image";
import React, { useCallback, useEffect, useRef } from "react";

export type LightboxItem = { src: StaticImageData; alt: string; caption?: string };

type LightboxProps = {
	items: LightboxItem[];
	// Index of the open image, or null when closed.
	index: number | null;
	onIndexChange: (index: number | null) => void;
};

// Full-screen viewer on a native <dialog>: the browser traps focus, Esc closes it,
// and focus returns to the image that opened it. ← and → move between images,
// and a horizontal swipe does the same on touch screens.
export default function Lightbox({ items, index, onIndexChange }: LightboxProps) {
	const dialogRef = useRef<HTMLDialogElement>(null);
	const touchX = useRef<number | null>(null);
	const open = index !== null;
	const many = items.length > 1;

	const go = useCallback(
		(step: number) => {
			if (index === null) return;
			onIndexChange((index + step + items.length) % items.length);
		},
		[index, items.length, onIndexChange]
	);

	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) return;
		if (open && !dialog.open) dialog.showModal();
		if (!open && dialog.open) dialog.close();
	}, [open]);

	const onKeyDown = (e: React.KeyboardEvent) => {
		if (!many) return;
		if (e.key === "ArrowRight") {
			e.preventDefault();
			go(1);
		} else if (e.key === "ArrowLeft") {
			e.preventDefault();
			go(-1);
		}
	};

	const item = index !== null ? items[index] : null;

	return (
		<dialog
			ref={dialogRef}
			aria-label={item ? `Image ${index! + 1} of ${items.length}: ${item.alt}` : "Image viewer"}
			onClose={() => onIndexChange(null)}
			onKeyDown={onKeyDown}
			onClick={(e) => {
				// A click on the backdrop (the dialog itself, not its content) closes it.
				if (e.target === e.currentTarget) onIndexChange(null);
			}}
			onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
			onTouchEnd={(e) => {
				if (touchX.current === null || !many) return;
				const dx = e.changedTouches[0].clientX - touchX.current;
				touchX.current = null;
				if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
			}}
			className="m-0 h-full max-h-none w-full max-w-none bg-transparent p-0 text-ink backdrop:bg-black/85"
		>
			{item && (
				<div className="flex h-full w-full flex-col items-center justify-center gap-4 p-4 sm:p-10">
					<div className="flex w-full max-w-6xl items-center justify-between font-mono text-xs text-white/80">
						<span aria-hidden>{many ? `${index! + 1} / ${items.length}` : ""}</span>
						<button
							type="button"
							onClick={() => onIndexChange(null)}
							aria-label="Close image viewer"
							className="rounded-md border border-white/30 px-3 py-1.5 uppercase tracking-[0.12em] hover:border-white"
						>
							Close · Esc
						</button>
					</div>

					<div className="relative flex min-h-0 w-full max-w-6xl flex-1 items-center justify-center">
						<Image
							key={index}
							src={item.src}
							alt={item.alt}
							sizes="100vw"
							className="max-h-full w-auto max-w-full rounded-md object-contain"
						/>
						{many && (
							<>
								<button
									type="button"
									onClick={() => go(-1)}
									aria-label="Previous image"
									className="absolute left-0 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/50 text-lg text-white hover:border-white sm:-left-2"
								>
									←
								</button>
								<button
									type="button"
									onClick={() => go(1)}
									aria-label="Next image"
									className="absolute right-0 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/50 text-lg text-white hover:border-white sm:-right-2"
								>
									→
								</button>
							</>
						)}
					</div>

					{item.caption && (
						<p className="max-w-2xl text-center font-mono text-xs leading-relaxed text-white/80" aria-live="polite">
							{item.caption}
						</p>
					)}
				</div>
			)}
		</dialog>
	);
}
