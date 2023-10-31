import {parseTokenValue} from './token'
import {
  COLOR_CONFIG_BASE_KEYS,
  COLOR_CONFIG_BASE_TONES,
  COLOR_CONFIG_BLEND_KEYS,
  COLOR_CONFIG_STATE_KEYS,
  COLOR_CONFIG_STATE_TONES,
  ColorConfigBaseKey,
  ColorConfigBaseTone,
  ColorConfigBlendKey,
  ColorConfigOpacityValue,
  ColorConfigStateKey,
  ColorConfigStateTone,
  ColorConfigValue,
} from './types'

export function isColorConfigBaseTone(str: string): str is ColorConfigBaseTone {
  return COLOR_CONFIG_BASE_TONES.includes(str as ColorConfigBaseTone)
}

export function isColorConfigBaseKey(str: string): str is ColorConfigBaseKey {
  return COLOR_CONFIG_BASE_KEYS.includes(str as ColorConfigBaseKey)
}

export function isColorConfigStateKey(str: string): str is ColorConfigStateKey {
  return COLOR_CONFIG_STATE_KEYS.includes(str as ColorConfigStateKey)
}

export function isColorConfigStateTone(str: string): str is ColorConfigStateTone {
  return COLOR_CONFIG_STATE_TONES.includes(str as ColorConfigStateTone)
}

export function isColorConfigBlendKey(str: string): str is ColorConfigBlendKey {
  return COLOR_CONFIG_BLEND_KEYS.includes(str as ColorConfigBlendKey)
}

export function isColorTokenValue(str: string): str is ColorConfigValue {
  return parseTokenValue(str)?.type === 'color' || parseTokenValue(str)?.type === 'hue'
}

export function isColorValue(str: string): str is 'black' | 'white' {
  return str === 'black' || str === 'white'
}

export function isColorOpacityValue(str: string): str is ColorConfigOpacityValue {
  return str === '0' || /^0\.[0-9]+$/.test(str) || str === '1'
}
