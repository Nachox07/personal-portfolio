import { defineConfig } from "@playwright/test";

const PORT = 3100;

// Visual checks of the production build at phone and desktop width, in both themes.
// Baselines live in tests/visual.spec.ts-snapshots and are made on macOS:
// font rendering differs on Linux, so compare on the same OS that made them.
export default defineConfig({
	testDir: "tests",
	fullyParallel: true,
	reporter: [["list"], ["html", { open: "never" }]],
	expect: {
		toHaveScreenshot: { maxDiffPixels: 50, animations: "disabled" },
	},
	use: { baseURL: `http://localhost:${PORT}` },
	projects: [
		{ name: "phone-light", use: { viewport: { width: 390, height: 844 }, colorScheme: "light" } },
		{ name: "phone-dark", use: { viewport: { width: 390, height: 844 }, colorScheme: "dark" } },
		{ name: "desktop-light", use: { viewport: { width: 1440, height: 900 }, colorScheme: "light" } },
		{ name: "desktop-dark", use: { viewport: { width: 1440, height: 900 }, colorScheme: "dark" } },
	],
	webServer: {
		// Pin the timeline date so the "Present" bar does not move between runs.
		command: `TIMELINE_NOW=2026-11-01 npm run build && npx next start --port ${PORT}`,
		url: `http://localhost:${PORT}`,
		timeout: 180_000,
		reuseExistingServer: false,
	},
});
