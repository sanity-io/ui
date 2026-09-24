import type {NextConfig} from 'next'

const nextConfig: NextConfig = {
  turbopack: {},
  reactCompiler: true,
  experimental: {
    turbopackRustReactCompiler: true,
  },
}

export default nextConfig
