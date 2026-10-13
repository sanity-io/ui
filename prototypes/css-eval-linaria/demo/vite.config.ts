import react from '@vitejs/plugin-react'
import {defineConfig} from 'vite'

export default defineConfig({
  plugins: [react()],
  resolve: {
    // The prebuilt libraries live outside this package; make their bare
    // imports (react, @linaria/*) resolve to this package's copies.
    dedupe: ['react', 'react-dom', '@linaria/core', '@linaria/react', '@linaria/atomic'],
  },
  build: {
    rollupOptions: {
      input: ['index.html', 'default.html', 'namespaced.html', 'atomic.html'],
    },
  },
})
