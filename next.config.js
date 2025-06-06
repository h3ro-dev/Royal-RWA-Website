/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['royalrwa.com', 'localhost'],
  },
  env: {
    NEXT_PUBLIC_APP_NAME: 'Royal RWA',
    NEXT_PUBLIC_APP_DESCRIPTION: 'Where Sovereign Wealth Meets Individual Opportunity',
  },
  webpack: (config) => {
    // Required for wagmi/viem
    config.resolve.fallback = { fs: false, net: false, tls: false }
    config.externals.push('pino-pretty', 'lokijs', 'encoding')
    return config
  },
}

module.exports = nextConfig