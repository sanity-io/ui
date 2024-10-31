import replace from '@rollup/plugin-replace'
import {defineConfig} from '@sanity/pkg-utils'
import crypto from 'crypto'

import pkg from './package.json'

function md5(str: string) {
  return crypto.createHash('md5').update(str).digest('hex')
}

export const prefix = `s${md5(pkg.version).slice(0, 5)}`

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
