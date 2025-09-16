/** @type {import('next').NextConfig} */
const nextConfig = {
  // Reduce memory usage by limiting webpack caching
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.cache = false
    }
    return config
  },
  // Disable unnecessary features in development
  experimental: {
    optimizeCss: false,
  },
  // Limit bundled chunks
  compress: false,
  poweredByHeader: false,
}

module.exports = nextConfig