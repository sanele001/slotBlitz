/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  allowedDevOrigins: ["http://localhost:3000", "10.161.172.239"],
  images: {
    localPatterns: [
      {
        pathname: "/api/images/**",
      },
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.freedemo.games",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
