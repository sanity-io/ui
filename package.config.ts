import {defineConfig} from '@sanity/pkg-utils'

export default defineConfig({
  bundles: [
    {
      source: './src/css/cli/index.ts',
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
  legacyExports: true,
  strictOptions: {
    // disable warning when not using browserslist in package.json
    noImplicitBrowsersList: 'off',
  },
  tsconfig: 'tsconfig.dist.json',
  babel: {reactCompiler: true},
  reactCompilerOptions: {target: '18'},
})
