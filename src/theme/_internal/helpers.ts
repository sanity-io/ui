import {ColorBlendModeValue} from './config'
import {COLOR_BLEND_MODES, COLOR_BUTTON_MODES, COLOR_HUES, COLOR_TINTS} from './constants'
import {ColorButtonMode, ColorHueValue, ColorTintValue} from './types'

export function isColorBlendModeValue(str: string): str is ColorBlendModeValue {
  return COLOR_BLEND_MODES.includes(str as ColorBlendModeValue)
}

export function isColorHueValue(str: string): str is ColorHueValue {
  return COLOR_HUES.includes(str as ColorHueValue)
}

export function isColorTintValue(str: string): str is ColorTintValue {
  return COLOR_TINTS.includes(str as ColorTintValue)
}

export function isColorButtonMode(str: string): str is ColorButtonMode {
  return COLOR_BUTTON_MODES.includes(str as ColorButtonMode)
}
