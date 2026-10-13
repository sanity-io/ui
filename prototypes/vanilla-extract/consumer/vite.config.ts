import react from '@vitejs/plugin-react'
import {defineConfig} from 'vite'

// A plain consumer app. It only loads the libraries' *built* output (dist/<mode>/), exactly
// like an npm consumer would, so there is no vanilla-extract plugin here at all.
export default defineConfig({
  root: import.meta.dirname,
  plugins: [react()],
  server: {
    port: 4173,
    strictPort: true,
    fs: {allow: ['..']},
  },
  optimizeDeps: {
    include: ['react/jsx-runtime', '@vanilla-extract/dynamic', '@vanilla-extract/recipes/createRuntimeFn'],
  },
})
