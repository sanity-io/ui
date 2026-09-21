import {vanillaExtractPlugin} from '@sanity/vanilla-extract-vite-plugin'
import react from '@vitejs/plugin-react'
import {defineConfig} from 'vite'

export default defineConfig({
  plugins: [
    react({compiler: {target: '19'}}),
    // While packages/ui is at 4.2.1, pnpm links `@sanity/ui-fixed` to that
    // TypeScript source instead of npm, so its `.css.ts` modules must be
    // compiled here just like in apps/icons
    vanillaExtractPlugin(),
  ],
  server: {port: 5199, strictPort: true},
})
