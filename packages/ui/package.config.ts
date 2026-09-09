import {defineConfig} from '@sanity/pkg-utils'

export default defineConfig({
  tsconfig: 'tsconfig.dist.json',
  strictOptions: {
    noImplicitBrowsersList: 'off',
  },
  // 'oxc' (oxc-transform-react) is the same Rust React Compiler port that
  // oxlint's react rules run, so lint findings and compiled output stay in step
  reactCompiler: {target: '19', transform: 'oxc'},
  // `build:css` writes dist/styles.css before `build:js` runs, and the `clean`
  // script already empties dist, so pkg-utils must not clean it again here
  clean: false,
})
