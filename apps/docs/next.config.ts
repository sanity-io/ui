import {createVanillaExtractPlugin} from '@vanilla-extract/next-plugin'
import type {NextConfig} from 'next'

// The workspace @sanity/ui resolves to its TypeScript source (dev `exports`),
// so its vanilla-extract `.css.ts` modules must be compiled here. Turbopack
// support is forced `on` (rather than `auto`) because this app devs and
// builds exclusively with `--turbopack`, and `auto`'s version sniffing would
// quietly fall back to webpack-only wiring if it failed to parse a `next`
// preview version.
const withVanillaExtract = createVanillaExtractPlugin({
  unstable_turbopack: {mode: 'on'},
})

const basePath = '/ui'
const nextConfig: NextConfig = {
  basePath,
  cacheComponents: true,
  partialPrefetching: true,
  // Matches the behavior of `sanity dev` which sets styled-components to use the fastest way of inserting CSS rules in both dev and production. It's default behavior is to disable it in dev mode.
  compiler: {styledComponents: true, define: {SC_DISABLE_SPEEDY: 'false'}},
  // These workspace packages resolve to their TypeScript source in the
  // monorepo (dev `exports`), so Next.js must transpile them.
  transpilePackages: ['@sanity/color', '@sanity/icons', '@sanity/logos', '@sanity/ui'],
  reactCompiler: true,
  experimental: {
    // Use the native Rust port of the React Compiler (runs directly on
    // Turbopack's swc AST) instead of the Babel transform
    turbopackRustReactCompiler: true,
    // TypeScript 7 no longer ships the JS compiler API that Next.js uses by
    // default; run the project-local `tsc` CLI for typegen/build type-checks.
    useTypeScriptCli: true,
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
        permanent: false,
      },
    ]
  },
}

export default withVanillaExtract(nextConfig)
