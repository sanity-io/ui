import {isColorButtonMode} from '../../helpers'
import {ColorButtonMode} from '../../types'
import {
  isColorConfigBaseKey,
  isColorConfigBaseTone,
  isColorConfigBlendKey,
  isColorConfigStateKey,
  isColorConfigStateTone,
} from '../helpers'
import {
  ColorConfigBaseKey,
  ColorConfigBaseTone,
  ColorConfigBlendKey,
  ColorConfigStateKey,
  ColorConfigStateTone,
} from '../types'

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

export function parseTokenKey(str: string): TokenKeyNode | undefined {
  const segments = str.split('/')
  const segment0 = segments.shift() || ''

  if (isColorConfigBaseTone(segment0)) {
    const key = segments.join('/')

    if (isColorConfigBaseKey(key)) {
      return {
        type: 'base',
        tone: segment0,
        key,
      }
    }

    if (isColorConfigBlendKey(key)) {
      return {
        type: 'base',
        tone: segment0,
        key,
      }
    }
  }

  if (segment0 === 'button') {
    const segment1 = segments.shift() || ''

    if (isColorConfigStateTone(segment1)) {
      const segment2 = segments.shift() || ''

      if (isColorButtonMode(segment2)) {
        const key = segments.join('/')

        if (isColorConfigStateKey(key)) {
          return {
            type: 'button',
            tone: segment1,
            mode: segment2,
            key,
          }
        }

        if (isColorConfigBlendKey(key)) {
          return {
            type: 'button',
            tone: segment1,
            mode: segment2,
            key,
          }
        }
      }
    }
  }

  return undefined
}
