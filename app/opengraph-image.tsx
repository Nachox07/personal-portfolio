import { shareImage, shareSize } from "@/lib/share-card";

export const alt = "Nacho González-Garilleti, software engineer: AI agents that retrieve information and call tools";
export const size = shareSize;
export const contentType = "image/png";

export default function Image() {
	return shareImage({
		label: "Software engineer · 9 years in production",
		title: "Nacho González-Garilleti",
		lead: "I build AI agents that retrieve information and call tools, with a person approving every change.",
		facts: ["Technical lead at OpenVPN", "Case studies: Tardeo.ai · Extraction evals · Whisperland"],
	});
}
