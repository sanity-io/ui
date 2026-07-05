import {COLOR_HUES, COLOR_TINTS, ColorHueKey, ColorTintKey} from '@sanity/color'

import {THEME_COLOR_BLEND_MODES, THEME_COLOR_BUTTON_MODES} from './_constants'
import {ThemeColorBlendModeKey, ThemeColorButtonModeKey} from './_system'

/** @internal */
export function isColorBlendModeValue(str: string): str is ThemeColorBlendModeKey {
  // oxlint-disable-next-line no-unsafe-type-assertion
  return THEME_COLOR_BLEND_MODES.includes(str as ThemeColorBlendModeKey)
}

/** @internal */
export function isColorHueKey(str: string): str is ColorHueKey {
  // oxlint-disable-next-line no-unsafe-type-assertion
  return COLOR_HUES.includes(str as ColorHueKey)
}

/** @internal */
export function isColorTintKey(str: string): str is ColorTintKey {
  // oxlint-disable-next-line no-unsafe-type-assertion
  return COLOR_TINTS.includes(str as ColorTintKey)
}

/** @internal */
export function isColorButtonMode(str: string): str is ThemeColorButtonModeKey {
  // oxlint-disable-next-line no-unsafe-type-assertion
  return THEME_COLOR_BUTTON_MODES.includes(str as ThemeColorButtonModeKey)
}
