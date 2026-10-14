import {defineConfig} from '@pandacss/dev'

export default defineConfig({
  eject: true,
  preflight: false,
  presets: [],
  // `styled` in this package is styled-components, not Panda's JSX factory.
  jsxStyleProps: 'none',
  shorthands: false,
  forceImportExtension: true,
  importMap: '#styled-system',
  hash: {className: true, cssVar: false},
  // csstype omits `-webkit-font-smoothing` from StandardProperties.
  utilities: {
    WebkitFontSmoothing: {values: {type: 'string'}},
  },
  outdir: 'styled-system',
  include: ['./src/**/*.css.ts'],
})
