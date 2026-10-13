import react from '@vitejs/plugin-react'
import {defineConfig} from 'vite'

// Deliberately NO Panda plugin here: this app is an npm-style consumer that
// only imports the libraries' built JavaScript and their pre-generated
// `styles.css` (the "Consume without Panda" path), like `sanity` and the
// plugins consume `@sanity/ui` today.
export default defineConfig({
  plugins: [react()],
  build: {
    // Keep the CSS readable and un-merged so the proof can inspect it.
    minify: false,
    cssMinify: false,
  },
})
