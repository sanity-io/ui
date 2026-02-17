import {defineConfig} from '@repo/eslint-config'

export default defineConfig(import.meta.dirname, [
  {
    ignores: ['.turbo', '.react-router', 'build', 'dist', 'tmp'],
  },

  // react-router eslint config
  {
    files: ['app/**/*.{ts,tsx}'],
    rules: {
      'react-refresh/only-export-components': [
        'warn',
        {
          allowConstantExport: true,
          allowExportNames: [
            'loader',
            'clientLoader',
            'action',
            'clientAction',
            'meta',
            'links',
            'headers',
            'handle',
            'ErrorBoundary',
            'HydrateFallback',
            'shouldRevalidate',
          ],
        },
      ],
    },
  },
])
