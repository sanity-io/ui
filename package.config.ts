import {defineConfig} from '@sanity/pkg-utils'

export default defineConfig({
  extract: {
    rules: {
      'ae-internal-missing-underscore': 'off',
      'ae-incompatible-release-tags': 'warn',
    },
  },
  legacyExports: true,
  minify: false,
  tsconfig: 'tsconfig.dist.json',
})
