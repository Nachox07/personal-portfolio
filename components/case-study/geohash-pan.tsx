import React from "react";

// Explains the map cache: the same grid of geohash cells before and after a pan.
// Cells already fetched in the last 45 seconds are reused; only the new column is requested.
const COLS = 6;
const ROWS = 4;
const CELL = 44;
const PAD = 8;
const W = COLS * CELL + PAD * 2;
const H = ROWS * CELL + PAD * 2;

type State = "empty" | "fetched" | "cached";

function Grid({
	title,
	view,
	state,
}: {
	title: string;
	view: { col: number; row: number; cols: number; rows: number };
	state: (col: number, row: number) => State;
}) {
	const cells = [];
	for (let r = 0; r < ROWS; r++) {
		for (let c = 0; c < COLS; c++) {
			const s = state(c, r);
			cells.push(
				<rect
					key={`${c}-${r}`}
					x={PAD + c * CELL + 2}
					y={PAD + r * CELL + 2}
					width={CELL - 4}
					height={CELL - 4}
					rx={4}
					className={
						s === "fetched"
							? "fill-accent/70"
							: s === "cached"
								? "fill-accent/20 stroke-accent"
								: "fill-transparent stroke-line"
					}
					strokeWidth={s === "cached" ? 1.5 : 1}
					strokeDasharray={s === "cached" ? "4 3" : undefined}
				/>
			);
		}
	}
	return (
		<div className="min-w-0">
			<p className="mb-2 font-mono text-xs text-ink">{title}</p>
			<svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" aria-hidden>
				{cells}
				<rect
					x={PAD + view.col * CELL - 3}
					y={PAD + view.row * CELL - 3}
					width={view.cols * CELL + 6}
					height={view.rows * CELL + 6}
					rx={6}
					className="fill-transparent stroke-ink"
					strokeWidth={2.5}
				/>
			</svg>
		</div>
	);
}

export default function GeohashPan() {
	const inView1 = (c: number, r: number) => c >= 1 && c <= 3 && r >= 1 && r <= 2;
	const inView2 = (c: number, r: number) => c >= 2 && c <= 4 && r >= 1 && r <= 2;

	return (
		<figure data-reveal className="mt-8 rounded-md border border-line bg-surface p-4 sm:p-5">
			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
				<Grid
					title="1. Open the map: 6 cells fetched"
					view={{ col: 1, row: 1, cols: 3, rows: 2 }}
					state={(c, r) => (inView1(c, r) ? "fetched" : "empty")}
				/>
				<Grid
					title="2. Pan right: 2 fetched, 4 reused"
					view={{ col: 2, row: 1, cols: 3, rows: 2 }}
					state={(c, r) =>
						inView2(c, r) && inView1(c, r) ? "cached" : inView2(c, r) ? "fetched" : "empty"
					}
				/>
			</div>
			<figcaption className="mt-4 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-faint">
				<span>The bold frame is the screen; each square is a geohash cell.</span>
				<span className="flex items-center gap-1.5">
					<span aria-hidden className="h-3 w-3 rounded-sm bg-accent/70" /> requested now
				</span>
				<span className="flex items-center gap-1.5">
					<span aria-hidden className="h-3 w-3 rounded-sm border border-dashed border-accent bg-accent/20" /> reused from
					cache
				</span>
			</figcaption>
			<p className="sr-only">
				Opening the map over three by two cells requests all six. Panning one column to the right
				within 45 seconds reuses the four cells already loaded and requests only the two new ones.
			</p>
		</figure>
	);
}
