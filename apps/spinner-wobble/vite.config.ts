import react from '@vitejs/plugin-react'
import {defineConfig} from 'vite'

// Two HTML entries so the wobbly and fixed builds never share a document.
// Both publish the same vanilla-extract class for the spinner; loading both
// stylesheets in one page makes the later rule win and hides the bug.
export default defineConfig({
  build: {
    rolldownOptions: {
      input: ['index.html', 'before.html', 'after.html'],
    },
  },
  plugins: [react()],
  preview: {
    port: 5199,
    strictPort: true,
  },
  resolve: {
    dedupe: ['react', 'react-dom', 'styled-components'],
  },
  server: {
    port: 5199,
    strictPort: true,
  },
})
