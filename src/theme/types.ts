import type {ColorHues, ColorTint} from '@sanity/color'

import type {
  AVATAR_COLORS,
  AVATAR_SIZE,
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
  HUES,
  RADIUS,
  SHADOW,
  SPACE,
  TINTS,
} from './constants'

/** @public */
export type Hue = (typeof HUES)[number]

/** @public */
export type Tint = (typeof TINTS)[number]

/** @public */
export type AvatarColor = (typeof AVATAR_COLORS)[number]

/** @public */
export type ColorTokenOpacityValue = `0` | `0.${number}` | `1`

/** @public */
export type ColorToken =
  | `inherit`
  | `black`
  | `black/${ColorTokenOpacityValue}`
  | `white`
  | `white/${ColorTokenOpacityValue}`
  | `${Hue}-${Tint}`
  | `${Hue}-${Tint}/${ColorTokenOpacityValue}`
  | `${Hue}-${Tint} ${number}%`
  | `${Tint}`
  | `${Tint}/${ColorTokenOpacityValue}`
  | `${Tint} ${number}%`

/** @public */
export interface ResolvedColorToken {
  color: {type: 'inherit'} | {type: 'black' | 'white'} | {type: 'hue'; hue: Hue; tint: Tint}
  opacity: number
  mix: number
}

/** @public */
export type ColorTokens = Record<'*' | CardTone, CardColorTokens>

/** @public */
export interface Tokens {
  color: ColorTokens
}

/** @public */
export type PartialTokens<T> = T extends [ColorToken, ColorToken]
  ? T
  : T extends {} // eslint-disable-line @typescript-eslint/no-empty-object-type
    ? {
        [P in keyof T]?: PartialTokens<T[P]>
      }
    : T

/**
 * Theme color values are tuples of [light, dark] color tokens.
 *
 * @public
 */
export type ColorValue = [ColorToken, ColorToken]

/** @public */
export interface AvatarColorProperties {
  _hue: Hue
  bg: ColorValue
  fg: ColorValue
}

/** @public */
export type AvatarsColor = Record<AvatarColor, AvatarColorProperties>

/** @public */
export interface ElementColorTokens {
  _hue: Hue
  bg: {
    0: ColorValue
    4: ColorValue
  }
  border: {
    0: ColorValue
    4: ColorValue
  }
  fg: {
    0: ColorValue
    4: ColorValue
  }
}

/** @public */
export type ElementsColorTokens = Record<'*' | ElementTone, ElementColorTokens>

/** @public */
export type ColorVariant = (typeof COLOR_VARIANTS)[number]

/** @public */
export interface CardColorTokens {
  _hue: Hue
  avatar: AvatarsColor
  backdrop: ColorValue
  code: {
    bg: ColorValue
    fg: ColorValue
    token: {
      atrule: ColorValue
      attrName: ColorValue
      attrValue: ColorValue
      attribute: ColorValue
      boolean: ColorValue
      builtin: ColorValue
      cdata: ColorValue
      char: ColorValue
      class: ColorValue
      className: ColorValue
      comment: ColorValue
      constant: ColorValue
      deleted: ColorValue
      doctype: ColorValue
      entity: ColorValue
      function: ColorValue
      hexcode: ColorValue
      id: ColorValue
      important: ColorValue
      inserted: ColorValue
      keyword: ColorValue
      number: ColorValue
      operator: ColorValue
      prolog: ColorValue
      property: ColorValue
      pseudoClass: ColorValue
      pseudoElement: ColorValue
      punctuation: ColorValue
      regex: ColorValue
      selector: ColorValue
      string: ColorValue
      symbol: ColorValue
      tag: ColorValue
      unit: ColorValue
      url: ColorValue
      variable: ColorValue
    }
  }
  focusRing: ColorValue
  link: {
    fg: ColorValue
  }
  shadow: {
    outline: ColorValue
    umbra: ColorValue
    penumbra: ColorValue
    ambient: ColorValue
  }
  skeleton: {
    from: ColorValue
    to: ColorValue
  }
  variant: Record<ColorVariant, ElementsColorTokens>
}

