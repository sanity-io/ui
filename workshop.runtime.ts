import {defineRuntime} from '@sanity/ui-workshop/runtime'
import {vanillaExtractPlugin} from '@vanilla-extract/vite-plugin'
import path from 'path'
import {mergeConfig} from 'vite'

export default defineRuntime({
  vite: (viteConfig) => {
    return mergeConfig(viteConfig, {
      optimizeDeps: {
        exclude: ['@sanity/ui'],
      },
      plugins: [vanillaExtractPlugin()],
      resolve: {
        alias: {
          '@sanity/ui/css/index.css': path.resolve(__dirname, 'workshop/empty.css'),
          '@sanity/ui/css': path.resolve(__dirname, 'src/css'),
          '@sanity/ui/theme': path.resolve(__dirname, 'src/theme'),
          '@sanity/ui/package.json': path.resolve(__dirname, 'package.json'),
          '@sanity/ui': path.resolve(__dirname, 'src/core'),
          '$workshop': path.resolve(__dirname, 'workshop'),
        },
      },
    })
  },
})
