import type {CSSProperties, ReactNode} from 'react'

import {css} from '../../styled-system/css'
import {token} from '../../styled-system/tokens'
import {semanticColors, type SemanticColorPath} from './semantic'

export type Scheme = 'light' | 'dark'

/** Partial runtime theme: semantic color overrides keyed by token path. */
export type Theme = Partial<Record<SemanticColorPath, string>>

export interface ThemeProviderProps {
  children?: ReactNode
  scheme?: Scheme
  theme?: Theme
}

/**
 * The CSS variable name behind a semantic color token, e.g.
 * `--sui-v4-colors-tone-primary-bg`. `token.var()` returns `var(--name)`.
 */
export function semanticVar(path: SemanticColorPath): string {
  return token.var(`colors.${path}`).slice('var('.length, -1)
}

/**
 * Resolves this version's semantic values for a scheme (plus overrides) to an
 * inline style of CSS variables. Because the values are assigned inline on the
 * provider element, they belong to THIS version's subtree even when another
 * version's stylesheet (with different `:root` defaults for the same variable
 * names) is loaded on the same page.
 */
export function themeToCssVars(scheme: Scheme, theme?: Theme): CSSProperties {
  const style: Record<string, string> = {}
  for (const path of Object.keys(semanticColors) as SemanticColorPath[]) {
    style[semanticVar(path)] = theme?.[path] ?? semanticColors[path][scheme]
  }
  return style as CSSProperties
}

const root = css({
  fontFamily: 'sans',
  color: 'fg.base',
  bg: 'bg.base',
})

export function ThemeProvider(props: ThemeProviderProps): ReactNode {
  const {children, scheme = 'light', theme} = props
  return (
    <div data-sui-root data-sui-scheme={scheme} className={root} style={themeToCssVars(scheme, theme)}>
      {children}
    </div>
  )
}
