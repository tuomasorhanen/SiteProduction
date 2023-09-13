/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  output: 'standalone',
  swcMinify: true,
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    unoptimized: false,
    formats: ['image/avif', 'image/webp'],
    domains: ['cdn.sanity.io'],
    quality: 90,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
      },
    ],
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => {
    config.cache = true;
    return config;
  },
  experimental: { appDir: true },
  optimizeFonts: true,
};

export default config;
