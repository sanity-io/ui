import type {CSSProperties, ReactNode} from 'react'

import {type Tone, vars} from './theme.yak.ts'

/** The `--sui-*` property name behind a `var(--sui-*)` token reference */
function tokenProperty(reference: string): string {
  const match = /^var\((--sui-[a-z0-9-]+)\)$/.exec(reference)
  if (!match) throw new Error(`Not a token reference: ${reference}`)
  return match[1]
}

/**
 * Concrete values for every token in `vars` — the same shape, with the `var(--sui-*)` references
 * replaced by values. Adding a token to `vars` without a value here is a type error.
 */
export type Theme = TokenValues<typeof vars>

type TokenValues<T> = {
  [K in keyof T]: T[K] extends string ? string : TokenValues<T[K]>
}

export type Scheme = 'light' | 'dark'

interface ToneColors {
  bg: string
  fg: string
  border: string
  hoverBg: string
  pressedBg: string
  text: string
  tintBg: string
}

const lightTones: Record<Tone, ToneColors> = {
  default: {
    bg: '#ffffff',
    fg: '#262b36',
    border: '#cbd0d8',
    hoverBg: '#f2f3f5',
    pressedBg: '#e6e8ec',
    text: '#262b36',
    tintBg: '#f2f3f5',
  },
  primary: {
    bg: '#2276fc',
    fg: '#ffffff',
    border: '#1a5fd0',
    hoverBg: '#1d66db',
    pressedBg: '#1857bb',
    text: '#1a5fd0',
    tintBg: '#e6f0ff',
  },
  positive: {
    bg: '#2e9e5f',
    fg: '#ffffff',
    border: '#237a49',
    hoverBg: '#278a52',
    pressedBg: '#217546',
    text: '#237a49',
    tintBg: '#e5f6ec',
  },
  caution: {
    bg: '#f0a31a',
    fg: '#2b1d00',
    border: '#c48412',
    hoverBg: '#d99214',
    pressedBg: '#bf7f10',
    text: '#8a5c05',
    tintBg: '#fdf3df',
  },
  critical: {
    bg: '#e13c3c',
    fg: '#ffffff',
    border: '#b52e2e',
    hoverBg: '#c93333',
    pressedBg: '#ad2b2b',
    text: '#b52e2e',
    tintBg: '#fde9e9',
  },
}

const darkTones: Record<Tone, ToneColors> = {
  default: {
    bg: '#1f242d',
    fg: '#e6e8ec',
    border: '#3b4250',
    hoverBg: '#2a303b',
    pressedBg: '#343b48',
    text: '#e6e8ec',
    tintBg: '#2a303b',
  },
  primary: {
    bg: '#3f87ff',
    fg: '#ffffff',
    border: '#2d6fe0',
    hoverBg: '#3579eb',
    pressedBg: '#2b6ad4',
    text: '#7fb0ff',
    tintBg: '#1b2a45',
  },
  positive: {
    bg: '#3cb371',
    fg: '#06230f',
    border: '#2f8f5a',
    hoverBg: '#35a066',
    pressedBg: '#2e8d5a',
    text: '#7dd9a4',
    tintBg: '#15301f',
  },
  caution: {
    bg: '#f2b134',
    fg: '#2b1d00',
    border: '#c98f1f',
    hoverBg: '#e0a22c',
    pressedBg: '#cc9326',
    text: '#f7c96b',
    tintBg: '#332607',
  },
  critical: {
    bg: '#f04b4b',
    fg: '#ffffff',
    border: '#c53b3b',
    hoverBg: '#dc4343',
    pressedBg: '#c53b3b',
    text: '#ff8a8a',
    tintBg: '#3a1515',
  },
}

const baseTheme = {
  space: {0: '0px', 1: '4px', 2: '8px', 3: '12px', 4: '20px', 5: '32px'},
  radius: {0: '0px', 1: '3px', 2: '6px', 3: '12px'},
  font: {
    family: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
    size: '14px',
    lineHeight: '20px',
    weight: {regular: '400', medium: '500', semibold: '600'},
  },
  focusRing: {width: '2px', offset: '2px'},
} satisfies Omit<Theme, 'color'>

export const lightTheme: Theme = {
  ...baseTheme,
  color: {
    bg: '#ffffff',
    fg: '#262b36',
    border: '#cbd0d8',
    focusRing: '#2276fc',
    tone: lightTones,
  },
}

export const darkTheme: Theme = {
  ...baseTheme,
  color: {
    bg: '#13171f',
    fg: '#e6e8ec',
    border: '#3b4250',
    focusRing: '#7fb0ff',
    tone: darkTones,
  },
}

/**
 * Map a theme to `--sui-*` custom properties by walking `vars` and the theme in lockstep, so
 * the property names come from the single source of truth the compiled CSS also uses.
 */
export function themeToCustomProperties(theme: Theme): Record<string, string> {
  const out: Record<string, string> = {}
  const walk = (tokens: unknown, values: unknown) => {
    if (typeof tokens === 'string') {
      out[tokenProperty(tokens)] = String(values)
      return
    }
    for (const key of Object.keys(tokens as object)) {
      walk((tokens as Record<string, unknown>)[key], (values as Record<string, unknown>)[key])
    }
  }
  walk(vars, theme)
  return out
}

export interface ThemeProviderProps {
  theme?: Theme
  scheme?: Scheme
  children?: ReactNode
}

/**
 * Sets every `--sui-*` token on a wrapper element. Scoping the variables to an element (rather
 * than `:root`) is what lets several themes — and several library versions — coexist on a page.
 */
export function ThemeProvider({theme, scheme = 'light', children}: ThemeProviderProps) {
  const resolved = theme ?? (scheme === 'dark' ? darkTheme : lightTheme)
  const style: CSSProperties = {
    ...themeToCustomProperties(resolved),
    colorScheme: scheme,
    background: resolved.color.bg,
    color: resolved.color.fg,
    fontFamily: resolved.font.family,
  }
  return (
    <div data-ui="ThemeProvider" data-scheme={scheme} style={style}>
      {children}
    </div>
  )
}
