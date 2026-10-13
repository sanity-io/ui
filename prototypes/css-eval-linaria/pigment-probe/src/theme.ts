import {css} from '@pigment-css/react'

/** Same token contract as the Linaria prototype, as CSS custom properties. */
export const tokens = {
  color: {bg: '--sui-color-bg', fg: '--sui-color-fg', border: '--sui-color-border', focusRing: '--sui-color-focus-ring'},
  tone: {
    default: {bg: '--sui-tone-default-bg', bgHover: '--sui-tone-default-bg-hover', fg: '--sui-tone-default-fg', border: '--sui-tone-default-border', text: '--sui-tone-default-text'},
    primary: {bg: '--sui-tone-primary-bg', bgHover: '--sui-tone-primary-bg-hover', fg: '--sui-tone-primary-fg', border: '--sui-tone-primary-border', text: '--sui-tone-primary-text'},
    positive: {bg: '--sui-tone-positive-bg', bgHover: '--sui-tone-positive-bg-hover', fg: '--sui-tone-positive-fg', border: '--sui-tone-positive-border', text: '--sui-tone-positive-text'},
    caution: {bg: '--sui-tone-caution-bg', bgHover: '--sui-tone-caution-bg-hover', fg: '--sui-tone-caution-fg', border: '--sui-tone-caution-border', text: '--sui-tone-caution-text'},
    critical: {bg: '--sui-tone-critical-bg', bgHover: '--sui-tone-critical-bg-hover', fg: '--sui-tone-critical-fg', border: '--sui-tone-critical-border', text: '--sui-tone-critical-text'},
  },
  radius: {1: '--sui-radius-1', 2: '--sui-radius-2'},
  space: {2: '--sui-space-2', 3: '--sui-space-3'},
  font: {size1: '--sui-font-size-1', family: '--sui-font-family'},
} as const

type Leaves<T> = T extends string ? T : {[K in keyof T]: Leaves<T[K]>}[keyof T]
export type TokenName = Leaves<typeof tokens>
export type ThemeValues = Record<TokenName, string>

export function v<T extends TokenName>(token: T): `var(${T})` {
  return `var(${token})`
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
  '--sui-tone-primary-bg': '#2276fc',
  '--sui-tone-primary-bg-hover': '#1a5fd0',
  '--sui-tone-primary-fg': '#ffffff',
  '--sui-tone-primary-border': '#1a5fd0',
  '--sui-tone-primary-text': '#1a5fd0',
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
  '--sui-radius-2': '6px',
  '--sui-space-2': '8px',
  '--sui-space-3': '12px',
  '--sui-font-size-1': '13px',
  '--sui-font-family': 'Inter, system-ui, sans-serif',
}

// Pigment's `css` takes style objects, so the theme scope is the token map itself.
export const themeLight = css({
  ...lightTheme,
  background: v(tokens.color.bg),
  color: v(tokens.color.fg),
  fontFamily: v(tokens.font.family),
})
