import {ColorBlendModeValue, ColorButtonMode, ColorHueValue, ColorTintValue} from '../../system'
import {
  ColorConfigBaseKey,
  ColorConfigBaseTone,
  ColorConfigBlendKey,
  ColorConfigStateKey,
  ColorConfigStateTone,
} from '../system'

export interface TokenBaseKeyNode {
  type: 'base'
  tone: ColorConfigBaseTone
  key: ColorConfigBaseKey | ColorConfigBlendKey
}

export interface TokenButtonKeyNode {
  type: 'button'
  tone: ColorConfigStateTone
  mode: ColorButtonMode
  key: ColorConfigStateKey | ColorConfigBlendKey
}

export type TokenKeyNode = TokenBaseKeyNode | TokenButtonKeyNode

export interface TokenColorValueNode {
  type: 'color'
  key?: 'black' | 'white' | `${ColorHueValue}/${ColorTintValue}` | ColorTintValue
  hue?: ColorHueValue
  tint?: ColorTintValue
  opacity?: number
}

export interface TokenHueValueNode {
  type: 'hue'
  value?: ColorHueValue
}

export interface TokenBlendModeValueNode {
  type: 'blendMode'
  value?: ColorBlendModeValue
}

export type TokenValueNode = TokenColorValueNode | TokenHueValueNode | TokenBlendModeValueNode
