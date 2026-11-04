const MONTHS = [
	"jan", "feb", "mar", "apr", "may", "jun",
	"jul", "aug", "sep", "oct", "nov", "dec",
];

// "Nov 2025" -> months since year 0. Returns null for "Present" or anything unparseable.
function toMonth(text: string): number | null {
	const [mon, year] = text.trim().toLowerCase().split(/\s+/);
	const m = MONTHS.indexOf(mon?.slice(0, 3) ?? "");
	const y = Number(year);
	if (m < 0 || !Number.isFinite(y)) return null;
	return y * 12 + m;
}

export type Span = {
	start: number;
	end: number;
	current: boolean;
};

// Parses a period such as "Sep 2021 — Oct 2025" or "Nov 2025 — Present".
export function parsePeriod(period: string, now: Date): Span {
	const [from, to = ""] = period.split(/\s+[—–-]\s+/);
	const nowMonth = now.getFullYear() * 12 + now.getMonth();
	const start = toMonth(from) ?? nowMonth;
	const parsedEnd = toMonth(to);
	return {
		start,
		// +1 so a role that ends in a month still covers that month.
		end: (parsedEnd ?? nowMonth) + 1,
		current: parsedEnd === null,
	};
}
