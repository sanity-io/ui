import {expect, test} from 'vitest'

import {
  AVATAR_COLORS,
  AVATAR_SIZE,
  type AvatarColor,
  type AvatarSize,
  BG_PATTERNS,
  type BgPattern,
  BORDER_STYLE,
  BORDER_WIDTH,
  type BorderStyle,
  type BorderWidth,
  BUTTON_MODES,
  type ButtonMode,
  CARD_TONES,
  type CardTone,
  CONTAINER,
  type ContainerWidth,
  ELEMENT_TONES,
  type ElementTone,
  FONT_CODE_SIZE,
  FONT_HEADING_SIZE,
  FONT_LABEL_SIZE,
  FONT_TEXT_SIZE,
  type FontCodeSize,
  type FontHeadingSize,
  type FontLabelSize,
  type FontTextSize,
  type Hue,
  HUES,
  RADIUS,
  type Radius,
  SHADOW,
  type Shadow,
  SPACE,
  type Space,
  type Tint,
  TINTS,
} from './system'

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

  const _types: {
    AVATAR_COLORS: AvatarColor
    AVATAR_SIZE: AvatarSize
    BG_PATTERNS: BgPattern
    BORDER_STYLE: BorderStyle
    BORDER_WIDTH: BorderWidth
    BUTTON_MODES: ButtonMode
    CARD_TONES: CardTone
    CONTAINER: ContainerWidth
    ELEMENT_TONES: ElementTone
    FONT_CODE_SIZE: FontCodeSize
    FONT_HEADING_SIZE: FontHeadingSize
    FONT_LABEL_SIZE: FontLabelSize
    FONT_TEXT_SIZE: FontTextSize
    HUES: Hue
    RADIUS: Radius
    SHADOW: Shadow
    SPACE: Space
    TINTS: Tint
  } = {} as any // eslint-disable-line @typescript-eslint/no-explicit-any

  // console.log(exports)
  expect(_exports).toBeDefined()
  expect(_types).toBeDefined()
})
