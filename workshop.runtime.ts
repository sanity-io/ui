import {type WorkshopRuntimeOptions} from '@sanity/ui-workshop/runtime'
import path from 'path'
import {mergeConfig} from 'vite'

const runtime: WorkshopRuntimeOptions = {
  vite: (viteConfig) => {
    return mergeConfig(viteConfig, {
      optimizeDeps: {
        exclude: ['@sanity/ui'],
      },
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
}

export default runtime
