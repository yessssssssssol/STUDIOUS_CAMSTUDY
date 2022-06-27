/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'build',
  trailingSlash: true,
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
