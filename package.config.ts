import {defineConfig} from '@sanity/pkg-utils'

export default defineConfig({
  bundles: [
    {
      source: './figma/index.ts',
      import: './dist/figma/index.mjs',
    },
  ],
  extract: {
    rules: {
      'ae-internal-missing-underscore': 'off',
      'ae-incompatible-release-tags': 'warn',
      'ae-missing-release-tag': 'warn',
    },
  },
  legacyExports: true,
  minify: false,
  tsconfig: 'tsconfig.dist.json',
})
