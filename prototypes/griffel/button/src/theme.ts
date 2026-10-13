import type {CSSProperties} from 'react'

/**
 * The button tones and modes of `@sanity/ui` (`ThemeColorStateToneKey` /
 * `ThemeColorButtonModeKey`), reduced to the subset the prototype styles.
 */
export const buttonTones = ['default', 'primary', 'positive', 'caution', 'critical'] as const
export const buttonModes = ['default', 'ghost', 'bleed'] as const

export type ButtonTone = (typeof buttonTones)[number]
export type ButtonMode = (typeof buttonModes)[number]

/** Per-tone color set. `fg`/`bg` are the filled (`mode="default"`) colors. */
export interface ToneColors {
  bg: string
  bgHover: string
  bgActive: string
  fg: string
  border: string
  /** Text color of the tone on the surrounding surface (`ghost` and `bleed` modes). */
  text: string
  /** Translucent hover/active backgrounds for `ghost` and `bleed`. */
  tintHover: string
  tintActive: string
}

/** The theme object a consumer provides. Every leaf becomes one CSS custom property. */
export interface Theme {
  font: {family: string; size: string; lineHeight: string; weight: string}
  radius: {1: string; 2: string; 3: string}
  space: {1: string; 2: string; 3: string; 4: string}
  focusRing: string
  surface: {bg: string; fg: string}
  tone: Record<ButtonTone, ToneColors>
}

/** Dash-joined paths to every string leaf of `T`: `'font-size' | 'tone-primary-bg' | …`. */
type Leaves<T, Prefix extends string = ''> = {
  [K in keyof T & (string | number)]: T[K] extends string
    ? `${Prefix}${K}`
    : Leaves<T[K], `${Prefix}${K}-`>
}[keyof T & (string | number)]

/**
 * Every CSS custom property name (without the `--sui-` prefix) the theme defines,
 * derived from {@link Theme} so the type can never drift from the runtime keys.
 */
export type TokenName = Leaves<Theme>

const PREFIX = '--sui-'

type TokenVar<K extends TokenName> = `var(${typeof PREFIX}${K})`

type TokenVars = {[K in TokenName as `${typeof PREFIX}${K}`]: string}

function flatten(prefix: string, value: unknown, out: Record<string, string>): void {
  if (typeof value === 'string') {
    out[`${PREFIX}${prefix}`] = value
    return
  }
  for (const [key, child] of Object.entries(value as Record<string, unknown>)) {
    flatten(prefix ? `${prefix}-${key}` : key, child, out)
  }
}

/**
 * Turns a {@link Theme} into the CSS custom properties `tokens` refer to — the
 * equivalent of vanilla-extract's `assignInlineVars(themeContract, theme)`. Apply
 * the result as the `style` of any element; everything inside picks the theme up.
 */
export function createThemeVars(theme: Theme): TokenVars & CSSProperties {
  const out: Record<string, string> = {}
  flatten('', theme, out)
  return out as unknown as TokenVars & CSSProperties
}

function tone(bg: string, fg: string, text: string): ToneColors {
  return {
    bg,
    bgHover: `color-mix(in oklab, ${bg} 88%, black)`,
    bgActive: `color-mix(in oklab, ${bg} 76%, black)`,
    fg,
    border: `color-mix(in oklab, ${bg} 80%, black)`,
    text,
    tintHover: `color-mix(in oklab, ${text} 10%, transparent)`,
    tintActive: `color-mix(in oklab, ${text} 18%, transparent)`,
  }
}

export const defaultTheme: Theme = {
  font: {
    family: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    size: '13px',
    lineHeight: '17px',
    weight: '500',
  },
  radius: {1: '2px', 2: '3px', 3: '6px'},
  space: {1: '4px', 2: '8px', 3: '12px', 4: '20px'},
  focusRing: '#2276fc',
  surface: {bg: '#ffffff', fg: '#121923'},
  tone: {
    default: tone('#f2f3f5', '#121923', '#121923'),
    primary: tone('#2276fc', '#ffffff', '#1b5bdc'),
    positive: tone('#3ab667', '#ffffff', '#1f7e45'),
    caution: tone('#f2b134', '#1e1a00', '#8a6400'),
    critical: tone('#e14b4b', '#ffffff', '#b32a2a'),
  },
}

export const darkTheme: Theme = {
  ...defaultTheme,
  surface: {bg: '#13141b', fg: '#e3e4e8'},
  tone: {
    default: tone('#2a2c38', '#e3e4e8', '#e3e4e8'),
    primary: tone('#4d8dff', '#0b1020', '#7fadff'),
    positive: tone('#4fc97e', '#07150d', '#8ddfa7'),
    caution: tone('#f5c04d', '#1e1a00', '#ffd97a'),
    critical: tone('#f06060', '#1e0606', '#ff9b9b'),
  },
}

/**
 * `tokens.X` is the typed `var(--sui-X)` reference styles use. Referencing a token
 * that does not exist is a type error. The values are plain strings that the build
 * step inlines into the generated CSS, so the theme is a CSS-variable contract
 * shared by every package version, not a class-name contract.
 */
export const tokens: {readonly [K in TokenName]: TokenVar<K>} = Object.fromEntries(
  Object.keys(createThemeVars(defaultTheme)).map((property) => [
    property.slice(PREFIX.length),
    `var(${property})`,
  ]),
) as {readonly [K in TokenName]: TokenVar<K>}
