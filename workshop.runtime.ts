import path from 'path'
import {defineRuntime} from '@sanity/ui-workshop'
import viteReact from '@vitejs/plugin-react'

const EXPORTS_PATH = path.resolve(__dirname, 'exports')

export default defineRuntime({
  vite: (viteConfig) => ({
    ...viteConfig,
    plugins: [
      viteReact({
        babel: {plugins: [['babel-plugin-react-compiler', {target: '18'}]]},
      }),
    ],
    resolve: {
      ...viteConfig.resolve,
      alias: {
        ...viteConfig.resolve?.alias,
        '@sanity/ui': EXPORTS_PATH,
      },
    },
  }),
})
