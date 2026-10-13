import {makeStaticStyles, makeStyles, mergeClasses} from '@griffel/react'
import type {ReactNode} from 'react'

import {BUTTON_VERSION} from './Button'
import {createThemeVars, type Theme, tokens} from './theme'

/**
 * Global (non-atomic) CSS, the `globalStyle()` of vanilla-extract. Identical text
 * in two package versions produces the identical rule, so duplicates are inert.
 * The object form of `makeStaticStyles` does not nest, so at-rules use the string
 * form (compiled by stylis at build time like everything else).
 */
const useStaticStyles = makeStaticStyles(
  '@media (prefers-reduced-motion: reduce) { [data-ui="Button"] { transition-duration: 0s; } }',
)

const useStyles = makeStyles({
  root: {
    backgroundColor: tokens['surface-bg'],
    color: tokens['surface-fg'],
    fontFamily: tokens['font-family'],
  },
})

export interface ThemeProviderProps {
  theme: Theme
  children?: ReactNode
  className?: string
}

/**
 * Publishes a {@link Theme} as CSS custom properties on a wrapper element. Any
 * component version underneath reads the same `--sui-*` variables, which is what
 * makes the theme a stable contract across releases.
 */
export function ThemeProvider({theme, children, className}: ThemeProviderProps) {
  useStaticStyles()
  const classes = useStyles()

  return (
    <div
      data-ui="ThemeProvider"
      data-version={BUTTON_VERSION}
      className={mergeClasses(classes.root, className)}
      style={createThemeVars(theme)}
    >
      {children}
    </div>
  )
}
