/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone', // needecd for docker server.js production setup
};

export default nextConfig;