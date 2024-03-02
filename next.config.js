/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "whisper.land",
			},
		],
	},
};

module.exports = nextConfig;
