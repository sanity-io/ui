import {defineConfig} from '@sanity/pkg-utils'

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
    },
  },
  tsconfig: 'tsconfig.dist.json',
  babel: {reactCompiler: true},
  reactCompilerOptions: {target: '19'},
  dts: 'rolldown',
})
