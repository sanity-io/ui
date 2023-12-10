import {
  THEME_COLOR_AVATAR_COLORS,
  THEME_COLOR_BLEND_MODES,
  THEME_COLOR_BUTTON_MODES,
  THEME_COLOR_CARD_TONES,
  THEME_COLOR_INPUT_MODES,
  THEME_COLOR_INPUT_STATES,
  THEME_COLOR_SCHEMES,
  THEME_COLOR_STATES,
  THEME_COLOR_STATE_TONES,
} from './_constants'

/**
 * @public
 */
export type ThemeColorSchemeKey = (typeof THEME_COLOR_SCHEMES)[number]

/** @public */
export type ThemeColorBlendModeKey = (typeof THEME_COLOR_BLEND_MODES)[number]

/** @public */
export type ThemeColorCardToneKey = (typeof THEME_COLOR_CARD_TONES)[number]

/** @public */
export type ThemeColorButtonModeKey = (typeof THEME_COLOR_BUTTON_MODES)[number]

/** @public */
export type ThemeColorStateKey = (typeof THEME_COLOR_STATES)[number]

/** @public */
export type ThemeColorStateToneKey = (typeof THEME_COLOR_STATE_TONES)[number]

/** @public */
export type ThemeColorInputModeKey = (typeof THEME_COLOR_INPUT_MODES)[number]

/** @public */
export type ThemeColorInputStateKey = (typeof THEME_COLOR_INPUT_STATES)[number]

/** @public */
export type ThemeColorAvatarColorKey = (typeof THEME_COLOR_AVATAR_COLORS)[number]
