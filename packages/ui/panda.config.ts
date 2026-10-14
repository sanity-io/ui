import {defineConfig, type Config} from '@pandacss/dev'

export default defineConfig({
  include: ['./src/**/*.css.ts'],
  importMap: '#styled-system',
  // Critical to ensure no class name collisions when more than one copy of UI is used on the same page
  hash: true,
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
