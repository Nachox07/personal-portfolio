import type { Config } from "tailwindcss";

const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
	content: [
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				bg: token("bg"),
				surface: token("surface"),
				ink: token("ink"),
				muted: token("muted"),
				faint: token("faint"),
				line: token("line"),
				accent: token("accent"),
				"accent-soft": token("accent-soft"),
				bar: token("bar"),
			},
			fontFamily: {
				sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
				mono: ["var(--font-mono)", "ui-monospace", "monospace"],
			},
		},
	},
	plugins: [],
	darkMode: "class",
};

export default config;
