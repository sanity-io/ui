import {isColorButtonMode} from '../../system'
import {
  isColorConfigBaseKey,
  isColorConfigBaseTone,
  isColorConfigBlendKey,
  isColorConfigStateKey,
  isColorConfigStateTone,
} from '../helpers'
import {TokenKeyNode} from './types'

/** @internal */
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
