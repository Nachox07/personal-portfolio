import { ImageResponse } from "next/og";

// The image LinkedIn, Slack and X show when someone shares a link. Same palette
// as the site's dark theme; 1200×630 is the size those previews expect.
export const shareSize = { width: 1200, height: 630 };

const bg = "rgb(11 15 16)";
const ink = "rgb(232 236 235)";
const muted = "rgb(176 186 184)";
const faint = "rgb(132 145 143)";
const line = "rgb(36 45 47)";
const accent = "rgb(94 234 212)";

type Card = {
	label: string;
	title: string;
	lead: string;
	claim?: string;
	context?: string;
	facts?: readonly string[];
};

export function shareImage({ label, title, lead, claim, context, facts = [] }: Card) {
	return new ImageResponse(
		(
			<div
				style={{
					width: "100%",
					height: "100%",
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
					padding: "64px 72px",
					background: bg,
					color: ink,
					borderTop: `10px solid ${accent}`,
				}}
			>
				<div style={{ display: "flex", flexDirection: "column" }}>
					<div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, letterSpacing: 3, color: faint }}>
						<div style={{ display: "flex" }}>{label.toUpperCase()}</div>
						<div style={{ display: "flex", color: ink, letterSpacing: 0 }}>garilleti.me</div>
					</div>
					<div style={{ display: "flex", marginTop: 20, fontSize: 76, lineHeight: 1.05, letterSpacing: -2 }}>
						{title}
					</div>
					<div style={{ display: "flex", marginTop: 20, fontSize: 32, lineHeight: 1.3, color: muted, maxWidth: 1000 }}>
						{lead}
					</div>
				</div>

				{claim && (
					<div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
						<div style={{ display: "flex", flexShrink: 0, whiteSpace: "nowrap", fontSize: 64, color: accent, letterSpacing: -1 }}>{claim}</div>
						{context && (
							<div style={{ display: "flex", fontSize: 28, lineHeight: 1.3, color: muted, maxWidth: 1000 }}>
								{context}
							</div>
						)}
					</div>
				)}

				<div
					style={{
						display: "flex",
						gap: 28,
						borderTop: `1px solid ${line}`,
						paddingTop: 24,
						fontSize: 22,
						color: faint,
					}}
				>
					{facts.map((fact) => (
						<div key={fact} style={{ display: "flex" }}>
							{fact}
						</div>
					))}
				</div>
			</div>
		),
		shareSize
	);
}
