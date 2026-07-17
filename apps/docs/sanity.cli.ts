import {defineCliConfig} from 'sanity/cli'

// Object configs are merged into the base config with vite's `mergeConfig`,
// which handles both array and object forms of `resolve.alias`.
export default defineCliConfig({
  api: {
    projectId: 'mos42crl',
    dataset: 'production',
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
    resolve: {
      alias: {
        '@': './src',
      },
    },
  },
})
