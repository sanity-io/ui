import {sanity} from 'next-sanity/live/cache-life'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  basePath: '/ui',
  cacheComponents: true,
  // Sanity Live handles on-demand revalidation (see `api/expire-tags` and the
  // `apps/blueprints/docs` invalidate-sync-tags function), so the default
  // time-based revalidation is stretched to 1 year.
  cacheLife: {default: sanity},
  compiler: {
    styledComponents: true,
  },
  // The workspace @sanity/ui resolves to its TypeScript source in the
  // monorepo (dev `exports`), so Next.js must transpile it.
  transpilePackages: ['@sanity/ui'],
  reactCompiler: true,
  experimental: {
    taint: true,
    // Use the native Rust port of the React Compiler (runs directly on
    // Turbopack's swc AST) instead of the Babel transform
    turbopackRustReactCompiler: true,
  },
  // The color-scheme client hints aren't read server-side right now (the
  // static shell prerenders without request data), but keep advertising them
  // so they're available to future use (e.g. runtime prefetching)
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
  async redirects() {
    return [
      {
        source: '/',
        destination: '/ui',
        basePath: false,
        permanent: true,
      },
    ];
  },
}

export default nextConfig
