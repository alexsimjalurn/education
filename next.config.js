/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  // Image optimization - disabled to fix 401 errors on Vercel
  // Next.js Image Optimization API has authentication issues on Vercel
  // Images will be served directly without optimization
  images: {
    unoptimized: true,
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

