import type {NextConfig} from 'next'
import {sanity} from 'next-sanity/live/cache-life'

const basePath = '/ui'
const nextConfig: NextConfig = {
  basePath,
  cacheComponents: true,
  partialPrefetching: true,
  // Sanity Live handles on-demand revalidation (see `api/expire-tags` and the
  // `apps/blueprints/docs` invalidate-sync-tags function), so the default
  // time-based revalidation is stretched to 1 year.
  cacheLife: {default: sanity},
  // Matches the behavior of `sanity dev` which sets styled-components to use the fastest way of inserting CSS rules in both dev and production. It's default behavior is to disable it in dev mode.
  compiler: {styledComponents: true, define: {SC_DISABLE_SPEEDY: 'false'}},
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
  async rewrites() {
    // `next dev` runs alongside `sanity dev` (see the `dev` script), which
    // serves the studio under the same /ui/studio base path on :3333.
    if (process.env.NODE_ENV === 'development') {
      return {
        beforeFiles: [
          {
            source: '/studio/:path*', // basePath auto-prefixes to /ui/studio/:path*
            destination: 'http://localhost:3333/ui/studio/:path*',
          },
        ],
      }
    }
    return {
      afterFiles: [
        // In production `sanity build public/studio` emits a static SPA. Its
        // assets resolve from the filesystem first (afterFiles), and every
        // other /ui/studio route falls through to the SPA entrypoint so the
        // studio router can handle it.
        {
          source: '/studio/:path*',
          destination: '/studio/index.html',
        },
      ],
    }
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: basePath,
        basePath: false, // CRITICAL: Tells Next.js not to prefix the source path
        permanent: true,
      },
      // The built studio's document hardcodes favicon/manifest links to the
      // domain root (/static/...), which the /ui basePath leaves unclaimed.
      // Rewrites can't target outside the basePath, so redirect instead.
      {
        source: '/static/:path*',
        destination: `${basePath}/studio/static/:path*`,
        basePath: false,
        permanent: false,
      },
    ]
  },
}

export default nextConfig
