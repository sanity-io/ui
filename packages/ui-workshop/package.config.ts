import {defineConfig} from '@sanity/pkg-utils'

export default defineConfig({
  bundles: [
    {
      source: './src/cli/index.ts',
      require: './dist/cli.js',
      runtime: 'node',
    },
  ],
  extract: {
    rules: {
      'ae-internal-missing-underscore': 'off',
    },
  },
  minify: false,
  tsconfig: 'tsconfig.dist.json',
})
