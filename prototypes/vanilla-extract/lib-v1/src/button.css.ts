import {createVar, fallbackVar, keyframes, style} from '@vanilla-extract/css'
import {recipe, type RecipeVariants} from '@vanilla-extract/recipes'

import {vars} from './theme.css'

/** Set at runtime through `assignInlineVars` (the dynamic style). */
export const accent = createVar()

const toneBg = createVar()
const toneFg = createVar()
const toneBorder = createVar()

// Release 1.0.0 declares the loading overlay *before* the root — the layout of
// @sanity/ui 4.4.2's button.css.ts, where `buttonLoadingBox` was `_2mi48t0`.
export const loadingBox = style({
  position: 'absolute',
  inset: 0,
  zIndex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 'inherit',
  backgroundColor: 'inherit',
})

const spin = keyframes({
  from: {transform: 'rotate(0deg)'},
  to: {transform: 'rotate(360deg)'},
})

export const spinner = style({
  width: 14,
  height: 14,
  borderRadius: '50%',
  border: '2px solid currentColor',
  borderRightColor: 'transparent',
  animation: `${spin} 0.7s linear infinite`,
})

export const button = recipe({
  base: {
    appearance: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    position: 'relative',
    boxSizing: 'border-box',
    margin: 0,
    font: 'inherit',
    fontSize: vars.font.size,
    fontWeight: vars.font.weight,
    lineHeight: '1.2',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    userSelect: 'none',
    cursor: 'pointer',
    padding: `${vars.space.block} ${vars.space.inline}`,
    borderRadius: vars.radius.control,
    borderWidth: 1,
    borderStyle: 'solid',
    outline: `2px solid ${fallbackVar(accent, 'transparent')}`,
    outlineOffset: 2,
    selectors: {
      '&:focus-visible': {outlineColor: fallbackVar(accent, toneBorder)},
      '&:disabled': {cursor: 'default', opacity: 0.5},
    },
  },
  variants: {
    tone: {
      default: {vars: {[toneBg]: vars.color.default.bg, [toneFg]: vars.color.default.fg, [toneBorder]: vars.color.default.border}},
      primary: {vars: {[toneBg]: vars.color.primary.bg, [toneFg]: vars.color.primary.fg, [toneBorder]: vars.color.primary.border}},
      positive: {vars: {[toneBg]: vars.color.positive.bg, [toneFg]: vars.color.positive.fg, [toneBorder]: vars.color.positive.border}},
      caution: {vars: {[toneBg]: vars.color.caution.bg, [toneFg]: vars.color.caution.fg, [toneBorder]: vars.color.caution.border}},
      critical: {vars: {[toneBg]: vars.color.critical.bg, [toneFg]: vars.color.critical.fg, [toneBorder]: vars.color.critical.border}},
    },
    mode: {
      default: {backgroundColor: toneBg, color: toneFg, borderColor: toneBorder},
      ghost: {backgroundColor: 'transparent', color: toneBg, borderColor: toneBorder},
      bleed: {backgroundColor: 'transparent', color: toneBg, borderColor: 'transparent'},
    },
  },
  compoundVariants: [
    // A white "default" tone has no usable foreground when drawn as text only.
    {variants: {tone: 'default', mode: 'ghost'}, style: {color: vars.color.default.fg}},
    {variants: {tone: 'default', mode: 'bleed'}, style: {color: vars.color.default.fg}},
  ],
  defaultVariants: {tone: 'default', mode: 'default'},
})

export type ButtonVariants = NonNullable<RecipeVariants<typeof button>>
