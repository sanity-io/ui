import type {NextConfig} from 'next'

// No StyleX plugin, no Babel, no PostCSS config: the library is precompiled, so
// Next only has to transpile its ESM and serve its stylesheet.
const nextConfig: NextConfig = {
  transpilePackages: ['stylex-button-v1'],
}

export default nextConfig
