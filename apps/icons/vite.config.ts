import babel from '@rolldown/plugin-babel'
import {vanillaExtractPlugin} from '@sanity/vanilla-extract-vite-plugin'
import react, {reactCompilerPreset} from '@vitejs/plugin-react'
import {defineConfig} from 'vite'

export default defineConfig({
  plugins: [
    react(),
    babel({presets: [reactCompilerPreset({target: '19'})]}),
    // @sanity/ui resolves to its TypeScript source (dev `exports`), so its
    // vanilla-extract `.css.ts` modules must be compiled here
    vanillaExtractPlugin(),
  ],
})
