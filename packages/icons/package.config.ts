import {defineConfig} from '@sanity/pkg-utils'

export default defineConfig({
  extract: {
    rules: {
      'ae-internal-missing-underscore': 'off',
    },
  },
  strictOptions: {
    noImplicitBrowsersList: 'off',
  },
  tsconfig: 'tsconfig.dist.json',
  dts: 'rolldown',
})
