import "./globals.css";

import Header from "@/components/header";
import { Inter, JetBrains_Mono } from "next/font/google";
import ActiveSectionContextProvider from "@/context/active-section-context";
import Footer from "@/components/footer";
import ThemeContextProvider from "@/context/theme-context";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const mono = JetBrains_Mono({
	subsets: ["latin"],
	variable: "--font-mono",
	weight: ["400", "500"],
});

// Set the theme class and saved accent before first paint, so nothing flashes.
const themeScript = `try{var t=localStorage.getItem("theme");if(t==="dark"||(!t&&matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark");var a=localStorage.getItem("accent");if(a&&a!=="teal")document.documentElement.dataset.accent=a}catch(e){}`;

export const metadata = {
	title: "Nacho González-Garilleti | Personal Portfolio",
	description:
		"Nacho González-Garilleti builds AI agents that act on real systems, and helps engineering teams get faster with AI. 9 years in production.",
	tags: [
		"Nacho",
		"González",
		"Garilleti",
		"Full-stack",
		"Engineer",
		"Portfolio",
	],
	twitter: {
		handle: "@nachox07",
		site: "@nachox07",
		cardType: "summary_large_image",
	},
	openGraph: {
		type: "website",
		locale: "en_US",
		url: "https://garilleti.me",
		title: "Nacho González-Garilleti | Personal Portfolio",
		description:
			"Nacho González-Garilleti builds AI agents that act on real systems, and helps engineering teams get faster with AI. 9 years in production.",
		site_name: "Nacho González-Garilleti | Personal Portfolio",
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang="en"
			className={`${inter.variable} ${mono.variable} !scroll-smooth`}
			suppressHydrationWarning
		>
			<head>
				<script dangerouslySetInnerHTML={{ __html: themeScript }} />
			</head>
			<body className="overflow-x-clip font-sans">
				<a
					href="#main"
					className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[1000] focus:bg-surface focus:px-3 focus:py-2 focus:text-sm"
				>
					Skip to content
				</a>
				<ThemeContextProvider>
					<ActiveSectionContextProvider>
						<Header />
						{children}
						<Footer />
					</ActiveSectionContextProvider>
				</ThemeContextProvider>
			</body>
		</html>
	);
}
