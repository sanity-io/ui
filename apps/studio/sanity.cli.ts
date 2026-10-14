import path from 'node:path'

import {pandacss} from '@pandacss/vite'
import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'mos42crl',
    dataset: 'production',
  },
  deployment: {
    appId: 'hamwtfu4n5tnwz05fq2fnrj1',
    autoUpdates: true,
  },
  // `transform: 'oxc'` runs the React Compiler natively via `oxc-transform-react`
  // (the Rust port) instead of `babel-plugin-react-compiler`
  reactCompiler: {target: '19', transform: 'oxc'},
  vite: {
    // The workspace @sanity/ui resolves to its TypeScript source (dev
    // `exports`), so the studio's vite rewrites its Panda `.css.ts` modules
    // to static class strings
    plugins: [
      pandacss({cwd: path.resolve(import.meta.dirname, '../../packages/ui'), transform: true}),
    ],
    // Keep the workspace @sanity/ui out of vite's dependency pre-bundling:
    // real node_modules deps (sanity, @sanity/code-input, ...) import it, and
    // esbuild would otherwise inline its TypeScript source — including raw
    // `.css.ts` modules — into their prebundled chunks, bypassing the
    // Panda plugin.
    optimizeDeps: {exclude: ['@sanity/ui']},
  },
})
