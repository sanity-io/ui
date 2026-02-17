import {defineConfig} from '@repo/eslint-config'

export default defineConfig(import.meta.dirname, [
  {
    ignores: ['.turbo', '.react-router', 'build', 'dist', 'tmp'],
  },
])
