/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com', // Add Cloudinary hostname
        pathname: '/**', // Allow all paths
      },
    ],
  },
};

// Use CommonJS syntax for exporting
module.exports = nextConfig;
