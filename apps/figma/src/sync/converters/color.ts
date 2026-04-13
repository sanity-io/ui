import type {SanityColorToken} from '@sanity/ui-tokens/lib'

import type {SanityFigmaColor, SanityFigmaColorAlias} from '../types'

export function getFigmaColorValue(
  token: SanityColorToken,
): SanityFigmaColor | SanityFigmaColorAlias {
  if (typeof token.$value === 'string') {
    return {
      type: 'color-alias',
      target: token.$value.slice(1, -1).replace(/\./g, '/'),
    }
  }

  return {
    type: 'color',
    r: token.$value.components[0],
    g: token.$value.components[1],
    b: token.$value.components[2],
    a: token.$value.alpha,
  }
}
