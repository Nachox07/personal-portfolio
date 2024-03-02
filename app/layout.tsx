import "./globals.css";

import Header from "@/components/header";
import { Inter } from "next/font/google";
import ActiveSectionContextProvider from "@/context/active-section-context";
import Footer from "@/components/footer";
import ThemeSwitch from "@/components/theme-switch";
import ThemeContextProvider from "@/context/theme-context";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Nacho González-Garilleti | Personal Portfolio",
	description:
		"Nacho González-Garilleti is a software engineer with 8 years of experience.",
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
			"Nacho González-Garilleti is a software engineer with 8 years of experience.",
		site_name: "Nacho González-Garilleti | Personal Portfolio",
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className="!scroll-smooth">
			<body
				className={`${inter.className} bg-gray-50 text-gray-950 relative pt-28 sm:pt-36 dark:bg-gray-900 dark:text-gray-50 dark:text-opacity-90`}
			>
				<div className="bg-[#6AC7FF] absolute top-[-6rem] -z-10 right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem] dark:bg-[#946263]"></div>
				<div className="bg-[#FF6A78] absolute top-[-1rem] -z-10 left-[-35rem] h-[31.25rem] w-[50rem] rounded-full blur-[10rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem] dark:bg-[#676394]"></div>

				<ThemeContextProvider>
					<ActiveSectionContextProvider>
						<Header />
						{children}
						<Footer />

						<Toaster position="top-right" />
						<ThemeSwitch />
					</ActiveSectionContextProvider>
				</ThemeContextProvider>
			</body>
		</html>
	);
}