import stylexBabel from '@stylexjs/unplugin'
import stylexRs from '@stylexswc/unplugin/vite'
import react from '@vitejs/plugin-react'
import {defineConfig, type PluginOption} from 'vite'

import {versionScopedModuleResolution} from '../scripts/stylex-options.mjs'
import {STYLEX_COMPILER} from '../scripts/stylex-tsdown.mjs'

// The consumer application: Vite 8 (rolldown) + React 19. The StyleX compiler
// (official Babel plugin or the Rust port, `STYLEX_COMPILER=babel|rs`) compiles
// the app's own StyleX (page layout + a consumer theme over the published v1
// tokens). The two library stylesheets are precompiled and loaded as-is (see
// src/main.tsx).
const stylexPlugin: PluginOption =
  STYLEX_COMPILER === 'rs'
    ? stylexRs({
        // splice the compiled rules into app.css at the `@stylex;` marker
        useCssPlaceholder: true,
        rsOptions: {
          dev: false,
          runtimeInjection: false,
          unstable_moduleResolution: {type: 'commonJS', rootDir: import.meta.dirname},
        },
      })
    : stylexBabel.vite({
        // must match the library builds so `createTheme(tokensV1, …)` in app code
        // resolves to the same variable names the published CSS declares
        unstable_moduleResolution: versionScopedModuleResolution(),
      })

export default defineConfig({
  plugins: [stylexPlugin, react()],
  define: {
    // the consumer theme over published tokens needs the `custom` module
    // resolution; the Rust compiler cannot express it (see App.tsx)
    __STYLEX_COMPILER__: JSON.stringify(STYLEX_COMPILER),
  },
  preview: {port: 4173, strictPort: true},
  server: {port: 4173, strictPort: true},
})
