/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/ui',
  compiler: {
    styledComponents: true,
  },
  // The workspace @sanity/ui resolves to its TypeScript source in the
  // monorepo (dev `exports`), so Next.js must transpile it.
  transpilePackages: ['@sanity/ui'],
  experimental: {
    taint: true,
  },
  eslint: {
    // Linting is handled by oxlint at the repo root (`pnpm lint`)
    ignoreDuringBuilds: true,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Accept-CH',
            value: 'Sec-CH-Prefers-Color-Scheme, Sec-CH-Prefers-Reduced-Motion',
          },
          {
            key: 'Vary',
            value: 'Sec-CH-Prefers-Color-Scheme',
          },
          {
            key: 'Critical-CH',
            value: 'Sec-CH-Prefers-Color-Scheme',
          },
        ],
      },
    ]
  },
}

export default nextConfig
