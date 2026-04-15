import {defineConfig} from '@sanity/pkg-utils'

export default defineConfig({
  babel: {reactCompiler: true},
  dts: 'rolldown',
  extract: {
    rules: {
      'ae-internal-missing-underscore': 'off',
      'ae-incompatible-release-tags': 'warn',
    },
  },
  reactCompilerOptions: {target: '19'},
  strictOptions: {
    // disable warning when not using browserslist in package.json
    noImplicitBrowsersList: 'off',
  },
  tsconfig: 'tsconfig.dist.json',
})
