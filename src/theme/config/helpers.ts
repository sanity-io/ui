import {
  COLOR_CONFIG_BLEND_KEYS,
  COLOR_CONFIG_CARD_KEYS,
  COLOR_CONFIG_CARD_TONES,
  COLOR_CONFIG_STATE_KEYS,
  COLOR_CONFIG_STATE_TONES,
  ColorConfigBlendKey,
  ColorConfigCardKey,
  ColorConfigCardTone,
  ColorConfigOpacityValue,
  ColorConfigStateKey,
  ColorConfigStateTone,
  ColorConfigValue,
} from './system'
import {parseTokenValue} from './tokens'

/** @internal */
export function isColorConfigBaseTone(str: string): str is ColorConfigCardTone {
  return COLOR_CONFIG_CARD_TONES.includes(str as ColorConfigCardTone)
}

/** @internal */
export function isColorConfigBaseKey(str: string): str is ColorConfigCardKey {
  return COLOR_CONFIG_CARD_KEYS.includes(str as ColorConfigCardKey)
}

/** @internal */
export function isColorConfigStateKey(str: string): str is ColorConfigStateKey {
  return COLOR_CONFIG_STATE_KEYS.includes(str as ColorConfigStateKey)
}

/** @internal */
export function isColorConfigStateTone(str: string): str is ColorConfigStateTone {
  return COLOR_CONFIG_STATE_TONES.includes(str as ColorConfigStateTone)
}

/** @internal */
export function isColorConfigBlendKey(str: string): str is ColorConfigBlendKey {
  return COLOR_CONFIG_BLEND_KEYS.includes(str as ColorConfigBlendKey)
}

/** @internal */
export function isColorTokenValue(str: string): str is ColorConfigValue {
  return parseTokenValue(str)?.type === 'color' || parseTokenValue(str)?.type === 'hue'
}

/** @internal */
export function isColorValue(str: string): str is 'black' | 'white' {
  return str === 'black' || str === 'white'
}

/** @internal */
export function isColorOpacityValue(str: string): str is ColorConfigOpacityValue {
  return str === '0' || /^0\.[0-9]+$/.test(str) || str === '1'
}
