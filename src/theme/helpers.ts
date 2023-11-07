import {
  COLOR_BLEND_MODES,
  COLOR_BUTTON_MODES,
  COLOR_HUES,
  COLOR_TINTS,
  ColorBlendModeValue,
  ColorButtonMode,
  ColorHueValue,
  ColorTintValue,
} from './system'

/** @internal */
export function isColorBlendModeValue(str: string): str is ColorBlendModeValue {
  return COLOR_BLEND_MODES.includes(str as ColorBlendModeValue)
}

/** @internal */
export function isColorHueValue(str: string): str is ColorHueValue {
  return COLOR_HUES.includes(str as ColorHueValue)
}

/** @internal */
export function isColorTintValue(str: string): str is ColorTintValue {
  return COLOR_TINTS.includes(str as ColorTintValue)
}

/** @internal */
export function isColorButtonMode(str: string): str is ColorButtonMode {
  return COLOR_BUTTON_MODES.includes(str as ColorButtonMode)
}
