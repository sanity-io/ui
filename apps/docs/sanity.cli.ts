import {vanillaExtractPlugin} from '@sanity/vanilla-extract-vite-plugin'
import {defineCliConfig} from 'sanity/cli'

// Object configs are merged into the base config with vite's `mergeConfig`,
// which handles both array and object forms of `resolve.alias`.
export default defineCliConfig({
  api: {
    projectId: 'mos42crl',
    dataset: 'production',
  },
  deployment: {
    appId: 'hamwtfu4n5tnwz05fq2fnrj1',
    autoUpdates: true,
  },
  project: {
    // `sanity build`/`sanity dev` don't read the basePath from
    // sanity.config.ts — without this, built asset URLs resolve from `/`
    // instead of /ui/studio/.
    basePath: '/ui/studio',
  },
  reactCompiler: {target: '19'},
  schemaExtraction: {
    enabled: true,
  },
  typegen: {
    enabled: true,
    overloadClientMethods: true,
    formatGeneratedCode: false,
  },
  vite: {
    // The workspace @sanity/ui resolves to its TypeScript source (dev
    // `exports`), so the studio's vite must compile its vanilla-extract
    // `.css.ts` modules
    plugins: [vanillaExtractPlugin()],
    resolve: {
      alias: {
        '@': './src',
      },
    },
  },
})
