import {defineConfig} from '@repo/eslint-config'
import storybook from 'eslint-plugin-storybook'

export default defineConfig(import.meta.dirname, [
  {
    ignores: ['.turbo', 'dist', 'storybook-static', 'tmp'],
  },

  {
    rules: {
      'no-restricted-imports': [
        'error',
        {
          name: '@sanity/ui',
          message: 'Use @sanity/ui/* instead',
        },
      ],
    },
  },
])
