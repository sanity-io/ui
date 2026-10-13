import {defineConfig, defineRecipe, defineSemanticTokens, defineTokens} from '@pandacss/dev'

import pkg from './package.json' with {type: 'json'}
import {hues} from './src/theme/palette'
import {semanticColors} from './src/theme/semantic'

// Prefix keyed to the library identity and MAJOR version, as Panda's style
// isolation guide recommends for libraries that ship a static stylesheet. Patch
// and minor versions (4.4.3 and 4.4.4 in this eval) deliberately share it, so
// the eval exercises the hard case: same prefix, changed styles.
const major = pkg.version.split('.')[0]
const prefix = `sui-v${major}`

const colorTokens: Record<string, Record<string, {value: string}>> = {}
for (const [hue, tints] of Object.entries(hues)) {
  colorTokens[hue] = {}
  for (const [tint, value] of Object.entries(tints)) {
    colorTokens[hue][tint] = {value}
  }
}

// Semantic tokens become CSS variables with light (`base`) and dark values; the
// dark values are emitted under the `_dark` condition selector defined below.
const semanticColorTokens: Record<string, unknown> = {}
for (const [path, {light, dark}] of Object.entries(semanticColors)) {
  let cursor: Record<string, unknown> = semanticColorTokens
  const segments = path.split('.')
  for (const segment of segments.slice(0, -1)) {
    cursor[segment] ??= {}
    cursor = cursor[segment] as Record<string, unknown>
  }
  cursor[segments[segments.length - 1]!] = {value: {base: light, _dark: dark}}
}

// NEGATIVE CONTROL. A *config* recipe produces name-addressed classes
// (`<prefix>-<hash("badge")>`, `<prefix>-<hash("badge--tone_primary")>`), not
// content-addressed ones. v2 changes the padding of this recipe to demonstrate
// that such classes DO collide across versions that share a prefix. The Button
// uses an atomic recipe (`cva`) instead, which is safe.
const badge = defineRecipe({
  className: 'badge',
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    fontFamily: 'sans',
    fontSize: '0',
    fontWeight: 'medium',
    lineHeight: 'tight',
    paddingBlock: '1',
    paddingInline: '2',
    borderRadius: '1',
    color: 'tone.default.fg',
    bg: 'tone.default.bg',
  },
  variants: {
    tone: {
      default: {},
      primary: {color: 'tone.primary.fg', bg: 'tone.primary.bg'},
      critical: {color: 'tone.critical.fg', bg: 'tone.critical.bg'},
    },
  },
  defaultVariants: {tone: 'default'},
})

export default defineConfig({
  // Only the utilities/conditions preset: a design system owns its own tokens.
  presets: ['@pandacss/preset-base'],
  // A library must not ship a global reset into the host page.
  preflight: false,
  include: ['./src/**/*.{ts,tsx}'],
  outdir: 'styled-system',
  jsxFramework: 'react',
  // Objective 1: content-addressed, short class names. The hash input is the
  // readable atomic name (`cond:prop_value`), see the report for the source.
  // CSS variable names stay readable (`--sui-v4-colors-tone-primary-bg`): they
  // are the library's theming contract. `SUI_PANDA_HASH=0` switches to the
  // readable (unhashed) class names for the size comparison in the report.
  hash: process.env.SUI_PANDA_HASH === '0' ? false : {className: true, cssVar: false},
  prefix,
  // Objective 2: only tokens (or explicit `[arbitrary]` escapes) type-check.
  strictTokens: true,
  strictPropertyValues: true,
  // Emit every variant of config recipes, since consumers never run Panda.
  staticCss: {recipes: '*'},
  conditions: {
    extend: {
      // Dark scheme is opted into by the ThemeProvider element, not by a global class.
      dark: '[data-sui-scheme=dark] &',
    },
  },
  theme: {
    tokens: defineTokens({
      colors: colorTokens,
      fonts: {
        sans: {value: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"},
      },
      fontSizes: {
        0: {value: '0.8125rem'},
        1: {value: '1rem'},
        2: {value: '1.1875rem'},
      },
      fontWeights: {
        regular: {value: '400'},
        medium: {value: '500'},
        semibold: {value: '600'},
        bold: {value: '700'},
      },
      lineHeights: {
        tight: {value: '1.1875rem'},
      },
      spacing: {
        0: {value: '0'},
        1: {value: '0.25rem'},
        2: {value: '0.5rem'},
        3: {value: '0.75rem'},
        4: {value: '1rem'},
        5: {value: '1.25rem'},
      },
      radii: {
        0: {value: '0'},
        1: {value: '0.1875rem'},
        2: {value: '0.375rem'},
        3: {value: '0.5625rem'},
        full: {value: '9999px'},
      },
      durations: {
        fast: {value: '100ms'},
      },
    }),
    semanticTokens: defineSemanticTokens({
      colors: semanticColorTokens as never,
    }),
    recipes: {badge},
  },
})
