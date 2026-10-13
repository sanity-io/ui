import {defineConfig} from '@pandacss/dev'

// An application config: its own prefix (so it can never collide with the
// library's `sui-v4-*` classes), its own small token set.
export default defineConfig({
  presets: ['@pandacss/preset-base'],
  preflight: false,
  include: ['./src/**/*.{ts,tsx}'],
  outdir: 'styled-system',
  jsxFramework: 'react',
  prefix: 'app',
  strictTokens: true,
  theme: {
    tokens: {
      colors: {
        ink: {value: '#1b1d27'},
        paper: {value: '#ffffff'},
        accent: {value: '#8e44ad'},
      },
      spacing: {
        1: {value: '0.25rem'},
        2: {value: '0.5rem'},
        4: {value: '1rem'},
      },
      radii: {
        md: {value: '0.5rem'},
      },
    },
  },
})
