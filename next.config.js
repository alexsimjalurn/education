/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  // Image optimization - re-enabled with proper configuration
  images: {
    formats: ['image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 60,
    unoptimized: false,
  },

  // Compression
  compress: true,

  // Headers to ensure static files are served correctly
  async headers() {
    return [
      {
        // Allow static files to be served without authentication
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // Bundle analyzer (optional, enable when needed)
  // webpack: (config, { isServer }) => {
  //   if (!isServer && process.env.ANALYZE === 'true') {
  //     const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
  //     config.plugins.push(
  //       new BundleAnalyzerPlugin({
  //         analyzerMode: 'static',
  //         openAnalyzer: false,
  //       })
  //     );
  //   }
  //   return config;
  // },
};

module.exports = nextConfig;

