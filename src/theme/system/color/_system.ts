import {
  THEME_COLOR_AVATAR_COLORS,
  THEME_COLOR_BASE_TONES,
  THEME_COLOR_BLEND_MODES,
  THEME_COLOR_BUTTON_MODES,
  THEME_COLOR_INPUT_MODES,
  THEME_COLOR_INPUT_STATES,
  THEME_COLOR_STATES,
  THEME_COLOR_STATE_TONES,
} from './_constants'
import {ThemeColorMuted} from './_deprecated/muted'
import {ThemeColorSolid} from './_deprecated/solid'
import {ThemeColorSpot} from './_deprecated/spot'
import {ThemeColorAvatar} from './avatar'
import {ThemeColorBadge} from './badge'
import {ThemeColorBase} from './base'
import {ThemeColorButton} from './button'
import {ThemeColorCard} from './card'
import {ThemeColorInput} from './input'
import {ThemeColorKBD} from './kbd'
import {ThemeColorSelectable} from './selectable'
import {ThemeColorSyntax} from './syntax'

/**
 * @public
 */
export type ThemeColorSchemeKey = 'dark' | 'light'

/** @internal */
export type ThemeColorBlendModeKey = (typeof THEME_COLOR_BLEND_MODES)[number]

/** @internal */
export type ThemeColorBaseToneKey = (typeof THEME_COLOR_BASE_TONES)[number]

/** @internal */
export type ThemeColorButtonModeKey = (typeof THEME_COLOR_BUTTON_MODES)[number]

/** @internal */
export type ThemeColorStateKey = (typeof THEME_COLOR_STATES)[number]

/** @internal */
export type ThemeColorStateToneKey = (typeof THEME_COLOR_STATE_TONES)[number]

/** @internal */
export type ThemeColorInputModeKey = (typeof THEME_COLOR_INPUT_MODES)[number]

/** @internal */
export type ThemeColorInputStateKey = (typeof THEME_COLOR_INPUT_STATES)[number]

/** @internal */
export type ThemeColorAvatarColorKey = (typeof THEME_COLOR_AVATAR_COLORS)[number]

/**
 * @public
 * @deprecated Use `ThemeColorBaseToneKey` instead.
 */
export type ThemeColorName = ThemeColorBaseToneKey

/**
 * @public
 * @deprecated Use `ThemeColorBaseToneKey` instead.
 */
export type ThemeColorToneKey = ThemeColorBaseToneKey

/**
 * @public
 */
export interface ThemeColor {
  /** @internal */
  _blend?: ThemeColorBlendModeKey
  _dark?: boolean
  avatar?: ThemeColorAvatar
  badge?: ThemeColorBadge
  base: ThemeColorBase
  button: ThemeColorButton
  card: ThemeColorCard
  input: ThemeColorInput
  kbd?: ThemeColorKBD
  selectable?: ThemeColorSelectable
  syntax: ThemeColorSyntax

  /** @deprecated Use `_dark` instead */
  dark: boolean
  /** @deprecated */
  muted: ThemeColorMuted
  /** @deprecated */
  spot: ThemeColorSpot
  /** @deprecated */
  solid: ThemeColorSolid
}

/**
 * @public
 */
export type ThemeColorScheme = Record<ThemeColorBaseToneKey, ThemeColor>

/**
 * @public
 */
export type ThemeColorSchemes = Record<ThemeColorSchemeKey, ThemeColorScheme>
