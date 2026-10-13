import pandacss from '@pandacss/vite'
import react from '@vitejs/plugin-react'
import {defineConfig} from 'vite'

export default defineConfig({
  // `transform: true` rewrites static css()/cva()/pattern calls to class
  // strings at build time, so this app ships no Panda runtime of its own.
  plugins: [react(), pandacss({transform: true})],
  build: {minify: false, cssMinify: false},
})
