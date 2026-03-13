import {expect, test} from 'vitest'

import {
  type AvatarColor,
  type AvatarSize,
  type BgPattern,
  type BorderStyle,
  type BorderWidth,
  type ButtonMode,
  type CardTone,
  type ContainerWidth,
  type ElementTone,
  type FontCodeSize,
  type FontHeadingSize,
  type FontLabelSize,
  type FontTextSize,
  // type Hue,
  type Radius,
  type Shadow,
  type Space,
  // type Tint,
} from './index'

test('types export', () => {
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
    // HUES: Hue
    RADIUS: Radius
    SHADOW: Shadow
    SPACE: Space
    // TINTS: Tint
  } = {} as any // eslint-disable-line @typescript-eslint/no-explicit-any

  expect(_types).toBeDefined()
})
