import {expect, test} from 'vitest'

import {
  AVATAR_COLORS,
  AVATAR_SIZE,
  BG_PATTERNS,
  BORDER_STYLE,
  BORDER_WIDTH,
  BUTTON_MODES,
  CARD_TONES,
  CONTAINER,
  ELEMENT_TONES,
  FONT_CODE_SIZE,
  FONT_HEADING_SIZE,
  FONT_LABEL_SIZE,
  FONT_TEXT_SIZE,
  HUES,
  RADIUS,
  SHADOW,
  SPACE,
  TINTS,
} from './constants'

test('system export', () => {
  const _exports = {
    AVATAR_COLORS,
    AVATAR_SIZE,
    BG_PATTERNS,
    BORDER_STYLE,
    BORDER_WIDTH,
    BUTTON_MODES,
    CARD_TONES,
    CONTAINER,
    ELEMENT_TONES,
    FONT_CODE_SIZE,
    FONT_HEADING_SIZE,
    FONT_LABEL_SIZE,
    FONT_TEXT_SIZE,
    HUES,
    RADIUS,
    SHADOW,
    SPACE,
    TINTS,
  }

  // console.log(exports)
  expect(_exports).toBeDefined()
})
