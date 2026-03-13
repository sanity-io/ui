import boundaries from 'eslint-plugin-boundaries'

import {defineConfig} from '@repo/eslint-config'

export default defineConfig(import.meta.dirname, [
  {
    ignores: ['.turbo', '.workshop', 'dist', 'tmp'],
  },
])
