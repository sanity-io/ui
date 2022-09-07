import {defineConfig} from '@sanity/pkg-utils'

export default defineConfig({
  extract: {
    rules: {
      'ae-forgotten-export': 'warn',
      'ae-missing-release-tag': 'warn',
    },
  },
})
