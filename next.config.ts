/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone', // needecd for docker server.js production setup
  experimental: {
    // If you're using App Router
    serverActions: true,
  },
};

export default nextConfig;