import {defineConfig} from '@sanity/pkg-utils'

export default defineConfig({
  dts: 'rolldown',
  extract: {
    rules: {
      'ae-internal-missing-underscore': 'off',
    },
  },
  tsconfig: 'tsconfig.dist.json',
})
