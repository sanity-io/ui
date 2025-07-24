import type {NextConfig} from 'next'
import {createVanillaExtractPlugin} from '@vanilla-extract/next-plugin'

const withVanillaExtract = createVanillaExtractPlugin()

const features = {
  dist: process.env.FEATURE_DIST === 'on',
}

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Accept-CH',
            value: 'Sec-CH-Prefers-Color-Scheme',
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

  transpilePackages: features.dist ? [] : ['@sanity/ui'],

  typescript: {
    tsconfigPath: features.dist ? './tsconfig.dist.json' : './tsconfig.json',
  },
}

export default withVanillaExtract(nextConfig)
