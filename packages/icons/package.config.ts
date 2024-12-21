import {defineConfig} from '@sanity/pkg-utils'

export default defineConfig({
  extract: {
    rules: {
      'ae-internal-missing-underscore': 'off',
    },
  },
  tsconfig: 'tsconfig.dist.json',
  // @TODO re-enable after issue is fixed in @sanity/presentation
  babel: {reactCompiler: false},
  reactCompilerOptions: {target: '18'},
})
