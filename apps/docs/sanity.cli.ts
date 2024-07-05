import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  vite: (viteConfig) => ({
    ...viteConfig,
    resolve: {
      ...viteConfig.resolve,
      alias: {
        ...viteConfig.resolve?.alias,
        '@': './src',
      },
    },
  }),
})
