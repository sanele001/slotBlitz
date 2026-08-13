/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'static.freedemo.games',
				port: '',
				pathname: '/**',
			},
			...(process.env.NEXT_PUBLIC_SUPABASE_URL
				? [
						{
							protocol: 'https',
							hostname: new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname,
							port: '',
							pathname: '/storage/v1/**',
						},
				  ]
				: []),
		],
	},
};

module.exports = nextConfig;
