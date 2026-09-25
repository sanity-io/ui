import {createVar, style, styleVariants} from '@vanilla-extract/css'

/**
 * The dark scheme covers the right side of the preview behind a diagonal cut,
 * like the "Auto" appearance preview in macOS System Settings shows both
 * schemes at once.
 */
const DARK_CLIP_PATH = 'polygon(58% 0, 100% 0, 100% 100%, 42% 100%)'

/** The thickness of a line of text — bold enough to survive a half-size preview */
const LINE = 4

/**
 * The colors a mockup paints with — only the ones the theme options change —
 * assigned per color scheme from the theme it previews
 */
export const colors = {
  bg: createVar(),
  fg: createVar(),
  mutedFg: createVar(),
  border: createVar(),
  accent: createVar(),
  avatar: createVar(),
  selectedBg: createVar(),
  selectedFg: createVar(),
  inputBg: createVar(),
  inputBorder: createVar(),
}

export const root = style({
  position: 'relative',
  aspectRatio: '16 / 9',
  overflow: 'hidden',
})

const studioBase = style({
  position: 'absolute',
  inset: 0,
  display: 'flex',
  flexDirection: 'column',
  background: colors.bg,
})

export const studio = styleVariants({
  light: [studioBase],
  dark: [studioBase, {clipPath: DARK_CLIP_PATH}],
})

export const navbar = style({
  flex: 'none',
  display: 'flex',
  alignItems: 'center',
  gap: 5,
  height: '18%',
  padding: '0 5%',
  borderBottom: `1px solid ${colors.border}`,
})

export const logo = style({
  flex: 'none',
  width: 8,
  height: 8,
  borderRadius: 2,
  background: colors.accent,
})

export const spacer = style({
  flex: 1,
})

export const avatar = style({
  flex: 'none',
  width: 8,
  height: 8,
  borderRadius: '50%',
  background: colors.avatar,
})

export const body = style({
  flex: 1,
  display: 'flex',
  minHeight: 0,
})

export const list = style({
  flex: 'none',
  display: 'flex',
  flexDirection: 'column',
  width: '36%',
  borderRight: `1px solid ${colors.border}`,
})

export const listRow = style({
  flex: 'none',
  display: 'flex',
  alignItems: 'center',
  height: '18%',
  padding: '0 9%',
  selectors: {
    "&[data-selected='true']": {
      background: colors.selectedBg,
    },
  },
})

export const pane = style({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  minWidth: 0,
})

export const form = style({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: 7,
  padding: '9% 8% 0',
  minHeight: 0,
  overflow: 'hidden',
})

export const field = style({
  flex: 'none',
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
})

export const input = style({
  height: 12,
  borderRadius: 3,
  background: colors.inputBg,
  boxShadow: `inset 0 0 0 1px ${colors.inputBorder}`,
})

export const footer = style({
  flex: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  height: '20%',
  padding: '0 8%',
  borderTop: `1px solid ${colors.border}`,
})

export const button = style({
  width: '32%',
  height: '50%',
  borderRadius: 3,
  background: colors.accent,
})

const lineBase = style({
  flex: 'none',
  height: LINE,
  borderRadius: LINE / 2,
})

/** A line of text, in one of the text colors — its width is set inline */
export const line = styleVariants({
  fg: [lineBase, {background: colors.fg}],
  muted: [lineBase, {background: colors.mutedFg}],
  selected: [lineBase, {background: colors.selectedFg}],
})
