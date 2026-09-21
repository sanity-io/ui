import type {RootTheme, ThemeFontSize} from '@sanity/ui-fixed/theme'

// Icon sizes stay odd on purpose. The Safari wobble is a 1px snap while an
// odd-length spinner rotates; `round(1em, 2px)` in 4.2.1 lands on an even
// length and the snap goes away. Even sizes would hide the bug in 4.2.0 too.
// Metrics are the default text sizes scaled up so the same 1px snap still
// reads when a 16:9 capture is shown at 620px.

const SEARCH_TEXT_SIZE: ThemeFontSize = {
  ascenderHeight: 11,
  descenderHeight: 11,
  fontSize: 27,
  iconSize: 45,
  letterSpacing: 0,
  lineHeight: 41,
}

const LOADING_TEXT_SIZE: ThemeFontSize = {
  ascenderHeight: 13,
  descenderHeight: 13,
  fontSize: 33,
  iconSize: 55,
  letterSpacing: 0,
  lineHeight: 51,
}

export function createDemoTheme(theme: RootTheme): RootTheme {
  const font = theme.v2?.font

  if (!font) {
    throw new Error('Expected a v2 @sanity/ui theme')
  }

  font.text = {
    ...font.text,
    sizes: font.text.sizes.map((size, index) => {
      if (index === 1) return SEARCH_TEXT_SIZE
      if (index === 2) return LOADING_TEXT_SIZE
      return size
    }),
  }

  return theme
}
