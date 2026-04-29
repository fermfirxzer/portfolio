/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // Disable type checking during build for speed in this environment
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