/** @public */
export type Color = Record<CardTone, CardColorTokens>

/** @public */
export interface Input {
  checkbox: {
    size: number
    focusRing: FocusRing
  }
  radio: {
    size: number
    markSize: number
    focusRing: FocusRing
  }
  switch: {
    width: number
    height: number
    padding: number
    transitionDurationMs: number
    transitionTimingFunction: string
    focusRing: FocusRing
  }
  border: {
    width: number
  }
  select: {
    focusRing: FocusRing
  }
  text: {
    focusRing: FocusRing
  }
}

/** @public */
export type ColorScheme = (typeof COLOR_SCHEMES)[number]

/** @public */
export type CardTone = (typeof CARD_TONES)[number]

/** @public */
export type ElementTone = (typeof ELEMENT_TONES)[number]

/** @public */
export type ButtonMode = (typeof BUTTON_MODES)[number]

/** @public */
export interface ThemeAvatar {
  sizes: {
    /** Spacing between avatars in an <AvatarStack> component (px) */
    distance: number
    /** Diameter of the avatar (px) */
    size: number
  }[]
  focusRing: FocusRing
}

/** @public */
export type BoxShadow = [
  // offsetX, offsetY, blurRadius, spreadRadius
  number,
  number,
  number,
  number,
]

/** @public */
export interface ShadowProperties {
  umbra: BoxShadow
  penumbra: BoxShadow
  ambient: BoxShadow
}

/** @public */
export interface Layer {
  dialog: {zOffset: number}
  popover: {zOffset: number}
  tooltip: {zOffset: number}
}

/** @public */
export interface FontWeights {
  regular: number
  medium: number
  semibold: number
  bold: number
}

/** @public */
export interface FocusRing {
  offset: number
  width: number
}

/** @public */
export type AvatarSize = (typeof AVATAR_SIZE)[number]

/** @public */
export type ContainerScale = (typeof CONTAINER_SCALE)[number]

/** @public */
export type ContainerWidth = (typeof CONTAINER)[number]

/** @public */
export type Radius = (typeof RADIUS)[number] // | 'full'

/** @public */
export type Space = (typeof SPACE)[number]

/** @public */
export type FontWeight = 'regular' | 'medium' | 'semibold' | 'bold'

/** @public */
export type FontCodeSize = (typeof FONT_CODE_SIZE)[number]

/** @public */
export type FontHeadingSize = (typeof FONT_HEADING_SIZE)[number]

/** @public */
export type FontLabelSize = (typeof FONT_LABEL_SIZE)[number]

/** @public */
export type FontTextSize = (typeof FONT_TEXT_SIZE)[number]

/** @public */
export type Shadow = (typeof SHADOW)[number]

/** @public */
export type ThemeOptions = PartialTokens<Tokens>

/** @public */
export interface Palette {
  black: ColorTint
  white: ColorTint
  hues: ColorHues
}

/** @public */
export interface FontSize {
  ascenderHeight: number
  descenderHeight: number
  fontSize: number
  iconSize: number
  letterSpacing: number
  lineHeight: number
  customIconSize: number
}

/** @public */
export interface Font {
  family: string
  featureSettings?: string
  weight: FontWeights
  scale: FontSize[]
}

/** @public */
export interface Fonts {
  code: Font
  heading: Font
  label: Font
  text: Font
}

/** @public */
export interface Theme {
  _version: 3
  _tokens: Tokens
  avatar: ThemeAvatar
  button: {
    border: {width: number}
    focusRing: FocusRing
    textWeight: FontWeight
  }
  card: {
    border: {width: number}
    focusRing: FocusRing
    shadow: {outline: number}
  }
  color: Color
  container: number[]
  font: Fonts
  input: Input
  layer: Layer
  media: number[]
  palette: Palette
  radius: Record<Radius, number>
  shadow: Record<Shadow, ShadowProperties | undefined>
  space: Record<Space, number>
}
