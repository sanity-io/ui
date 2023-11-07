import {ColorHueKey, ColorTintKey} from '@sanity/color'
import {ThemeColorBlendModeKey, ThemeColorButtonModeKey} from '../../system'
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
  mode: ThemeColorButtonModeKey
  key: ColorConfigStateKey | ColorConfigBlendKey
}

export type TokenKeyNode = TokenBaseKeyNode | TokenButtonKeyNode

export interface TokenColorValueNode {
  type: 'color'
  key?: 'black' | 'white' | `${ColorHueKey}/${ColorTintKey}` | ColorTintKey
  hue?: ColorHueKey
  tint?: ColorTintKey
  opacity?: number
}

export interface TokenHueValueNode {
  type: 'hue'
  value?: ColorHueKey
}

export interface TokenBlendModeValueNode {
  type: 'blendMode'
  value?: ThemeColorBlendModeKey
}

export type TokenValueNode = TokenColorValueNode | TokenHueValueNode | TokenBlendModeValueNode
