// Pinned to vite@6 in this package: the plugin's CJS entry `require()`s the
// ESM-only Vite 7+/8 in a cycle, and its ESM build has invalid directory imports.
import {pigment} from '@pigment-css/vite-plugin'
import react from '@vitejs/plugin-react'
import {defineConfig} from 'vite'

export default defineConfig({
  plugins: [pigment({}), react()],
  build: {
    outDir: process.env.OUT_DIR ?? 'dist',
    lib: {entry: 'src/index.ts', formats: ['es'], fileName: 'index', cssFileName: 'style'},
    rollupOptions: {external: [/^react($|\/)/, /^@pigment-css\//]},
    minify: false,
  },
})
