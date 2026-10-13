import stylex from '@stylexjs/unplugin'
import react from '@vitejs/plugin-react'
import {defineConfig} from 'vite'

import {versionScopedModuleResolution} from '../scripts/stylex-options.mjs'

// The consumer application: Vite 8 (rolldown) + React 19. `@stylexjs/unplugin`
// compiles the app's own StyleX (page layout + a consumer theme over the
// published v1 tokens) and appends that CSS to the app's CSS asset. The two
// library stylesheets are precompiled and loaded as-is (see src/main.tsx).
export default defineConfig({
  plugins: [
    stylex.vite({
      // must match the library builds so `createTheme(tokensV1, …)` in app code
      // resolves to the same variable names the published CSS declares
      unstable_moduleResolution: versionScopedModuleResolution(),
    }),
    react(),
  ],
  preview: {port: 4173, strictPort: true},
  server: {port: 4173, strictPort: true},
})
