import type {NextConfig} from 'next'
import {sanity} from 'next-sanity/live/cache-life'

const basePath = '/ui'
const nextConfig: NextConfig = {
  basePath,
  cacheComponents: true,
  // Sanity Live handles on-demand revalidation (see `api/expire-tags` and the
  // `apps/blueprints/docs` invalidate-sync-tags function), so the default
  // time-based revalidation is stretched to 1 year.
  cacheLife: {default: sanity},
  compiler: {styledComponents: true},
  // Matches the behavior of `sanity dev` which sets styled-components to use the fastest way of inserting CSS rules in both dev and production. It's default behavior is to disable it in dev mode.
  env: {SC_DISABLE_SPEEDY: 'false'},
  // The workspace @sanity/ui resolves to its TypeScript source in the
  // monorepo (dev `exports`), so Next.js must transpile it.
  transpilePackages: ['@sanity/ui'],
  reactCompiler: true,
  experimental: {
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
        destination: basePath,
        basePath: false, // CRITICAL: Tells Next.js not to prefix the source path
        permanent: true,
      },
    ]
  },
}

export default nextConfig
