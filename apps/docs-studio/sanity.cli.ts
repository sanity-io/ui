import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env['SANITY_STUDIO_PROJECT_ID'],
  },

  deployment: {
    appId: 'dcsu4kassupf18r9gb4jk340',
  },

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
