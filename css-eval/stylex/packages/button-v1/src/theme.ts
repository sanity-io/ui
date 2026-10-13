import * as stylex from '@stylexjs/stylex'

import {button, tokens} from './tokens.stylex'

/**
 * A theme is a class name (content hash of its overrides) that re-assigns the
 * token variables for a subtree: `<div {...stylex.props(darkTheme)}>`.
 * Overrides are type-checked against the token group — unknown keys fail `tsc`.
 */
export const darkTheme = stylex.createTheme(tokens, {
  bg: '#13141b',
  fg: '#e6e8ee',
  focusRing: '#4e91fd',

  disabledFill: '#1d1f2a',
  disabledText: '#5a5f73',
  disabledBorder: '#2a2d3d',

  defaultFill: '#1d1f2a',
  defaultFillHover: '#2a2d3d',
  defaultFillActive: '#383c52',
  defaultOnFill: '#e6e8ee',
  defaultTint: '#1d1f2a',
  defaultTintActive: '#2a2d3d',
  defaultText: '#e6e8ee',
  defaultBorder: '#383c52',

  primaryFill: '#4e91fd',
  primaryFillHover: '#2276fc',
  primaryFillActive: '#1e61cd',
  primaryOnFill: '#0b1526',
  primaryTint: '#152849',
  primaryTintActive: '#1a3663',
  primaryText: '#7fb0fe',
  primaryBorder: '#4e91fd',

  positiveFill: '#43d675',
  positiveFillHover: '#3ab564',
  positiveFillActive: '#2f9552',
  positiveOnFill: '#07170d',
  positiveTint: '#102a19',
  positiveTintActive: '#153b22',
  positiveText: '#6fe39a',
  positiveBorder: '#43d675',

  cautionFill: '#fbd024',
  cautionFillHover: '#d9b31f',
  cautionFillActive: '#b7961b',
  cautionOnFill: '#1a1503',
  cautionTint: '#2b2608',
  cautionTintActive: '#3d350b',
  cautionText: '#fbd024',
  cautionBorder: '#d9b31f',

  criticalFill: '#f36458',
  criticalFillHover: '#f03e2f',
  criticalFillActive: '#cc3829',
  criticalOnFill: '#1d0806',
  criticalTint: '#2e1210',
  criticalTintActive: '#421a16',
  criticalText: '#f7918a',
  criticalBorder: '#f36458',
})

// `createTheme()` calls must be bound to a bare variable (compiler constraint),
// so each tone is its own const and the record is assembled afterwards.
const defaultTone = stylex.createTheme(button, {
  fill: tokens.defaultFill,
  fillHover: tokens.defaultFillHover,
  fillActive: tokens.defaultFillActive,
  onFill: tokens.defaultOnFill,
  tint: tokens.defaultTint,
  tintActive: tokens.defaultTintActive,
  text: tokens.defaultText,
  border: tokens.defaultBorder,
})

const primaryTone = stylex.createTheme(button, {
  fill: tokens.primaryFill,
  fillHover: tokens.primaryFillHover,
  fillActive: tokens.primaryFillActive,
  onFill: tokens.primaryOnFill,
  tint: tokens.primaryTint,
  tintActive: tokens.primaryTintActive,
  text: tokens.primaryText,
  border: tokens.primaryBorder,
})

const positiveTone = stylex.createTheme(button, {
  fill: tokens.positiveFill,
  fillHover: tokens.positiveFillHover,
  fillActive: tokens.positiveFillActive,
  onFill: tokens.positiveOnFill,
  tint: tokens.positiveTint,
  tintActive: tokens.positiveTintActive,
  text: tokens.positiveText,
  border: tokens.positiveBorder,
})

const cautionTone = stylex.createTheme(button, {
  fill: tokens.cautionFill,
  fillHover: tokens.cautionFillHover,
  fillActive: tokens.cautionFillActive,
  onFill: tokens.cautionOnFill,
  tint: tokens.cautionTint,
  tintActive: tokens.cautionTintActive,
  text: tokens.cautionText,
  border: tokens.cautionBorder,
})

const criticalTone = stylex.createTheme(button, {
  fill: tokens.criticalFill,
  fillHover: tokens.criticalFillHover,
  fillActive: tokens.criticalFillActive,
  onFill: tokens.criticalOnFill,
  tint: tokens.criticalTint,
  tintActive: tokens.criticalTintActive,
  text: tokens.criticalText,
  border: tokens.criticalBorder,
})

/** Tone → theme class over the `button` variable group. */
export const tones = {
  default: defaultTone,
  primary: primaryTone,
  positive: positiveTone,
  caution: cautionTone,
  critical: criticalTone,
}
