import path from 'path'
import {defineRuntime} from '@sanity/ui-workshop'
// import viteReact from '@vitejs/plugin-react'

const EXPORTS_PATH = path.resolve(__dirname, 'exports')

export default defineRuntime({
  vite: (viteConfig) => ({
    ...viteConfig,
    // build: {
    //   ...viteConfig.build,
    //   rollupOptions: {
    //     ...viteConfig.build?.rollupOptions,
    //     external: [
    //       ...((viteConfig.build?.rollupOptions?.external || []) as string[]),
    //       'react-compiler-runtime',
    //     ],
    //   },
    // },
    // plugins: [
    //   viteReact({
    //     // babel: {plugins: [['babel-plugin-react-compiler', {target: '18'}]]},
    //   }),
    // ],
    resolve: {
      ...viteConfig.resolve,
      alias: {
        ...viteConfig.resolve?.alias,
        '@sanity/ui': EXPORTS_PATH,
        '@sanity/ui-workshop': path.resolve(__dirname, '../ui-workshop/exports'),
      },
    },
  }),
})
