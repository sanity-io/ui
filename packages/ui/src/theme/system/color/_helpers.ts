import {COLOR_HUES, COLOR_TINTS, ColorHueKey, ColorTintKey} from '@sanity/color'

import {THEME_COLOR_BLEND_MODES, THEME_COLOR_BUTTON_MODES} from './_constants'
import {ThemeColorBlendModeKey, ThemeColorButtonModeKey} from './_system'

/** @internal */
export function isColorBlendModeValue(str: string): str is ThemeColorBlendModeKey {
  return THEME_COLOR_BLEND_MODES.includes(str as ThemeColorBlendModeKey)
}

/** @internal */
export function isColorHueKey(str: string): str is ColorHueKey {
  return COLOR_HUES.includes(str as ColorHueKey)
}

/** @internal */
export function isColorTintKey(str: string): str is ColorTintKey {
  return COLOR_TINTS.includes(str as ColorTintKey)
}

/** @internal */
export function isColorButtonMode(str: string): str is ThemeColorButtonModeKey {
  return THEME_COLOR_BUTTON_MODES.includes(str as ThemeColorButtonModeKey)
}
