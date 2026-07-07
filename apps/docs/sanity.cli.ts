import {defineCliConfig} from 'sanity/cli'

// Object configs are merged into the base config with vite's `mergeConfig`,
// which handles both array and object forms of `resolve.alias`.
export default defineCliConfig({
  reactCompiler: {target: '19'},
  vite: {
    resolve: {
      alias: {
        '@': './src',
      },
    },
  },
})
