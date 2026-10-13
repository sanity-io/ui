import react from '@vitejs/plugin-react'
import {resolve} from 'node:path'
import {defineConfig} from 'vite'

/**
 * A plain consumer: no next-yak plugin, no `@swc/core` at build time. The two library versions
 * arrive as prebuilt JS + `styles.css`, exactly like `@sanity/ui` arrives in a Studio build.
 */
export default defineConfig({
  plugins: [react()],
  build: {
    rolldownOptions: {
      input: {
        safe: resolve(import.meta.dirname, 'index.html'),
        unsafe: resolve(import.meta.dirname, 'unsafe.html'),
      },
    },
  },
})
