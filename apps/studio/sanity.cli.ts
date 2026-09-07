import {vanillaExtractPlugin} from '@sanity/vanilla-extract-vite-plugin'
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
    // `exports`), so the studio's vite must compile its vanilla-extract
    // `.css.ts` modules
    plugins: [vanillaExtractPlugin()],
    // Keep the workspace @sanity/ui out of vite's dependency pre-bundling:
    // real node_modules deps (sanity, @sanity/code-input, ...) import it, and
    // esbuild would otherwise inline its TypeScript source — including raw
    // `.css.ts` modules — into their prebundled chunks, bypassing the
    // vanilla-extract plugin ("Styles were unable to be assigned to a file").
    optimizeDeps: {exclude: ['@sanity/ui']},
  },
})
