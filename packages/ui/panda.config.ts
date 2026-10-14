import {defineConfig, type Config} from '@pandacss/dev'

export default defineConfig({
  include: ['./src/**/*.css.ts'],
  importMap: '#styled-system',
  // Class names are `u-` plus a 32-bit hash of the style key (`display: flex`
  // → `u-HgOzd`). The prefix keeps them apart from other Panda builds on the
  // same page; two copies of @sanity/ui share them, so test/class-names keeps
  // every name ever emitted bound to a single style.
  hash: true,
  prefix: 'u',
  preflight: false,
  presets: [],
  // `styled` in this package is styled-components, not Panda's JSX factory.
  jsxStyleProps: 'none',
  shorthands: false,
  forceImportExtension: true,
  // csstype omits `-webkit-font-smoothing` from StandardProperties.
  utilities: {
    WebkitFontSmoothing: {values: {type: 'string'}},
  },
  // Catches invalid CSS
  strictPropertyValues: true,
} satisfies Config)
