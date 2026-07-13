import {sanity} from 'next-sanity/live/cache-life'

/** @type {import('next').NextConfig} */
const nextConfig = {
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
  },
}

export default nextConfig
