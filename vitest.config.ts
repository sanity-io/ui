import path from 'path'
import viteReact from '@vitejs/plugin-react'
import {defineConfig} from 'vitest/config'

export default defineConfig({
  plugins: [
    viteReact({
      jsxRuntime: 'automatic',
    }),
  ],
  resolve: {
    alias: {
      '@sanity/color': path.resolve(__dirname, 'packages/@sanity/color/src'),
      '@sanity/icons': path.resolve(__dirname, 'packages/@sanity/icons/src'),
      '@sanity/logos': path.resolve(__dirname, 'packages/@sanity/logos/src'),
      '@sanity/ui': path.resolve(__dirname, 'packages/@sanity/ui/src'),
      '@sanity/ui-workshop': path.resolve(__dirname, 'packages/@sanity/ui-workshop/src'),
    },
  },
  test: {
    environment: 'jsdom',
    exclude: [
      '**/node_modules/**',
      '**/build/**',
      '**/cypress/**',
      '**/dist/**',
      '**/.{idea,git,cache,output,temp}/**',
    ],
    globals: true,
  },
})
