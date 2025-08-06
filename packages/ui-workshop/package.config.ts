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
  babel: {reactCompiler: true},
  reactCompilerOptions: {target: '19'},
  rollup: {
    output: {
      intro: (chunkInfo) => {
        if (chunkInfo.isEntry === true && chunkInfo.name === 'index') {
          return `import './bundle.css'`
        }
        return ''
      },
    },
    vanillaExtract: true,
  },
  dts: 'rolldown',
  strictOptions: {noImplicitSideEffects: 'off'},
})
