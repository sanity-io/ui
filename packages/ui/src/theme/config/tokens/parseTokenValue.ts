import {isColorBlendModeValue, isColorHueKey, isColorTintKey} from '../../system'
import {isColorOpacityValue, isColorValue} from '../helpers'
import {TokenValueNode} from './types'

function isColorMixPercentValue(str: string): str is `${number}%` {
  return /^\d+%$/.test(str)
}

/** @internal */
export function parseTokenValue(str: string): TokenValueNode | undefined {
  const segments = str.split('/')

  let nextSegment = segments.shift() || ''

  const [segment0, segment0mix] = nextSegment.split(' ')

  if (isColorTintKey(segment0)) {
    const tint = segment0
    const segment1 = segments.shift() || ''

    if (isColorMixPercentValue(segment0mix)) {
      const mix = Number(segment0mix.slice(0, -1)) / 100

      return {
        type: 'color',
        tint,
        mix,
      }
    }

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

    if (isColorMixPercentValue(segment0mix)) {
      const mix = Number(segment0mix.slice(0, -1)) / 100

      return {
        type: 'color',
        key,
        mix,
      }
    }

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

  if (isColorHueKey(segment0)) {
    const hue = segment0

    nextSegment = segments.shift() || ''

    const [segment1, segment1mix] = nextSegment.split(' ')

    if (isColorTintKey(segment1)) {
      const tint = segment1
      const segment2 = segments.shift() || ''

      if (isColorMixPercentValue(segment1mix)) {
        const mix = Number(segment1mix.slice(0, -1)) / 100

        return {
          type: 'color',
          hue,
          tint,
          mix,
        }
      }

      if (isColorOpacityValue(segment2)) {
        const opacity = Number(segment2)

        return {
          type: 'color',
          hue,
          tint,
          opacity,
        }
      }

      return {
        type: 'color',
        hue,
        tint,
      }
    }

    return {
      type: 'hue',
      value: hue,
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
