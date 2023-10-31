import {isColorBlendModeValue, isColorHueValue, isColorTintValue} from '../../helpers'
import {ColorHueValue, ColorTintValue} from '../../types'
import {isColorOpacityValue, isColorValue} from '../helpers'
import {ColorBlendModeValue} from '../types'

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

export function parseTokenValue(str: string): TokenValueNode | undefined {
  const segments = str.split('/')
  const segment0 = segments.shift() || ''

  if (isColorTintValue(segment0)) {
    const tint = segment0
    const segment1 = segments.shift() || ''

    if (isColorOpacityValue(segment1)) {
      const opacity = Number(segment1)

      return {
        type: 'color',
        tint,
        opacity,
      }
    }

    return {
      type: 'color',
      tint,
    }
  }

  if (isColorValue(segment0)) {
    const key = segment0 as 'black' | 'white'
    const segment1 = segments.shift() || ''

    if (isColorOpacityValue(segment1)) {
      const opacity = Number(segment1)

      return {
        type: 'color',
        key,
        opacity,
      }
    }

    return {
      type: 'color',
      key,
    }
  }

  if (isColorHueValue(segment0)) {
    const hue = segment0
    const segment1 = segments.shift() || ''

    if (isColorTintValue(segment1)) {
      const tint = segment1
      const segment2 = segments.shift() || ''

      if (isColorOpacityValue(segment2)) {
        const opacity = Number(segment2)

        return {
          type: 'color',
          key: `${hue}/${tint}`,
          hue,
          tint,
          opacity,
        }
      }

      return {
        type: 'color',
        key: `${hue}/${tint}`,
        hue,
        tint,
      }
    }

    return {
      type: 'hue',
      value: `${hue}`,
    }
  }

  if (isColorOpacityValue(segment0)) {
    const opacity = Number(segment0)

    return {
      type: 'color',
      opacity,
    }
  }

  if (isColorBlendModeValue(segment0)) {
    const value = segment0

    return {
      type: 'blendMode',
      value,
    }
  }

  return undefined
}
