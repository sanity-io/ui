import {defineConfig} from '@sanity/pkg-utils'

export default defineConfig({
  bundles: [
    {
      source: './src/cli/index.ts',
      import: './dist/cli.js',
      runtime: 'node',
    },
  ],
  extract: {
    rules: {
      'ae-internal-missing-underscore': 'off',
    },
  },
  tsconfig: 'tsconfig.dist.json',
  babel: {reactCompiler: true, styledComponents: true},
  reactCompilerOptions: {target: '19'},
  dts: 'rolldown',
})
