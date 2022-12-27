import {defineConfig} from '@sanity/pkg-utils'

export default defineConfig({
  extract: {
    rules: {
      'ae-internal-missing-underscore': 'off',
    },
  },
  legacyExports: true,
  minify: false,
  tsconfig: 'tsconfig.dist.json',
})
