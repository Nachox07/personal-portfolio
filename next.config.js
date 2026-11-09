const createMDX = require("@next/mdx");

/** @type {import('next').NextConfig} */
const nextConfig = {
	pageExtensions: ["ts", "tsx", "md", "mdx"],
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "whisper.land",
			},
		],
	},
};

// remark-gfm adds tables. Plugins are passed by name so Turbopack can load them.
const withMDX = createMDX({ options: { remarkPlugins: [["remark-gfm"]] } });

module.exports = withMDX(nextConfig);
