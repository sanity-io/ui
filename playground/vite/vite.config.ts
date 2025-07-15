import path from 'path'
import {defineConfig} from 'vite'
import {vanillaExtractPlugin} from '@vanilla-extract/vite-plugin'
import react from '@vitejs/plugin-react'

const features = {
  dist: process.env.FEATURE_DIST === 'on',
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), vanillaExtractPlugin()],

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
