import {vanillaExtractPlugin} from '@sanity/vanilla-extract-vite-plugin'
import react from '@vitejs/plugin-react'
import {defineConfig} from 'vite'

export default defineConfig({
  plugins: [
    // `compiler` runs the React Compiler natively via `oxc-transform-react`
    // (the Rust port) in the same pass as TypeScript/JSX — no babel
    react({compiler: {target: '19'}}),
    // @sanity/ui resolves to its TypeScript source (dev `exports`), so its
    // vanilla-extract `.css.ts` modules must be compiled here
    vanillaExtractPlugin(),
  ],
})
