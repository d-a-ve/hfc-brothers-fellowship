/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "cloud.appwrite.io",
				pathname: "/v1/storage/buckets/**",
				port: "",
			},
			{
				protocol: "https",
				hostname: "**.holidayalot.com",
				port: "",
				pathname: "**/*",
			},
		],
	},
}

export default nextConfig
