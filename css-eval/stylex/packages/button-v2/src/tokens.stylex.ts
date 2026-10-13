import * as stylex from '@stylexjs/stylex'

/**
 * Theme tokens as CSS custom properties. `defineVars` emits
 * `:root, .<group> { --<hash>: <value> }` and returns `var(--<hash>)` references
 * that are type-checked wherever they are used.
 *
 * Must live in a `*.stylex.ts` file (StyleX resolves these imports at compile time).
 */
export const tokens = stylex.defineVars({
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  fontSize1: '13px',
  lineHeight1: '17px',
  fontWeight: '600',

  radius1: '2px',
  radius2: '4px',
  radius3: '6px',

  space1: '4px',
  space2: '8px',
  space3: '14px',
  space4: '16px',

  bg: '#ffffff',
  fg: '#121923',
  focusRing: '#2276fc',

  disabledFill: '#f2f3f5',
  disabledText: '#b6b9c3',
  disabledBorder: '#e3e4e8',

  // tone palettes — `<tone><Role>`; roles mirror @sanity/ui's card color states
  defaultFill: '#f2f3f5',
  defaultFillHover: '#e3e4e8',
  defaultFillActive: '#d4d6dc',
  defaultOnFill: '#121923',
  defaultTint: '#f2f3f5',
  defaultTintActive: '#e3e4e8',
  defaultText: '#121923',
  defaultBorder: '#d4d6dc',

  primaryFill: '#2276fc',
  primaryFillHover: '#1e61cd',
  primaryFillActive: '#1a4d9e',
  primaryOnFill: '#ffffff',
  primaryTint: '#e8f0ff',
  primaryTintActive: '#d1e1fe',
  primaryText: '#1e61cd',
  primaryBorder: '#2276fc',

  positiveFill: '#3ab564',
  positiveFillHover: '#2f9552',
  positiveFillActive: '#267a43',
  positiveOnFill: '#ffffff',
  positiveTint: '#e6f8ec',
  positiveTintActive: '#cdf1d9',
  positiveText: '#2f9552',
  positiveBorder: '#3ab564',

  cautionFill: '#fbd024',
  cautionFillHover: '#d9b31f',
  cautionFillActive: '#b7961b',
  cautionOnFill: '#121923',
  cautionTint: '#fff8d6',
  cautionTintActive: '#fff0ad',
  cautionText: '#8a6f0f',
  cautionBorder: '#d9b31f',

  criticalFill: '#f03e2f',
  criticalFillHover: '#cc3829',
  criticalFillActive: '#a83125',
  criticalOnFill: '#ffffff',
  criticalTint: '#fdeae8',
  criticalTintActive: '#fbd4d1',
  criticalText: '#cc3829',
  criticalBorder: '#f03e2f',
})

/**
 * The variables a Button reads. Tones are `createTheme()` overrides of this group,
 * which is how @sanity/ui's `--card-*` variables work today — but here each tone
 * class is a content hash, not a counter.
 */
export const button = stylex.defineVars({
  fill: tokens.defaultFill,
  fillHover: tokens.defaultFillHover,
  fillActive: tokens.defaultFillActive,
  onFill: tokens.defaultOnFill,
  tint: tokens.defaultTint,
  tintActive: tokens.defaultTintActive,
  text: tokens.defaultText,
  border: tokens.defaultBorder,
})
