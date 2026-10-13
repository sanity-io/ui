import wyw from '@wyw-in-js/vite'
import {defineConfig} from 'vite'

/**
 * Alternative library build through Vite 8 (rolldown-based) + `@wyw-in-js/vite`,
 * to check the Vite plugin against the current Vite major. Run with
 * `pnpm build:vite`; output goes to dist/vite.
 */
export default defineConfig({
  plugins: [wyw({sourceMap: false, prefixer: false})],
  build: {
    outDir: 'dist/vite',
    lib: {entry: 'src/index.ts', formats: ['es'], fileName: 'index', cssFileName: 'style'},
    rollupOptions: {external: [/^react($|\/)/, /^@linaria\//]},
    minify: false,
  },
})
