import {reactRouter} from '@react-router/dev/vite'
import {vanillaExtractPlugin} from '@vanilla-extract/vite-plugin'
import path from 'path'
import {defineConfig} from 'vite'

const features = {
  dist: process.env.FEATURE_DIST === 'on',
}

export default defineConfig({
  plugins: [reactRouter(), vanillaExtractPlugin()],

  optimizeDeps: {
    exclude: features.dist ? undefined : ['@sanity/ui'],
  },

  resolve: {
    alias: features.dist
      ? {}
      : {
          '@sanity/ui/css/index.css': path.resolve(__dirname, './empty.css'),
          '@sanity/ui': path.resolve(__dirname, '../../exports'),
        },
  },
})
