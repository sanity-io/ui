import {ColorHueKey, ColorTintKey} from '@sanity/color'

import {ThemeColorBlendModeKey, ThemeColorButtonModeKey} from '../../system'
import {
  ColorConfigBlendKey,
  ColorConfigCardKey,
  ColorConfigCardTone,
  ColorConfigStateKey,
  ColorConfigStateTone,
} from '../system'

/** @internal */
export interface TokenBaseKeyNode {
  type: 'base'
  tone: ColorConfigCardTone
  key: ColorConfigCardKey | ColorConfigBlendKey
}

/** @internal */
export interface TokenButtonKeyNode {
  type: 'button'
  tone: ColorConfigStateTone
  mode: ThemeColorButtonModeKey
  key: ColorConfigStateKey | ColorConfigBlendKey
}

/** @internal */
export type TokenKeyNode = TokenBaseKeyNode | TokenButtonKeyNode

/** @internal */
export interface TokenColorValueNode {
  type: 'color'
  key?: 'black' | 'white'
  hue?: ColorHueKey
  mix?: number
  opacity?: number
  tint?: ColorTintKey
}

/** @internal */
export interface TokenHueValueNode {
  type: 'hue'
  value?: ColorHueKey
}

/** @internal */
export interface TokenBlendModeValueNode {
  type: 'blendMode'
  value?: ThemeColorBlendModeKey
}

/** @internal */
export type TokenValueNode = TokenColorValueNode | TokenHueValueNode | TokenBlendModeValueNode
