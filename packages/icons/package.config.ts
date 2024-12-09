import {defineConfig} from '@sanity/pkg-utils'

export default defineConfig({
  extract: {
    rules: {
      'ae-internal-missing-underscore': 'off',
    },
  },
  tsconfig: 'tsconfig.dist.json',
  babel: {reactCompiler: true},
  reactCompilerOptions: {target: '18'},
})
