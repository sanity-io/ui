import type {
  _BUTTON_STATES,
  _CODE_TOKEN_KEYS,
  _INPUT_VALIDITY,
  AVATAR_COLORS,
  AVATAR_SIZE,
  BG_PATTERNS,
  BORDER_STYLE,
  BORDER_WIDTH,
  BUTTON_MODES,
  CARD_TONES,
  COLOR_SCHEMES,
  COLOR_VARIANTS,
  CONTAINER,
  CONTAINER_SCALE,
  ELEMENT_TONES,
  FONT_CODE_SIZE,
  FONT_HEADING_SIZE,
  FONT_LABEL_SIZE,
  FONT_TEXT_SIZE,
  FONT_WEIGHT,
  RADIUS,
  SHADOW,
  SPACE,
} from './constants'

/** @internal */
export type _ButtonState = (typeof _BUTTON_STATES)[number]

/** @internal */
export type _CodeTokenKey = (typeof _CODE_TOKEN_KEYS)[number]

/** @internal */
export type _InputValidity = (typeof _INPUT_VALIDITY)[number]

export {
  /** @public */
  type ColorHueKey as Hue,
  /** @public */
  type ColorTintKey as Tint,
} from '@sanity/color'

/** @public */
export type AvatarColor = (typeof AVATAR_COLORS)[number]

/** @public */
export type AvatarSize = (typeof AVATAR_SIZE)[number]

/** @beta */
export type BgPattern = (typeof BG_PATTERNS)[number]

/** @public */
export type BorderStyle = (typeof BORDER_STYLE)[number]

/** @public */
export type BorderWidth = (typeof BORDER_WIDTH)[number]

/** @public */
export type ButtonMode = (typeof BUTTON_MODES)[number]

/** @public */
export type CardTone = (typeof CARD_TONES)[number]

/** @public */
export type ColorScheme = (typeof COLOR_SCHEMES)[number]

/** @public */
export type ColorVariant = (typeof COLOR_VARIANTS)[number]

/** @public */
export type ContainerScale = (typeof CONTAINER_SCALE)[number]

/** @public */
export type ContainerWidth = (typeof CONTAINER)[number]

/** @public */
export type ElementTone = (typeof ELEMENT_TONES)[number]

/** @public */
export type FontCodeSize = (typeof FONT_CODE_SIZE)[number]

/** @public */
export type FontHeadingSize = (typeof FONT_HEADING_SIZE)[number]

/** @public */
export type FontLabelSize = (typeof FONT_LABEL_SIZE)[number]

/** @public */
export type FontTextSize = (typeof FONT_TEXT_SIZE)[number]

/** @public */
export type FontWeight = (typeof FONT_WEIGHT)[number]

/** @public */
export type Radius = (typeof RADIUS)[number]

/** @public */
export type Shadow = (typeof SHADOW)[number]

/** @public */
export type Space = (typeof SPACE)[number]
