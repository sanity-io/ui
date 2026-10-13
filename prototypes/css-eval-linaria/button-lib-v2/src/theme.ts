import {css} from '@linaria/core'

/**
 * Token contract: every design token is a CSS custom property. The object is
 * the single source of truth for token *names*; themes assign *values*.
 */
export const tokens = {
  color: {
    bg: '--sui-color-bg',
    fg: '--sui-color-fg',
    border: '--sui-color-border',
    focusRing: '--sui-color-focus-ring',
  },
  tone: {
    default: {
      bg: '--sui-tone-default-bg',
      bgHover: '--sui-tone-default-bg-hover',
      fg: '--sui-tone-default-fg',
      border: '--sui-tone-default-border',
      text: '--sui-tone-default-text',
    },
    brand: {
      bg: '--sui-tone-brand-bg',
      bgHover: '--sui-tone-brand-bg-hover',
      fg: '--sui-tone-brand-fg',
      border: '--sui-tone-brand-border',
      text: '--sui-tone-brand-text',
    },
    primary: {
      bg: '--sui-tone-primary-bg',
      bgHover: '--sui-tone-primary-bg-hover',
      fg: '--sui-tone-primary-fg',
      border: '--sui-tone-primary-border',
      text: '--sui-tone-primary-text',
    },
    positive: {
      bg: '--sui-tone-positive-bg',
      bgHover: '--sui-tone-positive-bg-hover',
      fg: '--sui-tone-positive-fg',
      border: '--sui-tone-positive-border',
      text: '--sui-tone-positive-text',
    },
    caution: {
      bg: '--sui-tone-caution-bg',
      bgHover: '--sui-tone-caution-bg-hover',
      fg: '--sui-tone-caution-fg',
      border: '--sui-tone-caution-border',
      text: '--sui-tone-caution-text',
    },
    critical: {
      bg: '--sui-tone-critical-bg',
      bgHover: '--sui-tone-critical-bg-hover',
      fg: '--sui-tone-critical-fg',
      border: '--sui-tone-critical-border',
      text: '--sui-tone-critical-text',
    },
  },
  radius: {
    1: '--sui-radius-1',
    2: '--sui-radius-2',
  },
  space: {
    2: '--sui-space-2',
    3: '--sui-space-3',
  },
  font: {
    size1: '--sui-font-size-1',
    family: '--sui-font-family',
  },
} as const

type Leaves<T> = T extends string ? T : {[K in keyof T]: Leaves<T[K]>}[keyof T]

/** Union of every token name (`--sui-...`). */
export type TokenName = Leaves<typeof tokens>

/**
 * `var()` reference to a token. Only accepts names from the contract, so a
 * typo like `v('--sui-color-background')` is a compile error.
 */
export function v<T extends TokenName>(token: T): `var(${T})` {
  return `var(${token})`
}

/** A theme must assign every token exactly once. */
export type ThemeValues = Record<TokenName, string>

function declarations(values: ThemeValues): string {
  return Object.entries(values)
    .map(([name, value]) => `${name}: ${value};`)
    .join('\n')
}

export const lightTheme: ThemeValues = {
  '--sui-color-bg': '#ffffff',
  '--sui-color-fg': '#1f2430',
  '--sui-color-border': '#d3d8e0',
  '--sui-color-focus-ring': '#3b82f6',
  '--sui-tone-default-bg': '#f0f2f5',
  '--sui-tone-default-bg-hover': '#e2e6ec',
  '--sui-tone-default-fg': '#1f2430',
  '--sui-tone-default-border': '#c5ccd6',
  '--sui-tone-default-text': '#1f2430',
  '--sui-tone-brand-bg': '#f03e2f',
  '--sui-tone-brand-bg-hover': '#d12e20',
  '--sui-tone-brand-fg': '#ffffff',
  '--sui-tone-brand-border': '#d12e20',
  '--sui-tone-brand-text': '#b4261a',
  // v2: primary moved from blue to purple
  '--sui-tone-primary-bg': '#7c3aed',
  '--sui-tone-primary-bg-hover': '#6d28d9',
  '--sui-tone-primary-fg': '#ffffff',
  '--sui-tone-primary-border': '#6d28d9',
  '--sui-tone-primary-text': '#6d28d9',
  '--sui-tone-positive-bg': '#3ab667',
  '--sui-tone-positive-bg-hover': '#2e9a56',
  '--sui-tone-positive-fg': '#ffffff',
  '--sui-tone-positive-border': '#2e9a56',
  '--sui-tone-positive-text': '#1f7a40',
  '--sui-tone-caution-bg': '#fbd024',
  '--sui-tone-caution-bg-hover': '#e3b813',
  '--sui-tone-caution-fg': '#3b2f00',
  '--sui-tone-caution-border': '#e3b813',
  '--sui-tone-caution-text': '#8a6d00',
  '--sui-tone-critical-bg': '#f03e2f',
  '--sui-tone-critical-bg-hover': '#d12e20',
  '--sui-tone-critical-fg': '#ffffff',
  '--sui-tone-critical-border': '#d12e20',
  '--sui-tone-critical-text': '#b4261a',
  '--sui-radius-1': '3px',
  // v2: buttons became pills
  '--sui-radius-2': '999px',
  '--sui-space-2': '8px',
  '--sui-space-3': '12px',
  '--sui-font-size-1': '13px',
  '--sui-font-family': 'Inter, system-ui, sans-serif',
}

export const darkTheme: ThemeValues = {
  ...lightTheme,
  '--sui-color-bg': '#13141b',
  '--sui-color-fg': '#e6e8ee',
  '--sui-color-border': '#2f3340',
  '--sui-tone-default-bg': '#262a36',
  '--sui-tone-default-bg-hover': '#333848',
  '--sui-tone-default-fg': '#e6e8ee',
  '--sui-tone-default-border': '#3a4050',
  '--sui-tone-default-text': '#e6e8ee',
  '--sui-tone-brand-text': '#ff8a7e',
  '--sui-tone-primary-text': '#c4b5fd',
  '--sui-tone-positive-text': '#6fd394',
  '--sui-tone-caution-text': '#f5d45a',
  '--sui-tone-critical-text': '#ff8a7e',
}

/**
 * Theme scopes are plain classes that set the token variables. `declarations`
 * runs at build time inside the wyw-in-js evaluator, so the CSS output holds
 * literal `--sui-*: value;` lines and nothing is left for the browser to do.
 */
export const themeLight = css`
  ${declarations(lightTheme)}
  background: ${v(tokens.color.bg)};
  color: ${v(tokens.color.fg)};
  font-family: ${v(tokens.font.family)};
`

export const themeDark = css`
  ${declarations(darkTheme)}
  background: ${v(tokens.color.bg)};
  color: ${v(tokens.color.fg)};
  font-family: ${v(tokens.font.family)};
`
