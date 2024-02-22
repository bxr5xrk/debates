/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol:'https',
                hostname: 'i.ibb.co',
            }
        ],
    },
};

export default nextConfig;
