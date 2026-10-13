import {createTheme, createThemeContract} from '@vanilla-extract/css'

/**
 * Theme contract: every leaf becomes a CSS variable whose *name* is a generated identifier, so
 * the variables are version-scoped exactly like class names. (A design system that wants
 * consumers to override tokens by hand would use `createGlobalThemeContract` with explicit
 * `--sui-*` names instead; those are then intentionally shared across versions.)
 *
 * 2.0.0 adds `space.gap` in the middle of the contract. With upstream's counter-based names
 * that renumbers every variable after it *and* both theme classes: 2.0.0's `lightTheme` gets
 * the name 1.0.0's `darkTheme` had.
 */
export const vars = createThemeContract({
  radius: {control: null},
  space: {inline: null, block: null, gap: null},
  font: {size: null, weight: null},
  color: {
    default: {bg: null, fg: null, border: null},
    primary: {bg: null, fg: null, border: null},
    positive: {bg: null, fg: null, border: null},
    caution: {bg: null, fg: null, border: null},
    critical: {bg: null, fg: null, border: null},
  },
})

export const lightTheme = createTheme(vars, {
  radius: {control: '6px'},
  space: {inline: '12px', block: '8px', gap: '8px'},
  font: {size: '13px', weight: '600'},
  color: {
    default: {bg: '#ffffff', fg: '#1f2126', border: '#c6cbd6'},
    primary: {bg: '#7d3cfc', fg: '#ffffff', border: '#652bd6'},
    positive: {bg: '#3ab667', fg: '#ffffff', border: '#2c9a54'},
    caution: {bg: '#f5b031', fg: '#1f2126', border: '#d4931b'},
    critical: {bg: '#f03e2f', fg: '#ffffff', border: '#c62d20'},
  },
})

export const darkTheme = createTheme(vars, {
  radius: {control: '6px'},
  space: {inline: '12px', block: '8px', gap: '8px'},
  font: {size: '13px', weight: '600'},
  color: {
    default: {bg: '#1b1d20', fg: '#f2f3f5', border: '#3c4049'},
    primary: {bg: '#9b6bff', fg: '#160b33', border: '#b58cff'},
    positive: {bg: '#49c87a', fg: '#0b2616', border: '#6ad291'},
    caution: {bg: '#f7c15c', fg: '#2b1f05', border: '#f9cd7b'},
    critical: {bg: '#f66a5e', fg: '#330a06', border: '#f88a80'},
  },
})
