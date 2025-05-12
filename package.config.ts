import replace from '@rollup/plugin-replace'
import {defineConfig} from '@sanity/pkg-utils'

import {prefix} from './prefix'

export default defineConfig({
  bundles: [
    {
      source: './src/cli/index.ts',
      require: './dist/cli.cjs',
      runtime: 'node',
    },
  ],
  extract: {
    rules: {
      'ae-internal-missing-underscore': 'off',
      'ae-incompatible-release-tags': 'warn',
      'ae-missing-release-tag': 'warn',
    },
  },
  strictOptions: {
    // disable warning when not using browserslist in package.json
    noImplicitBrowsersList: 'off',
  },
  tsconfig: 'tsconfig.dist.json',
  babel: {reactCompiler: true},
  reactCompilerOptions: {target: '18'},
  rollup: {
    plugins: [
      replace({
        [`const PREFIX = 's-'`]: `const PREFIX = '${prefix}-'`,
      }),
    ],
  },
})
