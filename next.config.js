/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		localPatterns: [
			{
				pathname: '/api/images/**',
			},
		],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'static.freedemo.games',
				port: '',
				pathname: '/**',
			},
		],
	},
};

module.exports = nextConfig;
